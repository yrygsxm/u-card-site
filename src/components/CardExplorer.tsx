"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUpRight,
  Check,
  Copy,
  ExternalLink,
  Plus,
  Search,
  SlidersHorizontal,
  Star,
  X,
} from "lucide-react";
import type { CryptoCard } from "@/lib/cards";
import { quickFilters, sortOptions } from "@/lib/cards";
import { Badge } from "@/components/Badge";
import { CardApplicationDialog, DEFAULT_INVITE_CODE } from "@/components/CardApplicationDialog";
import { useComparison } from "@/components/ComparisonProvider";
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

function tagTone(tag: string) {
  const strongRiskKeywords = ["风控", "冻结", "封禁", "停用", "高风险"];
  const cautionRiskKeywords = ["变化", "限制", "仅限", "资格", "上限", "地区", "活动", "风险"];
  const benefitKeywords = ["返现", "Apple Pay", "Google Pay", "虚拟卡"];

  if (strongRiskKeywords.some((keyword) => tag.includes(keyword))) {
    return "!border-transparent !bg-[#fee2e2] !text-[#991b1b]";
  }
  if (cautionRiskKeywords.some((keyword) => tag.includes(keyword))) {
    return "!border-transparent !bg-[#fef3c7] !text-[#92400e]";
  }
  if (benefitKeywords.some((keyword) => tag.includes(keyword))) {
    return "!border-transparent !bg-[#dcfce7] !text-[#15803d]";
  }
  return "!border-transparent !bg-[#f3f4f6] !text-[#374151]";
}

