"use client";

import Link from "next/link";
import { AhMark } from "@/components/brand/ah-mark";
import { motion as designMotion } from "@/lib/design-tokens";

/**
 * The logo + current-section-label row. Purely the interactive row; the
 * surrounding pill/panel chrome (background, border, grow/expand tweens)
 * lives one level up in island-shell.tsx so both the collapsed pill and the
 * expanded panel share one continuous surface.
 */
export function LogoIsland({
  scrolled,
  open,
  widened,
  onToggleOpen,
  homeLabel,
}: {
  scrolled: boolean;
  open: boolean;
  widened: boolean;
  onToggleOpen: () => void;
  homeLabel: string;
}) {
  const { header } = designMotion;

  return (
    <button
      type="button"
      onClick={scrolled ? onToggleOpen : undefined}
      aria-expanded={open}
      aria-label={open ? "Close navigation" : "Open navigation"}
      className="flex w-full items-center gap-xs whitespace-nowrap transition-[padding]"
      style={{
        padding: scrolled
          ? widened
            ? "var(--space-sm) var(--space-md)"
            : "var(--space-xs) var(--space-sm)"
          : "0",
        transitionDuration: `${header.hoverExpandMs}ms`,
        cursor: scrolled ? "pointer" : "default",
      }}
    >
      <Link
        href="/"
        aria-label="AH Growth, home"
        onClick={(e) => scrolled && e.stopPropagation()}
        className="origin-left shrink-0 text-primary transition-transform"
        style={{
          transform: `scale(${scrolled ? 1 : header.logoHeroScale})`,
          transitionDuration: `${header.logoPillExpandMs}ms`,
          transitionTimingFunction: header.logoPillExpandEase,
        }}
      >
        <AhMark className="h-5 w-auto" />
      </Link>

      <span
        className="type-eyebrow overflow-hidden text-on-chrome-muted transition-[opacity,max-width]"
        style={{
          opacity: scrolled ? 1 : 0,
          maxWidth: scrolled ? "120px" : "0px",
          transitionDuration: `${header.logoPillExpandMs}ms`,
          transitionDelay: scrolled ? "120ms" : "0ms",
        }}
      >
        {homeLabel}
      </span>
    </button>
  );
}
