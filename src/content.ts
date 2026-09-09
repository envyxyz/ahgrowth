/**
 * Single source of truth for every piece of user-facing copy on the site.
 * No component may hardcode a string that a visitor can read — import
 * `content` and reference a field instead. See CLAUDE.md "content.ts is the
 * only place copy lives in code" for the full rule.
 *
 * Structure mirrors SITEMAP.md: one key per route, one nested key per
 * numbered section within that route.
 *
 * ---------------------------------------------------------------------------
 * COPY STATUS, read this before editing.
 *
 * Every string below is WORKING COPY: written to be true, plain, and safe to
 * publish, but not confirmed by AH Growth. It is here so the site reads as
 * finished rather than as a page of empty boxes. Edit freely.
 *
 * What must NOT be added back in without verification:
 *   - any percentage, multiplier, or count ("40% more leads", "4X", "200+ clients")
 *   - client names, logos, awards, or press mentions
 *   - response-time or uptime guarantees
 * A fabricated measurement reads exactly like a real one, which is why it is
 * the one category of copy that stays out until someone confirms it.
 *
 * PLACEHOLDER still marks fields with no honest value yet. A section that
 * depends on one either hides itself or is not built. Never swap a
 * PLACEHOLDER for a plausible-sounding invention.
 *
 * VERIFY BEFORE LAUNCH: footer.directEmail, footer.offices, contact.form
 * .budgetTiers, and both documents under `legal` (need a lawyer's read).
 * ---------------------------------------------------------------------------
 */

export const PLACEHOLDER = "[PLACEHOLDER]" as const;

// ---------------------------------------------------------------------------
// Shared primitives
// ---------------------------------------------------------------------------

export interface NavItem {
  label: string;
  href: string;
  /** Second line for the roll-reveal hover in the expanded nav panel. */
  hoverLabel?: string;
  /**
   * false = the route has no page yet, so it is filtered out of every
   * rendered nav list. Shipping /work or /about later is flipping this one
   * boolean, not re-deriving the nav.
   */
  shipped: boolean;
}

/**
 * Two-tone display statement: full-contrast opening, muted continuation,
 * optional full-contrast close. The recurring signature across the reference
 * set. Rendered by `<Statement>`; never assembled by hand in a section.
 */
