import type { PortableTextBlock as SanityPortableTextBlock } from '@portabletext/types';

/**
 * Editorial fields layered on top of the Portable Text specification.
 * Shared by every node type so consumers can read them without having to
 * narrow to a specific variant first.
 */
export interface CustomNodeFields {
  language?: string;
  code?: string;
  filename?: string;
  tone?: 'info' | 'warning' | 'tip';
  text?: string;
  caption?: string;
  alt?: string;
  asset?: {
    _ref?: string;
    _type?: string;
    url?: string;
  };
}

/**
 * A text node (paragraph, heading, quote, list item).
 * Per the Portable Text spec `children` is always present on these nodes.
 */
export type CustomTextBlock = SanityPortableTextBlock & CustomNodeFields;

/** An embedded object node: callout aside, code sample, or figure image. */
export type CustomObjectBlock =
  | ({ _type: 'callout' } & CustomNodeFields)
  | ({ _type: 'code' } & CustomNodeFields)
  | ({ _type: 'image' } & CustomNodeFields);

/**
 * Discriminated union of every node that can appear in a post body.
 * Discriminating on `_type` narrows object nodes; text nodes keep the
 * broader `"block" | (string & {})` discriminant from the spec.
 */
export type CustomPortableTextBlock = CustomTextBlock | CustomObjectBlock;

/** Callout aside node, narrowed for the serializer's `types.callout` component. */
export type CalloutNode = Extract<CustomPortableTextBlock, { _type: 'callout' }>;

/** Code sample node, narrowed for the serializer's `types.code` component. */
export type CodeNode = Extract<CustomPortableTextBlock, { _type: 'code' }>;

/** Figure image node, narrowed for the serializer's `types.image` component. */
export type ImageNode = Extract<CustomPortableTextBlock, { _type: 'image' }>;

export interface Author {
  _id: string;
  name: string;
  slug: string;
  avatarUrl: string;
  bio: string;
  role: string;
  twitterHandle?: string;
  followersCount: number;
}

export interface Category {
  _id: string;
  title: string;
  slug: string;
  description: string;
  color: string;
}

export interface TableOfContentsItem {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface Post {
  _id: string;
  title: string;
  slug: string;
  subtitle: string;
  status: 'published' | 'draft';
  coverImage: {
    url: string;
    alt: string;
    caption?: string;
  };
  publishedAt: string;
  updatedAt?: string;
  author: Author;
  categories: Category[];
  tags: string[];
  estimatedReadingTime: number;
  wordCount: number;
  body: CustomPortableTextBlock[];
  clapsCount: number;
  viewsCount: number;
}

export interface BookmarkableItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  authorName: string;
  authorAvatar: string;
  coverImageUrl: string;
  estimatedReadingTime: number;
}

export interface BookmarkItem extends BookmarkableItem {
  savedAt: number;
}

export interface HighlightSelection {
  text: string;
  rect: {
    top: number;
    left: number;
    width: number;
  };
}

export interface PaginationParams {
  offset?: number;
  limit?: number;
}
