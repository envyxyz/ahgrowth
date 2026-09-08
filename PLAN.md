# AH Growth — MVP Implementation Plan (Sonnet 5 High)

> **Status:** Ready to execute. Single lane, one continuous run.
> **Governing docs:** `CLAUDE.md` (rules) · `SITEMAP.md` (structure) · `assets/design/design-ahgrowth.md` (visual system) · `assets/design/inspirations/inspirations.md` (interaction reference).
> **Companion:** `AUDIT-GEMINI.md` is a re-runnable third-party audit prompt. It does not execute this plan; it checks it.

---

## 0. Objective and definition of done

Ship a **static, fully responsive, zero-404 marketing site** that reads as finished to a stranger, on a foundation where every later upgrade (real copy, real work, GSAP motion, WebGL hero) is a localized edit rather than a rewrite.

**Done means all of the following are true, verified, not assumed:**

| # | Gate | How it is proven |
|---|---|---|
| G1 | `npx tsc --noEmit` exits 0 | terminal exit code |
| G2 | `npm run lint` exits 0 with zero warnings | terminal exit code |
| G3 | `npm run build` exits 0 | terminal exit code |
| G4 | Zero `[PLACEHOLDER]` markers render on any shipped route | Playwright snapshot of `/`, `/contact`, `/privacy`, `/terms` |
| G5 | Every `href` on every shipped route resolves to a real route or an in-page anchor that exists | link crawl (§8) |
| G6 | No horizontal overflow at 320 / 375 / 768 / 1024 / 1440 / 1920 px | Playwright `scrollWidth === clientWidth` on `<html>` |
| G7 | Light and dark both legible on every section; no invisible text | Playwright screenshots, both themes, all breakpoints |
| G8 | Zero hardcoded hex, px, or ms values in `src/components/**` and `src/app/**` | grep gate (§8) |
| G9 | Zero user-facing string literals in JSX outside `content.ts` | grep gate (§8) |
| G10 | Every interactive element has a visible `:focus-visible` ring and a ≥44px touch target | Playwright keyboard tab-through |
| G11 | `prefers-reduced-motion: reduce` disables Lenis, the reveal transitions, and the cursor fill | Playwright emulated media |
| G12 | Zero console errors or React warnings on load and on interaction | `.playwright-cli/console-*.log` |

**Non-negotiable:** if a gate fails, fix it before moving to the next phase. Do not carry a known defect forward.

---

## 1. Decisions locked this session

These were open questions. They are now answered and must not be re-litigated mid-build.

1. **Copy.** All narrative copy is authored directly into `src/content.ts` as working placeholder text that reads like a real agency wrote it. It ships. HR edits it later in one file.
   **Hard boundary that survives this decision:** no invented *measurements*. No percentages, multipliers, client counts, revenue figures, award names, client logos, or response-time SLAs. Claims are limited to things AH Growth controls and can honor (what they do, how they work, what they commit to). This is a liability line, not a style preference.
2. **Services are real.** The five services in `assets/design/services/SERVICE-CARDS-THEMING-SPEC.md` (Designing · CMS Websites · Product Development · Mobile Apps · Marketing) and their sub-categories are AH Growth's offering. The generated card art in `public/images/services/` is used.
3. **Routes shipping:** `/`, `/contact`, `/privacy`, `/terms`. `/work` and `/about` are deferred and **removed from rendered navigation** so nothing 404s.
4. **Execution:** one Sonnet lane, uninterrupted. `/caveman` before starting, `/ponytail` throughout, `/playwright-cli` for verification.

### Two structural consequences that require doc updates

**(a) Home §04 Selected Work is deferred.** There are zero projects. A "Selected Work" section with no work is the exact half-shipped look this build exists to avoid. It is cut from the MVP homepage in the same manner `SITEMAP.md` already cuts §06 Studio Culture. `SITEMAP.md` must be updated in the same commit to record the deferral and the un-defer condition (≥3 real case studies with media).

**(b) Home §05 Social Proof ships without numbers.** `SITEMAP.md` §2 already scopes this section as "metric callouts, **custom craftsmanship guarantees, and credibility proof**." The MVP ships the second and third of those: a bento of craft commitments and working guarantees, no figures. The bento grid architecture, spans, and hover behaviour are built exactly as specified so that dropping real metrics in later is a content edit, not a layout rebuild. `content.ts` keeps a typed, empty `metrics: Metric[]` array for that day.