export interface Statement {
  lead: string;
  muted: string;
  tail?: string;
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
  /** Full reference plate. */
  imageSrc: string;
  /** Alpha-cutout companion; the accent glow renders behind its aperture. */
  cutoutSrc: string;
  imageAlt: string;
  /** Where the theme-colored glow sits behind the cutout aperture. */
  accentPosition: { left: string; top: string; width: string; height: string };
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

export interface Commitment {
  title: string;
  body: string;
  /** Optional backdrop. Cards with one get a media treatment, not a flat fill. */
  imageSrc?: string;
  imageAlt?: string;
}

export interface EditorialItem {
  src: string;
  alt: string;
  caption: string;
}

/**
 * A statement with small pill-masked images set INSIDE the line, the
 * signature move in primary.jpg. `capsuleAfterLead` drops one capsule at the
 * end of the lead clause; `capsuleAfterMuted` drops one after the muted half.
 */
export interface CapsuleStatement extends Statement {
  capsuleAfterLead?: { src: string; alt: string };
  capsuleAfterMuted?: { src: string; alt: string };
}

// ---------------------------------------------------------------------------
// Global (meta, nav, footer) — shared across every route
// ---------------------------------------------------------------------------

export const meta = {
  siteName: "AH Growth",
  legalName: "AH Growth",
  defaultTitle: "AH Growth | Design, build, and grow",
  titleTemplate: "%s | AH Growth",
  defaultDescription:
    "AH Growth is a growth agency. We design brands, build websites and apps, and run the marketing that brings people to them.",
  /** Absolute origin for metadataBase, canonical URLs and OG images. */
  siteUrl: "https://ahgrowth.com",
  locale: "en",
  /** Rendered inside the generated OG image. */
  ogTagline: "Design, build, and grow.",
};

export const nav = {
  items: [
    { label: "Home", href: "/", shipped: true },
    { label: "Work", href: "/work", hoverLabel: "See the work", shipped: false },
    { label: "About", href: "/about", hoverLabel: "Who we are", shipped: true },
    { label: "Contact", href: "/contact", hoverLabel: "Reach out", shipped: true },
  ] as NavItem[],
  cta: { label: "Start a project", href: "/contact" },
  /** Collapsed-state island pill label. */
  homeLabel: "Home",
  /** Mobile-breakpoint chrome button replacing the nav row. */
  menuLabel: "Menu",
  /** Sub-list heading inside the expanded nav panel. */
  channelsLabel: "Channels",
  /** Suffix shown after the live clock readout in the header. */
  timezoneSuffix: "UTC+5",
  themeToggleLabel: "Switch theme",
  skipToContent: "Skip to content",
  /**
   * Structural accessibility labels. Not editorial copy, but kept here so a
   * translator or editor has one file to work in rather than two.
   */
  a11y: {
    home: "AH Growth, home",
    openMenu: "Open navigation",
    closeMenu: "Close navigation",
    primaryNav: "Primary",
    footerNav: "Footer",
    timezone: "Local time in Pakistan",
  },
};

export const footer = {
  offices: [{ city: "Lahore", address: "Punjab, Pakistan" }] as Office[],
  directEmail: "hello@ahgrowth.com",
  /** Empty until real handles are confirmed. The column hides itself. */
  social: [] as SocialLink[],
  backToTop: "Let’s go up",
  legalLinks: [
    { label: "Privacy Policy", href: "/privacy", shipped: true },
    { label: "Terms of Use", href: "/terms", shipped: true },
  ] as NavItem[],
  columnLabels: {
    direct: "Direct",
    studio: "Studio",
    navigate: "Navigate",
    legal: "Legal",
  },
  /** Giant ghosted wordmark behind the hero and footer. */
  wordmark: "AH Growth",
  /** Narrow-viewport substitute: the full wordmark at its clamp floor is
      wider than a 375px screen and would render as a cropped fragment. */
  wordmarkShort: "AH",
  /** `{year}` is substituted at render time so a static build never goes stale. */
  copyright: "© {year} AH Growth. All rights reserved.",
};

// ---------------------------------------------------------------------------
// Service taxonomy — shared between Home §03 (Capabilities) and Contact §02
// (the services multi-select). One fact, one field: defined once here.
// Card art and accent positions come from
// assets/design/services/SERVICE-CARDS-THEMING-SPEC.md.
// ---------------------------------------------------------------------------

export const serviceCategories: ServiceCategory[] = [
  {
    id: "core",
    name: "Capabilities",
    services: [
      {
        id: "designing",
        title: "Designing",
        summary:
          "The identity people recognise you by, and the interface they actually use.",
        subcategories: ["Branding", "Logo", "Print Design", "Motion Graphics", "UI/UX"],
        imageSrc: "/images/services/designing.jpg",
        cutoutSrc: "/images/services/designing-cutout.png",
        imageAlt: "A gallery wall displaying a large backlit portrait silhouette.",
        accentPosition: { left: "50%", top: "46%", width: "320px", height: "180px" },
      },
      {
        id: "cms-websites",
        title: "CMS Websites",
        summary:
          "Sites your own team can update, without booking a developer every time a price changes.",
        subcategories: ["Webflow", "Framer", "WordPress", "Shopify", "Ecommerce"],
        imageSrc: "/images/services/cms-websites.jpg",
        cutoutSrc: "/images/services/cms-websites-cutout.png",
        imageAlt: "A cosmetic jar with its lid lifted, floating above red mountain peaks.",
        accentPosition: { left: "50%", top: "43%", width: "380px", height: "380px" },
      },
      {
        id: "product-development",
        title: "Product Development",
        summary:
          "Custom software for the point where an off-the-shelf tool stops being enough.",
        subcategories: ["Web Apps", "React Native", "PHP", "MERN Stack", "QA"],
        imageSrc: "/images/services/product-development.jpg",
        cutoutSrc: "/images/services/product-development-cutout.png",
        imageAlt: "Figures walking behind a tall fluted glass wall lit from behind in amber.",
        accentPosition: { left: "50%", top: "45%", width: "500px", height: "500px" },
      },
      {
        id: "mobile-apps",
        title: "Mobile Apps",
        summary: "Native and cross-platform apps, from the first screen to the store listing.",
        subcategories: [
          "iOS Apps",
          "Android Apps",
          "React Native",
          "App Store Optimisation",
        ],
        imageSrc: "/images/services/mobile-apps.jpg",
        cutoutSrc: "/images/services/mobile-apps-cutout.png",
        imageAlt: "A titanium smartphone floating at an angle with red rim lighting.",
        accentPosition: { left: "51%", top: "38%", width: "400px", height: "400px" },
      },
      {
        id: "marketing",
        title: "Marketing",
        summary: "Search, paid, and social, run against the numbers that pay for them.",
        subcategories: ["SEO", "SEM", "Social Media", "PPC", "On-Page Optimisation"],
        imageSrc: "/images/services/marketing.jpg",
        cutoutSrc: "/images/services/marketing-cutout.png",
        imageAlt: "Matte red over-ear headphones on a studio pedestal under directional light.",
        accentPosition: { left: "50%", top: "42%", width: "360px", height: "360px" },
      },
    ],
  },
];

/** Flat view, used by the capabilities grid and the contact form's chip list. */
export const services: Service[] = serviceCategories.flatMap((c) => c.services);

// ---------------------------------------------------------------------------
// Home (/)
// ---------------------------------------------------------------------------

export const home = {
  hero: {
    eyebrow: "Growth agency, Pakistan",
    headline: "The studio behind growing businesses.",
    subheadline:
      "AH Growth designs brands, builds the websites and apps they run on, and handles the marketing that brings people to them. One team, from the first sketch to live traffic.",
    cta: { label: "Start a project", href: "/contact" },
    secondaryCta: { label: "See what we do", href: "#capabilities" },
    /** Small mono block set opposite the headline, per primary.jpg. */
    microNote: "Brand, build, and the traffic that follows.",
    /** Full-bleed backdrop. `mobileSrc` is the portrait crop: the landscape
        plate loses its subject entirely at 375px. */
    media: {
      src: "/images/hero/hero-primary.jpg",
      mobileSrc: "/images/hero/hero-primary-mobile.jpg",
      alt: "",
    },
    /** The floating card bottom-left. primary.jpg puts a percentage here;
        a claim goes in instead, because that percentage is a measurement
        and no verified figure exists. */
    floatingCard: { label: "What you get", claim: "One team, end to end." },
    /** Screen-reader heading for the capability pill row over the media. */
    tagsLabel: "Capabilities",
    /** Floating status badges per primary.jpg. Empty: every candidate value
        here would be a measurement, and none are verified. */
    metrics: [] as Metric[],
  },

  positioning: {
    /** The exhale after the hero. Centred, with pill-masked images set into
        the line: the signature composition in primary.jpg. */
    statement: {
      lead: "Good design is where it starts.",
      muted:
        "What makes it worth paying for is everything after: a build that holds up, traffic that finds it, and the changes you make once real people are using it.",
      capsuleAfterLead: {
        src: "/images/blobs/blob-01.jpg",
        alt: "",
      },
      capsuleAfterMuted: {
        src: "/images/blobs/blob-02.jpg",
        alt: "",
      },
    } as CapsuleStatement,
    /** Mono micro-label set in the top-right corner of the statement band. */
    microLabel: "Built to last",
    support:
      "We take on the whole thing: the identity, the site or app it runs on, and the campaigns that send people to it. Fewer handoffs, fewer places for the work to fall apart.",
  },

  /** Asymmetric media row. Three frames at staggered vertical offsets. */
  editorial: {
    lead: "How the work looks",
    body: "Brand systems, interfaces, and the campaigns that carry them.",
    cta: { label: "Start a project", href: "/contact" },
    items: [
      {
        src: "/images/editorial/editorial-01.jpg",
        alt: "A gallery wall displaying a large backlit portrait silhouette.",
        caption: "Identity and art direction",
      },
      {
        src: "/images/editorial/editorial-02.jpg",
        alt: "A product jar with its lid lifted, floating above red mountain peaks.",
        caption: "Commerce and CMS builds",
      },
      {
        src: "/images/editorial/editorial-03.jpg",
        alt: "Matte red over-ear headphones on a studio pedestal under directional light.",
        caption: "Campaign and performance",
      },
    ] as EditorialItem[],
  },

  capabilities: {
    id: "capabilities",
    eyebrow: "What we do",
    heading: {
      lead: "Everything your brand",
      muted: "needs to grow.",
    } as Statement,
    intro: "Five practices, one team. Take one of them or take all five.",
    /** Label above each card's sub-category chip list. */
    includesLabel: "Includes",
  },

  /**
   * 05 — Social Proof. SITEMAP.md scopes this as metric callouts, craft
   * guarantees and credibility proof. The MVP ships the guarantees: they are
   * commitments AH Growth controls, not measurements nobody has verified.
   * `metrics` and `clientLogos` stay typed and empty; both render only when
   * filled, so real figures later are a content edit, not a rebuild.
   */
  socialProof: {
    eyebrow: "How we work",
    heading: {
      lead: "Custom every time.",
      muted: "No templates, no recycled layouts.",
    } as Statement,
    commitments: [
      {
        title: "Built from scratch",
        body: "Every site and app we ship is written for the business it belongs to. We do not start from a purchased theme and rename the buttons.",
      },
      {
        title: "You own all of it",
        body: "Code, design files, hosting, analytics, and domains are handed over in your name. Leaving us should cost you nothing but notice.",
      },
      {
        title: "You talk to the people building it",
        body: "No account manager relaying messages between you and the work. The designer and the developer on your project are the ones in the room.",
        imageSrc: "/images/texture/gradient-card.jpg",
        imageAlt: "",
      },
      {
        title: "We stay past launch",
        body: "Launch is where we start learning what needs to change. We plan for that instead of invoicing and disappearing.",
      },
    ] as Commitment[],
    /** Fill when AH Growth supplies verified figures. */
    metrics: [] as Metric[],
    /** Fill when client logos are cleared for display. */
    clientLogos: [] as { name: string; logoSrc: string }[],
  },

  /** 06 — Studio Culture. Cut until real photo/video assets exist. */
  studioCulture: null as null | {
    eyebrow: string;
    heading: string;
    media: { src: string; alt: string }[];
  },

  ctaOutro: {
    id: "start",
    headline: {
      lead: "Tell us what you are trying to build.",
      muted: "We will tell you what it takes.",
    } as Statement,
    cta: { label: "Start a project", href: "/contact" },
    directPrefix: "Or email us at",
    media: {
      src: "/images/texture/gradient-card.jpg",
      alt: "",
    },
  },
};

// ---------------------------------------------------------------------------
// Work Archive (/work) + Case Study (/work/[slug]) — NOT BUILT.
// Types stay so the shape is settled before the first real case study lands.
// ---------------------------------------------------------------------------

export interface CaseStudyResult {
  metric: string;
  value: string;
}

export interface Project {
  slug: string;
  title: string;
  client: string;
  disciplines: string[];
  year: string;
  thumbnailSrc: string;
  previewVideoSrc?: string;
  caseStudy?: {
    heroMediaSrc: string;
    challenge: { label: string; headline: string; body: string };
    approach: { label: string; body: string };
    deliverables: { label: string; body: string; items: string[] };
    /** Only when the client has real, verifiable numbers. */
    results?: CaseStudyResult[];
  };
}

export const work = {
  archive: {
    heading: PLACEHOLDER,
    reassurance: PLACEHOLDER,
  },
  projects: [] as Project[],
};

// ---------------------------------------------------------------------------
// About (/about) — NOT BUILT.
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
    eyebrow: "About",
    heading: {
      lead: "Built by the people",
      muted: "who do the work.",
    } as Statement,
    body: [
      "AH Growth started because too many businesses were buying a logo from one place, a website from another, and ads from a third, then being left to make the three agree with each other. We do all of it, so the parts fit.",
      "We work with local businesses across Pakistan, and with software teams who need the same things done properly. Small enough that you know who is on your project. Set up so the work does not stop at handover.",
    ],
  },

  /**
   * Delivery phases. Working copy: this is how a project of this shape
   * normally runs, and it is safe to publish, but confirm it against how AH
   * Growth actually works before launch.
   */
  process: {
    eyebrow: "How a project runs",
    heading: {
      lead: "Four phases.",
      muted: "No surprises in the middle.",
    } as Statement,
    phases: [
      {
        label: "01",
        heading: "Discovery",
        body: "We learn the business before designing anything: who buys from you, what they compare you against, and what is actually slowing growth down. You get our read on it in writing.",
      },
      {
        label: "02",
        heading: "Strategy",
        body: "Scope, priorities, and a plan you can argue with. Nothing gets built until we agree on what success looks like and what it costs.",
      },
      {
        label: "03",
        heading: "Build",
        body: "Design and development run together rather than in sequence. You see working screens early and often, so changes stay cheap while they are still cheap.",
      },
      {
        label: "04",
        heading: "Growth",
        body: "Launch is a checkpoint, not the finish. We watch how people actually use the thing, then fix what the numbers argue with.",
      },
    ] as ProcessPhase[],
  },

  /** Ships as editorial photography once real photos exist. Section omitted until then. */
  team: [] as TeamMember[],

  /** Only once AH Growth has real, citable awards or press. */
  recognition: null as null | {
    heading: string;
    items: { title: string; issuer: string; year: string }[];
  },
};

