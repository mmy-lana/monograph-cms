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

/**
 * Slugifies a heading string into a URL-safe anchor id.
 *
 * Symbol-only or non-Latin headings reduce to an empty string, which would emit
 * `id=""` and break every table-of-contents link (duplicate DOM ids are also
 * invalid HTML). Callers pass the block's position in the body so the fallback
 * stays deterministic and renders identically in the TOC and the serializer.
 */
export function slugify(text: string, fallbackIndex?: number): string {
  const slug = text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  if (slug !== '') return slug;

  const suffix =
    typeof fallbackIndex === 'number'
      ? String(fallbackIndex)
      : Math.random().toString(36).slice(2, 8);

  return `section-${suffix}`;
}

/**
 * Derives a stable numeric seed from a block key (32-bit multiply-xor hash).
 */
function anchorSeedFromKey(key: string): number {
  let hash = 0;

  for (let index = 0; index < key.length; index += 1) {
    hash = (Math.imul(hash, 31) + key.charCodeAt(index)) >>> 0;
  }

  return hash;
}

/**
 * Resolves the anchor id of a heading block.
 *
 * The seed for the empty-slug fallback comes from the block's `_key` rather than
 * its array position: `@portabletext/react` runs `nestLists` over the body before
 * rendering, so list items collapse into a single node and every following block
 * receives a smaller `index` than it has in the raw document. A positional seed
 * therefore produced `#section-5` in the table of contents against `#section-3`
 * in the rendered DOM. A key-derived seed is identical on both sides, and stays
 * valid when content is reordered.
 */
export function headingAnchorId(
  block: { _key?: string; children?: unknown },
  position: number
): string {
  const seed =
    typeof block._key === 'string' && block._key !== ''
      ? anchorSeedFromKey(block._key)
      : position;

  return slugify(getBlockPlainText(block), seed);
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
 * Derives the table-of-contents model from a post body.
 *
 * Anchors are produced by `headingAnchorId`, the same helper the Portable Text
 * serializer uses, so TOC hrefs and rendered heading ids cannot drift apart for
 * headings that have no ASCII slug.
 */
export function getPostHeadings(blocks: CustomPortableTextBlock[]): TableOfContentsItem[] {
  if (!Array.isArray(blocks)) return [];

  const headings: TableOfContentsItem[] = [];

  blocks.forEach((block, index) => {
    if (!isTextBlock(block) || !isHeadingBlock(block)) return;

    headings.push({
      id: headingAnchorId(block, index + 1),
      text: getBlockPlainText(block),
      level: block.style === 'h2' ? 2 : 3
    });
  });

  return headings;
}

/** Schemes an editorial link is allowed to use when rendered as an anchor. */
const ALLOWED_HREF_PROTOCOLS = new Set(['http:', 'https:', 'mailto:', 'tel:']);

/**
 * Validates a Portable Text link target before it reaches an `href` attribute.
 *
 * Only absolute http/https/mailto/tel URLs, fragment links and same-origin
 * relative paths are accepted. `javascript:`, `data:`, `vbscript:` and other
 * script-capable schemes are rejected so stored CMS content cannot become a
 * stored XSS vector; the caller renders rejected links as plain text.
 */
export function isValidHref(url: string): boolean {
  if (typeof url !== 'string') return false;

  // Browsers strip whitespace and control characters before resolving a scheme,
  // so a tab-separated "java script:alert(1)" is still executable. Normalize
  // before validating.
  const normalized = url.replace(/[\u0000-\u001F\u007F\s]/g, '');
  if (normalized === '') return false;

  // Backslashes are treated as path separators by browsers, which turns
  // "/\\evil.example" into the protocol-relative "//evil.example".
  if (normalized.includes('\\')) return false;

  if (normalized.startsWith('#')) return true;

  if (normalized.startsWith('/')) {
    // Protocol-relative URLs inherit the page scheme but leave the origin.
    return !normalized.startsWith('//');
  }

  try {
    const parsed = new URL(normalized);
    return ALLOWED_HREF_PROTOCOLS.has(parsed.protocol);
  } catch {
    // Scheme-less relative reference such as "posts/slug" or "?page=2".
    return !/^[a-z][a-z0-9+.-]*:/i.test(normalized);
  }
}

/**
 * Re-anchors a selection rectangle into the coordinate frame of the element the
 * popover is absolutely positioned inside. Range rects are viewport-relative,
 * while an absolute child of a centered container measures from that container,
 * so subtracting the container's own rect keeps the popover on the selection at
 * any scroll offset.
 */
export function relativeSelectionAnchor(
  rangeRect: { top: number; left: number; width: number },
  containerRect: { top: number; left: number }
): { top: number; left: number } {
  return {
    top: rangeRect.top - containerRect.top,
    left: rangeRect.left - containerRect.left + rangeRect.width / 2
  };
}

interface ClampPopoverLeftOptions {
  /** Desired center point, already relative to the container. */
  targetLeft: number;
  /** Width of the positioning container in CSS pixels. */
  containerWidth: number;
  /** Half the popover's own width. */
  halfWidth: number;
  /** Minimum breathing room kept between the popover and the container edge. */
  padding?: number;
}

/**
 * Keeps the popover fully inside its container. Without this an underline near
 * either edge pushes the clamped pill past the article column, and on mobile it
 * slides off screen entirely.
 */
export function clampPopoverLeft({
  targetLeft,
  containerWidth,
  halfWidth,
  padding = 8
}: ClampPopoverLeftOptions): number {
  const min = halfWidth + padding;

  if (!Number.isFinite(targetLeft)) return min;

  // The container has not been measured yet (first paint); leave the anchor
  // untouched rather than snapping the popover to an edge.
  if (!Number.isFinite(containerWidth) || containerWidth <= 0) return targetLeft;

  const max = containerWidth - halfWidth - padding;

  // Container narrower than the popover: center it and accept the overflow.
  if (max < min) return containerWidth / 2;

  return Math.min(Math.max(targetLeft, min), max);
}
