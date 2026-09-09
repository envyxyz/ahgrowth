import { content, type Commitment } from "@/content";
import { Card } from "@/components/ui/card";
import { Eyebrow } from "@/components/ui/eyebrow";
import { MediaFrame } from "@/components/ui/media-frame";
import { Section } from "@/components/ui/section";
import { Statement } from "@/components/ui/statement";
import { Reveal } from "@/components/motion/reveal";
import { motion as designMotion } from "@/lib/design-tokens";

/**
 * 06 — Social Proof. SITEMAP.md scopes this as metric callouts, craft
 * guarantees and credibility proof. The MVP ships the guarantees: they are
 * commitments AH Growth controls, where a metric would be a number nobody
 * has verified.
 *
 * Four flat cards in a row read as a table, not a bento. The commitment that
 * carries an image renders as a media cell instead: photograph, scrim, copy
 * on top. That single variation is what makes the grid a composition, and
 * real metrics and client logos later drop into the gated block below
 * without the layout changing.
 */

/** Columns at `lg`. Spans apply only there: `md` runs two even columns and
    mobile a single one, and both tile with no help. */
const LG_COLS = 3;

/** Tailwind needs literal class names, so spans map by width, never by index. */
const SPAN_CLASS: Record<number, string> = {
  1: "",
  2: "lg:col-span-2",
  3: "lg:col-span-3",
};

/**
 * A media cell is twice the width of a text cell, so four cells only tile a
 * three-column grid for some orderings. An index-to-span table would look
 * correct today and silently open a hole the moment content.ts reorders the
 * commitments, so the spans are derived from the data instead: a cell
 * stretches to close its row whenever what follows it cannot use the columns
 * left over, and the last cell always closes the final row. No empty cell,
 * whatever order or count content.ts holds.
 */
function lgSpans(commitments: Commitment[]): string[] {
  const natural = commitments.map((commitment) => (commitment.imageSrc ? 2 : 1));
  let filled = 0;

  return natural.map((span, i) => {
    const room = LG_COLS - filled;
    const next = natural[i + 1] ?? 0;
    const closesRow = span >= room || next === 0 || next > room - span;
    const width = closesRow ? room : span;

    filled = (filled + width) % LG_COLS;
    return SPAN_CLASS[width] ?? "";
  });
}

export function SocialProof() {
  const { socialProof } = content.home;
  const spans = lgSpans(socialProof.commitments);

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
            {commitment.imageSrc ? (
              /* Media cell. The frame is absolute so the cell is sized by the
                 grid row and its own floor, not by an aspect ratio, and the
                 copy sits above the image rather than under it. */
              <div
                data-tone="inverse"
                className="relative isolate flex h-full min-h-6xl flex-col justify-end overflow-hidden rounded-lg bg-inverse-soft p-card"
              >
                <MediaFrame
                  src={commitment.imageSrc}
                  alt={commitment.imageAlt ?? ""}
                  tone="inverse"
                  ratio="fill"
                  sizes="(min-width: 1024px) 61vw, (min-width: 768px) 46vw, 100vw"
                />
                {/* Bottom-weighted, matching where the copy sits. The scrim is
                    keyed to the near-black inverse in both palettes, so the
                    light-on-dark text below reads on either theme. */}
                <div
                  aria-hidden
                  className="absolute inset-0 z-[2] bg-gradient-to-t from-scrim-media-strong via-scrim-media-mid to-transparent"
                />
                <div className="relative z-[3] flex flex-col gap-md">
                  <h3 className="type-heading-3 text-on-inverse">{commitment.title}</h3>
                  <p className="type-body-md max-w-[44ch] text-on-inverse-secondary">
                    {commitment.body}
                  </p>
                </div>
              </div>
            ) : (
              <Card tone="sunken" className="flex h-full flex-col gap-md">
                <h3 className="type-heading-3 text-ink">{commitment.title}</h3>
                <p className="type-body-md max-w-[44ch] text-ink-muted">{commitment.body}</p>
              </Card>
            )}
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
