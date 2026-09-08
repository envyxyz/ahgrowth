# AH Growth — Service Cards Dynamic Theming & Asset Specification

> **Target Audience:** Claude Code / Frontend Engineers implementing Section 03 ("Capabilities Carousel" / "Everything Your Brand Needs to Grow") per [SITEMAP.md](file:///c:/Users/ameer/Desktop/AHGrowth-Website/SITEMAP.md) and [inspirations.md](file:///c:/Users/ameer/Desktop/AHGrowth-Website/assets/design/inspirations/inspirations.md) §4.
> **Reference Archetype:** [primary.jpg](file:///c:/Users/ameer/Desktop/AHGrowth-Website/assets/design/inspirations/images/primary.jpg) (Carousel Cards)

---

## 1. Asset Directory Structure

All generated service card assets are organized in production and design paths:

```
AHGrowth-Website/
├── public/images/services/             <-- Next.js public directory (served at /images/services/*)
│   ├── designing.jpg                   (Monochromatic crimson reference plate, 896x1200)
│   ├── designing-cutout.png            (Display screen alpha-transparency cutout)
│   ├── cms-websites.jpg                (POKALI floating jar reference plate, 896x1200)
│   ├── cms-websites-cutout.png         (Sky/portal alpha-transparency cutout)
│   ├── product-development.jpg         (Reeded fluted glass silhouettes, 896x1200)
│   ├── product-development-cutout.png  (Glass core alpha-transparency cutout)
│   ├── mobile-apps.jpg                 (Floating titanium smartphone, 896x1200)
│   ├── mobile-apps-cutout.png          (Backdrop halo alpha-transparency cutout)
│   ├── marketing.jpg                   (Matte-red over-ear headphones, 896x1200)
│   ├── marketing-cutout.png            (Aura alpha-transparency cutout)
│   ├── SERVICE-CARDS-THEMING-SPEC.md   (This specification)
│   └── README.md
│
└── assets/design/services/             <-- Design source archive
    ├── [same JPG & PNG assets]
    └── SERVICE-CARDS-THEMING-SPEC.md
```

---

## 2. Taxonomy Matrix & Card Mapping

| Card # | Service Category | Sub-Categories (Tags / Capabilities) | Visual Scene (matching `primary.jpg`) |
|---|---|---|---|
| **01** | **Designing** | `Branding`, `Logo`, `Print Design`, `Motion Graphics`, `UI/UX` | Contemporary design gallery with polished concrete floor, ceiling lights, and wide billboard display showing an artistic silhouette profile. |
| **02** | **CMS Websites** | `Webflow`, `Framer`, `WordPress`, `Shopify`, `Ecommerce Solutions` | Luxury red cosmetic jar ("POKALI") with open levitating lid, white whipped moisturizer cream inside, hovering above jagged red mountain peaks and desert floor under crimson sky with star sparkle. |
| **03** | **Product Development** | `Web Apps`, `React Native Development`, `PHP Development`, `MERN Stack Development`, `QA Solutions` | Architectural interior with full-height vertical fluted/reeded textured glass partition wall, human silhouettes walking behind it, and saturated amber-red diffused backlighting. |
| **04** | **Mobile Apps** | `Mobile Apps`, `iOS Mobile Apps`, `Android Mobile Apps`, `React Native Mobile Apps`, `Mobile App ASO` | Sleek titanium and dark glass smartphone floating diagonally in mid-air in zero gravity, crimson rim lighting along chamfered edges, dark polished surface reflection. |
| **05** | **Marketing** | `SEO`, `SEM`, `Social Media Marketing`, `PPC Marketing`, `On-Page Optimization` | Minimalist matte-red sculptural over-ear headphones on a studio pedestal with directional crimson studio lighting and deep red shadows. |

---

## 3. How to Implement Dynamic Theme Color Changes

To allow the accent color of the cards to adapt dynamically to the website's theme (e.g. switching between Ruby Red `--color-primary: #e11d48`, Sapphire Blue, Emerald Green, Amber, etc.):

### Method A: Alpha-Cutout PNG with Lower `z-index` Background Element

Each card has a companion `*-cutout.png` where the primary luminous section (the gallery screen, the sky aperture, the glass wall light, or the halo aura) is transparent.

Place a dynamic theme-colored element behind the image:

```tsx
// components/services/ServiceCard.tsx
import Image from "next/image";

interface ServiceCardProps {
  title: string;
  subcategories: string[];
  cutoutSrc: string; // e.g. "/images/services/designing-cutout.png"
  accentPosition: { left: string; top: string; width: string; height: string };
}

export function ServiceCard({ title, subcategories, cutoutSrc, accentPosition }: ServiceCardProps) {
  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-canvas)] border border-[var(--color-hairline)] group">
      
      {/* 1. Dynamic Theme Accent Element (z-0, BEHIND the cutout image) */}
      <div
        className="absolute pointer-events-none transition-colors duration-500 blur-2xl"
        style={{
          left: accentPosition.left,
          top: accentPosition.top,
          width: accentPosition.width,
          height: accentPosition.height,
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, var(--color-primary, #e11d48) 0%, rgba(225,29,72,0.2) 60%, transparent 80%)",
          zIndex: 0,
        }}
      />

      {/* 2. Cutout Image with Transparent Aperture (z-1) */}
      <Image
        src={cutoutSrc}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover z-[1] transition-transform duration-700 ease-[var(--ease-inertia)] group-hover:scale-105"
        priority
      />

      {/* 3. HTML Editorial UI & Labels (z-10) */}
      <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 md:p-8 pointer-events-none">
        <div className="self-start">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono uppercase bg-[var(--color-surface-card)] border border-[var(--color-border-glass)] text-[var(--color-ink)] backdrop-blur-md">
            Capabilities
          </span>
        </div>

        <div className="space-y-3">
          <h3 className="type-heading-2 text-[var(--color-ink)] drop-shadow-md">
            {title}
          </h3>
          <ul className="flex flex-wrap gap-2 text-xs text-[var(--color-ink-secondary)]">
            {subcategories.map((sub) => (
              <li key={sub} className="px-2.5 py-0.5 rounded-md bg-black/50 backdrop-blur-sm border border-white/10">
                {sub}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
```

---

### Method B: Native CSS Cutout / Radial Mask

If using the `.jpg` directly, Claude Code can apply a CSS `mask-image` or `clip-path` to punch out the transparent section:

```css
/* Example: Punching a transparent hole in the center screen of designing.jpg */
.designing-screen-cutout {
  mask-image: radial-gradient(ellipse 160px 80px at 50% 46%, transparent 95%, black 100%);
  -webkit-mask-image: radial-gradient(ellipse 160px 80px at 50% 46%, transparent 95%, black 100%);
}
```

---

## 4. Summary of Category Data for `content.ts`

```typescript
export const serviceCards = [
  {
    id: "designing",
    title: "Designing",
    tag: "BRAND CORE",
    subcategories: ["Branding", "Logo", "Print Design", "Motion Graphics", "UI/UX"],
    image: "/images/services/designing.jpg",
    cutoutImage: "/images/services/designing-cutout.png",
    accentPosition: { left: "50%", top: "46%", width: "320px", height: "180px" },
  },
  {
    id: "cms-websites",
    title: "CMS Websites",
    tag: "VISUAL SYSTEM",
    subcategories: ["Webflow", "Framer", "WordPress", "Shopify", "Ecommerce Solutions"],
    image: "/images/services/cms-websites.jpg",
    cutoutImage: "/images/services/cms-websites-cutout.png",
    accentPosition: { left: "50%", top: "43%", width: "380px", height: "380px" },
  },
  {
    id: "product-development",
    title: "Product Development",
    tag: "BRAND NARRATIVE",
    subcategories: ["Web Apps", "React Native Development", "PHP Development", "MERN Stack Development", "QA Solutions"],
    image: "/images/services/product-development.jpg",
    cutoutImage: "/images/services/product-development-cutout.png",
    accentPosition: { left: "50%", top: "45%", width: "500px", height: "500px" },
  },
  {
    id: "mobile-apps",
    title: "Mobile Apps",
    tag: "NATIVE EXPERIENCES",
    subcategories: ["Mobile Apps", "iOS Mobile Apps", "Android Mobile Apps", "React Native Mobile Apps", "Mobile App ASO"],
    image: "/images/services/mobile-apps.jpg",
    cutoutImage: "/images/services/mobile-apps-cutout.png",
    accentPosition: { left: "51%", top: "38%", width: "400px", height: "400px" },
  },
  {
    id: "marketing",
    title: "Marketing",
    tag: "CREATIVE LOOK",
    subcategories: ["SEO", "SEM", "Social Media Marketing", "PPC Marketing", "On-Page Optimization"],
    image: "/images/services/marketing.jpg",
    cutoutImage: "/images/services/marketing-cutout.png",
    accentPosition: { left: "50%", top: "42%", width: "360px", height: "360px" },
  },
];
```
