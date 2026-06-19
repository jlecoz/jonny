/** Profile on LinkedIn */
export const linkedInProfileUrl = "https://www.linkedin.com/in/jonathan-lecoz/";

/** Earlier roles (e.g. IMS Health) — same profile */
export const linkedInExperienceUrl = linkedInProfileUrl;

/** Received recommendations — same profile */
export const linkedInRecommendationsUrl = linkedInProfileUrl;

export const cv = {
  name: "Jonathan Le Coz",
  title: "Experiential Design",
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
      companyTagline: "Full-time · 4 yrs 4 mos · Bristol, United Kingdom",
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
        {
          title: "Experience Design Lead",
          periodLine: "Jan 2022 – Dec 2022 · 1 yr",
          bullets: [],
          skills: "Product Strategy, Web Design, and +8 skills",
        },
      ],
    },
    {
      key: "autotrader",
      orgDisplay: "Auto Trader UK",
      orgUrl: "https://www.autotrader.co.uk",
      logoDomain: "autotrader.co.uk",
      companyTagline: "Full-time · 3 yrs 10 mos · United Kingdom",
      roles: [
        {
          title: "Experience Design Lead",
          periodLine: "Jul 2021 – Oct 2022 · 1 yr 4 mos",
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
          periodLine: "Nov 2020 – Jun 2021 · 8 mos",
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
      companyTagline: "Full-time · 2 yrs 2 mos · United Kingdom",
      roles: [
        {
          title: "Design Lead",
          periodLine: "Oct 2018 – Nov 2020 · 2 yrs 2 mos",
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
      initials: "JJ",
      title: "Product Design Director",
      portrait: "/img/recommendations/jiri-jerabek.webp",
      quoteParagraphs: [
        "The very rare breed of interaction designer who has the ability to dive straight into details, and at the same time keep high altitude of strategic thinking.",
      ],
      quote:
        "The very rare breed of interaction designer who has the ability to dive straight into details, and at the same time keep high altitude of strategic thinking.",
    },
    {
      name: "Erin Weigel",
      initials: "EW",
      title: "Strategic Advisor, ABsmartly & ConversieKracht",
      portrait: "/img/recommendations/erin-weigel.webp",
      quoteParagraphs: [
        "A designer who's gifted with seeing the bigger picture experience of the products he designs — and who advocates for making products inclusive for all users.",
      ],
      quote:
        "A designer who's gifted with seeing the bigger picture experience of the products he designs — and who advocates for making products inclusive for all users.",
    },
    {
      name: "Christopher Coleon",
      initials: "CC",
      title: "Head of Product / Product Director",
      portrait: "/img/recommendations/christopher-coleon.webp",
      quoteParagraphs: [
        "How can you make accounting compliance not only acceptable for SMB users, but a source of customer delight? These are only a few of the design challenges Jonathan has tackled.",
      ],
      quote:
        "How can you make accounting compliance not only acceptable for SMB users, but a source of customer delight? These are only a few of the design challenges Jonathan has tackled.",
    },
  ],
};
