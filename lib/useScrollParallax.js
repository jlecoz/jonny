"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { attachScrollAndResize } from "@/lib/scrollRoot";

const defaultOpts = {
  bgRate: 0.2,
  fgRate: -0.065,
  bgScale: 1.07,
  maxTravel: 160,
};

/**
 * Scroll-linked depth (background lags scroll; optional foreground shift).
 * Respects prefers-reduced-motion.
 *
 * @param {() => { root: Element | null; bg: Element | null; fg: Element | null; pinnedFg?: Element | null } | null} getElements
 * @param {Partial<typeof defaultOpts>} options
 */
export function useScrollParallax(getElements, options = {}) {
  const getElementsRef = useRef(getElements);
  const optsRef = useRef({ ...defaultOpts, ...options });

  useLayoutEffect(() => {
    getElementsRef.current = getElements;
    optsRef.current = { ...defaultOpts, ...options };
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return undefined;

    let raf = 0;

    const run = () => {
      raf = 0;
      const els = getElementsRef.current?.();
      if (!els?.root) return;

      const { bgRate, fgRate, bgScale, maxTravel } = optsRef.current;
      const { root, bg, fg, pinnedFg } = els;

      const clear = () => {
        if (bg) bg.style.transform = "";
        if (fg) fg.style.transform = "";
        if (pinnedFg) pinnedFg.style.transform = "";
      };

      const rect = root.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) {
        clear();
        return;
      }

      const t = Math.min(maxTravel, Math.max(0, -rect.top));
      if (bg) {
        bg.style.transform = `translate3d(0, ${t * bgRate}px, 0) scale(${bgScale})`;
      }
      if (fg && fgRate !== 0) {
        const fgY = t * fgRate;
        fg.style.transform = `translate3d(0, ${fgY}px, 0)`;
        if (pinnedFg) {
          pinnedFg.style.transform = `translate3d(0, ${-fgY}px, 0)`;
        }
      }
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
      const els = getElementsRef.current?.();
      if (els?.bg) els.bg.style.transform = "";
      if (els?.fg) els.fg.style.transform = "";
      if (els?.pinnedFg) els.pinnedFg.style.transform = "";
    };
  }, []);
}
