# AH Growth Website — Project Memory

## Project

AH Growth agency marketing site.

**Stack:** Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui on Radix primitives, GSAP with ScrollTrigger, Motion (formerly Framer Motion), Lenis for smooth scroll.

## Design direction

**Locked.** Full spec: `assets/design/design-ahgrowth.md`. Derived from the reference set in `assets/design/inspirations/` (Stodio, Seative, Lovera, Blueprint, Lumifya) — study those before changing anything visual.

Light monochromatic base: off-white canvas (`#f2f1ef`) with deliberate near-black contrast blocks (`#111110`) for the hero, capabilities, CTA outro and footer, plus a single vermilion accent (`#ea4127`). Type is **Geist** across every functional role, with **Geist Mono** reserved strictly for small uppercase micro-labels (`.type-eyebrow`). One signature move: the brand wordmark set enormous and ghosted almost into the surface behind the hero and footer (`.type-ghost`).

Three rules that are easy to get wrong:

1. **Spacious by default.** `--layout-section-y` is 96–180px fluid and the spacing scale runs to `6xl` (176px). If a layout feels tight the fix is more space, not smaller type.
2. **Borders are structural, not decorative.** Cards, panels and buttons are never outlined — they separate by fill. Dividers are kept where they do real structural work (the rule under each stat, the footer meta rule, nav list separators), and nowhere else.
3. **Light and dark are one system.** Both palettes define every token; only color values differ. Spacing, radius, type and motion are shared and must stay byte-identical across themes.

### Token architecture

Don't hand-write hex/px/ms values in components — every visual and motion value already exists as a token:

- `src/styles/tokens.css` — CSS custom properties. Holds both palettes: `:root` is light, with dark declared under `prefers-color-scheme` and again under `[data-theme="dark"]` so the toggle wins in both directions. Source of truth for the cascade.
- `src/styles/typography.css` — `.type-display-xl`, `.type-stat`, `.type-body-md`, `.type-eyebrow`, etc. Use these instead of composing raw Tailwind size/weight/tracking utilities by hand.
- `src/lib/fonts.ts` — `next/font/google` loaders for Geist + Geist Mono, exposed as CSS vars on `<html>`.
- `src/lib/design-tokens.ts` — JS mirror: `lightColors`/`darkColors`, plus `easing`, `duration` and per-preset motion constants. For anything rendering at runtime use `readColor()`, which reads the live CSS variable so it stays correct when the theme flips.
- `src/components/providers/theme.tsx` — theme state, `localStorage` persistence, and `themeInitScript` (inlined in `<head>` to prevent a flash). `src/components/ui/theme-toggle.tsx` is the fixed bottom-right switch; page content in that corner must clear 72px.
- `tailwind.config.ts` — maps all of the above to utilities (`bg-canvas`, `text-ink-muted`, `bg-inverse`, `text-on-inverse`, `bg-chrome`, `p-card`, `px-inset`, `py-section-y`, `ease-smooth`, `duration-layout`, …).

Semantic tokens carry theme meaning, so pick the right one: `surface` is a card on the canvas, `inverse` is a deliberate dark contrast block (dark in **both** themes), `chrome` is a floating control that passes over arbitrary sections. Never use `surface` on an inverse block — it collapses into it in the dark palette.

If you change a token, update `design-ahgrowth.md` first, then mirror the value into `tokens.css` and `design-tokens.ts` in the same pass.

### Motion

`--ease-out-soft` for hovers/chrome, `--ease-smooth` (ease-in-out) for CTAs and layout tweens, `--ease-inertia` only for reveal-length entrances (700ms+) — it reads as twitchy on anything shorter. Durations: `micro` 200ms, `interactive` 400ms, `layout` 600ms, `reveal` 800ms. CTA buttons deliberately run slow (the cursor-fill sweep is 900ms in / 720ms out on `ease-smooth`).

## Section order

**Locked.** Full route tree and per-section architecture: `SITEMAP.md`. Five routes (`/`, `/work`, `/work/[slug]`, `/about`, `/contact`); Home has 8 sections (Hero → Positioning → Capabilities Carousel → Selected Work → Social Proof → Studio Culture → CTA Outro → Footer). Do not add, remove, or reorder sections without updating `SITEMAP.md` first.

## Constraints

