import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/sanity.queries';
import { PostCardHorizontal } from '@/components/feed/post-card-horizontal';
import type { Post } from '@/types/blog';

export const revalidate = 60;

/**
 * Upper bound on matches returned in one response. The filter runs over the
 * published feed, so this only guards the rendered list against a pathological
 * query rather than acting as a pagination cursor.
 */
const SEARCH_RESULT_LIMIT = 30;

/** Longest query accepted. Beyond this the input is truncated, not rejected. */
const MAX_QUERY_LENGTH = 80;

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export const metadata: Metadata = {
  title: 'Search — Monograph',
  description: 'Search every published Monograph story by title, author or topic.'
};

/**
 * Folds separators that split a compound word so the terms on both sides of a
 * match can be compared in the same form.
 *
 * Without this a reader searching "btree" would not match a title set as
 * "B-Tree", and "systems engineering" would not match the hyphenated
 * "systems-engineering" topic. Hyphens, slashes, ampersands and every other
 * non-letter, non-number run collapse to a single space, which is what search
 * engines conventionally do before comparing terms. Applied to the query and to
 * each field, so both sides fold identically.
 */
function foldSeparators(value: string): string {
  return value.replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
}

/**
 * Normalises a query for matching.
 *
 * Case, surrounding whitespace and curly apostrophes are folded so a reader
 * typing "engineer's" matches a title set as "Engineer's". Length is capped to
 * bound the work a single crafted query can request.
 */
function normalizeQuery(value: string | undefined): string {
  if (typeof value !== 'string') return '';

  return foldSeparators(value.trim().replace(/[\u2018\u2019]/g, "'")).slice(0, MAX_QUERY_LENGTH);
}

/** Escapes a user string so it can be embedded in a RegExp verbatim. */
function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Matches a query term against one field on a word-boundary basis.
 *
 * A substring test would make "cat" match "concatenate", which buries the
 * relevant result, so the term must start a word.
 *
 * The term is tested against the field and against the field with every space
 * removed. Folding turned "B-Tree" into "b tree", so the single most obvious
 * query for that story, "btree", would otherwise miss it; comparing the compacted
 * field as well as the spaced one recovers the match while leaving the
 * word-boundary rule intact, because the pattern is still anchored. Every
 * alternative the pattern can contain is a literal produced by `escapeRegExp`,
 * so neither pass introduces backtracking.
 */
function fieldMatches(field: string, term: string): boolean {
  if (field === '' || term === '') return false;

  const escaped = escapeRegExp(term);
  const compactTerm = escapeRegExp(term.replace(/ /g, ''));
  const alternatives = escaped === compactTerm ? escaped : `${escaped}|${compactTerm}`;

  const pattern = new RegExp(`(^|[^\\p{L}\\p{N}])(?:${alternatives})`, 'iu');

  // The compacted field is only reached when the spaced test fails, so the
  // common path stays a single regex evaluation per haystack.
  if (pattern.test(field)) return true;

  return pattern.test(field.replace(/ /g, ''));
}

/** The searchable text of a post, as parallel fields mapped to one post. */
function matchesQuery(post: Post, terms: string[]): boolean {
  const haystacks = [
    post.title,
    post.subtitle,
    post.author.name,
    post.author.role,
    ...post.categories.map(category => category.title),
    ...post.tags
  ].map(field => foldSeparators(field).toLowerCase());

  // Every term must match somewhere (AND), but not necessarily the same field.
  return terms.every(term => haystacks.some(field => fieldMatches(field, term)));
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q: rawQuery } = await searchParams;
  const query = normalizeQuery(rawQuery);
  // normalizeQuery has already collapsed separator runs and lowercased nothing
  // that matters; terms are compared case-insensitively by fieldMatches.
  const terms = query.split(' ').filter(term => term !== '');

  const posts = await getAllPosts({ offset: 0, limit: 200 });
  const results = terms.length === 0 ? [] : posts.filter(post => matchesQuery(post, terms));
  const visibleResults = results.slice(0, SEARCH_RESULT_LIMIT);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="font-serif text-3xl sm:text-4xl font-black tracking-tight text-black mb-3">
        Search
      </h1>
      <p className="text-sm text-neutral-600 mb-8">
        Search every published story by title, author or topic.
      </p>

      <form action="/search" method="get" role="search" className="mb-10">
        <label htmlFor="search-input" className="block text-xs font-medium text-neutral-700 mb-2">
          Search terms
        </label>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            id="search-input"
            type="search"
            name="q"
            defaultValue={query}
            maxLength={MAX_QUERY_LENGTH}
            autoComplete="off"
            placeholder="B-tree indexing, Elena Rostova, databases"
            aria-describedby="search-hint"
            className="flex-1 min-h-[44px] px-4 rounded-full border border-neutral-300 bg-white text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
          />

          <button
            type="submit"
            className="inline-flex items-center justify-center min-h-[44px] px-6 rounded-full bg-neutral-900 text-white text-sm font-medium hover:bg-black transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
          >
            Search
          </button>
        </div>

        <p id="search-hint" className="text-xs text-neutral-500 mt-2">
          All terms must match. Matching ignores letter case and looks at whole words.
        </p>
      </form>

      <section aria-labelledby="search-results-heading">
        <h2 id="search-results-heading" className="sr-only">
          Search results
        </h2>

        {/* The count is polite: typing in the field does not announce, but a
            submitted search does. */}
        <p role="status" aria-live="polite" className="text-sm text-neutral-600 mb-6">
          {terms.length === 0
            ? 'Enter a search term to begin.'
            : `${results.length} ${results.length === 1 ? 'story' : 'stories'} matched "${query}".`}
        </p>

        {terms.length > 0 && results.length === 0 && (
          <div className="py-20 text-center border border-dashed border-editorial-border rounded-xs">
            <p className="font-serif text-lg text-neutral-800 mb-1">No stories matched.</p>
            <p className="text-xs text-neutral-500 mb-6">
              Try a shorter term, an author surname, or a topic such as databases.
            </p>
            <Link
              href="/"
              className="inline-flex items-center min-h-[44px] px-5 bg-neutral-900 text-white rounded-full text-xs font-medium hover:bg-black transition-colors"
            >
              Back to the latest feed
            </Link>
          </div>
        )}

        {results.length > SEARCH_RESULT_LIMIT && (
          <p className="text-xs text-neutral-500 mb-4">
            Showing the first {SEARCH_RESULT_LIMIT} of {results.length} matches. Narrow the
            query to see the rest.
          </p>
        )}

        <div>
          {visibleResults.map(post => (
            <PostCardHorizontal key={post._id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
