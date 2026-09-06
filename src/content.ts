/**
 * Single source of truth for every piece of user-facing copy on the site.
 * No component may hardcode a string that a visitor can read — import
 * `content` and reference a field instead. See CLAUDE.md "content.ts is the
 * only place copy lives in code" for the full rule.
 *
 * Structure mirrors SITEMAP.md: one key per route, one nested key per
 * numbered section within that route. Keep this file and SITEMAP.md in sync
 * — if a section is renamed/reordered there, mirror it here in the same pass.
 *
 * PLACEHOLDER marks a field with no verified real-world value yet (a stat,
 * an award, a price, an office address). Never replace a PLACEHOLDER with a
 * plausible-sounding invented value — replace it only with a real, confirmed
 * one. Components should treat `undefined`/`null` sections (studioCulture,
 * recognition) as "not built yet", not as an empty state to design around.
 */

export const PLACEHOLDER = "[PLACEHOLDER]" as const;

// ---------------------------------------------------------------------------
// Shared primitives
// ---------------------------------------------------------------------------

export interface NavItem {
  label: string;
  href: string;
}

export interface Metric {
  value: string;
  label: string;
}

export interface Service {
  id: string;
  title: string;
  /** Short line shown on the unfocused/compact card state. */
  summary: string;
  subcategories: string[];
}

export interface ServiceCategory {
  id: string;
  name: string;
  services: Service[];
}

export interface Office {
  city: string;
  address: string;
  phone?: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

// ---------------------------------------------------------------------------
// Global (nav, footer, meta) — shared across every route
// ---------------------------------------------------------------------------

export const meta = {
  siteName: "AH Growth",
  legalName: "AH Growth",
  /** <title> default + fallback OG description. Keep to one plain sentence. */
  defaultTitle: PLACEHOLDER,
  defaultDescription: PLACEHOLDER,
};

export const nav = {
  items: [
    { label: "Home", href: "/" },
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ] as NavItem[],
  cta: { label: "Start a project", href: "/contact" },
};

export const footer = {
  /** Only offices AH Growth actually operates from. Empty until confirmed. */
  offices: [] as Office[],
  directEmail: PLACEHOLDER,
  social: [] as SocialLink[],
  backToTop: "Let's go up",
  legalLinks: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
  ] as NavItem[],
  /** Rendered as the giant liquid-letterform wordmark, curtain footer §8. */
  wordmark: "AH Growth",
  copyright: `© ${new Date().getFullYear()} AH Growth. All rights reserved.`,
};

// ---------------------------------------------------------------------------
// Service taxonomy — shared between Home §03 (Capabilities Carousel) and
// Contact §02 (services multi-select in the inquiry form). One fact, one
// field: define it once here, both sections reference it.
//
// PLACEHOLDER STRUCTURE. SITEMAP.md §2 explicitly bars using the reference
// taxonomy sourced from inspirations.md (that was for IA shape only) as real
// content. Nothing below is confirmed AH Growth service copy — see the
// discussion note at the bottom of this file for what's needed to close it out.
// ---------------------------------------------------------------------------

export const serviceCategories: ServiceCategory[] = [];

/** Flat view of every service across every category, for the carousel and the contact form's chip list. */
export const services: Service[] = serviceCategories.flatMap((c) => c.services);

// ---------------------------------------------------------------------------
// Home (/)
// ---------------------------------------------------------------------------

export const home = {
  hero: {
    eyebrow: PLACEHOLDER,
    headline: PLACEHOLDER,
    subheadline: PLACEHOLDER,
    cta: { label: "Explore now", href: "/work" },
    /** Floating status badges/metrics per primary.jpg reference. */
    metrics: [] as Metric[],
  },

  positioning: {
    /** One sentence, no invented claims. The sensory "exhale" after the hero. */
    statement: PLACEHOLDER,
  },

  capabilities: {
    eyebrow: "What we do",
    heading: PLACEHOLDER,
  },

  selectedWork: {
    eyebrow: "Selected work",
    heading: PLACEHOLDER,
    /** 3-4 flagship project slugs only, referencing work.projects below. */
    featuredSlugs: [] as string[],
  },

  socialProof: {
    eyebrow: "Social proof",
    /** Monochrome logo marquee. Empty until real client logos are cleared for display. */
    clientLogos: [] as { name: string; logoSrc: string }[],
    /** Bento grid modules — see inspirations.md Element 6 for card roles A-E. Every number must be real; ships with PLACEHOLDER until AH Growth supplies figures. */
    bento: {
      conversionStat: { value: PLACEHOLDER, copy: PLACEHOLDER },
      craftStatement: PLACEHOLDER,
      engagementStat: { value: PLACEHOLDER, copy: PLACEHOLDER },
      retentionStat: { value: PLACEHOLDER, copy: PLACEHOLDER },
    },
  },

  /**
   * Studio Culture (§06). SITEMAP.md: cut entirely from the initial build
   * if no real photo/video assets exist. Leave `null` until real assets and
   * copy are ready — do not fill with stock imagery placeholders.
   */
  studioCulture: null as null | {
    eyebrow: string;
    heading: string;
    media: { src: string; alt: string }[];
  },

  ctaOutro: {
    headline: PLACEHOLDER,
    cta: { label: "Start a project", href: "/contact" },
  },
};

