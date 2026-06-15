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
    tagline: "Experiential Designer",
  },
  contact: {
    location: "Manchester, United Kingdom",
    phoneLabel: "+44 793 163 7144",
    phoneHref: "tel:+447931637144",
  },
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
    { label: "Writing", href: "/thinking" },
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
