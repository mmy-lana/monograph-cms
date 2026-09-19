import { notFound } from 'next/navigation';
import Image from 'next/image';
import type { Metadata } from 'next';
import { getPostBySlug, getAllPostSlugs } from '@/lib/sanity.queries';
import { Avatar } from '@/components/ui/avatar';
import { ClapperButton } from '@/components/article/clapper-button';
import { BookmarkButton } from '@/components/article/bookmark-button';
import { PortableTextRenderer } from '@/components/article/portable-text-renderer';
import { TableOfContents } from '@/components/article/table-of-contents';
import { ArticleInteractiveShell } from './interactive-shell';
import { formatDate, getPostHeadings } from '@/lib/utils';
import { BookmarkableItem } from '@/types/blog';

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Prerendered slugs are served from the cache and refreshed every 60 seconds,
 * while `dynamicParams = true` lets an article published in the CMS after the
 * last build render on demand on first request instead of 404ing until CI runs
 * again. Unknown slugs still resolve to `notFound()`; because Next renders that
 * on demand it answers 200 with the not-found page, so `generateMetadata`
 * marks the response `noindex` to keep it out of search results.
 */
export const dynamicParams = true;
export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return {
      title: 'Post Not Found — Monograph',
      robots: { index: false, follow: false }
    };
  }

  return {
    title: `${post.title} — Monograph`,
    description: post.subtitle,
    openGraph: {
      title: post.title,
      description: post.subtitle,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: [{ url: post.coverImage.url }]
    }
  };
}

export default async function PostDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const bookmarkPayload: BookmarkableItem = {
    id: post._id,
    slug: post.slug,
    title: post.title,
    subtitle: post.subtitle,
    authorName: post.author.name,
    authorAvatar: post.author.avatarUrl,
    coverImageUrl: post.coverImage.url,
    estimatedReadingTime: post.estimatedReadingTime
  };

  const headings = getPostHeadings(post.body);

  return (
    <article className="min-h-screen pb-24">
      <header className="max-w-[42.5rem] mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-8">
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 leading-[1.15] mb-4">
          {post.title}
        </h1>
        <p className="font-serif text-lg sm:text-xl text-neutral-600 leading-relaxed mb-6">
          {post.subtitle}
        </p>

        <div className="flex items-center justify-between border-y border-editorial-border py-4 my-6">
          <div className="flex items-center gap-3">
            <Avatar src={post.author.avatarUrl} alt={post.author.name} size="lg" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-sans font-medium text-sm text-neutral-900">
                  {post.author.name}
                </span>
                <span className="text-xs text-editorial-green font-medium cursor-pointer hover:underline">
                  Follow
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-500 mt-0.5">
                <span>{post.estimatedReadingTime} min read</span>
                <span>•</span>
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <BookmarkButton item={bookmarkPayload} />
          </div>
        </div>
      </header>

      {post.coverImage?.url && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
          <div className="relative aspect-16/9 rounded-xs overflow-hidden bg-neutral-100">
            <Image
              src={post.coverImage.url}
              alt={post.coverImage.alt || post.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover"
            />
          </div>
          {post.coverImage.caption && (
            <p className="text-center font-sans text-xs text-neutral-500 mt-2">
              {post.coverImage.caption}
            </p>
          )}
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-2 hidden lg:block" />

        <div className="lg:col-span-7">
          <ArticleInteractiveShell articleTitle={post.title} postSlug={post.slug}>
            <PortableTextRenderer value={post.body} />
          </ArticleInteractiveShell>

          <div className="flex flex-wrap gap-2 pt-8 mt-12 border-t border-editorial-border">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="px-3 py-1 bg-neutral-100 text-neutral-700 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between py-6 mt-8 border-y border-editorial-border">
            <ClapperButton postSlug={post.slug} initialClaps={post.clapsCount} />
            <div className="flex items-center gap-2">
              <BookmarkButton item={bookmarkPayload} />
            </div>
          </div>
        </div>

        <aside className="lg:col-span-3 hidden lg:block">
          <div className="sticky top-24 pl-4">
            <TableOfContents headings={headings} />
          </div>
        </aside>
      </div>

      {/* Mobile action dock. The bottom padding reserves the iOS home-indicator
          inset so the controls are never covered by the system gesture area. */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-paper/95 backdrop-blur-md border-t border-editorial-border px-6 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] flex items-center justify-between shadow-lg">
        <ClapperButton postSlug={post.slug} initialClaps={post.clapsCount} />
        <div className="flex items-center gap-2">
          <BookmarkButton item={bookmarkPayload} />
        </div>
      </div>
    </article>
  );
}
