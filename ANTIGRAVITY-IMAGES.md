# AH Growth, Image Generation Brief

## How to use this

Generate all 8 images below. Save each one at the exact path given in its heading, at the exact pixel dimensions given. Create the directories if they do not exist yet (`public/images/hero/`, `public/images/editorial/`, `public/images/blobs/`, `public/images/texture/`). Do not rename files, do not change aspect ratios, do not add extra variants, do not add files that are not on this list. The site code points at these exact paths, so a correctly named file wires itself up with no further work. A renamed or resized file breaks the layout.

Save as JPEG, quality 85 or higher, sRGB.

Before generating, look at these three references in the repo. They define the target and they are the pass/fail bar:

- `assets/design/inspirations/images/primary.jpg` is the primary visual target.
- `public/images/services/*.jpg` are five existing plates from the same shoot. Everything you generate has to sit next to these without looking imported.
- `assets/design/services/SERVICE-CARDS-THEMING-SPEC.md` documents how those five were specified.

---

## House style, applies to all 8

Every image is a near monochrome red frame. The palette runs from hot vermilion (`#ea4127`) in the specular highlights, through deep oxblood midtones, down to unlifted near black in the shadows, and it contains no second hue. Lighting is dramatic and comes from a single source: a hard key from one side, a rim light along an edge, or a glowing ring or panel behind the subject. Blacks stay crushed, large parts of the frame sit in shadow with no detail, and contrast is high. The register is editorial fashion and product photography, or a photoreal CGI render of the same, with glossy surfaces, polished reflective floors, sharp specular hits, and shallow depth of field. Backgrounds are empty: a gradient, a wall, or darkness, never clutter. The five existing service plates are the colour grade to match.

- Palette: monochrome red only, vermilion highlights, oxblood midtones, near black shadows. No blue, no green, no teal, no rainbow gradients.
- Lighting: one dominant source. Hard key, rim light, or a backlit ring or panel. Directional and deliberate.
- Blacks: unlifted and crushed. Shadow areas hold no recoverable detail. Do not raise the black point.
- Contrast: high. The brightest highlight and the darkest shadow should both be present in every frame.
- Depth of field: shallow to moderate. Background falls off softly.
- Optional single cream or off white element, used once at most per frame, as the only value that is not red. Use it sparingly and only where noted.
- Backgrounds: empty and simple. No props, no crowds, no signage, no set dressing.
- Absolutely no text, letters, numbers, logos, watermarks, signatures, UI, or captions anywhere in the frame.
- No borders, no frames, no vignette rings, no collage or split panel layouts.
- Fine film grain, cinematic colour grade, no HDR look, no oversaturation.

---

## 1. `public/images/hero/hero-primary.jpg`

**2400x1600, 3:2 landscape.** Full bleed homepage hero. The single most important image on the site.

**Prompt**

> Editorial fashion portrait, tight crop of one model from chest up, head turned three quarters toward camera, wearing dark angular sunglasses and a heavy polished metal chain at the collarbone. Skin is glossy with hard specular highlights along the cheekbone, jaw and shoulder. One hard crimson key light from the upper left, thin rim light tracing the far edge of the face and neck. Near monochrome red: hot vermilion highlights, deep oxblood midtones, unlifted black shadows, no second hue. Background is a smooth crimson to black gradient, completely empty. 85mm lens, shallow depth of field, fine film grain, cinematic grade.

**Composition and negative space.** Place the subject left of centre so the head and shoulders occupy roughly the left 55 percent of the frame, crown of the head in the top third with headroom above it. The right 45 percent must be an unbroken smooth gradient with no detail, no hair, no hands: large display type sits there. The bottom left quadrant must fall away to near black with no subject detail: floating cards sit on top of it. Keep the face out of the extreme top edge so a small vertical crop does not cut the forehead.

---

## 2. `public/images/hero/hero-primary-mobile.jpg`

**1200x1600, 3:4 portrait.** The same hero scene recomposed for a portrait frame.

**Prompt**

