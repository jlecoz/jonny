"use client";

import { useEffect, useState } from "react";

export default function FlippableWorkCover({ item, children }) {
  const [flipped, setFlipped] = useState(false);
  const coverImageWidth = item.coverImageWidth || 440;
  const coverImageHeight = item.coverImageHeight || 440;
  const showBack = () => setFlipped(true);
  const handleCoverClick = (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (flipped && target?.closest("a, button")) return;

    showBack();
  };

  useEffect(() => {
    const resetFlip = () => setFlipped(false);

    window.addEventListener("works-cards-horizontal-scroll", resetFlip);
    return () => window.removeEventListener("works-cards-horizontal-scroll", resetFlip);
  }, []);

  if (!item?.coverImage) return null;

  return (
    <div
      className={`cv-work-card-cover cv-work-card-cover--flip ${flipped ? "is-flipped" : ""}`}
      onClick={handleCoverClick}
    >
      <button
        type="button"
        className="cv-work-card-flip-hotspot"
        aria-label={`Show ${item.title} details`}
        aria-pressed={flipped}
        onClick={showBack}
      >
        <span className="sr-only">Show details</span>
      </button>

      <div className="cv-work-card-cover-flip">
        <div
          className="cv-work-card-cover-face cv-work-card-cover-front"
          style={item.coverBackgroundColor ? { backgroundColor: item.coverBackgroundColor } : undefined}
        >
          <img
            className={`cv-work-card-cover-img${item.coverImageClassName ? ` ${item.coverImageClassName}` : ""}`}
            src={item.coverImage}
            alt={item.coverAlt || ""}
            loading="lazy"
            decoding="async"
            width={coverImageWidth}
            height={coverImageHeight}
          />
        </div>

        <div className="cv-work-card-cover-face cv-work-card-cover-back">
          {children}
        </div>
      </div>

      {item.documentationHref ? (
        <a
          className="cv-work-card-learn-more button button-gold"
          href={item.documentationHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(event) => event.stopPropagation()}
        >
          Learn more
        </a>
      ) : null}
    </div>
  );
}

