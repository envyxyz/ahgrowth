---
version: alpha
name: AH Growth
description: AH Growth lives on an obsidian canvas ({colors.canvas}) that stays almost entirely monochrome, letting a single ruby accent ({colors.primary}) do the emotional signaling instead of decorating the whole page. Type is the loudest visual device — Bricolage Grotesque carries a tight, negative-tracked hierarchy from headline down to caption, while an oversized outlined Boldonse word ({typography.display-outline}) sits behind key sections as the brand's one unmistakable signature. Surfaces are frosted glass over near-black rather than flat cards, so depth reads as focus and energy, not soft comfort — confident and deliberately not another generic corporate agency.

colors:
  primary: "#e11d48"
  primary-active: "#b41739"
  on-primary: "#ffffff"
  secondary: "#1a1a1f"
  ink: "#f4f4f5"
  ink-secondary: "#d4d4d8"
  ink-muted: "#a1a1aa"
  ink-faint: "#71717a"
  canvas: "#09090b"
  canvas-soft: "#0f0f12"
  surface: "#121215"
  surface-card: "rgba(18, 18, 21, 0.75)"
  hairline: "rgba(255, 255, 255, 0.08)"
  border-glass: "rgba(255, 255, 255, 0.14)"
  border-active: "rgba(255, 255, 255, 0.28)"
  accent-ruby-glow: "rgba(225, 29, 72, 0.12)"
  accent-ruby-border: "rgba(225, 29, 72, 0.25)"
  overlay-fill: "rgba(255, 255, 255, 0.05)"
  overlay-fill-hover: "rgba(255, 255, 255, 0.1)"

typography:
  display-lg:
    fontFamily: "Bricolage Grotesque"
    fontSize: "72px"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-2px"
  display-md:
    fontFamily: "Bricolage Grotesque"
    fontSize: "56px"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-1.5px"
  display-outline:
    fontFamily: "Boldonse"
    fontSize: "clamp(4rem, 12vw, 9rem)"
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: "-2px"
  heading-1:
    fontFamily: "Bricolage Grotesque"
    fontSize: "40px"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-1px"
  heading-2:
    fontFamily: "Bricolage Grotesque"
    fontSize: "28px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.5px"
  heading-3:
    fontFamily: "Bricolage Grotesque"
    fontSize: "20px"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.1px"
  title:
    fontFamily: "Bricolage Grotesque"
    fontSize: "18px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0px"
  body-md:
    fontFamily: "Bricolage Grotesque"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0px"
  body-sm:
    fontFamily: "Bricolage Grotesque"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "0px"
  button:
    fontFamily: "Bricolage Grotesque"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "1.5px"
  caption:
    fontFamily: "Bricolage Grotesque"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0px"
  eyebrow:
    fontFamily: "Bricolage Grotesque"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.4px"

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

