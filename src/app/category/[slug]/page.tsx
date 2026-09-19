import { getAllCategorySlugs, getPostsByCategorySlug } from '@/lib/sanity.queries';
import { PostCardHorizontal } from '@/components/feed/post-card-horizontal';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const CATEGORY_FEED_LIMIT = 50;

/** Only categories backed by published posts are routable. */
export const dynamicParams = false;
export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllCategorySlugs();
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const posts = await getPostsByCategorySlug(slug, { offset: 0, limit: CATEGORY_FEED_LIMIT });
  const category = posts[0]?.categories.find(c => c.slug === slug);

  return {
    title: category ? `${category.title} — Monograph` : 'Category Not Found — Monograph',
    description: category?.description
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const categoryPosts = await getPostsByCategorySlug(slug, {
    offset: 0,
    limit: CATEGORY_FEED_LIMIT
  });

  if (categoryPosts.length === 0) {
    notFound();
  }

  const category = categoryPosts[0].categories.find(c => c.slug === slug);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="border-b border-editorial-border pb-6 mb-8">
        <nav aria-label="Breadcrumb" className="mb-3">
          <Link href="/" className="text-xs text-neutral-500 hover:text-neutral-900 transition-colors">
            ← All articles
          </Link>
        </nav>
        <div className="text-xs text-neutral-500 uppercase tracking-wider mb-2">Category</div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900">
          {category?.title ?? slug}
        </h1>
        {category?.description && (
          <p className="text-sm text-neutral-600 mt-2">{category.description}</p>
        )}
        <p className="text-xs text-neutral-500 mt-3">
          {categoryPosts.length} {categoryPosts.length === 1 ? 'story' : 'stories'} ·{' '}
          {categoryPosts.length === CATEGORY_FEED_LIMIT
            ? `showing the latest ${CATEGORY_FEED_LIMIT}`
            : 'showing all'}
        </p>
      </div>

      <div className="divide-y-0">
        {categoryPosts.map(post => (
          <PostCardHorizontal key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
