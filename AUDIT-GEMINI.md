# AH Growth — Repeatable Audit Prompt (Gemini 3.8 Flash, High reasoning)

> **What this is.** A self-contained audit brief you can paste into Gemini at any point in the build. It is designed to be run **many times**: after each phase of `PLAN.md`, after any large change, and once before launch.
>
> **What this is not.** A build plan. Gemini is auditing here, not implementing. It reads, judges, and writes findings. The findings then get applied by the implementing agent (or by Gemini, in Fix Mode, one file at a time).
>
> **Why this split.** Gemini at high reasoning is strongest at single-shot visual and layout judgment: spatial reasoning, contrast, rhythm, SVG and CSS precision. It is weaker as an autonomous multi-file agent inside a typed codebase with strict house rules. So it gets the job it wins at (looking at the thing and saying what is wrong) and not the job it loses at (writing forty coupled files).

---

## How to run it

1. Open Gemini 3.8 Flash with **thinking level: High**.
2. Attach or paste: `CLAUDE.md`, `PLAN.md`, `SITEMAP.md`, `assets/design/design-ahgrowth.md`, `src/content.ts`, `src/styles/tokens.css`, `tailwind.config.ts`, and the source files in scope for the phase you are auditing.
3. Attach screenshots if you have them (see §Visual Audit). Screenshots are where this model earns its keep, so include them whenever they exist.
4. Paste everything from `=== PROMPT START ===` down.
5. Set `PHASE` and `MODE` in the header block before sending.

---

```
=== PROMPT START ===

PHASE: <0 | 1 | 2 | 3 | 4 | 5 | pre-launch>
MODE: <AUDIT | FIX>
```

## Role

You are auditing a Next.js 15 / React 19 / TypeScript / Tailwind marketing site for a growth agency called AH Growth. The codebase has a strict, already-locked design system and a strict content architecture. **Your job is to find where the code violates its own stated rules, and where the rendered result would read as unfinished or broken to a first-time visitor.**

You are not redesigning it. The visual direction is locked. Do not propose a new palette, a new type scale, a new section order, or a new library. Findings that amount to "I would have designed this differently" are noise and cost you credibility. Findings that amount to "this violates the project's own rule at file:line" are the entire point.

## The rules this codebase must obey

These are not suggestions from me. They are written into the project's own `CLAUDE.md` and design spec. Audit against them literally.

**R1 — Content.** `src/content.ts` is the only place user-facing copy lives. No heading, body line, label, button text, alt text, stat, nav item, or footer link may appear as a string literal inside a `.tsx` file. Pure accessibility chrome (`aria-label`, `role`) is the sole exception.

**R2 — One fact, one field.** If the same number, name, or phrase appears in two sections, it exists once in `content.ts` and both reference it. A second copy of the same literal is a defect.

**R3 — Tokens only.** No hex colors, no raw pixel values, no raw millisecond values in components. Everything comes from `src/styles/tokens.css` (via Tailwind utilities like `bg-canvas`, `px-inset`, `py-section-y`, `ease-smooth`) or from `src/lib/design-tokens.ts` for JS-side values.

**R4 — Typography classes.** Type is applied with `.type-display-xl`, `.type-body-md`, `.type-eyebrow`, etc., never by hand-composing Tailwind size + weight + tracking utilities.

**R5 — Borders are structural, not decorative.** Cards, panels, and buttons separate by **fill**, never by outline. Dividers survive only where they do real structural work (the rule under a stat, the footer meta rule, nav list separators). A decorative border is a defect.

**R6 — Semantic surface tokens.** `surface` = a card on the canvas. `inverse` = a deliberate dark contrast block, which stays dark in **both** themes. `chrome` = a floating control passing over arbitrary sections. **Using `surface` on an inverse block is a hard defect**: it collapses into the block in the dark palette and the element vanishes.

**R7 — Light and dark are one system.** Both palettes define every token. Only color values differ. Spacing, radius, type, and motion must be byte-identical across themes.

**R8 — Spacious by default.** `--layout-section-y` is 96–180px fluid; the spacing scale runs to 176px. If something looks cramped, the fix is more space, never smaller type.

**R9 — No em dashes in any copy a visitor reads.** Comma, colon, semicolon, or a new sentence. En dashes inside numeric ranges (`5am–10pm`) are fine. The em dash specifically is not.

**R10 — No invented facts.** No percentages, multipliers, client counts, revenue figures, award names, client logos, or response-time guarantees unless they are verified. Narrative copy is authored placeholder and is fine. A fabricated *measurement* is not.

**R11 — Motion discipline.** `--ease-out-soft` for hovers and chrome. `--ease-smooth` for CTAs and layout tweens. `--ease-inertia` **only** for entrances of 700ms or longer; on a short hover it reads as twitchy. Durations: micro 200ms, interactive 400ms, layout 600ms, reveal 800ms.

**R12 — Reduced motion.** Every animation has a `prefers-reduced-motion: reduce` fallback. Under reduced motion, Lenis must not initialize and reveals must render at their final state immediately.

## What to audit, by phase

Audit **only** the checklist for the declared `PHASE`, plus the Always list. Auditing out-of-phase work produces findings about things that are deliberately not built yet, which wastes the run.

**Always, every phase:**
- R1, R2, R3, R4 violations with exact `file:line`.
- Any `href` pointing at a route that has no `src/app/<route>/page.tsx`. A 404 from the site's own navigation is the most damaging defect class here.
- Any text that renders as `[PLACEHOLDER]` on a route that is supposed to be shippable.
- Console errors, React key warnings, hydration mismatches.

