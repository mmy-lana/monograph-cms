'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

const MAX_CLAPS_PER_USER = 50;
const SYNC_DEBOUNCE_MS = 800;
const ANIMATION_MS = 600;

interface ClapResponse {
  success?: boolean;
  totalClaps?: number;
  error?: string;
}

function postClaps(postSlug: string, count: number, keepalive = false): Promise<Response> {
  return fetch(`/api/posts/${postSlug}/clap`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ count }),
    keepalive
  });
}

function readStoredClaps(postSlug: string): number {
  try {
    const stored = localStorage.getItem(`claps_${postSlug}`);
    if (!stored) return 0;
    const parsed = Number.parseInt(stored, 10);
    return Number.isFinite(parsed) && parsed > 0 ? Math.min(parsed, MAX_CLAPS_PER_USER) : 0;
  } catch {
    // LocalStorage access restricted
    return 0;
  }
}

function writeStoredClaps(postSlug: string, value: number): void {
  try {
    localStorage.setItem(`claps_${postSlug}`, value.toString());
  } catch {
    // Quota exceeded or private browsing mode
  }
}

export function useClaps(postSlug: string, initialTotalClaps: number) {
  const [totalClaps, setTotalClaps] = useState<number>(initialTotalClaps);
  const [userClaps, setUserClaps] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingClapsDeltaRef = useRef<number>(0);

  useEffect(() => {
    setUserClaps(readStoredClaps(postSlug));
  }, [postSlug]);

  const persistClaps = useCallback(
    async (delta: number) => {
      try {
        const res = await postClaps(postSlug, delta);
        if (!res.ok) return;
        const data = (await res.json()) as ClapResponse;
        if (typeof data.totalClaps === 'number') {
          setTotalClaps(data.totalClaps);
        }
      } catch {
        // Network drop: the optimistic count stands and the reader can clap again.
      }
    },
    [postSlug]
  );

  /**
   * Flushes applause still inside the debounce window so navigating away or
   * closing the tab does not silently discard it. `keepalive` lets the request
   * outlive the page.
   */
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      if (animationTimerRef.current) clearTimeout(animationTimerRef.current);

      const pending = pendingClapsDeltaRef.current;
      if (pending > 0) {
        pendingClapsDeltaRef.current = 0;
        void postClaps(postSlug, pending, true).catch(() => {
          // Best-effort flush; nothing further can be retried after unload.
        });
      }
    };
  }, [postSlug]);

  const triggerClap = useCallback(() => {
    if (userClaps >= MAX_CLAPS_PER_USER) return;

    const nextUserClaps = Math.min(userClaps + 1, MAX_CLAPS_PER_USER);

    setUserClaps(nextUserClaps);
    writeStoredClaps(postSlug, nextUserClaps);

    setTotalClaps(prev => prev + 1);

    setIsAnimating(true);
    if (animationTimerRef.current) clearTimeout(animationTimerRef.current);
    animationTimerRef.current = setTimeout(() => setIsAnimating(false), ANIMATION_MS);

    pendingClapsDeltaRef.current += 1;

    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => {
      const delta = pendingClapsDeltaRef.current;
      pendingClapsDeltaRef.current = 0;
      if (delta > 0) void persistClaps(delta);
    }, SYNC_DEBOUNCE_MS);
  }, [userClaps, postSlug, persistClaps]);

  return {
    totalClaps,
    userClaps,
    maxReached: userClaps >= MAX_CLAPS_PER_USER,
    isAnimating,
    triggerClap
  };
}