> Same model, same wardrobe and same lighting setup as the landscape hero, recomposed vertical. Editorial fashion portrait, head and shoulders only, centred horizontally, three quarter angle to camera, dark angular sunglasses, heavy polished chain at the collarbone. One hard crimson key from the upper left, thin rim light on the opposite cheek, glossy specular highlights on skin and metal. Near monochrome red, vermilion highlights, oxblood midtones, crushed black shadows, no second hue. Plain crimson to black gradient background, nothing else in frame. 85mm portrait compression, shallow depth of field, fine grain, cinematic grade.

**Composition and negative space.** The face is the whole point at this width, so make it large: crown of the head around 12 percent down, chin around 45 percent down. Keep every part of the face inside the central 70 percent of the width so a narrow 375px viewport never clips an eye or an ear. The bottom third of the frame falls to near black and holds no detail, because stacked headline and button copy sits there. No chain or hand should intrude into that bottom third.

---

## 3. `public/images/editorial/editorial-01.jpg`

**1200x1600, 3:4 portrait.** Editorial media card, first of a row of three.

**Prompt**

> Editorial fashion portrait, half length, one model standing against a plain dark backdrop, wearing a black leather jacket and reflective wraparound sunglasses, chin slightly raised, neutral expression, not smiling. Hard crimson key light from camera left, cool black fill on the right, a bright rim light separating the shoulder from the background. Glossy specular highlights on the leather and the lens. Near monochrome red palette, vermilion highlights, oxblood midtones, crushed blacks, no second hue. Two or three small four point star glints on the brightest speculars. 50mm lens, shallow depth of field, fine film grain, cinematic grade.

**Composition and negative space.** Subject centred, head in the top third, framed from the waist up. Leave the bottom quarter of the frame in near black shadow so an overlaid label stays readable. Keep the subject clear of the outer 8 percent on the left and right, because the card crops inward on narrow viewports.

---

## 4. `public/images/editorial/editorial-02.jpg`

**1200x1600, 3:4 portrait.** Editorial media card, second of a row of three. This one is a macro detail, so the row does not read as three portraits.

**Prompt**

> Extreme close crop of a human face, one eye and cheekbone filling most of the frame, skin glossy and textured with visible pores and a sharp specular sheen. Hard slatted shadow bars from a venetian blind fall diagonally across the skin, cutting it into bright crimson bands and near black gaps. Single hard light source from camera right. Near monochrome red palette, hot vermilion in the lit bands, deep oxblood in the transitions, unlifted black in the shadow bars, no second hue. Macro lens, very shallow depth of field, fine film grain, cinematic grade.

**Composition and negative space.** Crop tight enough that it reads as texture and light rather than as a recognisable person. Put the brightest lit band across the upper middle of the frame and let the bottom quarter fall into an unbroken shadow bar, so an overlaid label has a calm dark area to sit on. Keep the eye off dead centre, slightly above the midline.

---

## 5. `public/images/editorial/editorial-03.jpg`

**1200x1600, 3:4 portrait.** Editorial media card, third of a row of three. Environmental plate, no visible face.

**Prompt**

> Architectural interior, a full height vertical fluted reeded glass partition wall running across the frame, backlit with saturated crimson light. A single human silhouette walks behind the glass, diffused and abstracted into a soft dark shape by the ribbed texture. Polished concrete floor in the foreground catching a long vertical crimson reflection. One light source behind the glass, everything in front of it in deep shadow. Near monochrome red, vermilion in the backlight, oxblood in the diffusion, unlifted black in the foreground. 35mm lens, moderate depth of field, fine film grain, cinematic grade.

**Composition and negative space.** Put the glass wall and the silhouette in the upper two thirds. The foreground floor occupies the bottom third and stays dark and even, apart from the reflection, so an overlaid label stays readable. Keep the silhouette away from both side edges by at least 15 percent of the width, because the card crops inward on narrow viewports.

---

## 6. `public/images/blobs/blob-01.jpg`

**480x280, 12:7 landscape.** Tiny image inset inside a headline. It gets masked to a full radius capsule and renders around 120x70px, so it must read as a single bold shape at thumbnail size.

**Prompt**

