/**
 * Featured work grid + deep case study pages (/works/[slug]).
 */

export const worksProjects = [
  {
    slug: "breeze-ds",
    title: "Breeze Design Systems 2026",
    client: "Imperial Brands",
    blurb: "Multi-brand whitelabel systems and platforms for next-generation smoking products",
    href: "https://www.imperialbrandsplc.com",
    coverImage: "/img/works-breeze-design-systems-2026.webp",
    coverImageWidth: 2048,
    coverImageHeight: 1152,
    coverImageClassName: "cv-work-card-cover-img--anchor-bottom-right",
    coverAlt: "Breeze design system — NGP Digital",
    documentationHref: "/breeze-ds-case-study.html",
    caseStudy: {
      heroDek:
        "A focused view of the Breeze design framework work: the problem it solved, how the process stayed visible, and the outcomes it made measurable.",
      sections: [
        {
          id: "clear-problem-statement",
          label: "TOPIC AREA",
          title: "Clear Problem Statement",
          body: [
            "Imperial's NGP digital teams needed to scale multi-brand product experiences without rebuilding the same patterns for every market, brand, and squad.",
            "The challenge was to create a shared system that reduced duplicated design and engineering effort while still allowing each portfolio brand to retain its own identity and regulatory needs.",
          ],
        },
        {
          id: "process-transparency",
          label: "TOPIC AREA",
          title: "Process Transparency",
          body: [
            "The work made decision-making, contribution paths, and design rationale visible across product, design, engineering, and external partner teams.",
            "Shared documentation, reusable components, and governance rituals helped teams understand what existed, how to use it, and when to contribute improvements back into the system.",
          ],
        },
        {
          id: "measurable-outcomes",
          label: "TOPIC AREA",
          title: "Measurable Outcomes",
          body: [
            "Breeze gave teams a clearer way to track reuse, consistency, and delivery quality across brands and product surfaces.",
            "The system created a foundation for faster delivery, stronger file structure and visibility, and more consistent customer experiences across blu.com, pulze.com, and related Imperial Brands digital channels.",
          ],
        },
      ],
    },
  },
  {
    slug: "loyalty-program",
    title: "Loyalty Program",
    client: "Imperial Brands",
    blurb: "Consumer loyalty scheme with points and rewards for purchases on blu.com",
    href: "https://www.blu.com",
    coverImage: "/img/works-blu-loyalty-program.webp",
    coverImageWidth: 2048,
    coverImageHeight: 1164,
    coverImageClassName: "cv-work-card-cover-img--anchor-bottom-right",
    coverAlt:
      "blu.com — hero with pod device, SWAP THE PODS / KEEP THE VAPE messaging, and VAPE BUNDLES section",
    caseStudy: {
      heroDek:
        "End-to-end loyalty UX — earning, redemption, and lifecycle communications tuned for retention and clarity.",
      sections: [
        {
          id: "overview",
          label: "OVERVIEW",
          body: [
            "Designed the reward mechanics surface area on web and email touchpoints so members always understand balance, tier progress, and next-best actions.",
          ],
        },
        {
          id: "challenge",
          label: "CHALLENGE",
          title: "Trust and transparency",
          body: [
            "Rules and promotions changed by market; the experience had to stay simple while reflecting complex backend logic.",
          ],
        },
        {
          id: "approach",
          label: "THE APPROACH",
          type: "process",
          steps: [
            { name: "Discovery", tint: "#1a7a73" },
            { name: "Define", tint: "#24a89e" },
            { name: "Design", tint: "#4ac8e8" },
            { name: "Deliver", tint: "#7ddff2" },
          ],
        },
        {
          id: "discovery",
          label: "DISCOVERY & INSIGHTS",
          type: "quote",
          quote:
            "People understood points; they struggled to see why their tier moved or how limited-time boosts worked.",
          attribution: "Qualitative interviews — registered members",
        },
        {
          id: "ia",
          label: "INFORMATION ARCHITECTURE",
          body: [
            "Structured account areas around three anchors: earnings history, redeemable catalogue, and tier journey — minimizing dead-ends during campaigns.",
          ],
        },
        {
          id: "design-system",
          label: "DESIGN SYSTEM & PROTOTYPING",
          type: "palette",
          palette: ["#0a0b0c", "#1a7a73", "#4ac8e8", "#e8927c", "#ffffff"],
          body: [
            "High-fidelity prototypes aligned marketing, legal, and product on edge cases before build; components reused patterns from Breeze DS where applicable.",
          ],
        },
      ],
    },
  },
  {
    slug: "digital-retailing",
    title: "Digital Retailing",
    client: "Auto Trader UK",
    blurb: "Online digital purchase journey for automotive retailers on autotrader.co.uk",
    href: "https://www.autotrader.co.uk",
    coverImage: "/img/works-autotrader-deal-builder-hero.webp",
    coverImageWidth: 2048,
    coverImageHeight: 1106,
    coverAlt:
      "Auto Trader UK — Build your deal: reservation flow with progress steps and vehicle summary",
    caseStudy: {
      heroDek:
        "Connecting retailer tooling with consumer-facing flows — reservations, finance, and part-exchange in one coherent funnel.",
      sections: [
        {
          id: "overview",
          label: "OVERVIEW",
          body: [
            "Led UX direction for pilot retailers adopting digital retailing capabilities, reducing drop-off across handoffs between retailer CRM and marketplace surfaces.",
          ],
        },
        {
          id: "challenge",
          label: "CHALLENGE",
          title: "Many stakeholders, one journey",
          body: [
            "Retailers varied widely in readiness; flows had to degrade gracefully while still producing complete orders for fulfilment.",
          ],
        },
        {
          id: "approach",
          label: "THE APPROACH",
          type: "process",
          steps: [
            { name: "Discovery", tint: "#1a7a73" },
            { name: "Define", tint: "#24a89e" },
            { name: "Design", tint: "#4ac8e8" },
            { name: "Deliver", tint: "#7ddff2" },
          ],
        },
        {
          id: "discovery",
          label: "DISCOVERY & INSIGHTS",
          type: "quote",
          quote:
            "Staff lived in spreadsheets and phone callbacks — surfacing stock and deal status digitally had to feel safer than their old playbook.",
          attribution: "Retail partner interviews",
        },
        {
          id: "ia",
          label: "INFORMATION ARCHITECTURE",
          body: [
            "Mapped retailer admin tasks vs buyer-facing milestones so both sides stayed synchronised across test drives, deposits, and amendments.",
          ],
        },
        {
          id: "design-system",
          label: "DESIGN SYSTEM & PROTOTYPING",
          type: "palette",
          palette: ["#003d39", "#00847a", "#00bfb3", "#ff8800", "#ffffff"],
          body: [
            "Specs covered responsive breakpoints, validation states, and API-driven empty states — enabling squads to iterate in parallel.",
          ],
        },
      ],
    },
  },
  {
    slug: "hospitality-app",
    title: "Hospitality App",
    client: "Ser.vi",
    blurb: "Consumer restaurant menu self-service to in-kitchen printing for staff",
    href: "https://get.ser.vi",
    coverImage: "/img/works-hospitality-ser-vi.webp",
    coverImageWidth: 2048,
    coverImageHeight: 1106,
    coverImageClassName: "cv-work-card-cover-img--contain",
    coverBackgroundColor: "#f25900",
    coverAlt: "Ser.vi restaurant app — menu and table experience",
    caseStudy: {
      heroDek:
        "Tableside ordering that stays fast during service — syncing guest devices with kitchen printers and fulfilment pacing.",
      sections: [
        {
          id: "overview",
          label: "OVERVIEW",
          body: [
            "Defined flows for browse-to-order during peak seating, waiter overrides, split bills, and allergy callouts routed clearly to kitchen tickets.",
          ],
        },
        {
          id: "challenge",
          label: "CHALLENGE",
          title: "Operational reality",
          body: [
            "Guests expect instant feedback; kitchens need sane ticket batching — the UI had to reduce cognitive load under stress.",
          ],
        },
        {
          id: "approach",
          label: "THE APPROACH",
          type: "process",
          steps: [
            { name: "Discovery", tint: "#1a7a73" },
            { name: "Define", tint: "#24a89e" },
            { name: "Design", tint: "#4ac8e8" },
            { name: "Deliver", tint: "#7ddff2" },
          ],
        },
        {
          id: "discovery",
          label: "DISCOVERY & INSIGHTS",
          type: "quote",
          quote:
            "Servers didn’t fear tablets — they feared ambiguity when modifiers didn’t land on the right prep station.",
          attribution: "Shadowing shifts — casual dining pilots",
        },
        {
          id: "ia",
          label: "INFORMATION ARCHITECTURE",
          body: [
            "Grouped menus by station routing and prep time — surfacing modifiers that affect kitchen timing before guests confirm.",
          ],
        },
        {
          id: "design-system",
          label: "DESIGN SYSTEM & PROTOTYPING",
          type: "palette",
          palette: ["#2c142f", "#5c3d6e", "#e8927c", "#f5ebe0", "#ffffff"],
          body: [
            "Mobile prototypes covered offline-tolerant messaging and paired testing with thermal print layouts for expo lines.",
          ],
        },
      ],
    },
  },
];

export function getWorkBySlug(slug) {
  return worksProjects.find((w) => w.slug === slug) ?? null;
}