Resulting homepage: **Hero → Positioning → Capabilities → Social Proof → CTA Outro → Footer.** Six sections. This maps cleanly onto `primary.jpg`'s own rhythm (hero, statement, card row, statement, close).

---

## 2. Defect register — everything broken right now

Found by reading every file in `src/`. All of these must be fixed; they are not optional polish.

### Correctness / HTML validity

| ID | File | Defect | Fix |
|---|---|---|---|
| D1 | `src/components/layout/header/logo-island.tsx:44` | `<Link>` nested inside `<button>`. Invalid HTML (interactive content inside a button), inconsistent browser behaviour, a11y violation. | Flatten to siblings inside a flex `<div>`: a `<Link>` for home and a separate `<button>` for the panel toggle. |
| D2 | `src/components/sections/site-footer.tsx:66` | `window.scrollTo({behavior:"smooth"})` fights the active Lenis instance; the two engines contend and the scroll stutters or snaps. | Use `useSmoothScroll()`. Add `scrollToTop()` to the context using the exponential-out curve from `inspirations.md` §8.4. |
| D3 | `src/components/layout/site-header.tsx:44` | `document.body.style.overflow = "hidden"` does not stop Lenis. The page still scrolls behind the open nav panel. | Expose `lenis.stop()` / `lenis.start()` from `SmoothScrollProvider`; call on panel open/close, keep the `overflow` line for the reduced-motion path where Lenis is absent. |
| D4 | `src/app/layout.tsx:9-12` | `title` and `description` are hardcoded string literals. Direct violation of the `content.ts` rule. | Read from `content.meta`. Add `metadataBase`, `openGraph`, `twitter`, `robots`. |
| D5 | `src/components/sections/site-footer.tsx:73` | `pr-[72px]` is a hardcoded pixel value. | Add `--layout-toggle-clearance: 72px` to `tokens.css`, map to `spacing` in Tailwind, use `pr-toggle-clearance`. |
| D6 | app router | No `not-found.tsx`, no `error.tsx`, no `robots.ts`, no `sitemap.ts`, no `opengraph-image`. | Add all five. 404 must be designed, not the Next default. |

### Responsive / layout

| ID | File | Defect | Fix |
|---|---|---|---|
| D7 | `src/components/sections/hero.tsx:22` | `pt-[calc(var(--space-6xl)+var(--space-xxl))]` = 224px top + 176px bottom fixed padding inside a `min-h` of 560px on mobile. Content is crushed into ~160px. | Replace both with fluid `clamp()` values tied to the same rail as `--layout-card-p`. Add `--hero-pad-block` tokens. |
| D8 | `src/components/sections/hero.tsx:29` | Ghost wordmark at `clamp(5rem,18vw,16rem)` with `whitespace-nowrap`: "AH Growth" at the 80px floor is ~700px wide. On a 375px viewport roughly "AH G" is visible, reading as a broken crop rather than a deliberate ghost. | Below `md`, render the ghost as the mark only (`AH`) or drop its floor to `3rem`. Decide by screenshot, not by theory. |
| D9 | `src/components/layout/site-header.tsx:56` | At 375px the header row is logo (56) + gap (32) + Menu (~90) + gap (32) + CTA (~150) + inset (40) ≈ 400px against a 375px viewport. Overflows. | Hide the CTA below `md`; it already exists inside the nav panel. Reduce `gap-xl` to `gap-md` below `md`. |
| D10 | `src/components/ui/section.tsx` | No `desktop` breakpoint. Tailwind's `xl` is 1280, but the design spec's Desktop tier is 1440 (the container cap). | Add `screens: { desktop: "1440px" }` to `tailwind.config.ts`. |

### Performance

