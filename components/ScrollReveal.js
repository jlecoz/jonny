/**
 * Structural wrapper for scroll-reveal targets.
 * Visibility is driven by MainBelowFoldReveal (section cascade) in layout.js.
 */
export default function ScrollReveal({ children, className = "", stagger = false }) {
  const wrapClass = stagger
    ? `reveal-stagger ${className}`.trim()
    : `reveal ${className}`.trim();

  return <div className={wrapClass}>{children}</div>;
}
