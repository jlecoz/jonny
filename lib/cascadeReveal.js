export const REVEAL_DURATION = "0.5s";
export const REVEAL_EASE = "cubic-bezier(0.2, 0.8, 0.2, 1)";
export const REVEAL_STAGGER_STEP = "80ms";

const AUTO_TAG_SELECTORS = [
  ".section-services-inner > *",
  ".section-contact-cta-inner > *",
  "section:not(:has(> .section-services-inner)):not(#overview) > *",
  ".case-study-page .case-study-inner > *",
  ".case-study-page .case-study-footer",
  ".site-footer .section-services-inner > *",
].join(", ");

function compareDocumentOrder(a, b) {
  if (a === b) return 0;
  const pos = a.compareDocumentPosition(b);
  if (pos & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
  if (pos & Node.DOCUMENT_POSITION_PRECEDING) return 1;
  return 0;
}

export function getScrollRoot() {
  if (typeof document === "undefined") return null;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return null;
  return document.querySelector(".parallax-container");
}

function shouldSkipAutoTag(el) {
  if (!el || el.nodeType !== 1) return true;
  if (el.matches("script, style, [aria-hidden='true']")) return true;
  if (el.hasAttribute("data-reveal-skip")) return true;
  if (el.closest(".reveal, .reveal-stagger")) return true;
  if (el.classList.contains("cv-pitch-card") || el.closest(".cv-pitch-card")) return true;
  if (el.classList.contains("rec-stack-card") || el.closest(".rec-stack-card")) return true;
  if (el.closest(".works-horizontal-viewport, .cards-scroll-driver")) return true;
  return false;
}

function isInsideAnotherTarget(el, targets) {
  for (const target of targets) {
    if (target !== el && target.contains(el)) return true;
  }
  return false;
}

export function collectExplicitRevealTargets(section) {
  const targets = new Set();

  section.querySelectorAll(".reveal-stagger > .reveal").forEach((el) => {
    targets.add(el);
  });

  section.querySelectorAll(".reveal").forEach((el) => {
    if (el.classList.contains("reveal-stagger")) return;
    if (el.closest(".reveal-stagger")) return;

    const ancestorReveal = el.parentElement?.closest(".reveal:not(.reveal-stagger)");
    if (ancestorReveal) return;

    targets.add(el);
  });

  return targets;
}

export function collectRevealTargets(section) {
  const targets = collectExplicitRevealTargets(section);

  section.querySelectorAll(AUTO_TAG_SELECTORS).forEach((el) => {
    if (!section.contains(el)) return;
    if (shouldSkipAutoTag(el)) return;
    if (isInsideAnotherTarget(el, targets)) return;

    if (!el.classList.contains("reveal")) {
      el.classList.add("reveal", "reveal-fade");
      el.setAttribute("data-auto-reveal", "true");
    }

    targets.add(el);
  });

  return Array.from(targets).sort(compareDocumentOrder);
}

export function assignRevealIndices(targets) {
  targets.forEach((el, index) => {
    el.style.setProperty("--reveal-index", String(index));
  });
}

export function revealSection(section, targets) {
  section.classList.add("section-revealed");
  targets.forEach((el) => {
    el.classList.add("visible");
  });
}

export function resetSectionReveal(section) {
  section.classList.remove("section-revealed");

  section.querySelectorAll(".reveal").forEach((el) => {
    if (el.classList.contains("reveal-stagger")) return;
    el.classList.remove("visible");
    el.style.removeProperty("--reveal-index");
  });

  section.querySelectorAll("[data-auto-reveal]").forEach((el) => {
    el.classList.remove("reveal", "reveal-fade", "visible");
    el.removeAttribute("data-auto-reveal");
    el.style.removeProperty("--reveal-index");
  });
}

export function collectCascadeSections(root = document) {
  const sections = [];

  root.querySelectorAll("main > section").forEach((section) => {
    sections.push(section);
  });

  const footer = root.querySelector("footer.site-footer");
  if (footer) sections.push(footer);

  return sections;
}
