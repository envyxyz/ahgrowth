/**
 * `card` / `card-on-inverse` component tokens. Filled panel, no border: the
 * surface step off the canvas IS the separation. `surface` would collapse
 * into an inverse block in the dark palette, which is why the tone is a prop
 * and not a caller's choice of class.
 */
export function Card({
  children,
  tone = "surface",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "surface" | "inverse" | "sunken";
  className?: string;
}) {
  const toneClass = {
    surface: "bg-surface text-ink",
    inverse: "bg-inverse-soft text-on-inverse",
    sunken: "bg-surface-sunken text-ink",
  }[tone];

  return (
    <div className={`rounded-lg p-card ${toneClass} ${className}`}>{children}</div>
  );
}
