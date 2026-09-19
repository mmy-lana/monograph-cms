'use client';

import { useRef, useEffect, useState } from 'react';
import { useTextSelection } from '@/hooks/use-text-selection';
import { HighlightPopover } from '@/components/article/highlight-popover';

interface ArticleInteractiveShellProps {
  children: React.ReactNode;
  articleTitle: string;
  postSlug: string;
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

  useEffect(() => {
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
