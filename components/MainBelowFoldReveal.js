"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  assignRevealIndices,
  collectCascadeSections,
  collectRevealTargets,
  getScrollRoot,
  revealSection,
  resetSectionReveal,
} from "@/lib/cascadeReveal";

/**
 * Cascading scroll reveals per section: when a section enters the viewport,
 * its reveal targets animate in sequence (staggered via --reveal-index).
 */
export default function MainBelowFoldReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scrollRoot = getScrollRoot();
    const sections = collectCascadeSections();

    if (!sections.length) return undefined;

    const sectionState = new Map();

    const setupSection = (section) => {
      resetSectionReveal(section);

      const targets = collectRevealTargets(section);
      if (!targets.length) return null;

      assignRevealIndices(targets);

      if (reducedMotion) {
        revealSection(section, targets);
        return null;
      }

      return { section, targets };
    };

    sections.forEach((section) => {
      const state = setupSection(section);
      if (state) sectionState.set(section, state);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const state = sectionState.get(entry.target);
          if (!state) return;

          revealSection(state.section, state.targets);
          observer.unobserve(entry.target);
          sectionState.delete(entry.target);
        });
      },
      {
        root: scrollRoot,
        threshold: 0.08,
        rootMargin: "0px 0px -6% 0px",
      },
    );

    sectionState.forEach(({ section }) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
      sections.forEach((section) => {
        resetSectionReveal(section);
      });
      sectionState.clear();
    };
  }, [pathname]);

  return null;
}
