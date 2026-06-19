"use client";

import { useCallback, useState } from "react";
import FlippableWorkCover from "@/components/FlippableWorkCover";

export default function WorkSplitCard({ item, className, children }) {
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
    >
      <FlippableWorkCover item={item} flipped={flipped}>
        {children}
      </FlippableWorkCover>
    </article>
  );
}
