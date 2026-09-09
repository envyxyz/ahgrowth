"use client";

import { useEffect, useState, type ElementType } from "react";
import type { Statement as StatementValue } from "@/content";
import { useViewportProgress } from "@/lib/hooks/use-scroll-progress";
import { easing, motion as designMotion } from "@/lib/design-tokens";

/**
 * Preset: Word Wipe Scrub (Buzz Interactive). The line writes itself in as
 * the block moves through the viewport: words step from the muted token to
 * full contrast in sequence.
 *
 * ONE scroll listener and ONE progress value drives every word. Per-word
 * thresholds are computed from the index, never from a per-word listener,
 * which is exactly the failure the Buzz audit calls out (375 individually
 * wired spans recalculating style every frame).
 *
 * Under reduced motion the hook reports 1 on mount, so every word renders at
 * full contrast with no transition at all.
 */
export function WordWipe({
  value,
  as: Tag = "p",
  size = "display-md",
  tone = "light",
  className = "",
  id,
}: {
  value: StatementValue;
  /** Pass the real heading tag when this line IS the section heading. */
  as?: ElementType;
  size?: "display-lg" | "display-md";
  tone?: "light" | "inverse";
  className?: string;
  id?: string;
}) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const { ref, progress } = useViewportProgress<HTMLElement>(!reduced);

  const strong = tone === "inverse" ? "var(--color-on-inverse)" : "var(--color-ink)";
  const soft =
    tone === "inverse" ? "var(--color-on-inverse-faint)" : "var(--color-ink-faint)";

  /* The lead half wipes to full contrast; the muted half stays muted, so the
     two-tone reading of `Statement` survives the animation. */
  const leadWords = value.lead.split(" ");

  return (
    <Tag
      ref={ref}
      id={id}
      className={`type-${size} text-balance ${className}`}
      style={{ color: soft }}
    >
      {leadWords.map((word, i) => {
        const threshold = (i / leadWords.length) * 0.85;
        return (
          <span
            key={`${word}-${i}`}
            style={{
              color: progress > threshold ? strong : soft,
              transitionProperty: "color",
              transitionDuration: `${designMotion.durationInteractiveMs}ms`,
              transitionTimingFunction: easing.outSoft,
            }}
          >
            {word}{" "}
          </span>
        );
      })}
      <span style={{ color: soft }}>{value.muted}</span>
      {value.tail ? <span style={{ color: strong }}> {value.tail}</span> : null}
    </Tag>
  );
}
