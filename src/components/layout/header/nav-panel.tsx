"use client";

import Link from "next/link";
import { content } from "@/content";
import { RollText } from "@/components/ui/roll-text";
import type { NavItem, SocialLink } from "@/content";
import { motion as designMotion } from "@/lib/design-tokens";

/**
 * Content revealed inside the expanded island panel: nav links (roll-reveal
 * hover) then, only once real data exists, the Channels sub-list. Fades and
 * rises in after the container's own height tween lands.
 */
export function NavPanel({
  items,
  channelsLabel,
  socialLinks,
  open,
  onNavigate,
}: {
  items: NavItem[];
  channelsLabel: string;
  socialLinks: SocialLink[];
  open: boolean;
  onNavigate: () => void;
}) {
  const { nav } = designMotion;

  return (
    <div
      className="flex flex-col gap-xs overscroll-contain px-md pb-md pt-xs transition-[opacity,transform]"
      style={{
        opacity: open ? 1 : 0,
        transform: open ? "translateY(0)" : "translateY(calc(-1 * var(--space-xs)))",
        transitionDuration: `${nav.pillExpandContentFadeMs}ms`,
        transitionDelay: open ? `${nav.pillExpandContentDelayMs}ms` : "0ms",
        pointerEvents: open ? "auto" : "none",
      }}
    >
      <nav aria-label={content.nav.a11y.primaryNav}>
      <ul className="flex flex-col">
        {items.map((item) => (
          <li key={item.href} className="border-b border-hairline-inverse last:border-b-0">
            <Link
              href={item.href}
              onClick={onNavigate}
              className="type-title flex items-center py-sm text-on-chrome"
            >
              <RollText label={item.label} hoverLabel={item.hoverLabel} />
            </Link>
          </li>
        ))}
      </ul>

      {/* The CTA is hidden in the header row below md, so the panel is the
          only place a mobile visitor can reach it. */}
      <Link
        href={content.nav.cta.href}
        onClick={onNavigate}
        className="type-button mt-sm inline-flex h-11 items-center justify-center rounded-full bg-on-chrome px-lg text-chrome md:hidden"
      >
        {content.nav.cta.label}
      </Link>
      </nav>

      {socialLinks.length > 0 && (
        <div className="mt-md border-t border-hairline-inverse pt-md">
          <p className="type-eyebrow mb-xs text-on-chrome-muted">{channelsLabel}</p>
          <ul className="flex flex-col gap-xxs">
            {socialLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="type-caption block py-xxs text-on-chrome-muted transition-colors hover:text-on-chrome"
                >
                  <RollText label={link.label} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
