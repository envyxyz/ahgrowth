/**
 * JS-consumable mirror of the CSS custom properties in src/styles/tokens.css,
 * plus motion constants that only exist as JS values (GSAP/Lenis config has
 * no CSS equivalent). Use this instead of hardcoding hex/px/ms values in
 * components — one fact, one field, same rule content.ts follows for copy.
 *
 * Source of truth for values: assets/design/design-ahgrowth.md (visual) and
 * assets/design/inspirations/presets/*.md (motion). Update the docs first,
 * then mirror the change here.
 */

/**
 * Both palettes. Color is the ONLY thing that differs between themes —
 * spacing, radius, type and motion below are shared.
 *
 * Prefer `readColor()` over these literals in anything that renders at
 * runtime: it reads the live CSS variable, so it stays correct when the user
 * flips the theme. Use the literals only where a build-time constant is
 * genuinely needed.
 */
export const lightColors = {
  primary: "#ea4127",
  primaryHover: "#d3341c",
  primaryInk: "#c4331c",
  onPrimary: "#ffffff",

  ink: "#111110",
  inkSecondary: "#3a3a37",
  inkMuted: "#6e6e69",
  inkFaint: "#a3a39d",

  onInverse: "#f7f7f5",
  onInverseSecondary: "#d0d0cb",
  onInverseMuted: "#a8a8a2",
  onInverseFaint: "#74746f",

  canvas: "#f2f1ef",
  surface: "#ffffff",
  surfaceSunken: "#e8e7e4",
  inverse: "#111110",
  inverseSoft: "#1c1c1a",
  chrome: "#111110",
  onChrome: "#f7f7f5",
  onChromeMuted: "#a8a8a2",

  hairline: "rgba(17, 17, 16, 0.10)",
  hairlineInverse: "rgba(255, 255, 255, 0.12)",

  overlayFill: "rgba(17, 17, 16, 0.06)",
  overlayFillHover: "rgba(17, 17, 16, 0.11)",
  overlayFillInverse: "rgba(255, 255, 255, 0.10)",
  overlayFillInverseHover: "rgba(255, 255, 255, 0.16)",

  accentTint: "rgba(234, 65, 39, 0.10)",

  ghost: "rgba(17, 17, 16, 0.05)",
  ghostInverse: "rgba(255, 255, 255, 0.055)",
  scrim: "rgba(242, 241, 239, 0.72)",
} as const;

export const darkColors: Record<keyof typeof lightColors, string> = {
  primary: "#ea4127",
  primaryHover: "#f2583f",
  primaryInk: "#ff6a4d",
  onPrimary: "#ffffff",

  ink: "#f5f4f2",
  inkSecondary: "#c9c8c4",
  inkMuted: "#93928d",
  inkFaint: "#66655f",

  onInverse: "#f5f4f2",
  onInverseSecondary: "#c9c8c4",
  onInverseMuted: "#93928d",
  onInverseFaint: "#66655f",

  canvas: "#0a0a09",
  surface: "#161615",
  surfaceSunken: "#050504",
  inverse: "#161615",
  inverseSoft: "#1f1f1d",
  chrome: "#262625",
  onChrome: "#f5f4f2",
  onChromeMuted: "#93928d",

  hairline: "rgba(255, 255, 255, 0.08)",
  hairlineInverse: "rgba(255, 255, 255, 0.08)",

  overlayFill: "rgba(255, 255, 255, 0.07)",
  overlayFillHover: "rgba(255, 255, 255, 0.13)",
  overlayFillInverse: "rgba(255, 255, 255, 0.07)",
  overlayFillInverseHover: "rgba(255, 255, 255, 0.13)",

  accentTint: "rgba(234, 65, 39, 0.16)",

  ghost: "rgba(255, 255, 255, 0.045)",
  ghostInverse: "rgba(255, 255, 255, 0.045)",
  scrim: "rgba(10, 10, 9, 0.72)",
};

/** Default export kept as the light palette for build-time consumers. */
export const colors = lightColors;

const CSS_VAR_BY_KEY: Record<keyof typeof lightColors, string> = {
  primary: "--color-primary",
  primaryHover: "--color-primary-hover",
  primaryInk: "--color-primary-ink",
  onPrimary: "--color-on-primary",
  ink: "--color-ink",
  inkSecondary: "--color-ink-secondary",
  inkMuted: "--color-ink-muted",
  inkFaint: "--color-ink-faint",
  onInverse: "--color-on-inverse",
  onInverseSecondary: "--color-on-inverse-secondary",
  onInverseMuted: "--color-on-inverse-muted",
  onInverseFaint: "--color-on-inverse-faint",
  canvas: "--color-canvas",
  surface: "--color-surface",
  surfaceSunken: "--color-surface-sunken",
  inverse: "--color-inverse",
  inverseSoft: "--color-inverse-soft",
  chrome: "--color-chrome",
  onChrome: "--color-on-chrome",
  onChromeMuted: "--color-on-chrome-muted",
  hairline: "--color-hairline",
  hairlineInverse: "--color-hairline-inverse",
  overlayFill: "--color-overlay-fill",
  overlayFillHover: "--color-overlay-fill-hover",
  overlayFillInverse: "--color-overlay-fill-inverse",
  overlayFillInverseHover: "--color-overlay-fill-inverse-hover",
  accentTint: "--color-accent-tint",
  ghost: "--color-ghost",
  ghostInverse: "--color-ghost-inverse",
  scrim: "--color-scrim",
};

