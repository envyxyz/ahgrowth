"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Progress (0 to 1) of an element's scroll track through the viewport, read
 * from ONE rAF-throttled listener. Drives the pinned horizontal carousel and
 * the word-wipe scrub, so both scroll-tied effects share a single read per
 * frame rather than each installing their own listener.
 *
 * `enabled: false` (reduced motion, or below the pin breakpoint) skips the
 * listener entirely and reports 0, so consumers render their static layout.
 */
export function useScrollProgress<T extends HTMLElement>(enabled = true) {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) {
      setProgress(0);
      return;
    }

    let ticking = false;

    const read = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      // Distance the track can travel before its bottom clears the viewport.
      const travel = rect.height - window.innerHeight;
      if (travel <= 0) {
        setProgress(0);
        return;
      }
      setProgress(Math.min(Math.max(-rect.top / travel, 0), 1));
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [enabled]);

  return { ref, progress };
}

/**
 * Progress (0 to 1) of an element travelling THROUGH the viewport, for
 * elements shorter than one screen: 0 when its top sits at 85% of the
 * viewport height, 1 when it reaches 25%. Drives the word-wipe scrub and the
 * footer's parallax counter-offset.
 */
export function useViewportProgress<T extends HTMLElement>(enabled = true) {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) {
      setProgress(1);
      return;
    }

    let ticking = false;

    const read = () => {
      ticking = false;
      const { top } = el.getBoundingClientRect();
      const start = window.innerHeight * 0.85;
      const end = window.innerHeight * 0.25;
      setProgress(Math.min(Math.max((start - top) / (start - end), 0), 1));
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [enabled]);

  return { ref, progress };
}

/**
 * True when the viewport is at least `minWidth` AND the user has not asked
 * for reduced motion. Every pinned or scrubbed section gates on this and
 * falls back to normal vertical stacking otherwise (SITEMAP.md §7).
 */
export function useMotionViewport(minWidth: number) {
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(
      `(min-width: ${minWidth}px) and (prefers-reduced-motion: no-preference)`
    );
    const update = () => setOk(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [minWidth]);

  return ok;
}
