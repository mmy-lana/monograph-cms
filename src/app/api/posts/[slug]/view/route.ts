import { NextResponse } from 'next/server';
import { sanityClient, isSanityWriteConfigured } from '@/lib/sanity.client';
import { MOCK_POSTS } from '@/lib/mock-data';

interface RouteContext {
  params: Promise<{ slug: string }>;
}

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

export async function POST(_req: Request, context: RouteContext) {
  try {
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
