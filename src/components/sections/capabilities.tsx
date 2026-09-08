import { content } from "@/content";
import { Copy } from "@/components/ui/placeholder-block";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";

/**
 * 03 — Capabilities Carousel (skeleton). Renders as white cards on the light
 * canvas until the pinned horizontal / liquid-glass mechanic lands.
 */
export function Capabilities() {
  const { capabilities } = content.home;

  return (
    <Section tone="inverse">
      <Eyebrow tone="inverse">{capabilities.eyebrow}</Eyebrow>

      <h2 className="type-display-lg mt-lg max-w-[18ch] text-balance text-on-inverse">
        <Copy value={capabilities.heading} />
      </h2>

      <div className="mt-4xl grid gap-lg sm:grid-cols-2 lg:grid-cols-3">
        {content.services.length === 0 ? (
          <div className="type-caption rounded-lg bg-inverse-soft p-card text-on-inverse-faint">
            Service taxonomy pending — see content.ts serviceCategories.
          </div>
        ) : (
          content.services.map((service) => (
            <div
              key={service.id}
              className="rounded-lg bg-inverse-soft p-card"
            >
              <h3 className="type-heading-3 text-on-inverse">{service.title}</h3>
              <p className="type-body-sm mt-sm text-on-inverse-muted">{service.summary}</p>
            </div>
          ))
        )}
      </div>
    </Section>
  );
}
