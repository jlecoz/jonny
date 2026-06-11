"use client";

import ScrollReveal from "@/components/ScrollReveal";
import { useEffect, useId, useMemo, useRef, useState } from "react";

function IxdfBadge({ title, issuer, iconBg, children }) {
  return (
    <div className="ixdf-badge reveal">
      <div className="ixdf-icon-wrap" style={{ background: iconBg }}>
        {children}
      </div>
      <span className="ixdf-badge-title">{title}</span>
      <span className="ixdf-badge-issuer">{issuer}</span>
    </div>
  );
}

export default function IxdfCertificationsSection() {
  const moreWrapRef = useRef(null);
  const controlsId = useId();
  const firstVisibleCount = 10;
  const [expanded, setExpanded] = useState(false);
  const [moreMaxHeight, setMoreMaxHeight] = useState("0px");

  const badges = useMemo(
    () => [
      <IxdfBadge key="designing-intuitive-interfaces" title="Designing Intuitive Interfaces" issuer="IxDF" iconBg="rgba(0,180,150,.12)">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <circle cx="16" cy="16" r="10" stroke="#00b496" strokeWidth="1.5" />
          <path d="M11 16h10M16 11v10" stroke="#00b496" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="16" cy="16" r="3" fill="#00b496" opacity="0.3" />
          <path
            d="M8 8l2 2M22 8l-2 2M8 24l2-2M22 24l-2-2"
            stroke="#00b496"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      </IxdfBadge>,

      <IxdfBadge key="information-visualization" title="Information Visualization" issuer="IxDF" iconBg="rgba(60,140,220,.12)">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <rect x="5" y="20" width="4" height="7" rx="1" fill="#3c8cdc" />
          <rect x="11" y="15" width="4" height="12" rx="1" fill="#3c8cdc" opacity="0.8" />
          <rect x="17" y="10" width="4" height="17" rx="1" fill="#3c8cdc" opacity="0.6" />
          <rect x="23" y="5" width="4" height="22" rx="1" fill="#3c8cdc" opacity="0.4" />
          <path
            d="M7 12l5-3 6-2 6-4"
            stroke="#3c8cdc"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="7" cy="12" r="1.5" fill="#3c8cdc" />
          <circle cx="12" cy="9" r="1.5" fill="#3c8cdc" />
          <circle cx="18" cy="7" r="1.5" fill="#3c8cdc" />
          <circle cx="24" cy="3" r="1.5" fill="#3c8cdc" />
        </svg>
      </IxdfBadge>,

      <IxdfBadge key="design-for-ar-vr" title="Design for AR & VR" issuer="IxDF" iconBg="rgba(180,100,220,.12)">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <path
            d="M16 4C9 4 4 9.4 4 16s5 12 12 12 12-5.4 12-12S23 4 16 4z"
            stroke="#b464dc"
            strokeWidth="1.5"
            opacity="0.4"
          />
          <path
            d="M21 10l2-2M11 10l-2-2M21 22l2 2M11 22l-2 2"
            stroke="#b464dc"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <rect
            x="11"
            y="11"
            width="10"
            height="10"
            rx="2"
            fill="#b464dc"
            opacity="0.2"
            stroke="#b464dc"
            strokeWidth="1.2"
          />
          <path d="M13 16h6M16 13v6" stroke="#b464dc" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </IxdfBadge>,

      <IxdfBadge key="visual-perception" title="Visual Perception" issuer="IxDF" iconBg="rgba(255,180,50,.1)">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <circle cx="16" cy="16" r="8" stroke="#ffb432" strokeWidth="1.5" />
          <circle cx="16" cy="16" r="4" stroke="#ffb432" strokeWidth="1.2" opacity="0.6" />
          <circle cx="16" cy="16" r="1.5" fill="#ffb432" />
          <path
            d="M16 4v4M16 24v4M4 16h4M24 16h4"
            stroke="#ffb432"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M9 9l2 2M21 9l-2 2M9 23l2-2M21 23l-2-2"
            stroke="#ffb432"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.5"
          />
        </svg>
      </IxdfBadge>,

      <IxdfBadge key="ux-design-for-usability" title="UX Design for Usability" issuer="IxDF" iconBg="rgba(0,200,120,.1)">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <rect x="6" y="7" width="20" height="14" rx="2" stroke="#00c878" strokeWidth="1.5" />
          <path d="M12 21v4M20 21v4M9 25h14" stroke="#00c878" strokeWidth="1.5" strokeLinecap="round" />
          <path
            d="M11 14l2 2 4-4 4 4"
            stroke="#00c878"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </IxdfBadge>,

      <IxdfBadge key="gestalt-psychology" title="Gestalt Psychology for Web" issuer="IxDF" iconBg="rgba(255,120,80,.1)">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <circle cx="11" cy="11" r="4" stroke="#ff7850" strokeWidth="1.5" />
          <circle cx="21" cy="11" r="4" stroke="#ff7850" strokeWidth="1.5" />
          <circle cx="16" cy="21" r="4" stroke="#ff7850" strokeWidth="1.5" />
          <line x1="11" y1="15" x2="14" y2="18" stroke="#ff7850" strokeWidth="1.2" opacity="0.6" />
          <line x1="21" y1="15" x2="18" y2="18" stroke="#ff7850" strokeWidth="1.2" opacity="0.6" />
        </svg>
      </IxdfBadge>,

      <IxdfBadge key="ux-management" title="UX Management: Strategy & Tactics" issuer="IxDF" iconBg="rgba(80,160,255,.1)">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <rect x="5" y="5" width="9" height="9" rx="2" stroke="#50a0ff" strokeWidth="1.5" />
          <rect x="18" y="5" width="9" height="9" rx="2" stroke="#50a0ff" strokeWidth="1.5" opacity="0.6" />
          <rect x="5" y="18" width="9" height="9" rx="2" stroke="#50a0ff" strokeWidth="1.5" opacity="0.6" />
          <rect x="18" y="18" width="9" height="9" rx="2" stroke="#50a0ff" strokeWidth="1.5" opacity="0.3" />
          <path
            d="M14 9.5h4M14 22.5h4M9.5 14v4M22.5 14v4"
            stroke="#50a0ff"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      </IxdfBadge>,

      <IxdfBadge key="emotional-design" title="Emotional Design" issuer="IxDF" iconBg="rgba(255,80,140,.1)">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <path
            d="M16 6c-2 0-4 1-5 3-1 1.5-1 3 0 4.5L16 26l5-12.5c1-1.5 1-3 0-4.5-1-2-3-3-5-3z"
            stroke="#ff508c"
            strokeWidth="1.5"
            fill="rgba(255,80,140,.1)"
          />
          <path
            d="M13 13l3 4 3-4"
            stroke="#ff508c"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </IxdfBadge>,

      <IxdfBadge key="hci" title="Human–Computer Interaction" issuer="IxDF" iconBg="rgba(100,220,200,.1)">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <circle cx="16" cy="12" r="5" stroke="#64dcc8" strokeWidth="1.5" />
          <path
            d="M8 26c0-4.4 3.6-8 8-8s8 3.6 8 8"
            stroke="#64dcc8"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M22 8l4-2M22 12h4M22 16l4 2"
            stroke="#64dcc8"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.5"
          />
        </svg>
      </IxdfBadge>,

      <IxdfBadge key="gamification" title="Gamification: Addictive UX" issuer="IxDF" iconBg="rgba(255,200,0,.1)">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <path
            d="M16 4l2.5 7.5H26l-6.5 4.5 2.5 7.5L16 19l-6 4.5 2.5-7.5L6 11.5h7.5z"
            stroke="#ffc800"
            strokeWidth="1.5"
            fill="rgba(255,200,0,.1)"
            strokeLinejoin="round"
          />
          <circle cx="16" cy="15" r="2" fill="#ffc800" opacity="0.5" />
        </svg>
      </IxdfBadge>,

      <IxdfBadge key="dynamic-ux" title="Dynamic User Experience" issuer="IxDF" iconBg="rgba(0,180,255,.1)">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <path d="M6 20c2-4 5-8 10-8s8 4 10 8" stroke="#00b4ff" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path
            d="M6 24c2-4 5-8 10-8s8 4 10 8"
            stroke="#00b4ff"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.5"
          />
          <path
            d="M6 16c2-4 5-8 10-8s8 4 10 8"
            stroke="#00b4ff"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.3"
          />
        </svg>
      </IxdfBadge>,

      <IxdfBadge key="practical-usability" title="Practical Usability" issuer="IxDF" iconBg="rgba(120,220,100,.1)">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <rect x="7" y="7" width="18" height="18" rx="3" stroke="#78dc64" strokeWidth="1.5" />
          <path
            d="M11 13l2 2 2-2 2 2 2-2"
            stroke="#78dc64"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11 19l2-2 2 2 2-2 2 2"
            stroke="#78dc64"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </IxdfBadge>,

      <IxdfBadge key="design-thinking" title="Design Thinking" issuer="IxDF" iconBg="rgba(180,140,255,.1)">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <circle cx="16" cy="8" r="3" stroke="#b48cff" strokeWidth="1.5" />
          <circle cx="8" cy="22" r="3" stroke="#b48cff" strokeWidth="1.5" />
          <circle cx="24" cy="22" r="3" stroke="#b48cff" strokeWidth="1.5" />
          <path d="M14 11l-4 8M18 11l4 8M11 22h10" stroke="#b48cff" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </IxdfBadge>,

      <IxdfBadge key="formal-design-methods" title="Formal Design Methods" issuer="IxDF" iconBg="rgba(220,160,80,.1)">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <rect x="8" y="6" width="16" height="20" rx="2" stroke="#dca050" strokeWidth="1.5" />
          <path d="M11 11h10M11 15h10M11 19h6" stroke="#dca050" strokeWidth="1.2" strokeLinecap="round" />
          <path
            d="M4 10l4 6-4 6"
            stroke="#dca050"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.4"
          />
          <path
            d="M28 10l-4 6 4 6"
            stroke="#dca050"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.4"
          />
        </svg>
      </IxdfBadge>,

      <IxdfBadge key="creating-intuitive-products" title="Creating Intuitive Products" issuer="IxDF" iconBg="rgba(255,140,60,.1)">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <path
            d="M10 22l-3 3M12 10C8 12 6 17 9 21c3 4 9 4 12 1s3-8 0-11-8-3-10 0"
            stroke="#ff8c3c"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path d="M16 14l2 2-2 2-2-2z" fill="#ff8c3c" opacity="0.5" />
          <path d="M19 10l4-4M22 14l4-1" stroke="#ff8c3c" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
        </svg>
      </IxdfBadge>,

      <IxdfBadge key="product-adoption" title="Product Adoption & Appropriation" issuer="IxDF" iconBg="rgba(80,220,160,.1)">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <path
            d="M8 20c0-4.4 3.6-8 8-8s8 3.6 8 8"
            stroke="#50dc9e"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M16 12V6M12 8l4-4 4 4"
            stroke="#50dc9e"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M8 24h16" stroke="#50dc9e" strokeWidth="1.5" strokeLinecap="round" />
          <path
            d="M12 24l1-4h6l1 4"
            stroke="#50dc9e"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.5"
          />
        </svg>
      </IxdfBadge>,

      <IxdfBadge key="usability-testing" title="Conducting Usability Testing" issuer="IxDF" iconBg="rgba(200,80,80,.1)">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <circle cx="16" cy="12" r="5" stroke="#c85050" strokeWidth="1.5" />
          <path
            d="M8 26c0-4.4 3.6-8 8-8s8 3.6 8 8"
            stroke="#c85050"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="24" cy="10" r="3" stroke="#c85050" strokeWidth="1.2" opacity="0.5" />
          <path d="M22 18c1.2.5 2 1.6 2 3" stroke="#c85050" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
        </svg>
      </IxdfBadge>,

      <IxdfBadge key="user-research-methods" title="User Research Methods" issuer="IxDF" iconBg="rgba(60,180,220,.1)">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <path
            d="M5 26L10 6h12l5 20"
            stroke="#3cb4dc"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M8 18h16" stroke="#3cb4dc" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M13 22h6" stroke="#3cb4dc" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="16" cy="12" r="2" fill="#3cb4dc" opacity="0.4" />
        </svg>
      </IxdfBadge>,

      <IxdfBadge key="mobile-ux-design" title="Mobile UX Design" issuer="IxDF" iconBg="rgba(140,100,255,.1)">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <rect x="9" y="4" width="14" height="22" rx="3" stroke="#8c64ff" strokeWidth="1.5" />
          <rect
            x="12"
            y="7"
            width="8"
            height="5"
            rx="1"
            fill="#8c64ff"
            opacity="0.2"
            stroke="#8c64ff"
            strokeWidth="1"
          />
          <path d="M12 16h8M12 19h5" stroke="#8c64ff" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="16" cy="24" r="1.2" fill="#8c64ff" opacity="0.5" />
        </svg>
      </IxdfBadge>,

      <IxdfBadge key="multimedia-design" title="Multimedia Design" issuer="IxDF" iconBg="rgba(220,120,0,.1)">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <rect x="6" y="8" width="20" height="16" rx="2" stroke="#dc7800" strokeWidth="1.5" />
          <path d="M10 13h12M10 17h8M10 21h4" stroke="#dc7800" strokeWidth="1.2" strokeLinecap="round" />
          <path
            d="M22 20l4-4-4-4"
            stroke="#dc7800"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.4"
          />
        </svg>
      </IxdfBadge>,

      <IxdfBadge key="hidesign-ipad-tablets" title="HiDesign for iPad & Tablets" issuer="IxDF" iconBg="rgba(0,180,200,.1)">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <rect x="10" y="4" width="12" height="18" rx="2" stroke="#00b4c8" strokeWidth="1.5" />
          <path d="M13 7h6M13 10h6M13 13h4" stroke="#00b4c8" strokeWidth="1.2" strokeLinecap="round" />
          <rect x="14" y="22" width="4" height="6" rx="1" stroke="#00b4c8" strokeWidth="1.2" />
          <path d="M11 28h10" stroke="#00b4c8" strokeWidth="1.5" strokeLinecap="round" />
          <path
            d="M6 12l4 4-4 4"
            stroke="#00b4c8"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.4"
          />
        </svg>
      </IxdfBadge>,
    ],
    []
  );

  useEffect(() => {
    const more = moreWrapRef.current;
    if (!more) return;
    if (!expanded) {
      setMoreMaxHeight("0px");
      return;
    }
    setMoreMaxHeight(`${more.scrollHeight}px`);
  }, [expanded]);

  const primaryBadges = badges.slice(0, firstVisibleCount);
  const extraBadges = badges.slice(firstVisibleCount);

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

        <ScrollReveal stagger className="ixdf-certs-wall">
          <div className="ixdf-certs-grid ixdf-certs-grid--primary">
            {primaryBadges}
          </div>

          {extraBadges.length > 0 ? (
            <>
              <div
                className={`ixdf-certs-more ${expanded ? "open" : ""}`}
                style={{ maxHeight: moreMaxHeight }}
                aria-hidden={!expanded}
                id={controlsId}
              >
                <div className="ixdf-certs-grid ixdf-certs-grid--more" ref={moreWrapRef}>
                  {extraBadges}
                </div>
              </div>

              <div className="ixdf-certs-toggle">
                <button
                  className="ixdf-certs-toggle-btn"
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={controlsId}
                  onClick={() => setExpanded((v) => !v)}
                >
                  {expanded ? "Show fewer certificates" : "Show more certificates"}
                </button>
              </div>
            </>
          ) : null}
        </ScrollReveal>
      </div>
    </section>
  );
}
