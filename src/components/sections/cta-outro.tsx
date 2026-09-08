import { content } from "@/content";
import { Section } from "@/components/ui/section";
import { Statement } from "@/components/ui/statement";
import { Reveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { CursorFillButton } from "@/components/ui/cursor-fill-button";

/**
 * 07 — CTA Outro. The peak-end close: one line, one action. Carries
 * id="start" so the hero's in-page anchor and any legacy #start link land
 * here rather than 404ing.
 */
export function CtaOutro() {
  const { ctaOutro } = content.home;

  return (
    <Section id={ctaOutro.id} tone="inverse" className="scroll-mt-xxl">
      <Reveal className="flex flex-col items-start gap-xxl">
        <Statement
          value={ctaOutro.headline}
          as="h2"
          tone="inverse"
          className="max-w-[20ch]"
        />

        <div className="flex flex-col gap-lg sm:flex-row sm:items-center">
          <Magnetic>
            <CursorFillButton
              label={ctaOutro.cta.label}
              href={ctaOutro.cta.href}
              tone="inverse"
            />
          </Magnetic>
          <p className="type-body-sm text-on-inverse-muted">
            {ctaOutro.directPrefix}{" "}
            <a
              href={`mailto:${content.footer.directEmail}`}
              className="rounded-xs text-on-inverse underline underline-offset-4 transition-colors duration-micro ease-out-soft hover:text-on-inverse-secondary"
            >
              {content.footer.directEmail}
            </a>
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
