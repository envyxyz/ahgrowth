import type { Service } from "@/content";
import { MediaFrame } from "@/components/ui/media-frame";
import { StaticChip } from "@/components/ui/chip";

/**
 * 04 — Capabilities card. Per assets/design/services/SERVICE-CARDS-THEMING-SPEC.md
 * Method A: a theme-colored radial glow sits BEHIND the alpha-cutout PNG, so
 * the card's luminous aperture picks up `--color-primary` and re-tints itself
 * whenever the accent token changes. No baked-in color.
 *
 * `focused` is live today (it drives the featured card's wider span and
 * landscape crop) and is the exact prop the pinned horizontal carousel will
 * drive from a scroll index later. The carousel upgrade changes what sets
 * this boolean, not this component.
 */
export function ServiceCard({
  service,
  focused = false,
  includesLabel,
  priority = false,
}: {
  service: Service;
  focused?: boolean;
  includesLabel: string;
  priority?: boolean;
}) {
  return (
    <article
      data-service={service.id}
      data-focused={focused ? "" : undefined}
      className="flex h-full flex-col gap-lg"
    >
      <MediaFrame
        src={service.cutoutSrc}
        alt={service.imageAlt}
        ratio={focused ? "landscape" : "portrait"}
        tone="inverse"
        priority={priority}
        sizes={
          focused
            ? "(max-width: 767px) 100vw, (max-width: 1023px) 100vw, 60vw"
            : "(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 30vw"
        }
      >
        {/* Dynamic accent glow, z-0, behind the cutout's transparent aperture. */}
        <span
          aria-hidden
          className="pointer-events-none absolute z-0 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
          style={{
            left: service.accentPosition.left,
            top: service.accentPosition.top,
            width: service.accentPosition.width,
            height: service.accentPosition.height,
            background:
              "radial-gradient(circle, var(--color-primary) 0%, var(--color-accent-tint) 60%, transparent 80%)",
          }}
        />
      </MediaFrame>

      <div className="flex flex-col gap-sm">
        <h3 className="type-heading-2 text-on-inverse">{service.title}</h3>
        <p className="type-body-sm max-w-[46ch] text-on-inverse-muted">{service.summary}</p>
      </div>

      <div className="mt-auto flex flex-col gap-sm">
        <p className="type-eyebrow text-on-inverse-faint">{includesLabel}</p>
        <ul className="flex flex-wrap gap-xs">
          {service.subcategories.map((sub) => (
            <li key={sub}>
              <StaticChip label={sub} tone="inverse" />
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
