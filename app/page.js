import ScrollReveal from "@/components/ScrollReveal";
import HeroOverviewSection from "@/components/HeroOverviewSection";
import ExperienceHeadlineDecrypt from "@/components/ExperienceHeadlineDecrypt";
import WorkSplitCard from "@/components/WorkSplitCard";
import HowIThinkMoment from "@/components/HowIThinkMoment";
import ContactCTA from "@/components/ContactCTA";
import MainSectionParallax from "@/components/MainSectionParallax";
import WorksCardsTimeline from "@/components/WorksCardsTimeline";
import RecommendationsStackCards from "@/components/RecommendationsStackCards";
import { worksProjects } from "@/config/worksProjects";

import { cv, linkedInRecommendationsUrl } from "@/config/cvData";

const works = worksProjects;

function getRecommendationQuoteParagraphs(recommendation) {
  if (recommendation.quoteParagraphs) return recommendation.quoteParagraphs;

  const quote = recommendation.quote || "";

  return quote
    .replace(/\s+/g, " ")
    .trim()
    .split(/(?<=[.!?])\s+/)
    .filter(Boolean);
}

function RecommendationQuote({ recommendation }) {
  const paragraphs = getRecommendationQuoteParagraphs(recommendation);
  const readMoreAfterParagraph = recommendation.readMoreAfterParagraph;

  if (!readMoreAfterParagraph || readMoreAfterParagraph >= paragraphs.length) {
    return (
      <blockquote className="cv-rec-quote">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </blockquote>
    );
  }

  const visibleParagraphs = paragraphs.slice(0, readMoreAfterParagraph);
  const hiddenParagraphs = paragraphs.slice(readMoreAfterParagraph);

  return (
    <blockquote className="cv-rec-quote">
      {visibleParagraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <details className="cv-rec-read-more">
        <summary>Read more</summary>
        <div className="cv-rec-read-more-content">
          {hiddenParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </details>
    </blockquote>
  );
}

function WorksSection() {
  return (
    <section className="section" id="works">
      <WorksCardsTimeline>
        <div className="section-services-inner">
          <ScrollReveal>
            <ExperienceHeadlineDecrypt as="p" className="section-label" text="WORKS" decrypt />
            <ExperienceHeadlineDecrypt before="A few curated collaborations across " gold="product and platform." />
          </ScrollReveal>
          <p className="section-intro">
            A snapshot of organisations and programmes where my design leadership shaped outcomes end to end.
          </p>
          <p className="works-card-instruction">
            <strong>Click on a card</strong> to learn more.
          </p>

          <ScrollReveal stagger className="cv-work-grid">
            {works.map((item) =>
              item.coverImage ? (
                <WorkSplitCard
                  key={`${item.title}-${item.client ?? ""}`}
                  item={item}
                  className="cv-work-card card__content reveal cv-work-card--split"
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
                  className="cv-work-card card__content reveal"
                >
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
  const recCount = cv.recommendations.length;

  return (
    <section className="section" id="recommendations">
      <div className="section-services-inner">
        <div className="recommendations-title">
          <ScrollReveal>
            <ExperienceHeadlineDecrypt as="p" className="section-label" text="RECOMMENDATIONS" decrypt />
            <h2 className="section-headline">
              What colleagues say about <span className="gold">working together.</span>
            </h2>
          </ScrollReveal>
        </div>

        <RecommendationsStackCards
          cardCount={recCount}
          footer={
            <div className="cv-experience-more">
              <a
                className="button button-secondary"
                href={linkedInRecommendationsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="See more recommendations on LinkedIn"
              >
                See more LinkedIn
              </a>
            </div>
          }
        >
          {cv.recommendations.map((r, i) => (
            <div
              key={r.name}
              className="rec-stack-card"
              style={{ "--index": i + 1 }}
            >
              <div className="rec-stack-card__content cv-edu-row cv-edu-row--rec">
                <div className="cv-rec-body">
                  {r.portrait ? (
                    <img
                      className="cv-rec-avatar cv-rec-avatar--photo"
                      src={r.portrait}
                      alt={`${r.name} portrait`}
                      width={56}
                      height={56}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <span className="cv-rec-avatar" aria-hidden="true">
                      {r.initials}
                    </span>
                  )}
                  <div className="cv-rec-copy">
                    <h3>{r.name}</h3>
                    {r.title ? <p className="cv-edu-org">{r.title}</p> : null}
                    <div className="cv-edu-period cv-rec-meta">{r.meta}</div>
                    <RecommendationQuote recommendation={r} />
                  </div>
                </div>
              </div>
              <div className="rec-stack-card__slack" aria-hidden="true" />
            </div>
          ))}
        </RecommendationsStackCards>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <MainSectionParallax />
      <HeroOverviewSection
        meta={cv.meta}
        title={cv.title}
      />
      <WorksSection />
      <HowIThinkMoment />
      <RecommendationsSection />
      <ContactCTA />
    </>
  );
}
