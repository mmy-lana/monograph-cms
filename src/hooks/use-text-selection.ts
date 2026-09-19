'use client';

import { useState, useEffect, useCallback, RefObject } from 'react';
import { HighlightSelection } from '@/types/blog';
import { relativeSelectionAnchor } from '@/lib/utils';

/** Ignore accidental double-clicks and stray caret drags. */
const MIN_SELECTION_LENGTH = 5;

/**
 * Tracks a text selection inside `containerRef` and reports its anchor point in
 * the container's own coordinate frame.
 *
 * The popover is an absolutely-positioned child of the article container, so it
 * is positioned against that element, not the document. Mixing in
 * `window.scrollX/scrollY` (a global frame) pushed the popover off screen on
 * every scrolled page; subtracting the container's rect keeps it pinned to the
 * selection at any scroll offset, and it stays correct while scrolling because
 * both the container and the popover move together.
 */
export function useTextSelection<T extends HTMLElement>(containerRef: RefObject<T | null>) {
  const [selection, setSelection] = useState<HighlightSelection | null>(null);

  const handleSelectionChange = useCallback(() => {
    const activeSelection = window.getSelection();
    if (!activeSelection || activeSelection.isCollapsed) {
      setSelection(null);
      return;
    }

    const text = activeSelection.toString().trim();
    if (text.length < MIN_SELECTION_LENGTH) {
      setSelection(null);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    if (activeSelection.rangeCount === 0) return;
    const range = activeSelection.getRangeAt(0);
    const commonAncestor = range.commonAncestorContainer;

    if (!container.contains(commonAncestor)) {
      setSelection(null);
      return;
    }

    const rect = range.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) {
      setSelection(null);
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const anchor = relativeSelectionAnchor(
      { top: rect.top, left: rect.left, width: rect.width },
      { top: containerRect.top, left: containerRect.left }
    );

    setSelection({
      text,
      rect: {
        top: anchor.top,
        left: anchor.left,
        width: rect.width
      }
    });
  }, [containerRef]);

  useEffect(() => {
    document.addEventListener('selectionchange', handleSelectionChange);
    window.addEventListener('resize', handleSelectionChange);

    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
      window.removeEventListener('resize', handleSelectionChange);
    };
  }, [handleSelectionChange]);

  const clearSelection = useCallback(() => {
    window.getSelection()?.removeAllRanges();
    setSelection(null);
  }, []);

  return { selection, clearSelection };
}
