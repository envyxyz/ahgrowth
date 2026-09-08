/**
 * Section shell. Every major section routes its horizontal inset and
 * vertical rhythm through this so spacing stays consistent: `--layout-inset`
 * at the page edge, `--layout-section-y` between sections, content capped at
 * `--layout-container` and centered.
 */
export function Section({
  children,
  id,
  tone = "canvas",
  className = "",
}: {
  children: React.ReactNode;
  id?: string;
  /** `inverse` renders the near-black contrast block used for hero/stats/services. */
  tone?: "canvas" | "surface" | "inverse";
  className?: string;
}) {
  const toneClass = {
    canvas: "bg-canvas text-ink",
    surface: "bg-surface text-ink",
    inverse: "bg-inverse text-on-inverse",
  }[tone];

  return (
    <section id={id} className={`px-inset py-section-y ${toneClass} ${className}`}>
      <div className="mx-auto w-full max-w-container">{children}</div>
    </section>
  );
}
