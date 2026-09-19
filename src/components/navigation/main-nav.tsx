import Link from 'next/link';
import { Bookmark, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function MainNav() {
  return (
    <header className="sticky top-0 z-30 bg-paper/95 backdrop-blur-xs border-b border-editorial-border transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="group focus:outline-hidden">
            <span className="font-serif text-2xl sm:text-3xl font-black tracking-tighter text-black">
              Monograph<span className="text-editorial-green">.</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-5 text-sm text-neutral-600">
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
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-neutral-600 hover:text-black hover:bg-neutral-100 rounded-full transition-colors"
          >
            <Bookmark className="w-5 h-5" />
          </Link>
          <Button variant="ghost" size="icon" aria-label="Search articles">
            <Search className="w-5 h-5 text-neutral-600" />
          </Button>
          <Button variant="primary" size="sm" className="hidden sm:inline-flex">
            Write
          </Button>
        </div>
      </div>
    </header>
  );
}
