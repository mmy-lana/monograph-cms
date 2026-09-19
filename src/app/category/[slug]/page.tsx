import { getAllPosts } from '@/lib/sanity.queries';
import { PostCardHorizontal } from '@/components/feed/post-card-horizontal';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [
    { slug: 'systems-engineering' },
    { slug: 'design-and-craft' }
  ];
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const allPosts = await getAllPosts({ offset: 0, limit: 50 });
  const categoryPosts = allPosts.filter(p => p.categories.some(c => c.slug === slug));

  if (categoryPosts.length === 0) {
    notFound();
  }

  const category = categoryPosts[0].categories.find(c => c.slug === slug);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="border-b border-editorial-border pb-6 mb-8">
        <div className="text-xs text-neutral-500 uppercase tracking-wider mb-2">Category</div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900">
          {category?.title || slug}
        </h1>
        {category?.description && (
          <p className="text-sm text-neutral-600 mt-2">{category.description}</p>
        )}
      </div>

      <div className="divide-y-0">
        {categoryPosts.map(post => (
          <PostCardHorizontal key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
