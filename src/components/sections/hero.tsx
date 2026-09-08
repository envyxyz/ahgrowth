import Link from "next/link";
import { content } from "@/content";
import { Copy } from "@/components/ui/placeholder-block";
import { Eyebrow } from "@/components/ui/eyebrow";
import { buttonVariants } from "@/components/ui/button";

/**
 * 01 — Hero. A near-black card inset from the page edge on the light canvas,
 * with the brand wordmark ghosted across the bottom — the shared shape across
 * all three locked references (Stodio's inset dark hero, Seative's "Of-Brand"
 * ghost word, Lovera's "LOVERA" ghost word).
 *
 * Marked `data-hero` so the header can measure its height for the scroll
 * threshold. Real build swaps the flat card for the WebGL canvas per SITEMAP.md.
 */
export function Hero() {
  const { hero } = content.home;

  return (
    <section data-hero className="bg-canvas px-inset pt-inset">
      <div className="relative mx-auto flex min-h-[clamp(560px,82vh,880px)] w-full max-w-container flex-col justify-end overflow-hidden rounded-lg bg-inverse px-card pb-6xl pt-[calc(var(--space-6xl)+var(--space-xxl))]">
        {/* Ghosted wordmark, anchored to the card's bottom edge and clipped by
            it. Sits under the content block, which reserves pb-6xl to clear it. */}
        <span
          aria-hidden
          className="type-ghost pointer-events-none absolute -bottom-[0.3em] left-[-0.04em] select-none whitespace-nowrap text-ghost-inverse"
        >
          {content.footer.wordmark}
        </span>

        <div className="relative flex flex-col gap-xxl">
          <Eyebrow tone="inverse">
            <Copy value={hero.eyebrow} />
          </Eyebrow>

          <h1 className="type-display-xl max-w-[16ch] text-balance text-on-inverse">
            <Copy value={hero.headline} />
          </h1>

          <div className="flex flex-col gap-xl lg:flex-row lg:items-end lg:justify-between">
            <p className="type-body-lg max-w-[42ch] text-on-inverse-muted">
              <Copy value={hero.subheadline} />
            </p>

            <div className="flex shrink-0 flex-wrap items-center gap-sm">
              <Link href={hero.cta.href} className={buttonVariants({ variant: "primary" })}>
                {hero.cta.label}
              </Link>
              <Link href={content.nav.cta.href} className={buttonVariants({ variant: "inverse" })}>
                {content.nav.cta.label}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
