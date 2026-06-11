"use client";

import { useId, useMemo, useRef, useState } from "react";

export default function ShowMoreBullets({ bullets, initiallyVisibleCount = 1, className = "cv-bullets-timeline" }) {
  const controlsId = useId();
  const moreRef = useRef(null);
  const [expanded, setExpanded] = useState(false);

  const safeVisibleCount = Math.max(0, Math.min(initiallyVisibleCount, bullets?.length ?? 0));

  const { primary, extra } = useMemo(() => {
    const list = Array.isArray(bullets) ? bullets : [];
    return {
      primary: list.slice(0, safeVisibleCount),
      extra: list.slice(safeVisibleCount),
    };
  }, [bullets, safeVisibleCount]);

  if (!bullets?.length) return null;

  return (
    <div className="cv-bullets-accordion">
      <ul className={className}>
        {primary.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>

      {extra.length ? (
        <>
          <div
            id={controlsId}
            className={`cv-bullets-more ${expanded ? "open" : ""}`}
            aria-hidden={!expanded}
            style={{ maxHeight: expanded ? `${moreRef.current?.scrollHeight ?? 0}px` : "0px" }}
          >
            <div ref={moreRef}>
              <ul className={className}>
                {extra.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          </div>

          <button
            className="cv-bullets-toggle"
            type="button"
            aria-expanded={expanded}
            aria-controls={controlsId}
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? "Show less" : "Show more"}
          </button>
        </>
      ) : null}
    </div>
  );
}

