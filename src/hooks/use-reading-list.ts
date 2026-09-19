'use client';

import { useState, useEffect, useCallback } from 'react';
import { BookmarkItem, BookmarkableItem } from '@/types/blog';

const STORAGE_KEY = 'editorial_bookmarks_v1';

export function useReadingList() {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setBookmarks(JSON.parse(stored));
      }
    } catch {
      // Storage unavailable
    } finally {
      setIsReady(true);
    }
  }, []);

  const isBookmarked = useCallback(
    (postSlug: string) => bookmarks.some(b => b.slug === postSlug),
    [bookmarks]
  );

  const toggleBookmark = useCallback((item: BookmarkableItem) => {
    setBookmarks(prev => {
      const exists = prev.some(b => b.slug === item.slug);
      let updated: BookmarkItem[];

      if (exists) {
        updated = prev.filter(b => b.slug !== item.slug);
      } else {
        const newItem: BookmarkItem = {
          ...item,
          savedAt: Date.now()
        };
        updated = [newItem, ...prev];
      }

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Storage restricted
      }
      return updated;
    });
  }, []);

  return { bookmarks, isBookmarked, toggleBookmark, isReady };
}
