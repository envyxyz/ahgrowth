---
version: alpha
name: AH Growth
description: A spacious, largely border-free monochrome system on an off-white canvas, punctuated by near-black contrast blocks and a single vermilion accent. Type is Geist throughout with Geist Mono reserved for small technical micro-labels, and the brand wordmark is ghosted at low contrast across the hero and footer. Light and dark are one system: every structural token is shared, only color values swap, and separation is normally carried by a filled surface step, with dividers kept for genuine structure rather than sprayed across every element.

themes:
  # Structure is identical across themes. Only the color block below differs.
  resolution: "system preference by default; [data-theme] on <html> overrides, set by the bottom-right toggle and persisted to localStorage"

colors:
  light:
    primary: "#ea4127"
    primary-hover: "#d3341c"
    primary-ink: "#c4331c"
    on-primary: "#ffffff"
    ink: "#111110"
    ink-secondary: "#3a3a37"
    ink-muted: "#6e6e69"
    ink-faint: "#a3a39d"
    on-inverse: "#f7f7f5"
    on-inverse-secondary: "#d0d0cb"
    on-inverse-muted: "#a8a8a2"
    on-inverse-faint: "#74746f"
    canvas: "#f2f1ef"
    surface: "#ffffff"
    surface-sunken: "#e8e7e4"
    inverse: "#111110"
    inverse-soft: "#1c1c1a"
    chrome: "#111110"
    on-chrome: "#f7f7f5"
    on-chrome-muted: "#a8a8a2"
    hairline: "rgba(17, 17, 16, 0.10)"
    hairline-inverse: "rgba(255, 255, 255, 0.12)"
    overlay-fill: "rgba(17, 17, 16, 0.06)"
    overlay-fill-hover: "rgba(17, 17, 16, 0.11)"
    overlay-fill-inverse: "rgba(255, 255, 255, 0.10)"
    overlay-fill-inverse-hover: "rgba(255, 255, 255, 0.16)"
    accent-tint: "rgba(234, 65, 39, 0.10)"
    ghost: "rgba(17, 17, 16, 0.05)"
    ghost-inverse: "rgba(255, 255, 255, 0.055)"
    scrim: "rgba(242, 241, 239, 0.72)"
  dark:
    primary: "#ea4127"
    primary-hover: "#f2583f"
    primary-ink: "#ff6a4d"
    on-primary: "#ffffff"
    ink: "#f5f4f2"
    ink-secondary: "#c9c8c4"
    ink-muted: "#93928d"
    ink-faint: "#66655f"
    on-inverse: "#f5f4f2"
    on-inverse-secondary: "#c9c8c4"
    on-inverse-muted: "#93928d"
    on-inverse-faint: "#66655f"
    canvas: "#0a0a09"
    surface: "#161615"
    surface-sunken: "#050504"
    inverse: "#161615"
    inverse-soft: "#1f1f1d"
    chrome: "#262625"
    on-chrome: "#f5f4f2"
    on-chrome-muted: "#93928d"
    hairline: "rgba(255, 255, 255, 0.08)"
    hairline-inverse: "rgba(255, 255, 255, 0.08)"
    overlay-fill: "rgba(255, 255, 255, 0.07)"
    overlay-fill-hover: "rgba(255, 255, 255, 0.13)"
    overlay-fill-inverse: "rgba(255, 255, 255, 0.07)"
    overlay-fill-inverse-hover: "rgba(255, 255, 255, 0.13)"
    accent-tint: "rgba(234, 65, 39, 0.16)"
    ghost: "rgba(255, 255, 255, 0.045)"
    ghost-inverse: "rgba(255, 255, 255, 0.045)"
    scrim: "rgba(10, 10, 9, 0.72)"

