"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUpRight,
  Check,
  Copy,
  ExternalLink,
  Search,
  SlidersHorizontal,
  Star,
  X,
} from "lucide-react";
import type { CryptoCard } from "@/lib/cards";
import { quickFilters, sortOptions } from "@/lib/cards";
import { Badge } from "@/components/Badge";
import { CardApplicationDialog, DEFAULT_INVITE_CODE } from "@/components/CardApplicationDialog";
import { CardVisual } from "@/components/CardVisual";
import { copyText } from "@/lib/clipboard";

function supportMatches(value: string) {
  return value === "yes" || value === "partial";
}

function matchesFilter(card: CryptoCard, filter: string) {
  if (filter === "mainland") return card.mainlandChinaPassportSupport !== "no";
  if (filter === "japan") return card.japanResidenceCardSupport !== "no" || card.supportedRegions.some((region) => region.includes("日本"));
  if (filter === "hongkong") return card.hongKongIdSupport !== "no" || card.supportedRegions.some((region) => region.includes("香港"));
  if (filter === "europe") return card.supportedRegions.some((region) => region.includes("欧洲") || region.includes("英国"));
  if (filter === "apple-pay") return supportMatches(card.applePaySupported);
  if (filter === "google-pay") return supportMatches(card.googlePaySupported);
  if (filter === "physical") return card.physicalCardSupported;
  if (filter === "virtual") return card.virtualCardSupported;
  if (filter === "usdt") return card.supportedStablecoins.includes("USDT") || card.supportedCurrencies.includes("USDT");
  if (filter === "usdc") return card.supportedStablecoins.includes("USDC") || card.supportedCurrencies.includes("USDC");
  if (filter === "cashback") return card.scoreBreakdown.cashback.score >= 11 || card.feeModel.cashbackRatePct >= 1.5;
  if (filter === "low-fee") return card.scoreBreakdown.cost.score >= 19;
  if (filter === "atm") return card.physicalCardSupported && !card.atmWithdrawalFee.includes("不支持");
  if (filter === "daily") return card.scenarios.includes("日常消费");
  if (filter === "travel") return card.scenarios.includes("旅行") || card.scenarios.includes("跨境支付");
  return true;
}

function sortCards(list: CryptoCard[], sort: string) {
  const copy = [...list];
  if (sort === "cashback") return copy.sort((a, b) => b.scoreBreakdown.cashback.score - a.scoreBreakdown.cashback.score);
  if (sort === "low-fee") return copy.sort((a, b) => b.scoreBreakdown.cost.score - a.scoreBreakdown.cost.score);
  if (sort === "easy") {
    return copy.sort((a, b) => {
      const score = (card: CryptoCard) =>
        (card.proofOfAddressRequired === "no" ? 8 : card.proofOfAddressRequired === "partial" ? 4 : 0) +
        card.scoreBreakdown.availability.score;
      return score(b) - score(a);
    });
  }
  if (sort === "beginner") {
    return copy.sort((a, b) => {
      const score = (card: CryptoCard) =>
        card.scoreBreakdown.experience.score + card.scoreBreakdown.transparency.score + card.scoreBreakdown.risk.score;
      return score(b) - score(a);
    });
  }
  if (sort === "japan") {
    return copy.sort((a, b) => {
      const score = (card: CryptoCard) =>
        (card.japanResidenceCardSupport === "yes" ? 20 : card.japanResidenceCardSupport === "partial" ? 10 : 0) +
        (card.applePaySupported !== "no" ? 5 : 0) +
        card.overallScore;
      return score(b) - score(a);
    });
  }
  if (sort === "regions") return copy.sort((a, b) => b.supportedRegions.length - a.supportedRegions.length);
  if (sort === "updated") return copy.sort((a, b) => b.lastUpdated.localeCompare(a.lastUpdated));
  return copy.sort((a, b) => b.overallScore - a.overallScore);
}

function featuredBenefits(card: CryptoCard) {
  const cashbackRate = card.cashbackRate.match(/(?:最高约?|基础)\s*([\d.]+%(?:-[\d.]+%)?)/)?.[1];
  const cashbackLabel = cashbackRate
    ? card.cashbackRate.includes("基础")
      ? `${cashbackRate} 起返现`
      : `最高 ${cashbackRate} 返现`
    : card.feeModel.cashbackRatePct > 0
      ? "返现活动"
      : "稳定币消费";
  const benefits = [
    cashbackLabel,
    card.applePaySupported === "yes" || card.applePaySupported === "partial" ? "Apple Pay" : null,
    card.virtualCardSupported ? "虚拟卡" : null,
    card.physicalCardSupported ? "实体卡" : null,
    card.supportedStablecoins.includes("USDT") ? "USDT 可用" : null,
  ].filter((benefit): benefit is string => Boolean(benefit));

  return [...new Set(benefits)].slice(0, 2);
}

