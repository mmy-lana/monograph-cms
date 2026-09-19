import { Post, PaginationParams } from '@/types/blog';
import { sanityClient, isSanityConfigured } from './sanity.client';
import { MOCK_POSTS } from './mock-data';
import { calculateReadingTime } from './reading-time';

/**
 * Shared projection for every feed-shaped query so pagination, category
 * filtering and ranking all return an identical `Post` shape.
 */
const POST_FEED_PROJECTION = `
  _id,
  title,
  "slug": slug.current,
  subtitle,
  status,
  coverImage {
    "url": asset->url,
    alt,
    caption
  },
  publishedAt,
  updatedAt,
  author-> {
    _id,
    name,
    "slug": slug.current,
    "avatarUrl": avatar.asset->url,
    bio,
    role,
    followersCount
  },
  categories[]-> {
    _id,
    title,
    "slug": slug.current,
    description,
    color
  },
  tags,
  estimatedReadingTime,
  wordCount,
  clapsCount,
  viewsCount
`;

/** Published, non-draft posts ordered newest first, sliced by offset/limit. */
export const PAGINATED_POSTS_QUERY = `
  *[_type == "post" && status == "published" && !(_id in path("drafts.**"))] | order(publishedAt desc) [$offset...$limit] {
    ${POST_FEED_PROJECTION}
  }
`;

/** Published, non-draft posts ranked by reader applause for the featured feed. */
export const FEATURED_POSTS_QUERY = `
  *[_type == "post" && status == "published" && !(_id in path("drafts.**"))] | order(clapsCount desc, publishedAt desc) [$offset...$limit] {
    ${POST_FEED_PROJECTION}
  }
`;

/** Published, non-draft posts belonging to a single category. */
export const POSTS_BY_CATEGORY_QUERY = `
  *[_type == "post" && status == "published" && !(_id in path("drafts.**")) && $slug in categories[]->slug.current] | order(publishedAt desc) [$offset...$limit] {
    ${POST_FEED_PROJECTION}
  }
`;

export const SINGLE_POST_QUERY = `
  *[_type == "post" && slug.current == $slug && status == "published" && !(_id in path("drafts.**"))][0] {
    _id,
    title,
    "slug": slug.current,
    subtitle,
    status,
    coverImage {
      "url": asset->url,
      alt,
      caption
    },
    publishedAt,
    updatedAt,
    author-> {
      _id,
      name,
      "slug": slug.current,
      "avatarUrl": avatar.asset->url,
      bio,
      role,
      twitterHandle,
      followersCount
    },
    categories[]-> {
      _id,
      title,
      "slug": slug.current,
      description,
      color
    },
    tags,
    body,
    estimatedReadingTime,
    wordCount,
    clapsCount,
    viewsCount
  }
`;

export async function getAllPosts(params?: PaginationParams): Promise<Post[]> {
  const offset = params?.offset ?? 0;
  const limit = (params?.limit ?? 10) + offset;

  if (isSanityConfigured && sanityClient) {
    try {
      return await sanityClient.fetch<Post[]>(PAGINATED_POSTS_QUERY, { offset, limit });
    } catch {
      // Fall through to mock dataset
    }
  }

  return MOCK_POSTS.filter(p => p.status === 'published').slice(offset, limit);
}

/** Published posts ranked by applause, mirroring `FEATURED_POSTS_QUERY` offline. */
export async function getFeaturedPosts(params?: PaginationParams): Promise<Post[]> {
  const offset = params?.offset ?? 0;
  const limit = (params?.limit ?? 10) + offset;

  if (isSanityConfigured && sanityClient) {
    try {
      return await sanityClient.fetch<Post[]>(FEATURED_POSTS_QUERY, { offset, limit });
    } catch {
      // Fall through to mock dataset
    }
  }

  return MOCK_POSTS.filter(p => p.status === 'published')
    .slice()
    .sort((a, b) => b.clapsCount - a.clapsCount || b.publishedAt.localeCompare(a.publishedAt))
    .slice(offset, limit);
}