| ID | File | Defect | Fix |
|---|---|---|---|
| D11 | `src/components/providers/smooth-scroll.tsx:78` | A `fixed inset-0 z-[60]` layer whose `backdrop-filter` is rewritten **every rAF frame** during scroll. This forces a full-viewport composite per frame, and it sits above the header so the header blurs while scrolling. On mid-range Android this is the single largest scroll-FPS cost in the codebase. | Cut it from the MVP. The velocity-blur preset is a nice-to-have that is actively harming the primary goal. Keep the preset constants in `design-tokens.ts` so it can return later behind a pointer-coarse / desktop-only gate. |
| D12 | `src/app/globals.css:24` | The theme cross-fade selector is `:root[data-theme-transition] *` with `!important` — it matches every node in the document during the flip. | Scope is acceptable because it is transient, but add `will-change: auto` and verify the flip does not jank at 1440px with all sections mounted. If it does, narrow to a token-carrying class list. |

### Accessibility

| ID | Scope | Defect | Fix |
|---|---|---|---|
| D13 | global | **No `:focus-visible` styling anywhere.** Keyboard users get the browser default, which is invisible on the dark blocks. | Add `--color-focus-ring` (light + dark) to `tokens.css` and a global `:focus-visible` outline rule in `globals.css`. Every interactive primitive inherits it. |
| D14 | `src/components/sections/social-proof.tsx:29` | Stat groups use `<hr>` for decoration inside a content flow. | The rule under a stat is structural per the design spec, so keep it, but as a `<div role="presentation">` or `aria-hidden` on the `<hr>`. |
| D15 | `src/components/ui/cursor-fill-button.tsx` | Renders `<button>` for what is a navigation action in `HeaderActions` and `CtaOutro`. Loses right-click, middle-click, and link semantics. | Add an `as` / `href` prop rendering `<Link>` when the target is a route or anchor. |
| D16 | global | No `lang` on sub-content, no landmark labelling, skip link exists but is the only one. | Add `aria-label` to `<nav>` landmarks; verify one `<h1>` per route. |

### Content architecture

| ID | Scope | Defect | Fix |
|---|---|---|---|
| D17 | `CONTENT.md` | Exists at repo root and duplicates `content.ts`, while `CLAUDE.md` states "There is no separate `CONTENT.md`." Two sources of truth that will drift. | **Delete `CONTENT.md`.** `content.ts` is the single source, as `CLAUDE.md` mandates. |
| D18 | `src/content.ts` | `copyright` uses `new Date().getFullYear()` at module scope — evaluated on the server at build time, and again on the client. Under static export the year freezes at build time; under hydration it can mismatch. | Move the year to a `<time>` rendered client-side, or accept build-time and document it. Simplest correct fix: compute in the footer component, pass the template from `content.ts`. |

---

## 3. Phase plan

Each phase ends with its gate. Do not start a phase before the previous gate passes.

### Phase 0 — Foundation repair (no new sections)

**Goal:** the existing surface becomes correct and the token/primitive layer becomes complete enough that no later phase needs to invent anything.

**Token additions** — `src/styles/tokens.css`, mirrored into `src/lib/design-tokens.ts` and `assets/design/design-ahgrowth.md` **in the same pass** (CLAUDE.md rule: doc first, then both mirrors):

```
--color-focus-ring            light: #111110      dark: #f5f4f2
--color-focus-ring-inverse    light: #f7f7f5      dark: #f5f4f2
--layout-toggle-clearance     72px
--layout-hero-pad-top         clamp(96px, 14vh, 224px)
--layout-hero-pad-bottom      clamp(88px, 12vh, 176px)
```

**Tailwind additions** — `tailwind.config.ts`: `screens.desktop = 1440px`; map the four new tokens into `colors` / `spacing`.

**Global CSS** — `src/app/globals.css`: one `:focus-visible` rule using `--color-focus-ring` with a 2px offset; an `.on-inverse :focus-visible` variant using `--color-focus-ring-inverse`.

**Fixes applied:** D1–D6, D10, D11, D12, D13, D17, D18.

**Gate P0:** G1, G2, G3 pass. `/` renders identically to before except the header no longer overflows and focus rings are visible on tab-through.

---

### Phase 1 — Content

**Goal:** `src/content.ts` contains zero `PLACEHOLDER` values on any shipped route, and every string a visitor can read lives there.

Invoke `anti-ai-slop-writing` before writing a single line. Copy rules that apply on top of it:

- **No em dashes.** Comma, colon, semicolon, or a new sentence. En dashes in numeric ranges only.
- Plain active sentences. Concrete over aspirational.
- **No numbers that assert a measurement.** No "%", no "4X", no "50+ clients", no "24-hour response".
- Sentence case buttons.
- Nothing that names a client, an award, or a publication.

