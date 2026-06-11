"use client";

import { useRef } from "react";
import { useScrollParallax } from "@/lib/useScrollParallax";

/** Full-bleed canvas animation behind contact CTA (iframe loads public animation). */
export default function ContactCtaBackground() {
  const embedRef = useRef(null);

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
      <iframe
        className="contact-cta-bg-iframe"
        src="/animations/fiber_optic_deepsea_slow.html"
        title=""
        loading="lazy"
      />
      <div className="contact-cta-bg-dim" />
    </div>
  );
}
