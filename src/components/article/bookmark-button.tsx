'use client';

import { useReadingList } from '@/hooks/use-reading-list';
import { BookmarkableItem } from '@/types/blog';
import { Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BookmarkButtonProps {
  item: BookmarkableItem;
  className?: string;
}

export function BookmarkButton({ item, className }: BookmarkButtonProps) {
  const { isBookmarked, toggleBookmark, isReady } = useReadingList();
  const bookmarked = isReady && isBookmarked(item.slug);

  return (
    <button
      type="button"
      onClick={() => toggleBookmark(item)}
      aria-label={bookmarked ? 'Remove from reading list' : 'Save to reading list'}
      className={cn(
        'min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full text-neutral-500 hover:text-black hover:bg-neutral-100 transition-colors focus-visible:outline-2 focus-visible:outline-neutral-900 cursor-pointer',
        bookmarked && 'text-black',
        className
      )}
    >
      <Bookmark
        className={cn('w-5 h-5 transition-transform duration-150 active:scale-90', bookmarked && 'fill-black')}
      />
    </button>
  );
}