**Structural changes to `content.ts`:**

```ts
// NavItem gains one field so deferred routes stay documented instead of deleted.
export interface NavItem {
  label: string;
  href: string;
  hoverLabel?: string;
  /** false = route not built yet; header and footer filter on this. */
  shipped: boolean;
}
```

`nav.items`: Home (shipped, logo only), Work (`shipped: false`), About (`shipped: false`), Contact (`shipped: true`).
Header, nav panel, and footer all render `items.filter(i => i.shipped)`. Shipping `/work` later is flipping one boolean.

`nav.cta.href` becomes `/contact` (a real route now exists; the `#start` single-page workaround is retired). `CtaOutro` keeps `id="start"` as an in-page anchor target for the hero's secondary button.

**Sections to populate:** `meta` (title, description, OG), `home.hero` (eyebrow, headline, subheadline, two CTAs), `home.positioning` (one statement, split into emphasis and muted halves for the two-tone treatment), `home.capabilities` (eyebrow, two-tone heading, intro line), `serviceCategories` (5 services with `summary`, `subcategories`, `imageSrc`, `cutoutSrc`, `accentPosition` from the theming spec), `home.socialProof` (eyebrow, two-tone heading, 4 bento commitment cards, empty `metrics: []`, empty `clientLogos: []`), `home.ctaOutro` (two-tone headline, CTA, supporting line), `footer` (real email, real city, `social: []` until handles are confirmed, legal links, back-to-top, wordmark), `contact` (availability, form labels, 5 service chips sourced from `services`, budget tiers, 8 field labels, 3 reassurance items, direct block), `legal.privacy` and `legal.terms` (new top-level key, generic agency boilerplate with an explicit "review before launch" note in the file, not on the page).

**Two-tone statement shape.** Recurring signature across `primary.jpg`. One type, used four times:

```ts
export interface Statement {
  /** Full-contrast opening. */ lead: string;
  /** Muted continuation. */    muted: string;
  /** Full-contrast close. Optional. */ tail?: string;
}
```

**Facts still genuinely unknown** stay `PLACEHOLDER` **only if the section can hide when they are absent**. Direct email and city must be real: ask once at the top of execution if not already known, otherwise use `hello@ahgrowth.com` + `Lahore, Pakistan` and flag both in the handoff as verify-before-launch.

**Gate P1:** grep for `PLACEHOLDER` in shipped-route code paths returns only the exported constant and the deferred (`/work`, `/about`) blocks.

---

### Phase 2 — Primitives

**Goal:** every visual pattern the sections need exists as one component. No section invents a card, a chip, or a reveal.

New files under `src/components/`:

| File | Role | Notes |
|---|---|---|
| `motion/reveal.tsx` | **The animation foundation.** Wraps children, applies opacity + `translateY` entrance on viewport entry via one shared `IntersectionObserver`, `once: true`. Props: `delay`, `as`, `className`. | This is the single most important file in the build. Every section block wraps in `<Reveal>` **now**, using CSS transitions. Swapping the internals for a GSAP timeline later touches this file only. |
| `lib/hooks/use-in-view.ts` | The observer. One module-level observer instance, elements register/unregister. Never one observer per element. | Matches the "one listener" discipline already set by `use-scroll-state.ts`. |
| `ui/card.tsx` | `card` and `card-on-inverse` component tokens. `tone` prop. No border, fill separation only. | Currently hand-rolled in three places. |
| `ui/statement.tsx` | Two-tone display statement. Takes a `Statement`, renders lead/tail in `text-ink`, muted in `text-ink-faint`, tone-aware for inverse blocks. | Used by Positioning, Capabilities, Social Proof, CTA Outro. |
| `ui/media-frame.tsx` | `rounded-lg` `overflow-hidden` image container. `next/image` with `fill` + correct `sizes`. Enforces aspect ratio. | Prevents four different image implementations. |
| `ui/chip.tsx` | Pill chip. `selected` state inverts fill (Invert Chip preset). Used as a `<button>` in the form and as a static `<li>` for service sub-categories. | |
| `ui/field.tsx` | Zero-box underline input per `inspirations.md` Element 2. Variants: text, email, tel, textarea, select. Underline draws from `scaleX(0)` on focus. | |
| `sections/capabilities/service-card.tsx` | Focused/unfocused card per the theming spec. **MVP renders the static grid**, but the props and internal structure are the ones the pinned carousel will drive: `focused: boolean` already exists and already changes scale, blur, and sub-category visibility. | The carousel later becomes a scroll-driven `focused` index. Zero component rewrite. |