typography:
  ghost:
    fontFamily: "Geist"
    fontSize: "clamp(5rem, 18vw, 16rem)"
    fontWeight: 700
    lineHeight: 0.85
    letterSpacing: "-0.04em"
  display-xl:
    fontFamily: "Geist"
    fontSize: "clamp(3.25rem, 6.4vw, 5.5rem)"
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: "-0.03em"
  display-lg:
    fontFamily: "Geist"
    fontSize: "clamp(2.5rem, 4.8vw, 4rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  display-md:
    fontFamily: "Geist"
    fontSize: "clamp(2rem, 3.6vw, 2.75rem)"
    fontWeight: 600
    lineHeight: 1.14
    letterSpacing: "-0.02em"
  stat:
    fontFamily: "Geist"
    fontSize: "clamp(2.5rem, 5vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.03em"
  heading-1:
    fontFamily: "Geist"
    fontSize: "clamp(1.75rem, 2.6vw, 2.25rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.015em"
  heading-2:
    fontFamily: "Geist"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.01em"
  heading-3:
    fontFamily: "Geist"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "-0.005em"
  title:
    fontFamily: "Geist"
    fontSize: "1.0625rem"
    fontWeight: 500
    lineHeight: 1.45
    letterSpacing: "0em"
  body-lg:
    fontFamily: "Geist"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0em"
  body-md:
    fontFamily: "Geist"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "0em"
  body-sm:
    fontFamily: "Geist"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0em"
  button:
    fontFamily: "Geist"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.005em"
  caption:
    fontFamily: "Geist"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: "0em"
  eyebrow:
    fontFamily: "Geist Mono"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.08em"
    textTransform: "uppercase"

rounded:
  xs: "6px"
  sm: "10px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  full: "9999px"

spacing:
  xxs: "4px"
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  xxl: "48px"
  3xl: "64px"
  4xl: "96px"
  5xl: "128px"
  6xl: "176px"

layout:
  container: "1440px"
  inset: "clamp(20px, 4vw, 56px)"
  section-y: "clamp(96px, 11vw, 180px)"
  card-p: "clamp(28px, 3vw, 48px)"

blur:
  card: "20px"
  chrome: "40px"

motion:
  ease-out-soft: "cubic-bezier(0.25, 1, 0.5, 1)"
  ease-smooth: "cubic-bezier(0.65, 0, 0.35, 1)"
  ease-inertia: "cubic-bezier(0.16, 1, 0.3, 1)"
  duration-micro: "200ms"
  duration-interactive: "400ms"
  duration-layout: "600ms"
  duration-reveal: "800ms"
  duration-theme: "320ms"

