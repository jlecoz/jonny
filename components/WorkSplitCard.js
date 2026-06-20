"use client";

import { useCallback, useState } from "react";
import FlippableWorkCover from "@/components/FlippableWorkCover";

export default function WorkSplitCard({ item, className, children, ...rest }) {
  const [flipped, setFlipped] = useState(false);

  const handlePointerEnter = useCallback(() => {
    setFlipped(true);
  }, []);

  const handlePointerLeave = useCallback(() => {
    setFlipped(false);
  }, []);

  return (
    <article
      className={className}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      {...rest}
    >
      <div className="cv-work-card-reveal" data-reveal>
        <FlippableWorkCover item={item} flipped={flipped}>
          {children}
        </FlippableWorkCover>
      </div>
    </article>
  );
}
