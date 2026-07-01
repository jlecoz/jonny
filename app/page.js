import ScrollReveal from "@/components/ScrollReveal";
import HeroOverviewSection from "@/components/HeroOverviewSection";
import ExperienceHeadlineDecrypt from "@/components/ExperienceHeadlineDecrypt";
import WorkSplitCard from "@/components/WorkSplitCard";
import HowIThinkMoment from "@/components/HowIThinkMoment";
import ContactCTA from "@/components/ContactCTA";
import MainSectionParallax from "@/components/MainSectionParallax";
import WorksCardsTimeline from "@/components/WorksCardsTimeline";
import HomeScrollReveal from "@/components/HomeScrollReveal";
import { worksProjects } from "@/config/worksProjects";

import { cv, linkedInRecommendationsUrl } from "@/config/cvData";

const works = worksProjects.filter((item) => item.published !== false);

function WorksSection() {
  return (
    <section className="section" id="works">
      <WorksCardsTimeline>
        <div className="section-services-inner">
          <ScrollReveal>
            <ExperienceHeadlineDecrypt as="p" className="section-label" text="WORKS" decrypt data-reveal />
            <ExperienceHeadlineDecrypt
              before="A few curated collaborations across "
              gold="product and platform."
              data-reveal
            />
          </ScrollReveal>
          <p className="section-intro" data-reveal>
            A snapshot of organisations and programmes where my design leadership shaped outcomes end to end.
          </p>
          <p className="works-card-instruction" data-reveal>
            <strong>Click on a card</strong> to learn more.
          </p>

          <ScrollReveal stagger className="cv-work-grid">
            {works.map((item) =>
              item.coverImage ? (
                <WorkSplitCard
                  key={`${item.title}-${item.client ?? ""}`}
                  item={item}
                  className="cv-work-card card__content cv-work-card--split"
                >
                  <div className="cv-work-card-copy">
                    <h3>{item.title}</h3>
                    {item.client ? <h4 className="cv-work-client">{item.client}</h4> : null}
                    {(Array.isArray(item.cardBackDescription)
                      ? item.cardBackDescription
                      : [item.cardBackDescription ?? item.blurb]
                    ).map((paragraph, paragraphIndex) => (
                      <p key={paragraphIndex} className="cv-work-card-description">
                        {paragraph}
                      </p>
                    ))}
                    <div className="cv-work-card-actions">
                      <a
                        className="cv-work-card-external"
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Client site →
                      </a>
                      {item.documentationHref ? (
                        <a
                          className="button button-secondary"
                          href={item.documentationHref}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Learn more
                        </a>
                      ) : (
                        <p className="cv-work-card-under-construction">
                          <span className="cv-work-card-under-construction-icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path
                                d="M4 20h16M6 20l2.5-9h7L18 20M9.5 11l1.5-5h2l1.5 5"
                                stroke="currentColor"
                                strokeWidth="1.75"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M10 14h4"
                                stroke="currentColor"
                                strokeWidth="1.75"
                                strokeLinecap="round"
                              />
                            </svg>
                          </span>
                          Under construction
                        </p>
                      )}
                    </div>
                  </div>
                </WorkSplitCard>
              ) : (
                <article
                  key={`${item.title}-${item.client ?? ""}`}
                  className="cv-work-card card__content"
                >
                  <div className="cv-work-card-reveal" data-reveal>
                  <h3>{item.title}</h3>
                  {item.client ? <h4 className="cv-work-client">{item.client}</h4> : null}
                  <p>{item.blurb}</p>
                  <div className="cv-work-card-actions">
                    <a
                      className="cv-work-card-external"
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Client site →
                    </a>
                  </div>
                  </div>
                </article>
              ),
            )}
          </ScrollReveal>
        </div>
      </WorksCardsTimeline>
    </section>
  );
}

function RecommendationsSection() {
  return (
    <section className="section rec" id="recommendations">
      <div className="section-services-inner">
        <div className="head">
          <ScrollReveal>
            <p className="eyebrow" data-reveal>
              Recommendations
            </p>
            <h2 className="section-headline" data-reveal>
              Vouched for, <span className="gold">at every altitude.</span>
            </h2>
          </ScrollReveal>
          <a
            className="count"
            href={linkedInRecommendationsUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-reveal
          >
            20+ recommendations on LinkedIn →
          </a>
        </div>

        <ScrollReveal stagger className="grid">
          {cv.recommendations.map((r) => (
            <figure key={r.name} className="card reveal" data-reveal>
              <blockquote>{r.lead}</blockquote>
              <p className="ctx">{r.context}</p>
              <figcaption className="by">
                {r.portrait ? (
                  <img src={r.portrait} alt={r.name} width={44} height={44} loading="lazy" decoding="async" />
                ) : null}
                <span className="who">
                  <span className="name">{r.name}</span>
                  <span className="role">{r.role}</span>
                </span>
              </figcaption>
              <a
                className="more"
                href={r.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read full recommendation →
              </a>
            </figure>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <MainSectionParallax />
      <HeroOverviewSection />
      <WorksSection />
      <HowIThinkMoment />
      <RecommendationsSection />
      <ContactCTA />
      <HomeScrollReveal />
    </>
  );
}