blur:
  card: "20px"
  chrome: "40px"

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
    padding: "{spacing.sm} {spacing.lg}"
    typography: "{typography.button}"
  button-primary-pressed:
    backgroundColor: "{colors.primary-active}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
    padding: "{spacing.sm} {spacing.lg}"
    typography: "{typography.button}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    borderColor: "{colors.hairline}"
    rounded: "{rounded.full}"
    padding: "{spacing.sm} {spacing.lg}"
    typography: "{typography.button}"
    hoverBackground: "{colors.ink}"
    hoverTextColor: "{colors.canvas}"
  button-utility:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-secondary}"
    borderColor: "{colors.hairline}"
    rounded: "{rounded.sm}"
    padding: "{spacing.xs} {spacing.sm}"
    typography: "{typography.caption}"
  nav-bar:
    description: "Outer fixed header row; see header-logo-pill / header-nav-list / header-chrome-button for the three sub-parts (Koto-derived, see Components § Navigation for full behavior)."
    backgroundColor: "transparent"
    height: "{spacing.xxl}"
    inset: "{spacing.md}"
  header-logo-pill:
    description: "Solid pill behind the logo mark. Width starts at 0 (logo floats bare over the hero) and tweens to full once scrolled past hero height."
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.sm}"
    padding: "{spacing.xs} {spacing.sm}"
    logoColor: "{colors.primary}"
  header-nav-list:
    description: "Work / About / Contact label row beside the logo pill. Auto-inverts over any hero media via mix-blend-mode: exclusion, no JS section-detection needed."
    textColor: "{colors.ink-muted}"
    hoverTextColor: "{colors.ink}"
    gap: "{spacing.xl}"
    typography: "{typography.eyebrow}"
  header-chrome-button:
    description: "Glass utility button: 4-dot widget trigger, clock readout, and (mobile) the Menu trigger all share this chrome."
    backgroundColor: "{colors.overlay-fill}"
    hoverBackgroundColor: "{colors.overlay-fill-hover}"
    blur: "{blur.chrome}"
    rounded: "{rounded.xs}"
    padding: "{spacing.sm} {spacing.md}"
    typography: "{typography.eyebrow}"
  footer:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.ink-secondary}"
    linkColor: "{colors.ink}"
    hairline: "{colors.hairline}"
    padding: "{spacing.xxl}"
    typography: "{typography.body-sm}"
  feature-card:
    description: "Resting / unfocused service card in the carousel."
    backgroundColor: "{colors.surface-card}"
    borderColor: "{colors.hairline}"
    rounded: "{rounded.lg}"
    padding: "{spacing.lg}"
    typography: "{typography.title}"
  feature-card-elevated:
    description: "Focused liquid-glass service card, scaled up and glowing."
    backgroundColor: "{colors.surface-card}"
    borderColor: "{colors.border-active}"
    glow: "{colors.accent-ruby-glow}"
    rounded: "{rounded.lg}"
    padding: "{spacing.xl}"
    typography: "{typography.heading-3}"
  text-input:
    backgroundColor: "transparent"
    borderColor: "{colors.hairline}"
    focusBorderColor: "{colors.primary}"
    textColor: "{colors.ink}"
    placeholderColor: "{colors.ink-faint}"
    padding: "{spacing.md} 0"
    typography: "{typography.body-md}"
  badge-pill:
    backgroundColor: "transparent"
    borderColor: "{colors.hairline}"
    selectedBackground: "{colors.ink}"
    selectedTextColor: "{colors.canvas}"
    selectedBorder: "{colors.accent-ruby-border}"
    rounded: "{rounded.full}"
    padding: "{spacing.xs} {spacing.md}"
    typography: "{typography.body-sm}"
  hero-band:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: "{spacing.xxl}"
  hero-outline-type:
    description: "Signature oversized outlined word behind hero/section content."
    fillColor: "transparent"
    strokeColor: "{colors.ink}"
    typography: "{typography.display-outline}"
  cursor-fill-button:
    description: "High-intent CTA with cursor-origin radial fill on hover."
    backgroundColor: "transparent"
    borderColor: "{colors.border-glass}"
    fillColor: "{colors.ink}"
    fillTextColor: "{colors.canvas}"
    rounded: "{rounded.full}"
    padding: "{spacing.sm} {spacing.lg}"
    typography: "{typography.button}"
  kinetic-rollover-button:
    description: "Form submit pill with rolling subsurface brand type."
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    subsurfaceColor: "{colors.ink-faint}"
    accentDot: "{colors.primary}"
    rounded: "{rounded.full}"
    padding: "{spacing.sm} {spacing.xl}"
    typography: "{typography.button}"
  media-card:
    description: "Case-study quad-grid image/render tile."
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.hairline}"
    rounded: "{rounded.lg}"
    hoverScale: "1.02"
  ex-pricing-tier:
    description: "Default pricing tier card."
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    borderColor: "{colors.hairline}"
    rounded: "{rounded.xl}"
    padding: "{spacing.lg}"
  ex-pricing-tier-featured:
    description: "Featured/highlighted tier — polarity-flipped."
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.xl}"
    padding: "{spacing.lg}"
  ex-product-selector:
    description: "What's Included summary card."
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.xl}"
    padding: "{spacing.lg}"
  ex-cart-drawer:
    description: "Order/subscription summary drawer."
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.xl}"
    padding: "{spacing.lg}"
    item-divider: "{colors.hairline}"
  ex-app-shell-row:
    description: "Sidebar nav row. Active state uses brand primary."
    backgroundColor: "{colors.canvas}"
    activeIndicator: "{colors.primary}"
    rounded: "{rounded.sm}"
    padding: "{spacing.sm} {spacing.md}"
  ex-data-table-cell:
    description: "Data table th + td. Header uses eyebrow typography."
    headerBackground: "{colors.canvas-soft}"
    headerTypography: "{typography.eyebrow}"
    bodyTypography: "{typography.body-sm}"
    cellPadding: "{spacing.sm} {spacing.md}"
    rowBorder: "{colors.hairline}"
  ex-auth-form-card:
    description: "Sign-in / sign-up card with text-input primitives."
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.xl}"
    padding: "{spacing.lg}"
  ex-modal-card:
    description: "Modal dialog surface with elevated shadow."
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.xl}"
    padding: "{spacing.lg}"
  ex-empty-state-card:
    description: "Empty-state illustration frame."
    backgroundColor: "{colors.canvas-soft}"
    rounded: "{rounded.xl}"
    padding: "{spacing.xxl}"
    captionTypography: "{typography.body-md}"
  ex-toast:
    description: "Toast notification — feature-card shape + medium shadow."
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.xl}"
    padding: "{spacing.sm} {spacing.md}"
    typography: "{typography.body-sm}"
