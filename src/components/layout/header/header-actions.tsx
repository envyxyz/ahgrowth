"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChromeButton } from "@/components/ui/chrome-button";
import { CursorFillButton } from "@/components/ui/cursor-fill-button";
import type { NavItem } from "@/content";
import { motion as designMotion } from "@/lib/design-tokens";
import { useSmoothScroll } from "@/components/providers/smooth-scroll";

/**
 * Right-side cluster: Work/About/Contact + CTA at page-top, a small glass
 * 4-dot trigger + live PKT clock at tablet+. AH Growth's nav sits opposite
 * the logo (unlike Koto's adjacent layout), so on scroll this whole cluster
 * fades/drifts away rather than merging into the logo pill — see the
 * corrected note in assets/design/design-ahgrowth.md § Navigation.
 */
export function HeaderActions({
  items,
  ctaLabel,
  ctaHref,
  scrolled,
  menuLabel,
  open,
  onToggleOpen,
}: {
  items: NavItem[];
  ctaLabel: string;
  ctaHref: string;
  scrolled: boolean;
  menuLabel: string;
  open: boolean;
  onToggleOpen: () => void;
}) {
  const { header } = designMotion;
  const { scrollToId } = useSmoothScroll();

  const handleCta = () => {
    if (ctaHref.startsWith("#")) {
      scrollToId(ctaHref.slice(1));
    } else {
      window.location.href = ctaHref;
    }
  };

  return (
    <div
      className="flex items-center gap-xl transition-[opacity,transform]"
      style={{
        opacity: scrolled ? 0 : 1,
        transform: scrolled ? "translateY(-8px)" : "translateY(0)",
        pointerEvents: scrolled ? "none" : "auto",
        transitionDuration: `${header.navCollapseSlideMs}ms`,
        transitionTimingFunction: header.navCollapseSlideEase,
      }}
    >
      <nav className="hidden items-center gap-xl md:flex">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="type-eyebrow text-on-inverse-muted transition-colors ease-out-soft hover:text-on-inverse"
            style={{ transitionDuration: `${header.chromeHoverMs}ms` }}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <ClockReadout />

      <ChromeButton
        ariaLabel={open ? "Close navigation" : "Open navigation"}
        ariaExpanded={open}
        onClick={onToggleOpen}
        tone="inverse"
        className="md:hidden"
      >
        {menuLabel}
      </ChromeButton>

      <CursorFillButton label={ctaLabel} onClick={handleCta} tone="inverse" />
    </div>
  );
}

function ClockReadout() {
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
    <span className="type-eyebrow hidden text-on-inverse-muted lg:inline">
      {time} UTC+5
    </span>
  );
}
