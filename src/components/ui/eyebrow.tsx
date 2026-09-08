/**
 * `eyebrow` component token: a small vermilion square followed by a mono
 * micro-label. This marker appears above nearly every section in the locked
 * reference set (Stodio "Who we are" / "By the numbers", Seative "/About",
 * Lovera "Selected clients"), and is the main place the accent shows up on
 * a light surface.
 */
export function Eyebrow({
  children,
  tone = "light",
  className = "",
}: {
  children: React.ReactNode;
  /** `inverse` when sitting on a dark contrast section. */
  tone?: "light" | "inverse";
  className?: string;
}) {
  return (
    <p
      className={`type-eyebrow flex items-center gap-xs ${
        tone === "inverse" ? "text-on-inverse-muted" : "text-ink-muted"
      } ${className}`}
    >
      <span aria-hidden className="h-2 w-2 shrink-0 rounded-[2px] bg-primary" />
      {children}
    </p>
  );
}
