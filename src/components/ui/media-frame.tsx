import Image from "next/image";

/**
 * Every image on the site goes through this: one rounded frame, one set of
 * `sizes` rules, one aspect ratio contract. Prevents four different image
 * implementations drifting apart on object-fit and responsive loading.
 */
export function MediaFrame({
  src,
  alt,
  sizes,
  ratio = "portrait",
  tone = "light",
  priority = false,
  className = "",
  children,
}: {
  src: string;
  alt: string;
  /** Required: an unset `sizes` on a `fill` image downloads the largest source. */
  sizes: string;
  ratio?: "portrait" | "square" | "landscape";
  /** Placeholder fill behind the image. `inverse` on a dark block: a light
      fill shows straight through a cutout PNG's transparent aperture. */
  tone?: "light" | "inverse";
  priority?: boolean;
  className?: string;
  /** Overlay content, e.g. the accent glow behind a cutout. */
  children?: React.ReactNode;
}) {
  const ratioClass = {
    portrait: "aspect-[3/4]",
    square: "aspect-square",
    landscape: "aspect-[16/10]",
  }[ratio];

  return (
    <div
      className={`relative isolate overflow-hidden rounded-lg ${
        tone === "inverse" ? "bg-inverse-soft" : "bg-surface-sunken"
      } ${ratioClass} ${className}`}
    >
      {children}
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="relative z-[1] object-cover"
      />
    </div>
  );
}
