"use client";

import Image from "next/image";
import type { Service } from "@/content";
import { easing, motion as designMotion, duration } from "@/lib/design-tokens";
import { useScrollProgress, useMotionViewport } from "@/lib/hooks/use-scroll-progress";

/**
 * 04 — Capabilities, pinned horizontal carousel (Designade's pinned
 * translate, run off Buzz's damped scroll so it shares the site's physics).
 *
 * Copy lives ON the cards, not in a side rail. That is the primary.jpg
 * composition: a tag pill top-left, the title and its one line bottom-left,
 * and the row bleeding off both edges of the viewport. The old side rail
 * made this the fourth "label, heading, body, grid" block in a row.
 *
 * Two things this deliberately does NOT do:
 *
 * 1. It does not measure. Every card is the same width, so the offset of
 *    card N is `N * (width + gap)` and CSS can compute it. The previous
 *    version ran a ResizeObserver over the row and kept three arrays in
 *    React state to rediscover a number that was already known. The card
 *    box is declared once as `--card-h` / `--card-w` and everything else,
 *    including the row's centring padding, derives from it, so the geometry
 *    cannot drift out of sync with the layout.
 *
 * 2. It does not track scroll continuously. The row SNAPS to the active
 *    card and eases there. Continuous tracking sounds right and is wrong:
 *    copy switches at the rounding boundary, so for half of every card's
 *    range the row has already slid on and the card being described is
 *    clipped by the viewport edge. Focus hands off, it does not smear.
 */
export function PinnedCarousel({ services }: { services: Service[] }) {
  const { carousel } = designMotion;

  /* Only listen when the pinned layout is actually the one on screen. */
  const pinned = useMotionViewport(1024);
  const { ref, progress } = useScrollProgress<HTMLDivElement>(pinned);

  const lastIndex = Math.max(services.length - 1, 0);
  const activeIndex = Math.min(Math.round(progress * lastIndex), lastIndex);

  return (
    <div
      ref={ref}
      /*
       * Scroll track. One viewport for the pin itself, then `trackVhPerCard`
       * of travel per hand-off. A full viewport per card (the obvious
       * choice) makes this section five screens tall, which reads as dead
       * space in any page-length scrub.
       */
      style={{
        height: `calc(100vh + ${lastIndex * carousel.trackVhPerCard}vh)`,
      }}
      className="relative"
    >
      <div
        className="sticky top-0 flex h-screen items-center overflow-hidden"
        style={{
          // One declaration of the card box. The row's centring padding and
          // its per-card translate are both derived from these, so a change
          // to the card size cannot leave the row mis-centred.
          ["--card-h" as string]: "56vh",
          ["--card-w" as string]: "calc(var(--card-h) * 0.8)",
        }}
      >
        <ol
          className="flex w-full items-center gap-xl will-change-transform"
          style={{
            /* Percentage padding resolves against the container's width, so
               this centres the first and last card without measuring the
               viewport in JS. */
            paddingInline: "calc(50% - var(--card-w) / 2)",
            transform: `translate3d(calc(-1 * ${activeIndex} * (var(--card-w) + var(--space-xl))), 0, 0)`,
            transitionProperty: "transform",
            transitionDuration: `${duration.layout}ms`,
            transitionTimingFunction: designMotion.easeInertia,
          }}
        >
          {services.map((service, i) => (
            <CarouselCard
              key={service.id}
              service={service}
              index={i}
              total={services.length}
              focused={i === activeIndex}
              priority={i < 2}
            />
          ))}
        </ol>
      </div>
    </div>
  );
}

function CarouselCard({
  service,
  index,
  total,
  focused,
  priority,
}: {
  service: Service;
  index: number;
  total: number;
  focused: boolean;
  priority: boolean;
}) {
  const { carousel, captionRail } = designMotion;

  return (
    <li
      data-service={service.id}
      data-focused={focused ? "" : undefined}
      className="relative isolate shrink-0 overflow-hidden rounded-lg bg-inverse-soft transition-[transform,opacity]"
      style={{
        height: "var(--card-h)",
        width: "var(--card-w)",
        transform: `scale(${focused ? carousel.focusedScale : carousel.restingScale})`,
        opacity: focused ? 1 : carousel.restingOpacity,
        transitionDuration: `${captionRail.incomingMs}ms`,
        transitionTimingFunction: easing.smooth,
      }}
    >
      <Image
        src={service.imageSrc}
        alt={service.imageAlt}
        fill
        sizes="45vh"
        priority={priority}
        className="object-cover"
      />

      {/* The copy sits over photography, so legibility comes from a scrim
          rather than from hoping the plate is dark enough at that corner. */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-scrim-media-strong via-scrim-media-mid to-transparent"
      />

      <p className="type-eyebrow tabular absolute left-lg top-lg rounded-full bg-overlay-fill-inverse px-md py-xxs text-on-inverse-secondary backdrop-blur-chrome">
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </p>

      <div className="absolute inset-x-lg bottom-lg flex flex-col gap-xs">
        <h3 className="type-heading-2 text-on-inverse">{service.title}</h3>
        <p className="type-caption max-w-[34ch] text-on-inverse-secondary">
          {service.summary}
        </p>
      </div>
    </li>
  );
}
