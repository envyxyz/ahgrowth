/**
 * JS-consumable mirror of the CSS custom properties in src/styles/tokens.css,
 * plus motion constants that only exist as JS values (GSAP/Lenis config has
 * no CSS equivalent). Use this instead of hardcoding hex/px/ms values in
 * components — one fact, one field, same rule content.ts follows for copy.
 *
 * Source of truth for values: assets/design/design-ahgrowth.md (visual) and
 * assets/design/inspirations/presets/*.md (motion). Update both docs first,
 * then mirror the change here.
 */

export const colors = {
  primary: "#e11d48",
  primaryActive: "#b41739",
  onPrimary: "#ffffff",
  secondary: "#1a1a1f",
  ink: "#f4f4f5",
  inkSecondary: "#d4d4d8",
  inkMuted: "#a1a1aa",
  inkFaint: "#71717a",
  canvas: "#09090b",
  canvasSoft: "#0f0f12",
  surface: "#121215",
  surfaceCard: "rgba(18, 18, 21, 0.75)",
  hairline: "rgba(255, 255, 255, 0.08)",
  borderGlass: "rgba(255, 255, 255, 0.14)",
  borderActive: "rgba(255, 255, 255, 0.28)",
  accentRubyGlow: "rgba(225, 29, 72, 0.12)",
  accentRubyBorder: "rgba(225, 29, 72, 0.25)",
  overlayFill: "rgba(255, 255, 255, 0.05)",
  overlayFillHover: "rgba(255, 255, 255, 0.1)",
} as const;

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
} as const;

/**
 * Motion constants reverse-engineered in assets/design/inspirations/presets/
 * (Buzz Interactive + Koto audits). Feed these into Lenis/GSAP config rather
 * than re-deriving tuning values per component.
 */
export const motion = {
  easeInertia: "cubic-bezier(0.16, 1, 0.3, 1)",
  easeInertiaGsap: "power3.out",
  durationInteractiveMs: 280,

  /** Preset: Fluid Cap Scroll (Lenis config) */
  scroll: {
    lerp: 0.135,
    wheelMultiplier: 1.2,
    touchMultiplier: 1.75,
  },

  /** Preset: Inertia Settle */
  inertiaSettle: {
    minMs: 300,
    maxMs: 500,
  },

  /** Preset: Velocity Fade Blur */
  velocityFadeBlur: {
    thresholdPxPerFrame: 50,
    maxBlurPx: 1.75,
    decayMs: 175,
  },

  /** Preset: Line Rise (default text/row entrance) */
  lineRise: {
    translateYPx: 18,
    staggerMs: 50,
    durationMs: 450,
  },

  /** Preset: Underline Draw */
  underlineDraw: {
    durationMs: 225,
  },

  /** Preset: Magnetic Pull */
  magneticPull: {
    maxDisplacementPx: 11,
  },

  /** Preset: Active Pulse Dot */
  activePulseDot: {
    durationMs: 150,
  },

  /** Preset: Invert Chip */
  invertChip: {
    durationMs: 175,
  },

  /** Preset: Subsurface Type Roll (kinetic-rollover-button) */
  subsurfaceTypeRoll: {
    translateYPx: -60,
    durationMs: 425,
  },

  /** Preset: Direction-Aware Cursor-Origin Radial Fill (cursor-fill-button) */
  cursorFillButton: {
    expandMs: 450,
    collapseMs: 350,
    expandScale: 2.5,
  },

  /** Preset: Fullscreen Parallax Reveal Footer (curtain) */
  footerCurtain: {
    scrub: 0.8,
    counterOffsetPercent: -15,
  },

  /** Preset: Collapse-to-Pill Header / Roll Reveal Hover */
  nav: {
    rollRevealInMs: 133,
    rollRevealOutMs: 317,
    rollRevealOutDelayMs: 83,
    pillExpandWidthMs: 400,
    pillExpandContentFadeMs: 283,
    pillExpandContentDelayMs: 50,
  },

  /** Preset: Pinned Caption Rail (Koto) */
  captionRail: {
    outgoingMs: 133,
    incomingMs: 333,
    observerThreshold: 0.5,
  },

  /**
   * Header (Koto-derived, verified against the live DOM — see
   * assets/design/design-ahgrowth.md § Components → Navigation).
   * header-nav-list's collapse distance is intentionally NOT a fixed px:
   * translate by the row's own measured width (translateX(-100%) of its
   * own content box), since AH Growth's 3-item nav is shorter than
   * Koto's 6-item row that the original -255px was sized for.
   */
  header: {
    logoPillExpandMs: 750,
    logoPillExpandEase: "cubic-bezier(0.28, 0, 0, 1)",
    logoContainerResizeMs: 400,
    logoContainerResizeEase: "cubic-bezier(0.65, 0, 0.35, 1)",
    navCollapseSlideMs: 650,
    navCollapseSlideEase: "cubic-bezier(0.36, 0.54, 0, 0.99)",
    chromeHoverMs: 167,
    dotExplodeOffsetPx: 2,
  },
} as const;