> Extreme macro of a polished crimson sphere floating against pure darkness, dead centre in the frame, filling most of the height. Glossy lacquered surface with one hard specular hotspot on the upper left of the sphere and a soft crimson bounce along its lower right edge. Background falls off immediately to unlifted black with no gradient banding and no other object. Near monochrome red, hot vermilion in the hotspot, deep oxblood in the body of the sphere, black surround, no second hue. Studio product lighting, macro lens, shallow depth of field, fine grain, cinematic grade.

**Composition and negative space.** The subject must be dead centre and simple. A full radius capsule mask rounds the left and right ends into semicircles, so nothing important can live in the outer 20 percent of the width on either side. No fine detail, no small features, no thin lines: at 120x70px the whole image has to resolve into one bright shape on a dark ground.

---

## 7. `public/images/blobs/blob-02.jpg`

**480x280, 12:7 landscape.** Second inline headline inset, same capsule mask and same size constraint.

**Prompt**

> Extreme macro of glossy crimson silk fabric, one large soft fold running horizontally through the centre of the frame, catching a single hard highlight along the top of the ridge. The fabric falls away into deep oxblood and then unlifted black at the top and bottom edges. One hard light source from the upper left, grazing across the fold. Near monochrome red, vermilion on the ridge, oxblood in the mid tones, black in the recesses, no second hue. No pattern, no print, no stitching. Macro lens, shallow depth of field, fine film grain, cinematic grade.

**Composition and negative space.** The bright ridge runs horizontally through the vertical centre so the capsule mask cannot cut it off. Nothing important in the outer 20 percent of the width on either side. Keep the top and bottom edges dark and quiet. It must still read as one bright horizontal band on a dark ground at 120x70px.

---

## 8. `public/images/texture/gradient-card.jpg`

**1600x1200, 4:3 landscape.** Abstract crimson gradient and mesh field. No recognisable subject. Text is laid over it.

**Prompt**

> Abstract crimson mesh gradient field, smooth and volumetric, with no recognisable object or subject in it. A soft warm bloom of hot vermilion sits in the upper right, spreading and cooling into deep oxblood through the middle of the frame and falling to near black at the bottom left. Soft cloudy transitions, no hard edges, no shapes, no lines, no geometry. Near monochrome red, no second hue. Fine film grain over the whole frame to prevent banding. Cinematic colour grade, matte finish, no glare, no lens flare.

**Composition and negative space.** The bloom belongs in the upper right quadrant only. The centre left half of the frame must stay smooth, even and dark, under roughly 25 percent luminance, with no bright patches, because light text sits on top of it and needs contrast. No banding across any transition, so keep the grain in.

---

## Negative prompt

Append this to every one of the 8 generations:

```
text, letters, words, typography, caption, watermark, logo, signature, borders, frames, collage, split screen, blurry, low contrast, washed out, flat lighting, oversaturated rainbow colours, blue colour cast, green colour cast, teal, purple, stock photo smiling, posed corporate portrait, cluttered background, busy background, props, extra objects, lifted blacks, HDR look, lens flare, banding
```

---

## Acceptance check

Run this on each file before accepting it. Any single failure means regenerate, not retouch.

1. **Path.** File is at the exact path in the heading, spelled exactly, in the right directory, with a `.jpg` extension.
2. **Dimensions.** Pixel dimensions match exactly. Confirm the aspect ratio: 3:2 for the hero, 3:4 for the mobile hero and the three editorials, 12:7 for the two blobs, 4:3 for the gradient card.
3. **No text in frame.** Zoom to 100 percent and check every corner. Any letter, number, glyph, watermark, or logo fails.
4. **Same shoot.** Open the file next to `public/images/services/marketing.jpg` and `public/images/services/designing.jpg`. The blacks, the red, and the contrast should look like the same camera and the same grade. If it looks brighter, pinker, or flatter than those, it fails.
5. **Crop survival.** Test the stated constraint. Hero: cover the right 45 percent and the bottom left quadrant, the image still works. Mobile hero: crop to 375px wide, the face is still whole. Blobs: scale to 120x70 and apply a capsule mask, the subject still reads. Gradient card: put white text over the centre left, it is still legible.
6. **No second hue.** Sample a few pixels across the frame. Everything should sit in the red band. Any blue, green, or purple cast fails.
