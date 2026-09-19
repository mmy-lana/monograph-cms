import { NextRequest, NextResponse } from 'next/server';
import { sanityClient, isSanityConfigured } from '@/lib/sanity.client';
import { MOCK_POSTS } from '@/lib/mock-data';

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function POST(req: NextRequest, context: RouteContext) {
  try {
    const { slug } = await context.params;
    const body = await req.json();
    const count = Number(body?.count);

    if (!count || isNaN(count) || count < 1 || count > 50) {
      return NextResponse.json({ error: 'Invalid clap increment payload' }, { status: 400 });
    }

    if (isSanityConfigured && sanityClient) {
      const patchResult = await sanityClient
        .patch({ query: `*[_type == "post" && slug.current == $slug][0]`, params: { slug } })
        .inc({ clapsCount: count })
        .commit({ autoGenerateArrayKeys: true });

      return NextResponse.json({ success: true, totalClaps: patchResult.clapsCount });
    }

    const targetPost = MOCK_POSTS.find(p => p.slug === slug);
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
