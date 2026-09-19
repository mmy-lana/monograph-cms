'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

const MAX_CLAPS_PER_USER = 50;

export function useClaps(postSlug: string, initialTotalClaps: number) {
  const [totalClaps, setTotalClaps] = useState<number>(initialTotalClaps);
  const [userClaps, setUserClaps] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const pendingClapsDeltaRef = useRef<number>(0);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(`claps_${postSlug}`);
      if (stored) {
        setUserClaps(parseInt(stored, 10) || 0);
      }
    } catch {
      // LocalStorage access restricted
    }
  }, [postSlug]);

  const persistClaps = useCallback(async (delta: number) => {
    try {
      const res = await fetch(`/api/posts/${postSlug}/clap`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ count: delta })
      });
      if (res.ok) {
        const data = await res.json();
        if (typeof data.totalClaps === 'number') {
          setTotalClaps(data.totalClaps);
        }
      }
    } catch {
      // Network drop: state remains optimistic
    }
  }, [postSlug]);

  const triggerClap = useCallback(() => {
    if (userClaps >= MAX_CLAPS_PER_USER) return;

    setUserClaps(prev => {
      const updated = Math.min(prev + 1, MAX_CLAPS_PER_USER);
      try {
        localStorage.setItem(`claps_${postSlug}`, updated.toString());
      } catch {}
      return updated;
    });

    setTotalClaps(prev => prev + 1);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 600);

    pendingClapsDeltaRef.current += 1;

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      if (pendingClapsDeltaRef.current > 0) {
        persistClaps(pendingClapsDeltaRef.current);
        pendingClapsDeltaRef.current = 0;
      }
    }, 800);
  }, [userClaps, postSlug, persistClaps]);

  return {
    totalClaps,
    userClaps,
    maxReached: userClaps >= MAX_CLAPS_PER_USER,
    isAnimating,
    triggerClap
  };
}
