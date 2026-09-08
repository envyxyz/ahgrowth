import { content } from "@/content";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { Statement } from "@/components/ui/statement";
import { Reveal } from "@/components/motion/reveal";
import { ServiceCard } from "@/components/sections/capabilities/service-card";
import { PinnedCarousel } from "@/components/sections/capabilities/pinned-carousel";
import { motion as designMotion } from "@/lib/design-tokens";

/**
 * 03 — Capabilities. Two layouts, one content source.
 *
 * Laptop and up with motion allowed: the pinned horizontal carousel locked in
 * inspirations.md §4. Everything else (mobile, tablet, reduced motion): the
 * stacked card grid, per SITEMAP.md §7 "any pinned or scroll-scrubbed section
 * falls back to normal vertical stacking below laptop".
 *
 * Both are server-rendered and swapped by media query, not by a mount-time
 * state flip, so neither flashes on first paint.
 */
export function Capabilities() {
  const { capabilities } = content.home;

  return (
    <section id={capabilities.id} className="scroll-mt-xxl" aria-labelledby="capabilities-heading">
      <div className="hidden lg:motion-safe:block">
        <PinnedCarousel services={content.services} />
      </div>

      <div className="lg:motion-safe:hidden">
        <Section tone="inverse" as="div">
          <Reveal className="flex flex-col gap-lg">
            <Eyebrow tone="inverse">{capabilities.eyebrow}</Eyebrow>
            <Statement
              id="capabilities-heading"
              value={capabilities.heading}
              as="h2"
              tone="inverse"
              className="max-w-[18ch]"
            />
            <p className="type-body-lg max-w-[46ch] text-on-inverse-muted">
              {capabilities.intro}
            </p>
          </Reveal>

          <div className="mt-4xl grid gap-xxl md:grid-cols-2">
            {content.services.map((service, i) => (
              <Reveal key={service.id} delay={i * designMotion.lineRise.staggerMs}>
                <ServiceCard
                  service={service}
                  includesLabel={capabilities.includesLabel}
                />
              </Reveal>
            ))}
          </div>
        </Section>
      </div>
    </section>
  );
}
