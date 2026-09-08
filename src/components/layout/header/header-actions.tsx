"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { content } from "@/content";
import { ChromeButton } from "@/components/ui/chrome-button";
import { CursorFillButton } from "@/components/ui/cursor-fill-button";
import type { NavItem } from "@/content";
import { motion as designMotion } from "@/lib/design-tokens";

/**
 * Right-side cluster: nav links + CTA at page-top, a live PKT clock at
 * laptop+. AH Growth's nav sits opposite the logo, so on scroll this whole
 * cluster fades away rather than merging into the logo pill.
 *
 * Below md only the Menu trigger survives: the full cluster overflows a
 * 375px viewport, and the CTA already lives inside the nav panel.
 */
export function HeaderActions({
  items,
  scrolled,
  open,
  onToggleOpen,
}: {
  items: NavItem[];
  scrolled: boolean;
  open: boolean;
  onToggleOpen: () => void;
}) {
  const { header } = designMotion;
  const { nav } = content;

  return (
    <div
      className="flex items-center gap-md transition-[opacity,transform] md:gap-xl"
      style={{
        opacity: scrolled ? 0 : 1,
        transform: scrolled ? "translateY(-8px)" : "translateY(0)",
        pointerEvents: scrolled ? "none" : "auto",
        transitionDuration: `${header.navCollapseSlideMs}ms`,
        transitionTimingFunction: header.navCollapseSlideEase,
      }}
    >
      <nav aria-label={nav.a11y.primaryNav} className="hidden items-center gap-xl md:flex">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="type-eyebrow rounded-xs text-on-inverse-muted transition-colors ease-out-soft hover:text-on-inverse"
            style={{ transitionDuration: `${header.chromeHoverMs}ms` }}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <ClockReadout label={nav.a11y.timezone} />

      <ChromeButton
        ariaLabel={open ? nav.a11y.closeMenu : nav.a11y.openMenu}
        ariaExpanded={open}
        onClick={onToggleOpen}
        tone="inverse"
        className="md:hidden"
      >
        {nav.menuLabel}
      </ChromeButton>

      <CursorFillButton
        label={nav.cta.label}
        href={nav.cta.href}
        tone="inverse"
        className="hidden md:inline-flex"
      />
    </div>
  );
}

function ClockReadout({ label }: { label: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Karachi",
      }).format(new Date());

    setTime(format());
    const id = window.setInterval(() => setTime(format()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  if (!time) return null;

  return (
    <span aria-label={label} className="type-eyebrow hidden text-on-inverse-muted lg:inline">
      {time} UTC+5
    </span>
  );
}
