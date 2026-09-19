import type { PortableTextBlock as SanityPortableTextBlock } from '@portabletext/types';

export type CustomPortableTextBlock = SanityPortableTextBlock & {
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
};

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
