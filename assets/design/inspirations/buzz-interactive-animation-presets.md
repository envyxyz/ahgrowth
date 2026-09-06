---
tags: [design-inspiration, animation, motion, reference]
source: https://www.buzzinteractive.co/about
stack_detected: [Lenis 1.2.3, GSAP, ScrollTrigger, SplitType, Webflow]
date: 2026-09-06
---

# Buzz Interactive — Motion System Audit & Preset Library

Reverse-engineered from buzzinteractive.co/about. Confirmed via DOM inspection: Lenis (smooth scroll, `lenis` class on `<html>`, `wheelMultiplier`/`lerp`/`duration` config present), GSAP with `ScrollTrigger.create` and `gsap.timeline`, SplitType (375 word-level spans, 150 line-level spans, 0 char-level — this site splits by word and line, never by character), a custom cursor (native cursor set to `none`, replaced by `.cursor`/`.cursor-wrapper`/`.cursor-white`/`.cursor-link` elements), and a native Webflow background-video hero (no canvas/WebGL — the pink "3D" visual is a lazy-loaded looping video, not a real-time render).

Each preset below is a name only — no element names, no site-specific selectors. Feed the name to Claude Code and it rebuilds the effect from the description.

## Why it feels "captive" and low-FPS

Three likely causes, in order of probable impact:

1. **Lerp/duration mismatch.** A "forced" or "captive" feeling from a lerp-based smooth scroll almost always means the lerp factor is too low (too much smoothing lag between input and motion) or the wheel multiplier is capped too conservatively. The fix isn't disabling smoothing — it's raising the wheel multiplier and tightening the lerp so the scroll still feels smooth but responds almost immediately to input, with a short, snappy settle instead of a long float.
2. **Per-word scroll-tied tweens.** 375 individually split word spans is a lot of nodes to keep in sync with scroll position. If each word (or each line) is wired to its own ScrollTrigger instance rather than one shared timeline driving a stagger, the browser recalculates style for all of them on every scroll frame. One ScrollTrigger + one timeline + `stagger` scales far better than N triggers.
3. **Unbatched cursor/scroll listeners.** A custom cursor that updates position outside `requestAnimationFrame`, or that touches `top`/`left` instead of `transform`, forces layout on every mouse event. Same risk applies to any scroll-velocity read used for effects like motion blur — it must be read once per animation frame, not once per scroll event.

None of the visible media (5 background videos, 0 canvas elements) appear to be the bottleneck — they're Webflow's native lazy-autoplay pattern. The lag is almost certainly script-driven, not asset-driven. Confirm on a real device with Chrome DevTools' Performance panel — look for long tasks during scroll and check whether "Recalculate Style" dominates the frame.

**Global tuning targets for every preset below:**

- Animate only `transform` and `opacity`. Never animate `top`, `left`, `width`, `height`, `margin`, or `filter` on more than one element at a time.
- Every scroll or pointer listener reads state once per `requestAnimationFrame` tick, not once per event. Attach listeners with `{ passive: true }`.
- Entrance reveals trigger once (`IntersectionObserver` or `ScrollTrigger` with `once: true` / `toggleActions: "play none none none"`), never `scrub`, unless the preset explicitly calls for scrubbing.
- `will-change` is set only on the element actively animating, and removed the moment the animation finishes.
- Every preset respects `prefers-reduced-motion: reduce` by cutting to instant opacity/no-op — no exceptions.
- Cap any canvas/WebGL context to `devicePixelRatio` of 2 max, even on displays that report higher.

---

## Scroll Engine

### Preset: Fluid Cap Scroll
The base smooth-scroll feel. Wheel and trackpad input is intercepted and eased rather than jumping the scroll position directly, but the cap on scroll speed sits higher than typical smooth-scroll defaults so fast, intentional scrolling never feels throttled. Tuning: lerp `0.12`–`0.15` (higher = snappier catch-up, less float), wheel multiplier `1.15`–`1.3` (raised from the usual ~0.8–1 so a hard flick still covers real distance), touch multiplier `1.5`–`2` on mobile so touch scrolling isn't artificially slower than native. Runs entirely on the compositor thread via `transform: translate3d` on the scroll wrapper — never repaints layout.

### Preset: Inertia Settle
The deceleration curve after the user releases the wheel or lifts a touch drag. Motion continues briefly past the release point and eases to a stop with an exponential-out curve over roughly 300–500ms. Should never overshoot and bounce back — it settles, it doesn't spring.

### Preset: Velocity Fade Blur
Directional motion blur that only appears above a velocity threshold and is barely perceptible even then. Read scroll velocity once per animation frame (not per scroll event). Below the threshold (roughly 40–60px of scroll delta per frame) the effect is fully off — zero cost, zero visual change. Above it, apply a `filter: blur()` capped at 1.5–2px in the scroll direction only, on a single full-viewport wrapping layer (never per-element — blurring many elements individually is the single most expensive way to do this). The blur amount scales linearly with velocity up to the cap, and decays back to 0 within 150–200ms of velocity dropping, using a short ease-out so it's never sustained during normal reading scroll. The net feel: completely invisible during normal use, a faint directional smear only on a hard, fast flick.

---

## Text Animations

### Preset: Line Rise
Paragraph and heading text splits by line (not word, not character) and each line enters with a combined `translateY` (12–24px) + opacity fade, staggered roughly 40–60ms per line. Triggers once when the block enters the viewport — this is an entrance reveal, not scroll-scrubbed. Cheapest and most readable of the text presets; use it as the default for body copy and subheads.

