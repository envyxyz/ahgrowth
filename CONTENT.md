# AH Growth — Content Source of Truth

> Mirrors `src/content.ts` field-for-field. Update this file first, then mirror into `content.ts` in the same pass. `[PLACEHOLDER]` = no verified real value yet, never replace with invented copy.

## Global

**Meta**
- Site name: AH Growth
- Default title: [PLACEHOLDER]
- Default description: [PLACEHOLDER]

**Nav** (Work / About / Contact only, Home = logo mark)
| Label | Href | Hover label (panel roll-reveal) |
|---|---|---|
| Home | / | — (logo, not listed) |
| Work | /work | See the work |
| About | /about | Who we are |
| Contact | /contact | Reach out |

- CTA: "Start a project" → `#start` (scrolls to CTA Outro on Home)
- Menu label (mobile collapsed chrome): Menu
- Channels label (nav panel sub-list): Channels
- Home pill label (scrolled-state island, current section): Home

**Footer**
- Offices: none yet (empty until confirmed)
- Direct email: [PLACEHOLDER]
- Social/Channels: none yet (empty until confirmed — panel Channels list stays hidden)
- Back to top: "Let's go up"
- Legal: Privacy Policy (/privacy), Terms of Use (/terms)
- Wordmark: AH Growth
- Copyright: © {year} AH Growth. All rights reserved.

## Service Taxonomy
None yet. Placeholder structure only — real AH Growth services not yet confirmed.

## Home (/)

**00 — Preloader:** skeleton, not built this phase.

**01 — Hero**
- Eyebrow: [PLACEHOLDER]
- Headline: [PLACEHOLDER]
- Subheadline: [PLACEHOLDER]
- CTA: "Explore now" → /work
- Metrics: none yet

**02 — Positioning:** statement [PLACEHOLDER]

**03 — Capabilities:** eyebrow "What we do", heading [PLACEHOLDER]

**04 — Selected Work:** eyebrow "Selected work", heading [PLACEHOLDER], no featured slugs yet

**05 — Social Proof:** eyebrow "Social proof", no client logos yet, bento stats all [PLACEHOLDER]

**06 — Studio Culture:** not built (no real assets), stays `null`

**07 — CTA Outro** (anchor `#start` — header CTA target)
- Headline: [PLACEHOLDER]
- CTA: "Start a project" → /contact

**08 — Footer:** see Global Footer above

## Work / About / Contact

Not built this phase (skeleton section markers only where referenced). See `src/content.ts` for full field shape.

---

## Notes on this pass

- Nav panel excludes Home (logo already routes home) — matches header spec in `assets/design/design-ahgrowth.md`.
- Channels sub-list renders conditionally: hidden until `footer.social` has real entries. No invented handles.
- `nav.cta.href` set to `#start` for the current single-page (Home-only) build. Revisit once `/contact` exists as a separate route target for the global CTA.
