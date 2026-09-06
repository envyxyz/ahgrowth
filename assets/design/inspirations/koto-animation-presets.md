---
tags: [design-inspiration, animation, motion, reference]
source: https://koto.com/
stack_detected: [Next.js/React (custom bundle, no global GSAP/Lenis/Framer exposed), Tailwind-style utility classes, native View Transitions API available]
date: 2026-09-06
---

# Koto — Motion System Audit (Scoped: Scroll Sync, Nav, 4-Dot Menu, Project Transition)

Koto ships no globally-exposed animation library (`gsap`, `Lenis`, `SplitType` all absent from `window`), so the motion layer is hand-rolled React/CSS: every effect below is driven by inline Tailwind-style transition utility classes (`duration-[…ms]`, `ease-[cubic-bezier(…)]`, `delay-[…ms]`) toggled by state/attributes (`data-ref-*`), plus `backdrop-filter: blur()` utilities (`backdrop-blur-glass-medium` = 20px, `backdrop-blur-glass-strong` = 40px) reused everywhere glass/blur appears. This audit only covers the four interactions requested — scroll-synced work list, nav header collapse/expand, the 4-dot location panel, and the work-thumbnail-to-case-study transition.

## Scroll Engine

### Preset: Pinned Caption Rail
The "Our work" section splits into a 16-column grid. The left column (6/16 on desktop) holds the section title and a project caption, and is `position: sticky; top: 0` with a negative top margin equal to one viewport height and a fixed height of one viewport height (`-mt-[100svh] h-[100svh]`, padding-top ~30svh) — the trick that keeps it visually pinned in the viewport for the entire duration the right column scrolls past. Pointer events are disabled on the pinned wrapper except the text itself, so it never blocks clicks on content sitting under it.

The right column (10/16) is a plain vertical stack of full-bleed video/image blocks, one per project, each roughly one viewport tall and tagged with its own id (`section-featured-projects-<slug>`). As each block crosses into view, an observer flips the active project index, and the pinned caption (title + subtitle) cross-fades and slides to match: `opacity` goes 0→1 while a wrapping span animates `translateY` back to 0, using two different curves layered together — a fast one for the outgoing line (`133ms`, `cubic-bezier(0.75,0,0.85,1)`) and a slower one for the incoming line (`333ms`, `cubic-bezier(0,0,0,1)`). Net effect: the right side keeps scrolling like a normal feed, the left side reads like a slide caption that updates itself as the "current" project changes underneath it.

**Rebuild notes:** one `IntersectionObserver` (threshold ~0.5) watching each right-column section, updating one shared "active project" state — not a separate trigger per block. Animate only the caption's `opacity`/`transform`, never its layout position. The sticky column must sit in normal flow (no `position: fixed`) so it still occupies grid space and the negative-margin trick keeps its sticky range exactly one section tall per swap.

## Nav / Header

### Preset: Collapse-to-Pill Header
At the very top of the page the header is a plain transparent bar: logo far left, a full horizontal list of nav labels (Work / About / Services / Latest / Careers / Contact) next to it, a live clock + UTC offset on the right, and the 4-dot icon at the far right edge — nothing has a background, it just sits over the hero video.

The moment the page scrolls past the hero, the nav list collapses into a small pill: logo stays, but the full list is replaced by a single dark, rounded, glassy button showing only the current section name (e.g. "HOME") with a small chevron/dot. The pill has a dark translucent fill and rounds its corners; the collapse itself is a size/opacity swap rather than a slide.

**Rebuild notes:** two nav states sharing one container — render the full label row absolutely positioned under `scrollY < heroHeight`, and cross-fade to the pill once past it. Gate the swap on a single scroll-position check (throttled to `requestAnimationFrame`, not on every scroll event), and animate only `opacity`/`transform`, letting the pill's own background/blur be a static style rather than something transitioning on every scroll tick.

