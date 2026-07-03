"use client";

import { useEffect, useState } from "react";

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(reducedMotionQuery);
    const frame = window.requestAnimationFrame(() => setPrefersReducedMotion(mediaQuery.matches));
    const handleChange = (event: MediaQueryListEvent) => setPrefersReducedMotion(event.matches);

    mediaQuery.addEventListener("change", handleChange);
    return () => {
      window.cancelAnimationFrame(frame);
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return prefersReducedMotion;
}
