"use client";

import { useEffect, useRef } from "react";

export default function ScrollReveal({ children, className = "", stagger = false }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = stagger
      ? el.querySelectorAll(".reveal")
      : [el];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [stagger]);

  const wrapClass = stagger
    ? `reveal-stagger ${className}`.trim()
    : `reveal ${className}`.trim();

  return (
    <div ref={ref} className={wrapClass}>
      {children}
    </div>
  );
}