### Preset: Roll Reveal Hover
Every nav label (and the dropdown's link list) is built as two stacked copies of the same word inside an `overflow: hidden` mask. At rest the visible copy sits at `translateY(0)`; on hover the whole stack shifts up by the line height (`-18px`) so the duplicate copy underneath rolls into view — a classic "text roll" hover, not a color change. Hover-in is quick and eager (`133ms`, `cubic-bezier(0.15,0,0.15,1)`, no delay); hover-out is slower and gently delayed before it starts (`317ms`, same curve family, `83ms` delay) so the label doesn't snap back the instant the cursor leaves.

**Rebuild notes:** the mask + double-text-stack is what makes this cheap — animate `transform: translateY()` on the inner stack only, never resize the outer mask. Reuse this preset for both the top nav and the dropdown-panel link list; it's the same component in both places here.

### Preset: Click-to-Expand Nav Pill
Clicking the collapsed pill (not hovering it) opens a vertical dropdown anchored under the logo: nav links first (Work, About, Services, Latest, Careers, Contact), then a lighter "Channels" sub-list (Instagram, OFF.Live, OFF.Brand, Seasoned). The panel isn't a simple show/hide — three things animate together: the panel's container width tweens open (`400ms`, `cubic-bezier(0.65,0,0.35,1)`), while the inner content fades in (`opacity`, linear, `283ms`, `50ms` delay) and slides up into place (`translateY`, `283ms`, `cubic-bezier(0.18,0.06,0.3,0.98)`, `50ms` delay) — the width change is the slowest/outermost motion, the content fade+slide rides on top of it starting slightly after. On mobile this same interaction becomes a full-screen takeover behind a `blur(40px)` scrim; on desktop there's no full-page scrim, just the dark dropdown panel itself sitting over the page.

**Rebuild notes:** stagger the container resize and the content reveal — don't animate them with identical timing or the panel will feel like it "pops" instead of unfurling. Reduced-motion: skip straight to the open/closed end state, no width tween.

## 4-Dot Location Panel

### Preset: Glass Tab Switcher
The 4-dot icon (a 2×2 dot grid) in the header's far right corner opens a full-viewport overlay: the rest of the page dims behind it (the underlying content is already near-black, so the "dim" reads mostly as a fixed full-screen layer fading its own opacity 0→100 in rather than a separate dark scrim tweening in). The panel's content sits top-right: a pill-shaped city switcher (LA / NYC / LDN / BER / SYDNEY) with a frosted glass background (`blur(20px)`, ~5%-white fill, rounded), the active city shown as a solid white pill against it.

Below the switcher: a small asymmetric photo grid tied to the selected city (a portrait team photo, a wide office interior shot, a small square photo, and a live analog clock face showing local time), a contact card overlapping the office photo ("SAY HELLO / city@koto.com") with prev/next arrows to cycle images, then a "Latest news" list (three items, each a thumbnail + headline + category tag, with an "[ALL]" link to see more), and a contact-form input pinned along the bottom edge.

**Rebuild notes:** the glass tab bar is the reusable piece — `backdrop-filter: blur(20px)` over a very low-opacity white fill, active-state pill as a separate absolutely-positioned white background that slides between tabs rather than restyling each tab individually. Keep the full-screen scrim to a single `opacity` fade on one fixed layer; don't blur every card individually, blur only the tab bar itself where content actually sits behind it.

## Page Transition

### Preset: Morph-to-Hero Case Study Transition
Clicking one of the work thumbnails (each a looping video with the project name overlaid) does not hard-cut to the case study page. The clicked video keeps playing uninterrupted through the navigation and grows to become the new page's full-bleed hero — same footage, same playhead position, now filling the top of the `/work/<project>` page with its title centered over it. The header's breadcrumb updates in place from the plain logo state to "WORK / <PROJECT NAME>". Below the hero, the project's meta (name, one-line tagline, category + year) fades in once the transition settles. This browser has `document.startViewTransition` available, and the seamless continuous-video handoff (no flash, no reload of the media element) is consistent with a View-Transitions-style shared-element morph rather than a router push with a fresh video mount.

**Rebuild notes:** the illusion depends entirely on not remounting the `<video>` element across the navigation — same DOM node (or the same underlying media resource keeping its `currentTime`) needs to persist across the route change, whether via the View Transitions API's `view-transition-name`, a persistent layout that keeps the player alive, or an SPA transition that swaps surrounding chrome while leaving the media node in place. Everything else (title fade-in, breadcrumb swap) should be a quick `opacity`/`transform` cross-fade layered on top, not the thing carrying the transition.

## Build Notes for Claude Code

Every preset above should animate only `transform` and `opacity` (the sticky-caption swap, the nav collapse/expand, the tab-switcher active state, and the hero morph all fit this) — never `top`/`left`/`width` for the actual motion, only for one-time layout tweens like the dropdown's width expand, and even that should be the exception, not the pattern to copy elsewhere. Any scroll- or pointer-driven trigger (the pinned-caption swap, the header collapse point) should read position once per `requestAnimationFrame`, not per raw event, and should flip a single shared state rather than wiring up one listener per element. Reveals like the dropdown content and the 4-dot panel should be one-shot on open, not continuously scroll-scrubbed. Add `prefers-reduced-motion: reduce` fallbacks that jump straight to each effect's end state — especially the hero-morph transition and the nav pill expand, where the "no motion" version is just an instant swap.
