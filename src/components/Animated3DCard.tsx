"use client";

import { useEffect, useRef, type MouseEvent as ReactMouseEvent, type PointerEvent, type ReactNode } from "react";

/**
 * Pointer-driven 3D tilt and glare inspired by jamipuchi/animated-3d-card.
 * Source project: https://github.com/jamipuchi/animated-3d-card (MIT License).
 *
 * The original package only declares React 16-18 peer support, so this is a
 * small React 19-compatible implementation that preserves the same interaction
 * model without introducing an incompatible legacy dependency.
 */
export function Animated3DCard({ children }: { children: ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLSpanElement>(null);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => {
      reducedMotionRef.current = query.matches;
    };

    updatePreference();
    query.addEventListener("change", updatePreference);
    return () => query.removeEventListener("change", updatePreference);
  }, []);

  const resetCard = () => {
    const card = cardRef.current;
    const shine = shineRef.current;
    if (!card || reducedMotionRef.current) return;

    card.style.transition = "transform 260ms cubic-bezier(0.16, 1, 0.3, 1)";
    card.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    if (shine) shine.style.opacity = "0";
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement> | ReactMouseEvent<HTMLDivElement>) => {
    if (("pointerType" in event && event.pointerType === "touch") || reducedMotionRef.current) return;

    const card = cardRef.current;
    const shine = shineRef.current;
    if (!card) return;

    const bounds = card.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width));
    const y = Math.min(1, Math.max(0, (event.clientY - bounds.top) / bounds.height));
    const rotateX = (0.5 - y) * 9;
    const rotateY = (x - 0.5) * 11;

    card.style.transition = "transform 90ms ease-out";
    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.025, 1.025, 1.025)`;
    if (shine) {
      shine.style.opacity = "1";
      shine.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255, 255, 255, 0.38), rgba(255, 255, 255, 0.08) 28%, transparent 62%)`;
    }
  };

  return (
    <div
      data-testid="animated-3d-card"
      className="relative p-3"
      onPointerMove={handlePointerMove}
      onMouseMove={handlePointerMove}
      onPointerLeave={resetCard}
    >
      <div ref={cardRef} className="relative transform-gpu" style={{ transformStyle: "preserve-3d" }}>
        <div style={{ transform: "translateZ(18px)" }}>{children}</div>
        <span
          ref={shineRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 rounded-2xl opacity-0 transition-opacity duration-150 motion-reduce:hidden"
          style={{ transform: "translateZ(30px)" }}
        />
      </div>
    </div>
  );
}