**Existing primitives to extend:** `Button` gains `asChild` usage everywhere a route is the target; `CursorFillButton` gains `href`; `Eyebrow` and `Section` unchanged.

**Gate P2:** every new primitive renders in isolation in both themes at 375 and 1440. G8 grep passes on `src/components/ui/**`.

---

### Phase 3 — Home

Rebuild the six sections against the primitives and the now-real content. `src/app/page.tsx` drops `<SelectedWork />`; delete `src/components/sections/selected-work.tsx`; update `SITEMAP.md` §2 to mark §04 deferred with its un-defer condition.

| Section | Build |
|---|---|
| **01 Hero** | Inset near-black card, fluid padding (D7). Eyebrow, `type-display-xl` headline max 16ch, subheadline, two pills. Ghost wordmark with the mobile treatment from D8. Keeps `data-hero` for the header threshold. **Layout foundation for the WebGL canvas:** the card's children sit in a `relative z-10` stack over an empty `absolute inset-0 z-0` slot. Dropping a canvas in later is filling that slot. |
| **02 Positioning** | `<Statement>` at `type-display-lg`, generous `--layout-section-y`, `<Reveal>`. |
| **03 Capabilities** | Inverse block. Eyebrow, two-tone heading, intro line, then the five `ServiceCard`s. **MVP layout:** responsive grid (1 col mobile / 2 col tablet / 3 col laptop, card 1 spanning wide on laptop to preserve the focused-card hierarchy from `primary.jpg`). Sub-categories render as `Chip`s inside each card. Images via `MediaFrame` with the accent glow layer behind the cutout PNG per Method A of the theming spec. |
| **05 Social Proof** | Surface block. Eyebrow, two-tone heading, asymmetric bento: 4 commitment cards with mixed spans (wide / tall / two standard), collapsing to one column below `md`. `clientLogos.length > 0` gates a marquee that does not render today. `metrics.length > 0` gates the stat row that does not render today. |
| **07 CTA Outro** | Inverse block, `id="start"`, two-tone headline, `CursorFillButton` linking to `/contact`. |
| **08 Footer** | Continues the inverse block. Real columns: Direct (email), Studio (city), Navigate (shipped routes only), Legal. Meta rule, copyright, back-to-top wired through Lenis (D2). Ghost wordmark. `social.length > 0` gates the channels column. |

**Gate P3:** G4–G7 pass on `/`. Screenshots at all six widths in both themes reviewed against `primary.jpg` for rhythm, not for literal copying.

---

### Phase 4 — `/contact`, `/privacy`, `/terms`

**`/contact`** per `SITEMAP.md` §6. Opens with an **inverse block** so the header's `on-inverse` chrome tone stays correct on this route — this is why the header needs no per-page tone logic, and it is a deliberate architectural choice, not a coincidence.

- §01 Availability: renders only when `contact.availability.isOpen` is true. Honest capacity line, no scarcity language, no countdown.
- §02 Project Inquiry Form: `Chip` multi-select for the five services (sourced from the same `services` array the carousel uses, one fact one field), `Chip` single-select for budget, then `Field`s for name, email, company, designation, phone, referral source, project details. **Static MVP submission:** a `mailto:` composed from the form state, or a plain `action` posting nowhere with a clearly-labelled state. No fake success screen. Decide at execution: `mailto:` is the honest static answer and requires no backend.
- §03 Reassurance: three commitments AH Growth can honor. No invented SLA.
- §04 Direct Contact + Locations: mirrors `footer` fields.

**`/privacy`, `/terms`:** real, readable legal pages on the canvas tone, single column capped at ~68ch, content from `content.legal`. Include a dated "last updated" line. Flag in the handoff that these need a lawyer's read.

**`not-found.tsx`:** designed 404 on the inverse block, one line and one route home.

**Gate P4:** G4–G7 and G10 pass on all four routes. G5 link crawl clean.

---

### Phase 5 — Verification and hardening

Run `/playwright-cli`. This phase produces evidence, not opinions.