/** Published posts for one category, slice-paginated like every other feed. */
export async function getPostsByCategorySlug(
  slug: string,
  params?: PaginationParams
): Promise<Post[]> {
  const offset = params?.offset ?? 0;
  const limit = (params?.limit ?? 10) + offset;

  if (isSanityConfigured && sanityClient) {
    try {
      return await sanityClient.fetch<Post[]>(POSTS_BY_CATEGORY_QUERY, { slug, offset, limit });
    } catch {
      // Fall through to mock dataset
    }
  }

  return MOCK_POSTS.filter(
    p => p.status === 'published' && p.categories.some(c => c.slug === slug)
  ).slice(offset, limit);
}

/**
 * Fills in reading statistics for documents that do not carry them.
 * Published CMS documents may omit `estimatedReadingTime` / `wordCount`, so
 * they are derived from the body rather than trusted to be present.
 */
function withDerivedReadingStats(post: Post): Post {
  const needsMinutes = !Number.isFinite(post.estimatedReadingTime) || post.estimatedReadingTime < 1;
  const needsWords = !Number.isFinite(post.wordCount) || post.wordCount < 1;

  if (!needsMinutes && !needsWords) return post;

  const derived = calculateReadingTime(Array.isArray(post.body) ? post.body : []);

  return {
    ...post,
    estimatedReadingTime: needsMinutes ? derived.minutes : post.estimatedReadingTime,
    wordCount: needsWords ? derived.words : post.wordCount
  };
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (isSanityConfigured && sanityClient) {
    try {
      const post = await sanityClient.fetch<Post | null>(SINGLE_POST_QUERY, { slug });
      if (post) return withDerivedReadingStats(post);
    } catch {
      // Fall through
    }
  }

  const mockPost = MOCK_POSTS.find(p => p.slug === slug && p.status === 'published');
  return mockPost ? withDerivedReadingStats(mockPost) : null;
}

export const POST_SLUGS_QUERY = `
  *[_type == "post" && status == "published" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    "slug": slug.current
  }
`;

export const CATEGORY_SLUGS_QUERY = `
  *[_type == "category" && count(*[_type == "post" && status == "published" && !(_id in path("drafts.**")) && references(^._id)]) > 0] | order(title asc) {
    "slug": slug.current
  }
`;

interface SlugRow {
  slug: string | null;
}

function collectSlugs(rows: SlugRow[]): string[] {
  const slugs = new Set<string>();
  for (const row of rows) {
    if (typeof row.slug === 'string' && row.slug.trim() !== '') {
      slugs.add(row.slug);
    }
  }
  return [...slugs];
}

/**
 * Every published post slug, used to statically enumerate routes.
 * Drafts are excluded here exactly as they are in the feed queries, so a
 * draft slug can never be pre-rendered.
 */
export async function getAllPostSlugs(): Promise<string[]> {
  if (isSanityConfigured && sanityClient) {
    try {
      const rows = await sanityClient.fetch<SlugRow[]>(POST_SLUGS_QUERY);
      return collectSlugs(rows);
    } catch {
      // Fall through to mock dataset
    }
  }

  return MOCK_POSTS.filter(p => p.status === 'published').map(p => p.slug);
}

/** Every category slug that currently has at least one published post. */
export async function getAllCategorySlugs(): Promise<string[]> {
  if (isSanityConfigured && sanityClient) {
    try {
      const rows = await sanityClient.fetch<SlugRow[]>(CATEGORY_SLUGS_QUERY);
      const slugs = collectSlugs(rows);
      if (slugs.length > 0) return slugs;
    } catch {
      // Fall through to mock dataset
    }
  }

  const slugs = new Set<string>();
  for (const post of MOCK_POSTS) {
    if (post.status !== 'published') continue;
    for (const category of post.categories) {
      slugs.add(category.slug);
    }
  }
  return [...slugs];
}
