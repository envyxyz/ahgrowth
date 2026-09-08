"use client";

import { motion as designMotion } from "@/lib/design-tokens";

/**
 * Full-viewport scrim behind the open nav panel. One opacity fade on one
 * fixed layer (Preset: Glass Tab Switcher notes) — never blur every card
 * individually. Clicking it closes the panel, same as clicking the island.
 */
export function MenuScrim({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div
      aria-hidden={!open}
      onClick={onClose}
      className="fixed inset-0 z-40 bg-scrim backdrop-blur-chrome transition-opacity ease-out-soft"
      style={{
        opacity: open ? 1 : 0,
        pointerEvents: open ? "auto" : "none",
        transitionDuration: `${designMotion.header.scrimFadeMs}ms`,
      }}
    />
  );
}
