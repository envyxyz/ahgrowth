# Homepage Redesign — in progress

> Triggered by a side-by-side against `assets/design/inspirations/images/primary.jpg`.
> The shipped homepage was a text document with two images. This rebuilds it as
> the image-led editorial layout the reference actually is.

## Design read

Redesign-overhaul of an agency landing page for prospective clients, crimson
editorial language, built on the existing token system plus real photography
and scroll choreography.

**Dials: DESIGN_VARIANCE 9 / MOTION_INTENSITY 7 / VISUAL_DENSITY 3** (agency-creative preset).

## Audit of the shipped homepage (what was wrong)

| # | Failure | Rule broken |
|---|---|---|
| 1 | Hero was text on a flat black rectangle. No image at all. | "Hero needs a real visual. Text + gradient blob is a placeholder." |
| 2 | ~3000px of empty black where the pinned carousel's 500vh track sits. | Layout discipline. |
| 3 | Zero imagery outside the 5 service cards. | "Even minimalist sites need real images. Pure-text is incomplete work." |
| 4 | Every section was eyebrow, two-tone heading, body, card grid. One layout family across the whole page. | Section-Layout-Repetition: need 4+ families. |
| 5 | 3 eyebrows across 5 sections. | Max ceil(sections / 3). |
| 6 | Commitments bento was 4 flat text cards. | Bento Background Diversity: 2-3 cells need real visual variation. |
| 7 | Everything left-aligned, no compositional variety, no floating elements. | Anti-center-bias / variance dial. |

## New section architecture (one layout family each)

| # | Section | Layout family | Imagery |
|---|---|---|---|
| 01 | Hero | Full-bleed media overlay | `hero/hero-primary.jpg` + mobile variant, dark scrim, floating glass claim card bottom-left, service pill row bottom-right |
| 02 | Positioning | Centred editorial type | Two pill-masked capsules set inside the statement (`blobs/blob-01`, `blob-02`) |
| 03 | Editorial trio | Asymmetric media grid | `editorial/editorial-01..03.jpg` at staggered vertical offsets |
| 04 | Capabilities | Horizontal scroll hijack | Existing 5 service plates. Track height reduced from 500vh. |
| 05 | Commitments | Bento grid | One cell gets `texture/gradient-card.jpg` |
| 06 | CTA Outro | Split CTA with media panel | `texture/gradient-card.jpg` |
| 07 | Footer | Column rail | Ghost wordmark |

Six distinct families. Eyebrows cut to 2 (hero, capabilities).

## Image manifest

8 files. All paths are already referenced in code and seeded with copies of the
service plates, so the page renders correctly right now. `ANTIGRAVITY-IMAGES.md`
holds the generation prompts. Overwriting a file in place is the entire wiring
step; nothing needs renaming.

```
public/images/hero/hero-primary.jpg          2400x1600
public/images/hero/hero-primary-mobile.jpg   1200x1600
public/images/editorial/editorial-01.jpg     1200x1600
public/images/editorial/editorial-02.jpg     1200x1600
public/images/editorial/editorial-03.jpg     1200x1600
public/images/blobs/blob-01.jpg               480x280
public/images/blobs/blob-02.jpg               480x280
public/images/texture/gradient-card.jpg      1600x1200
```

## Status

- [x] Image directories created and seeded from existing service plates
- [x] `content.ts` extended: hero media + floating card + tag row, capsule
      statement, editorial trio, commitment imagery, CTA media panel
- [x] `SITEMAP.md` + `CLAUDE.md` renumbered for the new §03 Editorial Trio
- [x] Hero rebuilt as full-bleed media
- [x] Positioning rebuilt as centred capsule statement
- [x] Editorial trio section built
- [x] Capabilities restructured: centred heading above, copy moved onto the
      cards, track height cut from 500vh
- [x] Commitments bento visual variation
- [x] CTA outro media panel
- [x] Header and footer refinement
- [x] Verification sweep (see below)
- [ ] Header rebuild (separate pass)
- [ ] Commit

## Token work this required

Three gaps in the token system surfaced once photography entered the page,
and each was closed at the token layer rather than patched in a component:

| Token | Why it had to exist |
|---|---|
| `--color-scrim-media-strong` / `-mid` / `-soft` | Text over full-bleed photography needs a graded wash. Tailwind opacity modifiers do not apply to `var()`-valued colors, so `bg-inverse/40` silently does nothing. Three stops, keyed to `--color-inverse` per palette. |
| `--color-plate` / `--color-on-plate` / `--color-on-plate-muted` | The hero's floating claim card sits on photography that is dark in **both** themes, so it must stay light in both. `surface` collapses into it in the dark palette and `chrome` is dark, so it would vanish. Same rationale that justified `chrome`. |
| `motion.carousel.trackVhPerCard` | The 500vh track was a magic number typed inline. It is now a named constant with the reasoning attached. |

## Deliberate deviations from the locked spec

- **The ghosted wordmark is gone from the hero**, and now appears only in the
  footer. At `--color-ghost-inverse` (5.5% white) it reads as a smudge over
  photography rather than as a mark. `design-ahgrowth.md` describes it as a
  hero-and-footer signature; this keeps the footer half.
- **`primary.jpg` puts "85%" in the hero's floating card.** A short claim goes
  there instead. That percentage is a measurement, and the no-invented-statistics
  rule bars it until AH Growth supplies a real figure. `home.hero.metrics` stays
  typed and empty for exactly that.
- **The capabilities caption rail is gone.** Copy moved onto the cards, per
  `primary.jpg`. The rail made this the fourth "label, heading, body, grid"
  block in a row, and it rendered exactly once in any page-length scrub.

`ANTIGRAVITY-IMAGES.md` is written: 8 prompts, one per manifest path, plus a
shared house-style block, a negative-prompt block, and an acceptance checklist.

## Verification

Run against the production build (`npm run build && npm run start`), driven by
Playwright on the system Chrome.

| Gate | Result |
|---|---|
| `npx tsc --noEmit` | exit 0 |
| `npm run lint` | exit 0 |
| `npm run build` | exit 0, 11 routes, all prerendered static |
| Horizontal overflow at 375 / 768 / 1440, light + dark | 0px in all six |
| Console errors + page errors, all six | none |
| HTTP >= 400 on any request, all six | none |
| Raw hex / `[NNpx]` / `[NNms]` in `sections`, `ui`, `motion` | none |
| Hardcoded JSX string literals | none |
| `PLACEHOLDER` or em dashes in rendered HTML | none |
| Reduced motion at 1440 | pinned branch `display:none`, stacked grid visible, every `[data-reveal]` at opacity 1, no errors |
| Motion allowed at 1440 | pinned branch visible, stacked grid `display:none` |
| Page height at 1440 | 8522px before the track fix, 7910px after |

### The one thing a full-page screenshot will still show

The capabilities section is a `position: sticky` panel over a scroll track. In
a real browser the panel is on screen for the whole track. In a stitched
full-page capture it is painted once at the top and the remaining track renders
as flat black, so a screenshot of the whole page shows a gap that a visitor
never sees. Scroll-position captures inside the track (saved during
verification) show the row centred and handing off correctly.

The track was cut from 500vh to 280vh anyway, because five viewports of scroll
for five cards was too much regardless of how it captures.
