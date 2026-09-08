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
}

const SmoothScrollContext = createContext<SmoothScrollContextValue | null>(null);

/**
 * Site-wide Lenis instance (Preset: Fluid Cap Scroll) + a single full-viewport
 * velocity-blur layer (Preset: Velocity Fade Blur). One rAF loop drives both
 * the scroll tick and the blur read — never a second listener.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const blurLayerRef = useRef<HTMLDivElement | null>(null);
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

    const { thresholdPxPerFrame, maxBlurPx } = motionTokens.velocityFadeBlur;

    function raf(time: number) {
      lenis.raf(time);

      const layer = blurLayerRef.current;
      if (layer) {
        const speed = Math.abs(lenis.velocity);
        const eased = Math.min(speed / thresholdPxPerFrame, 1);
        const blurAmount = eased > 0.02 ? eased * maxBlurPx : 0;
        layer.style.backdropFilter = blurAmount
          ? `blur(${blurAmount}px)`
          : "none";
      }

      frameId = requestAnimationFrame(raf);
    }

    let frameId = requestAnimationFrame(raf);

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
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
    });
  }, []);

  return (
    <SmoothScrollContext.Provider value={{ scrollToId }}>
      {children}
      <div
        ref={blurLayerRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[60] transition-[backdrop-filter] duration-150"
      />
    </SmoothScrollContext.Provider>
  );
}

export function useSmoothScroll() {
  const ctx = useContext(SmoothScrollContext);
  if (!ctx) {
    throw new Error("useSmoothScroll must be used within SmoothScrollProvider");
  }
  return ctx;
}
