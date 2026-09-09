import Link from "next/link";
import { content } from "@/content";
import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/ui/section";
import { MediaFrame } from "@/components/ui/media-frame";
import { buttonVariants } from "@/components/ui/button";
import { motion as designMotion } from "@/lib/design-tokens";

/**
 * 03 — Editorial trio. A caption rail on the left and three frames on the
 * right at staggered vertical offsets, per primary.jpg's "OUR LATEST
 * PROJECTS" band.
 *
 * This section exists because the page had exactly one image family (the
 * service plates) and therefore one texture. Its job is to put photography
 * on the canvas between two type-heavy blocks.
 *
 * The offsets are the composition. Three frames at equal height is a
 * contact sheet; three frames on a broken baseline is a layout. Ratios and
 * offsets are held together in one table so they cannot drift apart, and
 * both collapse below `lg` where a single column has no baseline to break.
 */
const FRAMES = [
  { ratio: "portrait", offset: "" },
  { ratio: "square", offset: "lg:mt-5xl" },
  { ratio: "portrait", offset: "lg:mt-xxl" },
] as const;

export function Editorial() {
  const { editorial } = content.home;

  return (
    <Section ariaLabelledBy="editorial-heading">
      <div className="grid gap-xxl lg:grid-cols-12 lg:gap-lg">
        <Reveal className="lg:col-span-3">
          <h2
            id="editorial-heading"
            className="type-eyebrow max-w-[10ch] text-ink underline decoration-primary underline-offset-4"
          >
            {editorial.lead}
          </h2>
          <p className="type-body-md mt-lg max-w-[30ch] text-ink-muted">{editorial.body}</p>
          <Link
            href={editorial.cta.href}
            className={buttonVariants({ variant: "secondary", size: "sm", className: "mt-xl" })}
          >
            {editorial.cta.label}
          </Link>
        </Reveal>

        <ul className="grid gap-lg sm:grid-cols-3 lg:col-span-8 lg:col-start-5">
          {editorial.items.map((item, i) => {
            const frame = FRAMES[i] ?? FRAMES[0];
            return (
              <Reveal
                key={item.src}
                as="li"
                delay={i * designMotion.lineRise.staggerMs}
                className={frame.offset}
              >
                <MediaFrame
                  src={item.src}
                  alt={item.alt}
                  ratio={frame.ratio}
                  sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 100vw"
                />
                <p className="type-caption mt-md text-ink-muted">{item.caption}</p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
