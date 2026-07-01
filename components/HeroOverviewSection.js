"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/siteConfig";
import { cv } from "@/config/cvData";
import { useScrollParallax } from "@/lib/useScrollParallax";

const HERO_DISPLAY_HOOK = "I design. And I build.";
const HERO_CODE_TOKEN = "the front-end";

function useHeroInteractionMode() {
  const [staticMode, setStaticMode] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const smallViewport = window.matchMedia("(max-width: 767px)");

    const sync = () => {
      setStaticMode(reducedMotion.matches || smallViewport.matches);
    };

    sync();
    reducedMotion.addEventListener("change", sync);
    smallViewport.addEventListener("change", sync);

    return () => {
      reducedMotion.removeEventListener("change", sync);
      smallViewport.removeEventListener("change", sync);
    };
  }, []);

  return staticMode;
}

function useDeferredAnimationEmbed() {
  const hostRef = useRef(null);
  const [shouldMount, setShouldMount] = useState(false);
  const [useStaticFallback, setUseStaticFallback] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const smallViewport = window.matchMedia("(max-width: 767px)");

    const syncFallback = () => {
      setUseStaticFallback(reducedMotion.matches || smallViewport.matches);
    };

    syncFallback();
    reducedMotion.addEventListener("change", syncFallback);
    smallViewport.addEventListener("change", syncFallback);

    if (reducedMotion.matches || smallViewport.matches) {
      return () => {
        reducedMotion.removeEventListener("change", syncFallback);
        smallViewport.removeEventListener("change", syncFallback);
      };
    }

    const host = hostRef.current;
    if (!host) {
      return () => {
        reducedMotion.removeEventListener("change", syncFallback);
        smallViewport.removeEventListener("change", syncFallback);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldMount(true);
          observer.disconnect();
        }
      },
      { rootMargin: "120px" }
    );

    observer.observe(host);

    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", syncFallback);
      smallViewport.removeEventListener("change", syncFallback);
    };
  }, []);

  return { hostRef, shouldMount, useStaticFallback };
}

function useDualityBlend(stageRef, staticMode) {
  const [blend, setBlend] = useState(0);

  useEffect(() => {
    if (staticMode) {
      setBlend(0);
      return undefined;
    }

    const stage = stageRef.current;
    if (!stage) return undefined;

    const onPointerMove = (event) => {
      const rect = stage.getBoundingClientRect();
      const ratio = (event.clientX - rect.left) / rect.width;
      setBlend(Math.min(1, Math.max(0, ratio)));
    };

    const onPointerLeave = () => setBlend(0);

    stage.addEventListener("pointermove", onPointerMove);
    stage.addEventListener("pointerleave", onPointerLeave);

    return () => {
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [stageRef, staticMode]);

  return blend;
}

function HeroSupportLine({ text }) {
  const tokenIndex = text.indexOf(HERO_CODE_TOKEN);
  if (tokenIndex === -1) {
    return <p className="hero-support-line">{text}</p>;
  }

  const before = text.slice(0, tokenIndex);
  const after = text.slice(tokenIndex + HERO_CODE_TOKEN.length);

  return (
    <p className="hero-support-line">
      {before}
      <code className="hero-code-token">{HERO_CODE_TOKEN}</code>
      {after}
    </p>
  );
}

export default function HeroOverviewSection() {
  const sectionRef = useRef(null);
  const typeStageRef = useRef(null);
  const staticMode = useHeroInteractionMode();
  const dualityBlend = useDualityBlend(typeStageRef, staticMode);
  const { hostRef, shouldMount, useStaticFallback } = useDeferredAnimationEmbed();

  const heroSupport = cv.heroLead.slice(HERO_DISPLAY_HOOK.length).trim();

  useScrollParallax(
    () => {
      const root = sectionRef.current;
      if (!root) return null;
      return {
        root,
        bg: root.querySelector(".hero-bg-embed"),
        fg: root.querySelector(".hero-content"),
      };
    },
    { bgRate: 0.22, fgRate: -0.075, bgScale: 1.08, maxTravel: 200 }
  );

  return (
    <section ref={sectionRef} className="hero hero-cv hero-duality-stage" id="overview">
      <div ref={hostRef} className="hero-bg-embed" aria-hidden="true">
        {useStaticFallback ? (
          <div className="hero-bg-static" />
        ) : shouldMount ? (
          <iframe
            className="hero-bg-iframe"
            src="/animations/digital_ronin_bg_4k.html"
            title=""
            loading="lazy"
          />
        ) : null}
        <div className="hero-bg-dim" />
      </div>

      <div className="hero-content">
        <p className="hero-level-label">{siteConfig.brand.roleTitle}</p>

        <div
          ref={typeStageRef}
          className={`hero-type-stage${staticMode ? " is-static" : " is-interactive"}`}
          aria-label="Designer and builder duality — move pointer across to cross-fade portraits"
        >
          {!staticMode ? (
            <div
              className="hero-portrait-reveal"
              style={{ "--duality-blend": dualityBlend }}
              aria-hidden="true"
            >
              <img
                className="hero-portrait-reveal-img hero-portrait-reveal-img--designer"
                src="/img/designer-portrait-illustration.webp"
                alt=""
                width={420}
                height={420}
                loading="eager"
                decoding="async"
              />
              <img
                className="hero-portrait-reveal-img hero-portrait-reveal-img--coder"
                src="/img/developer-portrait-illustration.webp"
                alt=""
                width={420}
                height={420}
                loading="lazy"
                decoding="async"
              />
            </div>
          ) : (
            <div className="hero-portrait-static" aria-hidden="true">
              <img
                src="/img/designer-portrait-illustration.webp"
                alt=""
                width={160}
                height={160}
                loading="eager"
                decoding="async"
              />
              <img
                src="/img/developer-portrait-illustration.webp"
                alt=""
                width={160}
                height={160}
                loading="lazy"
                decoding="async"
              />
            </div>
          )}

          <h1 className="hero-display">
            <span className="hero-display-line hero-display-line--design">I design.</span>
            <span className="hero-display-line hero-display-line--build">And I build.</span>
            <span className="sr-only"> {heroSupport}</span>
          </h1>
        </div>

        <HeroSupportLine text={heroSupport} />

        <p className="hero-availability">{siteConfig.availability}</p>

        <div className="cta-row">
          <a
            className="button button-gold"
            href="/JLC_CV-2026.pdf"
            download="Jonathan-Le-Coz-CV-2026.pdf"
          >
            CV
          </a>
          <a
            className="button button-secondary"
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
