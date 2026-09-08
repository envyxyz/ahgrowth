import type { LegalDocument } from "@/content";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/motion/reveal";
import { SiteFooter } from "@/components/sections/site-footer";

/**
 * Shared shell for /privacy and /terms. Single measure-capped column on the
 * canvas: these are documents, so readability beats layout invention.
 * Opens on an inverse block so the page-top header chrome stays legible,
 * same rule as /contact.
 */
export function LegalPage({ document }: { document: LegalDocument }) {
  return (
    <>
      <Section tone="inverse" className="pt-[calc(var(--layout-section-y)+var(--space-4xl))]">
        <Reveal className="flex flex-col gap-md">
          <h1 className="type-display-lg max-w-[16ch] text-balance text-on-inverse">
            {document.title}
          </h1>
          <p className="type-eyebrow text-on-inverse-faint">{document.updated}</p>
          <p className="type-body-lg mt-lg max-w-[58ch] text-on-inverse-muted">
            {document.intro}
          </p>
        </Reveal>
      </Section>

      <Section>
        <div className="flex max-w-[68ch] flex-col gap-4xl">
          {document.sections.map((section) => (
            <Reveal key={section.heading} className="flex flex-col gap-md">
              <h2 className="type-heading-2 text-ink">{section.heading}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="type-body-md text-ink-muted">
                  {paragraph}
                </p>
              ))}
            </Reveal>
          ))}
        </div>
      </Section>

      <SiteFooter />
    </>
  );
}
