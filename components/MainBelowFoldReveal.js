"use client";

import { useEffect } from "react";

const FOLD_RATIO = 0.92;
const DATA_ATTR = "data-below-fold-reveal";

const TARGET_SELECTORS = [
  "section:not(#overview) .section-services-inner > *",
  "section:not(#overview):not(:has(> .section-services-inner)) > *",
  ".case-study-page .case-study-inner > *",
  ".case-study-page .case-study-footer",
].join(", ");

function shouldSkip(el) {
  if (!el || el.nodeType !== 1) return true;
  if (el.hasAttribute(DATA_ATTR)) return false;
  if (el.matches("script, style, [aria-hidden='true']")) return true;
  if (el.classList.contains("reveal") || el.classList.contains("reveal-stagger")) return true;
  if (el.closest(".reveal, .reveal-stagger")) return true;
  if (el.hasAttribute("data-below-fold-skip")) return true;
  return false;
}

function isBelowFold(el) {
  return el.getBoundingClientRect().top >= window.innerHeight * FOLD_RATIO;
}

function clearAutoReveal(el, observer, observed) {
  el.classList.remove("reveal", "reveal-fade", "visible");
  el.removeAttribute(DATA_ATTR);
  if (observer && observed.has(el)) {
    observer.unobserve(el);
    observed.delete(el);
  }
}

/**
 * Applies scroll fades to main content that starts below the initial viewport fold.
 * Skips the hero (#overview) and blocks already handled by ScrollReveal.
 */
export default function MainBelowFoldReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const main = document.querySelector("main");
    if (!main) return undefined;

    const observed = new Set();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
          observed.delete(entry.target);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
    );

    const apply = () => {
      main.querySelectorAll(`[${DATA_ATTR}]`).forEach((el) => {
        if (!isBelowFold(el) && !el.classList.contains("visible")) {
          clearAutoReveal(el, observer, observed);
        }
      });

      main.querySelectorAll(TARGET_SELECTORS).forEach((el) => {
        if (shouldSkip(el)) return;
        if (el.classList.contains("visible")) return;
        if (!isBelowFold(el)) return;
        if (el.hasAttribute(DATA_ATTR)) {
          observer.observe(el);
          observed.add(el);
          return;
        }

        el.classList.add("reveal", "reveal-fade");
        el.setAttribute(DATA_ATTR, "true");
        observer.observe(el);
        observed.add(el);
      });
    };

    const scheduleApply = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(apply);
      });
    };

    scheduleApply();

    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(scheduleApply, 150);
    };

    window.addEventListener("resize", onResize);

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
      observed.clear();
      main.querySelectorAll(`[${DATA_ATTR}]`).forEach((el) => {
        el.classList.remove("reveal", "reveal-fade", "visible");
        el.removeAttribute(DATA_ATTR);
      });
    };
  }, []);

  return null;
}