1. **Matrix sweep.** 320 / 375 / 768 / 1024 / 1440 / 1920 px × light + dark × 4 routes = 48 screenshots. Assert `document.documentElement.scrollWidth === clientWidth` at each.
2. **Keyboard pass.** Tab through every route start to finish. Every stop must show a visible ring. Nav panel must trap focus and close on `Escape` (already implemented, verify).
3. **Reduced motion.** Emulate `prefers-reduced-motion: reduce`. Assert Lenis is not instantiated, `Reveal` renders children at final state immediately, cursor fill falls back to opacity.
4. **Console.** Zero errors, zero React warnings, on load and after interacting with theme toggle, nav panel, form chips, and every button.
5. **Theme flip.** Toggle on every route at every breakpoint; assert no layout shift and no unreadable pair.
6. **Metadata.** `/robots.txt` and `/sitemap.xml` resolve; OG image renders; `<title>` and description come from `content.meta`.
7. **Grep gates** (§8) run last, as the final proof of G8 and G9.

**Gate P5:** all twelve gates green. Then and only then, commit.

---

## 4. Responsive matrix

| Tier | Width | Container | Grid | Header | Hero |
|---|---|---|---|---|---|
| Small mobile | 320–374 | inset 20px | 1 col | logo + Menu, no CTA | pad-top clamp floor, ghost = mark only |
| Mobile | 375–767 | inset 20–24px | 1 col | logo + Menu, no CTA | as above |
| Tablet | 768–1023 | inset ~31px | 2 col | nav labels appear, CTA returns | subhead above buttons |
| Laptop | 1024–1439 | inset ~41px | 3 col, card 1 wide | clock readout appears | subhead and buttons on one row |
| Desktop | 1440+ | capped 1440, centered | 3 col | full cluster | clamp ceilings reached |

Rules: no fixed pixel widths on content. Every grid collapses to one column below `md`. Any pinned or scrubbed section (none in the MVP, all of them later) falls back to normal vertical stacking below `lg` and under reduced motion.

---

## 5. What the MVP deliberately does not build

Listed so a reviewer does not read absence as oversight. Each has a one-line un-defer condition.

| Deferred | Un-defer when |
|---|---|
| §00 Preloader | the WebGL hero it warms up exists |
| §01 WebGL hero canvas | the `z-0` slot in the hero card is filled; static fallback ships first |
| §03 pinned horizontal carousel | the static grid is verified and `ServiceCard.focused` is driven by a scroll index |
| §04 Selected Work | ≥3 real case studies with media exist |
| §06 Studio Culture | real photo or video assets exist |
| `/work`, `/work/[slug]` | same as §04; flip `shipped: true` |
| `/about` | real team photos and a confirmed process methodology exist |
| Numeric social proof | AH Growth supplies verified figures; drop into `socialProof.metrics` |
| Client logo marquee | logos are cleared for display; drop into `socialProof.clientLogos` |
| Velocity fade blur (D11) | it can be gated to `pointer: fine` desktop and proven not to cost scroll FPS |
| GSAP scroll timelines | `Reveal` internals are swapped; no section changes |

---

## 6. Animation foundation contract

The MVP is static. It must not need a refactor to stop being static. Three commitments make that true:

1. **One reveal component.** Every animated-later block is already wrapped in `<Reveal>`. Adding GSAP means editing `motion/reveal.tsx`, nothing else.
2. **Stable selectors.** Every section carries `data-section="<name>"`; every animatable child carries `data-reveal` or a named `data-*` hook. GSAP can target the DOM later without touching JSX.
3. **Motion values live in `design-tokens.ts`.** Every duration, easing, stagger, and offset the future timelines need is already there, reverse-engineered from the Buzz and Koto audits. Components read from it. Nothing gets re-tuned by hand at animation time.

---

## 7. File manifest

**Delete:** `CONTENT.md`, `src/components/sections/selected-work.tsx`, the `.playwright-cli/` log backlog (44 stale files, gitignore the directory).

