import { Post, PaginationParams } from '@/types/blog';
import { sanityClient, isSanityConfigured } from './sanity.client';
import { MOCK_POSTS } from './mock-data';

export const PAGINATED_POSTS_QUERY = `
  *[_type == "post" && status == "published" && !(_id in path("drafts.**"))] | order(publishedAt desc) [$offset...$limit] {
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

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (isSanityConfigured && sanityClient) {
    try {
      const post = await sanityClient.fetch<Post | null>(SINGLE_POST_QUERY, { slug });
      if (post) return post;
    } catch {
      // Fall through
    }
  }

  return MOCK_POSTS.find(p => p.slug === slug && p.status === 'published') || null;
}
