import Link from 'next/link';

interface FooterLink {
  href: string;
  label: string;
}

/** Only destinations that actually exist in this application. */
const FOOTER_LINKS: FooterLink[] = [
  { href: '/', label: 'Latest stories' },
  { href: '/category/systems-engineering', label: 'Engineering' },
  { href: '/category/design-and-craft', label: 'Design' },
  { href: '/bookmarks', label: 'Reading list' }
];

export function Footer() {
  return (
    <footer className="border-t border-editorial-border py-12 mt-20 text-center text-xs text-neutral-500 font-sans">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© 2026 Monograph Publishing Platform. Built with Next.js &amp; Sanity.</p>
        <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {FOOTER_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
