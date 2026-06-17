"use client";

import { useEffect, useRef } from "react";
import { attachScrollAndResize } from "@/lib/scrollRoot";

const STACK_STEP_PX = 14;
const LOCK_TOLERANCE_PX = 10;

/**
 * Scroll-stacked recommendation cards. Once all cards lock into the pile,
 * pins the stack as one unit through the rest of the section.
 */
export default function RecommendationsStackCards({ cardCount, children }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const stage = root.querySelector(".rec-stack-stage");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const clear = () => {
      root.classList.remove("is-rec-stack-settled");
      root.style.removeProperty("--rec-stack-height");
      root.style.removeProperty("--rec-stack-hold");
    };

    const measureStackHeight = (contents) => {
      if (!contents.length) return 0;

      const first = contents[0].getBoundingClientRect();
      const last = contents[contents.length - 1].getBoundingClientRect();
      return Math.ceil(last.bottom - first.top);
    };

    const areCardsStacked = (contents) => {
      if (contents.length < 2) return contents.length === 1;

      const firstTop = contents[0].getBoundingClientRect().top;
      return contents.every((content, index) => {
        const expectedTop = firstTop + index * STACK_STEP_PX;
        return Math.abs(content.getBoundingClientRect().top - expectedTop) < LOCK_TOLERANCE_PX;
      });
    };

    const measureHoldHeight = (contents) => {
      const section = root.closest("#recommendations");
      if (!section || !contents.length) return 96;

      const stackBottom = contents[contents.length - 1].getBoundingClientRect().bottom;
      const sectionBottom = section.getBoundingClientRect().bottom;
      return Math.max(64, Math.ceil(sectionBottom - stackBottom));
    };

    const settle = (contents) => {
      root.style.setProperty("--rec-stack-height", `${measureStackHeight(contents)}px`);
      root.style.setProperty("--rec-stack-hold", `${measureHoldHeight(contents)}px`);
      root.classList.add("is-rec-stack-settled");
    };

    const run = () => {
      if (reduceMotion.matches || !stage) {
        clear();
        return;
      }

      const contents = [...root.querySelectorAll(".rec-stack-card__content")];
      if (!contents.length) return;

      const rootRect = root.getBoundingClientRect();
      const section = root.closest("#recommendations");
      const sectionRect = section?.getBoundingClientRect();
      const sectionOffscreen =
        !sectionRect ||
        sectionRect.bottom < 0 ||
        sectionRect.top > window.innerHeight;

      if (root.classList.contains("is-rec-stack-settled")) {
        if (sectionOffscreen) {
          clear();
        }
        return;
      }

      const sectionVisible = rootRect.bottom > 0 && rootRect.top < window.innerHeight;
      const allStacked = areCardsStacked(contents);

      if (allStacked && sectionVisible) {
        settle(contents);
        return;
      }

      if (!allStacked && rootRect.bottom < 0) {
        clear();
      }
    };

    let raf = 0;
    const schedule = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        run();
        raf = 0;
      });
    };

    schedule();
    const detach = attachScrollAndResize(schedule);
    reduceMotion.addEventListener("change", schedule);

    return () => {
      detach();
      reduceMotion.removeEventListener("change", schedule);
      cancelAnimationFrame(raf);
      clear();
    };
  }, [cardCount]);

  return (
    <div
      ref={rootRef}
      id="recommendation-cards"
      className="rec-stack-cards"
      style={{ "--numcards": cardCount }}
    >
      <div className="rec-stack-stage">{children}</div>
      <div className="rec-stack-hold" aria-hidden="true" />
    </div>
  );
}
