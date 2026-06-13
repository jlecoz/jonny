"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { thinkingEssays } from "@/config/thinkingEssays";

function renderParagraph(paragraph, index) {
  if (typeof paragraph === "string") {
    return (
      <p key={paragraph.slice(0, 48)}>{paragraph}</p>
    );
  }

  if (paragraph.images) {
    return (
      <figure key={`images-${index}`} className="thinking-essay-figures">
        {paragraph.images.map((image) => (
          <div
            key={image.src}
            className={`thinking-essay-figure${image.crop ? " thinking-essay-figure--crop" : ""}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={1200}
              height={900}
              sizes="(max-width: 680px) 100vw, 680px"
            />
          </div>
        ))}
      </figure>
    );
  }

  return (
    <p key={`rich-${index}`}>
      {paragraph.parts.map((part, partIndex) =>
        typeof part === "string" ? (
          part
        ) : (
          <strong key={partIndex}>{part.strong}</strong>
        ),
      )}
    </p>
  );
}

export default function ThinkingEssays() {
  const overlayRef = useRef(null);
  const [openEssayId, setOpenEssayId] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const openEssay = useCallback((id) => {
    setOpenEssayId(id);
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);
  }, []);

  const closeEssay = useCallback(() => {
    setOpenEssayId(null);
    document.body.style.overflow = "";
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") closeEssay();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeEssay]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay || !openEssayId) {
      setShowScrollTop(false);
      return;
    }

    const onScroll = () => {
      setShowScrollTop(overlay.scrollTop > 400);
    };

    overlay.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => overlay.removeEventListener("scroll", onScroll);
  }, [openEssayId]);

  const scrollToTop = useCallback(() => {
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    overlayRef.current?.scrollTo({ top: 0, behavior });
  }, []);

  const activeEssay = thinkingEssays.find((essay) => essay.id === openEssayId);

  return (
    <>
      <section className="thinking-essays" aria-label="Essays">
        <div className="thinking-essays-divider" aria-hidden="true" />

        {thinkingEssays.map((essay) => (
          <article
            key={essay.id}
            className="thinking-essay-card"
            role="button"
            tabIndex={0}
            onClick={() => openEssay(essay.id)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openEssay(essay.id);
              }
            }}
          >
            <div>
              <div className="thinking-essay-meta">
                <span>{essay.category}</span>
                <span className="thinking-essay-meta-dot" aria-hidden="true" />
                <span>{essay.year}</span>
              </div>
              <h2 className="thinking-essay-title">{essay.title}</h2>
              <p className="thinking-essay-excerpt">{essay.excerpt}</p>
            </div>
            <span className="thinking-essay-arrow" aria-hidden="true">
              ↗
            </span>
          </article>
        ))}
      </section>

      {activeEssay ? (
        <div
          ref={overlayRef}
          className="thinking-essay-overlay open"
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${activeEssay.id}-title`}
        >
          <button type="button" className="thinking-essay-close" onClick={closeEssay}>
            ← Close
          </button>
          <button
            type="button"
            className={`thinking-essay-scroll-top${showScrollTop ? " visible" : ""}`}
            onClick={scrollToTop}
            aria-label="Scroll to top"
          >
            ↑
          </button>
          <div className="thinking-essay-body">
            <p className="thinking-essay-body-eyebrow">
              {activeEssay.category} · {activeEssay.year}
            </p>
            <h1 className="thinking-essay-body-title" id={`${activeEssay.id}-title`}>
              {activeEssay.title}
            </h1>
            <div className="thinking-essay-body-prose">
              <p className="lede">{activeEssay.lede}</p>
              {activeEssay.paragraphs.map((paragraph, index) => renderParagraph(paragraph, index))}
            </div>
            <div className="thinking-essay-body-byline">
              <span>Jonathan Le Coz</span>
              <span aria-hidden="true">·</span>
              <span>Experiential Designer</span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