---

## Overview

AH Growth is a full-service growth agency for Pakistani local businesses (restaurants, solar, bakeries, gyms, pharmacies, and beyond) that will eventually widen into SaaS. The site has to read as confident, creative, and technically capable, never as another templated corporate agency page. A full page sits on the near-black obsidian canvas ({colors.canvas}), broken only by slightly-lighter panels ({colors.canvas-soft}, {colors.secondary}) for hero and footer bands. Cards are frosted glass ({colors.surface-card}) with hairline edges ({colors.hairline}), not flat opaque boxes — the whole surface language stays in a tight monochrome band from obsidian through zinc to near-white, with color reserved almost entirely for one ruby accent ({colors.primary}).

Typographically, Bricolage Grotesque carries every functional role, from the 72px hero headline ({typography.display-lg}) down to captions, with increasingly negative letter-spacing as size increases — tight, sharp, a little futuristic. The one deliberate exception is the brand's signature move: an oversized outlined word set in Boldonse ({typography.display-outline}), stroke-only, sitting behind hero and section content the way "kinetic" sits behind the Kinetic Studio reference. It is used sparingly, once per major section at most, so it keeps its impact.

The ruby accent ({colors.primary}) is a whisper, not a flood — it shows up as CTA fills, focus rings, ambient radial glow behind elevated cards ({colors.accent-ruby-glow}), and small active-state indicators. Everything else, including all imagery treatment and card chrome, stays grayscale so that ruby always reads as intentional, not decorative.

**Key Characteristics:**
- Obsidian canvas ({colors.canvas}) with almost no color outside the {colors.primary} accent
- Frosted-glass card surfaces ({colors.surface-card}) over hard-edged flat boxes
- Bricolage Grotesque across the entire type scale, tightly tracked at large sizes ({typography.display-lg})
- One signature move: oversized outlined Boldonse word ({typography.display-outline}) behind key sections
- Pill geometry everywhere at the interactive edge ({rounded.full}) — buttons, chips, nav
- Depth used to signal focus/energy, not comfort — cards glow and scale up when they earn attention ({colors.accent-ruby-glow})
- 8px spacing base throughout ({spacing.md}, {spacing.lg}) keeps rhythm consistent across dense and open sections
- Ruby never fills large surfaces — confined to CTAs, borders, and ambient bleed ({colors.accent-ruby-border})

## Colors

### Brand & Accent
- **Primary** `{colors.primary}` `#e11d48` — the one chromatic signal in the system: CTA fills, active states, focus rings, ambient glow behind elevated cards.
- **Primary Active** `{colors.primary-active}` `#b41739` — pressed/active state of primary, darkened ~20% for tactile feedback.
- **On Primary** `{colors.on-primary}` `#ffffff` — text and icons sitting on a primary-filled surface.
- **Secondary** `{colors.secondary}` `#1a1a1f` — the dark hero/footer band color, a step up from canvas to separate monumental sections without introducing hue.

### Surface
- **Canvas** `{colors.canvas}` `#09090b` — the default page background, pure deep obsidian.
- **Canvas Soft** `{colors.canvas-soft}` `#0f0f12` — a barely-lighter alternate background for section banding and table headers.
- **Surface** `{colors.surface}` `#121215` — opaque surface for utility chrome: inputs, buttons, table cells.
- **Surface Card** `{colors.surface-card}` `rgba(18,18,21,0.75)` — frosted glass card surface, used with backdrop blur for feature cards, service cards, and modals.
- **Hairline** `{colors.hairline}` `rgba(255,255,255,0.08)` — the default 1px structural border/divider.

