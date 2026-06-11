"use client";

import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { buildSegment } from "@/components/scrambleText";

export default function HeroGoldScramble({ text, className = "gold" }) {
  const reduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [tick, setTick] = useState(0);
  const shouldDecrypt = reduceMotion !== true;

  useEffect(() => {
    if (!shouldDecrypt) return undefined;

    let raf = 0;
    const duration = 1150;
    const startDelay = 180;
    let start = 0;

    const run = (time) => {
      if (!start) start = time + startDelay;
      const elapsed = Math.max(0, time - start);
      const nextProgress = Math.min(1, elapsed / duration);

      setProgress(nextProgress);
      setTick(Math.floor(time / 42));

      if (nextProgress < 1) {
        raf = requestAnimationFrame(run);
      }
    };

    raf = requestAnimationFrame(run);
    return () => cancelAnimationFrame(raf);
  }, [shouldDecrypt]);

  const displayText = useMemo(() => {
    if (!shouldDecrypt) return text;
    const eased = 1 - Math.pow(1 - progress, 3);
    const cutoff = Math.min(text.length, Math.ceil(eased * text.length));
    return buildSegment(text, 0, cutoff, tick);
  }, [progress, shouldDecrypt, text, tick]);

  return (
    <span className={`${className} hero-gold-decrypt`} aria-label={text}>
      {displayText}
    </span>
  );
}
