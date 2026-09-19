'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Copy, Check, TriangleAlert } from 'lucide-react';
import { HighlightSelection } from '@/types/blog';
import { cn, clampPopoverLeft, clampCaretOffset } from '@/lib/utils';

interface XBrandIconProps {
  className?: string;
}

/** Inline brand glyph: lucide-react no longer ships social logos. */
function XBrandIcon({ className }: XBrandIconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

interface HighlightPopoverProps {
  selection: HighlightSelection | null;
  onClear: () => void;
  articleTitle: string;
  /** Measured width of the positioning container, in CSS pixels. */
  containerWidth: number;
}

const POPOVER_WIDTH = 130;
const POPOVER_HALF_WIDTH = POPOVER_WIDTH / 2;
/** Minimum gap kept between the popover and the edge of the article column. */
const EDGE_PADDING = 8;
/**
 * Minimum gap kept between the caret and the popover's rounded end caps.
 * Larger than `EDGE_PADDING` because the caret is 6px wide on each side of its
 * centre, so 12px keeps it clear of the corner radius once the pill is clamped.
 */
const CARET_PADDING = 12;
const POPOVER_HEIGHT = 48;
const POPOVER_OFFSET = 54;
const RESET_DELAY_MS = 1600;

type CopyState = 'idle' | 'copied' | 'failed';

const COPY_STATUS_TEXT: Record<CopyState, string> = {
  idle: '',
  copied: 'Quote copied to clipboard.',
  failed: 'Copy blocked by the browser. Select the text and copy manually.'
};

export function HighlightPopover({
  selection,
  onClear,
  articleTitle,
  containerWidth
}: HighlightPopoverProps) {
  const [copyState, setCopyState] = useState<CopyState>('idle');
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // A new selection always starts from a clean confirmation state.
  useEffect(() => {
    setCopyState('idle');
  }, [selection]);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, []);

  const handleCopy = useCallback(async () => {
    if (!selection) return;

    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);

    try {
      await navigator.clipboard.writeText(`"${selection.text}"`);
      setCopyState('copied');
      resetTimerRef.current = setTimeout(() => {
        setCopyState('idle');
        onClear();
      }, RESET_DELAY_MS);
    } catch {
      // Clipboard permissions unavailable (insecure origin or user denial).
      setCopyState('failed');
      resetTimerRef.current = setTimeout(() => setCopyState('idle'), RESET_DELAY_MS);
    }
  }, [selection, onClear]);

  if (!selection) return null;

  /**
   * `selection.rect.left` is already relative to the article container, so the
   * clamp uses the container width measured by the shell. Clamping against the
   * viewport (the previous behaviour) placed the pill outside the column on
   * desktop and off screen on mobile.
   */
  const clampedLeft = clampPopoverLeft({
    targetLeft: selection.rect.left,
    containerWidth,
    halfWidth: POPOVER_HALF_WIDTH,
    padding: EDGE_PADDING
  });

  const tweetText = `"${selection.text.slice(0, 180)}..." — via ${articleTitle}`;
  const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(
    typeof window !== 'undefined' ? window.location.href : ''
  )}`;

  return (
    <div
      style={{
        position: 'absolute',
        top: `${selection.rect.top - POPOVER_OFFSET}px`,
        left: `${clampedLeft}px`,
        transform: 'translateX(-50%)',
        width: `${POPOVER_WIDTH}px`,
        height: `${POPOVER_HEIGHT}px`
      }}
      className="z-40 flex items-center justify-center gap-1 bg-neutral-900 text-white rounded-full px-2 shadow-xl animate-quote-popover"
    >
      <a
        href={shareUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share quote on X"
        className="w-11 h-11 flex items-center justify-center hover:text-editorial-green transition-colors rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <XBrandIcon className="w-4 h-4" />
      </a>
      <div className="w-[1px] h-4 bg-neutral-700" aria-hidden="true" />
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy quote to clipboard"
        className={cn(
          'w-11 h-11 flex items-center justify-center rounded-full transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white',
          copyState === 'failed' ? 'text-amber-400' : 'hover:text-editorial-green'
        )}
      >
        {copyState === 'copied' && <Check className="w-4 h-4 text-editorial-green" />}
        {copyState === 'failed' && <TriangleAlert className="w-4 h-4" />}
        {copyState === 'idle' && <Copy className="w-4 h-4" />}
      </button>

      <span role="status" aria-live="polite" className="sr-only">
        {COPY_STATUS_TEXT[copyState]}
      </span>

      {/* Downward triangle indicator using arbitrary border syntax. The offset
          is clamped so the caret stays inside the pill's rounded end caps: the
          raw selection-to-popover delta grows large once the pill has been
          pushed inward at either edge, which previously dragged the caret
          past the popover's own boundary. */}
      <div
        aria-hidden="true"
        className="absolute top-full border-solid border-t-neutral-900 border-t-[6px] border-x-transparent border-x-[6px] border-b-0"
        style={{
          left: `${clampCaretOffset({
            rawOffset: selection.rect.left - clampedLeft,
            popoverWidth: POPOVER_WIDTH,
            padding: CARET_PADDING
          })}px`,
          transform: 'translateX(-50%)'
        }}
      />
    </div>
  );
}
