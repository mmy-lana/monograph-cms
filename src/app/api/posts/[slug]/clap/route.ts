import { NextRequest, NextResponse } from 'next/server';
import { sanityClient, isSanityWriteConfigured } from '@/lib/sanity.client';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';
import { MOCK_POSTS } from '@/lib/mock-data';

interface RouteContext {
  params: Promise<{ slug: string }>;
}

/** Mirrors the reader-side ceiling: one request can never carry more than this. */
const MAX_CLAPS_PER_REQUEST = 50;

/**
 * Anti-automation ceiling (SEC-05): one client may fire 60 clap mutations per
 * minute. A genuine reader clicks at human speed, so this is far above real use
 * while capping scripted inflation of the counter.
 */
const CLAP_RATE_LIMIT = 60;
const CLAP_RATE_WINDOW_MS = 60_000;

/**
 * Only published, non-draft documents may be mutated. Without this guard a
 * draft could be patched through the public API.
 */
const PUBLISHED_POST_BY_SLUG = `*[_type == "post" && slug.current == $slug && status == "published" && !(_id in path("drafts.**"))][0]`;

interface ClapRequestBody {
  count?: unknown;
}

/** In-memory persistence used when Sanity writes are unavailable or fail. */
function persistToMockDataset(slug: string, count: number): number | null {
  const targetPost = MOCK_POSTS.find(p => p.slug === slug && p.status === 'published');
  if (!targetPost) return null;

  targetPost.clapsCount += count;
  return targetPost.clapsCount;
}

export async function POST(req: NextRequest, context: RouteContext) {
  try {
    // Throttle before any parsing or write so a rejected request costs the
    // server nothing beyond the counter check.
    const rate = checkRateLimit(getClientIp(req), CLAP_RATE_LIMIT, CLAP_RATE_WINDOW_MS);

    if (!rate.success) {
      const retryAfterSeconds = Math.max(1, Math.ceil(rate.retryAfterMs / 1000));

      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(retryAfterSeconds),
            'X-RateLimit-Limit': String(CLAP_RATE_LIMIT),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(Math.ceil(rate.resetTime / 1000))
          }
        }
      );
    }

    const { slug } = await context.params;

    const body = (await req.json().catch(() => null)) as ClapRequestBody | null;
    const count = Number(body?.count);

    if (!Number.isInteger(count) || count < 1 || count > MAX_CLAPS_PER_REQUEST) {
      return NextResponse.json({ error: 'Invalid clap increment payload' }, { status: 400 });
    }

    // A write needs both a configured project and a write token. Without the
    // token the remote commit fails with a 401, so read the write flag instead
    // of the read flag and fall through to local persistence.
    if (isSanityWriteConfigured && sanityClient) {
      try {
        // Concurrency-safe atomic mutation on the published document only.
        const patchResult = await sanityClient
          .patch({ query: PUBLISHED_POST_BY_SLUG, params: { slug } })
          .inc({ clapsCount: count })
          .commit({ autoGenerateArrayKeys: true });

        if (patchResult) {
          return NextResponse.json({ success: true, totalClaps: patchResult.clapsCount });
        }
      } catch (error) {
        console.error('[api/clap] remote mutation failed, falling back to local state', {
          slug,
          error
        });
      }
    }

    const totalClaps = persistToMockDataset(slug, count);
    if (totalClaps === null) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, totalClaps });
  } catch (error) {
    // Never surface internal failure detail to the client (CWE-209).
    console.error('[api/clap] unhandled failure', { error });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
