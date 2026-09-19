import { NextRequest, NextResponse } from 'next/server';
import { sanityClient, isSanityConfigured } from '@/lib/sanity.client';
import { MOCK_POSTS } from '@/lib/mock-data';

interface RouteContext {
  params: Promise<{ slug: string }>;
}

/** Mirrors the reader-side ceiling: one request can never carry more than this. */
const MAX_CLAPS_PER_REQUEST = 50;

/**
 * Only published, non-draft documents may be mutated. Without this guard a
 * draft could be patched through the public API.
 */
const PUBLISHED_POST_BY_SLUG = `*[_type == "post" && slug.current == $slug && status == "published" && !(_id in path("drafts.**"))][0]`;

interface ClapRequestBody {
  count?: unknown;
}

export async function POST(req: NextRequest, context: RouteContext) {
  try {
    const { slug } = await context.params;

    const body = (await req.json().catch(() => null)) as ClapRequestBody | null;
    const count = Number(body?.count);

    if (!Number.isInteger(count) || count < 1 || count > MAX_CLAPS_PER_REQUEST) {
      return NextResponse.json({ error: 'Invalid clap increment payload' }, { status: 400 });
    }

    if (isSanityConfigured && sanityClient) {
      // Concurrency-safe atomic mutation on the published document only.
      const patchResult = await sanityClient
        .patch({ query: PUBLISHED_POST_BY_SLUG, params: { slug } })
        .inc({ clapsCount: count })
        .commit({ autoGenerateArrayKeys: true });

      if (!patchResult) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }

      return NextResponse.json({ success: true, totalClaps: patchResult.clapsCount });
    }

    // In-memory increment for the mock dataset fallback.
    const targetPost = MOCK_POSTS.find(p => p.slug === slug && p.status === 'published');
    if (!targetPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    targetPost.clapsCount += count;
    return NextResponse.json({ success: true, totalClaps: targetPost.clapsCount });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
