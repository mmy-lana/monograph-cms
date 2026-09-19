'use client';

import { useState, useEffect } from 'react';
import { Twitter, Copy, Check } from 'lucide-react';
import { HighlightSelection } from '@/types/blog';

interface HighlightPopoverProps {
  selection: HighlightSelection | null;
  onClear: () => void;
  articleTitle: string;
}

const POPOVER_WIDTH = 130;
const POPOVER_HALF_WIDTH = POPOVER_WIDTH / 2;
const VIEWPORT_PADDING = 16;

export function HighlightPopover({ selection, onClear, articleTitle }: HighlightPopoverProps) {
  const [copied, setCopied] = useState(false);
  const [clampedLeft, setClampedLeft] = useState<number>(0);

  useEffect(() => {
    if (!selection) return;

    const windowWidth = window.innerWidth;
    const targetLeft = selection.rect.left;

    const minX = POPOVER_HALF_WIDTH + VIEWPORT_PADDING;
    const maxX = windowWidth - POPOVER_HALF_WIDTH - VIEWPORT_PADDING;
    const boundedX = Math.max(minX, Math.min(targetLeft, maxX));

    setClampedLeft(boundedX);
  }, [selection]);

  if (!selection) return null;

  const tweetText = `"${selection.text.slice(0, 180)}..." — via ${articleTitle}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(
    typeof window !== 'undefined' ? window.location.href : ''
  )}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`"${selection.text}"`);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        onClear();
      }, 1000);
    } catch {
      // Clipboard permissions unavailable
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: `${selection.rect.top - 54}px`,
        left: `${clampedLeft}px`,
        transform: 'translateX(-50%)',
        width: `${POPOVER_WIDTH}px`
      }}
      className="z-40 flex items-center justify-center gap-1 bg-neutral-900 text-white rounded-full h-10 px-2 shadow-xl animate-in fade-in zoom-in-95 duration-150"
    >
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share quote on X"
        className="w-8 h-8 flex items-center justify-center hover:text-editorial-green transition-colors rounded-full"
      >
        <Twitter className="w-4 h-4 fill-current" />
      </a>
      <div className="w-[1px] h-3 bg-neutral-700 mx-0.5" />
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy quote to clipboard"
        className="w-8 h-8 flex items-center justify-center hover:text-editorial-green transition-colors rounded-full cursor-pointer"
      >
        {copied ? <Check className="w-4 h-4 text-editorial-green" /> : <Copy className="w-4 h-4" />}
      </button>
      <div
        className="absolute top-full border-solid border-t-neutral-900 border-t-[6px] border-x-transparent border-x-[6px] border-b-0"
        style={{
          left: `calc(50% + ${selection.rect.left - clampedLeft}px)`,
          transform: 'translateX(-50%)'
        }}
      />
    </div>
  );
}