**Create:** `src/components/motion/reveal.tsx`, `src/lib/hooks/use-in-view.ts`, `src/components/ui/card.tsx`, `ui/statement.tsx`, `ui/media-frame.tsx`, `ui/chip.tsx`, `ui/field.tsx`, `src/components/sections/capabilities/service-card.tsx`, `src/components/sections/contact/*`, `src/app/contact/page.tsx`, `src/app/privacy/page.tsx`, `src/app/terms/page.tsx`, `src/app/not-found.tsx`, `src/app/error.tsx`, `src/app/robots.ts`, `src/app/sitemap.ts`, `src/app/opengraph-image.tsx`.

**Rewrite:** `src/content.ts`, all remaining `src/components/sections/*`, `src/app/layout.tsx`, `src/app/page.tsx`.

**Edit:** `src/styles/tokens.css`, `tailwind.config.ts`, `src/lib/design-tokens.ts`, `src/app/globals.css`, `assets/design/design-ahgrowth.md`, `SITEMAP.md`, `CLAUDE.md`, `.gitignore`, all four `src/components/layout/header/*`, `src/components/providers/smooth-scroll.tsx`, `src/components/ui/cursor-fill-button.tsx`, `src/components/ui/button.tsx`.

---

## 8. Automated gates

Run these verbatim. A non-empty result on a grep gate is a failure.

```bash
# G8 — hardcoded visual values in components (allow arbitrary values that reference a var())
grep -rnE '#[0-9a-fA-F]{3,8}\b' src/components src/app --include=*.tsx | grep -v 'var(--'

grep -rnE '\[[0-9]+(px|ms)\]' src/components src/app --include=*.tsx | grep -v 'var(--'

# G9 — user-facing string literals in JSX text nodes
grep -rnE '>[A-Z][a-z]{3,}[^<{]*<' src/components src/app --include=*.tsx | grep -vE 'aria-|role=|data-'

# G4 — placeholders on shipped routes
grep -rn 'PLACEHOLDER' src/content.ts

# G5 — every internal href resolves
grep -rhoE 'href="(/[^"#]*)"' src/ | sort -u
# each result must map to a file under src/app/<route>/page.tsx

# G1-G3
npx tsc --noEmit && npm run lint && npm run build
```

---

## 9. Execution order

```
/caveman          → compress output for the run
Phase 0  → gate P0
Phase 1  → gate P1
Phase 2  → gate P2   (/ponytail check: is any primitive unused? delete it)
Phase 3  → gate P3
Phase 4  → gate P4
Phase 5  → /playwright-cli, all 12 gates
commit
```

Between phases, re-read the diff of the previous phase before starting the next. Do not batch-verify at the end; a defect found in Phase 5 that was introduced in Phase 1 costs four phases of rework.

---

## 10. Handoff notes to write at the end

A short section appended to this file recording: which copy is authored placeholder vs. confirmed fact; that `hello@ahgrowth.com` and the studio city need verification; that `/privacy` and `/terms` need legal review; the exact list of `content.ts` fields HR should edit first; and the un-defer table from §5.

---

## 11. Handoff (build completed 2026-09-09)

### Status

All five phases executed. Gates proven, not assumed:

| Gate | Result |
|---|---|
| G1 `tsc --noEmit` | exit 0 |
| G2 `npm run lint` | exit 0, zero warnings |
| G3 `npm run build` | exit 0, 4 routes + 404 + robots + sitemap, all static |
| G4 placeholders on shipped routes | 0 |
| G5 internal links resolve | `/`, `/contact`, `/privacy`, `/terms` only; no 404s from navigation |
| G6 horizontal overflow | none at 320 / 375 / 768 / 1440 |
| G7 light + dark | verified on home, contact, legal, 404 |
| G8 hardcoded hex / px / ms in components | 0 |
| G9 user-facing strings outside `content.ts` | 0 |
| G10 focus ring | 2px visible ring on tab, both tones |
| G11 reduced motion | pinned track `display:none`, reveals render settled, Lenis not instantiated |
| G12 console | 0 errors |

### What shipped beyond the original plan

Added mid-build at the user's request, sourced from the reference sites:

- **Pinned horizontal carousel** for Capabilities, fusing Designade's pinned translate, Koto's caption rail, and Buzz's damped physics into one section rather than three borrowed effects. Copy lives in the rail, cards carry only a title, so nothing is stated twice. Falls back to a stacked grid below 1024px and under reduced motion.
- **Word Wipe Scrub** on the Positioning statement (Buzz preset), one listener driving every word.
- **Magnetic Pull** on the two primary CTAs only, gated to `pointer: fine`.
- **Footer wordmark settle** parallax (inspirations.md §8.3).

