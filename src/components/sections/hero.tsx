import Link from "next/link";
import { content } from "@/content";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { buttonVariants } from "@/components/ui/button";

/**
 * 01 — Hero. A near-black card inset from the page edge on the light canvas,
 * with the brand wordmark ghosted across the bottom: the shared shape across
 * all three locked references.
 *
 * `data-hero` lets the header measure its height for the scroll threshold.
 * `data-tone="inverse"` flips the global focus ring to its light value.
 *
 * The empty `z-0` layer is the slot the WebGL canvas drops into later
 * (SITEMAP.md §2). Content sits at `z-10` above it, so adding the canvas is
 * filling a slot rather than restructuring the section.
 */
export function Hero() {
  const { hero } = content.home;

  return (
    <section data-hero data-tone="inverse" className="bg-canvas px-inset pt-inset">
      <div className="relative mx-auto flex min-h-[clamp(560px,82vh,880px)] w-full max-w-container flex-col justify-end overflow-hidden rounded-lg bg-inverse px-card pb-hero-bottom pt-hero-top">
        {/* Reserved for the WebGL canvas. Intentionally empty in the MVP. */}
        <div aria-hidden className="absolute inset-0 z-0" />

        {/* Ghosted wordmark, anchored to the card's bottom edge and clipped by
            it. The content block reserves pb-hero-bottom to clear it. */}
        <span
          aria-hidden
          className="type-ghost pointer-events-none absolute -bottom-[0.3em] left-[-0.04em] z-0 select-none whitespace-nowrap text-ghost-inverse"
        >
          <span className="md:hidden">{content.footer.wordmarkShort}</span>
          <span className="hidden md:inline">{content.footer.wordmark}</span>
        </span>

        <div className="relative z-10 flex flex-col gap-xl md:gap-xxl">
          <Reveal>
            <Eyebrow tone="inverse">{hero.eyebrow}</Eyebrow>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="type-display-xl max-w-[16ch] text-balance text-on-inverse">
              {hero.headline}
            </h1>
          </Reveal>

          <Reveal
            delay={160}
            className="flex flex-col gap-xl lg:flex-row lg:items-end lg:justify-between"
          >
            <p className="type-body-lg max-w-[46ch] text-on-inverse-muted">
              {hero.subheadline}
            </p>

            <div className="flex shrink-0 flex-wrap items-center gap-sm">
              <Magnetic>
                <Link href={hero.cta.href} className={buttonVariants({ variant: "primary" })}>
                  {hero.cta.label}
                </Link>
              </Magnetic>
              <Link
                href={hero.secondaryCta.href}
                className={buttonVariants({ variant: "inverse" })}
              >
                {hero.secondaryCta.label}
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