// ---------------------------------------------------------------------------
// Work Archive (/work) + Case Study (/work/[slug])
// ---------------------------------------------------------------------------

export interface CaseStudyResult {
  metric: string;
  value: string;
}

export interface Project {
  slug: string;
  title: string;
  client: string;
  /** Filter pill categories this project matches, e.g. "Web Design", "Branding". Sourced from real disciplines once defined, not the placeholder service taxonomy above. */
  disciplines: string[];
  year: string;
  thumbnailSrc: string;
  /** Optional hover-scrub preview reel; falls back to thumbnailSrc when absent. */
  previewVideoSrc?: string;

  caseStudy?: {
    heroMediaSrc: string;
    challenge: { label: string; headline: string; body: string };
    approach: { label: string; body: string };
    deliverables: { label: string; body: string; items: string[] };
    /** Only present when the client has real, verifiable numbers. Omit the whole module otherwise, never invent a figure. */
    results?: CaseStudyResult[];
  };
}

export const work = {
  archive: {
    heading: PLACEHOLDER,
    /** Derived at runtime from work.projects.length rather than duplicated here. */
    reassurance: PLACEHOLDER,
  },
  /** No projects until real case studies exist. */
  projects: [] as Project[],
};

// ---------------------------------------------------------------------------
// About (/about)
// ---------------------------------------------------------------------------

export interface TeamMember {
  name: string;
  role: string;
  photoSrc: string;
}

export interface ProcessPhase {
  label: string;
  heading: string;
  body: string;
}

export const about = {
  manifesto: {
    heading: PLACEHOLDER,
    body: PLACEHOLDER,
  },

  /** AH Growth's actual delivery phases. Empty until the real methodology (discovery, strategy, execution, etc.) is confirmed — not a fabricated phase list. */
  process: {
    heading: PLACEHOLDER,
    phases: [] as ProcessPhase[],
  },

  team: [] as TeamMember[],

  /** Only ships once AH Growth has real, citable awards or press. Leave null otherwise, do not build an empty trophy wall. */
  recognition: null as null | { heading: string; items: { title: string; issuer: string; year: string }[] },
};

// ---------------------------------------------------------------------------
// Contact (/contact)
// ---------------------------------------------------------------------------

export const contact = {
  availability: {
    /** Only render if true and current, e.g. "Booking Q1 2026". No countdown/scarcity copy. */
    isOpen: false,
    statusLabel: PLACEHOLDER,
  },

  form: {
    heading: "Start a project",
    servicesLabel: "You need to do",
    /** Sourced from services (flat taxonomy) above once real. */
    budgetLabel: "Your budget",
    /** Placeholder tiers until AH Growth confirms real pricing bands. */
    budgetTiers: [] as string[],
    fields: {
      name: "Name",
      email: "Email",
      company: "Company name",
      designation: "Your designation",
      phone: "Phone number",
      referralSource: "How did you hear about us",
      projectDetails: "Share details about your project",
    },
    submitLabel: "Send now",
  },

  /** Only guarantees AH Growth actually honors (response time, point of contact, confidentiality). Empty until confirmed. */
  reassurance: [] as { title: string; body: string }[],

  direct: {
    email: PLACEHOLDER,
    /** Mirrors footer.offices. */
    offices: [] as Office[],
  },
};

// ---------------------------------------------------------------------------
// Aggregate export
// ---------------------------------------------------------------------------

export const content = {
  meta,
  nav,
  footer,
  serviceCategories,
  services,
  home,
  work,
  about,
  contact,
};

export default content;
