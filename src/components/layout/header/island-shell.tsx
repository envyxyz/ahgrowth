"use client";

import { motion as designMotion } from "@/lib/design-tokens";

/**
 * The one continuous surface behind the logo: transparent at page-top,
 * grows into a `header-logo-pill` on scroll, widens further on hover, and
 * expands its own height ("bottom length") into the full nav panel on
 * click. A single shared chrome so the collapse/hover/open states never
 * pop between separately-styled elements.
 */
export function IslandShell({
  scrolled,
  open,
  widened,
  children,
  panel,
}: {
  scrolled: boolean;
  open: boolean;
  widened: boolean;
  children: React.ReactNode;
  panel: React.ReactNode;
}) {
  const { header } = designMotion;

  return (
    <div
      className="overflow-hidden transition-[max-width,border-radius]"
      style={{
        maxWidth: scrolled
          ? widened
            ? `${header.islandMaxWidthPx}px`
            : `${Math.round(header.islandMaxWidthPx * 0.62)}px`
          : `${header.islandRestWidthPx}px`,
        // Mirrors the inner surface's radius so the clip mask never cuts a
        // tall open panel into a circle — this wrapper only exists to clip
        // the width grow-in, it must never impose its own fixed shape.
        borderRadius: open ? "var(--radius-md)" : "var(--radius-full)",
        transitionDuration: `${header.logoPillExpandMs}ms`,
        transitionTimingFunction: header.logoPillExpandEase,
      }}
    >
      <div
        className="transition-[background-color,border-radius,box-shadow]"
        style={{
          backgroundColor: scrolled ? "var(--color-chrome)" : "transparent",
          borderRadius: open ? "var(--radius-md)" : "var(--radius-full)",
          backdropFilter: scrolled ? "blur(var(--blur-chrome))" : "none",
          boxShadow: scrolled ? "var(--shadow-elevation-1)" : "none",
          transitionDuration: `${header.logoContainerResizeMs}ms`,
          transitionTimingFunction: header.logoContainerResizeEase,
        }}
      >
        {children}

        <div
          className="grid transition-[grid-template-rows]"
          style={{
            gridTemplateRows: open ? "1fr" : "0fr",
            transitionDuration: `${designMotion.nav.pillExpandWidthMs}ms`,
            transitionTimingFunction: header.logoContainerResizeEase,
          }}
        >
          <div className="min-h-0 overflow-hidden">{panel}</div>
        </div>
      </div>
    </div>
  );
}