components:
  section:
    description: "Every major section's shell. Carries the page inset, vertical rhythm and container cap."
    paddingX: "{layout.inset}"
    paddingY: "{layout.section-y}"
    maxWidth: "{layout.container}"
    tone: "canvas | surface | inverse"
  eyebrow:
    description: "Vermilion square + mono micro-label. The main place the accent appears on a light surface."
    markerColor: "{colors.primary}"
    markerSize: "8px"
    textColor: "{colors.ink-muted}"
    typography: "{typography.eyebrow}"
    gap: "{spacing.xs}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    hoverBackground: "{colors.primary-hover}"
    rounded: "{rounded.full}"
    height: "48px"
    paddingX: "{spacing.xl}"
    typography: "{typography.button}"
  button-secondary:
    backgroundColor: "{colors.overlay-fill}"
    hoverBackground: "{colors.overlay-fill-hover}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    height: "48px"
    paddingX: "{spacing.xl}"
    typography: "{typography.button}"
  button-inverse:
    description: "Light pill for use ON the dark contrast block, which stays dark in both themes."
    backgroundColor: "{colors.on-inverse}"
    hoverBackground: "{colors.on-inverse-secondary}"
    textColor: "{colors.inverse}"
    rounded: "{rounded.full}"
    height: "48px"
    paddingX: "{spacing.xl}"
    typography: "{typography.button}"
  cursor-fill-button:
    description: "Filled circle expands from the cursor's entry point, inverting the label."
    backgroundColor: "{colors.overlay-fill}"
    fillColor: "{colors.ink}"
    fillTextColor: "{colors.surface}"
    rounded: "{rounded.full}"
    height: "48px"
    paddingX: "{spacing.xl}"
    typography: "{typography.button}"
  hero-card:
    description: "Near-black block inset from the page edge, with the wordmark ghosted across its bottom."
    backgroundColor: "{colors.inverse}"
    textColor: "{colors.on-inverse}"
    rounded: "{rounded.lg}"
    inset: "{layout.inset}"
    paddingX: "{layout.card-p}"
    minHeight: "clamp(560px, 82vh, 880px)"
  ghost-wordmark:
    description: "Brand wordmark ghosted into the surface behind hero/footer content."
    color: "{colors.ghost-inverse}"
    typography: "{typography.ghost}"
  card:
    description: "Filled panel. No border — the surface step off the canvas is the separation."
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: "{layout.card-p}"
  card-on-inverse:
    backgroundColor: "{colors.inverse-soft}"
    textColor: "{colors.on-inverse}"
    rounded: "{rounded.lg}"
    padding: "{layout.card-p}"
  stat:
    description: "Oversized metric with its supporting line. Rule-free; spacing carries the grouping."
    valueTypography: "{typography.stat}"
    valueColor: "{colors.ink}"
    labelTypography: "{typography.body-sm}"
    labelColor: "{colors.ink-muted}"
    gap: "{spacing.lg}"
  header-island:
    description: "Logo island. Transparent at page-top over the hero card; a floating chrome pill once scrolled."
    restBackground: "transparent"
    scrolledBackground: "{colors.chrome}"
    textColor: "{colors.on-chrome}"
    rounded: "{rounded.full}"
    blur: "{blur.chrome}"
    shadow: "{shadow.elevation-1}"
  header-chrome-button:
    backgroundColor: "{colors.overlay-fill}"
    hoverBackground: "{colors.overlay-fill-hover}"
    rounded: "{rounded.full}"
    height: "44px"
    paddingX: "{spacing.lg}"
    typography: "{typography.eyebrow}"
    blur: "{blur.chrome}"
  theme-toggle:
    description: "Fixed bottom-right light/dark switch. Sun/moon morph, no border."
    backgroundColor: "{colors.overlay-fill}"
    hoverBackground: "{colors.overlay-fill-hover}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    size: "48px"
    offset: "{spacing.lg}"
  footer:
    backgroundColor: "{colors.inverse}"
    textColor: "{colors.on-inverse}"
    paddingX: "{layout.inset}"
    typography: "{typography.body-sm}"
---

## Overview

AH Growth is a growth agency for Pakistani local businesses, widening into SaaS. The site reads confident and creative, never templated. The page sits on a soft off-white canvas (`{colors.canvas}`), and the drama comes from full-bleed near-black blocks (`{colors.inverse}`) dropped deliberately into that light field: the hero, the capabilities section, the CTA outro and footer. The accent is a single vermilion (`{colors.primary}`) used as small squares, badges and one filled CTA per view, never as a large wash.

**Borders are structural, not decorative.** Cards, panels and buttons are never outlined — they separate by fill, a white card on off-white or an elevated dark card on near-black. Dividers (`{colors.hairline}`) are kept where they carry real structure, exactly as the references use them: the rule under each stat figure, the footer meta rule, the separators in the nav list. The rule is restraint, not abstinence: if a line isn't doing structural work, it shouldn't be there.

Type is Geist across every functional role, with Geist Mono reserved strictly for small technical micro-labels — eyebrows, section indices, the clock readout. Buttons are sentence case, never uppercase. Behind the hero and footer the brand wordmark is set enormous and ghosted almost into the surface (`{typography.ghost}` at `{colors.ghost-inverse}`), which is the one signature typographic move.

Light and dark are one system, not two designs. Every structural token — spacing, radius, type, motion — is shared; only color values swap. The theme follows the device preference by default and can be overridden by a fixed bottom-right toggle that persists the choice.

