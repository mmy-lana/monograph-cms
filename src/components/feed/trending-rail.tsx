import Link from 'next/link';
import { Post } from '@/types/blog';
import { TrendingUp } from 'lucide-react';

interface TrendingRailProps {
  posts: Post[];
}

export function TrendingRail({ posts }: TrendingRailProps) {
  const trendingList = posts.slice(0, 4);

  return (
    <section className="mb-14 pb-8 border-b border-editorial-border">
      <div className="flex items-center gap-2 mb-6 text-neutral-800">
        <div className="p-1 rounded-full border border-neutral-300">
          <TrendingUp className="w-4 h-4 text-neutral-900" />
        </div>
        <span className="text-xs font-semibold uppercase tracking-wider">
          Trending on Monograph
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {trendingList.map((post, idx) => (
          <div key={post._id} className="flex gap-4 items-start">
            <span className="font-serif text-3xl font-bold text-neutral-300 select-none">
              0{idx + 1}
            </span>
            <div className="min-w-0">
              <p className="text-xs font-medium text-neutral-900 truncate mb-1">
                {post.author.name}
              </p>
              <Link href={`/posts/${post.slug}`} className="hover:underline">
                <h3 className="font-serif font-bold text-sm text-neutral-900 line-clamp-2 leading-snug">
                  {post.title}
                </h3>
              </Link>
              <span className="text-xs text-neutral-400 mt-1 block">
                {post.estimatedReadingTime} min read
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