function ScoreRing({ score }: { score: number }) {
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.max(0, Math.min(100, score));
  const stroke = progress >= 80 ? "#22c55e" : progress >= 60 ? "#f59e0b" : "#ef4444";

  return (
    <div className="relative h-[52px] w-[52px] shrink-0" role="img" aria-label={`综合评分 ${score}/100`}>
      <svg viewBox="0 0 52 52" className="h-[52px] w-[52px] -rotate-90" aria-hidden="true">
        <circle cx="26" cy="26" r={radius} fill="none" stroke="currentColor" strokeWidth="4" className="text-slate-200" />
        <circle
          cx="26"
          cy="26"
          r={radius}
          fill="none"
          stroke={stroke}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - progress / 100)}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-slate-950">{score}</span>
    </div>
  );
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
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [applicationCard, setApplicationCard] = useState<CryptoCard | null>(null);
  const [copiedInviteSlug, setCopiedInviteSlug] = useState<string | null>(null);
  const favoritesStorageReadyRef = useRef(false);
  const { compareIds, toggleCompare } = useComparison();

  useEffect(() => {
    let cancelled = false;
    window.requestAnimationFrame(() => {
      if (cancelled) return;
      const storedFavorites = window.localStorage.getItem("ucard-favorites");
      if (storedFavorites) setFavoriteIds(JSON.parse(storedFavorites) as string[]);
      favoritesStorageReadyRef.current = true;
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!favoritesStorageReadyRef.current) return;
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

  const toggleFavorite = (slug: string) => {
    setFavoriteIds((current) =>
      current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug],
    );
  };

  const displayCards = compact ? cards : filteredCards;
  const cardGridClassName = compact
    ? "grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    : "grid gap-5 sm:grid-cols-2 xl:grid-cols-3";

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
                <span className="sr-only">搜索 U 卡</span>
                <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  id="card-search"
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

      <div key={compact ? "home-card-list" : `${query}-${activeFilters.join("-")}-${sort}`} className={cardGridClassName}>
        {displayCards.map((card, index) => {
          const inCompare = compareIds.includes(card.slug);
          const favorite = favoriteIds.includes(card.slug);
          const benefits = featuredBenefits(card);

          const cardContent = (
            <article
              key={card.slug}
              className="card-list-item group relative flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-950/5 transition-all duration-150 ease-out hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] motion-reduce:transform-none sm:p-5"
              style={{ animationDelay: `${Math.min(index, 5) * 30}ms` }}
            >
              {compact && (
                <Link
                  href={`/cards/${card.slug}`}
                  aria-label={`查看 ${card.cardName} 详情`}
                  className="absolute inset-0 z-0 rounded-3xl focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300/50"
                />
              )}

              <div className={compact ? "pointer-events-none relative z-10" : undefined}>
                <CardVisual card={card} compact />

                <div className="mt-4 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="truncate text-xl font-semibold text-slate-950">{card.cardName}</h3>
                    <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-600">{card.oneLine}</p>
                  </div>
                  <ScoreRing score={card.overallScore} />
                </div>

                <div className="mt-4 flex flex-nowrap gap-2 overflow-hidden">
                  {benefits.map((benefit, index) => (
                    <Badge key={benefit} className={`shrink-0 whitespace-nowrap ${tagTone(benefit)} ${index === 0 ? "font-semibold" : ""}`}>
                      {benefit}
                    </Badge>
                  ))}
                  {card.riskTags.slice(0, 1).map((tag) => (
                    <Badge key={tag} className={`shrink-0 whitespace-nowrap ${tagTone(tag)}`}>
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {compact && (
                <div className="relative z-10 mt-auto pt-5">
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2">
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        void copyInviteCode(card.slug);
                      }}
                      className="flex min-h-12 min-w-0 items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 text-left transition hover:border-slate-300 hover:bg-white focus:outline-none focus:ring-4 focus:ring-slate-100"
                      aria-label={`复制 ${card.cardName} 邀请码 ${DEFAULT_INVITE_CODE}`}
                    >
                      <span>
                        <span className="block text-[10px] font-medium uppercase tracking-[0.1em] text-slate-500">邀请码</span>
                        <span className="block font-mono text-base font-bold tracking-[0.12em] text-slate-950">{DEFAULT_INVITE_CODE}</span>
                      </span>
                      {copiedInviteSlug === card.slug ? <Check className="h-4 w-4 shrink-0 text-emerald-600" /> : <Copy className="h-4 w-4 shrink-0 text-slate-500" />}
                    </button>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        setApplicationCard(card);
                      }}
                      className="inline-flex min-h-12 items-center justify-center gap-1.5 rounded-xl bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-emerald-500 hover:text-slate-950 focus:outline-none focus:ring-4 focus:ring-slate-300"
                    >
                      立即申请
                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {!compact && (
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
                      className="inline-flex min-h-12 items-center justify-center gap-1.5 rounded-xl bg-slate-950 px-4 text-sm font-semibold text-white opacity-70 transition-all duration-150 ease-out group-hover:opacity-100 hover:bg-emerald-500 hover:text-slate-950 hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-4 focus:ring-slate-300"
                    >
                      立即申请
                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <Link
                      href={`/cards/${card.slug}`}
                      className="inline-flex items-center justify-center rounded-lg px-2 py-1 text-sm font-medium text-slate-600 opacity-70 transition-all duration-150 ease-out group-hover:opacity-100 hover:bg-slate-100 hover:text-slate-950 hover:opacity-100 focus:opacity-100"
                    >
                      查看详情
                    </Link>
                    <button
                      type="button"
                      onClick={() => toggleCompare(card.slug)}
                      aria-pressed={inCompare}
                      className={`inline-flex h-8 items-center gap-1.5 rounded-lg border px-2.5 text-sm font-medium transition ${
                        inCompare
                          ? "border-blue-600 bg-blue-600 text-white hover:bg-blue-700"
                          : "border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                      }`}
                    >
                      {inCompare ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                      {inCompare ? "已加入对比" : "加入对比"}
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
              )}
            </article>
          );

          return cardContent;
        })}
      </div>

      <CardApplicationDialog card={applicationCard} onClose={() => setApplicationCard(null)} />
    </div>
  );
}
