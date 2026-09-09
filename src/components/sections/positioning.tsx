import { content } from "@/content";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { CapsuleStatement } from "@/components/ui/capsule-statement";

/**
 * 02 — Positioning Statement. The exhale after the hero, and the only
 * centred block on the page: one oversized two-tone line with pill-masked
 * photography set inside it, exactly the composition primary.jpg opens its
 * light half with.
 *
 * Centring is the point. Every other section on this page is left-aligned or
 * split, so this is the one that resets the eye.
 */
export function Positioning() {
  const { positioning } = content.home;

  return (
    <Section>
      {/* Accent marker left, micro-label right: the corner pair that frames
          the statement band in the reference, with nothing between them. */}
      <div className="flex items-start justify-between gap-lg">
        <span aria-hidden className="mt-xs h-sm w-sm shrink-0 rounded-xxs bg-primary" />
        <p className="type-eyebrow max-w-[12ch] text-right text-ink-muted">
          {positioning.microLabel}
        </p>
      </div>

      <Reveal className="mt-xxl flex flex-col items-center gap-xxl text-center">
        <CapsuleStatement
          value={positioning.statement}
          as="h2"
          size="display-lg"
          className="max-w-[22ch] text-balance"
        />
        <p className="type-body-md max-w-[62ch] text-ink-muted">{positioning.support}</p>
      </Reveal>
    </Section>
  );
}
