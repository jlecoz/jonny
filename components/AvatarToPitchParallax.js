"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { attachScrollAndResize } from "@/lib/scrollRoot";

const clamp01 = gsap.utils.clamp(0, 1);
const smoothstep = (value) => value * value * (3 - 2 * value);
const lerp = gsap.utils.interpolate;

export default function AvatarToPitchParallax() {
  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const avatar = document.querySelector("#overview .hero-cv-avatar-img");
    const avatarShell = document.querySelector("#overview .hero-avatar-flip");
    const overview = document.querySelector("#overview");
    const pitch = document.querySelector("#pitch");
    const target = document.querySelector("#pitch .cv-pitch-avatar-target");
    const flight = document.querySelector(".hero-cv-avatar-flight");
    const heroCopy = document.querySelectorAll(
      "#overview .hero-content > :not(.hero-cv-avatar)"
    );
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!avatar || !avatarShell || !overview || !pitch || !target || !flight) return undefined;

    if (reduceMotion) {
      target.classList.add("is-settled");
      flight.style.display = "none";
      return undefined;
    }

    let raf = 0;
    let sourceBox = null;

    const clearFlight = () => {
      gsap.set(flight, { display: "none", opacity: 0 });
    };

    const resetHeroCopy = () => {
      gsap.set(heroCopy, { clearProps: "opacity,transform" });
    };

    const fadeHeroCopy = (progress) => {
      const fade = clamp01(progress / 0.55);
      gsap.set(heroCopy, { opacity: 1 - fade, y: fade * -18 });
    };

    const run = () => {
      raf = 0;

      const vh = window.innerHeight || 1;
      const overviewRect = overview.getBoundingClientRect();
      const pitchRect = pitch.getBoundingClientRect();
      const transitionStart = clamp01(-overviewRect.top / (overviewRect.height * 0.36));
      const pitchArrival = clamp01((vh * 0.94 - pitchRect.top) / (vh * 1.08));
      const rawProgress = Math.max(transitionStart * 0.18, pitchArrival);
      const progress = smoothstep(rawProgress);

      if (rawProgress <= 0.001) {
        clearFlight();
        target.classList.remove("is-settled");
        gsap.set(avatar, { clearProps: "opacity" });
        gsap.set(avatarShell, { clearProps: "opacity" });
        resetHeroCopy();
        sourceBox = null;
        return;
      }

      if (rawProgress >= 0.999) {
        clearFlight();
        target.classList.add("is-settled");
        gsap.set(avatar, { opacity: 0 });
        gsap.set(avatarShell, { opacity: 0 });
        fadeHeroCopy(1);
        return;
      }

      const sourceRect = avatar.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      if (!sourceRect.width || !sourceRect.height || !targetRect.width || !targetRect.height) return;

      if (!sourceBox) {
        const pinnedSize = Math.min(
          Math.max(sourceRect.width, Math.min(window.innerWidth, vh) * 0.24),
          Math.min(window.innerWidth, vh) * 0.36
        );
        sourceBox = {
          left: window.innerWidth / 2 - pinnedSize / 2,
          top: vh * 0.35 - pinnedSize / 2,
          width: pinnedSize,
          height: pinnedSize,
        };
      }

      target.classList.remove("is-settled");
      gsap.set(avatar, { opacity: 0 });
      gsap.set(avatarShell, { opacity: Math.max(0, 1 - progress * 1.3) });
      fadeHeroCopy(progress);

      const settle = smoothstep(clamp01((rawProgress - 0.84) / 0.16));
      const float = smoothstep(clamp01(rawProgress / 0.84));
      const flip = smoothstep(clamp01((rawProgress - 0.18) / 0.62));
      const targetTop = Math.min(targetRect.top, vh - targetRect.height - 32);
      const left = lerp(sourceBox.left, targetRect.left, settle);
      const pinnedFloatY = Math.sin(float * Math.PI * 1.15) * -18;
      const top = lerp(sourceBox.top + pinnedFloatY, targetTop, settle);
      const width = lerp(sourceBox.width, targetRect.width, settle);
      const height = lerp(sourceBox.height, targetRect.height, settle);
      const rotateX = Math.sin(flip * Math.PI) * 5;
      const rotateY = Math.sin(flip * Math.PI) * -8 + Math.sin(settle * Math.PI) * -10;
      const zLift = Math.sin(flip * Math.PI) * 88 + Math.sin(settle * Math.PI) * 42;

      gsap.set(flight, {
        display: "block",
        opacity: 1,
        left,
        top,
        width,
        height,
        transform: `perspective(900px) translate3d(0, 0, ${zLift}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      });
    };

    const schedule = () => {
      if (raf) return;
      raf = requestAnimationFrame(run);
    };

    schedule();
    const detach = attachScrollAndResize(schedule);

    return () => {
      detach();
      cancelAnimationFrame(raf);
      clearFlight();
      target.classList.remove("is-settled");
      gsap.set(avatar, { clearProps: "opacity" });
      gsap.set(avatarShell, { clearProps: "opacity" });
      resetHeroCopy();
    };
  }, []);

  return (
    <img
      className="hero-cv-avatar-flight"
      src="/img/pitch-jonathan-harvest.webp"
      alt=""
      aria-hidden="true"
      decoding="async"
    />
  );
}
