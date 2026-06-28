"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/components/usePrefersReducedMotion";

type FlashTone = "positive" | "negative" | null;

export function AnimatedNumber({
  value,
  format,
  className = "",
  flashBySign = false,
}: {
  value: number;
  format: (value: number) => string;
  className?: string;
  flashBySign?: boolean;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [displayValue, setDisplayValue] = useState(value);
  const [flashTone, setFlashTone] = useState<FlashTone>(null);
  const displayedValueRef = useRef(value);

  useEffect(() => {
    const startValue = displayedValueRef.current;
    if (startValue === value) return;

    let frameId = 0;
    let flashTimeout = 0;
    const duration = 400;

    const startAnimation = () => {
      if (prefersReducedMotion) {
        displayedValueRef.current = value;
        setDisplayValue(value);
        return;
      }

      if (flashBySign && value !== 0) {
        setFlashTone(value > 0 ? "positive" : "negative");
        flashTimeout = window.setTimeout(() => setFlashTone(null), duration);
      }

      const startTime = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const easedProgress = 1 - (1 - progress) ** 3;
        const nextValue = startValue + (value - startValue) * easedProgress;

        displayedValueRef.current = nextValue;
        setDisplayValue(nextValue);

        if (progress < 1) {
          frameId = window.requestAnimationFrame(tick);
        } else {
          displayedValueRef.current = value;
          setDisplayValue(value);
        }
      };

      frameId = window.requestAnimationFrame(tick);
    };

    const startFrame = window.requestAnimationFrame(startAnimation);
    return () => {
      window.cancelAnimationFrame(startFrame);
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(flashTimeout);
    };
  }, [flashBySign, prefersReducedMotion, value]);

  return (
    <span
      className={`metric-number ${
        flashTone ? `metric-number--flash-${flashTone}` : ""
      } ${className}`}
    >
      {format(displayValue)}
    </span>
  );
}
