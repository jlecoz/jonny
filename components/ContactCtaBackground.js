"use client";

import { useEffect, useRef, useState } from "react";
import { useScrollParallax } from "@/lib/useScrollParallax";

/** Full-bleed canvas animation behind contact CTA — deferred so it never blocks first paint. */
export default function ContactCtaBackground() {
  const embedRef = useRef(null);
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

    const embed = embedRef.current;
    if (!embed) {
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
      { rootMargin: "160px" }
    );

    observer.observe(embed);

    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", syncFallback);
      smallViewport.removeEventListener("change", syncFallback);
    };
  }, []);

  useScrollParallax(
    () => {
      const embed = embedRef.current;
      if (!embed) return null;
      const root = embed.closest(".section-contact-cta");
      if (!root) return null;
      return { root, bg: embed, fg: null };
    },
    { bgRate: 0.16, fgRate: 0, bgScale: 1.06, maxTravel: 140 }
  );

  return (
    <div ref={embedRef} className="contact-cta-bg-embed" aria-hidden="true">
      {useStaticFallback ? (
        <div className="contact-cta-bg-static" />
      ) : shouldMount ? (
        <iframe
          className="contact-cta-bg-iframe"
          src="/animations/fiber_optic_deepsea_slow.html"
          title=""
          loading="lazy"
        />
      ) : null}
      <div className="contact-cta-bg-dim" />
    </div>
  );
}
