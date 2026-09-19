'use client';

import { TableOfContentsItem } from '@/types/blog';
import { useScrollSpy } from '@/hooks/use-scroll-spy';
import { cn } from '@/lib/utils';

interface TableOfContentsProps {
  headings: TableOfContentsItem[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const headingIds = headings.map(h => h.id);
  const activeId = useScrollSpy(headingIds, 120);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="text-sm">
      <p className="font-sans font-semibold text-neutral-900 uppercase tracking-wider text-xs mb-3">
        In this article
      </p>
      <ul className="space-y-2.5 border-l border-editorial-border">
        {headings.map(h => {
          const isActive = activeId === h.id;
          return (
            <li key={h.id} className={cn('pl-3 -ml-[1px]', h.level === 3 && 'pl-6')}>
              <a
                href={`#${h.id}`}
                className={cn(
                  'block font-sans line-clamp-1 transition-colors',
                  isActive
                    ? 'border-l-2 border-black -ml-[13px] pl-[11px] font-medium text-black'
                    : 'text-neutral-500 hover:text-neutral-900'
                )}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
