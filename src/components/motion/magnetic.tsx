"use client";

import { useEffect, useRef } from "react";
import { motion as designMotion } from "@/lib/design-tokens";

/**
 * Preset: Magnetic Pull (Buzz Interactive). The wrapped target drifts toward
 * the cursor inside a gravity field, then settles back on exit.
 *
 * Applied to primary CTAs and nothing else, per SITEMAP.md §7: on every
 * clickable element the effect stops reading as intentional and becomes
 * noise.
 *
 * Written straight to `style.transform` inside the pointer handler rather
 * than through React state: this fires on every mousemove, and a setState per
 * move would re-render the subtree sixty times a second.
 */
export function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Pointer-coarse devices have no hover, so the field would never fire.
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const max = designMotion.magneticPull.maxDisplacementPx;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      // Normalised against half the element, then clamped, so a wide pill
      // and a small icon button pull by the same visual amount.
      const x = Math.max(-1, Math.min(1, dx / (rect.width / 2))) * max;
      const y = Math.max(-1, Math.min(1, dy / (rect.height / 2))) * max;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const onLeave = () => {
      el.style.transform = "translate3d(0, 0, 0)";
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <span
      ref={ref}
      className="inline-block transition-transform ease-out-soft motion-reduce:!transform-none"
      style={{ transitionDuration: `${designMotion.durationInteractiveMs}ms` }}
    >
      {children}
    </span>
  );
}
