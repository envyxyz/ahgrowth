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
- [ ] Hero rebuilt as full-bleed media
- [ ] Positioning rebuilt as centred capsule statement
- [ ] Editorial trio section built
- [ ] Capabilities track height fixed
- [ ] Commitments bento visual variation
- [ ] CTA outro media panel
- [ ] Header and footer refinement
- [ ] Verification sweep, gates, commit

`ANTIGRAVITY-IMAGES.md` is being written by a background agent.
