"use client";

import type { ElementType } from "react";
import { useInView } from "@/lib/hooks/use-in-view";
import { motion as designMotion } from "@/lib/design-tokens";

/**
 * THE ANIMATION FOUNDATION. Preset: Line Rise.
 *
 * Every block on the site that should animate in is already wrapped in this,
 * even though the MVP implementation is a plain CSS transition. Upgrading the
 * whole site to GSAP timelines, scrubbed reveals, or split-text staggers is
 * an edit to THIS FILE and nothing else. No section is rewritten.
 *
 * Reduced motion is handled inside `useInView`, which reports visible on
 * mount, so the final state renders immediately with no transition.
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  as?: ElementType;
  /** Stagger offset in ms. Use `index * motion.lineRise.staggerMs`. */
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const { lineRise } = designMotion;

  return (
    <Tag
      ref={ref}
      data-reveal
      data-in-view={inView ? "" : undefined}
      className={`motion-reduce:!translate-y-0 motion-reduce:!opacity-100 motion-reduce:!transition-none ${className}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : `translateY(${lineRise.translateYPx}px)`,
        transitionProperty: "opacity, transform",
        transitionDuration: `${lineRise.durationMs}ms`,
        transitionTimingFunction: designMotion.easeInertia,
        transitionDelay: `${delay}ms`,
        willChange: inView ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </Tag>
  );
}
