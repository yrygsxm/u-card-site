"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { MAX_COMPARE_CARDS, useComparison } from "@/components/ComparisonProvider";

export function CardCompareButton({
  slug,
  cardName,
}: {
  slug: string;
  cardName: string;
}) {
  const router = useRouter();
  const { compareIds, hydrated, replaceCompare } = useComparison();

  const nextCompareIds = useMemo(() => {
    if (compareIds.includes(slug)) return compareIds;
    if (compareIds.length >= MAX_COMPARE_CARDS) return [...compareIds.slice(0, MAX_COMPARE_CARDS - 1), slug];
    return [...compareIds, slug];
  }, [compareIds, slug]);

  const handleClick = () => {
    if (!hydrated) return;

    replaceCompare(nextCompareIds);
    router.push(`/compare?cards=${nextCompareIds.map(encodeURIComponent).join(",")}`);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={!hydrated}
      aria-label={`将 ${cardName} 加入横向对比`}
      className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
    >
      加入对比
      <ArrowRight className="h-4 w-4" />
    </button>
  );
}
