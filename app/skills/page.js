import Image from "next/image";
import ExperienceHeadlineDecrypt from "@/components/ExperienceHeadlineDecrypt";
import ExperienceSection from "@/components/ExperienceSection";
import ScrollReveal from "@/components/ScrollReveal";

const skillTags = [
  "Product Leadership",
  "Design Systems",
  "UX Strategy",
  "Research & Experimentation",
  "Cross-market Delivery",
];

const knowledge = [
  "Turned ambiguous, multi-stakeholder problems into shippable roadmaps — aligning product, engineering, commercial, and legal around one clear customer outcome.",
  "Built and scaled design capability (process, tools, and people) so teams deliver consistently — not just when a single lead is in the room.",
  "Shifted critique and research from “opinions” to evidence — so decisions are justified, measurable, and repeatable across squads.",
  "Designed for trust and compliance in European markets — balancing regulation, brand governance, and real user behaviour in high-stakes flows.",
  "Reduced rework by front-loading clarity: shared language, design systems, and constraints that engineers can build from without translation debt.",
];

const languages = [
  {
    label: "English",
    level: 5,
    proficiencyLabel: "Native / Fluent",
    flagClass: "languages-flag--uk",
    flagSrc: "/animations/uk_flag_icon.html",
  },
  {
    label: "French",
    level: 5,
    proficiencyLabel: "Native / Fluent",
    flagClass: "languages-flag--fr",
    flagSrc: "/animations/french_flag_icon.html",
  },
  {
    label: "Spanish",
    level: 1,
    proficiencyLabel: "Basic",
    flagClass: "languages-flag--es",
    flagSrc: "/animations/spanish_flag_icon.html",
  },
];

export const metadata = {
  title: "Experience & Skills",
  description: "Experience, key skills, knowledge and languages for Jonathan Le Coz.",
  alternates: { canonical: "/skills" },
  openGraph: {
    title: "Experience & Skills",
    description: "Experience, key skills, knowledge and languages for Jonathan Le Coz.",
    url: "/skills",
  },
};

function SkillsSection() {
  return (
    <section className="section section-services" id="skills">
      <div className="section-services-inner">
        <ScrollReveal>
          <ExperienceHeadlineDecrypt as="p" className="section-label" text="KNOWLEDGE & SKILLS" decrypt />
          <h1 className="section-headline skills-headline-cycle">
            <span className="skills-cycle-word" style={{ "--cycle-i": 0 }}>
              Creative
            </span>
            <span className="skills-cycle-punct">,</span>{" "}
            <span className="skills-cycle-word" style={{ "--cycle-i": 1 }}>
              collaborative
            </span>{" "}
            <span className="skills-cycle-word" style={{ "--cycle-i": 2 }}>
              and
            </span>{" "}
            <span className="skills-cycle-word" style={{ "--cycle-i": 3 }}>
              efficient
            </span>
          </h1>
          <p className="section-intro">
            I design and lead across <span className="gold">UK + European</span> contexts — turning complexity into outcomes,
            and outcomes into repeatable systems teams can scale.
          </p>
        </ScrollReveal>

        <div className="cv-split">
          <ScrollReveal className="cv-split-left">
            <h2 className="cv-subhead">Key skills</h2>
            <div className="skills-wheel-row">
              <div className="skills-wheel" aria-label="Skills attributes: passionate, bold, social, funny">
                <Image src="/img/profile.svg" alt="Skills profile" className="skills-wheel-img" width={320} height={320} />
              </div>
              <div className="cv-tags">
                {skillTags.map((tag) => (
                  <span key={tag} className="cv-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal className="cv-split-right">
            <h2 className="cv-subhead">Outcomes</h2>
            <ul className="cv-knowledge">
              {knowledge.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function LanguagesSection() {
  return (
    <section className="section" id="languages">
      <div className="section-services-inner">
        <ScrollReveal>
          <h2 className="languages-title">Languages</h2>
          <div className="languages-rule" aria-hidden="true" />
        </ScrollReveal>

        <ScrollReveal stagger className="languages-list">
          {languages.map((lang) => (
            <div key={lang.label} className="languages-row reveal">
              <div className="languages-label">
                <span
                  className={`languages-flag languages-flag--canvas ${lang.flagClass}`}
                  aria-hidden="true"
                >
                  <iframe
                    className="languages-flag-iframe"
                    src={lang.flagSrc}
                    title=""
                    loading="lazy"
                  />
                </span>
                {lang.label}
                {lang.proficiencyLabel ? (
                  <span className="languages-proficiency" aria-hidden="true">
                    {lang.proficiencyLabel}
                  </span>
                ) : null}
              </div>
              <div
                className="languages-dots"
                role="img"
                aria-label={`${lang.label}: ${lang.proficiencyLabel ?? `${lang.level} out of 5`}`}
              >
                {Array.from({ length: 5 }, (_, i) => (
                  <span
                    key={`${lang.label}-${i}`}
                    className={`languages-dot ${i < lang.level ? "is-on" : "is-off"}`}
                    aria-hidden="true"
                  />
                ))}
              </div>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}

export default function SkillsPage() {
  return (
    <>
      <ExperienceSection />
      <SkillsSection />
      <LanguagesSection />
    </>
  );
}
