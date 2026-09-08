"use client";

import Link from "next/link";
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
      className="flex flex-col gap-xs px-md pb-md pt-xs transition-[opacity,transform]"
      style={{
        opacity: open ? 1 : 0,
        transform: open ? "translateY(0)" : "translateY(-8px)",
        transitionDuration: `${nav.pillExpandContentFadeMs}ms`,
        transitionDelay: open ? `${nav.pillExpandContentDelayMs}ms` : "0ms",
        pointerEvents: open ? "auto" : "none",
      }}
    >
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
