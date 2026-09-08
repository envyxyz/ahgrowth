import { content } from "@/content";
import { Copy } from "@/components/ui/placeholder-block";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";

/** 04 — Selected Work (skeleton). Koto-style sticky caption rail lands separately. */
export function SelectedWork() {
  const { selectedWork } = content.home;

  return (
    <Section>
      <Eyebrow>{selectedWork.eyebrow}</Eyebrow>

      <h2 className="type-display-lg mt-lg max-w-[18ch] text-balance text-ink">
        <Copy value={selectedWork.heading} />
      </h2>

      {content.work.projects.length === 0 && (
        <div className="type-caption mt-4xl rounded-lg bg-surface p-card text-ink-faint">
          No case studies published yet — see content.ts work.projects.
        </div>
      )}
    </Section>
  );
}
