import type { Metadata } from "next";
import { content } from "@/content";
import { Card } from "@/components/ui/card";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { Statement } from "@/components/ui/statement";
import { Reveal } from "@/components/motion/reveal";
import { SiteFooter } from "@/components/sections/site-footer";
import { InquiryForm } from "@/components/sections/contact/inquiry-form";
import { motion as designMotion } from "@/lib/design-tokens";

export const metadata: Metadata = {
  title: content.contact.form.heading,
  description: content.contact.intro.body,
};

/**
 * Contact (/contact). Sections per SITEMAP.md §6.
 *
 * §01 opens on an INVERSE block deliberately: the header's chrome is styled
 * for a dark surface at page-top, so every route needs to start on one. That
 * is why the header carries no per-route tone logic.
 */
export default function ContactPage() {
  const { contact } = content;

  return (
    <>
      <Section tone="inverse" className="pt-[calc(var(--layout-section-y)+var(--space-4xl))]">
        <Reveal className="flex flex-col gap-lg">
          <Eyebrow tone="inverse">{contact.intro.eyebrow}</Eyebrow>
          <Statement
            value={contact.intro.heading}
            as="h1"
            tone="inverse"
            className="max-w-[18ch]"
          />
          <p className="type-body-lg max-w-[52ch] text-on-inverse-muted">
            {contact.intro.body}
          </p>
          {contact.availability.isOpen && (
            <p className="type-eyebrow text-primary-ink">
              {contact.availability.statusLabel}
            </p>
          )}
        </Reveal>
      </Section>

      <Section>
        <Reveal>
          <h2 className="type-display-md mb-4xl text-ink">{contact.form.heading}</h2>
          <InquiryForm />
        </Reveal>
      </Section>

      <Section tone="surface">
        <h2 className="sr-only">{contact.reassuranceHeading}</h2>
        <div className="grid gap-lg md:grid-cols-3">
          {contact.reassurance.map((item, i) => (
            <Reveal key={item.title} delay={i * designMotion.lineRise.staggerMs}>
              <Card tone="sunken" className="flex h-full flex-col gap-md">
                <h3 className="type-heading-3 text-ink">{item.title}</h3>
                <p className="type-body-md text-ink-muted">{item.body}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="inverse">
        <Reveal className="flex flex-col gap-lg">
          <Eyebrow tone="inverse">{contact.direct.eyebrow}</Eyebrow>
          <h2 className="type-display-md max-w-[18ch] text-balance text-on-inverse">
            {contact.direct.heading}
          </h2>
          <a
            href={`mailto:${contact.direct.email}`}
            className="type-heading-2 w-fit rounded-xs text-on-inverse underline underline-offset-8 transition-colors duration-micro ease-out-soft hover:text-on-inverse-secondary"
          >
            {contact.direct.email}
          </a>
          <div className="mt-xl flex flex-wrap gap-4xl">
            {contact.direct.offices.map((office) => (
              <p key={office.city} className="type-body-sm text-on-inverse-muted">
                <span className="block text-on-inverse">{office.city}</span>
                {office.address}
              </p>
            ))}
          </div>
        </Reveal>
      </Section>

      <SiteFooter />
    </>
  );
}
