"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { usePrefersReducedMotion } from "@/components/usePrefersReducedMotion";

type TransitionPhase = "idle" | "entering" | "exiting";

export function RouteTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [phase, setPhase] = useState<TransitionPhase>("idle");
  const routeKey = pathname;
  const previousRouteKeyRef = useRef(routeKey);
  const navigationTimerRef = useRef<number | null>(null);
  const isNavigatingRef = useRef(false);

  useEffect(() => {
    if (previousRouteKeyRef.current === routeKey) return;

    previousRouteKeyRef.current = routeKey;
    isNavigatingRef.current = false;

    if (prefersReducedMotion) {
      const frame = window.requestAnimationFrame(() => setPhase("idle"));
      return () => window.cancelAnimationFrame(frame);
    }

    let timer: number | null = null;
    const frame = window.requestAnimationFrame(() => {
      setPhase("entering");
      timer = window.setTimeout(() => setPhase("idle"), 200);
    });
    return () => {
      window.cancelAnimationFrame(frame);
      if (timer !== null) window.clearTimeout(timer);
    };
  }, [prefersReducedMotion, routeKey]);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        isNavigatingRef.current
      ) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a[href]");
      if (
        !anchor ||
        anchor.getAttribute("target") === "_blank" ||
        anchor.hasAttribute("download") ||
        anchor.getAttribute("data-no-route-transition") !== null
      ) {
        return;
      }

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#")) return;

      const destination = new URL(href, window.location.href);
      if (destination.origin !== window.location.origin) return;
      if (destination.pathname === window.location.pathname) return;

      event.preventDefault();
      event.stopPropagation();
      isNavigatingRef.current = true;

      const navigate = () => router.push(`${destination.pathname}${destination.search}${destination.hash}`);
      if (prefersReducedMotion) {
        navigate();
        return;
      }

      setPhase("exiting");
      navigationTimerRef.current = window.setTimeout(navigate, 150);
    };

    document.addEventListener("click", handleDocumentClick, true);
    return () => {
      document.removeEventListener("click", handleDocumentClick, true);
      if (navigationTimerRef.current !== null) window.clearTimeout(navigationTimerRef.current);
    };
  }, [prefersReducedMotion, router]);

  return (
    <div
      className={`route-transition flex-1 ${
        phase === "exiting" ? "route-transition--exiting" : phase === "entering" ? "route-transition--entering" : ""
      }`}
      aria-busy={phase === "exiting"}
    >
      {children}
    </div>
  );
}
