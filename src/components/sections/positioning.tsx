import { content } from "@/content";
import { Copy } from "@/components/ui/placeholder-block";
import { Section } from "@/components/ui/section";

/**
 * 02 — Positioning Statement. The "exhale" after the hero: one oversized
 * statement line on the light canvas, left-aligned and generously spaced,
 * per the two-tone statement blocks in the reference set.
 */
export function Positioning() {
  return (
    <Section>
      <p className="type-display-lg max-w-[20ch] text-balance text-ink">
        <Copy value={content.home.positioning.statement} />
      </p>
    </Section>
  );
}
