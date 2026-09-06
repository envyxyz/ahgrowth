# AH Growth — Site Structure (LOCKED)

> Status: **Locked**. This is the authoritative page/section architecture for the entire build. Do not add, remove, or reorder sections without updating this file first. Copy itself lives in `CONTENT.md` / `src/content.ts`, never here — this file governs structure only.

Adapted from an initial Gemini-generated blueprint (`assets/optimized-creative-agency-site-blueprint.md`), audited against `assets/design/inspirations/inspirations.md` and this project's own constraints (see "Deviations from the draft" at the bottom).

---

## 1. Route Tree

```
/                       Home
/work                   Work Archive
/work/[slug]            Case Study
/about                  About
/contact                Project Inquiry
```

Five routes. No services route, no blog, no separate pricing page at launch — capabilities live on Home, and everything funnels to `/contact`.

---

## 2. Home (`/`)

| # | Section | Purpose |
|---|---|---|
| 00 | Preloader | Sensory priming, mask WebGL warmup |
| 01 | Hero | Immediate positioning, first impression |
| 02 | Positioning Statement | Cognitive-ease reset after the hero |
| 03 | Capabilities Carousel | What we do |
| 04 | Selected Work | Proof, curated not exhaustive |
| 05 | Social Proof | Client trust, credibility |
| 06 | Studio Culture | Humanize the team *(content-gated, see note)* |
| 07 | CTA Outro | Conversion push |
| 08 | Footer | Wayfinding, contact, legal |

**00 — Preloader**
Minimal monochromatic screen with a fine typographic asset counter (00% to 100%) while the hero's WebGL buffers/shaders warm up in the background. Splits or iris-wipes away on complete to unveil the hero canvas. Session-scoped: fires on first visit per session, not on every internal navigation or repeat load, so it reads as a ritual rather than a tax on returning visitors. Under `prefers-reduced-motion` or if WebGL fails to initialize, skip straight to a static hero with no counter.

**01 — Hero**
Full-viewport real-time WebGL canvas (Three.js/R3F): interactive mesh, liquid-glass refraction, or particle field responding with damped inertia to cursor position. Monumental kinetic headline (GSAP split-text stagger) sits over the canvas; asymmetrical layout with floating status badges/metrics per `primary.jpg`; ambient crimson radial glow (`--accent-glow`) reinforcing the canvas lighting. Primary CTA uses the cursor-origin radial-fill pill button (Element 4). Render loop pauses via `IntersectionObserver` once the hero scrolls out of view, and the whole section degrades to a static/WebP hero when WebGL is unavailable, on low-power devices, or under `prefers-reduced-motion`.

**02 — Positioning Statement**
Generous negative space, large-scale editorial line that scrubs from low-opacity to full contrast on scroll (GSAP ScrollTrigger). One sentence, no invented claims. Functions as the sensory "exhale" after the hero.

**03 — Capabilities Carousel** *(architecture locked in `inspirations.md` §4)*
Full-viewport pinned horizontal carousel. Resting state: card 1 focused/enlarged, remaining cards compact. On scroll, focus hands off between cards; the focused card's background gets the liquid-glass expanding radial blur with sub-categories fading in from the right; unfocused cards stay crisp with just a title. Service taxonomy and sub-categories are placeholders pending AH Growth's actual service list, not the reference taxonomy in the inspiration doc (that was sourced for IA shape, not content).

**04 — Selected Work**
3 to 4 flagship projects only, not a full grid, teased here (Von Restorff isolation). Koto-style layout: sticky left caption column, scrolling right media column, single IntersectionObserver driving the caption swap. Each card links to its full case study.

