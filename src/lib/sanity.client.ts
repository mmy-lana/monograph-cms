import { createClient } from 'next-sanity';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = '2025-01-01';
export const sanityToken = process.env.SANITY_API_WRITE_TOKEN || '';

export const isSanityConfigured = Boolean(
  projectId && projectId.trim() !== '' && projectId !== 'mock_project'
);

export const sanityClient = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: process.env.NODE_ENV === 'production',
      token: sanityToken || undefined
    })
  : null;
