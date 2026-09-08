"use client";

import { easing, motion as designMotion } from "@/lib/design-tokens";

const base =
  "type-body-sm inline-flex min-h-11 items-center rounded-full px-lg transition-colors";

/**
 * Interactive pill chip (Preset: Invert Chip). Used for the contact form's
 * service multi-select and budget single-select. Selection inverts the fill
 * rather than adding an outline, matching the border-free system.
 */
export function Chip({
  label,
  selected,
  onToggle,
  tone = "light",
  role = "button",
}: {
  label: string;
  selected: boolean;
  onToggle: () => void;
  tone?: "light" | "inverse";
  /** `checkbox` for multi-select, `radio` for single-select, `button` otherwise. */
  role?: "button" | "checkbox" | "radio";
}) {
  const isInverse = tone === "inverse";
  const restClass = isInverse
    ? "bg-overlay-fill-inverse text-on-inverse-secondary hover:bg-overlay-fill-inverse-hover"
    : "bg-overlay-fill text-ink-secondary hover:bg-overlay-fill-hover";
  const activeClass = isInverse
    ? "bg-on-inverse text-inverse"
    : "bg-ink text-canvas";

  return (
    <button
      type="button"
      role={role === "button" ? undefined : role}
      aria-pressed={role === "button" ? selected : undefined}
      aria-checked={role === "button" ? undefined : selected}
      onClick={onToggle}
      className={`${base} ${selected ? activeClass : restClass}`}
      style={{
        transitionDuration: `${designMotion.invertChip.durationMs}ms`,
        transitionTimingFunction: easing.outSoft,
      }}
    >
      {label}
    </button>
  );
}

/** Non-interactive variant: service sub-category tags, filter labels. */
export function StaticChip({
  label,
  tone = "light",
}: {
  label: string;
  tone?: "light" | "inverse";
}) {
  return (
    <span
      className={`type-caption inline-flex items-center rounded-full px-md py-xxs ${
        tone === "inverse"
          ? "bg-overlay-fill-inverse text-on-inverse-secondary"
          : "bg-overlay-fill text-ink-secondary"
      }`}
    >
      {label}
    </span>
  );
}
