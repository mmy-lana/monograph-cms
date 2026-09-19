'use client';

import { useState, useEffect, useCallback, RefObject } from 'react';
import { HighlightSelection } from '@/types/blog';

export function useTextSelection<T extends HTMLElement>(containerRef: RefObject<T | null>) {
  const [selection, setSelection] = useState<HighlightSelection | null>(null);

  const handleSelectionChange = useCallback(() => {
    const activeSelection = window.getSelection();
    if (!activeSelection || activeSelection.isCollapsed) {
      setSelection(null);
      return;
    }

    const text = activeSelection.toString().trim();
    if (text.length < 5) {
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

    setSelection({
      text,
      rect: {
        top: rect.top + window.scrollY,
        left: rect.left + rect.width / 2 + window.scrollX,
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
