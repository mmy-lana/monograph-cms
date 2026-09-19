import { NextResponse } from 'next/server';
import { sanityClient, isSanityWriteConfigured } from '@/lib/sanity.client';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';
import { MOCK_POSTS } from '@/lib/mock-data';

interface RouteContext {
  params: Promise<{ slug: string }>;
}

/**
 * Anti-automation ceiling (SEC-05): one client may fire 30 view beacons per
 * minute. The client shell sends at most one beacon per article per browser
 * session, so this only constrains scripted traffic.
 */
const VIEW_RATE_LIMIT = 30;
const VIEW_RATE_WINDOW_MS = 60_000;

/**
 * Only published, non-draft documents may be mutated. Without this guard a
 * draft could be patched through the public API.
 */
const PUBLISHED_POST_BY_SLUG = `*[_type == "post" && slug.current == $slug && status == "published" && !(_id in path("drafts.**"))][0]`;

/** In-memory persistence used when Sanity writes are unavailable or fail. */
function persistToMockDataset(slug: string): boolean {
  const post = MOCK_POSTS.find(p => p.slug === slug && p.status === 'published');
  if (!post) return false;

  post.viewsCount += 1;
  return true;
}

export async function POST(req: Request, context: RouteContext) {
  try {
    // Throttle before touching the write path so rejected beacons are free.
    const rate = checkRateLimit(getClientIp(req), VIEW_RATE_LIMIT, VIEW_RATE_WINDOW_MS);

    if (!rate.success) {
      const retryAfterSeconds = Math.max(1, Math.ceil(rate.retryAfterMs / 1000));

      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(retryAfterSeconds),
            'X-RateLimit-Limit': String(VIEW_RATE_LIMIT),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(Math.ceil(rate.resetTime / 1000))
          }
        }
      );
    }

    const { slug } = await context.params;

    // A write needs a write token; without it the remote commit fails with a 401
    // and the beacon would silently 500 on every page view.
    if (isSanityWriteConfigured && sanityClient) {
      try {
        const patchResult = await sanityClient
          .patch({ query: PUBLISHED_POST_BY_SLUG, params: { slug } })
          .inc({ viewsCount: 1 })
          .commit();

        if (patchResult) {
          return NextResponse.json({ success: true });
        }
      } catch (error) {
        console.error('[api/view] remote mutation failed, falling back to local state', {
          slug,
          error
        });
      }
    }

    if (!persistToMockDataset(slug)) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    // Never surface internal failure detail to the client (CWE-209).
    console.error('[api/view] unhandled failure', { error });
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
