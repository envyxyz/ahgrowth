# AH Growth Website — Project Memory

## Project

AH Growth agency marketing site.

**Stack:** Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui on Radix primitives, GSAP with ScrollTrigger, Motion (formerly Framer Motion), Lenis for smooth scroll.

## Design direction

**Locked.** Full spec: `assets/design/design-ahgrowth.md` (Google alpha-spec format — colors, typography, spacing, radius, elevation, and every component's token references). Strictly monochromatic base (obsidian canvas, zinc borders, near-white ink) with a restrained ruby accent (`#e11d48`) used only as ambient glow, hairline border tint, or micro-badges/CTAs — never a flat fill. Type is Bricolage Grotesque across every functional role (display through caption), plus one signature move: an oversized stroke-only Boldonse word (`.type-display-outline`) layered behind hero/section content, used once per major section at most.

### Token architecture

Don't hand-write hex/px/ms values in components — every visual and motion value already exists as a token:

- `src/styles/tokens.css` — CSS custom properties (colors, radius, spacing, elevation shadows, typography roles). Source of truth for the cascade.
- `src/styles/typography.css` — `.type-display-lg`, `.type-heading-1`, `.type-body-md`, etc. Use these classes for text instead of composing raw Tailwind size/weight/tracking utilities by hand.
- `src/lib/fonts.ts` — `next/font/google` loaders for Bricolage Grotesque + Boldonse, exposed as CSS vars on `<html>`.
- `src/lib/design-tokens.ts` — JS-consumable mirror of the same colors/radius/spacing, plus motion constants (lerp, wheel multiplier, easing curves, per-preset durations) reverse-engineered in `assets/design/inspirations/presets/*.md`. Use this for GSAP/Lenis config instead of re-deriving tuning numbers per component.
- `tailwind.config.ts` — maps all of the above to Tailwind utilities (`bg-primary`, `text-ink-muted`, `rounded-lg`, `p-xl`, `shadow-elevation-2`, `ease-inertia`, `duration-interactive`, etc).

If you change a token, update `design-ahgrowth.md` first, then mirror the value into `tokens.css` and `design-tokens.ts` in the same pass.

## Section order

**Locked.** Full route tree and per-section architecture: `SITEMAP.md`. Five routes (`/`, `/work`, `/work/[slug]`, `/about`, `/contact`); Home has 8 sections (Hero → Positioning → Capabilities Carousel → Selected Work → Social Proof → Studio Culture → CTA Outro → Footer). Do not add, remove, or reorder sections without updating `SITEMAP.md` first.

## Constraints

- Core motion stack is GSAP, Motion, and Lenis (scroll). Three.js/WebGL and custom GLSL shaders are additionally permitted, scoped to the hero canvas, the sensory preloader, and (future roadmap) the About page's 3D photogrammetry model — not a general-purpose animation library to reach for elsewhere.
- Any WebGL feature must ship with a static/CSS fallback for `prefers-reduced-motion`, WebGL-unavailable browsers, and low-power mobile devices (see `assets/design/inspirations/inspirations.md` Element 3 for the pattern: pause the render loop off-viewport via `IntersectionObserver`, fall back to a static WebP render).
- All motion wrapped in `prefers-reduced-motion`

## Execution & Delivery Rules

- **Don't over-engineer**: Deliver lean, concise, and optimal outputs. Avoid unnecessary abstractions or bloat.
- **High confidence**: Execute decisively with high confidence.
- **Parallel execution**: Run parallel agents/subagents to get tasks done sooner whenever applicable.
- **Mission-critical reliability**: Outputs must work correctly and reliably without breaking.

## `src/content.ts` is the only place copy lives in code (hard rule)

There is no separate `CONTENT.md`. `src/content.ts` is the single source of truth for every piece of user-facing copy on the site, and every component reads from it. This is not optional and not per-component discretion.

- **No hardcoded user-facing strings in components.** Headings, body copy, labels, button text, alt text, stat numbers, nav items, footer links: all of it comes from `import { content } from "@/content"`, never a literal string typed inline in a `.tsx` file. Aria-labels and other pure accessibility/structural chrome (dialog close labels, landmark roles) are the one exception — those aren't editorial content and don't need a `content.ts` entry.
- **One fact, one field.** If the same number, name, or phrase shows up in more than one section, it lives once in `content.ts` and every usage references that field (or an index/key into it), never a second copy of the literal string.
- **Structure mirrors `SITEMAP.md`.** One top-level key per route, one nested key per numbered section within that route. If a section is added, removed, or reordered in `SITEMAP.md`, mirror the shape change into `content.ts` in the same pass.
- **`PLACEHOLDER` marks unverified content, not a string to quietly replace with something plausible.** `content.ts` exports a `PLACEHOLDER` constant. Any field still holding it means real copy/data hasn't been confirmed yet — build the component against the field, but do not invent copy, stats, awards, or pricing to fill it. Sections that SITEMAP.md says to omit entirely until real assets exist (Studio Culture, Recognition) are typed as `null` rather than holding placeholder copy; treat `null` as "not built yet," not as an empty state to design around.
- **Before adding any new visible text to a component**, check whether `content.ts` already has a field for it. If not, add the field to the right section of `content.ts`, then reference it. Never take the shortcut of typing the string directly into the component "for now."
- **When reviewing or extending any component**, grep it for quoted string literals in JSX/props first. A stray hardcoded string is a bug, not a style nit.

## Copy style

- No em dashes anywhere in copy shown to the user (headings, body text, labels, alt text). Use a comma, colon, semicolon, or a new sentence instead. En dashes in numeric ranges (`5am–10pm`, `Mon–Fri`) are fine; the em dash specifically is not.
- Keep copy professional and grounded: plain, active sentences, concrete specifics over vague marketing language, no invented statistics.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
