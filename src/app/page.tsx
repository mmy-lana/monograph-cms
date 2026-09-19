import Link from 'next/link';
import { getAllPosts, getFeaturedPosts } from '@/lib/sanity.queries';
import { PostCardHorizontal } from '@/components/feed/post-card-horizontal';
import { TrendingRail } from '@/components/feed/trending-rail';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Category } from '@/types/blog';

export const revalidate = 60;

const PAGE_SIZE = 10;
const TRENDING_LIMIT = 4;

type FeedTab = 'for-you' | 'featured';

const FEED_TABS: { id: FeedTab; label: string }[] = [
  { id: 'for-you', label: 'For you' },
  { id: 'featured', label: 'Featured' }
];

interface HomePageProps {
  searchParams: Promise<{ tab?: string; page?: string }>;
}

function resolveTab(value: string | undefined): FeedTab {
  return value === 'featured' ? 'featured' : 'for-you';
}

function resolvePage(value: string | undefined): number {
  const parsed = Number.parseInt(value ?? '', 10);
  return Number.isFinite(parsed) && parsed > 1 ? parsed : 1;
}

function buildFeedHref(tab: FeedTab, page: number): string {
  const params = new URLSearchParams();
  if (tab !== 'for-you') params.set('tab', tab);
  if (page > 1) params.set('page', String(page));
  const query = params.toString();
  return query ? `/?${query}` : '/';
}

function collectTopics(posts: { categories: Category[] }[], limit: number): Category[] {
  const topics = new Map<string, Category>();
  for (const post of posts) {
    for (const category of post.categories) {
      if (!topics.has(category.slug)) topics.set(category.slug, category);
    }
  }
  return [...topics.values()].slice(0, limit);
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { tab: tabParam, page: pageParam } = await searchParams;
  const tab = resolveTab(tabParam);
  const page = resolvePage(pageParam);
  const offset = (page - 1) * PAGE_SIZE;

  const [posts, trendingPosts] = await Promise.all([
    tab === 'featured'
      ? getFeaturedPosts({ offset, limit: PAGE_SIZE })
      : getAllPosts({ offset, limit: PAGE_SIZE }),
    getFeaturedPosts({ offset: 0, limit: TRENDING_LIMIT })
  ]);

  const topics = collectTopics(trendingPosts, 8);
  const hasNextPage = posts.length === PAGE_SIZE;
  const hasPreviousPage = page > 1;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-16">
      <TrendingRail posts={trendingPosts} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <section aria-labelledby="feed-heading" className="lg:col-span-8">
          <h1 id="feed-heading" className="sr-only">
            Latest stories
          </h1>

          <nav
            aria-label="Story feeds"
            className="flex items-center gap-6 border-b border-editorial-border pb-3 mb-8 text-sm"
          >
            {FEED_TABS.map(feedTab => {
              const isActive = feedTab.id === tab;
              return (
                <Link
                  key={feedTab.id}
                  href={buildFeedHref(feedTab.id, 1)}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    '-mb-[13px] border-b-2 pb-3 transition-colors',
                    isActive
                      ? 'font-medium text-black border-black'
                      : 'text-neutral-500 border-transparent hover:text-black'
                  )}
                >
                  {feedTab.label}
                </Link>
              );
            })}
          </nav>

          <div id="feed-panel" aria-labelledby="feed-heading">
            {posts.length === 0 ? (
              <div className="py-20 text-center border border-dashed border-editorial-border rounded-xs">
                <p className="font-serif text-lg text-neutral-800 mb-1">
                  {page > 1 ? 'No further stories on this page.' : 'No stories published yet.'}
                </p>
                <p className="text-xs text-neutral-500 mb-6">
                  {page > 1
                    ? 'You have reached the end of the feed.'
                    : 'Published stories will appear here as soon as the editorial team ships them.'}
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center min-h-[44px] px-5 bg-neutral-900 text-white rounded-full text-xs font-medium hover:bg-black transition-colors"
                >
                  Back to the latest feed
                </Link>
              </div>
            ) : (
              <div className="divide-y-0">
                {posts.map(post => (
                  <PostCardHorizontal key={post._id} post={post} />
                ))}
              </div>
            )}

            {(hasPreviousPage || hasNextPage) && (
              <nav aria-label="Feed pagination" className="flex items-center justify-between pt-6">
                {hasPreviousPage ? (
                  <Link
                    href={buildFeedHref(tab, page - 1)}
                    className="inline-flex items-center min-h-[44px] px-5 rounded-full border border-neutral-300 text-sm text-neutral-800 hover:border-black transition-colors"
                  >
                    ← Newer stories
                  </Link>
                ) : (
                  <span aria-hidden="true" />
                )}

                <span className="text-xs text-neutral-500">Page {page}</span>

                {hasNextPage ? (
                  <Link
                    href={buildFeedHref(tab, page + 1)}
                    className="inline-flex items-center min-h-[44px] px-5 rounded-full border border-neutral-300 text-sm text-neutral-800 hover:border-black transition-colors"
                  >
                    Older stories →
                  </Link>
                ) : (
                  <span aria-hidden="true" />
                )}
              </nav>
            )}
          </div>
        </section>

        <aside className="lg:col-span-4 hidden lg:block space-y-8 pl-6 border-l border-editorial-border">
          <div>
            <h2 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider mb-4">
              Recommended topics
            </h2>
            {topics.length === 0 ? (
              <p className="text-xs text-neutral-500">
                Topic recommendations appear once stories are published.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {topics.map(topic => (
                  <Link key={topic.slug} href={`/category/${topic.slug}`} className="max-w-full">
                    <Badge variant="default" className="hover:bg-neutral-200">
                      {topic.title}
                    </Badge>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="bg-neutral-50 p-6 rounded-xs border border-editorial-border">
            <h2 className="font-serif font-bold text-base text-neutral-900 mb-2">
              Writing on Monograph
            </h2>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Expertise without algorithmic noise. Monograph publishes long-form engineering and
              design monographs for readers who finish what they start.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
