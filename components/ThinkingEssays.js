"use client";

import { useCallback, useEffect, useState } from "react";
import { thinkingEssays } from "@/config/thinkingEssays";

export default function ThinkingEssays() {
  const [openEssayId, setOpenEssayId] = useState(null);

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
        <div className="thinking-essay-overlay open" role="dialog" aria-modal="true" aria-labelledby={`${activeEssay.id}-title`}>
          <button type="button" className="thinking-essay-close" onClick={closeEssay}>
            ← Close
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
              {activeEssay.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
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
