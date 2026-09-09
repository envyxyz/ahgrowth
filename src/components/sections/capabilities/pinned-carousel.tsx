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
 * composition: the title set large in a bottom corner and the row bleeding
 * off both edges of the viewport. The old side rail made this the fourth
 * "label, heading, body, grid" block in a row.
 *
 * Focused and unfocused are two different cards, not one card at two sizes
 * (inspirations.md §4.3). Unfocused is the plate, crisp, plus the title and
 * nothing else. Focused floods with liquid glass and answers the title with
 * the service's subcategories. Five cards each carrying a summary line made
 * the row read as five equally loud cards, which is the opposite of a
 * carousel.
 *
 * Three things this deliberately does NOT do:
 *
 * 1. It does not measure. Every card is the same width, so the offset of
 *    card N is `N * (width + gap)` and CSS can compute it. The previous
 *    version ran a ResizeObserver over the row and kept three arrays in
 *    React state to rediscover a number that was already known. The card
 *    box is declared once as `--card-h` / `--card-w` and everything else,
 *    including the row's centring padding and the glass circle's diameter,
 *    derives from it, so the geometry cannot drift out of sync.
 *
 * 2. It does not track scroll continuously. The row SNAPS to the active
 *    card and eases there. Continuous tracking sounds right and is wrong:
 *    copy switches at the rounding boundary, so for half of every card's
 *    range the row has already slid on and the card being described is
 *    clipped by the viewport edge. Focus hands off, it does not smear.
 *
 * 3. It does not animate the focus transition per frame. Focus is one
 *    boolean per card and every visual consequence of it — card scale,
 *    glass expansion, subcategory stagger — is a CSS transition off that
 *    boolean, so the whole hand-off costs one class of work on the
 *    compositor and zero additional listeners. There is exactly one scroll
 *    listener in this file, inside `useScrollProgress`, and exactly one
 *    live `backdrop-filter` on screen, on the single focused card.
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
          // One declaration of the card box. The row's centring padding, its
          // per-card translate and the glass circle's diameter are all
          // derived from these, so a change to the card size cannot leave
          // the row mis-centred or the glass short of the corners.
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
  focused,
  priority,
}: {
  service: Service;
  focused: boolean;
  priority: boolean;
}) {
  const { carousel, captionRail, lineRise } = designMotion;

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

      {/* The title sits over photography, so legibility at the bottom corner
          comes from a scrim rather than from hoping the plate is dark enough
          there. Painted before the glass, so the glass blurs it too and the
          two never fight over the same pixels. */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-scrim-media-strong via-scrim-media-mid to-transparent"
      />

      {/*
       * Liquid glass. A circle twice the card's height, scaled from nothing
       * out past the corners, carrying the only `backdrop-filter` on screen.
       * Diameter and scale are two ways of writing the same number, so this
       * uses the honest one: the circle is sized to cover at scale 1 rather
       * than sized small and pushed to an arbitrary 2.5.
       *
       * The gradient is flat scrim across the inner 64% (all that is inside
       * the card once the circle has settled) and carries a lighter band out
       * at 92%. That band is outside the card at rest and only ever visible
       * while the perimeter is sweeping through the frame, which is the
       * refraction edge §4.3 asks for: it reads during the expansion and
       * leaves nothing behind.
       */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 aspect-square rounded-full backdrop-blur-card"
        style={{
          width: "calc(var(--card-h) * 2)",
          background:
            "radial-gradient(circle, var(--color-scrim-media-mid) 0%, var(--color-scrim-media-mid) 64%, var(--color-scrim-media-soft) 80%, var(--color-overlay-fill-inverse) 92%, transparent 100%)",
          transform: `translate3d(-50%, -50%, 0) scale(${focused ? 1 : 0})`,
          transitionProperty: "transform",
          transitionDuration: `${focused ? duration.reveal : duration.layout}ms`,
          transitionTimingFunction: easing.smooth,
        }}
      />

      {/* Subcategories ride in behind the glass edge, from the right, one
          `lineRise` beat apart. Leaving reverses without the stagger: a card
          that is handing focus off should clear in one move, not unwind. */}
      <ul className="absolute inset-x-lg top-lg flex flex-col items-end gap-xs text-right">
        {service.subcategories.map((sub, i) => (
          <li
            key={sub}
            className="type-eyebrow text-on-inverse-secondary"
            style={{
              opacity: focused ? 1 : 0,
              transform: `translate3d(${focused ? "0px" : "var(--space-xl)"}, 0, 0)`,
              transitionProperty: "transform, opacity",
              transitionDuration: `${focused ? duration.interactive : captionRail.outgoingMs}ms`,
              transitionDelay: `${focused ? i * lineRise.staggerMs : 0}ms`,
              transitionTimingFunction: easing.outSoft,
            }}
          >
            {sub}
          </li>
        ))}
      </ul>

      {/* Anchored, and identically positioned in both states: the title is
          the one thing that must not move while everything around it does. */}
      <h3 className="type-heading-1 absolute inset-x-lg bottom-lg max-w-[10ch] text-balance text-on-inverse">
        {service.title}
      </h3>
    </li>
  );
}
