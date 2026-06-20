"use client";

import { useEffect } from "react";
import { initHomeScrollReveal } from "@/lib/homeScrollReveal";

/** Home-page scroll reveal — mounted after all sections so every target exists in the DOM. */
export default function HomeScrollReveal() {
  useEffect(() => initHomeScrollReveal(), []);
  return null;
}