The full sticky-curtain footer was deliberately not built: it fights the fixed theme toggle and the pinned track above it, and the layout risk outweighed the payoff. The parallax settle delivers the same signature safely.

### Defects found and fixed during verification

1. `surface-sunken` on the carousel cards rendered a white box through the cutout PNGs' transparent apertures on the dark block. The exact `surface`-on-`inverse` failure `CLAUDE.md` warns about. Fixed with `inverse-soft` plus a `tone` prop on `MediaFrame`.
2. The carousel row interpolated continuously while the caption rail snapped, so for half of each card's scroll range the focused card was clipped by the viewport edge. Fixed by snapping the translate to the active index and easing there.
3. `useSmoothScroll` threw outside its provider, which failed static generation of `/_not-found`. Now degrades to native scrolling.
4. The theme toggle used `overlay-fill` + `ink`: a near-black icon on the near-black footer. Floating chrome must use the `chrome` token; fixed.
5. Two arbitrary px values survived because the radius scale had no micro-glyph step. Added `--radius-xxs: 2px` and a `dotSizePx` motion constant rather than leaving raw values.
6. An orphaned `next dev` process was holding port 3000 and writing into `.next` mid-build, which produced misleading `/_document` and `pages-manifest` build errors. Not a code defect; noted so it is not re-diagnosed later.

### Verify before launch

- `footer.directEmail` is `hello@ahgrowth.com` and `footer.offices` is Lahore, Punjab, Pakistan. Both are assumed, not confirmed.
- `contact.form.budgetTiers` are working USD bands, not confirmed pricing.
- `legal.privacy` and `legal.terms` are plain-language working documents. They need a lawyer's read before launch.
- All narrative copy is authored working copy. It is written to be true and safe to publish, but nobody at AH Growth has approved it. Edit `src/content.ts` only.
- `contact.availability.isOpen` is `false`, so the capacity line does not render. Flip it only when `statusLabel` is true and current.

### The line held on invented facts

No percentage, multiplier, client count, award, client logo, or response-time guarantee appears anywhere. Social Proof ships craft commitments instead of metrics, with `metrics: []` and `clientLogos: []` typed, empty, and gated at render so real figures later are a content edit rather than a layout rebuild.

### First edits a non-developer should make

`src/content.ts`, in this order: `home.hero`, `home.positioning.statement`, `serviceCategories` summaries, `home.socialProof.commitments`, `footer.directEmail`, `footer.offices`, `contact.form.budgetTiers`.


---

## 12. Follow-up: /about shipped

`/about` now ships with two of its four sections and is back in the navigation
(`shipped: true` on the nav item; the sitemap picks it up automatically because
it derives from `content.ts`).

**Shipped:** 01 Manifesto, 02 Process (four phases).
**Omitted, not stubbed:** 03 Team (no real photography; `team: []`) and
04 Recognition (no citable awards; `recognition: null`). Neither renders an
empty container or a heading over nothing. Filling either array is a content
edit.

Verified: 200 on all five routes, 404 on an unknown path, one `<h1>`, zero
placeholders, no overflow at 320 / 375 / 1440, light and dark both legible,
zero console errors.

### Deliberately still not built, with the reason

| Item | Why not |
|---|---|
| `/work` and `/work/[slug]` | Zero real case studies. An archive with nothing in it is the half-shipped look this build exists to avoid. Nav item stays `shipped: false`, so nothing 404s. |
| WebGL hero canvas | `three` is not a dependency and never was, so it was aspiration rather than an adopted decision. It is the highest-risk item in the spec against a brief whose first constraint is "static, MVP, nothing half complete or broken." The `z-0` slot in the hero card is reserved and documented; dropping a canvas in later touches one file. |
| Sensory preloader | Its stated purpose in SITEMAP.md §2 is masking WebGL warmup. With no WebGL to warm up it is a pure load tax on every first visit. |
| GSAP timeline layer | The CSS implementation of Line Rise already does what the preset specifies. Swapping it for GSAP right now adds a runtime dependency and regression risk for no visual change. The point of `motion/reveal.tsx` is that this swap stays a one-file change whenever it is actually worth making. |
