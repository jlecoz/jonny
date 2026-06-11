"use client";

import { useEffect } from "react";
import { attachScrollAndResize } from "@/lib/scrollRoot";

/** Hero uses dedicated background + foreground parallax — avoid stacking transforms on the whole block. */
/** Skip sections whose layout depends on sticky / scroll-driven CSS (transform on inner breaks sticky). */
const SKIP_SECTION_IDS = new Set(["overview", "works", "recommendations"]);

function collectParallaxEntries(main) {
  const out = [];
  main.querySelectorAll(":scope > section").forEach((section, index) => {
    if (SKIP_SECTION_IDS.has(section.id)) return;

    const inner =
      section.querySelector(":scope > .section-services-inner") ||
      section.querySelector(":scope > .sdx-hero-inner");

    const el = inner || section;
    out.push({ section, el, index });
  });
  return out;
}

/**
 * Whole-page section parallax: each section’s primary inner wrapper shifts slightly with scroll
 * (alternating direction / rate by index) for depth similar to layered marketing sites.
 */
export default function MainSectionParallax() {
  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const main = document.querySelector("main");
    if (!main) return undefined;

    const entries = collectParallaxEntries(main);
    if (!entries.length) return undefined;

    let raf = 0;

    const run = () => {
      raf = 0;
      const vh = window.innerHeight;

      entries.forEach(({ section, el, index }) => {
        const rect = section.getBoundingClientRect();
        if (rect.bottom < -120 || rect.top > vh + 120) {
          el.style.transform = "";
          return;
        }

        const scrolled = Math.max(0, -rect.top);
        const rate = 0.038 + (index % 7) * 0.006;
        const cap = 32;
        const direction = index % 2 === 0 ? 1 : -1;
        let shift = scrolled * rate * direction * 0.5;
        if (shift > cap) shift = cap;
        if (shift < -cap) shift = -cap;
        el.style.transform = `translate3d(0, ${shift}px, 0)`;
      });
    };

    const schedule = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        run();
        raf = 0;
      });
    };

    schedule();
    const detachScrollResize = attachScrollAndResize(schedule);

    return () => {
      detachScrollResize();
      cancelAnimationFrame(raf);
      entries.forEach(({ el }) => {
        el.style.transform = "";
      });
    };
  }, []);

  return null;
}
