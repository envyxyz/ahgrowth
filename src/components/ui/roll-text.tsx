"use client";

import { useState } from "react";
import { motion as designMotion } from "@/lib/design-tokens";

/**
 * Preset: Roll Reveal Hover. Two stacked copies of the same label inside an
 * overflow-hidden mask; the inner stack translates up on hover so the second
 * copy rolls into view underneath. Hover-in is quick and eager; hover-out is
 * slower and delayed, so the label doesn't snap back the instant the cursor
 * leaves. Animates only `transform`, never layout.
 */
export function RollText({
  label,
  hoverLabel,
  className = "",
}: {
  label: string;
  hoverLabel?: string;
  className?: string;
}) {
  const [hovered, setHovered] = useState(false);
  const secondary = hoverLabel ?? label;

  return (
    <span
      className={`relative inline-block h-[1lh] overflow-hidden whitespace-nowrap ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        className="block ease-inertia"
        style={{
          // The inner wrapper stacks two equal-height lines, so -50% of its
          // own bounding box (not -100%) is what shifts by exactly one line.
          transform: hovered ? "translateY(-50%)" : "translateY(0)",
          transitionProperty: "transform",
          transitionDuration: `${
            hovered
              ? designMotion.nav.rollRevealInMs
              : designMotion.nav.rollRevealOutMs
          }ms`,
          transitionDelay: hovered
            ? "0ms"
            : `${designMotion.nav.rollRevealOutDelayMs}ms`,
        }}
      >
        <span className="block">{label}</span>
        <span aria-hidden className="block">
          {secondary}
        </span>
      </span>
    </span>
  );
}
