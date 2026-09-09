import Image from "next/image";
import type { ElementType } from "react";
import type { CapsuleStatement as CapsuleStatementValue } from "@/content";

/**
 * `Statement` with small pill-masked images set INSIDE the line, the
 * signature composition in primary.jpg: the display type is interrupted
 * mid-sentence by a capsule of photography, so the headline and the imagery
 * read as one object rather than as a heading stacked above a picture.
 *
 * Every dimension is in `em`, so the capsule scales with the line it sits in
 * and stays correct at every clamp step of the display type. A px height
 * would be right at exactly one viewport width.
 *
 * The capsules are decorative by construction: they carry no meaning the
 * sentence does not already carry, so `alt` is empty and they are hidden
 * from assistive tech. That keeps the heading a single readable string.
 */
function Capsule({ src, alt }: { src: string; alt: string }) {
  return (
    <span
      aria-hidden={alt === "" ? true : undefined}
      className="relative mx-[0.14em] inline-block h-[0.66em] w-[1.55em] -translate-y-[0.04em] overflow-hidden rounded-full bg-surface-sunken align-middle"
    >
      <Image src={src} alt={alt} fill sizes="160px" className="object-cover" />
    </span>
  );
}

export function CapsuleStatement({
  value,
  as: Tag = "p",
  tone = "light",
  size = "display-lg",
  className = "",
  id,
}: {
  value: CapsuleStatementValue;
  as?: ElementType;
  /** `inverse` when sitting on a dark contrast block. */
  tone?: "light" | "inverse";
  size?: "display-xl" | "display-lg" | "display-md";
  className?: string;
  id?: string;
}) {
  const isInverse = tone === "inverse";
  const strong = isInverse ? "text-on-inverse" : "text-ink";
  const soft = isInverse ? "text-on-inverse-faint" : "text-ink-faint";

  return (
    <Tag id={id} className={`type-${size} ${strong} ${className}`}>
      {value.lead}
      {value.capsuleAfterLead ? <Capsule {...value.capsuleAfterLead} /> : " "}
      <span className={soft}>{value.muted}</span>
      {value.capsuleAfterMuted ? <Capsule {...value.capsuleAfterMuted} /> : null}
      {value.tail ? <> {value.tail}</> : null}
    </Tag>
  );
}
