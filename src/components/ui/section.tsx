/**
 * Section shell. Every major section routes its horizontal inset and
 * vertical rhythm through this so spacing stays consistent: `--layout-inset`
 * at the page edge, `--layout-section-y` between sections, content capped at
 * `--layout-container` and centered.
 *
 * `data-tone` is read by the global :focus-visible rule so the focus ring
 * flips to its light value on a dark block. Any dark surface outside a
 * Section (the hero card, the footer) must carry it too.
 */
export function Section({
  children,
  id,
  tone = "canvas",
  className = "",
  as: Tag = "section",
  ariaLabelledBy,
}: {
  children: React.ReactNode;
  id?: string;
  /** `inverse` renders the near-black contrast block. Dark in BOTH themes. */
  tone?: "canvas" | "surface" | "inverse";
  className?: string;
  as?: "section" | "div";
  ariaLabelledBy?: string;
}) {
  const toneClass = {
    canvas: "bg-canvas text-ink",
    surface: "bg-surface text-ink",
    inverse: "bg-inverse text-on-inverse",
  }[tone];

  return (
    <Tag
      id={id}
      data-tone={tone}
      aria-labelledby={ariaLabelledBy}
      className={`px-inset py-section-y ${toneClass} ${className}`}
    >
      <div className="mx-auto w-full max-w-container">{children}</div>
    </Tag>
  );
}