/**
 * Reads a color token from the live cascade, so it reflects whichever theme
 * is currently active. Falls back to the light literal during SSR.
 */
export function readColor(key: keyof typeof lightColors): string {
  if (typeof window === "undefined") return lightColors[key];
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(CSS_VAR_BY_KEY[key])
    .trim();
  return value || lightColors[key];
}

export const blur = {
  card: 20,
  chrome: 40,
} as const;

export const radius = {
  xs: 6,
  sm: 10,
  md: 16,
  lg: 24,
  xl: 32,
  full: 9999,
} as const;

export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  "3xl": 64,
  "4xl": 96,
  "5xl": 128,
  "6xl": 176,
} as const;

/**
 * Easing curves. `outSoft` is the default for anything interactive —
 * `inertia` is an aggressive exponential-out and only reads well over
 * reveal-length durations (700ms+), never on a hover.
 */
export const easing = {
  outSoft: "cubic-bezier(0.25, 1, 0.5, 1)",
  smooth: "cubic-bezier(0.65, 0, 0.35, 1)",
  inertia: "cubic-bezier(0.16, 1, 0.3, 1)",
  /** GSAP equivalents. */
  outSoftGsap: "power2.out",
  smoothGsap: "power2.inOut",
  inertiaGsap: "expo.out",
} as const;

export const duration = {
  micro: 200,
  interactive: 400,
  layout: 600,
  reveal: 800,
} as const;

/**
 * Motion constants reverse-engineered in assets/design/inspirations/presets/
 * (Buzz Interactive + Koto audits), retimed for this brand's slower,
 * more deliberate register. Feed these into Lenis/GSAP config rather than
 * re-deriving tuning values per component.
 */
export const motion = {
  easeInertia: easing.inertia,
  easeInertiaGsap: easing.inertiaGsap,
  durationInteractiveMs: duration.interactive,

  /** Preset: Fluid Cap Scroll (Lenis config) */
  scroll: {
    lerp: 0.1,
    wheelMultiplier: 1.1,
    touchMultiplier: 1.6,
  },

  /** Preset: Inertia Settle */
  inertiaSettle: {
    minMs: 500,
    maxMs: 800,
  },

  /** Preset: Velocity Fade Blur */
  velocityFadeBlur: {
    thresholdPxPerFrame: 50,
    maxBlurPx: 1.75,
    decayMs: 220,
  },

  /** Preset: Line Rise (default text/row entrance) */
  lineRise: {
    translateYPx: 24,
    staggerMs: 80,
    durationMs: 700,
  },

  /** Preset: Underline Draw */
  underlineDraw: {
    durationMs: 320,
  },

  /** Preset: Magnetic Pull */
  magneticPull: {
    maxDisplacementPx: 11,
  },

  /** Preset: Active Pulse Dot */
  activePulseDot: {
    durationMs: 220,
  },

  /** Preset: Invert Chip */
  invertChip: {
    durationMs: 240,
  },

  /** Preset: Subsurface Type Roll (kinetic-rollover-button) */
  subsurfaceTypeRoll: {
    translateYPx: -60,
    durationMs: 560,
  },

  /**
   * Preset: Direction-Aware Cursor-Origin Radial Fill (cursor-fill-button).
   * Deliberately slow and symmetric: a smooth ease-in-out over ~900ms reads
   * as a considered sweep rather than a snap. `easing.smooth` (not
   * `easing.inertia`) because the fill should accelerate in as well as settle.
   */
  cursorFillButton: {
    expandMs: 900,
    collapseMs: 720,
    expandScale: 2.5,
    ease: easing.smooth,
  },

  /** Preset: Fullscreen Parallax Reveal Footer (curtain) */
  footerCurtain: {
    scrub: 0.8,
    counterOffsetPercent: -15,
  },

  /** Preset: Collapse-to-Pill Header / Roll Reveal Hover */
  nav: {
    rollRevealInMs: 240,
    rollRevealOutMs: 420,
    rollRevealOutDelayMs: 80,
    pillExpandWidthMs: 600,
    pillExpandContentFadeMs: 400,
    pillExpandContentDelayMs: 80,
  },

  /** Preset: Pinned Caption Rail (Koto) */
  captionRail: {
    outgoingMs: 240,
    incomingMs: 520,
    observerThreshold: 0.5,
  },

  /**
   * Header. Retimed from the Koto audit: the source values (167ms hovers,
   * 400ms layout) read as twitchy at this brand's pace, so hovers sit at
   * `duration.micro` and layout tweens at `duration.layout` upward.
   * header-nav-list's collapse distance is intentionally NOT a fixed px:
   * translate by the row's own measured width.
   */
  header: {
    logoPillExpandMs: 900,
    logoPillExpandEase: easing.smooth,
    logoContainerResizeMs: duration.layout,
    logoContainerResizeEase: easing.smooth,
    navCollapseSlideMs: duration.reveal,
    navCollapseSlideEase: easing.outSoft,
    chromeHoverMs: duration.micro,
    dotExplodeOffsetPx: 2,
    /** Hero-state logo emphasis scale, per design-ahgrowth.md. */
    logoHeroScale: 1.24,
    /** Island hover-widen before a click opens the full panel. */
    hoverExpandMs: duration.interactive,
    /** Full-viewport scrim opacity fade when the nav panel opens/closes. */
    scrimFadeMs: duration.interactive,
    /** Clip width the collapsed island's grow-in tweens toward. */
    islandMaxWidthPx: 220,
    /** Page-top footprint — clears the bare mark at its hero scale. */
    islandRestWidthPx: 56,
  },
} as const;
