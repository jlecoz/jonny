"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import HeroGoldScramble from "@/components/HeroGoldScramble";
import ScrollReveal from "@/components/ScrollReveal";
import { useScrollParallax } from "@/lib/useScrollParallax";

export default function HeroOverviewSection({ meta, title, skillTagsLine }) {
  const sectionRef = useRef(null);
  const [activeAvatarRole, setActiveAvatarRole] = useState(null);
  const showDesignerAvatar = () => setActiveAvatarRole("designer");
  const showCoderAvatar = () => setActiveAvatarRole("coder");
  const updateAvatarFromPointer = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const nextRole = event.clientX < rect.left + rect.width / 2 ? "designer" : "coder";
    setActiveAvatarRole((currentRole) => (currentRole === nextRole ? currentRole : nextRole));
  };

  useScrollParallax(
    () => {
      const root = sectionRef.current;
      if (!root) return null;
      return {
        root,
        bg: root.querySelector(".hero-bg-embed"),
        fg: root.querySelector(".hero-content"),
        pinnedFg: root.querySelector(".hero-cv-avatar"),
      };
    },
    { bgRate: 0.22, fgRate: -0.075, bgScale: 1.08, maxTravel: 200 }
  );

  return (
    <section ref={sectionRef} className="hero hero-cv" id="overview">
      <div className="hero-bg-embed" aria-hidden="true">
        <iframe
          className="hero-bg-iframe"
          src="/animations/digital_ronin_bg_4k.html"
          title=""
          loading="eager"
        />
        <div className="hero-bg-dim" />
      </div>
      <div className="hero-content">
        <div
          className={`hero-duality${activeAvatarRole ? ` is-avatar-${activeAvatarRole}` : ""}`}
          aria-label="Designer and coder overview"
          onPointerMove={updateAvatarFromPointer}
          onPointerLeave={() => setActiveAvatarRole(null)}
        >
          <div className="hero-duality-inner">
            <div
              className="hero-role hero-role--designer"
              role="button"
              tabIndex={0}
              onClick={showDesignerAvatar}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  showDesignerAvatar();
                }
              }}
              onPointerEnter={showDesignerAvatar}
            >
              <p className="hero-role-title">designer</p>
              <p className="hero-role-copy">
                Product designer specialising in UX strategy, design systems and customer-centred product direction.
              </p>
            </div>

            <div className="hero-cv-avatar">
              <div className="hero-avatar-flip" aria-label="Jonathan portrait illustration flip">
                <img
                  className="hero-cv-avatar-img hero-avatar-flip-face hero-avatar-flip-face--photo"
                  src="/img/hero-jonathan-portrait.webp"
                  alt="Jonathan Le Coz, Experiential Designer"
                  width={330}
                  height={330}
                  loading="eager"
                  decoding="async"
                />
                <img
                  className="hero-avatar-illustration hero-avatar-illustration--designer hero-avatar-flip-face hero-avatar-flip-face--illustration"
                  src="/img/designer-portrait-illustration.webp"
                  alt=""
                  aria-hidden="true"
                  width={330}
                  height={330}
                  loading="eager"
                  decoding="async"
                />
                <img
                  className="hero-avatar-illustration hero-avatar-illustration--coder hero-avatar-flip-face hero-avatar-flip-face--illustration"
                  src="/img/developer-portrait-illustration.webp"
                  alt=""
                  aria-hidden="true"
                  width={330}
                  height={330}
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>

            <div
              className="hero-role hero-role--coder"
              role="button"
              tabIndex={0}
              onClick={showCoderAvatar}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  showCoderAvatar();
                }
              }}
              onPointerEnter={showCoderAvatar}
            >
              <p className="hero-role-title">&lt;coder&gt;</p>
              <p className="hero-role-copy">
                Front-end minded design leader who prototypes, builds and partners closely with engineering teams.
              </p>
            </div>
          </div>
        </div>

        <ScrollReveal>
          <p className="eyebrow">{meta}</p>
        </ScrollReveal>
        <h1 className="hero-headline">
          <HeroGoldScramble text={title} />
        </h1>
        <ScrollReveal className="reveal-down">
          <p className="cv-core-tags">{skillTagsLine}</p>
        </ScrollReveal>

        <ScrollReveal className="cta-row" stagger>
          <Link className="button button-gold reveal reveal-right" href="/contact">
            Contact
          </Link>
          <a
            className="button button-secondary reveal reveal-left"
            href="https://www.linkedin.com/in/jonathan-lecoz/?locale=en_US"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </ScrollReveal>

      </div>
    </section>
  );
}
