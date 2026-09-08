"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { content, type Service } from "@/content";
import { Eyebrow } from "@/components/ui/eyebrow";
import { StaticChip } from "@/components/ui/chip";
import { Statement } from "@/components/ui/statement";
import { easing, motion as designMotion, duration } from "@/lib/design-tokens";
import { useScrollProgress, useMotionViewport } from "@/lib/hooks/use-scroll-progress";

/**
 * 03 — Capabilities, pinned horizontal carousel.
 *
 * One section fusing the three references rather than stacking three
 * borrowed effects: Designade's pinned horizontal translate drives the card
 * row, Koto's caption rail holds the focused service's copy on the left and
 * cross-fades it on hand-off (fast out, slower in), and the whole thing runs
 * off Buzz's damped scroll so the motion shares the site's physics.
 *
 * Copy lives in the RAIL, not on the cards. The cards carry only a title,
 * exactly like the resting cards in primary.jpg, so nothing is said twice.
 *
 * Composite-only: the row translates, the cards scale. No width tweens, no
 * layout recalculation per frame.
 */
export function PinnedCarousel({ services }: { services: Service[] }) {
  const { capabilities } = content.home;
  /* Only listen when the pinned layout is actually the one on screen. */
  const pinned = useMotionViewport(1024);
  const { ref, progress } = useScrollProgress<HTMLDivElement>(pinned);
  const rowRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [metrics, setMetrics] = useState({
    offsets: [] as number[],
    widths: [] as number[],
    viewportWidth: 0,
  });

  // Measured, never assumed: card size is viewport-relative, so every offset
  // changes with resize and zoom. Read once per resize, not per frame.
  useEffect(() => {
    const row = rowRef.current;
    const viewport = viewportRef.current;
    if (!row || !viewport) return;

    const measure = () => {
      const cards = Array.from(row.children) as HTMLElement[];
      setMetrics({
        offsets: cards.map((c) => c.offsetLeft),
        widths: cards.map((c) => c.offsetWidth),
        viewportWidth: viewport.clientWidth,
      });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(row);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [services.length]);

  const lastIndex = Math.max(services.length - 1, 0);
  const activeIndex = Math.min(Math.round(progress * lastIndex), lastIndex);
  const active = services[activeIndex] ?? services[0];

  /*
   * The row SNAPS to the active card and eases there, rather than tracking
   * scroll position continuously.
   *
   * Continuous tracking looks right in theory and is wrong in practice: the
   * rail's copy switches at the rounding boundary, so for half of every card's
   * scroll range the row has already slid on and the card the rail is
   * describing is clipped by the viewport edge. Snapping keeps the focused
   * card exactly centred for its whole range, which is also how the reference
   * carousels behave: focus hands off between cards, it does not smear.
   */
  const translate = (() => {
    const { offsets, widths, viewportWidth } = metrics;
    if (offsets.length === 0 || !viewportWidth) return 0;
    const offset = offsets[activeIndex] ?? 0;
    const width = widths[activeIndex] ?? 0;
    return Math.max(0, offset - (viewportWidth - width) / 2);
  })();

  return (
    <div
      ref={ref}
      data-tone="inverse"
      /* Scroll track. One viewport of travel per card beyond the first. */
      style={{ height: `${services.length * 100}vh` }}
      className="relative bg-inverse"
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden px-inset py-4xl">
        <div className="mx-auto flex w-full max-w-container flex-1 gap-4xl overflow-hidden">
          {/* Caption rail. Pinned copy, cross-faded on hand-off. */}
          <div className="flex w-[32%] shrink-0 flex-col justify-center gap-lg">
            <Eyebrow tone="inverse">{capabilities.eyebrow}</Eyebrow>
            <Statement value={capabilities.heading} as="h2" tone="inverse" size="display-md" />

            {active ? (
              <div
                key={active.id}
                className="mt-xl flex flex-col gap-md"
                style={{
                  animation: `caption-in ${designMotion.captionRail.incomingMs}ms ${designMotion.easeInertia} both`,
                }}
              >
                <p className="type-eyebrow tabular text-primary-ink">
                  {String(activeIndex + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
                </p>
                <h3 className="type-heading-1 text-on-inverse">{active.title}</h3>
                <p className="type-body-md max-w-[38ch] text-on-inverse-muted">
                  {active.summary}
                </p>
                <ul className="mt-sm flex flex-wrap gap-xs">
                  {active.subcategories.map((sub) => (
                    <li key={sub}>
                      <StaticChip label={sub} tone="inverse" />
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          {/* Card row. Translates horizontally with scroll progress. */}
          <div ref={viewportRef} className="relative flex-1 overflow-hidden">
            <div
              ref={rowRef}
              className="flex h-full items-center gap-xl will-change-transform"
              style={{
                transform: `translate3d(${-translate}px, 0, 0)`,
                transitionProperty: "transform",
                transitionDuration: `${duration.layout}ms`,
                transitionTimingFunction: designMotion.easeInertia,
              }}
            >
              {services.map((service, i) => (
                <CarouselCard
                  key={service.id}
                  service={service}
                  focused={i === activeIndex}
                  priority={i < 2}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes caption-in {
          from { opacity: 0; transform: translateY(var(--space-sm)); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

function CarouselCard({
  service,
  focused,
  priority,
}: {
  service: Service;
  focused: boolean;
  priority: boolean;
}) {
  return (
    <article
      data-service={service.id}
      data-focused={focused ? "" : undefined}
      className="relative aspect-[3/4] h-[70vh] shrink-0 overflow-hidden rounded-lg bg-inverse-soft transition-[transform,opacity]"
      style={{
        transform: `scale(${focused ? 1 : 0.92})`,
        opacity: focused ? 1 : 0.55,
        transitionDuration: `${designMotion.captionRail.incomingMs}ms`,
        transitionTimingFunction: easing.smooth,
      }}
    >
      {/* Theme-colored glow behind the cutout's transparent aperture. */}
      <span
        aria-hidden
        className="pointer-events-none absolute z-0 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
        style={{
          left: service.accentPosition.left,
          top: service.accentPosition.top,
          width: service.accentPosition.width,
          height: service.accentPosition.height,
          background:
            "radial-gradient(circle, var(--color-primary) 0%, var(--color-accent-tint) 60%, transparent 80%)",
        }}
      />
      <Image
        src={service.cutoutSrc}
        alt={service.imageAlt}
        fill
        sizes="40vw"
        priority={priority}
        className="relative z-[1] object-cover"
      />
      {/* Legibility scrim: the title sits over photography, so it needs a
          gradient rather than relying on the image being dark enough. */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-[2] h-1/2 bg-gradient-to-t from-inverse to-transparent"
      />
      <h4 className="type-heading-2 absolute bottom-card left-card right-card z-[3] text-on-inverse">
        {service.title}
      </h4>
    </article>
  );
}
