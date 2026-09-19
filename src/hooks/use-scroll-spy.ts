'use client';

import { useState, useEffect } from 'react';

export function useScrollSpy(headingIds: string[], offsetPx: number = 100): string {
  const [activeId, setActiveId] = useState<string>(headingIds[0] || '');

  useEffect(() => {
    if (!headingIds || headingIds.length === 0) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + offsetPx;

      for (let i = headingIds.length - 1; i >= 0; i--) {
        const id = headingIds[i];
        const element = document.getElementById(id);
        if (element) {
          const top = element.getBoundingClientRect().top + window.scrollY;
          if (scrollPosition >= top) {
            setActiveId(id);
            return;
          }
        }
      }

      setActiveId(headingIds[0]);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [headingIds, offsetPx]);

  return activeId;
}
