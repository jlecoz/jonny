import { attachScrollAndResize } from "@/lib/scrollRoot";

export const HOME_REVEAL_THRESHOLD = 0.15;
export const HOME_REVEAL_STAGGER_MS = 60;
export const HOME_REVEAL_STAGGER_CAP = 6;

let worksCardRevealSync = null;

export function syncWorksCardReveals() {
  worksCardRevealSync?.();
}

function prefersReducedMotion() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getScrollRoot() {
  const root = document.querySelector(".parallax-container");
  if (!root) return null;
  const { overflowY } = getComputedStyle(root);
  if (overflowY !== "auto" && overflowY !== "scroll") return null;
  return root;
}

function isHomePath() {
  if (typeof window === "undefined") return false;
  return window.location?.pathname === "/";
}

function shouldSkip(el) {
  if (!el || el.nodeType !== 1) return true;
  if (el.matches("script, style, [aria-hidden='true']")) return true;
  return false;
}

function isRevealed(el) {
  return el.classList.contains("revealed") || el.hasAttribute("data-revealed");
}

function collectTargets(main) {
  return Array.from(main.querySelectorAll("[data-reveal]")).filter((el) => !shouldSkip(el));
}

function isWorksCard(el) {
  return Boolean(el.closest("#works .cv-work-grid"));
}

function isHeroTarget(el) {
  return Boolean(el.closest("#overview"));
}

function assignStaggerDelays(targets) {
  const heroTargets = targets.filter(isHeroTarget);
  heroTargets.forEach((el, index) => {
    const i = Math.min(index, HOME_REVEAL_STAGGER_CAP - 1);
    el.style.setProperty("--home-reveal-delay", `${i * HOME_REVEAL_STAGGER_MS}ms`);
  });

  const nonHeroTargets = targets.filter((el) => !isHeroTarget(el) && !isWorksCard(el));
  const byParent = new Map();
  nonHeroTargets.forEach((el) => {
    const parent = el.parentElement || el;
    const group = byParent.get(parent) || [];
    group.push(el);
    byParent.set(parent, group);
  });

  byParent.forEach((group) => {
    group.forEach((el, index) => {
      const i = Math.min(index, HOME_REVEAL_STAGGER_CAP - 1);
      el.style.setProperty("--home-reveal-delay", `${i * HOME_REVEAL_STAGGER_MS}ms`);
    });
  });

  targets.filter(isWorksCard).forEach((el) => {
    el.style.setProperty("--home-reveal-delay", "0ms");
  });
}

function createRevealObserver({ root, threshold, onReveal }) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        requestAnimationFrame(() => onReveal(entry.target));
        observer.unobserve(entry.target);
      });
    },
    { root, threshold },
  );

  return observer;
}

function shouldRevealWorksCard(el, viewport) {
  const card = el.getBoundingClientRect();
  const view = viewport.getBoundingClientRect();

  if (card.bottom <= view.top + 12 || card.top >= view.bottom - 12) return false;

  const centerX = card.left + card.width / 2;
  const centerY = card.top + card.height / 2;
  const inViewX = centerX >= view.left + 32 && centerX <= view.right - 32;
  const inViewY = centerY >= view.top + 12 && centerY <= view.bottom - 12;

  return inViewX && inViewY;
}

function revealWithTransition(el) {
  if (isRevealed(el)) return;
  void el.offsetHeight;
  requestAnimationFrame(() => {
    el.classList.add("revealed");
    el.setAttribute("data-revealed", "");
  });
}

function revealVisibleWorksCards({ viewport, cards, onReveal }) {
  if (!viewport || !cards.length) return;

  const view = viewport.getBoundingClientRect();
  if (view.bottom <= 0 || view.top >= window.innerHeight) return;

  cards.forEach((el) => {
    if (isRevealed(el)) return;
    if (!shouldRevealWorksCard(el, viewport)) return;
    onReveal(el);
  });
}

function armHomeReveal(rootEl, onArmed) {
  rootEl.classList.add("home-reveal-ready");
  let raf1 = 0;
  let raf2 = 0;

  raf1 = requestAnimationFrame(() => {
    raf2 = requestAnimationFrame(onArmed);
  });

  return () => {
    cancelAnimationFrame(raf1);
    cancelAnimationFrame(raf2);
  };
}

export function initHomeScrollReveal() {
  if (typeof window === "undefined") return () => {};
  if (!isHomePath()) return () => {};
  if (prefersReducedMotion()) return () => {};
  if (typeof IntersectionObserver === "undefined") return () => {};

  const main = document.querySelector("main");
  if (!main) return () => {};

  const rootEl = document.documentElement;
  const scrollRoot = getScrollRoot();
  const targets = collectTargets(main);
  if (!targets.length) return () => {};

  assignStaggerDelays(targets);

  const worksViewport = document.querySelector("#works .works-horizontal-viewport");
  const worksCards = targets.filter(isWorksCard);
  const heroTargets = targets.filter((el) => !isWorksCard(el) && isHeroTarget(el));
  const generalTargets = targets.filter((el) => !isWorksCard(el) && !isHeroTarget(el));

  const revealTarget = (el) => revealWithTransition(el);
  const revealWorksCard = (el) => revealWithTransition(el);

  const generalObserver = createRevealObserver({
    root: scrollRoot,
    threshold: HOME_REVEAL_THRESHOLD,
    onReveal: revealTarget,
  });

  const checkWorksCards = () => {
    revealVisibleWorksCards({
      viewport: worksViewport,
      cards: worksCards,
      onReveal: revealWorksCard,
    });
  };

  worksCardRevealSync = checkWorksCards;

  let detachScroll = () => {};
  const cancelArm = armHomeReveal(rootEl, () => {
    heroTargets.forEach((el) => revealTarget(el));
    generalTargets.forEach((el) => generalObserver.observe(el));
    checkWorksCards();

    detachScroll = attachScrollAndResize(checkWorksCards);
    window.addEventListener("works-cards-horizontal-scroll", checkWorksCards);
  });

  return () => {
    worksCardRevealSync = null;
    cancelArm();
    detachScroll();
    window.removeEventListener("works-cards-horizontal-scroll", checkWorksCards);
    generalObserver.disconnect();
    rootEl.classList.remove("home-reveal-ready");
    targets.forEach((el) => {
      el.classList.remove("revealed");
      el.removeAttribute("data-revealed");
      el.style.removeProperty("--home-reveal-delay");
    });
  };
}
