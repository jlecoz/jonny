export const siteConfig = {
  /** Production origin — used for canonical URLs, OG images, sitemap */
  siteUrl: "https://jonny.socialdynamix.co",

  /**
   * Adobe Fonts (Typekit) kit IDs → https://use.typekit.net/{id}.css (Nexa + nh-grotesk + termina).
   * If fonts fail on production only: Web Project domain settings must allow this host (e.g.
   * jonny.socialdynamix.co, *.vercel.app).
   */
  adobeFontsKitIds: ["ejw0fwc"],
  brand: {
    logoText: "JONATHAN LE COZ",
    /* CONFIRM — canonical searchable title (<title>, og:*, twitter:*, footer) */
    canonicalTitle: "Jonathan Le Coz — Design Director",
    /* CONFIRM — hero level label (directly above lead line) */
    roleTitle: "Design Director",
    /* CONFIRM — sub-descriptor (footer; not shown in hero) */
    subDescriptor:
      "Design systems · experience · front-end-literate leadership",
    /* Demoted — optional decorative tagline only; never primary identity */
    tagline: "Experiential Designer",
  },
  /* CONFIRM — geography / availability (hero + home contact section) */
  availability:
    "Returning to continental Europe — open to Design Director / Head of Design roles across Belgium & the Netherlands.",
  seo: {
    /* CONFIRM — meta description; leads with recruiter-searchable leadership terms */
    description:
      "Design Director & Head of Design — design systems, design leadership, and front-end-literate product direction. Open to roles across Benelux (Belgium & Netherlands). 20+ years across brand, product and web technology.",
    keywords: [
      "Design Director",
      "Head of Design",
      "design systems",
      "design leadership",
      "Benelux",
      "Belgium",
      "Netherlands",
      "product design leadership",
      "Jonathan Le Coz",
    ],
  },
  contact: {},
  theme: {
    // Brand palette — Jonny CV (light surfaces)
    background: "#F5F5F5", // Off-White — Neutral BG
    foreground: "#0A0B0C", // Void — Primary text
    accent: "#4AC8E8", // Cyan Strike — Accent / CTA
    accentAlt: "#24A89E", // Bright Teal — Active / Hover
    surface: "#F2F8FA", // White — Light Surface
    surfaceBorder: "#E5E5E5", // Light Gray — Dividers
    grey: "#0D3D3A", // Deep Teal — secondary on light
    greyMid: "#1A7A73", // Core Teal — tertiary / labels
    navy: "#0A0B0C", // Void
    goldLight: "#7DDFF2", // Cyan Light — Highlight
    coreTeal: "#1A7A73", // Core Teal — Brand midtone
    pixelBlue: "#2D8EBF", // Pixel Blue — Digital motif
    void: "#0A0B0C",
    deepTeal: "#0D3D3A",
    brightTeal: "#24A89E",
    cyanStrike: "#4AC8E8",
    cyanLight: "#7DDFF2",
    steel: "#B8D4D8",
    fog: "#D6E8EC",
    white: "#F2F8FA",
    offWhite: "#F5F5F5",
    lightGray: "#E5E5E5",
  },
  contactEmail: "jonathan.lecoz@gmail.com",
  nav: [
    { label: "Works", href: "/#works" },
    { label: "About", href: "/about" },
    { label: "Writing", href: "/writing" },
    { label: "Experience & Skills", href: "/skills" },
    { label: "Education", href: "/education" },
  ],
  social: {
    instagram: "#",
    linkedin: "https://www.linkedin.com/in/jonathan-lecoz/",
    x: "#",
    youtube: "#",
  },
};
