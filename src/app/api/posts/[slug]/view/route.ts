import { NextResponse } from 'next/server';
import { sanityClient, isSanityConfigured } from '@/lib/sanity.client';
import { MOCK_POSTS } from '@/lib/mock-data';

interface RouteContext {
  params: Promise<{ slug: string }>;
}

/**
 * Only published, non-draft documents may be mutated. Without this guard a
 * draft could be patched through the public API.
 */
const PUBLISHED_POST_BY_SLUG = `*[_type == "post" && slug.current == $slug && status == "published" && !(_id in path("drafts.**"))][0]`;

export async function POST(_req: Request, context: RouteContext) {
  try {
    const { slug } = await context.params;

    if (isSanityConfigured && sanityClient) {
      const patchResult = await sanityClient
        .patch({ query: PUBLISHED_POST_BY_SLUG, params: { slug } })
        .inc({ viewsCount: 1 })
        .commit();

      if (!patchResult) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }

      return NextResponse.json({ success: true });
    }

    const post = MOCK_POSTS.find(p => p.slug === slug && p.status === 'published');
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    post.viewsCount += 1;
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to record view beacon' }, { status: 500 });
  }
}
