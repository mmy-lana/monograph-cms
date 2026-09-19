import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type {
  CustomPortableTextBlock,
  CustomTextBlock,
  TableOfContentsItem
} from '@/types/blog';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
}

export function formatCompactNumber(num: number): string {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(num);
}

function hasTextPayload(value: unknown): value is { text?: unknown } {
  return Boolean(value && typeof value === 'object' && 'text' in value);
}

/**
 * Extracts the concatenated plain-text of a Portable Text block's children
 * without unsafe casts. Non-string `text` payloads are skipped.
 */
export function getBlockPlainText(block: { children?: unknown }): string {
  if (!Array.isArray(block.children)) return '';
  return block.children
    .map(child => (hasTextPayload(child) && typeof child.text === 'string' ? child.text : ''))
    .join('');
}

/** Slugifies a heading string into a URL-safe anchor id. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/** Narrows a body node to a text block (paragraph, heading, quote, list item). */
export function isTextBlock(block: CustomPortableTextBlock): block is CustomTextBlock {
  return block._type === 'block';
}

/** Narrows a text block to a heading node that anchors the table of contents. */
export function isHeadingBlock(
  block: CustomTextBlock
): block is CustomTextBlock & { style: 'h2' | 'h3' } {
  return block.style === 'h2' || block.style === 'h3';
}

/**
 * Derives the table-of-contents model from a post body. Anchor ids are shared
 * with the serializer so in-page links always resolve.
 */
export function getPostHeadings(blocks: CustomPortableTextBlock[]): TableOfContentsItem[] {
  return blocks
    .filter(isTextBlock)
    .filter(isHeadingBlock)
    .map(block => {
      const text = getBlockPlainText(block);
      return {
        id: slugify(text),
        text,
        level: block.style === 'h2' ? 2 : 3
      };
    });
}
