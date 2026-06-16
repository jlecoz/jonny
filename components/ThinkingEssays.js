"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import ScrollReveal from "@/components/ScrollReveal";
import { thinkingEssays } from "@/config/thinkingEssays";

function setEssayScrollLock(locked) {
  document.body.classList.toggle("thinking-essay-open", locked);
}

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
            className={`thinking-essay-figure${image.crop ? " thinking-essay-figure--crop" : ""}${image.fillHeight ? " thinking-essay-figure--fill" : ""}`}
          >
            {image.fillHeight ? (
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 680px) 100vw, 680px"
                className="thinking-essay-figure-fill-img"
              />
            ) : (
              <Image
                src={image.src}
                alt={image.alt}
                width={1200}
                height={900}
                sizes="(max-width: 680px) 100vw, 680px"
              />
            )}
          </div>
        ))}
      </figure>
    );
  }

  if (paragraph.quote) {
    return (
      <blockquote key={`quote-${index}`} className="thinking-essay-quote">
        <p>
          {paragraph.quote.parts.map((part, partIndex) =>
            typeof part === "string" ? (
              part
            ) : (
              <strong key={partIndex}>{part.strong}</strong>
            ),
          )}
        </p>
      </blockquote>
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
  const [overlayEl, setOverlayEl] = useState(null);
  const [openEssayId, setOpenEssayId] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const setOverlayRef = useCallback((node) => {
    overlayRef.current = node;
    setOverlayEl(node);
  }, []);

  const openEssay = useCallback((id) => {
    setOpenEssayId(id);
    setEssayScrollLock(true);
  }, []);

  const closeEssay = useCallback(() => {
    setOpenEssayId(null);
    setEssayScrollLock(false);
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }, []);

  useEffect(() => {
    const openFromHash = () => {
      const id = window.location.hash.replace(/^#/, "");
      if (id && thinkingEssays.some((essay) => essay.id === id)) {
        openEssay(id);
      }
    };

    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [openEssay]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") closeEssay();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeEssay]);

  useEffect(() => {
    return () => {
      setEssayScrollLock(false);
    };
  }, []);

  useEffect(() => {
    if (!openEssayId) return;
    overlayRef.current?.scrollTo(0, 0);
    setShowScrollTop(false);
  }, [openEssayId, overlayEl]);

  useEffect(() => {
    const overlay = overlayEl;
    if (!overlay || !openEssayId) {
      setShowScrollTop(false);
      return;
    }

    const onScroll = () => {
      setShowScrollTop(overlay.scrollTop > 200);
    };

    overlay.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => overlay.removeEventListener("scroll", onScroll);
  }, [openEssayId, overlayEl]);

  const scrollToTop = useCallback(() => {
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    overlayRef.current?.scrollTo({ top: 0, behavior });
  }, []);

  const activeEssay = thinkingEssays.find((essay) => essay.id === openEssayId);

  const essayOverlay =
    activeEssay ? (
      <div
        ref={setOverlayRef}
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
          title="Scroll to top"
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
            {(() => {
              const ledeItems = Array.isArray(activeEssay.lede)
                ? activeEssay.lede
                : [activeEssay.lede];

              return ledeItems.map((paragraph, index) => {
                if (paragraph?.images) {
                  return renderParagraph(paragraph, `lede-${index}`);
                }

                const ledeTextIndex = ledeItems
                  .slice(0, index)
                  .filter((item) => typeof item === "string").length;

                return (
                  <p key={index} className={ledeTextIndex === 0 ? "lede" : undefined}>
                    {paragraph}
                  </p>
                );
              });
            })()}
            {activeEssay.paragraphs.map((paragraph, index) => renderParagraph(paragraph, index))}
          </div>
          {activeEssay.linkedInArticleUrl ? (
            <p className="thinking-essay-body-link">
              <a href={activeEssay.linkedInArticleUrl} target="_blank" rel="noopener noreferrer">
                Read on LinkedIn
              </a>
            </p>
          ) : null}
          <div className="thinking-essay-body-byline">
            <span>Jonathan Le Coz</span>
            <span aria-hidden="true">·</span>
            <span>Experiential Designer</span>
          </div>
        </div>
      </div>
    ) : null;

  return (
    <>
      <section className="thinking-essays" aria-label="Essays">
        <div className="thinking-essays-divider" aria-hidden="true" />

        <ScrollReveal stagger>
          {thinkingEssays.map((essay) => (
            <article
              key={essay.id}
              className="thinking-essay-card reveal reveal-left"
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
        </ScrollReveal>
      </section>

      {essayOverlay && typeof document !== "undefined"
        ? createPortal(essayOverlay, document.body)
        : null}
    </>
  );
}
