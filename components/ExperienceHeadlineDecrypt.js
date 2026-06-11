"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { buildSegment } from "@/components/scrambleText";
import { attachScrollAndResize } from "@/lib/scrollRoot";

const DEFAULT_BEFORE = "Design leadership across ";
const DEFAULT_GOLD = "product and platform.";

const clamp01 = (value) => Math.min(1, Math.max(0, value));

/**
 * Headline/label renderer.
 * Two modes:
 * - `text` — single block (e.g. intro paragraph), no gold span
 * - `before` + `gold` — headline with trailing gold span
 *
 * Optional:
 * - `decrypt` — scroll-linked decrypt/scramble reveal (recommended for short labels)
 */
export default function ExperienceHeadlineDecrypt({
  text,
  before: beforeProp = DEFAULT_BEFORE,
  gold: goldProp = DEFAULT_GOLD,
  as: Tag = "h2",
  className = "section-headline",
  decrypt = false,
}) {
  const elRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const singleMode = text != null && text !== "";
  const full = singleMode ? text : beforeProp + goldProp;

  const shouldDecrypt = decrypt === true && singleMode && reduceMotion !== true;
  const [progress, setProgress] = useState(shouldDecrypt ? 0 : 1);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!shouldDecrypt) {
      setProgress(1);
      return undefined;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const el = elRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const start = window.innerHeight * 0.92;
      const end = window.innerHeight * 0.3;
      setProgress(clamp01((start - rect.top) / (start - end)));
    };

    const schedule = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    schedule();
    const detach = attachScrollAndResize(schedule);

    return () => {
      detach();
      cancelAnimationFrame(raf);
    };
  }, [shouldDecrypt]);

  useEffect(() => {
    if (!shouldDecrypt || progress >= 0.999) return undefined;
    let raf;
    const loop = (t) => {
      setTick(Math.floor(t / 45));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [shouldDecrypt, progress]);

  const decryptedText = useMemo(() => {
    if (!shouldDecrypt) return text;
    const total = text.length;
    const cutoff = Math.min(total, Math.ceil(progress * total));
    return buildSegment(text, 0, cutoff, tick);
  }, [shouldDecrypt, text, progress, tick]);

  if (singleMode) {
    return (
      <Tag ref={elRef} className={className} aria-label={full} style={{ position: "relative" }}>
        {decryptedText}
      </Tag>
    );
  }

  return (
    <Tag ref={elRef} className={className} aria-label={full} style={{ position: "relative" }}>
      {beforeProp}
      <span className="gold">{goldProp}</span>
    </Tag>
  );
}
