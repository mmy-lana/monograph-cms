'use client';

import Link from 'next/link';
import { useReadingList } from '@/hooks/use-reading-list';
import { Avatar } from '@/components/ui/avatar';
import { Trash2, BookOpen } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { BookmarkableItem } from '@/types/blog';

export default function BookmarksPage() {
  const { bookmarks, toggleBookmark, isReady } = useReadingList();

  if (!isReady) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center text-sm text-neutral-500">
        Loading saved reading list...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <div className="border-b border-editorial-border pb-6 mb-8">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900">
          Your Reading List
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          {bookmarks.length} {bookmarks.length === 1 ? 'article' : 'articles'} saved locally on this device.
        </p>
      </div>

      {bookmarks.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-editorial-border rounded-xs">
          <BookOpen className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
          <p className="font-serif text-lg text-neutral-800 mb-1">Your reading list is empty.</p>
          <p className="text-xs text-neutral-500 mb-6">
            Click the bookmark icon on any article to save it for distraction-free reading later.
          </p>
          <Link
            href="/"
            className="inline-block px-5 py-2.5 bg-neutral-900 text-white rounded-full text-xs font-medium hover:bg-black transition-colors"
          >
            Explore articles
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {bookmarks.map(item => {
            const bookmarkPayload: BookmarkableItem = {
              id: item.id,
              slug: item.slug,
              title: item.title,
              subtitle: item.subtitle,
              authorName: item.authorName,
              authorAvatar: item.authorAvatar,
              coverImageUrl: item.coverImageUrl,
              estimatedReadingTime: item.estimatedReadingTime
            };

            return (
              <div
                key={item.id}
                className="flex items-start justify-between gap-4 p-4 border border-editorial-border rounded-xs bg-white hover:border-neutral-400 transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <Avatar src={item.authorAvatar} alt={item.authorName} size="sm" />
                    <span className="text-xs font-medium text-neutral-800 truncate max-w-[140px]">
                      {item.authorName}
                    </span>
                    <span className="text-xs text-neutral-400">•</span>
                    <span className="text-xs text-neutral-500">
                      Saved {formatDate(new Date(item.savedAt).toISOString())}
                    </span>
                  </div>
                  <Link href={`/posts/${item.slug}`} className="block group">
                    <h2 className="font-serif font-bold text-base sm:text-lg text-neutral-900 group-hover:underline line-clamp-2">
                      {item.title}
                    </h2>
                  </Link>
                  <span className="text-xs text-neutral-400 mt-2 block">
                    {item.estimatedReadingTime} min read
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => toggleBookmark(bookmarkPayload)}
                  aria-label="Remove bookmark"
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center text-neutral-400 hover:text-red-600 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
