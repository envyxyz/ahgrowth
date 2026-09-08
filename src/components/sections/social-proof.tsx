import { content } from "@/content";
import { Card } from "@/components/ui/card";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { Statement } from "@/components/ui/statement";
import { Reveal } from "@/components/motion/reveal";
import { motion as designMotion } from "@/lib/design-tokens";

/**
 * 05 — Social Proof. SITEMAP.md scopes this as metric callouts, craft
 * guarantees and credibility proof. The MVP ships the guarantees: they are
 * commitments AH Growth controls, where a metric would be a number nobody
 * has verified.
 *
 * The asymmetric bento spans are the ones the reference specifies, so real
 * metrics and client logos later drop into the two gated blocks below
 * without the layout changing.
 */
export function SocialProof() {
  const { socialProof } = content.home;

  /* Card 0 wide, card 3 wide: balanced 3-col bento grid for 4 items. */
  const spans = ["md:col-span-2", "", "", "md:col-span-2"];

  return (
    <Section tone="surface" ariaLabelledBy="commitments-heading">
      <Reveal className="flex flex-col gap-lg">
        <Eyebrow>{socialProof.eyebrow}</Eyebrow>
        <Statement id="commitments-heading" value={socialProof.heading} as="h2" className="max-w-[20ch]" />
      </Reveal>

      <div className="mt-4xl grid gap-lg md:grid-cols-2 lg:grid-cols-3">
        {socialProof.commitments.map((commitment, i) => (
          <Reveal
            key={commitment.title}
            delay={i * designMotion.lineRise.staggerMs}
            className={spans[i] ?? ""}
          >
            <Card tone="sunken" className="flex h-full flex-col gap-md">
              <h3 className="type-heading-3 text-ink">{commitment.title}</h3>
              <p className="type-body-md max-w-[44ch] text-ink-muted">{commitment.body}</p>
            </Card>
          </Reveal>
        ))}
      </div>

      {/* Both render only once real, verified data exists. */}
      {socialProof.metrics.length > 0 && (
        <div className="mt-4xl grid gap-xxl sm:grid-cols-2 lg:grid-cols-3">
          {socialProof.metrics.map((metric) => (
            <div key={metric.label}>
              <p className="type-stat text-ink">{metric.value}</p>
              <hr aria-hidden className="mt-lg border-0 border-t border-hairline" />
              <p className="type-body-sm mt-lg text-ink-muted">{metric.label}</p>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}