export function CardExplorer({
  cards,
  compact = false,
}: {
  cards: CryptoCard[];
  compact?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sort, setSort] = useState("recommended");
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [applicationCard, setApplicationCard] = useState<CryptoCard | null>(null);
  const [copiedInviteSlug, setCopiedInviteSlug] = useState<string | null>(null);
  const storageReadyRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    window.requestAnimationFrame(() => {
      if (cancelled) return;
      const storedCompare = window.localStorage.getItem("ucard-compare");
      const storedFavorites = window.localStorage.getItem("ucard-favorites");
      if (storedCompare) setCompareIds(JSON.parse(storedCompare) as string[]);
      if (storedFavorites) setFavoriteIds(JSON.parse(storedFavorites) as string[]);
      storageReadyRef.current = true;
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!storageReadyRef.current) return;
    window.localStorage.setItem("ucard-compare", JSON.stringify(compareIds));
  }, [compareIds]);

  useEffect(() => {
    if (!storageReadyRef.current) return;
    window.localStorage.setItem("ucard-favorites", JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  const filteredCards = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const searched = cards.filter((card) => {
      const haystack = [
        card.cardName,
        card.summary,
        card.supportedRegions.join(" "),
        card.supportedStablecoins.join(" "),
        card.tags.join(" "),
        card.scenarios.join(" "),
      ]
        .join(" ")
        .toLowerCase();
      return !normalizedQuery || haystack.includes(normalizedQuery);
    });
    const filtered = searched.filter((card) => activeFilters.every((filter) => matchesFilter(card, filter)));
    return sortCards(filtered, sort);
  }, [activeFilters, cards, query, sort]);

  const toggleFilter = (id: string) => {
    setActiveFilters((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  const toggleCompare = (slug: string) => {
    setCompareIds((current) => {
      if (current.includes(slug)) return current.filter((item) => item !== slug);
      if (current.length >= 5) return current;
      return [...current, slug];
    });
  };

  const toggleFavorite = (slug: string) => {
    setFavoriteIds((current) =>
      current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug],
    );
  };

  const compareHref = `/compare?cards=${compareIds.join(",")}`;
  const displayCards = compact ? cards : filteredCards;

  const copyInviteCode = async (slug: string) => {
    if (await copyText(DEFAULT_INVITE_CODE)) {
      setCopiedInviteSlug(slug);
      window.setTimeout(() => {
        setCopiedInviteSlug((current) => (current === slug ? null : current));
      }, 1800);
    } else {
      setCopiedInviteSlug(null);
    }
  };

  return (
    <div className="space-y-6">
      {!compact && (
        <>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-950/5 sm:p-5">
            <div className="grid gap-3 lg:grid-cols-[1fr_220px]">
              <label className="relative block">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="搜索卡片、地区、币种、Apple Pay、USDT..."
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm outline-none ring-0 transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </label>
              <label className="relative block">
                <SlidersHorizontal className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <select
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                  className="h-12 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-12 pr-4 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
                >
                  {sortOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {quickFilters.map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => toggleFilter(filter.id)}
                  className={`rounded-full border px-3 py-2 text-sm font-medium transition ${
                    activeFilters.includes(filter.id)
                      ? "border-slate-950 bg-slate-950 text-white"
                      : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-sm font-semibold text-slate-900">找到 {filteredCards.length} 张卡</div>
              <div className="text-xs text-slate-500">示例数据用于产品结构演示，上线前需逐项复核官方条款。</div>
            </div>
            {activeFilters.length > 0 && (
              <button
                type="button"
                onClick={() => setActiveFilters([])}
                className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                <X className="h-4 w-4" />
                清空筛选
              </button>
            )}
          </div>
        </>
      )}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {displayCards.map((card) => {
          const inCompare = compareIds.includes(card.slug);
          const favorite = favoriteIds.includes(card.slug);
          const benefits = featuredBenefits(card);

          return (
            <article
              key={card.slug}
              className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-950/5 transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-950/10 sm:p-5"
            >
              <CardVisual card={card} compact />

              <div className="mt-4 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="truncate text-xl font-semibold text-slate-950">{card.cardName}</h3>
                  <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-600">{card.oneLine}</p>
                </div>
                <div className="rounded-xl bg-slate-950 px-2.5 py-2 text-center text-white">
                  <div className="font-mono text-lg font-semibold">{card.overallScore}</div>
                  <div className="text-[10px] uppercase text-white/60">Score</div>
                </div>
              </div>

              <div className="mt-4 flex flex-nowrap gap-2 overflow-hidden">
                {benefits.map((benefit, index) => (
                  <Badge key={benefit} tone={index === 0 ? "positive" : "info"} className={`shrink-0 whitespace-nowrap ${index === 0 ? "font-semibold" : ""}`}>
                    {benefit}
                  </Badge>
                ))}
                {card.riskTags.slice(0, 1).map((tag) => (
                  <Badge key={tag} tone="warning" className="shrink-0 whitespace-nowrap">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="mt-auto pt-5">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2">
                  <button
                    type="button"
                    onClick={() => copyInviteCode(card.slug)}
                    className="flex min-h-12 min-w-0 items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 text-left transition hover:border-slate-300 hover:bg-white focus:outline-none focus:ring-4 focus:ring-slate-100"
                    aria-label={`复制 ${card.cardName} 邀请码 ${DEFAULT_INVITE_CODE}`}
                  >
                    <span className="min-w-0">
                      <span className="block text-[10px] font-medium uppercase tracking-[0.1em] text-slate-500">邀请码</span>
                      <span className="block truncate font-mono text-base font-bold tracking-[0.12em] text-slate-950">{DEFAULT_INVITE_CODE}</span>
                    </span>
                    {copiedInviteSlug === card.slug ? <Check className="h-4 w-4 shrink-0 text-emerald-600" /> : <Copy className="h-4 w-4 shrink-0 text-slate-500" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => setApplicationCard(card)}
                    className="inline-flex min-h-12 items-center justify-center gap-1.5 rounded-xl bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-emerald-500 hover:text-slate-950 focus:outline-none focus:ring-4 focus:ring-slate-300"
                  >
                    立即申请
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <Link
                    href={`/cards/${card.slug}`}
                    className="inline-flex items-center justify-center rounded-lg px-2 py-1 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
                  >
                    查看详情
                  </Link>
                  <button
                    type="button"
                    onClick={() => toggleCompare(card.slug)}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-sm font-medium ${
                      inCompare
                        ? "bg-emerald-50 text-emerald-700"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                    }`}
                  >
                    {inCompare ? <Check className="h-4 w-4" /> : null}
                    {inCompare ? "已加入" : "加入对比"}
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleFavorite(card.slug)}
                    aria-label={favorite ? "取消收藏" : "收藏"}
                    title={favorite ? "取消收藏" : "收藏"}
                    className={`inline-flex h-8 w-8 items-center justify-center rounded-lg ${
                      favorite
                        ? "bg-amber-50 text-amber-600"
                        : "text-slate-500 hover:bg-slate-100"
                    }`}
                  >
                    <Star className="h-4 w-4" fill={favorite ? "currentColor" : "none"} />
                  </button>
                  <a href={card.officialWebsite} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950">
                    官网 <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <CardApplicationDialog card={applicationCard} onClose={() => setApplicationCard(null)} />

      {compareIds.length > 0 && (
        <>
          <aside className="fixed bottom-4 left-4 right-4 z-50 rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-950/20 md:hidden">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="text-sm font-semibold text-slate-950">已选择 {compareIds.length} 张卡</div>
                <div className="truncate text-xs text-slate-500">{compareIds.join(" / ")}</div>
              </div>
              <Link href={compareHref} className="shrink-0 rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white">
                对比
              </Link>
            </div>
          </aside>
          <aside className="fixed right-5 top-28 z-40 hidden w-72 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-950/15 lg:block">
            <div className="flex items-center justify-between">
              <div className="font-semibold text-slate-950">对比浮窗</div>
              <button
                type="button"
                onClick={() => setCompareIds([])}
                aria-label="清空对比"
                className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-3 space-y-2">
              {compareIds.map((slug) => {
                const card = cards.find((item) => item.slug === slug);
                return (
                  <div key={slug} className="flex items-center justify-between gap-2 rounded-xl bg-slate-50 px-3 py-2 text-sm">
                    <span className="truncate font-medium text-slate-700">{card?.cardName ?? slug}</span>
                    <button
                      type="button"
                      onClick={() => toggleCompare(slug)}
                      aria-label="移除对比"
                      className="text-slate-400 hover:text-rose-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                );
              })}
            </div>
            <Link
              href={compareHref}
              className="mt-4 flex h-11 items-center justify-center rounded-xl bg-slate-950 text-sm font-semibold text-white hover:bg-slate-800"
            >
              打开横向对比
            </Link>
          </aside>
        </>
      )}
    </div>
  );
}
