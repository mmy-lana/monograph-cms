'use client';

import { useReadingProgress } from '@/hooks/use-reading-progress';

export function ReadingProgressBar() {
  const progress = useReadingProgress();

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[3px] bg-transparent z-50 pointer-events-none"
    >
      <div
        className="h-full bg-editorial-green transition-all duration-75 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
