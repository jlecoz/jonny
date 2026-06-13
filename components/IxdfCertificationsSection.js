"use client";

import ScrollReveal from "@/components/ScrollReveal";
import IxdfCertIcon from "@/components/IxdfCertIcon";
import { ixdfCertCategories } from "@/config/ixdfCertifications";

function IxdfBadge({ title, iconBg, iconKey }) {
  return (
    <div className="ixdf-badge reveal">
      <div className="ixdf-icon-wrap" style={{ background: iconBg }}>
        <IxdfCertIcon name={iconKey} />
      </div>
      <span className="ixdf-badge-title">{title}</span>
      <span className="ixdf-badge-issuer">IxDF</span>
    </div>
  );
}

export default function IxdfCertificationsSection() {
  return (
    <section className="section ixdf-certs" id="certifications">
      <div className="section-services-inner ixdf-certs-inner">
        <ScrollReveal className="ixdf-certs-intro-reveal">
          <header className="ixdf-certs-header">
            <img
              className="ixdf-certs-brand-svg"
              src="/img/ixdf-foundation-mark.svg"
              alt="Interaction Design Foundation"
              width={100}
              height={100}
              loading="lazy"
              decoding="async"
            />
            <h2 className="ixdf-certs-title">Licenses &amp; Certifications</h2>
            <p className="ixdf-certs-kicker">Interaction Design Foundation</p>
          </header>
        </ScrollReveal>

        <div className="ixdf-certs-wall">
          {ixdfCertCategories.map((category) => (
            <div key={category.id} className="ixdf-certs-category">
              <h3 className="ixdf-certs-category-title">{category.title}</h3>
              <ScrollReveal stagger>
                <div className="ixdf-certs-grid">
                  {category.certificates.map((cert) => (
                    <IxdfBadge
                      key={cert.key}
                      title={cert.title}
                      iconBg={cert.iconBg}
                      iconKey={cert.key}
                    />
                  ))}
                </div>
              </ScrollReveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
