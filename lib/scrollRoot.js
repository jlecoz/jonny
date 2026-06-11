/**
 * When `.parallax-container` wraps the page (CSS perspective parallax), scroll happens on
 * that element; with `prefers-reduced-motion` flattened layout it may scroll on `window`.
 * Listening to both avoids missing updates when either is the scroll root.
 */
export function attachScrollAndResize(schedule, scrollOptions = { passive: true }) {
  if (typeof document === "undefined") return () => {};

  const pc = document.querySelector(".parallax-container");

  if (pc) pc.addEventListener("scroll", schedule, scrollOptions);
  window.addEventListener("scroll", schedule, scrollOptions);
  window.addEventListener("resize", schedule);

  return () => {
    if (pc) pc.removeEventListener("scroll", schedule);
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
  };
}