// ---------------------------------------------------------------------------
// Contact (/contact)
// ---------------------------------------------------------------------------

export const contact = {
  intro: {
    eyebrow: "Contact",
    heading: {
      lead: "Start a project.",
      muted: "Tell us what you need.",
    } as Statement,
    body: "Fill this in and you will hear back from a person who can actually answer it. If we are not the right fit for the work, we will say so.",
  },

  availability: {
    /** Flip to true only when the statusLabel below is true and current. */
    isOpen: false,
    statusLabel: PLACEHOLDER,
  },

  form: {
    heading: "Project brief",
    servicesLabel: "You need help with",
    budgetLabel: "Your budget",
    /** Working bands. Confirm real pricing before launch. */
    budgetTiers: [
      "Under $2,000",
      "$2,000 – $5,000",
      "$5,000 – $10,000",
      "More than $10,000",
      "Not sure yet",
    ],
    fields: {
      name: "Name",
      email: "Email",
      company: "Company name",
      designation: "Your designation",
      phone: "Phone number",
      referralSource: "How did you hear about us",
      projectDetails: "Share details about your project",
    },
    referralOptions: [
      "Search",
      "Social media",
      "A referral",
      "We have worked together before",
      "Somewhere else",
    ],
    optionalSuffix: "(optional)",
    submitLabel: "Send now",
    /**
     * Static site, no backend. The form composes a mailto: draft. Honest and
     * zero infrastructure. Swap for a real endpoint when one exists.
     */
    mailtoSubject: "Project inquiry from {name}",
    fallbackNote: "This opens your email app with the details filled in.",
  },

  reassuranceHeading: "What to expect",
  reassurance: [
    {
      title: "A reply, not a ticket",
      body: "Every inquiry is read by someone who can answer it. No queue, no autoresponder pretending to be a person.",
    },
    {
      title: "Nothing gets shared",
      body: "Whatever you send stays between us. We will sign an NDA before the first call if you would rather have it in writing.",
    },
    {
      title: "The first call is scoping",
      body: "It is a conversation about the work, not a pitch. You leave with a clear picture of what it takes whether or not you hire us.",
    },
  ] as Commitment[],

  direct: {
    eyebrow: "Direct",
    heading: "Rather just email?",
    /** Mirrors footer.directEmail. One fact, one field. */
    get email() {
      return footer.directEmail;
    },
    get offices() {
      return footer.offices;
    },
  },
};

