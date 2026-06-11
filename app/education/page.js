import Image from "next/image";
import ContactCTA from "@/components/ContactCTA";
import ExperienceHeadlineDecrypt from "@/components/ExperienceHeadlineDecrypt";
import IxdfCertificationsSection from "@/components/IxdfCertificationsSection";
import ScrollReveal from "@/components/ScrollReveal";
import { siteConfig } from "@/config/siteConfig";

const education = [
  {
    school: "California State University, Chico",
    degree: "Bachelor of Science - BS, Computer Science",
    period: "2004 - 2006",
    activities: "Activities and societies: Option in Applied Computer Graphics",
    description: "Minor in Communication Design",
    logo: "/img/csu-chico-seal.webp",
  },
  {
    school: "International Academy of Design",
    degree: "ACE, Design Multimedia",
    period: "2002 - 2003",
    activities: "Activities and societies: Creating the school factsheet and website.",
    description: "Design Multimedia",
  },
];

const certifications = [
  {
    school: "IxDF - The Interaction Design Foundation",
    degree: "Professional Education, User Experience and Interaction Design",
    period: "2016 - 2017",
    details: ["Online course Certifications"],
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

function EducationSection() {
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
          <p className="cv-edu-subheading">Certifications</p>
          {certifications.map((item) => (
            <div key={item.school} className="cv-edu-row reveal">
              <div className="cv-edu-main">
                <h3>{item.school}</h3>
                <p className="cv-edu-degree">{item.degree}</p>
                {item.details?.map((line) => (
                  <p key={line} className="cv-edu-detail">
                    {line}
                  </p>
                ))}
              </div>
              <div className="cv-edu-period">{item.period}</div>
            </div>
          ))}
          <p className="cv-edu-subheading">School</p>
          {education.map((item) => (
            <div key={item.school} className={`cv-edu-row reveal${item.logo ? " cv-edu-row--with-logo" : ""}`}>
              <div className="cv-edu-main">
                <h3>{item.school}</h3>
                <p className="cv-edu-degree">{item.degree}</p>
                {item.activities ? <p className="cv-edu-detail">{item.activities}</p> : null}
                {item.description ? <p className="cv-edu-detail">{item.description}</p> : null}
              </div>
              {item.logo ? (
                <Image
                  className="cv-edu-logo"
                  src={item.logo}
                  alt={`${item.school} seal`}
                  width={224}
                  height={224}
                  loading="lazy"
                />
              ) : null}
              <div className="cv-edu-period">{item.period}</div>
            </div>
          ))}
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
      <ContactCTA />
    </>
  );
}