### Preset: Word Wipe Scrub
- **Visual Reference:** [preset-word-wipe-scrub.png](file:///c:/Users/ameer/Desktop/AHGrowth-Website/assets/design/inspirations/preset-word-wipe-scrub.png)
Text splits by word and its reveal progress is tied directly to scroll position rather than triggering once — as the block moves through a defined scroll range, words transition from a dim/muted state to full opacity (or a color shift, e.g. gray to black) in sequence, so the paragraph visibly "writes itself in" as the user scrolls past it. Because this ties directly to scroll position every frame, it must be driven by one timeline with one scroll listener, not one trigger per word — a shared progress value maps to per-word stagger offsets, calculated once and applied via a lookup rather than recalculated per word per frame.

### Preset: Underline Draw
On hover, a thin underline grows in from one edge using `transform: scaleX(0) → scaleX(1)` with `transform-origin` set to the entry side (never widening a `width` or `border-bottom`, which would repaint). Roughly 200–250ms, ease-out. Reverses on hover-out from the opposite origin so it feels directional rather than just toggling.

---

## Cursor

### Preset: Ghost Dot Cursor
The system cursor is hidden (`cursor: none`) and replaced by a small circular custom cursor that trails the real pointer position with a short lerp lag (not 1:1) — this is what gives a custom cursor its "alive" feel rather than looking like a laggy native pointer. Positioned purely with `transform: translate3d`, updated inside a single `requestAnimationFrame` loop reading the latest raw pointer coordinates — never positioned with `top`/`left`, and never recalculated per `mousemove` event directly.

### Preset: Cursor Ink Swap
The custom cursor's fill color and/or size swaps contextually depending on what it's hovering: inverted (e.g., white-on-dark) over dark sections, a distinct state over links/clickable elements (larger, or a label appears inside it), default elsewhere. Swap via a class toggle driven by `mouseenter`/`mouseleave` on target elements, animated with a fast (120–150ms) scale/color transition — never re-render the cursor element itself.

### Preset: Magnetic Pull
Not observed on this page currently, but a strong complement to the two cursor presets above. On hover proximity to a button or CTA, the target (and optionally the cursor) shifts a few pixels toward the pointer position, capped at a small max displacement (8–14px), using `transform: translate()` recalculated on `mousemove` but throttled to one update per animation frame. Snaps back to origin with a soft spring ease on mouse leave.

---

## Form & Selection

### Preset: Active Pulse Dot
A small accent-colored dot appears as a state indicator wherever something becomes active: on a text input when it receives focus (dot appears beside the field), and on a selectable chip/pill when it's chosen (dot appears at the pill's corner). Consistent accent-dot language across the whole form rather than a different focus style per field type. Animate the dot in with a quick scale+fade (~150ms) rather than an instant appearance.

### Preset: Invert Chip
Selectable pill/chip options (used for multi-choice questions like service type or budget range) sit as outlined pills by default and flip to a solid filled state — background and text colors invert — the instant they're selected. Pair with Active Pulse Dot for the corner indicator. Transition is fast (150–200ms ease-out) since this is a direct-response UI action, not an ambient animation — it should feel immediate, not floaty.

### Preset: Step Cascade
Long forms are broken into numbered steps (01, 02, 03…) laid out vertically rather than shown one-at-a-time. Each step's content (label + input/options) fades and rises in slightly as it enters the viewport, same mechanics as Line Rise but applied to whole form rows instead of text lines. Keeps a long form from feeling like a wall of fields by revealing it progressively as the user scrolls.

### Preset: Reveal Mask
Not observed on this specific page, but worth adding for image-heavy sections (case studies, project thumbnails). An image sits behind a solid-color panel that slides away (`transform: scaleY` or `translateY` on the mask, never on the image itself) as the image scrolls into view, exposing it panel-wipe style rather than a plain fade-in. Triggers once, ease-out, roughly 600–800ms.

### Preset: Subsurface Type Roll
- **Visual References:** [element-submit-button-buzz.png](file:///c:/Users/ameer/Desktop/AHGrowth-Website/assets/design/inspirations/element-submit-button-buzz.png) & [element-buzz-liquid-letters.png](file:///c:/Users/ameer/Desktop/AHGrowth-Website/assets/design/inspirations/element-buzz-liquid-letters.png)
Observed on the Buzz Interactive submit button. A pill button contains a clipped background sub-layer of oversized liquid brand lettering beneath a static foreground label (`Submit •`). On hover (`mouseenter`), the background lettering smoothly translates upward vertically (`transform: translateY(0) → translateY(-60px)`) with a snappy kinetic ease (~400–450ms, ease-out), while the foreground submit label remains perfectly still and legible. On mouse leave, the letters ease back to their baseline position. Provides playful, tactile kinetic feedback to the user immediately prior to submission.

---

## Build Notes for Claude Code

When asked to apply one of these by name: implement it using only compositor-friendly properties (`transform`, `opacity`, occasionally a single-layer `filter`), gate entrance animations behind `IntersectionObserver` or `ScrollTrigger` with a one-time trigger, throttle any per-frame read (scroll position, pointer position, velocity) to `requestAnimationFrame`, and always include a `prefers-reduced-motion` fallback. If a page already has more than a handful of independently-triggered scroll animations, prefer one shared timeline/observer over many individual ones — that consolidation is usually worth more to perceived smoothness than any single easing tweak.
