import ScrollReveal from "@/components/ScrollReveal";
import ExperienceHeadlineDecrypt from "@/components/ExperienceHeadlineDecrypt";
import ShowMoreBullets from "@/components/ShowMoreBullets";
import { cv, linkedInExperienceUrl } from "@/config/cvData";

export default function ExperienceSection() {
  return (
    <section className="section" id="experience">
      <div className="section-services-inner">
        <ScrollReveal>
          <ExperienceHeadlineDecrypt as="p" className="section-label" text="EXPERIENCE" decrypt />
          <ExperienceHeadlineDecrypt />
        </ScrollReveal>

        <ScrollReveal stagger className="cv-timeline">
          {cv.experienceGroups.map((group) => {
            const faviconSrc = `https://www.google.com/s2/favicons?domain=${encodeURIComponent(group.logoDomain)}&sz=128`;
            const logoSrc = group.logoSrc || faviconSrc;
            return (
              <article key={group.key} className="cv-role cv-role--linkedin reveal">
                <div className="cv-role-layout">
                  <div className="cv-role-logo">
                    <img
                      className="cv-role-logo-img"
                      src={logoSrc}
                      alt=""
                      width={48}
                      height={48}
                      loading="lazy"
                    />
                  </div>
                  <div className="cv-role-main">
                    <div className="cv-role-company-block">
                      <h3 className="cv-role-company-heading">
                        {group.orgUrl ? (
                          <a className="cv-role-company" href={group.orgUrl} target="_blank" rel="noopener noreferrer">
                            {group.orgDisplay}
                          </a>
                        ) : (
                          <span className="cv-role-company">{group.orgDisplay}</span>
                        )}
                      </h3>
                      {group.companyTagline ? (
                        <p className="cv-role-company-meta">{group.companyTagline}</p>
                      ) : null}
                    </div>
                    <div className="cv-role-positions-rail">
                      {group.roles.map((role, idx) => (
                        <div key={`${group.key}-${role.title}-${idx}`} className="cv-role-position">
                          <div className="cv-role-job-block">
                            <h4 className="cv-role-job-title">{role.title}</h4>
                            {role.periodLine ? <p className="cv-role-job-dates">{role.periodLine}</p> : null}
                            {role.location ? <p className="cv-role-work-mode">{role.location}</p> : null}
                            {role.workMode ? <p className="cv-role-work-mode">{role.workMode}</p> : null}
                            {role.summary ? <p className="cv-role-summary">{role.summary}</p> : null}
                            {role.bullets?.length ? (
                              <div className="cv-role-timeline">
                                <ShowMoreBullets bullets={role.bullets} initiallyVisibleCount={1} className="cv-bullets-timeline" />
                              </div>
                            ) : null}
                            {role.skills ? <p className="cv-role-skills">Skills: {role.skills}</p> : null}
                            {role.featured ? <p className="cv-role-featured">{role.featured}</p> : null}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </ScrollReveal>

        <ScrollReveal>
          <div className="cv-experience-more">
            <a
              className="cv-experience-more-link"
              href={linkedInExperienceUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Show all experience on LinkedIn"
            >
              <span>Show all</span>
              <span className="cv-experience-more-arrow" aria-hidden="true">
                →
              </span>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