// ---------------------------------------------------------------------------
// Legal (/privacy, /terms)
//
// Working documents. They describe how a small agency site of this shape
// normally operates and are safe to publish, but they are NOT legal advice
// and have not been reviewed by a lawyer. Get them read before launch.
// ---------------------------------------------------------------------------

export interface LegalSection {
  heading: string;
  body: string[];
}

export interface LegalDocument {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

export const legal: { privacy: LegalDocument; terms: LegalDocument } = {
  privacy: {
    title: "Privacy Policy",
    updated: "Last updated 8 September 2026",
    intro:
      "This policy explains what AH Growth collects when you use this site, why we collect it, and what you can ask us to do about it.",
    sections: [
      {
        heading: "What we collect",
        body: [
          "If you send us a project inquiry, we receive whatever you put in that form: your name, email address, company, phone number, and the details of the project you describe.",
          "We do not collect payment details through this website.",
        ],
      },
      {
        heading: "Why we collect it",
        body: [
          "We use what you send to answer your inquiry, scope the work, and stay in touch about it. We do not sell it, rent it, or pass it to anyone outside the people working on your project.",
        ],
      },
      {
        heading: "How long we keep it",
        body: [
          "Inquiry details are kept while the conversation is active and for a reasonable period afterwards, in case you come back to it. You can ask us to delete them at any point.",
        ],
      },
      {
        heading: "Cookies and analytics",
        body: [
          "This site stores your light or dark theme choice in your browser so it is remembered on your next visit. That value never leaves your device and is not sent to us.",
          "If analytics are added later, this section will be updated to name the tool and what it records before it goes live.",
        ],
      },
      {
        heading: "Your choices",
        body: [
          "You can ask to see what we hold about you, ask us to correct it, or ask us to delete it. Email us and we will action it.",
        ],
      },
      {
        heading: "Changes to this policy",
        body: [
          "If this policy changes, the date at the top changes with it. Material changes will be described here rather than made quietly.",
        ],
      },
    ],
  },

  terms: {
    title: "Terms of Use",
    updated: "Last updated 8 September 2026",
    intro:
      "These terms cover your use of this website. They do not cover client engagements, which are governed by the separate agreement signed for that project.",
    sections: [
      {
        heading: "Using this site",
        body: [
          "You are welcome to browse, read, and share this site. Do not attempt to disrupt it, access parts of it that are not public, or use it to distribute anything harmful.",
        ],
      },
      {
        heading: "Our content",
        body: [
          "The writing, design, code, and imagery on this site belong to AH Growth unless credited otherwise. Ask before republishing any of it.",
        ],
      },
      {
        heading: "What you send us",
        body: [
          "Sending an inquiry does not create a contract or a client relationship. Work begins when both sides sign a scope of work.",
          "Do not send confidential material through the inquiry form. Ask us for an NDA first and send it after that is in place.",
        ],
      },
      {
        heading: "Accuracy",
        body: [
          "We keep this site current, but we do not guarantee that every page is complete or free of errors at every moment. Nothing here is a binding offer or a quote.",
        ],
      },
      {
        heading: "Links out",
        body: [
          "Where we link to another site, we are not responsible for what is on it or what it does with your data.",
        ],
      },
      {
        heading: "Contact",
        body: [
          "Questions about these terms can go to the email address in the footer.",
        ],
      },
    ],
  },
};

// ---------------------------------------------------------------------------
// 404
// ---------------------------------------------------------------------------

export const notFound = {
  eyebrow: "404",
  heading: {
    lead: "This page is not here.",
    muted: "It may have moved, or it may never have existed.",
  } as Statement,
  cta: { label: "Back to home", href: "/" },
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
  legal,
  notFound,
};

export default content;
