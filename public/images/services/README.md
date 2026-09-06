# AH Growth — Service Cards Dynamic Theming & Asset Specification

> **Target Audience:** Claude Code / Frontend Engineers implementing Section 03 ("Capabilities Carousel" / "Everything Your Brand Needs to Grow") per [SITEMAP.md](file:///c:/Users/ameer/Desktop/AHGrowth-Website/SITEMAP.md) and [inspirations.md](file:///c:/Users/ameer/Desktop/AHGrowth-Website/assets/design/inspirations/inspirations.md) §4.
> **Reference Archetype:** [primary.jpg](file:///c:/Users/ameer/Desktop/AHGrowth-Website/assets/design/inspirations/images/primary.jpg)

---

## 1. Asset Directory Structure

All generated service card assets are organized in production and design paths:

```
AHGrowth-Website/
├── public/images/services/             <-- Next.js public directory (served at /images/services/*)
│   ├── designing.jpg                   (Monochromatic base image, 896x1200)
│   ├── designing-cutout.png            (Feathered alpha-channel transparent cutout)
│   ├── cms-websites.jpg
│   ├── cms-websites-cutout.png
│   ├── product-development.jpg
│   ├── product-development-cutout.png
│   ├── mobile-apps.jpg
│   ├── mobile-apps-cutout.png
│   ├── marketing.jpg
│   ├── marketing-cutout.png
│   └── SERVICE-CARDS-THEMING-SPEC.md   (This specification)
│
└── assets/design/services/             <-- Design source archive
    ├── [same JPG & PNG assets]
    ├── SERVICE-CARDS-THEMING-SPEC.md
    └── previews/                       <-- Visual test renders with active ruby theme tint
        ├── designing-preview-glow.jpg
        ├── cms-websites-preview-glow.jpg
        ├── product-development-preview-glow.jpg
        ├── mobile-apps-preview-glow.jpg
        └── marketing-preview-glow.jpg
```

---

## 2. Taxonomy Matrix & Card Mapping

| Card # | Service Category | Sub-Categories (Tags / Capabilities) | Subject Matter (matches `primary.jpg`) |
|---|---|---|---|
| **01** | **Designing** | `Branding`, `Logo`, `Print Design`, `Motion Graphics`, `UI/UX` | Dark studio workstation, sleek wide-format screen with central luminous ring aperture, glossy obsidian floor reflection. |
| **02** | **CMS Websites** | `Webflow`, `Framer`, `WordPress`, `Shopify`, `Ecommerce Solutions` | Floating luxury cosmetic/packaging glass container hovering in zero gravity with a glowing halo ring behind it. |
| **03** | **Product Development** | `Web Apps`, `React Native Development`, `PHP Development`, `MERN Stack Development`, `QA Solutions` | Translucent vertical fluted/reeded glass wall with human engineer silhouettes and a central luminous circular core. |
| **04** | **Mobile Apps** | `Mobile Apps`, `iOS Mobile Apps`, `Android Mobile Apps`, `React Native Mobile Apps`, `Mobile App ASO` | Sleek floating dark glass smartphone device hovering diagonally, framed by a luminous circular halo ring. |
| **05** | **Marketing** | `SEO`, `SEM`, `Social Media Marketing`, `PPC Marketing`, `On-Page Optimization` | Minimalist matte-black sculptural over-ear headphones on an obsidian pedestal with a glowing circular halo ring. |

---

## 3. Geometric Coordinates for Halo Cutouts & Dynamic Light Orbs

Every image is native **896 × 1200 px** (Aspect ratio **3:4**). The focal glowing halo aperture in each image is centered at:

| Card | Center X (`cx`) | Center Y (`cy`) | Center % (X, Y) | Radius (`r`) | Radius % of width |
|---|---|---|---|---|---|
| **Designing** | `447 px` | `583 px` | `49.9%, 48.6%` | `110 px` | `12.3%` |
| **CMS Websites** | `441 px` | `568 px` | `49.2%, 47.3%` | `270 px` | `30.1%` |
| **Product Development** | `451 px` | `544 px` | `50.3%, 45.3%` | `125 px` | `13.9%` |
| **Mobile Apps** | `460 px` | `460 px` | `51.3%, 38.3%` | `325 px` | `36.3%` |
| **Marketing** | `440 px` | `505 px` | `49.1%, 42.1%` | `255 px` | `28.5%` |

---

## 4. Implementation Methods for Dynamic Theme Color Changing

To allow the accent color of the image to change dynamically whenever the website theme changes (e.g., via `--color-primary`, `--color-accent-ruby-glow`, or custom CSS variables), use one of the two recommended methods below.

### Method A: Non-Destructive CSS Blend Mode (Recommended)

This method uses the clean `.jpg` image and layers a CSS color tint and a radial accent glow over/behind it.
- **Advantage:** Preserves 100% of the foreground reflections, glass highlights, and dark studio shadows without any cutout clipping edges.
- When `--color-primary` changes (e.g. Ruby `#e11d48`, Emerald `#10b981`, Sapphire `#2563eb`, Amber `#f59e0b`), the luminous ring and reflections take on that exact color automatically.

```tsx
// components/services/ServiceCard.tsx
import Image from "next/image";

interface ServiceCardProps {
  title: string;
  subcategories: string[];
  imageSrc: string; // e.g. "/images/services/cms-websites.jpg"
  focalCenter: { x: string; y: string }; // e.g. { x: "49.2%", y: "47.3%" }
}

export function ServiceCard({ title, subcategories, imageSrc, focalCenter }: ServiceCardProps) {
  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-canvas)] border border-[var(--color-hairline)] group">
      
      {/* 1. Base Monochromatic Image */}
      <Image
        src={imageSrc}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover transition-transform duration-700 ease-[var(--ease-inertia)] group-hover:scale-105"
        priority
      />

      {/* 2. Dynamic Theme Colorizer (Mix Blend Mode: Color) */}
      {/* Takes the luminance from the photo and applies the active theme hue/saturation */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-color transition-colors duration-500"
        style={{
          backgroundColor: "var(--color-primary, #e11d48)",
          opacity: 0.92,
        }}
      />

      {/* 3. Luminous Accent Core Radial Glow (Mix Blend Mode: Screen) */}
      {/* Placed precisely at the halo's geometric center */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-screen opacity-40 group-hover:opacity-75 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle 280px at ${focalCenter.x} ${focalCenter.y}, var(--color-primary, #e11d48) 0%, transparent 70%)`,
        }}
      />

      {/* 4. Editorial Typography & Tags Overlay (z-10) */}
      <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 md:p-8 pointer-events-none">
        {/* Top Tag */}
        <div className="self-start">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono tracking-wider uppercase bg-[var(--color-surface-card)] border border-[var(--color-border-glass)] text-[var(--color-ink)] backdrop-blur-md">
            Capabilities
          </span>
        </div>

        {/* Bottom Content */}
        <div className="space-y-3">
          <h3 className="type-heading-2 text-[var(--color-ink)] drop-shadow-md">
            {title}
          </h3>
          <ul className="flex flex-wrap gap-2 text-xs text-[var(--color-ink-secondary)]">
            {subcategories.map((sub) => (
              <li key={sub} className="px-2.5 py-0.5 rounded-md bg-black/40 backdrop-blur-sm border border-white/5">
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

### Method B: Transparent Cutout PNG with Lower `z-index` Accent Element

This method uses the pre-rendered `*-cutout.png` files where the glowing aperture has feathered alpha transparency:
- **Layer 0 (`z-index: 0`):** An animated or glowing accent `div` positioned behind the image.
- **Layer 1 (`z-index: 1`):** The `*-cutout.png` with the transparent hole. The light from Layer 0 shines directly through the hole.
- **Layer 2 (`z-index: 2`):** Real HTML text and labels.

```tsx
// Using the *-cutout.png asset
<div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-[#09090b]">
  
  {/* Layer 0: Dynamic Theme Accent Element (Behind Image) */}
  <div 
    className="absolute pointer-events-none transition-all duration-700"
    style={{
      left: "49.2%",
      top: "47.3%",
      transform: "translate(-50%, -50%)",
      width: "360px",
      height: "360px",
      borderRadius: "9999px",
      background: "radial-gradient(circle, var(--color-primary, #e11d48) 0%, rgba(225,29,72,0.2) 50%, transparent 75%)",
      filter: "blur(20px)",
      zIndex: 0,
    }} 
  />

  {/* Layer 1: Cutout PNG with transparent portal */}
  <Image
    src="/images/services/cms-websites-cutout.png"
    alt="CMS Websites"
    fill
    className="object-cover z-[1]"
  />

  {/* Layer 2: Editorial UI */}
  <div className="relative z-[2] p-8 h-full flex flex-col justify-between">
    ...
  </div>
</div>
```

---

### Method C: Pure CSS `mask-image` (Radial Cutout on JPG)

If you prefer to use the lightweight `.jpg` with CSS masking:

```css
.card-image-masked {
  /* Punches a smooth circular hole at 50% 47% */
  mask-image: radial-gradient(circle 140px at 49.2% 47.3%, transparent 95%, black 100%);
  -webkit-mask-image: radial-gradient(circle 140px at 49.2% 47.3%, transparent 95%, black 100%);
}
```

---

## 5. CSS Variable Bindings

To test or switch themes across the site or per-card, simply override `--color-primary` in your CSS or Tailwind classes:

```css
/* Default Ruby Accent (from tokens.css) */
:root {
  --color-primary: #e11d48;
  --color-accent-ruby-glow: rgba(225, 29, 72, 0.12);
}

/* Sapphire Theme */
[data-theme="sapphire"] {
  --color-primary: #2563eb;
  --color-accent-ruby-glow: rgba(37, 99, 235, 0.15);
}

/* Emerald Theme */
[data-theme="emerald"] {
  --color-primary: #10b981;
  --color-accent-ruby-glow: rgba(16, 185, 129, 0.15);
}

/* Amber/Sunset Theme */
[data-theme="amber"] {
  --color-primary: #f59e0b;
  --color-accent-ruby-glow: rgba(245, 158, 11, 0.15);
}
```

---

## 6. Summary of Category Data for `content.ts`

```typescript
export const serviceCards = [
  {
    id: "designing",
    title: "Designing",
    tag: "BRAND CORE",
    subcategories: ["Branding", "Logo", "Print Design", "Motion Graphics", "UI/UX"],
    image: "/images/services/designing.jpg",
    cutoutImage: "/images/services/designing-cutout.png",
    focal: { x: "49.9%", y: "48.6%" },
  },
  {
    id: "cms-websites",
    title: "CMS Websites",
    tag: "WEB ARCHITECTURE",
    subcategories: ["Webflow", "Framer", "WordPress", "Shopify", "Ecommerce Solutions"],
    image: "/images/services/cms-websites.jpg",
    cutoutImage: "/images/services/cms-websites-cutout.png",
    focal: { x: "49.2%", y: "47.3%" },
  },
  {
    id: "product-development",
    title: "Product Development",
    tag: "DIGITAL SYSTEMS",
    subcategories: ["Web Apps", "React Native Development", "PHP Development", "MERN Stack Development", "QA Solutions"],
    image: "/images/services/product-development.jpg",
    cutoutImage: "/images/services/product-development-cutout.png",
    focal: { x: "50.3%", y: "45.3%" },
  },
  {
    id: "mobile-apps",
    title: "Mobile Apps",
    tag: "NATIVE EXPERIENCES",
    subcategories: ["Mobile Apps", "iOS Mobile Apps", "Android Mobile Apps", "React Native Mobile Apps", "Mobile App ASO"],
    image: "/images/services/mobile-apps.jpg",
    cutoutImage: "/images/services/mobile-apps-cutout.png",
    focal: { x: "51.3%", y: "38.3%" },
  },
  {
    id: "marketing",
    title: "Marketing",
    tag: "GROWTH ENGINE",
    subcategories: ["SEO", "SEM", "Social Media Marketing", "PPC Marketing", "On-Page Optimization"],
    image: "/images/services/marketing.jpg",
    cutoutImage: "/images/services/marketing-cutout.png",
    focal: { x: "49.1%", y: "42.1%" },
  },
];
```
