import { content } from "@/content";
import { Copy } from "@/components/ui/placeholder-block";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";

/**
 * 05 — Social Proof. Stat columns in the reference's "By the numbers"
 * arrangement: oversized figure, hairline rule beneath it, then the label
 * and a short supporting line. Every figure comes from content.ts and stays
 * a PLACEHOLDER until AH Growth supplies real numbers.
 */
export function SocialProof() {
  const { socialProof } = content.home;
  const stats = [
    socialProof.bento.conversionStat,
    socialProof.bento.engagementStat,
    socialProof.bento.retentionStat,
  ];

  return (
    <Section tone="surface">
      <Eyebrow>{socialProof.eyebrow}</Eyebrow>

      <div className="mt-4xl grid gap-xxl sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, i) => (
          <div key={i}>
            <p className="type-stat text-ink">
              <Copy value={stat.value} />
            </p>
            <hr className="mt-lg border-0 border-t border-hairline" />
            <p className="type-body-sm mt-lg text-ink-muted">
              <Copy value={stat.copy} />
            </p>
          </div>
        ))}
      </div>

      <p className="type-display-md mt-6xl max-w-[24ch] text-balance text-ink">
        <Copy value={socialProof.bento.craftStatement} />
      </p>
    </Section>
  );
}
