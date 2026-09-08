"use client";

import { useEffect, useState } from "react";
import { content } from "@/content";
import { useScrollState } from "@/lib/hooks/use-scroll-state";
import { useSmoothScroll } from "@/components/providers/smooth-scroll";
import { IslandShell } from "@/components/layout/header/island-shell";
import { LogoIsland } from "@/components/layout/header/logo-island";
import { NavPanel } from "@/components/layout/header/nav-panel";
import { MenuScrim } from "@/components/layout/header/menu-scrim";
import { HeaderActions } from "@/components/layout/header/header-actions";

/** Home is covered by the logo mark; unbuilt routes are filtered out. */
const panelItems = content.nav.items.filter((item) => item.shipped && item.href !== "/");

export function SiteHeader() {
  const [heroHeight, setHeroHeight] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [hovering, setHovering] = useState(false);
  const scrolled = useScrollState(heroHeight ?? 9999);
  const { stop, start } = useSmoothScroll();

  useEffect(() => {
    const hero = document.querySelector("[data-hero]");
    setHeroHeight(hero instanceof HTMLElement ? hero.offsetHeight * 0.8 : window.innerHeight * 0.5);
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
    // Both: Lenis owns the scroll when it is running, `overflow` covers the
    // reduced-motion path where Lenis is never instantiated.
    stop();
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      start();
      document.body.style.overflow = "";
    };
  }, [open, stop, start]);

  return (
    <>
      <MenuScrim open={open} onClose={() => setOpen(false)} />
      {/*
        Aligned to the hero card's own inset and nudged inside its top edge,
        so at page-top the whole cluster reads as chrome sitting ON the dark
        card. On scroll the actions fade out and the logo island picks up a
        solid chrome surface.
      */}
      <header
        data-tone="inverse"
        className="fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-md px-inset pt-[calc(var(--layout-inset)+var(--space-lg))]"
      >
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
              homeAriaLabel={content.nav.a11y.home}
              openAriaLabel={content.nav.a11y.openMenu}
              closeAriaLabel={content.nav.a11y.closeMenu}
            />
          </div>
        </IslandShell>

        <HeaderActions
          items={panelItems}
          scrolled={scrolled}
          open={open}
          onToggleOpen={() => setOpen((v) => !v)}
        />
      </header>
    </>
  );
}
