import type { Metadata } from "next";
import { content } from "@/content";
import { Card } from "@/components/ui/card";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { Statement } from "@/components/ui/statement";
import { Reveal } from "@/components/motion/reveal";
import { CtaOutro } from "@/components/sections/cta-outro";
import { SiteFooter } from "@/components/sections/site-footer";
import { motion as designMotion } from "@/lib/design-tokens";

export const metadata: Metadata = {
  title: content.about.manifesto.eyebrow,
  description: content.about.manifesto.body[0],
};

/**
 * About (/about). SITEMAP.md §5 lists four sections; two ship.
 *
 * 03 Team and 04 Recognition are omitted rather than stubbed: there are no
 * real team photos and no citable awards, and SITEMAP.md is explicit that an
 * empty trophy wall is worse than no trophy wall. `content.about.team` is an
 * empty array and `recognition` is null, so adding either later is content,
 * not layout.
 *
 * Opens on an inverse block like every other route, so the header's page-top
 * chrome stays legible.
 */
export default function AboutPage() {
  const { manifesto, process } = content.about;

  return (
    <>
      <Section tone="inverse" className="pt-[calc(var(--layout-section-y)+var(--space-4xl))]">
        <Reveal className="flex flex-col gap-lg">
          <Eyebrow tone="inverse">{manifesto.eyebrow}</Eyebrow>
          <Statement
            value={manifesto.heading}
            as="h1"
            tone="inverse"
            size="display-lg"
            className="max-w-[16ch]"
          />
          <div className="mt-xl flex max-w-[58ch] flex-col gap-lg">
            {manifesto.body.map((paragraph) => (
              <p key={paragraph} className="type-body-lg text-on-inverse-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section tone="surface" ariaLabelledBy="process-heading">
        <Reveal className="flex flex-col gap-lg">
          <Eyebrow>{process.eyebrow}</Eyebrow>
          <Statement value={process.heading} as="h2" className="max-w-[18ch]" />
        </Reveal>

        <ol className="mt-4xl grid gap-lg md:grid-cols-2">
          {process.phases.map((phase, i) => (
            <Reveal
              key={phase.label}
              as="li"
              delay={i * designMotion.lineRise.staggerMs}
            >
              <Card tone="sunken" className="flex h-full flex-col gap-md">
                <p className="type-eyebrow tabular text-primary-ink">{phase.label}</p>
                <h3 className="type-heading-2 text-ink">{phase.heading}</h3>
                <p className="type-body-md text-ink-muted">{phase.body}</p>
              </Card>
            </Reveal>
          ))}
        </ol>
      </Section>

      <CtaOutro />
      <SiteFooter />
    </>
  );
}
