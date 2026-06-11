"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { attachScrollAndResize } from "@/lib/scrollRoot";

export default function PitchPresenceImage({ src, alt = "", width, height }) {
  const rootRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.28, rootMargin: "0px 0px -12% 0px" },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const card = rootRef.current?.closest(".cv-pitch-card");
    if (!card) return undefined;

    card.classList.toggle("is-pitch-image-visible", isVisible);
    return () => card.classList.remove("is-pitch-image-visible");
  }, [isVisible]);

  useEffect(() => {
    const card = rootRef.current?.closest(".cv-pitch-card");
    const pitch = card?.closest("#pitch");
    if (!card || !pitch) return undefined;

    const desktopQuery = window.matchMedia("(min-width: 769px)");
    let raf = 0;

    const updateRevealState = () => {
      raf = 0;
      if (!desktopQuery.matches || reduceMotion) {
        card.classList.add("is-pitch-copy-revealed");
        return;
      }

      const pitchRect = pitch.getBoundingClientRect();
      const pitchMidpoint = pitchRect.top + pitchRect.height / 2;
      card.classList.toggle("is-pitch-copy-revealed", pitchMidpoint <= window.innerHeight / 2);
    };

    const schedule = () => {
      if (raf) return;
      raf = requestAnimationFrame(updateRevealState);
    };

    updateRevealState();
    const detachScrollResize = attachScrollAndResize(schedule);
    desktopQuery.addEventListener("change", schedule);

    return () => {
      detachScrollResize();
      desktopQuery.removeEventListener("change", schedule);
      cancelAnimationFrame(raf);
      card.classList.remove("is-pitch-copy-revealed");
    };
  }, [reduceMotion]);

  useEffect(() => {
    const card = rootRef.current?.closest(".cv-pitch-card");
    if (!card || !isVisible) return undefined;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 769px)");
    if (!canHover.matches) {
      card.classList.remove("is-pitch-image-open");
      return undefined;
    }

    const updateOpenState = (event) => {
      const rect = card.getBoundingClientRect();
      const isBottomHalf = event.clientY >= rect.top + rect.height / 2;
      card.classList.toggle("is-pitch-image-open", isBottomHalf);
    };

    const close = () => card.classList.remove("is-pitch-image-open");

    card.addEventListener("pointermove", updateOpenState);
    card.addEventListener("pointerleave", close);

    return () => {
      card.removeEventListener("pointermove", updateOpenState);
      card.removeEventListener("pointerleave", close);
      close();
    };
  }, [isVisible]);

  return (
    <span ref={rootRef} className="cv-pitch-image-presence">
      <AnimatePresence mode="wait">
        {isVisible ? (
          <motion.span
            key={src}
            className="cv-pitch-image-layer"
            initial={reduceMotion ? false : { clipPath: "inset(0 0 0 100%)", x: 72 }}
            animate={reduceMotion ? { opacity: 1 } : { clipPath: "inset(0 0 0 0%)", x: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { clipPath: "inset(0 0 0 100%)", x: 48 }}
            transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <Image src={src} alt={alt} width={width} height={height} loading="lazy" />
          </motion.span>
        ) : null}
      </AnimatePresence>
    </span>
  );
}