### Text
- **Ink** `{colors.ink}` `#f4f4f5` — headline and primary text color, near-white for maximum contrast on obsidian.
- **Ink Secondary** `{colors.ink-secondary}` `#d4d4d8` — subheads and emphasized body copy.
- **Ink Muted** `{colors.ink-muted}` `#a1a1aa` — standard body copy, scannable but clearly secondary to headlines.
- **Ink Faint** `{colors.ink-faint}` `#71717a` — captions, placeholders, timestamps, disabled text.

### Semantic
AH Growth has no dedicated success/warning/error palette yet — form validation and status states should reuse `{colors.primary}` for error/attention states and `{colors.ink}` for confirmation states until a semantic set is explicitly requested. Two additional accent-only tokens exist for chromatic emphasis: `{colors.accent-ruby-glow}` (ambient radial bleed behind elevated surfaces) and `{colors.accent-ruby-border}` (tinted hairline for selected/active chips and inputs).

## Typography

### Font Family
Primary family: **Bricolage Grotesque** (variable weight grotesk), fallback stack `"Bricolage Grotesque", "Inter", system-ui, sans-serif`. It carries every functional role — display, heading, body, button, caption — so the type voice stays singular and confident rather than mixing families. Signature family: **Boldonse**, fallback `"Boldonse", "Bricolage Grotesque", sans-serif`, used exclusively for the oversized outlined background word ({typography.display-outline}) — never for functional text.

### Hierarchy
| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| display-lg | 72px | 700 | 1.05 | -2px | Hero headline |
| display-md | 56px | 700 | 1.08 | -1.5px | Section headlines |
| display-outline | clamp(4rem, 12vw, 9rem) | 400 | 0.9 | -2px | Signature outlined background word |
| heading-1 | 40px | 600 | 1.15 | -1px | Page-level subheads |
| heading-2 | 28px | 600 | 1.2 | -0.5px | Section subheads |
| heading-3 | 20px | 600 | 1.3 | -0.1px | Card/module titles |
| title | 18px | 500 | 1.4 | 0px | List/component titles |
| body-md | 16px | 400 | 1.6 | 0px | Default paragraph copy |
| body-sm | 14px | 400 | 1.55 | 0px | Secondary/dense copy |
| button | 13px | 500 | 1 | 1.5px | CTA and pill labels (uppercase) |
| caption | 12px | 400 | 1.4 | 0px | Captions, timestamps |
| eyebrow | 12px | 500 | 1.2 | 0.4px | Uppercase meta labels above headlines |

### Principles
Letter-spacing tightens as size grows (down to -2px at display-lg) so large type feels compressed and deliberate rather than loose; body copy stays at 0 tracking for readability. Button and eyebrow labels use uppercase presentation with positive tracking to read as structural chrome, not prose. The display-outline role is stroke-only — never filled — reinforcing that it is a graphic device layered behind content, not a headline competing with `{typography.display-lg}`.

### Note on Font Substitutes
Both Bricolage Grotesque and Boldonse are open Google Fonts with no licensing constraints; self-host or load via `next/font/google` for performance. If Boldonse is unavailable at build time, fall back to Bricolage Grotesque at 800 weight with an added `-webkit-text-stroke` for the outline effect rather than dropping the signature move entirely.

## Layout

### Spacing System
- xxs `{spacing.xxs}` 4px — icon-to-label gaps
- xs `{spacing.xs}` 8px — tight inline spacing, chip padding
- sm `{spacing.sm}` 12px — form field gaps, badge padding
- md `{spacing.md}` 16px — default component padding
- lg `{spacing.lg}` 24px — card padding, grid gutter
- xl `{spacing.xl}` 32px — section-internal spacing
- xxl `{spacing.xxl}` 48px — section-to-section spacing, hero/footer padding

### Grid & Container
Max container width 1440px, 12-column grid, gutter at `{spacing.lg}`. Content-heavy sections (case studies, contact form) use a 2-column asymmetric split rather than the full 12 columns, keeping one column as a fixed meta/label rail.