**Key Characteristics:**
- Off-white canvas (`{colors.canvas}`) with deliberate near-black contrast blocks (`{colors.inverse}`)
- Cards and buttons separate by fill, not outline; dividers reserved for real structure
- Very spacious rhythm — `{layout.section-y}` between sections, `{layout.card-p}` inside cards
- One vermilion accent (`{colors.primary}`), never a large flat wash
- Geist everywhere; Geist Mono only for `{typography.eyebrow}` micro-labels
- Sentence-case pill buttons at `{rounded.full}`, 48px tall, `{spacing.xl}` horizontal padding
- Ghosted giant wordmark (`{typography.ghost}`) behind hero and footer
- Light/dark share every non-color token; the theme cross-fades over `{motion.duration-theme}`

## Colors

### Brand & Accent
- **Primary** `{colors.primary}` — `#ea4127` in both themes. Fills, eyebrow squares, badges, one CTA per view.
- **Primary Hover** `{colors.primary-hover}` — darkens on light (`#d3341c`), lightens on dark (`#f2583f`), so the hover always moves away from the surface.
- **Primary Ink** `{colors.primary-ink}` — the accent used as *text*. Darker on light (`#c4331c`), lighter on dark (`#ff6a4d`), because the raw accent fails contrast as small text. Never use `{colors.primary}` for body-size text.
- **On Primary** `{colors.on-primary}` — `#ffffff`, text on a primary fill.

### Surface
- **Canvas** `{colors.canvas}` — the page. Off-white `#f2f1ef` / near-black `#0a0a09`.
- **Surface** `{colors.surface}` — cards and panels raised off the canvas.
- **Surface Sunken** `{colors.surface-sunken}` — wells and inactive states.
- **Inverse** `{colors.inverse}` — the deliberate contrast block. Stays dark in *both* themes; on the dark canvas it reads as an elevated step rather than flipping to light.
- **Inverse Soft** `{colors.inverse-soft}` — a card sitting on an inverse block.
- **Chrome** `{colors.chrome}` — floating controls that pass over arbitrary sections (the scrolled header island). Defined per theme specifically so the control always separates from whatever is behind it; a single surface value cannot guarantee that.

### Text
- **Ink** `{colors.ink}` — headlines and primary text.
- **Ink Secondary** `{colors.ink-secondary}` — emphasized body.
- **Ink Muted** `{colors.ink-muted}` — standard body copy.
- **Ink Faint** `{colors.ink-faint}` — captions, placeholders, the muted half of a two-tone statement.
- **On Inverse** `{colors.on-inverse}` (+ `-secondary`, `-muted`, `-faint`) — the same four steps for text on an inverse block. Light values in *both* themes, since the block is dark in both.
- **On Chrome** `{colors.on-chrome}` (+ `-muted`) — text inside a floating chrome control.

### Semantic
No dedicated success/warning/error palette yet. Validation and status states reuse `{colors.primary-ink}` for attention and `{colors.ink}` for confirmation until a real semantic set is requested. Supporting non-semantic tokens: `{colors.overlay-fill}` / `-hover` (neutral chrome fills), `{colors.accent-tint}` (ambient accent bleed), `{colors.ghost}` / `{colors.ghost-inverse}` (the giant wordmark), `{colors.scrim}` (full-viewport overlay behind the nav panel).

## Typography

### Font Family
**Geist** carries every functional role, loaded variable so `{typography.stat}` and `{typography.ghost}` can sit at 700 in the same family as body copy. Fallback: `"Geist", "Inter", system-ui, sans-serif`.

**Geist Mono** is the micro-label face *only* — `{typography.eyebrow}`, section indices, meta rows, the clock. Fallback: `"Geist Mono", ui-monospace, "SFMono-Regular", monospace`. Never set body copy or headlines in it.

