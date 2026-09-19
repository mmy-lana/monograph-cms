'use client';

import { useClaps } from '@/hooks/use-claps';
import { formatCompactNumber, cn } from '@/lib/utils';

interface ClapperButtonProps {
  postSlug: string;
  initialClaps: number;
}

export function ClapperButton({ postSlug, initialClaps }: ClapperButtonProps) {
  const { totalClaps, userClaps, isAnimating, triggerClap, maxReached } = useClaps(
    postSlug,
    initialClaps
  );

  return (
    <div className="relative inline-flex items-center">
      <button
        type="button"
        onClick={triggerClap}
        disabled={maxReached}
        aria-label={`Clap for this article. Currently ${totalClaps} claps.`}
        className={cn(
          'group flex items-center gap-2 min-h-[44px] min-w-[44px] px-3 py-2 rounded-full text-neutral-600 hover:text-black hover:bg-neutral-100 transition-colors focus-visible:outline-2 focus-visible:outline-neutral-900 cursor-pointer',
          userClaps > 0 && 'text-editorial-green font-medium'
        )}
      >
        <svg
          className={cn(
            'w-6 h-6 transition-transform duration-200 shrink-0',
            isAnimating && 'scale-125 -rotate-12',
            userClaps > 0 ? 'fill-editorial-green stroke-editorial-green' : 'fill-none stroke-current'
          )}
          viewBox="0 0 24 24"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
        </svg>
        <span className="text-sm font-sans tabular-nums select-none">
          {formatCompactNumber(totalClaps)}
        </span>
      </button>

      {isAnimating && (
        <div
          aria-hidden="true"
          className="absolute -top-10 left-2 animate-clap-rise pointer-events-none select-none"
        >
          <div className="bg-editorial-green text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow-md">
            +{userClaps}
          </div>
        </div>
      )}
    </div>
  );
}
