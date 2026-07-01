/** Profile on LinkedIn */
export const linkedInProfileUrl = "https://www.linkedin.com/in/jonathan-lecoz/";

/** Earlier roles (e.g. IMS Health) — same profile */
export const linkedInExperienceUrl = linkedInProfileUrl;

/** Received recommendations — recommendations tab on profile */
export const linkedInRecommendationsUrl =
  "https://www.linkedin.com/in/jonathan-lecoz/details/recommendations/";

export const cv = {
  name: "Jonathan Le Coz",
  /* CONFIRM — hero lead line (verbatim) */
  heroLead:
    "I design. And I build. Twenty years of both. And I still write the front-end.",
  /* CONFIRM — removed from hero UI: scrambled "Experiential Designer" headline.
     Restore decorativeTagline + HeroGoldScramble only if Star wants it back. */
  decorativeTagline: "Experiential Designer",
  meta: "20+ years of creative arts, brand design and web technology",
  email: "jonathan.lecoz@gmail.com",
  languages: [
    { label: "English", level: 5 },
    { label: "French", level: 5 },
    { label: "Spanish", level: 1 },
  ],
  /** LinkedIn-aligned: one card per employer; multiple roles share logo + timeline rail */
  experienceGroups: [
    {
      key: "imperial",
      orgDisplay: "Imperial Brands PLC",
      orgUrl: "https://www.imperialbrandsplc.com",
      logoDomain: "imperialbrandsplc.com",
      tenureStart: { month: 1, year: 2022 },
      location: "Bristol, United Kingdom",
      roles: [
        {
          title: "Director of Digital Experience",
          periodStart: { month: 1, year: 2022 },
          workMode: "Hybrid",
          bullets: [
            "Advocate for design thinking and design linking. I support Product Owners, Engineers and Designers throughout the NGP pillar to work smart and deliver value for our experience across multiple product lines.",
            "Establish, maintain and scale design processes and tools to drive efficiency and velocity internally and with external partners.",
            "Review, assess and prioritise design activity with Delivery Managers and Product Owners so design supports the high-level delivery roadmap.",
            "Lead and manage talented teams through the research and design process to produce high-quality work that materially impacts partners and customers.",
            "Mentor the internal design team — hire, nurture, mentor and challenge a growing in-house team alongside external design partners.",
            "Oversee vision and governance of the design system, supporting day-to-day communication and contribution across the business.",
          ],
        },
      ],
    },
    {
      key: "autotrader",
      orgDisplay: "Auto Trader UK",
      orgUrl: "https://www.autotrader.co.uk",
      logoDomain: "autotrader.co.uk",
      tenureStart: { month: 11, year: 2020 },
      tenureEnd: { month: 10, year: 2022 },
      location: "United Kingdom",
      roles: [
        {
          title: "Experience Design Lead",
          periodStart: { month: 7, year: 2021 },
          periodEnd: { month: 10, year: 2022 },
          bullets: [
            "Helped cross-functional teams understand and define pain points and potential gains for the Digital Retailing offer for retailers and customers.",
            "Line-managed and mentored product designers; supported designers to deliver their best work and grow their careers.",
            "Delivered designs and specifications for funnel experiences (Part Exchange, Finance, Reservations) in parallel with squad delivery.",
            "Led UX/UI direction for the Digital Retailing initiative piloted across retailers in the Auto Trader UK ecosystem.",
          ],
          skills: "Product Strategy, Web Design, and +8 skills",
        },
        {
          title: "Principal Product Designer",
          periodStart: { month: 11, year: 2020 },
          periodEnd: { month: 6, year: 2021 },
          summary:
            "Digital Retailing and Onward Journey — CORE/B2B. Direction of the post-sale journey customers and suppliers engage with in the Auto Trader ecosystem.",
          bullets: [],
          skills: "Product Strategy, Web Design, +8 skills",
        },
      ],
    },
    {
      key: "booking",
      orgDisplay: "Booking.com",
      orgUrl: "https://www.booking.com",
      logoDomain: "booking.com",
      tenureStart: { month: 10, year: 2018 },
      tenureEnd: { month: 11, year: 2020 },
      location: "United Kingdom",
      roles: [
        {
          title: "Design Lead",
          periodStart: { month: 10, year: 2018 },
          periodEnd: { month: 11, year: 2020 },
          bullets: [
            "Used data-informed discovery and experimentation to influence stakeholders and turn systems thinking into experiences that improved convenience, loyalty and engagement.",
            "Led two UX designers to define and deliver solutions for pain points across the ground transport business.",
            "Partnered with product and engineering leads on epics, user stories, prioritisation and backlog refinement.",
            "Contributed to cross-business initiatives including design systems, process training, onboarding and recruitment.",
          ],
          skills: "Product Strategy, Web Design, and +8 skills",
          featured: "Featured project: Booking.com One Million — social wall campaign.",
        },
      ],
    },
    {
      key: "intuit",
      orgDisplay: "Intuit",
      orgUrl: "https://www.intuit.com",
      logoDomain: "intuit.com",
      companyTagline: "Full-time · Product design leadership across UK & France",
      roles: [
        {
          title: "Product Design Lead",
          periodStart: { month: 8, year: 2017 },
          periodEnd: { month: 9, year: 2018 },
          bullets: [
            "Led product design across UK and France, aligning local needs with a shared platform direction.",
            "Designed for trust in regulated, high-stakes financial flows — balancing compliance, clarity, and customer confidence.",
            "Partnered with product and engineering leads on discovery, prioritisation, and measurable outcomes.",
          ],
          skills: "Product Strategy, UX Research, and +8 skills",
        },
      ],
    },
  ],
  knowledge: [
    "Focusing on customer-driven innovation through an outside-in approach to user-centered design and design thinking methodology, driving ideation to the best possible solutions to customers’ wicked problems.",
    "Using fail-fast principles and lean UX techniques based on field research, usability testing and interaction design to monitor, measure and optimize user workflows and validate assumptions.",
    "Helping align product roadmaps with business objectives by collaborating with local and central teams to produce seamless end-to-end experiences that bolster global brand strategy and standards.",
    "Defining OKR/KPI metrics with product leaders to increase visibility to usage and conversion/retention linked to UX/CX contribution.",
    "Industry UI/UX principles coupled with modern web technologies for efficient and engaging end-to-end experiences that are usable, useful and desirable.",
  ],
  certifications: [
    {
      school: "Interaction Design Foundation",
      degree: "Online certifications & Career Path Program & Career Pathways Program",
      description: "Human Computer Interaction, UX Research, Psychology, VR/AR/XR",
      details: ["Structured through Auto Trader's Career Pathways Program"],
      period: "2018 – 2022",
      logo: "/img/ixdf-foundation-mark-dark.svg",
      logoContain: true,
    },
  ],
  education: [
    {
      school: "California State University, Chico",
      degree: "Bachelor of Science - BS, Computer Science",
      period: "2004 – 2006",
      activities: "Activities and societies: Option in Applied Computer Graphics",
      description: "Minor in Communication Design",
      logo: "/img/csu-chico-seal.png",
      logoContain: true,
      logoTransparentBg: true,
      logoPadding: 16,
      logoPaddingTop: 16,
    },
    {
      school: "International Academy of Design",
      degree: "ACE, Design Multimédia",
      period: "2002 – 2003",
      description: "Credits transferred to California State University, Chico.",
      details: ["Multimedia Design"],
      logo: "/img/iad-logo.png",
      logoContain: true,
      logoTransparentBg: true,
      logoPadding: 16,
      logoPaddingTop: 15,
    },
  ],
  recommendations: [
    {
      name: "Jiri Jerabek",
      role: "Product Design Director, Intuit",
      portrait: "/img/recommendations/jiri-jerabek.webp",
      lead:
        "The very rare breed of interaction designer who can dive straight into details, and at the same time keep high altitude of strategic thinking.",
      context:
        "We both led product design in our countries — Jon in France, me in the UK — collaborating on Making Tax Digital and GDPR.",
      linkedInUrl: "https://www.linkedin.com/in/jirijerabek/",
    },
    {
      name: "Erin Weigel",
      role: 'Strategic Advisor & author, "Design for Impact" · ex-Booking.com',
      portrait: "/img/recommendations/erin-weigel.webp",
      lead: "A designer gifted with seeing the bigger-picture experience of the products he designs.",
      context: "I led design system and accessibility at Booking.com when our paths crossed.",
      linkedInUrl: "https://www.linkedin.com/in/erindoesthings",
    },
    {
      name: "Christopher Coleon",
      role: "Head of Product, Intuit",
      portrait: "/img/recommendations/christopher-coleon.webp",
      lead:
        "How can you make accounting compliance not only acceptable for SMB users, but a source of customer delight?",
      context:
        "Head of Product at Intuit; worked with Jonathan since 2017, where he was our principal product designer.",
      linkedInUrl: "https://www.linkedin.com/in/ccoleon/",
    },
    {
      name: "Grégory Cousin",
      role: "Senior Engineering Manager · engineering partner at Intuit",
      portrait: "/img/recommendations/gregory-cousin.webp",
      lead:
        "The VAT Anti-Fraud experience we shipped on QuickBooks launched on time with amazing UX quality — never easy on a short deadline, but reality with Jon.",
      context: "We delivered the Small Business VAT Anti-Fraud work together at Intuit.",
      linkedInUrl: "https://www.linkedin.com/in/gr%C3%A9gory-cousin-8536b791",
    },
    {
      name: "Karolin Mulhaupt",
      role: "User Researcher (Content Designer at the time) · Intuit",
      portrait: "/img/recommendations/karolin-mulhaupt.webp",
      lead:
        "Great at narrowing in on the main customer pain points and centering his designs around them — and rallying cross-functional teams around the work.",
      context:
        "We designed new QuickBooks features together; he led the brainstorming and advocated for the customer throughout.",
      linkedInUrl: "https://www.linkedin.com/in/kmulhaupt",
    },
  ],
};
