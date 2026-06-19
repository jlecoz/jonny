"use client";

import { useEffect, useRef } from "react";
import { attachScrollAndResize } from "@/lib/scrollRoot";

const STACK_STEP_PX = 14;
const LOCK_TOLERANCE_PX = 10;

/**
 * Scroll-stacked recommendation cards. Once all cards lock into the pile,
 * pins the stack as one unit through the rest of the section.
 */
export default function RecommendationsStackCards({ cardCount, children, footer }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const stage = root.querySelector(".rec-stack-stage");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const parallaxContainer = document.querySelector(".parallax-container");
    const getScrollTop = () =>
      parallaxContainer ? parallaxContainer.scrollTop : window.scrollY || window.pageYOffset || 0;
    let lastScrollTop = getScrollTop();

    const clear = () => {
      root.classList.remove("is-rec-stack-settled");
      root.style.removeProperty("--rec-stack-height");
      root.style.removeProperty("--rec-stack-hold");
      root.style.removeProperty("--rec-stack-runway");
      root.style.removeProperty("--rec-stack-stage-height");
      root.style.removeProperty("--rec-stack-footer-height");
      root.style.removeProperty("--rec-stack-pin-height");

      const section = root.closest("#recommendations");
      section?.querySelector(".recommendations-title")?.classList.remove("is-rec-title-released");
      syncTitleHeight(section);
    };

    const syncTitleHeight = (section) => {
      const inner = section?.querySelector(".section-services-inner");
      const title = section?.querySelector(".recommendations-title");
      if (!inner || !title) return;

      inner.style.setProperty(
        "--rec-title-height",
        `${Math.ceil(title.getBoundingClientRect().height)}px`,
      );
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

    const measureHoldHeight = (footerHeight = 0) => {
      const footerGap = footerHeight > 0 ? 24 : 0;
      // Short exit runway — enough to reveal the footer CTA, not the full section tail.
      return Math.max(72, footerGap + footerHeight + 48);
    };

    const measureFooterHeight = () => {
      const footer = root.querySelector(".rec-stack-footer");
      if (!footer) return 0;
      return Math.ceil(footer.getBoundingClientRect().height);
    };

    const settle = (contents) => {
      const stackHeight = measureStackHeight(contents);
      const footerHeight = measureFooterHeight();
      const holdHeight = measureHoldHeight(footerHeight);
      const footerGap = footerHeight > 0 ? 20 : 0;
      const pinHeight = stackHeight + footerGap + footerHeight;
      const runway = Math.ceil(pinHeight + holdHeight);
      const section = root.closest("#recommendations");

      root.style.setProperty("--rec-stack-runway", `${runway}px`);
      root.style.setProperty("--rec-stack-height", `${stackHeight}px`);
      root.style.setProperty("--rec-stack-footer-height", `${footerHeight}px`);
      root.style.setProperty("--rec-stack-pin-height", `${pinHeight}px`);
      // Hold drives scroll while the pile stays pinned; keep it stable to avoid layout jumps.
      root.style.setProperty("--rec-stack-hold", `${holdHeight}px`);
      root.classList.add("is-rec-stack-settled");
      section?.querySelector(".recommendations-title")?.classList.add("is-rec-title-released");
    };

    const run = () => {
      if (reduceMotion.matches || !stage) {
        clear();
        return;
      }

      // Keep section/runway sizing in sync with the actual stacked stage height.
      root.style.setProperty(
        "--rec-stack-stage-height",
        `${Math.ceil(stage.getBoundingClientRect().height)}px`,
      );

      const scrollTop = getScrollTop();
      const isScrollingUp = scrollTop < lastScrollTop - 2;
      lastScrollTop = scrollTop;

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
        // When scrolling back up into the section, drop the pinned layout so cards "rewind"
        // through their sticky stacking positions again.
        if (isScrollingUp && sectionRect && sectionRect.top > -80) {
          clear();
          return;
        }
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
    const detach = attachScrollAndResize(() => {
      syncTitleHeight(root.closest("#recommendations"));
      schedule();
    });
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
      <div className="rec-stack-sticky-pin">
        <div className="rec-stack-stage">{children}</div>
        {footer ? <div className="rec-stack-footer">{footer}</div> : null}
      </div>
      <div className="rec-stack-hold" aria-hidden="true" />
    </div>
  );
}

