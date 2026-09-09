import Image from "next/image";
import Link from "next/link";
import { content } from "@/content";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { buttonVariants } from "@/components/ui/button";

/**
 * 01 — Hero. Full-bleed photography with the type composed ON it, per
 * primary.jpg: micro-block opposite the headline, a floating claim card at
 * the bottom-left, and the capability pills at the bottom-right.
 *
 * The previous version was a text-only near-black card. It typechecked, it
 * was responsive, and it looked like a wireframe, because nothing in it
 * carried an image. The media is the section here, not decoration on it.
 *
 * `data-hero` lets the header measure its height for the scroll threshold.
 * `data-tone="inverse"` flips the global focus ring to its light value.
 *
 * The ghosted wordmark that used to sit in this section now lives only in
 * the footer: at `--color-ghost-inverse` it reads as smudge over photography
 * rather than as a deliberate mark. See HOMEPAGE-REDESIGN.md.
 */
export function Hero() {
  const { hero } = content.home;

  return (
    <section
      data-hero
      data-tone="inverse"
      aria-labelledby="hero-headline"
      className="relative isolate flex min-h-svh flex-col overflow-hidden bg-inverse px-inset pb-xxl pt-hero-top text-on-inverse"
    >
      {/* Media layer. Two crops, swapped by media query rather than by
          object-position: the landscape plate loses its subject entirely
          inside a 375px-wide frame. */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <Image
          src={hero.media.mobileSrc}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover md:hidden"
        />
        <Image
          src={hero.media.src}
          alt={hero.media.alt}
          fill
          priority
          sizes="100vw"
          className="hidden object-cover md:block"
        />
        {/* Bottom-weighted scrim. Every piece of copy in this section sits in
            the lower two thirds, so the wash is heaviest there and the top
            stays open enough to read as a photograph. */}
        <div className="absolute inset-0 bg-gradient-to-t from-scrim-media-strong via-scrim-media-mid to-scrim-media-soft" />
      </div>

      <div className="mx-auto flex w-full max-w-container flex-1 flex-col">
        <div className="grid flex-1 gap-xxl lg:grid-cols-12 lg:gap-lg">
          {/* Micro-block. Set opposite the headline, not above it. */}
          <Reveal className="lg:col-span-3 lg:pt-lg">
            <Eyebrow tone="inverse">{hero.eyebrow}</Eyebrow>
            <p className="type-body-sm mt-md max-w-[24ch] text-on-inverse-muted">
              {hero.microNote}
            </p>
          </Reveal>

          <Reveal
            delay={80}
            className="flex flex-col gap-xl lg:col-span-8 lg:col-start-5 lg:items-end lg:text-right"
          >
            <h1
              id="hero-headline"
              className="type-display-xl max-w-[15ch] text-balance text-on-inverse"
            >
              {hero.headline}
            </h1>

            <p className="type-body-md max-w-[46ch] text-on-inverse-secondary">
              {hero.subheadline}
            </p>

            <div className="flex flex-wrap items-center gap-sm lg:justify-end">
              <Magnetic>
                <Link href={hero.cta.href} className={buttonVariants({ variant: "primary" })}>
                  {hero.cta.label}
                </Link>
              </Magnetic>
              <Link
                href={hero.secondaryCta.href}
                className={buttonVariants({ variant: "inverse" })}
              >
                {hero.secondaryCta.label}
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Bottom band. Right padding clears the fixed theme toggle, which
            otherwise lands on top of the last pill. */}
        <Reveal
          delay={160}
          className="mt-4xl flex flex-col gap-xl pr-toggle-clearance lg:flex-row lg:items-end lg:justify-between"
        >
          {/* `plate`, not `surface`: this card sits on photography that is
              dark in both themes, so it has to stay light in both. */}
          <div className="w-fit max-w-[26ch] shrink-0 rounded-md bg-plate p-lg shadow-elevation-2">
            <p className="type-eyebrow text-on-plate-muted">{hero.floatingCard.label}</p>
            <p className="type-heading-3 mt-sm text-on-plate">{hero.floatingCard.claim}</p>
          </div>

          <div className="lg:text-right">
            <h2 className="sr-only">{hero.tagsLabel}</h2>
            <ul className="flex flex-wrap gap-xs lg:justify-end">
              {content.services.map((service) => (
                <li
                  key={service.id}
                  className="type-caption rounded-full bg-overlay-fill-inverse px-md py-xxs text-on-inverse-secondary backdrop-blur-chrome"
                >
                  {service.title}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
