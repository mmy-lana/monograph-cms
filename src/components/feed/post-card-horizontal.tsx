import Link from 'next/link';
import Image from 'next/image';
import { Post, BookmarkableItem } from '@/types/blog';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { BookmarkButton } from '@/components/article/bookmark-button';
import { formatDate } from '@/lib/utils';

interface PostCardHorizontalProps {
  post: Post;
}

export function PostCardHorizontal({ post }: PostCardHorizontalProps) {
  const primaryCategory = post.categories[0];

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

  return (
    <article className="group relative border-b border-editorial-border pb-8 mb-8 last:border-0">
      <div className="flex items-start justify-between gap-4 sm:gap-8">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2.5 flex-wrap">
            <Avatar src={post.author.avatarUrl} alt={post.author.name} size="sm" />
            <span className="text-xs font-medium text-neutral-900 truncate max-w-[140px]">
              {post.author.name}
            </span>
            <span className="text-xs text-neutral-400">•</span>
            <time dateTime={post.publishedAt} className="text-xs text-neutral-500 shrink-0">
              {formatDate(post.publishedAt)}
            </time>
          </div>

          <Link href={`/posts/${post.slug}`} className="block focus:outline-hidden">
            <h2 className="font-serif text-lg sm:text-xl font-bold tracking-tight text-neutral-900 group-hover:text-neutral-700 leading-snug mb-1.5 line-clamp-2">
              {post.title}
            </h2>
            <p className="font-serif text-sm text-neutral-600 line-clamp-2 leading-relaxed mb-3 hidden sm:block">
              {post.subtitle}
            </p>
          </Link>

          <div className="flex items-center justify-between mt-3 text-xs text-neutral-500 flex-wrap gap-y-2">
            <div className="flex items-center gap-3 min-w-0">
              {primaryCategory && (
                <Link href={`/category/${primaryCategory.slug}`} className="truncate max-w-[120px]">
                  <Badge variant="default" className="text-[11px] font-normal">
                    {primaryCategory.title}
                  </Badge>
                </Link>
              )}
              <span className="shrink-0">{post.estimatedReadingTime} min read</span>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <BookmarkButton item={bookmarkPayload} />
            </div>
          </div>
        </div>

        {post.coverImage?.url && (
          <Link
            href={`/posts/${post.slug}`}
            tabIndex={-1}
            aria-hidden="true"
            className="shrink-0 w-24 h-24 sm:w-36 sm:h-28 rounded-xs overflow-hidden bg-neutral-100 relative"
          >
            <Image
              src={post.coverImage.url}
              alt={post.coverImage.alt || post.title}
              fill
              sizes="(max-width: 640px) 96px, 144px"
              className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
            />
          </Link>
        )}
      </div>
    </article>
  );
}
