"use client";

import { useEffect } from "react";

/** Legacy path — preserve hash deep-links (e.g. /thinking#essay4) when redirecting to /writing */
export default function ThinkingRedirectPage() {
  useEffect(() => {
    const { search, hash } = window.location;
    window.location.replace(`/writing${search}${hash}`);
  }, []);

  return null;
}
