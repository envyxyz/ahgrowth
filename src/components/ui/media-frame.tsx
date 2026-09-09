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
  /** `fill` sets no aspect ratio and covers the parent instead, which must
      be positioned. Use it when the grid row decides the height, not the
      image: an aspect ratio plus a definite height fights itself and the
      image ends up sized off its height rather than the cell's width. */
  ratio?: "portrait" | "square" | "landscape" | "fill";
  /** Placeholder fill behind the image. `inverse` on a dark block: a light
      fill shows straight through a cutout PNG's transparent aperture. */
  tone?: "light" | "inverse";
  priority?: boolean;
  className?: string;
  /** Overlay content, e.g. the accent glow behind a cutout. */
  children?: React.ReactNode;
}) {
  /* Position ships with the ratio, not alongside it. `relative absolute` in
     one class list does not resolve by author order — Tailwind emits
     `.relative` after `.absolute`, so `relative` would silently win and the
     fill variant would collapse. */
  const boxClass = {
    portrait: "relative aspect-[3/4]",
    square: "relative aspect-square",
    landscape: "relative aspect-[16/10]",
    fill: "absolute inset-0",
  }[ratio];

  return (
    <div
      className={`isolate overflow-hidden rounded-lg ${boxClass} ${
        tone === "inverse" ? "bg-inverse-soft" : "bg-surface-sunken"
      } ${className}`}
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
