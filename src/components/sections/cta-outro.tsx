import { content } from "@/content";
import { Copy } from "@/components/ui/placeholder-block";
import { CursorFillButton } from "@/components/ui/cursor-fill-button";
import { Section } from "@/components/ui/section";

/**
 * 07 — CTA Outro. Carries id="start" — the header CTA smooth-scrolls here
 * for the single-page v1 (see SITEMAP.md §2).
 */
export function CtaOutro() {
  return (
    <Section id="start" tone="inverse" className="scroll-mt-xxl">
      <div className="flex flex-col items-start gap-xxl">
        <h2 className="type-display-lg max-w-[18ch] text-balance text-on-inverse">
          <Copy value={content.home.ctaOutro.headline} />
        </h2>
        <CursorFillButton label={content.home.ctaOutro.cta.label} tone="inverse" />
      </div>
    </Section>
  );
}
