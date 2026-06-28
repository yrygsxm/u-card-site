"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

const STORAGE_KEY = "ucard-compare";
export const MAX_COMPARE_CARDS = 4;

type ComparisonContextValue = {
  compareIds: string[];
  hydrated: boolean;
  notice: string | null;
  toggleCompare: (slug: string) => void;
  clearCompare: () => void;
  replaceCompare: (slugs: string[]) => void;
};

const ComparisonContext = createContext<ComparisonContextValue | null>(null);

export function ComparisonProvider({ children }: { children: React.ReactNode }) {
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const noticeTimerRef = useRef<number | null>(null);

  const showNotice = useCallback((message: string) => {
    setNotice(message);
    if (noticeTimerRef.current) window.clearTimeout(noticeTimerRef.current);
    noticeTimerRef.current = window.setTimeout(() => setNotice(null), 2200);
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored) as unknown;
          if (Array.isArray(parsed)) {
            setCompareIds([...new Set(parsed.filter((slug): slug is string => typeof slug === "string"))].slice(0, MAX_COMPARE_CARDS));
          }
        } catch {
          window.localStorage.removeItem(STORAGE_KEY);
        }
      }
      setHydrated(true);
    });

    return () => {
      window.cancelAnimationFrame(frame);
      if (noticeTimerRef.current) window.clearTimeout(noticeTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(compareIds));
  }, [compareIds, hydrated]);

  const toggleCompare = useCallback(
    (slug: string) => {
      setCompareIds((current) => {
        if (current.includes(slug)) return current.filter((item) => item !== slug);
        if (current.length >= MAX_COMPARE_CARDS) {
          showNotice(`最多对比 ${MAX_COMPARE_CARDS} 张`);
          return current;
        }
        return [...current, slug];
      });
    },
    [showNotice],
  );

  const clearCompare = useCallback(() => setCompareIds([]), []);
  const replaceCompare = useCallback(
    (slugs: string[]) => setCompareIds([...new Set(slugs.filter(Boolean))].slice(0, MAX_COMPARE_CARDS)),
    [],
  );

  const value = useMemo(
    () => ({ compareIds, hydrated, notice, toggleCompare, clearCompare, replaceCompare }),
    [clearCompare, compareIds, hydrated, notice, replaceCompare, toggleCompare],
  );

  return <ComparisonContext.Provider value={value}>{children}</ComparisonContext.Provider>;
}

export function useComparison() {
  const context = useContext(ComparisonContext);
  if (!context) throw new Error("useComparison must be used inside ComparisonProvider");
  return context;
}