- Core motion stack is GSAP, Motion, and Lenis (scroll). Three.js/WebGL and custom GLSL shaders are additionally permitted, scoped to the hero canvas, the sensory preloader, and (future roadmap) the About page's 3D photogrammetry model — not a general-purpose animation library to reach for elsewhere.
- Any WebGL feature must ship with a static/CSS fallback for `prefers-reduced-motion`, WebGL-unavailable browsers, and low-power mobile devices (see `assets/design/inspirations/inspirations.md` Element 3 for the pattern: pause the render loop off-viewport via `IntersectionObserver`, fall back to a static WebP render).
- All motion wrapped in `prefers-reduced-motion`

## Execution & Delivery Rules

- **Don't over-engineer**: Deliver lean, concise, and optimal outputs. Avoid unnecessary abstractions or bloat.
- **High confidence**: Execute decisively with high confidence.
- **Parallel execution**: Run parallel agents/subagents to get tasks done sooner whenever applicable. Do not fan out to re-read files the calling session has already loaded; that is cost without information.
- **Mission-critical reliability**: Outputs must work correctly and reliably without breaking.
- **Active plan**: `PLAN.md` holds the current build's phases and gates. `AUDIT-GEMINI.md` is a re-runnable third-party audit brief, not a build instruction. Never mark a phase done until its gate is proven by a command's exit code or a screenshot, not by reasoning about it.

## Working discipline

The failure mode on this project is not a hard bug. It is a hundred small drifts: a string typed inline "for now", an arbitrary `[24px]` instead of `p-lg`, a second card component that already existed, a "done" claimed without running the build. Each is invisible alone and fatal in aggregate. These guards exist to catch drift at the moment it happens, not at review.

### Before writing any component

Run this check every time, even when the answer feels obvious:

1. **Does this primitive already exist?** `ls src/components/ui/` before creating anything there. Two components solving one problem is worse than one imperfect component.
2. **Does `content.ts` already have a field for every string this renders?** If not, add the field first, in a separate edit, then write the component. Never in the other order, and never "I'll wire it up after."
3. **Which tone is this on?** Canvas, surface, or inverse. Pick the text and fill tokens for that tone before writing markup. `surface` on an inverse block is invisible in the dark palette, and it will not be caught by typecheck, lint, or a light-mode screenshot.
4. **What does this look like at 375px?** Decide before writing, not after the desktop version is finished. Retrofitting mobile onto a desktop-first layout is where the fixed pixel values sneak in.

### Before claiming anything is done

- Ran `npx tsc --noEmit`, `npm run lint`, and `npm run build`, and read the exit codes. "It should compile" is not a status.
- Looked at the rendered result at 375px **and** 1440px, in **both** themes. Four screenshots. A section verified in one theme is a section verified half way.
- Grepped the files just written for `#`, `[NNpx]`, `[NNms]`, and quoted strings in JSX.
- If any part of the task was skipped or blocked, said so explicitly. Silent scope reduction is the worst outcome available, worse than an honest incomplete.

### Thinking tactics that prevent the expensive mistakes

**Read before you edit, always.** Never edit a file whose current contents are not in context. The most costly errors on this codebase come from writing against a remembered version of a file rather than the actual one.

**Trace one full path before building the pattern.** Before building five service cards, build one end to end: `content.ts` field → component → rendered pixel at three widths in two themes. Then replicate. Building all five and discovering the token choice was wrong costs five rewrites.

**Fix causes, not symptoms.** If text overflows, do not add `overflow-hidden`. Find why the box is too small. If a color looks wrong, do not hardcode the right one. Find which semantic token was the wrong choice. A symptom fix in a design system propagates the original error to everything downstream of it.

**Name the failure before you fix it.** State in one sentence what is broken and why, then fix it. If that sentence cannot be written, the cause is not understood yet and the fix will be a guess.

**Verify per phase, never in one batch at the end.** A defect introduced in the content layer and found during final QA costs every phase built on top of it. Gate each phase before starting the next.

**When two rules appear to conflict, the stricter one wins and the conflict gets reported.** `CLAUDE.md` rules do not have exceptions that are discovered mid-build. If a rule genuinely blocks the work, say so and ask, do not quietly route around it.

**Distrust plausible-looking content most of all.** An invented statistic reads exactly like a real one. That is precisely why the rule exists. Narrative copy can be authored; a measurement cannot.

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
