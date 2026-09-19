'use client';

import { useRef, useEffect } from 'react';
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
  const { selection, clearSelection } = useTextSelection<HTMLDivElement>(containerRef);

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
      />
      {children}
    </div>
  );
}
