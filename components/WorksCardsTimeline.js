"use client";

import { useEffect, useRef } from "react";
import { attachScrollAndResize } from "@/lib/scrollRoot";

/**
 * Pins the Works cards while vertical scrolling drives the cards horizontally.
 * Uses JS instead of CSS scroll timelines so it works with the app's custom scroll root.
 */
export default function WorksCardsTimeline({ children }) {
  const cardsWrapperRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const cardsWrapper = cardsWrapperRef.current;
    if (!cardsWrapper) return undefined;

    const viewport = cardsWrapper.querySelector(".works-horizontal-viewport");
    const intro = cardsWrapper.querySelector(".section-intro");
    const track = cardsWrapper.querySelector(".cv-work-grid");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!viewport || !track) return undefined;

    let raf = 0;
    let measureRaf = 0;
    let scrollDistance = 0;
    let horizontalStartOffset = 0;
    let lastTranslateX = null;

    const clear = () => {
      scrollDistance = 0;
      horizontalStartOffset = 0;
      cardsWrapper.style.removeProperty("--works-scroll-distance");
      cardsWrapper.style.removeProperty("--works-horizontal-start-offset");
      cardsWrapper.style.removeProperty("--works-sticky-height");
      cardsWrapper.style.removeProperty("--works-scroll-runway");
      track.style.transform = "";
      lastTranslateX = null;
    };

    const run = () => {
      raf = 0;
      if (reduceMotion.matches || window.innerWidth <= 720 || scrollDistance <= 1) {
        track.style.transform = "";
        return;
      }

      const rect = cardsWrapper.getBoundingClientRect();
      const stickyTop = parseFloat(window.getComputedStyle(viewport).top) || 0;
      const progress = Math.min(
        1,
        Math.max(0, (stickyTop - rect.top - horizontalStartOffset) / scrollDistance),
      );
      const nextTranslateX = -scrollDistance * progress;
      track.style.transform = `translate3d(${nextTranslateX}px, 0, 0)`;

      if (lastTranslateX !== null && Math.abs(nextTranslateX - lastTranslateX) > 8) {
        window.dispatchEvent(new CustomEvent("works-cards-horizontal-scroll"));
      }

      lastTranslateX = nextTranslateX;
    };

    const schedule = () => {
      if (raf) return;
      raf = requestAnimationFrame(run);
    };

    const measure = () => {
      measureRaf = 0;
      if (reduceMotion.matches || window.innerWidth <= 720) {
        clear();
        return;
      }

      const stickyHeight = window.innerHeight;
      cardsWrapper.style.setProperty("--works-sticky-height", `${stickyHeight}px`);
      const previousTransform = track.style.transform;
      track.style.transform = "";

      if (intro) {
        const introRect = intro.getBoundingClientRect();
        const viewportRect = viewport.getBoundingClientRect();
        horizontalStartOffset = Math.max(0, introRect.bottom - viewportRect.top);
      } else {
        horizontalStartOffset = 0;
      }

      const viewportRect = viewport.getBoundingClientRect();
      const trackRect = track.getBoundingClientRect();
      const trackStartOffset = Math.max(0, trackRect.left - viewportRect.left);
      scrollDistance = Math.max(0, trackStartOffset + track.scrollWidth - viewport.clientWidth);
      track.style.transform = previousTransform;
      cardsWrapper.style.setProperty("--works-scroll-distance", `${scrollDistance}px`);
      cardsWrapper.style.setProperty("--works-horizontal-start-offset", `${horizontalStartOffset}px`);
      cardsWrapper.style.setProperty(
        "--works-scroll-runway",
        `${scrollDistance + horizontalStartOffset + stickyHeight}px`,
      );
      run();
    };

    const scheduleMeasure = () => {
      if (measureRaf) return;
      measureRaf = requestAnimationFrame(measure);
    };

    scheduleMeasure();
    const detachScrollResize = attachScrollAndResize(schedule);
    window.addEventListener("resize", scheduleMeasure);
    reduceMotion.addEventListener("change", scheduleMeasure);

    const resizeObserver = new ResizeObserver(scheduleMeasure);
    resizeObserver.observe(viewport);
    if (intro) resizeObserver.observe(intro);
    resizeObserver.observe(track);

    return () => {
      detachScrollResize();
      window.removeEventListener("resize", scheduleMeasure);
      reduceMotion.removeEventListener("change", scheduleMeasure);
      resizeObserver.disconnect();
      cancelAnimationFrame(raf);
      cancelAnimationFrame(measureRaf);
      clear();
    };
  }, []);

  return (
    <div id="cards" ref={cardsWrapperRef} className="cards-scroll-driver">
      <div className="works-horizontal-viewport">{children}</div>
    </div>
  );
}
