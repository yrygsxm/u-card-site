"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Trash2 } from "lucide-react";
import { BrandMark } from "@/components/BrandMark";
import { useComparison } from "@/components/ComparisonProvider";
import type { CryptoCard } from "@/lib/cards";

export function FloatingCompareBar({ cards }: { cards: CryptoCard[] }) {
  const pathname = usePathname();
  const { compareIds, notice, clearCompare } = useComparison();
  const selectedCards = compareIds
    .map((slug) => cards.find((card) => card.slug === slug))
    .filter((card): card is CryptoCard => Boolean(card));
  const compareHref = `/compare?cards=${selectedCards.map((card) => card.slug).join(",")}`;
  const active = selectedCards.length > 0;
  const shouldHide =
    pathname === "/" ||
    pathname === "/cards" ||
    pathname === "/about" ||
    pathname === "/rankings" ||
    pathname?.startsWith("/guides") ||
    pathname?.startsWith("/compare");

  if (shouldHide) return null;

  return (
    <aside
      aria-hidden={!active}
      className={`fixed inset-x-0 bottom-0 z-50 h-16 border-t border-slate-200 bg-[var(--background)] shadow-[0_-8px_24px_rgba(15,23,42,0.12)] transition-[transform,opacity] duration-200 motion-reduce:transition-none ${
        active ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      }`}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto py-2">
          {selectedCards.map((card) => (
            <div key={card.slug} className="flex shrink-0 items-center gap-2 rounded-lg bg-slate-100 py-1 pl-1 pr-2">
              <BrandMark cardName={card.cardName} brandLogo={card.brandLogo} officialWebsite={card.officialWebsite} size="compact" />
              <span className="max-w-28 truncate text-xs font-medium text-slate-950 sm:max-w-40">{card.cardName}</span>
            </div>
          ))}
          <span className="sr-only" aria-live="polite">
            {notice}
          </span>
          {notice ? <span className="hidden shrink-0 text-xs font-medium text-amber-700 sm:inline">{notice}</span> : null}
        </div>
        <Link
          href={compareHref}
          className="inline-flex h-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 px-3 text-sm font-semibold text-white transition hover:bg-blue-700 sm:px-4"
        >
          开始对比
        </Link>
        <button
          type="button"
          onClick={clearCompare}
          aria-label="清空对比"
          title="清空"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-100 hover:text-rose-600"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </aside>
  );
}