### Hierarchy
| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| ghost | clamp(5rem, 18vw, 16rem) | 700 | 0.85 | -0.04em | Ghosted wordmark behind hero/footer |
| display-xl | clamp(3.25rem, 6.4vw, 5.5rem) | 600 | 1.04 | -0.03em | Hero headline |
| display-lg | clamp(2.5rem, 4.8vw, 4rem) | 600 | 1.08 | -0.025em | Section headlines |
| display-md | clamp(2rem, 3.6vw, 2.75rem) | 600 | 1.14 | -0.02em | Sub-section / statement lines |
| stat | clamp(2.5rem, 5vw, 3.5rem) | 700 | 1 | -0.03em | Oversized metric numbers |
| heading-1 | clamp(1.75rem, 2.6vw, 2.25rem) | 600 | 1.2 | -0.015em | Page-level subheads |
| heading-2 | 1.5rem | 600 | 1.25 | -0.01em | Section subheads |
| heading-3 | 1.25rem | 600 | 1.35 | -0.005em | Card titles |
| title | 1.0625rem | 500 | 1.45 | 0 | List/component titles |
| body-lg | 1.125rem | 400 | 1.6 | 0 | Large statement paragraphs |
| body-md | 1rem | 400 | 1.65 | 0 | Default paragraph copy |
| body-sm | 0.875rem | 400 | 1.6 | 0 | Secondary/dense copy |
| button | 0.875rem | 500 | 1 | -0.005em | CTA labels (sentence case) |
| caption | 0.8125rem | 400 | 1.45 | 0 | Captions, meta |
| eyebrow | 0.75rem | 500 | 1.2 | +0.08em | Mono micro-label, uppercase |

### Principles
Tracking tightens as size grows (to -0.04em at `{typography.ghost}`) so large type feels deliberate; body sits at 0 for readability. Display sizes are all `clamp()`, so the scale is fluid rather than stepping at breakpoints. Buttons are **sentence case** — "Start a project", not "START A PROJECT" — matching every button across the reference set; the only uppercase in the system is `{typography.eyebrow}`.

### Note on Font Substitutes
Geist and Geist Mono are open Google Fonts, loaded via `next/font/google` in `src/lib/fonts.ts`. If either is unavailable, substitute Inter / IBM Plex Mono and keep the weight and tracking values unchanged.

## Layout

### Spacing System
`{spacing.xxs}` 4 · `{spacing.xs}` 8 · `{spacing.sm}` 12 · `{spacing.md}` 16 · `{spacing.lg}` 24 · `{spacing.xl}` 32 · `{spacing.xxl}` 48 · `{spacing.3xl}` 64 · `{spacing.4xl}` 96 · `{spacing.5xl}` 128 · `{spacing.6xl}` 176

The scale runs well past the usual 48px ceiling on purpose. This system is spacious; reaching for `{spacing.4xl}`–`{spacing.6xl}` between blocks inside a section is normal, not excessive.

### Grid & Container
Content caps at `{layout.container}` (1440px) and centers. Page-edge inset is `{layout.inset}`, which also sets the gap around the inset hero card, so the card's edge and every section's text align to the same rail. Card interiors use `{layout.card-p}`.

### Whitespace Philosophy
Generosity is the point. Sections are separated by `{layout.section-y}` (96–180px fluid), and dense multi-column text is treated as an anti-pattern. If a layout feels tight, the fix is more space, not a smaller type size.

### Responsive Strategy
| Name | Width | Key Changes |
|---|---|---|
| Mobile | 375–767px | Single column; header collapses to logo island + Menu chrome button; hero buttons wrap |
| Tablet | 768–1023px | 2-column grids; nav labels appear in the header row |
| Laptop | 1024–1439px | 3-column grids; hero subhead and buttons sit on one row; clock readout appears |
| Desktop | 1440px+ | Container caps and centers; `clamp()` type and inset reach their ceilings |

**Touch Targets:** interactive pills hold a 44px minimum height; the theme toggle is 48px.

