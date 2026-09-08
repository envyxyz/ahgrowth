"use client";

import Link from "next/link";
import { content } from "@/content";
import { Reveal } from "@/components/motion/reveal";
import { useSmoothScroll } from "@/components/providers/smooth-scroll";
import { useViewportProgress } from "@/lib/hooks/use-scroll-progress";
import { motion as designMotion } from "@/lib/design-tokens";

const shippedRoutes = content.nav.items.filter((item) => item.shipped);

/**
 * 08 — Footer. Continues the CTA Outro's dark block rather than starting a
 * new one, closing the page on a single uninterrupted contrast field. The
 * wordmark is ghosted into the surface, not set as bright display type.
 * Curtain reveal mechanic lands later (SITEMAP.md §8).
 */
export function SiteFooter() {
  const { footer, nav } = content;
  const { scrollToTop } = useSmoothScroll();
  /* Preset: the giant letterforms settle upward as the footer is revealed
     (inspirations.md §8.3). Parallax only, no curtain: a sticky curtain here
     would fight the fixed theme toggle and the pinned carousel above it. */
  const { ref: wordmarkRef, progress } = useViewportProgress<HTMLSpanElement>();

  return (
    <footer
      data-tone="inverse"
      className="relative overflow-hidden bg-inverse px-inset pb-xxl pt-xxl text-on-inverse"
    >
      <div className="relative z-10 mx-auto w-full max-w-container">
        <Reveal className="grid gap-xxl sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="type-eyebrow mb-md text-on-inverse-faint">
              {footer.columnLabels.direct}
            </p>
            <a
              href={`mailto:${footer.directEmail}`}
              className="type-body-sm rounded-xs text-on-inverse-secondary transition-colors duration-micro ease-out-soft hover:text-on-inverse"
            >
              {footer.directEmail}
            </a>
          </div>

          {footer.offices.length > 0 && (
            <div>
              <p className="type-eyebrow mb-md text-on-inverse-faint">
                {footer.columnLabels.studio}
              </p>
              {footer.offices.map((office) => (
                <p key={office.city} className="type-body-sm text-on-inverse-secondary">
                  {office.city}
                  <span className="block text-on-inverse-muted">{office.address}</span>
                </p>
              ))}
            </div>
          )}

          <nav aria-label={nav.a11y.footerNav}>
            <p className="type-eyebrow mb-md text-on-inverse-faint">
              {footer.columnLabels.navigate}
            </p>
            <ul className="flex flex-col gap-xs">
              {shippedRoutes.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="type-body-sm rounded-xs text-on-inverse-secondary transition-colors duration-micro ease-out-soft hover:text-on-inverse"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="type-eyebrow mb-md text-on-inverse-faint">
              {footer.columnLabels.legal}
            </p>
            <ul className="flex flex-col gap-xs">
              {footer.legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="type-body-sm rounded-xs text-on-inverse-secondary transition-colors duration-micro ease-out-soft hover:text-on-inverse"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Right padding clears the fixed theme toggle, which otherwise sits
            on top of the back-to-top control. */}
        <div className="mt-5xl flex flex-wrap items-center justify-between gap-md border-t border-hairline-inverse pr-toggle-clearance pt-lg">
          <p className="type-caption text-on-inverse-faint">
            {footer.copyright.replace("{year}", String(new Date().getFullYear()))}
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            className="type-caption rounded-xs text-on-inverse-muted transition-colors duration-micro ease-out-soft hover:text-on-inverse"
          >
            {footer.backToTop}
          </button>
        </div>
      </div>

      <span
        ref={wordmarkRef}
        aria-hidden
        className="type-ghost pointer-events-none absolute -bottom-[0.24em] left-0 z-0 select-none whitespace-nowrap text-ghost-inverse motion-reduce:!translate-y-0"
        style={{
          transform: `translate3d(0, ${(1 - progress) * designMotion.footerCurtain.settleOffsetPx}px, 0)`,
        }}
      >
        <span className="md:hidden">{footer.wordmarkShort}</span>
        <span className="hidden md:inline">{footer.wordmark}</span>
      </span>
    </footer>
  );
}
