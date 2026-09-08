"use client";

import { useEffect, useState } from "react";
import { content } from "@/content";
import { useScrollState } from "@/lib/hooks/use-scroll-state";
import { IslandShell } from "@/components/layout/header/island-shell";
import { LogoIsland } from "@/components/layout/header/logo-island";
import { NavPanel } from "@/components/layout/header/nav-panel";
import { MenuScrim } from "@/components/layout/header/menu-scrim";
import { HeaderActions } from "@/components/layout/header/header-actions";

const panelItems = content.nav.items.filter((item) => item.href !== "/");

export function SiteHeader() {
  const [heroHeight, setHeroHeight] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [hovering, setHovering] = useState(false);
  const scrolled = useScrollState(heroHeight ?? 9999);

  useEffect(() => {
    const hero = document.querySelector("[data-hero]");
    setHeroHeight(hero instanceof HTMLElement ? hero.offsetHeight * 0.8 : window.innerHeight * 0.8);
  }, []);

  useEffect(() => {
    // The panel only makes sense attached to the scrolled-state island —
    // scrolling back above the threshold reverts the island to a bare,
    // chromeless logo, so an open panel would float unattached to anything.
    if (!scrolled) setOpen(false);
  }, [scrolled]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <MenuScrim open={open} onClose={() => setOpen(false)} />
      {/*
        Aligned to the hero card's own inset and nudged inside its top edge,
        so at page-top the whole cluster reads as chrome sitting ON the dark
        card (references put the nav inside the hero card). On scroll the
        actions fade out and the logo island picks up a solid surface.
      */}
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-inset pt-[calc(var(--layout-inset)+var(--space-lg))]">
        <IslandShell
          scrolled={scrolled}
          open={open}
          widened={hovering || open}
          panel={
            <NavPanel
              items={panelItems}
              channelsLabel={content.nav.channelsLabel}
              socialLinks={content.footer.social}
              open={open}
              onNavigate={() => setOpen(false)}
            />
          }
        >
          <div onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
            <LogoIsland
              scrolled={scrolled}
              open={open}
              widened={hovering || open}
              onToggleOpen={() => setOpen((v) => !v)}
              homeLabel={content.nav.homeLabel}
            />
          </div>
        </IslandShell>

        <HeaderActions
          items={panelItems}
          ctaLabel={content.nav.cta.label}
          ctaHref={content.nav.cta.href}
          scrolled={scrolled}
          menuLabel={content.nav.menuLabel}
          open={open}
          onToggleOpen={() => setOpen((v) => !v)}
        />
      </header>
    </>
  );
}