### Whitespace Philosophy
Space is used to let the oversized type and glass cards breathe — dense multi-font text blocks are treated as an anti-pattern. Every section keeps generous vertical rhythm (`{spacing.xxl}` between major sections) so the confident, editorial tone doesn't collapse into clutter.

### Responsive Strategy
| Name | Width | Key Changes |
|---|---|---|
| Mobile | 375–767px | Single column, nav collapses to pill immediately, pinned horizontal carousel disabled (stacked vertical cards instead) |
| Tablet | 768–1023px | 2-column grids, footer columns stack to 2-up, quad media grid becomes 2x2 unchanged |
| Laptop | 1024–1439px | Full 12-column grid active, pinned carousel and parallax billboard enabled |
| Desktop | 1440px+ | Container caps at 1440px and centers; display-outline scales to its clamp() ceiling |

**Touch Targets:** All interactive pills and chips maintain a minimum 44px tap height on mobile regardless of visual padding.

**Collapsing Strategy:** The floating nav collapses to a rounded glass pill (`{components.nav-bar.collapsedBackground}`) on scroll past the hero at all breakpoints. The footer's 3–4 column location grid stacks to a single column under tablet. The 2x2 case-study media matrix stays 2x2 down to tablet, then stacks to one column on mobile. The pinned horizontal service carousel and parallax scroll-linked billboard both fall back to standard vertical stacked scrolling under the laptop breakpoint and whenever `prefers-reduced-motion: reduce` is set.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| Level 0 — Flat | `{colors.hairline}` border only, no shadow | Nav rows, table dividers, base layout separators |
| Level 1 — Soft | `{colors.surface-card}` glass fill + `{colors.border-glass}` ring, subtle backdrop blur | Resting feature/service cards, form containers |
| Level 2 — Elevated | `{colors.border-active}` ring + `{colors.accent-ruby-glow}` ambient bleed + deeper shadow | Focused/hovered service card, modals, popovers |

Depth in this system signals focus and energy rather than soft comfort: most surfaces sit flat and quiet at Level 0–1, and only the thing currently earning attention — a focused carousel card, an open modal — jumps to Level 2 with a glow and a scale-up. This mirrors the brand's confident, deliberate posture: nothing is elevated by default, elevation is earned.

Two blur tiers back the glass surfaces: `{blur.card}` (20px) for feature/service cards and modals, `{blur.chrome}` (40px) for small high-frequency UI chrome like `header-chrome-button` — the stronger blur reads as "system chrome" versus the softer card blur reading as "content surface."

## Shapes

### Border Radius Scale
| Token | Value | Use |
|---|---|---|
| xs | 6px | Inline chips, form select chevrons |
| sm | 10px | Utility buttons, dense pill toggles |
| md | 16px | Standard card corners, input wells |
| lg | 24px | Feature/service cards, media tiles |
| xl | 32px | Hero panels, modals, large image wells |
| full | 9999px | Pill CTAs, nav pill, chips, circular elements |

### Photography Geometry
Photography and renders are framed one of two ways: full-bleed inside a `{rounded.lg}` or `{rounded.xl}` card with a `{colors.hairline}` or `{colors.border-glass}` edge, or presented as isolated cutouts with no frame at all, floating over the `{typography.display-outline}` billboard type for parallax sections. Cutouts never carry drop shadows — depth comes from the ambient `{colors.accent-ruby-glow}` bleed behind them, not from a shadow silhouette.

## Components

**No hover states documented beyond what's specified per component below.**

### Navigation

**Header, full spec (adapted from a live audit of koto.com's header — structure and motion carried over, palette and type swapped to AH Growth's tokens).** Fixed, `{spacing.xxl}` tall, inset `{spacing.md}` from the top/left/right edges. Three independent pieces sit in one row, each with `mix-blend-mode: exclusion` applied directly in CSS (not a JS section-detector) so all three stay legible over any hero media automatically:

1. **`header-logo-pill`** (far left) — the logo mark alone, no chrome, floating over the hero at page-top. It's the one place `{colors.primary}` (ruby) appears in the header: every other header surface stays grayscale, matching the "whisper accent" rule everywhere else in the system. At page-top the mark renders ~24% larger than its scrolled size (a small hero-emphasis flourish); once the page scrolls past hero height, two things happen together: the mark settles to 1x scale, and a `{colors.surface}` pill (`{rounded.sm}`) grows in behind it from width 0 to full, width-tweened over 750ms with `cubic-bezier(0.28, 0, 0, 1)`. The whole pill container also resizes (400ms, `cubic-bezier(0.65, 0, 0.35, 1)`) when a click opens the nav dropdown — same easing family as `{colors.primary}`'s general "settle, don't spring" feel from `--ease-inertia`, just a distinct curve tuned for this one layout tween.
2. **`header-nav-list`** (beside the logo) — **Work / About / Contact** only, matching the locked route tree in `SITEMAP.md` (no Services/Latest/Careers routes exist here, so don't port Koto's full 6-item list). Set in `{typography.eyebrow}` — Koto uses a monospace face for this row, but AH Growth stays inside its single-family type system, so `{typography.eyebrow}`'s uppercase/tracked treatment carries the same "small system label" read without introducing a second font. Rest color `{colors.ink-muted}`, hover `{colors.ink}`, gap `{spacing.xl}` between items, quick 167ms linear color transition on hover (no roll-reveal text animation was actually observed in the live DOM despite that being described in the Koto motion audit — treat this as a corrected, verified behavior: it's a color fade, not a text roll). On scroll past hero: the row's inner flex wrapper slides left by its own full width (`translateX(-100%)`, not a fixed px — Koto's `-255px` was sized for its own 6-item row and won't fit a 3-item one) inside an `overflow-hidden` mask, 650ms `cubic-bezier(0.36, 0.54, 0, 0.99)`, and the row becomes non-interactive (`pointer-events: none`) for the duration it's hidden.
3. **`header-chrome-button`** (far right) — one or two small glass capsules: a 4-dot widget-trigger icon (four 2px dots in a 2x2 grid, `{colors.ink}` fill, each dot nudges ~2px outward from center on hover, 167ms linear — a small "explode" detail worth keeping) and, at tablet+, a live clock reading `HH:MM UTC+5` (Pakistan's real offset, so this isn't decorative) in the same `{typography.eyebrow}` treatment as the nav labels. Below the tablet breakpoint both collapse into a single "Menu" chrome button instead. Chrome: `{colors.overlay-fill}` fill, `{colors.overlay-fill-hover}` on hover, `{blur.chrome}` backdrop blur, `{rounded.xs}`.

Don't reintroduce a separate "current section name" pill replacing the nav row on scroll — that was in the original motion-preset notes but didn't hold up against the live DOM; the real mechanism is simpler (slide the row away, grow the logo pill), and simpler is preferable here anyway.

### Buttons
**`button-primary`** — filled `{colors.primary}` pill, `{colors.on-primary}` label, `{rounded.full}`, padded `{spacing.sm} {spacing.lg}`, set in `{typography.button}`.
**`button-primary-pressed`** — same shape, background darkens to `{colors.primary-active}` on press.
**`button-secondary`** — transparent with a `{colors.hairline}` ring, inverts to `{colors.ink}` background / `{colors.canvas}` text on hover.
**`button-utility`** — small `{colors.surface}` chip-button with `{colors.hairline}` border, used for inline tools and filters, set in `{typography.caption}`.
**`cursor-fill-button`** — high-intent CTA (Explore Now, Send Now) where a `{colors.ink}` circular fill expands from the cursor's entry point on hover, inverting the label to `{colors.canvas}`; falls back to a plain opacity change under reduced motion.
**`kinetic-rollover-button`** — form submit pill where a `{colors.ink-faint}` subsurface wordmark layer rolls vertically behind a static `{typography.button}` label on hover, punctuated by a `{colors.primary}` accent dot.

### Cards & Containers
**`feature-card`** — resting/unfocused service carousel card: `{colors.surface-card}` glass fill, `{colors.hairline}` border, `{rounded.lg}`, title in `{typography.title}`.
**`feature-card-elevated`** — the focused carousel card: same glass fill but `{colors.border-active}` ring and `{colors.accent-ruby-glow}` bleed, scaled up, heading in `{typography.heading-3}`.
**`media-card`** — case-study quad-grid tile: `{colors.surface}` fill, `{colors.hairline}` border, `{rounded.lg}`, 1.02 scale on hover.
**`hero-band`** — the dark `{colors.secondary}` panel used for hero and footer sections, `{rounded.xl}` where it's used as a contained block rather than full-bleed.

