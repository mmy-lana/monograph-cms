'use client';

import { useRef, useEffect, useState } from 'react';
import { useTextSelection } from '@/hooks/use-text-selection';
import { HighlightPopover } from '@/components/article/highlight-popover';

interface ArticleInteractiveShellProps {
  children: React.ReactNode;
  articleTitle: string;
  postSlug: string;
}

/**
 * Session-scoped dedup key for the view beacon.
 *
 * React 19 StrictMode runs effects twice on mount in development, and a
 * browser back/forward restore re-runs the effect again, so a naive effect fired
 * two or more beacons per real page view and inflated `viewsCount`.
 */
function viewBeaconKey(postSlug: string): string {
  return `viewed_${postSlug}`;
}

/**
 * Reads the session marker, tolerating environments where `sessionStorage` is
 * unavailable. Safari in private mode throws on access rather than returning
 * null, and a storage failure must never break the article render.
 */
function hasRecordedView(postSlug: string): boolean {
  try {
    return window.sessionStorage.getItem(viewBeaconKey(postSlug)) !== null;
  } catch {
    // Storage blocked: fall through and send the beacon. A rare duplicate view
    // is preferable to dropping the count entirely.
    return false;
  }
}

function recordView(postSlug: string): void {
  try {
    window.sessionStorage.setItem(viewBeaconKey(postSlug), '1');
  } catch {
    // Non-fatal: the beacon is already sent.
  }
}

export function ArticleInteractiveShell({
  children,
  articleTitle,
  postSlug
}: ArticleInteractiveShellProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const { selection, clearSelection } = useTextSelection<HTMLDivElement>(containerRef);

  /**
   * The popover is clamped against the article column, not the viewport, so the
   * shell publishes the column's measured width. ResizeObserver covers column
   * changes that a window resize event alone would miss.
   */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateContainerWidth = () => {
      setContainerWidth(container.getBoundingClientRect().width);
    };

    updateContainerWidth();

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', updateContainerWidth);
      return () => window.removeEventListener('resize', updateContainerWidth);
    }

    const observer = new ResizeObserver(updateContainerWidth);
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  /**
   * View beacon, deduplicated per article per browser session.
   *
   * The marker is written before the request is issued rather than after it
   * resolves: a StrictMode remount runs this effect twice in the same tick, and
   * an in-flight flag set only on success would still allow both beacons out.
   * Writing first makes the second invocation a no-op. The cost is that a
   * genuinely failed request is not retried until the next session.
   */
  useEffect(() => {
    if (hasRecordedView(postSlug)) return;

    recordView(postSlug);
    fetch(`/api/posts/${postSlug}/view`, { method: 'POST' }).catch(() => {});
  }, [postSlug]);

  return (
    <div
      ref={containerRef}
      data-selectable-article="true"
      className="relative max-w-[42.5rem] mx-auto"
    >
      <HighlightPopover
        selection={selection}
        onClear={clearSelection}
        articleTitle={articleTitle}
        containerWidth={containerWidth}
      />
      {children}
    </div>
  );
}
