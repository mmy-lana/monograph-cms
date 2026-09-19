import { NextRequest, NextResponse } from 'next/server';
import { sanityClient, isSanityConfigured } from '@/lib/sanity.client';
import { MOCK_POSTS } from '@/lib/mock-data';

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function POST(req: NextRequest, context: RouteContext) {
  try {
    const { slug } = await context.params;

    if (isSanityConfigured && sanityClient) {
      await sanityClient
        .patch({ query: `*[_type == "post" && slug.current == $slug][0]`, params: { slug } })
        .inc({ viewsCount: 1 })
        .commit();

      return NextResponse.json({ success: true });
    }

    const post = MOCK_POSTS.find(p => p.slug === slug);
    if (post) {
      post.viewsCount += 1;
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to record view beacon' }, { status: 500 });
  }
}
