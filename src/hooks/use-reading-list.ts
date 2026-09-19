'use client';

import { useState, useEffect, useCallback } from 'react';
import { BookmarkItem, BookmarkableItem } from '@/types/blog';

const STORAGE_KEY = 'editorial_bookmarks_v1';

/**
 * Normalizes one persisted entry into a complete `BookmarkItem`.
 *
 * Every field is re-validated rather than trusted: storage is user-writable and
 * a schema change can leave older entries missing fields. Entries without the
 * identity triple (id/slug/title) are discarded; the rest are repaired with safe
 * defaults so downstream rendering never receives `undefined`.
 */
function toBookmarkItem(entry: unknown): BookmarkItem | null {
  if (!entry || typeof entry !== 'object') return null;

  const candidate = entry as Record<string, unknown>;

  if (
    typeof candidate.id !== 'string' ||
    typeof candidate.slug !== 'string' ||
    typeof candidate.title !== 'string'
  ) {
    return null;
  }

  return {
    id: candidate.id,
    slug: candidate.slug,
    title: candidate.title,
    subtitle: typeof candidate.subtitle === 'string' ? candidate.subtitle : '',
    authorName: typeof candidate.authorName === 'string' ? candidate.authorName : '',
    authorAvatar: typeof candidate.authorAvatar === 'string' ? candidate.authorAvatar : '',
    coverImageUrl: typeof candidate.coverImageUrl === 'string' ? candidate.coverImageUrl : '',
    estimatedReadingTime:
      typeof candidate.estimatedReadingTime === 'number' &&
      Number.isFinite(candidate.estimatedReadingTime)
        ? candidate.estimatedReadingTime
        : 0,
    savedAt:
      typeof candidate.savedAt === 'number' && Number.isFinite(candidate.savedAt)
        ? candidate.savedAt
        : Date.now()
  };
}

/**
 * Deserializes the persisted reading list defensively: hand-edited, foreign or
 * partially written storage must never crash the page (a non-array payload
 * previously reached `bookmarks.some` and threw a TypeError).
 */
function parseStoredBookmarks(raw: string | null): BookmarkItem[] {
  if (!raw) return [];

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .map(toBookmarkItem)
      .filter((entry): entry is BookmarkItem => entry !== null);
  } catch {
    return [];
  }
}

function readStoredBookmarks(): BookmarkItem[] {
  try {
    return parseStoredBookmarks(localStorage.getItem(STORAGE_KEY));
  } catch {
    // Storage unavailable (private mode, disabled cookies, blocked origin)
    return [];
  }
}

function writeStoredBookmarks(bookmarks: BookmarkItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  } catch {
    // Quota exceeded or storage restricted
  }
}

export function useReadingList() {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setBookmarks(readStoredBookmarks());
    setIsReady(true);
  }, []);

  /**
   * Keeps every open tab in sync. The `storage` event only fires in the tabs
   * that did not perform the write, which is exactly the set that needs it.
   */
  useEffect(() => {
    const handleStorageEvent = (event: StorageEvent) => {
      if (event.key !== null && event.key !== STORAGE_KEY) return;
      setBookmarks(parseStoredBookmarks(event.newValue));
    };

    window.addEventListener('storage', handleStorageEvent);
    return () => window.removeEventListener('storage', handleStorageEvent);
  }, []);

  /**
   * Persistence follows state rather than being a side effect inside a state
   * updater (which React may invoke twice in development). Writes are skipped
   * until the initial read completes so an empty first render cannot erase an
   * existing list, and writing back the value received from another tab is a
   * no-op because the serialized string is identical.
   */
  useEffect(() => {
    if (!isReady) return;
    writeStoredBookmarks(bookmarks);
  }, [bookmarks, isReady]);

  const isBookmarked = useCallback(
    (postSlug: string) => bookmarks.some(b => b.slug === postSlug),
    [bookmarks]
  );

  const toggleBookmark = useCallback((item: BookmarkableItem) => {
    setBookmarks(prev => {
      const exists = prev.some(b => b.slug === item.slug);

      return exists
        ? prev.filter(b => b.slug !== item.slug)
        : [{ ...item, savedAt: Date.now() }, ...prev];
    });
  }, []);

  return { bookmarks, isBookmarked, toggleBookmark, isReady };
}