**05 — Social Proof (Bento Grid)** *(architecture in `inspirations.md` §6, Element 6)*
Monochrome logo marquee paired with an asymmetric Bento Grid for high-impact metric callouts, custom craftsmanship guarantees, and credibility proof (reference: [bento-grid-social-proof.png](file:///c:/Users/ameer/Desktop/AHGrowth-Website/assets/design/inspirations/images/bento-grid-social-proof.png)). Bento modules feature oversized impact figures (`100%`, `4X`, `95%`) coupled with scannable micro-copy driven by the Buzz Interactive **Word Wipe Scrub** (or **Line Rise**) scroll-tied text preset. Metrics count up on viewport entry via GSAP ScrollTrigger with the site's exponential-out inertia curve (`--ease-inertia`). Every number here must come from `content.ts`; until AH Growth supplies real figures, this section ships with an explicit `[PLACEHOLDER]` marker per the content rules in `CLAUDE.md`, not a plausible-looking fake number.

**06 — Studio Culture**
Behind-the-scenes carousel (process shots, workspace, team). Cut this section entirely from the initial build if no real photo/video assets exist yet; do not fill it with stock imagery to preserve the "authentic craft" signal it's meant to send.

**07 — CTA Outro**
Oversized statement line, magnetic pull on the CTA target, cursor-fill pill button leading straight to `/contact`. This is the peak-end close: last thing before the footer, so keep it to one line and one action.

**08 — Footer** *(layout locked in `inspirations.md` §8, "Buzz" architecture)*
Sticky curtain reveal: main content scrolls over it, footer content counter-translates in as it's revealed. Real office/location columns (city, address, direct email) — only include offices AH Growth actually operates from, not decorative "global studio" copy. Social links as outline pills with invert/magnetic hover. "Let's go up" back-to-top control using the exponential-out scroll curve already specified in the inspiration doc.

---

## 3. Work Archive (`/work`)

| # | Section | Purpose |
|---|---|---|
| 01 | Header + Count | Frame the archive's scope |
| 02 | Filter Pills | Fast narrowing by discipline |
| 03 | Showcase Grid | Browse |
| 04 | Reassurance Strip | Catch unlisted-niche visitors |

Single grid view at launch, not the dual grid/table "modality switcher" from the draft — that's a real B2B pattern but it's extra surface area to build and test for a five-page v1; revisit if the work volume grows past what a grid comfortably shows. Filter pills use sticky positioning with FLIP-based reordering (no reload). Grid cards use hover video scrub where a preview reel exists, falling back to a static image otherwise (not every project will have a scrub reel at launch).

---

## 4. Case Study (`/work/[slug]`)

Structure locked from the Off-Brand reference in `inspirations.md` §7, extended with a results section (standard, defensible agency practice) and a lightweight next-project link (not a full URL-morphing "ludic loop", which is a lot of engineering for marginal benefit at v1):

| # | Module |
|---|---|
| 01 | Case Meta Header + Hero Media |
| 02 | The Big Questions (challenge) |
| 03 | Layered Parallax Statement Billboard |
| 04 | Editorial Narrative Bridge (approach) |
| 05 | 2x2 Media Quad Grid |
| 06 | Narrative Milestone (deliverables/system) |
| 07 | Angled Collage (collateral spread) |
| 08 | Dual Vertical Showcase |
| 09 | Results |
| 10 | Next Project |

**09 — Results** exists only when the client has real, verifiable numbers to report (revenue, conversion lift, timeline, etc.) sourced from `content.ts`. Case studies without verified results skip this module rather than inventing a metric, per the no-invented-statistics rule.

**10 — Next Project** is a simple full-width link card to the next case study, optionally enhanced with `document.startViewTransition` where supported; no forced scroll-jacking.

---

## 5. About (`/about`)

| # | Section | Purpose |
|---|---|---|
| 01 | Manifesto | Positioning, who this agency is for |
| 02 | Process | De-risk the engagement |
| 03 | Team | Humanize, build trust |
| 04 | Recognition | *(only if real awards exist — otherwise omitted)* |

**02 — Process** uses AH Growth's actual delivery phases once defined (discovery, strategy, execution, growth/optimization, or whatever the real methodology is) — not the fabricated "3D Prototyping & Sensory Lab" phase from the draft, which assumes WebGL production work this stack doesn't do.

**03 — Team** ships as editorial photography with a simple hover state at launch. The photogrammetry / interactive 3D model treatment from `inspirations.md` Element 3 is explicitly flagged there as a future-roadmap item, not part of the initial locked build (it also requires a WebGL runtime this project doesn't currently include).

**04 — Recognition** only ships once AH Growth has real, citable awards or press. An empty or fabricated trophy wall is worse than no trophy wall; cut the section rather than dress it up.

---

## 6. Contact (`/contact`)

| # | Section | Purpose |
|---|---|---|
| 01 | Availability | Sets expectations honestly |
| 02 | Project Inquiry Form | Primary conversion action |
| 03 | Reassurance | Removes real objections |
| 04 | Direct Contact + Locations | Alternate path in, wayfinding |

**01 — Availability** states real current capacity ("Booking [month/quarter]" or similar) if and only if it's true. No countdown timers or "2 slots remaining" style manufactured scarcity — that's a manipulative pattern, not a persuasion technique worth adopting, and it's a liability the moment it's caught being fake.

**02 — Project Inquiry Form** is the exact architecture locked in `inspirations.md` Element 2: pill-chip multi-select for services needed, pill-chip single-select for budget range, then zero-box underline fields (name, email, company, project details). Budget tiers and service list are placeholders until AH Growth confirms real pricing bands.

**03 — Reassurance** lists only guarantees AH Growth actually honors (response time, who they'll talk to, confidentiality terms) — same rule as everywhere else, no invented SLAs.

**04 — Direct Contact + Locations** mirrors the footer's real office/location data plus a direct email, so this page works even for someone who skips the form.

---

## 7. Global Interaction Rules

These apply everywhere, not per-section:

- **Lenis** for normalized inertia scroll site-wide.
- **GSAP + ScrollTrigger** for every scroll-linked reveal, pin, and scrub.
- **Motion** for discrete UI-state transitions (hover, focus, page-element enter/exit).
- **Three.js / WebGL + custom GLSL shaders are scoped, not general-purpose.** They're reserved for the homepage preloader, the homepage hero canvas, and (future roadmap) the About page's 3D photogrammetry model. Every other "liquid glass," parallax, or distortion effect in this document (the capabilities carousel's radial blur, card hovers, collage tilts) is built from CSS `backdrop-filter`, transforms, and GSAP/Motion timelines, not a canvas/GL context — WebGL stays reserved for the few sections where the sensory payoff justifies the render budget.
- **Magnetic targets** (~25–35px gravity field) on primary CTAs and nav items only, not every clickable element, or the effect stops reading as intentional.
- **Every WebGL section ships a fallback path**: pause the render loop off-viewport (`IntersectionObserver`), and swap to a static/WebP render under `prefers-reduced-motion`, on WebGL-unavailable browsers, or on detected low-power devices.
- All motion wrapped in `prefers-reduced-motion`, with a static fallback state for each animated pattern above (already specified per-element in `inspirations.md`).

---

## 8. Deviations from the Gemini draft, and why

1. **Kept the preloader and the WebGL/shader hero**, scoped deliberately: `CLAUDE.md` now permits Three.js/WebGL/GLSL specifically for the homepage preloader and hero canvas (and, later, the About page's photogrammetry model), each with a mandatory static/CSS fallback. Everywhere else in this document, the "liquid glass" and distortion effects stay CSS/GSAP-only, so the render budget stays concentrated on the two sections built to carry it.
2. **Removed the 3D case-study sandbox** from the case study template (see §4). That was the one WebGL use in the draft not scoped to hero/preloader/photogrammetry, and it added a second render-budget commitment without a clear payoff over the quad-grid/collage modules already doing the visual-proof job.
3. **Cut every fabricated statistic, award, and client logo** (`$850M+`, Cannes Lions, Nike/Google/Balenciaga, `99.4% CSAT`, fake global clocks). `CLAUDE.md` bans invented statistics and requires all copy to route through `content.ts`; sections that depend on real numbers or accolades now either carry an explicit placeholder or are omitted until AH Growth supplies the real data.
4. **Removed manufactured scarcity** ("2 slots remaining" style urgency) from Contact. It's a manipulative pattern that erodes trust the moment a visitor checks back later and sees the same "2 slots" message.
5. **Simplified the Work Archive** to a single grid view instead of a dual grid/table switcher, and the case study's "Next Project" from a full URL-morphing scroll takeover to a simple link card. Both were solid ideas but disproportionate engineering effort for a five-page v1; worth revisiting once there's a real content volume to justify them.
6. **Replaced invented process-phase copy** ("3D Prototyping & Sensory Lab") with a placeholder for AH Growth's actual delivery methodology. That phase name describes client-facing production work; nothing here confirms AH Growth's actual service delivery includes it, so it stays a placeholder rather than presumed fact.
7. **Kept every section that was already explicitly decided in `inspirations.md`** as-is: the capabilities carousel's liquid-glass focus mechanic, the Buzz-style curtain footer, the Off-Brand case-study module sequence, and the Element 1/2/4/5 button and form components. Those were locked before this session and nothing here overrides them.

Net result: the section *order* and psychological logic of the Gemini draft (sensory hook, cognitive-ease reset, curated proof, capability framing, social proof, humanization, conversion, wayfinding) holds up and matches how Buzz Interactive, Designade, and Koto actually sequence their own sites. What got cut is everything that would have required tooling this project doesn't use, or content nobody has verified yet.
