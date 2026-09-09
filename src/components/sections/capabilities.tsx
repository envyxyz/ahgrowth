import { content } from "@/content";
import { Statement } from "@/components/ui/statement";
import { Reveal } from "@/components/motion/reveal";
import { ServiceCard } from "@/components/sections/capabilities/service-card";
import { PinnedCarousel } from "@/components/sections/capabilities/pinned-carousel";
import { motion as designMotion } from "@/lib/design-tokens";

/**
 * 04 — Capabilities. One dark block: a centred heading, then the work.
 *
 * The heading sits ABOVE the pinned row rather than inside a side rail, so
 * the section still reads as a section in a page-length scrub, where a
 * sticky rail renders exactly once and leaves the rest of its track blank.
 *
 * Two layouts, one content source. Laptop and up with motion allowed: the
 * pinned horizontal carousel from inspirations.md §4. Everything else
 * (mobile, tablet, reduced motion): the stacked card grid, per SITEMAP.md §7
 * "any pinned or scroll-scrubbed section falls back to normal vertical
 * stacking below laptop". Both are server-rendered and swapped by media
 * query, not by a mount-time state flip, so neither flashes on first paint.
 *
 * No eyebrow here. Three of the six homepage sections used to open with one,
 * which turns a deliberate marker into wallpaper.
 */
export function Capabilities() {
  const { capabilities } = content.home;

  return (
    <section
      id={capabilities.id}
      data-tone="inverse"
      aria-labelledby="capabilities-heading"
      className="scroll-mt-xxl bg-inverse text-on-inverse"
    >
      <div className="px-inset pb-4xl pt-section-y">
        <Reveal className="mx-auto flex max-w-container flex-col items-center gap-lg text-center">
          <Statement
            id="capabilities-heading"
            value={capabilities.heading}
            as="h2"
            tone="inverse"
            className="max-w-[18ch] text-balance"
          />
          <p className="type-body-lg max-w-[52ch] text-on-inverse-muted">
            {capabilities.intro}
          </p>
        </Reveal>
      </div>

      <div className="hidden lg:motion-safe:block">
        <PinnedCarousel services={content.services} />
      </div>

      <div className="px-inset pb-section-y lg:motion-safe:hidden">
        <div className="mx-auto grid w-full max-w-container gap-xxl md:grid-cols-2">
          {content.services.map((service, i) => (
            <Reveal key={service.id} delay={i * designMotion.lineRise.staggerMs}>
              <ServiceCard service={service} includesLabel={capabilities.includesLabel} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
