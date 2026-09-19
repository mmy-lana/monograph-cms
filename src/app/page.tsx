import { getAllPosts } from '@/lib/sanity.queries';
import { PostCardHorizontal } from '@/components/feed/post-card-horizontal';
import { TrendingRail } from '@/components/feed/trending-rail';
import Link from 'next/link';

export const revalidate = 60;

export default async function HomePage() {
  const posts = await getAllPosts({ offset: 0, limit: 20 });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-16">
      <TrendingRail posts={posts} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <section className="lg:col-span-8">
          <div className="flex items-center gap-6 border-b border-editorial-border pb-3 mb-8 text-sm">
            <button className="font-medium text-black border-b-2 border-black -mb-[13px] pb-3">
              For you
            </button>
            <button className="text-neutral-500 hover:text-black transition-colors">
              Featured
            </button>
          </div>

          <div className="divide-y-0">
            {posts.map(post => (
              <PostCardHorizontal key={post._id} post={post} />
            ))}
          </div>
        </section>

        <aside className="lg:col-span-4 hidden lg:block space-y-8 pl-6 border-l border-editorial-border">
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider mb-4">
              Recommended topics
            </h3>
            <div className="flex flex-wrap gap-2">
              {['Distributed Systems', 'Typography', 'TypeScript', 'Performance', 'Rust', 'Product Design'].map(topic => (
                <span
                  key={topic}
                  className="px-3 py-1.5 rounded-full bg-neutral-100 text-neutral-700 text-xs hover:bg-neutral-200 cursor-pointer transition-colors"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-neutral-50 p-6 rounded-xs border border-editorial-border">
            <h4 className="font-serif font-bold text-base text-neutral-900 mb-2">
              Writing on Monograph
            </h4>
            <p className="text-xs text-neutral-600 leading-relaxed mb-4">
              Expertise without algorithmic noise. Share your engineering monographs with over 450,000 systems architects and designers.
            </p>
            <Link
              href="/"
              className="inline-block px-4 py-2 bg-neutral-900 text-white rounded-full text-xs font-medium hover:bg-black transition-colors"
            >
              Start publishing
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
