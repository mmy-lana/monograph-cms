import Link from 'next/link';
import { Bookmark, Search } from 'lucide-react';
import { EditorialAccessDialog } from '@/components/navigation/editorial-access-dialog';
import { getStudioUrl } from '@/lib/env';

/** Shared hit-area and focus treatment for the header's icon actions. */
const ICON_ACTION_CLASS =
  'min-h-[44px] min-w-[44px] flex items-center justify-center text-neutral-600 hover:text-black hover:bg-neutral-100 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900';

/** Shared treatment for the header's text actions. */
const TEXT_ACTION_CLASS =
  'hidden sm:inline-flex items-center min-h-[36px] px-3.5 rounded-full bg-editorial-accent text-white text-xs font-medium hover:bg-black transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900';

/**
 * Primary site navigation.
 *
 * Both header actions are real links rather than decorative shells. Search is an
 * anchor to the server-rendered `/search` route, so it is crawlable, works
 * without JavaScript and is operable with Enter from the keyboard. Write points
 * at the deployed Sanity Studio when `NEXT_PUBLIC_SANITY_STUDIO_URL` is set, and
 * otherwise opens an in-page notice, because there is no public editor route to
 * send an anonymous reader to.
 */
export function MainNav() {
  const studioUrl = getStudioUrl();

  return (
    <header className="sticky top-0 z-30 bg-paper/95 backdrop-blur-xs border-b border-editorial-border transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="group focus:outline-hidden">
            <span className="font-serif text-2xl sm:text-3xl font-black tracking-tighter text-black">
              Monograph<span className="text-editorial-green">.</span>
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden md:flex items-center gap-5 text-sm text-neutral-600">
            <Link href="/" className="hover:text-black transition-colors font-medium">
              Home
            </Link>
            <Link href="/category/systems-engineering" className="hover:text-black transition-colors">
              Engineering
            </Link>
            <Link href="/category/design-and-craft" className="hover:text-black transition-colors">
              Design
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/bookmarks"
            aria-label="View your saved reading list"
            className={ICON_ACTION_CLASS}
          >
            <Bookmark className="w-5 h-5" aria-hidden="true" />
          </Link>

          <Link href="/search" aria-label="Search articles" className={ICON_ACTION_CLASS}>
            <Search className="w-5 h-5" aria-hidden="true" />
          </Link>

          {studioUrl ? (
            <a
              href={studioUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Write for Monograph: open the Sanity Studio in a new tab"
              className={TEXT_ACTION_CLASS}
            >
              Write
            </a>
          ) : (
            <EditorialAccessDialog />
          )}
        </div>
      </div>
    </header>
  );
}
