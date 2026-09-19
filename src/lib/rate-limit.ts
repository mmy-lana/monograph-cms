/**
 * Zero-dependency fixed-window rate limiter for the public mutation routes.
 *
 * Threat model (SEC-05, CWE-770): the clap and view endpoints are unauthenticated
 * and each accepted request performs a Sanity write or mutates the in-memory
 * dataset. Without a ceiling a single client can inflate engagement counters
 * without bound and drive arbitrary write volume against the CMS.
 *
 * Scope and limitations (documented deliberately, because a limiter that is
 * mistaken for a stronger control is worse than a documented weaker one):
 *
 * - State is in-memory and therefore per-process. A serverless or multi-instance
 *   deployment gives each instance its own budget, so the effective ceiling is
 *   `limit * instanceCount`. A shared store (Redis, Upstash) is required for a
 *   cluster-wide guarantee; this module is the single seam to swap.
 * - The window is fixed, not sliding: a client can send `limit` requests at the
 *   end of one window and `limit` more at the start of the next, admitting
 *   `2 * limit` inside one window-length span. This is the standard practical
 *   trade-off and is sufficient to stop scripted amplification, which is the
 *   actual defect here.
 * - It is a throttling control, not an identity or authorization control.
 */

/** A single client's counter inside the current window. */
interface RateLimitBucket {
  /** Requests admitted in the current window. */
  count: number;
  /** Epoch milliseconds at which the current window ends and the counter resets. */
  resetTime: number;
}

export interface RateLimitResult {
  /** Whether the request is admitted. */
  success: boolean;
  /** Requests still available in the current window; never negative. */
  remaining: number;
  /** Epoch milliseconds at which the current window resets. */
  resetTime: number;
  /** Milliseconds until the window resets; never negative. */
  retryAfterMs: number;
}

/**
 * Buckets keyed by client IP. Entries are pruned on write and swept in bulk once
 * the map grows past `PURGE_THRESHOLD`, so an attacker cycling through source
 * addresses cannot grow the map without bound (the memory-leak vector this
 * guards against).
 */
const buckets = new Map<string, RateLimitBucket>();

/**
 * Sweep cadence. The map is small in normal operation, so a full scan is only
 * worth its cost once a meaningful number of keys exist.
 */
const PURGE_THRESHOLD = 500;

/**
 * Hard ceiling on retained buckets. If a purge cannot bring the map below the
 * threshold - which requires more than this many *simultaneously active* keys,
 * meaning the sweep itself is cheaper than the live working set - the oldest
 * expiry is dropped instead, so memory stays bounded under address-rotation.
 */
const MAX_TRACKED_CLIENTS = 10_000;

/**
 * Drops every bucket whose window has already elapsed.
 *
 * Expired entries are pruned by insertion order. `Map` preserves insertion order
 * and a bucket's `resetTime` is only ever extended forward while it is reused, so
 * the first bucket still live marks the point past which no entry can be expired.
 * That keeps the sweep O(expired) instead of a full scan.
 */
function purgeExpired(now: number): void {
  for (const [ip, bucket] of buckets) {
    if (bucket.resetTime <= now) {
      buckets.delete(ip);
      continue;
    }
    break;
  }
}

/**
 * Enforces the absolute bucket ceiling without scanning on every request.
 *
 * `Map` iteration is insertion-ordered, so the first key is the least recently
 * created. Deleting it reclaims the entry that is least likely to still be
 * active, and keeps the structure bounded when the live working set exceeds
 * `MAX_TRACKED_CLIENTS`.
 */
function enforceBucketCeiling(): void {
  while (buckets.size >= MAX_TRACKED_CLIENTS) {
    const oldest = buckets.keys().next();
    if (oldest.done) break;
    buckets.delete(oldest.value);
  }
}

/**
 * Records one request against `ip` and reports whether it is admitted.
 *
 * The window is opened lazily on a client's first request and is not extended by
 * subsequent requests, so this is a fixed rather than sliding window. A rejected
 * request does not increment the counter: the window is already exhausted, and
 * counting rejections would let an attacker extend the penalty indefinitely.
 *
 * @param ip Client identifier. Callers must pass a value from
 *   {@link getClientIp} so the key cannot be attacker-chosen.
 * @param limit Requests admitted per window. Must be a positive integer.
 * @param windowMs Window length in milliseconds. Must be finite and positive.
 */
export function checkRateLimit(ip: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();

  // Guard the arithmetic rather than trusting every call site: a zero or negative
  // window would make every request appear expired, silently disabling the limit.
  if (!Number.isFinite(windowMs) || windowMs <= 0 || !Number.isFinite(limit) || limit <= 0) {
    return { success: true, remaining: Number.MAX_SAFE_INTEGER, resetTime: now, retryAfterMs: 0 };
  }

  if (buckets.size >= PURGE_THRESHOLD) {
    purgeExpired(now);
  }

  const existing = buckets.get(ip);

  // No live window for this client: open one.
  if (!existing || existing.resetTime <= now) {
    enforceBucketCeiling();
    const resetTime = now + windowMs;
    buckets.set(ip, { count: 1, resetTime });
    return { success: true, remaining: Math.max(0, limit - 1), resetTime, retryAfterMs: 0 };
  }

  if (existing.count >= limit) {
    const retryAfterMs = Math.max(0, existing.resetTime - now);
    return { success: false, remaining: 0, resetTime: existing.resetTime, retryAfterMs };
  }

  existing.count += 1;

  // Re-insert so this bucket moves to the tail of the iteration order. Without
  // this the O(expired) purge invariant breaks: a bucket could be reused,
  // receive a later expiry, and still sit ahead of an expired one.
  buckets.delete(ip);
  buckets.set(ip, existing);

  return {
    success: true,
    remaining: Math.max(0, limit - existing.count),
    resetTime: existing.resetTime,
    retryAfterMs: 0
  };
}

/**
 * Reads a client's current budget without consuming from it.
 *
 * Observability only. It must never gate a decision: checking and then acting is
 * a time-of-check/time-of-use gap, so routes call {@link checkRateLimit}, which
 * counts and decides atomically within one synchronous turn.
 */
export function inspectRateLimit(ip: string, limit: number): RateLimitResult {
  const now = Date.now();
  const bucket = buckets.get(ip);

  if (!bucket || bucket.resetTime <= now) {
    return { success: true, remaining: limit, resetTime: now, retryAfterMs: 0 };
  }

  const remaining = Math.max(0, limit - bucket.count);

  return {
    success: remaining > 0,
    remaining,
    resetTime: bucket.resetTime,
    retryAfterMs: Math.max(0, bucket.resetTime - now)
  };
}

/**
 * Extracts the client IP from proxy headers.
 *
 * `x-forwarded-for` is a comma-separated chain, and only the left-most entry is
 * the originating client; the rest are proxies. The value is trimmed because the
 * header is frequently emitted as `"203.0.113.7, 70.41.3.18"`.
 *
 * Trust boundary: both headers are client-controllable when the app is reachable
 * directly, so a deployment MUST front these routes with a proxy that overwrites
 * `x-forwarded-for` and strips inbound `x-real-ip`. Otherwise an attacker varies
 * the header per request to receive a fresh bucket each time and bypasses the
 * limit entirely. The loopback fallback keeps the key well-defined for direct
 * local requests, where all callers legitimately share one budget.
 */
export function getClientIp(req: Request): string {
  const forwardedFor = req.headers.get('x-forwarded-for')?.split(',')[0].trim();
  if (forwardedFor) return forwardedFor;

  const realIp = req.headers.get('x-real-ip')?.trim();
  if (realIp) return realIp;

  return '127.0.0.1';
}
