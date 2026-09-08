import type { ElementType } from "react";
import type { Statement as StatementValue } from "@/content";

/**
 * `statement` component token: the two-tone display line that recurs across
 * the reference set (primary.jpg uses it four times). Full-contrast opening,
 * muted continuation, optional full-contrast close.
 *
 * Sections never assemble this by hand. One component so the muted half is
 * always the same token, on every tone, in both themes.
 */
export function Statement({
  value,
  as: Tag = "p",
  tone = "light",
  size = "display-lg",
  className = "",
  id,
}: {
  value: StatementValue;
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
    <Tag id={id} className={`type-${size} text-balance ${strong} ${className}`}>
      {value.lead} <span className={soft}>{value.muted}</span>
      {value.tail ? <> {value.tail}</> : null}
    </Tag>
  );
}
