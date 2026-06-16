import Image from "next/image";
import ExperienceHeadlineDecrypt from "@/components/ExperienceHeadlineDecrypt";
import IxdfCertificationsSection from "@/components/IxdfCertificationsSection";
import ScrollReveal from "@/components/ScrollReveal";
import { siteConfig } from "@/config/siteConfig";

const certifications = [
  {
    school: "Interaction Design Foundation",
    degree: "Online certifications & Career Pathways Program",
    description: "Human Computer Interaction",
    period: "2018 - 2022",
    logo: "/img/ixdf-foundation-mark-dark.svg",
    logoContain: true,
    logoPadding: 16,
    logoPaddingTop: 15,
  },
];

const education = [
  {
    school: "California State University, Chico",
    degree: "Bachelor of Science - BS, Computer Science",
    period: "2004 - 2006",
    activities: "Activities and societies: Option in Applied Computer Graphics",
    description: "Minor in Communication Design",
    logo: "/img/csu-chico-seal.png",
    logoContain: true,
    logoTransparentBg: true,
    logoFitWidth: true,
    logoPadding: 16,
    logoPaddingTop: 16,
  },
  {
    school: "International Academy of Design",
    degree: "ACE, Design Multimedia",
    period: "2002 - 2003",
    description: "Credits transferred to California State University, Chico.",
    details: ["Multimedia Design"],
    logo: "/img/iad-logo.png",
    logoContain: true,
    logoTransparentBg: true,
    logoPadding: 16,
    logoPaddingTop: 15,
  },
  {
    school: "Santa Monica College",
    degree: "General studies towards Bachelor's Degree",
    period: "1999 - 2002",
    description: "Credits transferred to California State University, Chico.",
    details: ["Aeronautics, Architecture, Design"],
    logo: "/img/smc-logo.svg",
    logoContain: true,
    logoPadding: 16,
  },
];

export async function generateMetadata() {
  const title = "Education & Certifications";
  const description =
    "Education, certifications and continuous learning for Jonathan Le Coz.";

  return {
    title,
    description,
    alternates: { canonical: "/education" },
    openGraph: {
      title,
      description,
      url: "/education",
      siteName: siteConfig.brand.logoText,
    },
  };
}

function LearningPhilosophySection() {
  return (
    <section className="section section-edu-philosophy" id="learning-philosophy">
      <div className="section-services-inner">
        <ScrollReveal>
          <ExperienceHeadlineDecrypt as="p" className="section-label" text="CONTINUOUS LEARNING" decrypt />
          <h2 className="section-headline">
            Knowledge, for me, isn&apos;t a credential to accumulate —{" "}
            <span className="gold">it&apos;s a practice to maintain.</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal className="reveal-down">
          <div className="edu-philosophy-prose">
            <p>
              I draw a clear distinction between learning that happened and learning that&apos;s
              happening: formal qualifications establish a foundation, but the work I&apos;ve put into
              systematically studying my field across research, psychology, leadership, and emerging
              interaction reflects a deliberate effort to stay ahead of where the discipline is going,
              not just where it&apos;s been.
            </p>
            <p>
              What drives that curiosity is a conviction that the best design thinking doesn&apos;t operate
              in a vacuum — it draws from adjacent fields, synthesises across disciplines, and applies
              that synthesis to real, complex problems. Whether that&apos;s building design systems that
              scale across markets, designing for trust in high-stakes transactional experiences, or
              thinking through how emerging technology changes what&apos;s possible for users — the thread
              is always the same: understanding deeply enough to make better decisions.
            </p>
            <p className="edu-philosophy-closer">
              We&apos;re at a genuinely exciting moment where the tools available to designers are
              expanding faster than most organisations know how to use them. That&apos;s not a threat — it&apos;s
              an opportunity, and I intend to be someone who helps shape how it unfolds.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function EducationSection() {
  const renderEduRow = (item) => (
    <div
      key={`${item.school}-${item.period}`}
      className={`cv-edu-row reveal${item.logo ? " cv-edu-row--with-logo" : ""}${item.logoContain ? " cv-edu-row--logo-contain" : ""}`}
    >
      <div className="cv-edu-main">
        <h3>{item.school}</h3>
        <p className="cv-edu-degree">{item.degree}</p>
        {item.activities ? <p className="cv-edu-detail">{item.activities}</p> : null}
        {item.description ? <p className="cv-edu-detail">{item.description}</p> : null}
        {item.details?.map((line) => (
          <p key={line} className="cv-edu-detail">{line}</p>
        ))}
        <p className="cv-edu-period">{item.period}</p>
      </div>
      {item.logo ? (
        <div
          className={`cv-edu-logo-wrap${item.logoContain ? " cv-edu-logo-wrap--contain" : ""}${item.logoPadding ? " cv-edu-logo-wrap--padded" : ""}${item.logoTransparentBg ? " cv-edu-logo-wrap--transparent" : ""}${item.logoCover ? " cv-edu-logo-wrap--cover" : ""}${item.logoFitWidth ? " cv-edu-logo-wrap--fit-width" : ""}`}
          style={
            item.logoPadding || item.logoPaddingTop
              ? {
                  ...(item.logoPadding ? { "--cv-edu-logo-pad": `${item.logoPadding}px` } : {}),
                  ...(item.logoPaddingTop ? { "--cv-edu-logo-pad-top": `${item.logoPaddingTop}px` } : {}),
                }
              : undefined
          }
        >
          {item.logoPadding ? (
            <div className="cv-edu-logo-inset">
              <Image
                className="cv-edu-logo"
                src={item.logo}
                alt={`${item.school} logo`}
                fill
                sizes="(max-width: 640px) 28vw, 14rem"
                unoptimized={
                  item.logoTransparentBg ||
                  item.logo.endsWith(".svg") ||
                  item.logo.endsWith(".png")
                }
              />
            </div>
          ) : (
            <Image
              className="cv-edu-logo"
              src={item.logo}
              alt={`${item.school} logo`}
              fill
              sizes="(max-width: 640px) 28vw, 14rem"
              unoptimized={
                item.logoTransparentBg ||
                item.logo.endsWith(".svg") ||
                item.logo.endsWith(".png")
              }
            />
          )}
        </div>
      ) : null}
    </div>
  );

  return (
    <section className="section" id="education">
      <div className="section-services-inner">
        <ScrollReveal>
          <ExperienceHeadlineDecrypt as="p" className="section-label" text="EDUCATION" decrypt />
          <h2 className="section-headline">
            Computer sciences, <span className="gold">communication design</span> and continuous learning.
          </h2>
        </ScrollReveal>

        <ScrollReveal stagger className="cv-edu">
          <p className="cv-edu-subheading">Schools</p>
          {education.map(renderEduRow)}
          <p className="cv-edu-subheading">Certifications</p>
          {certifications.map(renderEduRow)}
        </ScrollReveal>
      </div>
    </section>
  );
}

export default function EducationPage() {
  return (
    <>
      <EducationSection />
      <IxdfCertificationsSection />
      <LearningPhilosophySection />
    </>
  );
}