**Phase 0 (foundation):** token additions mirrored in all three places (`tokens.css`, `design-tokens.ts`, `design-ahgrowth.md`); `:focus-visible` present and visible on **both** light and dark surfaces; no invalid HTML nesting (interactive inside interactive); Lenis and native scroll not fighting each other.

**Phase 1 (content):** R9 and R10 sweep across every string in `content.ts`. Read it as a skeptical stranger: does any sentence assert something the agency cannot back up? Does any read as machine-written filler? Flag vague phrasing that carries no information ("we deliver excellence", "cutting-edge solutions", "results that speak").

**Phase 2 (primitives):** each primitive is used at least twice or is deleted; no two primitives solve the same problem; every one renders correctly on canvas, surface, **and** inverse tones; props are the ones the deferred upgrade will need.

**Phase 3 (home) / Phase 4 (contact, legal):** R5, R6, R8 per section. Heading hierarchy: exactly one `<h1>` per route, no skipped levels. Every image has meaningful alt text sourced from `content.ts`. Every grid collapses to one column below 768px.

**Phase 5 / pre-launch:** the full sweep. Add: metadata present and sourced from `content.ts`; `robots.txt` and `sitemap.xml` resolve; 404 page is designed; keyboard path complete on every route; touch targets ≥44px.

## Visual audit (only when screenshots are attached)

This is the part to spend your reasoning budget on. For each screenshot, in this order:

1. **Would a stranger call this finished?** Name the single strongest signal of "unfinished" if there is one. Empty regions, orphaned headings with nothing under them, one card in a three-column grid, text colliding with the ghost wordmark, a section that is all label and no content.
2. **Vertical rhythm.** Do the gaps between sections read as one system, or does one section have visibly different breathing room than its neighbours?
3. **Optical alignment.** Do the section text rails actually line up with the hero card's edge? Large display type often needs optical, not mathematical, alignment.
4. **Contrast.** Any text below WCAG AA against its actual background. Check muted-on-dark and muted-on-surface specifically, in both themes.
5. **The ghost wordmark.** It should read as a deliberate ghosted brand mark clipped by its container. If it reads as an accidentally cropped word, say so and say at which width it breaks.
6. **Responsive integrity.** Horizontal overflow, text overlapping, buttons wrapping mid-label, a fixed control covering content (the theme toggle sits bottom-right and needs 72px of clearance).

## Output contract

Return exactly this. No preamble, no summary paragraph, no restating the brief.

### Part 1 — Findings table

| # | Sev | Rule | File:line | What is wrong | Exact fix |
|---|---|---|---|---|---|

- **Sev:** `BLOCKER` (ships broken or violates R1/R6/R10) · `MAJOR` (visibly wrong or violates a rule) · `MINOR` (polish).
- **Rule:** the R-number, or `VISUAL` for screenshot findings.
- **Exact fix:** the actual replacement, not a description of one. Write `bg-inverse-soft` not "use the correct token".
- Order by severity, then by file.
- If you find nothing at a severity level, write one row saying so. Do not pad the table.

### Part 2 — Confidence

For each finding you could not verify from the files given (you inferred it, or you needed a file you did not receive), list the finding number and what you would need to confirm it. Be honest here. A confidently-stated wrong finding costs more than an admitted gap.

### Part 3 — Verdict

One of:
- `PASS` — phase gate met, proceed.
- `PASS WITH FIXES` — no blockers; list the finding numbers to fix before the next phase.
- `FAIL` — at least one BLOCKER; the phase is not done.

Then one sentence on the single highest-leverage thing to fix next.

## If MODE is FIX

Everything above still applies, and then:

- Fix **only** the findings listed in the `TARGET` line the operator provides. Do not fix things you notice along the way; report them instead.
- One file at a time. Output the complete changed file, not a diff fragment, and not the whole repo.
- Do not add a dependency. Do not add an abstraction. Do not rename an existing export. Do not reformat lines you did not change.
- If a fix would require touching `src/content.ts` and a component together, say so and do the `content.ts` half first as its own output.
- After each file, state in one line what you changed and which finding number it closes.

=== PROMPT END ===
```

---

## Suggested cadence

| When | PHASE | MODE | Attach |
|---|---|---|---|
| After Phase 0 | 0 | AUDIT | tokens.css, tailwind.config.ts, design-tokens.ts, header files, globals.css |
| After Phase 1 | 1 | AUDIT | content.ts alone. This run is a pure copy read; extra files dilute it. |
| After Phase 2 | 2 | AUDIT | every file in `src/components/ui/` and `src/components/motion/` |
| After Phase 3 | 3 | AUDIT | `src/app/page.tsx`, all home sections, **plus screenshots at 375 / 768 / 1440 in both themes** |
| After Phase 4 | 4 | AUDIT | contact + legal routes, plus screenshots |
| Before launch | pre-launch | AUDIT | everything, plus the full 48-screenshot matrix |
| Any time | — | FIX | the specific files, with a `TARGET: #3, #7, #12` line |

**Reading the output.** Treat findings as claims to verify, not instructions to apply. Check the `file:line` before acting. Cross-model audits are valuable precisely because the auditor does not share the builder's blind spots, which is the same reason it will sometimes flag deliberate decisions as defects. Part 2 exists so you can see which findings the model itself is unsure about.
