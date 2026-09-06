import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--color-primary)",
          active: "var(--color-primary-active)",
        },
        "on-primary": "var(--color-on-primary)",
        secondary: "var(--color-secondary)",
        ink: {
          DEFAULT: "var(--color-ink)",
          secondary: "var(--color-ink-secondary)",
          muted: "var(--color-ink-muted)",
          faint: "var(--color-ink-faint)",
        },
        canvas: {
          DEFAULT: "var(--color-canvas)",
          soft: "var(--color-canvas-soft)",
        },
        surface: {
          DEFAULT: "var(--color-surface)",
          card: "var(--color-surface-card)",
        },
        hairline: "var(--color-hairline)",
        "border-glass": "var(--color-border-glass)",
        "border-active": "var(--color-border-active)",
        accent: {
          "ruby-glow": "var(--color-accent-ruby-glow)",
          "ruby-border": "var(--color-accent-ruby-border)",
        },
        overlay: {
          fill: "var(--color-overlay-fill)",
          "fill-hover": "var(--color-overlay-fill-hover)",
        },
      },
      backdropBlur: {
        card: "var(--blur-card)",
        chrome: "var(--blur-chrome)",
      },
      borderRadius: {
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
      },
      boxShadow: {
        "elevation-1": "var(--shadow-elevation-1)",
        "elevation-2": "var(--shadow-elevation-2)",
      },
      transitionTimingFunction: {
        inertia: "var(--ease-inertia)",
      },
      transitionDuration: {
        interactive: "var(--duration-interactive)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        signature: ["var(--font-signature)"],
      },
      fontSize: {
        "display-lg": [
          "var(--text-display-lg)",
          { lineHeight: "var(--leading-display-lg)", letterSpacing: "var(--tracking-display-lg)" },
        ],
        "display-md": [
          "var(--text-display-md)",
          { lineHeight: "var(--leading-display-md)", letterSpacing: "var(--tracking-display-md)" },
        ],
        "display-outline": [
          "var(--text-display-outline)",
          { lineHeight: "var(--leading-display-outline)", letterSpacing: "var(--tracking-display-outline)" },
        ],
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
