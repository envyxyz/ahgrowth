import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      /* Design spec tiers: Mobile 375-767, Tablet 768-1023, Laptop
         1024-1439, Desktop 1440+. Tailwind's md/lg already match Tablet
         and Laptop; `desktop` adds the container-cap tier. */
      screens: { desktop: "1440px" },
      colors: {
        primary: {
          DEFAULT: "var(--color-primary)",
          hover: "var(--color-primary-hover)",
          ink: "var(--color-primary-ink)",
        },
        "on-primary": "var(--color-on-primary)",
        ink: {
          DEFAULT: "var(--color-ink)",
          secondary: "var(--color-ink-secondary)",
          muted: "var(--color-ink-muted)",
          faint: "var(--color-ink-faint)",
        },
        "on-inverse": {
          DEFAULT: "var(--color-on-inverse)",
          secondary: "var(--color-on-inverse-secondary)",
          muted: "var(--color-on-inverse-muted)",
          faint: "var(--color-on-inverse-faint)",
        },
        canvas: "var(--color-canvas)",
        chrome: {
          DEFAULT: "var(--color-chrome)",
        },
        "on-chrome": {
          DEFAULT: "var(--color-on-chrome)",
          muted: "var(--color-on-chrome-muted)",
        },
        /* Opaque light plate over full-bleed media. Light in both palettes. */
        plate: "var(--color-plate)",
        "on-plate": {
          DEFAULT: "var(--color-on-plate)",
          muted: "var(--color-on-plate-muted)",
        },
        surface: {
          DEFAULT: "var(--color-surface)",
          sunken: "var(--color-surface-sunken)",
        },
        inverse: {
          DEFAULT: "var(--color-inverse)",
          soft: "var(--color-inverse-soft)",
        },
        /* Dividers only. Separation is normally carried by a surface step —
           the reference set is almost entirely border-free. */
        hairline: {
          DEFAULT: "var(--color-hairline)",
          inverse: "var(--color-hairline-inverse)",
        },
        overlay: {
          fill: "var(--color-overlay-fill)",
          "fill-hover": "var(--color-overlay-fill-hover)",
          "fill-inverse": "var(--color-overlay-fill-inverse)",
          "fill-inverse-hover": "var(--color-overlay-fill-inverse-hover)",
        },
        accent: {
          tint: "var(--color-accent-tint)",
        },
        ghost: {
          DEFAULT: "var(--color-ghost)",
          inverse: "var(--color-ghost-inverse)",
        },
        scrim: {
          DEFAULT: "var(--color-scrim)",
          "media-strong": "var(--color-scrim-media-strong)",
          "media-mid": "var(--color-scrim-media-mid)",
          "media-soft": "var(--color-scrim-media-soft)",
        },
        focus: {
          DEFAULT: "var(--color-focus-ring)",
          inverse: "var(--color-focus-ring-inverse)",
        },
      },
      borderRadius: {
        xxs: "var(--radius-xxs)",
        xs: "var(--radius-xs)",
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        full: "var(--radius-full)",
      },
      spacing: {
        xxs: "var(--space-xxs)",
        xs: "var(--space-xs)",
        sm: "var(--space-sm)",
        md: "var(--space-md)",
        lg: "var(--space-lg)",
        xl: "var(--space-xl)",
        xxl: "var(--space-xxl)",
        "3xl": "var(--space-3xl)",
        "4xl": "var(--space-4xl)",
        "5xl": "var(--space-5xl)",
        "6xl": "var(--space-6xl)",
        inset: "var(--layout-inset)",
        "section-y": "var(--layout-section-y)",
        card: "var(--layout-card-p)",
        "toggle-clearance": "var(--layout-toggle-clearance)",
        "hero-top": "var(--layout-hero-pad-top)",
        "hero-bottom": "var(--layout-hero-pad-bottom)",
        dot: "var(--size-dot)",
      },
      maxWidth: {
        container: "var(--layout-container)",
      },
      boxShadow: {
        "elevation-1": "var(--shadow-elevation-1)",
        "elevation-2": "var(--shadow-elevation-2)",
      },
      backdropBlur: {
        card: "var(--blur-card)",
        chrome: "var(--blur-chrome)",
      },
      transitionTimingFunction: {
        "out-soft": "var(--ease-out-soft)",
        smooth: "var(--ease-smooth)",
        inertia: "var(--ease-inertia)",
      },
      transitionDuration: {
        micro: "var(--duration-micro)",
        interactive: "var(--duration-interactive)",
        layout: "var(--duration-layout)",
        reveal: "var(--duration-reveal)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      fontSize: {
        ghost: ["var(--text-ghost)", { lineHeight: "var(--leading-ghost)", letterSpacing: "var(--tracking-ghost)" }],
        "display-xl": [
          "var(--text-display-xl)",
          { lineHeight: "var(--leading-display-xl)", letterSpacing: "var(--tracking-display-xl)" },
        ],
        "display-lg": [
          "var(--text-display-lg)",
          { lineHeight: "var(--leading-display-lg)", letterSpacing: "var(--tracking-display-lg)" },
        ],
        "display-md": [
          "var(--text-display-md)",
          { lineHeight: "var(--leading-display-md)", letterSpacing: "var(--tracking-display-md)" },
        ],
        stat: ["var(--text-stat)", { lineHeight: "var(--leading-stat)", letterSpacing: "var(--tracking-stat)" }],
        "heading-1": [
          "var(--text-heading-1)",
          { lineHeight: "var(--leading-heading-1)", letterSpacing: "var(--tracking-heading-1)" },
        ],
        "heading-2": [
          "var(--text-heading-2)",
          { lineHeight: "var(--leading-heading-2)", letterSpacing: "var(--tracking-heading-2)" },
        ],
        "heading-3": [
          "var(--text-heading-3)",
          { lineHeight: "var(--leading-heading-3)", letterSpacing: "var(--tracking-heading-3)" },
        ],
        title: ["var(--text-title)", { lineHeight: "var(--leading-title)", letterSpacing: "var(--tracking-title)" }],
        "body-lg": [
          "var(--text-body-lg)",
          { lineHeight: "var(--leading-body-lg)", letterSpacing: "var(--tracking-body-lg)" },
        ],
        "body-md": [
          "var(--text-body-md)",
          { lineHeight: "var(--leading-body-md)", letterSpacing: "var(--tracking-body-md)" },
        ],
        "body-sm": [
          "var(--text-body-sm)",
          { lineHeight: "var(--leading-body-sm)", letterSpacing: "var(--tracking-body-sm)" },
        ],
        button: ["var(--text-button)", { lineHeight: "var(--leading-button)", letterSpacing: "var(--tracking-button)" }],
        caption: [
          "var(--text-caption)",
          { lineHeight: "var(--leading-caption)", letterSpacing: "var(--tracking-caption)" },
        ],
        eyebrow: [
          "var(--text-eyebrow)",
          { lineHeight: "var(--leading-eyebrow)", letterSpacing: "var(--tracking-eyebrow)" },
        ],
      },
    },
  },
  plugins: [],
};

export default config;
