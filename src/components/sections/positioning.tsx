import { content } from "@/content";
import { Section } from "@/components/ui/section";
import { WordWipe } from "@/components/motion/word-wipe";

/**
 * 02 — Positioning Statement. The exhale after the hero: one oversized
 * two-tone line on the light canvas, scrubbing word by word as it passes
 * through the viewport (Preset: Word Wipe Scrub).
 */
export function Positioning() {
  return (
    <Section>
      <WordWipe
        value={content.home.positioning.statement}
        size="display-md"
        className="max-w-[26ch]"
      />
    </Section>
  );
}
