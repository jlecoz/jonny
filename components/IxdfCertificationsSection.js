"use client";

import ScrollReveal from "@/components/ScrollReveal";
import IxdfCertIcon from "@/components/IxdfCertIcon";
import { ixdfCertCategories } from "@/config/ixdfCertifications";

function toIconColor(bg) {
  if (typeof bg !== "string") return undefined;
  const m = bg.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (!m) return undefined;
  const r = Number(m[1]);
  const g = Number(m[2]);
  const b = Number(m[3]);
  if (![r, g, b].every((v) => Number.isFinite(v))) return undefined;
  return `rgb(${r} ${g} ${b})`;
}

function IxdfBadge({ title, iconBg, iconKey, iconColor }) {
  return (
    <div className="ixdf-badge reveal">
      <div className="ixdf-icon-wrap" style={{ background: iconBg }}>
        <IxdfCertIcon name={iconKey} color={iconColor} />
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
                      iconBg={category.certificates?.[0]?.iconBg ?? cert.iconBg}
                      iconColor={toIconColor(category.certificates?.[0]?.iconBg) ?? toIconColor(cert.iconBg)}
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