### Inputs & Forms
**`text-input`** — zero-box underline field: transparent background, `{colors.hairline}` bottom border that draws in to `{colors.primary}` on focus, placeholder in `{colors.ink-faint}`, text in `{typography.body-md}`.
**`badge-pill`** — multi-select service/budget chip: transparent with `{colors.hairline}` border at rest, inverts to `{colors.ink}` background / `{colors.canvas}` text when selected, with an optional `{colors.accent-ruby-border}` ring for chromatic emphasis.

### Signature Components
**`hero-outline-type`** — the brand's one unmistakable move: a stroke-only `{typography.display-outline}` word in `{colors.ink}`, layered behind hero/section content, used once per major section maximum.

### Examples (illustrative)
**`ex-pricing-tier`** — default `{colors.surface}` tier card, `{rounded.xl}`, `{spacing.lg}` padding.
**`ex-pricing-tier-featured`** — polarity-flipped tier: `{colors.ink}` background, `{colors.on-primary}` text.
**`ex-product-selector`** — "what's included" summary card on `{colors.surface}`, `{rounded.xl}`.
**`ex-cart-drawer`** — order summary drawer with `{colors.hairline}` item dividers.
**`ex-app-shell-row`** — sidebar nav row on `{colors.canvas}`, active state marked with `{colors.primary}`.
**`ex-data-table-cell`** — table header on `{colors.canvas-soft}` in `{typography.eyebrow}`, body in `{typography.body-sm}`, rows divided by `{colors.hairline}`.
**`ex-auth-form-card`** — sign-in card on `{colors.surface}` built from `{components.text-input}` primitives.
**`ex-modal-card`** — `{colors.surface}` modal at Elevation Level 2.
**`ex-empty-state-card`** — `{colors.canvas-soft}` illustration frame, generous `{spacing.xxl}` padding, caption in `{typography.body-md}`.
**`ex-toast`** — `{colors.surface}` notification, `{rounded.xl}`, `{typography.body-sm}`.

## Do's and Don'ts

**Do:**
- Keep 90%+ of every surface monochrome; let `{colors.primary}` do the signaling, not decoration.
- Use `{typography.display-outline}` sparingly — once per major section, never as a repeating pattern.
- Reserve Elevation Level 2 (`{colors.accent-ruby-glow}`, `{colors.border-active}`) for the element currently earning focus.
- Keep interactive edges on the `{rounded.full}` pill geometry for consistency across nav, buttons, and chips.
- Respect `prefers-reduced-motion` for every hover/scroll-linked component (`cursor-fill-button`, `kinetic-rollover-button`, pinned carousel).
- Hold body copy at `{typography.body-md}` / `{typography.body-sm}` with zero letter-spacing for readability.
- Use `{colors.hairline}` as the default separator before reaching for a shadow.
- Keep the header to exactly the three routes in `SITEMAP.md` (`header-nav-list`: Work, About, Contact) — don't add nav items speculatively.

**Don't:**
- Don't fill large flat surfaces with `{colors.primary}` — it breaks the "whisper accent" rule and flattens the hierarchy.
- Don't apply drop shadows to photography cutouts — use `{colors.accent-ruby-glow}` ambient bleed instead.
- Don't mix in a second display typeface beyond `{typography.display-outline}`'s Boldonse — Bricolage Grotesque carries every functional role.
- Don't use `{rounded.xs}` or `{rounded.sm}` on primary CTAs — those stay on `{rounded.full}`.
- Don't stack multiple `feature-card-elevated` instances at once — elevation is meant to be scarce and earned.
- Don't hardcode any copy or token value directly in components — every string comes from `src/content.ts`, every visual value from this token set.
- Don't run the pinned horizontal carousel or parallax billboard below the laptop breakpoint — fall back to stacked vertical scroll.
- Don't build header contrast-safety with a JS scroll/section-position class toggler — `mix-blend-mode: exclusion` on `header-logo-pill`, `header-nav-list`, and `header-chrome-button` handles it in plain CSS.
- Don't put `{colors.primary}` anywhere in the header chrome besides the logo mark itself — nav labels and chrome buttons stay grayscale.
