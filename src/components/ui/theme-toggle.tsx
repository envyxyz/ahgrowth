"use client";

import { useTheme } from "@/components/providers/theme";
import { motion as designMotion } from "@/lib/design-tokens";

/**
 * Fixed light/dark switch, bottom-right. Borderless filled chrome like every
 * other control in the system — the surface step carries it, not an outline.
 * Renders a stable icon frame so nothing shifts when the theme flips.
 */
export function ThemeToggle({ label }: { label: string }) {
  const { resolved, toggle } = useTheme();
  const isDark = resolved === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      aria-pressed={isDark}
      title={label}
      className="fixed bottom-lg right-lg z-[60] inline-flex h-12 w-12 items-center justify-center rounded-full bg-chrome text-on-chrome shadow-elevation-1 backdrop-blur-chrome transition-opacity ease-out-soft hover:opacity-80"
      style={{ transitionDuration: `${designMotion.header.chromeHoverMs}ms` }}
    >
      <SunMoonIcon isDark={isDark} />
    </button>
  );
}

/**
 * One SVG carrying both states: the moon's bite mask slides in and the rays
 * retract, so the swap animates instead of hard-cutting between two icons.
 */
function SunMoonIcon({ isDark }: { isDark: boolean }) {
  const ease = "var(--ease-out-soft)";
  const dur = "var(--duration-interactive)";

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    >
      <mask id="theme-toggle-mask">
        <rect x="0" y="0" width="24" height="24" fill="white" />
        <circle
          cx={isDark ? 17 : 30}
          cy={isDark ? 7 : -6}
          r="9"
          fill="black"
          style={{ transition: `cx ${dur} ${ease}, cy ${dur} ${ease}` }}
        />
      </mask>

      <circle
        cx="12"
        cy="12"
        r={isDark ? 8.5 : 5}
        fill="currentColor"
        stroke="none"
        mask="url(#theme-toggle-mask)"
        style={{ transition: `r ${dur} ${ease}` }}
      />

      <g style={{ opacity: isDark ? 0 : 1, transition: `opacity ${dur} ${ease}` }}>
        {[
          [12, 1, 12, 3],
          [12, 21, 12, 23],
          [1, 12, 3, 12],
          [21, 12, 23, 12],
          [4.2, 4.2, 5.6, 5.6],
          [18.4, 18.4, 19.8, 19.8],
          [4.2, 19.8, 5.6, 18.4],
          [18.4, 5.6, 19.8, 4.2],
        ].map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
        ))}
      </g>
    </svg>
  );
}
