/**
 * Public, non-secret runtime configuration read at build time.
 *
 * Values are validated here rather than at each call site so a malformed
 * environment variable cannot reach an `href` unfiltered. `NEXT_PUBLIC_` is
 * deliberately reserved for values that are safe to ship in the client bundle.
 */

/**
 * Absolute URL of the deployed Sanity Studio, or `null` when unset.
 *
 * The main navigation's "Write" action links here when present. Only absolute
 * `http`/`https` URLs are accepted: a relative or non-URL value would produce a
 * broken or script-capable link, and an unparseable value falls back to the
 * same in-page notice as an unset variable.
 */
export function getStudioUrl(): string | null {
  const raw = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL?.trim();
  if (!raw) return null;

  try {
    const parsed = new URL(raw);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return null;
    return parsed.toString();
  } catch {
    return null;
  }
}
