"use client";

import Link from "next/link";
import { AhMark } from "@/components/brand/ah-mark";
import { motion as designMotion } from "@/lib/design-tokens";

/**
 * The logo + current-section-label row. Purely the interactive row; the
 * surrounding pill/panel chrome (background, border, grow/expand tweens)
 * lives one level up in island-shell.tsx so both the collapsed pill and the
 * expanded panel share one continuous surface.
 *
 * The home link and the panel toggle are SIBLINGS, never nested: interactive
 * content inside a <button> is invalid HTML and breaks keyboard semantics.
 */
export function LogoIsland({
  scrolled,
  open,
  widened,
  onToggleOpen,
  homeLabel,
  homeAriaLabel,
  openAriaLabel,
  closeAriaLabel,
}: {
  scrolled: boolean;
  open: boolean;
  widened: boolean;
  onToggleOpen: () => void;
  homeLabel: string;
  homeAriaLabel: string;
  openAriaLabel: string;
  closeAriaLabel: string;
}) {
  const { header } = designMotion;

  return (
    <div
      className="flex w-full items-center gap-xs whitespace-nowrap transition-[padding]"
      style={{
        padding: scrolled
          ? widened
            ? "var(--space-sm) var(--space-md)"
            : "var(--space-xs) var(--space-sm)"
          : "0",
        transitionDuration: `${header.hoverExpandMs}ms`,
      }}
    >
      <Link
        href="/"
        aria-label={homeAriaLabel}
        className="origin-left shrink-0 rounded-xs text-primary transition-transform"
        style={{
          transform: `scale(${scrolled ? 1 : header.logoHeroScale})`,
          transitionDuration: `${header.logoPillExpandMs}ms`,
          transitionTimingFunction: header.logoPillExpandEase,
        }}
      >
        <AhMark className="h-5 w-auto" />
      </Link>

      {/* Only interactive once the island has chrome to expand. Kept mounted
          so the label's width tween has something stable to animate. */}
      <button
        type="button"
        onClick={scrolled ? onToggleOpen : undefined}
        aria-expanded={open}
        aria-label={open ? closeAriaLabel : openAriaLabel}
        tabIndex={scrolled ? 0 : -1}
        className="type-eyebrow overflow-hidden rounded-xs text-on-chrome-muted transition-[opacity,max-width]"
        style={{
          opacity: scrolled ? 1 : 0,
          maxWidth: scrolled ? "var(--space-5xl)" : "0px",
          pointerEvents: scrolled ? "auto" : "none",
          cursor: scrolled ? "pointer" : "default",
          transitionDuration: `${header.logoPillExpandMs}ms`,
          transitionDelay: scrolled ? `${header.labelFadeDelayMs}ms` : "0ms",
        }}
      >
        {homeLabel}
      </button>
    </div>
  );
}
