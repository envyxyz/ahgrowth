"use client";

import Lenis from "lenis";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import { motion as motionTokens } from "@/lib/design-tokens";

interface SmoothScrollContextValue {
  scrollToId: (id: string) => void;
  scrollToTop: () => void;
  /** Pause/resume the scroll engine. Used while the nav panel is open —
      `body { overflow: hidden }` alone does not stop Lenis. */
  stop: () => void;
  start: () => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue | null>(null);

/** Exponential-out. inspirations.md §8.4, the "Let's go up" curve. */
const expoOut = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

/**
 * Site-wide Lenis instance (Preset: Fluid Cap Scroll). One rAF loop, one
 * engine. Not instantiated at all under `prefers-reduced-motion: reduce`,
 * where every consumer falls back to native scrolling.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotionRef.current) return;

    const lenis = new Lenis({
      lerp: motionTokens.scroll.lerp,
      wheelMultiplier: motionTokens.scroll.wheelMultiplier,
      touchMultiplier: motionTokens.scroll.touchMultiplier,
    });
    lenisRef.current = lenis;

    let frameId = requestAnimationFrame(function raf(time: number) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollToId = useCallback((id: string) => {
    const target = document.getElementById(id);
    if (!target) return;

    if (reducedMotionRef.current || !lenisRef.current) {
      target.scrollIntoView({ behavior: reducedMotionRef.current ? "auto" : "smooth" });
      return;
    }

    lenisRef.current.scrollTo(target, {
      duration: motionTokens.inertiaSettle.maxMs / 1000,
      easing: expoOut,
    });
  }, []);

  const scrollToTop = useCallback(() => {
    if (reducedMotionRef.current || !lenisRef.current) {
      window.scrollTo({ top: 0, behavior: reducedMotionRef.current ? "auto" : "smooth" });
      return;
    }
    lenisRef.current.scrollTo(0, {
      duration: motionTokens.backToTop.durationMs / 1000,
      easing: expoOut,
    });
  }, []);

  const stop = useCallback(() => lenisRef.current?.stop(), []);
  const start = useCallback(() => lenisRef.current?.start(), []);

  return (
    <SmoothScrollContext.Provider value={{ scrollToId, scrollToTop, stop, start }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}

/**
 * Native-scroll fallback used when there is no provider above the consumer.
 * Next renders some trees (the not-found boundary, error boundaries) outside
 * the normal layout chain, and a hook that throws there fails the whole
 * static export. Degrading to plain scrolling is strictly better than
 * crashing a page over a smooth-scroll nicety.
 */
const nativeFallback: SmoothScrollContextValue = {
  scrollToId: (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }),
  scrollToTop: () => window.scrollTo({ top: 0, behavior: "smooth" }),
  stop: () => {},
  start: () => {},
};

export function useSmoothScroll() {
  return useContext(SmoothScrollContext) ?? nativeFallback;
}
