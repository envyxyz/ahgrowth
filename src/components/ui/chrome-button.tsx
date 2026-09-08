"use client";

import { motion as designMotion } from "@/lib/design-tokens";

/**
 * `header-chrome-button` component token: small glass utility button shared
 * by the 4-dot widget trigger and the mobile Menu trigger.
 */
export function ChromeButton({
  children,
  onClick,
  ariaLabel,
  ariaExpanded,
  tone = "light",
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  ariaLabel: string;
  ariaExpanded?: boolean;
  /** `inverse` when sitting on a dark contrast section (e.g. over the hero). */
  tone?: "light" | "inverse";
  className?: string;
}) {
  const toneClass =
    tone === "inverse"
      ? "bg-overlay-fill-inverse text-on-inverse hover:bg-overlay-fill-inverse-hover"
      : "bg-overlay-fill text-ink hover:bg-overlay-fill-hover";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      className={`type-eyebrow inline-flex h-11 items-center justify-center gap-xs rounded-full px-lg backdrop-blur-chrome transition-colors ease-out-soft ${toneClass} ${className}`}
      style={{ transitionDuration: `${designMotion.header.chromeHoverMs}ms` }}
    >
      {children}
    </button>
  );
}

/** Four dots that nudge outward from center on hover — the "explode" detail. */
export function DotGridIcon() {
  const offset = designMotion.header.dotExplodeOffsetPx;
  const positions = [
    { x: -offset, y: -offset },
    { x: offset, y: -offset },
    { x: -offset, y: offset },
    { x: offset, y: offset },
  ];

  return (
    <span className="group/dots relative inline-block h-3 w-3">
      {positions.map((pos, i) => (
        <span
          key={i}
          aria-hidden
          className="absolute"
          style={{
            height: designMotion.header.dotSizePx,
            width: designMotion.header.dotSizePx,
            left: i % 2 === 0 ? 0 : "auto",
            right: i % 2 === 1 ? 0 : "auto",
            top: i < 2 ? 0 : "auto",
            bottom: i >= 2 ? 0 : "auto",
          }}
        >
          <span
            className="absolute inset-0 rounded-full bg-current transition-transform ease-out-soft group-hover/dots:translate-x-[var(--dx)] group-hover/dots:translate-y-[var(--dy)]"
            style={
              {
                "--dx": `${pos.x}px`,
                "--dy": `${pos.y}px`,
                transitionDuration: `${designMotion.header.chromeHoverMs}ms`,
              } as React.CSSProperties
            }
          />
        </span>
      ))}
    </span>
  );
}
