'use client';

import { useState, useEffect } from 'react';

/**
 * Tracks reading progress as a 0-100 percentage.
 *
 * Scroll and resize both fire far faster than the display refreshes (a 120Hz
 * trackpad easily produces several events per frame), so the measurement is
 * coalesced into a single requestAnimationFrame callback. Only one frame is ever
 * in flight, and the pending frame is cancelled on unmount so a scroll cannot
 * write state into an unmounted component.
 */
export function useReadingProgress(): number {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    let frameId: number | null = null;

    const measure = () => {
      frameId = null;

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) {
        setProgress(0);
        return;
      }

      const currentScroll = window.scrollY;
      const calculated = Math.min(100, Math.max(0, (currentScroll / totalHeight) * 100));
      setProgress(calculated);
    };

    const scheduleMeasurement = () => {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(measure);
    };

    window.addEventListener('scroll', scheduleMeasurement, { passive: true });
    // Document height changes on resize and on font/image reflow, so the
    // percentage has to be recomputed even without a scroll event.
    window.addEventListener('resize', scheduleMeasurement);

    scheduleMeasurement();

    return () => {
      window.removeEventListener('scroll', scheduleMeasurement);
      window.removeEventListener('resize', scheduleMeasurement);
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
        frameId = null;
      }
    };
  }, []);

  return progress;
}
