import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Arrow CTA affordance. One component, two silhouettes, because they are the
 * same thing: a link that carries a directional arrow and answers a hover
 * with it. `pill` is inspirations.md §6 Element 1 (the editorial
 * "EXPLORE NOW ↗" capsule); the label-less `circle` is §4.1's floating hero
 * button.
 *
 * Deliberately NOT a fourth `buttonVariants` variant. That CVA bakes
 * `.type-button` (sentence-case sans) and `transition-colors` into its base
 * string, and both shapes here need the mono micro-label voice plus a
 * transform on a child element. A variant would have had to override most of
 * its own base, and every call site would still hand-compose the arrow.
 *
 * Two departures from the Element 1 spec text, both because CLAUDE.md is the
 * stricter rule and stricter wins:
 *  1. No 1px hairline stroke. "Cards, panels and buttons are never outlined,
 *     they separate by fill." The capsule reads through the glass fill that
 *     Element 1 also specifies, not through a perimeter line.
 *  2. `ease-out-soft`, not `ease-inertia`. Inertia is reserved for
 *     reveal-length entrances (700ms+); on a hover it reads as twitchy.
 */

/** Lucide ships a 2px stroke tuned for 24px. At 12px it reads as a blob. */
const ICON_STROKE = 1.5;

/**
 * Tone is not cosmetic here. The hero is dark photography in BOTH palettes,
 * so `inverse` has to resolve light in both; `surface`/`ink` would vanish
 * into it in the dark theme. Backdrop blur only on `inverse`, which is the
 * only tone with anything behind it worth blurring.
 */
const TONE = {
  light: "bg-overlay-fill text-ink hover:bg-ink hover:text-canvas",
  inverse:
    "bg-overlay-fill-inverse text-on-inverse backdrop-blur-chrome hover:bg-on-inverse hover:text-inverse",
} as const;

const BASE =
  "group inline-flex shrink-0 items-center justify-center rounded-full transition duration-micro ease-out-soft hover:scale-105 motion-reduce:hover:scale-100";

/** Both silhouettes clear the 44px touch floor: 44 tall, 56 square. */
const SHAPE = {
  pill: "type-eyebrow h-11 gap-xs whitespace-nowrap px-lg",
  circle: "h-14 w-14",
} as const;

/**
 * The authored moment: the arrow leaves through the top-right corner while a
 * second one follows it in from the bottom-left, so the glyph travels its own
 * diagonal instead of nudging 2px and stopping. Transform only, clipped to a
 * box the size of one glyph.
 */
function ArrowGlyph({ className }: { className: string }) {
  const travel =
    "transition-transform duration-interactive ease-out-soft absolute inset-0 h-full w-full";
  return (
    <span aria-hidden className={cn("relative block overflow-hidden", className)}>
      <ArrowUpRight
        strokeWidth={ICON_STROKE}
        className={cn(
          travel,
          "group-hover:translate-x-full group-hover:-translate-y-full",
          "motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0"
        )}
      />
      <ArrowUpRight
        strokeWidth={ICON_STROKE}
        className={cn(
          travel,
          "-translate-x-full translate-y-full",
          "group-hover:translate-x-0 group-hover:translate-y-0 motion-reduce:hidden"
        )}
      />
    </span>
  );
}

type ArrowButtonProps = {
  href: string;
  /** `inverse` on a dark contrast block or over media. */
  tone?: keyof typeof TONE;
  className?: string;
} & (
  /** Capsule: visible mono micro-label, then the arrow. */
  | { label: string; ariaLabel?: never }
  /** Circle: arrow only, so the accessible name has to come from somewhere. */
  | { label?: never; ariaLabel: string }
);

export function ArrowButton(props: ArrowButtonProps) {
  const { href, label, ariaLabel, tone = "light", className } = props;
  const isCircle = label === undefined;

  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={cn(BASE, TONE[tone], isCircle ? SHAPE.circle : SHAPE.pill, className)}
    >
      {label}
      <ArrowGlyph className={isCircle ? "h-5 w-5" : "h-3 w-3"} />
    </Link>
  );
}
