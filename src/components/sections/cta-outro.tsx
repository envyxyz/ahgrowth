import { content } from "@/content";
import { Section } from "@/components/ui/section";
import { WordWipe } from "@/components/motion/word-wipe";
import { Reveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { MediaFrame } from "@/components/ui/media-frame";
import { CursorFillButton } from "@/components/ui/cursor-fill-button";
import { motion as designMotion } from "@/lib/design-tokens";

/**
 * 08 — CTA Outro. The peak-end close: one line, one action. Carries
 * id="start" so the hero's in-page anchor and any legacy #start link land
 * here rather than 404ing.
 *
 * Split rather than another full-width type slab: this is the fourth
 * left-aligned block in a row otherwise, and the media panel is what breaks
 * that run. The grid is 6 / gap / 5 so the type keeps the wider half.
 *
 * The headline runs the Word Wipe Scrub preset instead of a static
 * `Statement` — the last block on the page is the one that can afford a
 * scrubbed reveal, since nothing follows it to compete.
 *
 * `WordWipe` takes `as` and `id` for exactly this: the section heading has
 * to be a real <h2> carrying the id `aria-labelledby` points at, not a div
 * with role="heading".
 *
 * The footer directly below is also `bg-inverse`; the two are meant to read
 * as one dark field, so nothing here draws a bottom edge.
 */
export function CtaOutro() {
  const { ctaOutro } = content.home;

  return (
    <Section
      id={ctaOutro.id}
      tone="inverse"
      className="scroll-mt-xxl"
      ariaLabelledBy="cta-outro-heading"
    >
      <div className="grid gap-xxl lg:grid-cols-12 lg:items-center lg:gap-lg">
        <Reveal className="flex flex-col items-start gap-xxl lg:col-span-6">
          <WordWipe
            value={ctaOutro.headline}
            as="h2"
            id="cta-outro-heading"
            size="display-lg"
            tone="inverse"
            className="max-w-[20ch]"
          />

          <div className="flex flex-col gap-lg sm:flex-row sm:items-center">
            <Magnetic>
              <CursorFillButton
                label={ctaOutro.cta.label}
                href={ctaOutro.cta.href}
                tone="inverse"
              />
            </Magnetic>
            <p className="type-body-sm text-on-inverse-muted">
              {ctaOutro.directPrefix}{" "}
              <a
                href={`mailto:${content.footer.directEmail}`}
                className="rounded-xs text-on-inverse underline underline-offset-4 transition-colors duration-micro ease-out-soft hover:text-on-inverse-secondary"
              >
                {content.footer.directEmail}
              </a>
            </p>
          </div>
        </Reveal>

        <Reveal
          delay={designMotion.lineRise.staggerMs}
          className="lg:col-span-5 lg:col-start-8"
        >
          <MediaFrame
            src={ctaOutro.media.src}
            alt={ctaOutro.media.alt}
            ratio="square"
            tone="inverse"
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
        </Reveal>
      </div>
    </Section>
  );
}