**Collapsing Strategy:** the header's action cluster fades out on scroll past the hero while the logo island grows into a floating chrome pill. Multi-column grids collapse to one column below tablet. Any pinned/scroll-scrubbed section falls back to normal vertical stacking below laptop and whenever `prefers-reduced-motion: reduce` is set.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| Level 0 — Flat | No shadow, no border. A surface step only (`{colors.surface}` on `{colors.canvas}`) | Cards, panels, most of the page |
| Level 1 — Soft | `{shadow.elevation-1}` reinforcing the surface step | Floating chrome (header island, theme toggle) |
| Level 2 — Elevated | `{shadow.elevation-2}` | Open nav panel, modals |

Depth is carried by **color, not outline**. A card is legible because it is a different fill from the canvas, and shadow only reinforces that when an element genuinely floats over arbitrary content. Shadows are near-invisible on the dark palette by design, which is why floating chrome uses `{colors.chrome}` rather than relying on shadow for separation.

Two blur tiers back the glass chrome: `{blur.card}` (20px) for panels and `{blur.chrome}` (40px) for small high-frequency controls.

## Shapes

### Border Radius Scale
| Token | Value | Use |
|---|---|---|
| xs | 6px | Inline chips, small markers |
| sm | 10px | Dense controls |
| md | 16px | Open nav panel |
| lg | 24px | Hero card, section cards, media tiles |
| xl | 32px | Large containers |
| full | 9999px | All pill buttons, header island, theme toggle |

### Photography Geometry
Images sit full-bleed inside `{rounded.lg}` frames with no border, or as isolated cutouts with no frame at all floating over `{typography.ghost}`. Cutouts never take a drop shadow.

## Components

**Hover states are documented per component below. Chrome hovers use `{motion.ease-out-soft}` at `{motion.duration-micro}`; CTA buttons use the slower `{motion.ease-smooth}` at `{motion.duration-layout}` and above.**

### Navigation
**`header-island`** — at page-top it is fully transparent, sitting on the hero card with the mark at 1.24x and no chrome. Past the hero it tweens to a `{colors.chrome}` pill at `{rounded.full}` with `{blur.chrome}` and `{shadow.elevation-1}`, the mark settling to 1x and the section label fading in. Hovering widens it; clicking expands its height into the nav panel. `{colors.chrome}` is theme-specific precisely so this pill always separates from whatever section is scrolling behind it.

**`header-chrome-button`** — borderless `{colors.overlay-fill}` pill for the Menu trigger and 4-dot widget, `{blur.chrome}`, hovering to `{colors.overlay-fill-hover}`. Takes an `inverse` tone when sitting on a dark block.

**`theme-toggle`** — fixed `{spacing.lg}` from the bottom-right corner, 48px, `{rounded.full}`, `{colors.overlay-fill}`. A single SVG morphs sun to moon over `{motion.duration-interactive}`. Any page content in that corner must reserve 72px of clearance.

### Buttons
**`button-primary`** — `{colors.primary}` fill, `{colors.on-primary}` label, `{rounded.full}`, 48px tall, `{spacing.xl}` horizontal. Hover transitions on `{motion.ease-smooth}` at `{motion.duration-layout}`, matching the CTA's unhurried feel. One per view.
**`button-secondary`** — `{colors.overlay-fill}`, no border, hovering to `{colors.overlay-fill-hover}`.
**`button-inverse`** — the light pill used *on* the dark contrast block. Backed by `{colors.on-inverse}` (a light value in both themes) rather than `{colors.surface}`, which would vanish against the dark card in the dark palette.
**`cursor-fill-button`** — `{colors.ink}` circle expands from the cursor's entry point over 900ms (720ms to collapse) on `{motion.ease-smooth}`, inverting the label as it sweeps. The ease is deliberately symmetric ease-in-out, not `{motion.ease-inertia}`: the fill should accelerate in as well as settle, and the long duration is what makes it read as considered rather than snappy. Reduced motion falls back to an opacity change.

### Cards & Containers
**`section`** — the shell every section routes through: `{layout.inset}` horizontal, `{layout.section-y}` vertical, capped at `{layout.container}`. Takes a `canvas`, `surface` or `inverse` tone.
**`card`** — `{colors.surface}` fill, `{rounded.lg}`, `{layout.card-p}` padding, **no border**.
**`card-on-inverse`** — `{colors.inverse-soft}` on a dark block, same geometry.
**`hero-card`** — `{colors.inverse}` block inset `{layout.inset}` from the page edge, `{rounded.lg}`, min-height `clamp(560px, 82vh, 880px)`, content bottom-aligned with bottom padding reserved to clear the ghost wordmark.
**`stat`** — `{typography.stat}` figure over a `{typography.body-sm}` supporting line, separated by `{spacing.lg}` of space rather than a rule.

### Inputs & Forms
**`eyebrow`** — an 8px `{colors.primary}` square at `{rounded.xs}` followed by a `{typography.eyebrow}` label, `{spacing.xs}` apart. Sits above nearly every section and is the main accent sighting on a light surface. Takes an `inverse` tone on dark blocks.

### Signature Components
**`ghost-wordmark`** — the brand wordmark at `{typography.ghost}` in `{colors.ghost-inverse}`, anchored to the bottom edge of the hero card and the footer and clipped by them. It sits *behind* content, which reserves bottom padding to clear it. Ghosted and filled, never a stroke outline.

### Examples (illustrative)
**`ex-pricing-tier`** — `{colors.surface}`, `{rounded.lg}`, `{layout.card-p}`, no border.
**`ex-pricing-tier-featured`** — polarity-flipped: `{colors.inverse}` fill, `{colors.on-inverse}` text.
**`ex-modal-card`** — `{colors.surface}`, `{rounded.md}`, `{shadow.elevation-2}`.
**`ex-toast`** — `{colors.chrome}` fill, `{colors.on-chrome}` text, `{rounded.full}`, `{typography.body-sm}`.
**`ex-empty-state`** — `{colors.surface}` panel, `{layout.card-p}`, `{typography.caption}` in `{colors.ink-faint}`.
**`ex-data-row`** — `{typography.eyebrow}` header in `{colors.ink-muted}`, `{typography.body-sm}` body, rows separated by `{spacing.lg}` of space (a `{colors.hairline}` divider only if the density genuinely demands it).

## Do's and Don'ts

**Do:**
- Separate cards and panels with a filled surface step (`{colors.surface}` on `{colors.canvas}`) rather than an outline.
- Keep the page spacious: `{layout.section-y}` between sections, `{layout.card-p}` inside cards.
- Use `{colors.primary}` for eyebrow squares, badges, and one CTA per view.
- Use `{colors.primary-ink}` whenever the accent is small text, so it holds contrast in both themes.
- Set every button in sentence case at `{typography.button}`.
- Reserve `{typography.eyebrow}` (Geist Mono) for micro-labels only.
- Keep light and dark structurally identical — change color values, never spacing or type.
- Give `{typography.ghost}` room: content over it reserves bottom padding so the two never collide.

**Don't:**
- Don't outline cards, panels or buttons — separate them by fill. Keep dividers for structure (stat rules, footer meta, nav list) and nothing more.
- Don't use `{colors.primary}` as a large flat wash or as small body text.
- Don't set body copy or headlines in Geist Mono.
- Don't uppercase button labels.
- Don't use `{colors.surface}` for anything sitting on a dark block — it collapses into `{colors.inverse}` in the dark palette. Use `{colors.on-inverse}` or `{colors.inverse-soft}`.
- Don't rely on shadow for separation on the dark palette; use `{colors.chrome}` for floating controls.
- Don't apply `{motion.ease-inertia}` to a hover — it is an aggressive exponential-out that only reads well at reveal-length durations (700ms+).
- Don't place page content in the bottom-right 72px without clearing the fixed `theme-toggle`.
