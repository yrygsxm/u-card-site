"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Check, ExternalLink, Search, Trash2, X } from "lucide-react";
import { supportLabel, type CryptoCard } from "@/lib/cards";
import { CardVisual } from "@/components/CardVisual";
import { MAX_COMPARE_CARDS, useComparison } from "@/components/ComparisonProvider";
import { RegionSummary } from "@/components/RegionSummary";

type CompareRow = {
  key: string;
  label: string;
  detail: string;
  value: (card: CryptoCard) => ReactNode;
};

type PickerSort = "recommended" | "score" | "cashback" | "regions";

const rows: CompareRow[] = [
  { key: "name", label: "产品名称", detail: "卡片品牌和产品名。", value: (card) => card.cardName },
  { key: "website", label: "官方网站", detail: "用于最终核验费用、地区和条款。", value: (card) => card.officialWebsite },
  { key: "network", label: "卡组织", detail: "Visa / Mastercard 等网络。", value: (card) => card.cardNetwork.join(" / ") },
  { key: "issuer", label: "发行机构", detail: "实际发卡方可能按地区不同。", value: (card) => card.issuer },
  {
    key: "regions",
    label: "支持地区",
    detail: "可申请或常见可用地区。",
    value: (card) => (
      <RegionSummary
        regions={card.supportedRegions}
        title={`${card.cardName} 支持地区`}
        visibleCount={3}
      />
    ),
  },
  { key: "restricted", label: "不支持地区", detail: "地区政策可能快速变化。", value: (card) => card.restrictedRegions.join(" / ") },
  { key: "condition", label: "申请条件", detail: "居住地、账户和地区要求。", value: (card) => card.residencyRequirement },
  { key: "kyc", label: "KYC 要求", detail: "是否需要身份验证。", value: (card) => (card.kycRequired ? `需要：${card.kycDocuments.join(" / ")}` : "无需") },
  { key: "address", label: "地址证明", detail: "可能影响日本、香港、欧洲申请。", value: (card) => supportLabel(card.proofOfAddressRequired) },
  { key: "virtual", label: "虚拟卡", detail: "适合线上订阅和快速开通。", value: (card) => (card.virtualCardSupported ? "支持" : "不支持") },
  { key: "physical", label: "实体卡", detail: "适合线下刷卡和旅行。", value: (card) => (card.physicalCardSupported ? "支持" : "不支持") },
  { key: "metal", label: "金属卡", detail: "通常与高等级权益绑定。", value: (card) => (card.metalCardSupported ? "支持" : "不支持") },
  { key: "opening", label: "开卡费用", detail: "虚拟卡、实体卡和邮寄费可能不同。", value: (card) => card.openingFee },
  { key: "monthly", label: "月费", detail: "订阅计划和权益计划需另看。", value: (card) => card.monthlyFee },
  { key: "annual", label: "年费", detail: "部分产品无年费但有其他使用费。", value: (card) => card.annualFee },
  { key: "topup", label: "充值手续费", detail: "链上网络费和入金通道费需分开看。", value: (card) => card.topUpFee },
  { key: "spending", label: "消费手续费", detail: "刷卡费、兑换费和价差可能同时存在。", value: (card) => card.spendingFee },
  { key: "fx", label: "外汇手续费", detail: "跨币种消费的重要成本。", value: (card) => card.fxFee },
  { key: "atm", label: "ATM 取现手续费", detail: "ATM 运营商费用可能另计。", value: (card) => card.atmWithdrawalFee },
  { key: "free-atm", label: "免费 ATM 额度", detail: "常按月度、等级或地区限制。", value: (card) => card.freeAtmLimit },
  { key: "single-limit", label: "单笔消费限额", detail: "按卡种和 KYC 等级变化。", value: (card) => card.singleTransactionLimit },
  { key: "monthly-limit", label: "月消费限额", detail: "按地区和账户等级变化。", value: (card) => card.monthlySpendingLimit },
  { key: "atm-single", label: "单笔取现限额", detail: "受 ATM 网络和账户等级限制。", value: (card) => card.atmSingleLimit },
  { key: "atm-monthly", label: "月取现限额", detail: "通常低于刷卡消费限额。", value: (card) => card.atmMonthlyLimit },
  { key: "currencies", label: "支持币种", detail: "可持有、充值或消费的主要资产。", value: (card) => card.supportedCurrencies.join(" / ") },
  { key: "stablecoins", label: "支持稳定币", detail: "USDT / USDC 等稳定币路径。", value: (card) => card.supportedStablecoins.join(" / ") },
  { key: "apple", label: "Apple Pay", detail: "同一产品不同地区可能不同。", value: (card) => supportLabel(card.applePaySupported) },
  { key: "google", label: "Google Pay", detail: "同一产品不同地区可能不同。", value: (card) => supportLabel(card.googlePaySupported) },
  { key: "curve", label: "Curve", detail: "欧洲用户常见叠加钱包场景。", value: (card) => supportLabel(card.curveSupported) },
  { key: "paypal", label: "PayPal", detail: "绑定成功率受 BIN 和风控影响。", value: (card) => supportLabel(card.paypalSupported) },
  { key: "japan-store", label: "日本便利店", detail: "需要小额实测，不能只看卡组织。", value: (card) => (card.scenarios.includes("日常消费") ? "可作为候选，需实测" : "需确认") },
  { key: "transport", label: "交通卡充值", detail: "Suica/PASMO 等钱包充值需要单独验证。", value: () => "需小额实测" },
  { key: "cashback", label: "返现比例", detail: "名义返现不等于实际收益。", value: (card) => card.cashbackRate },
  { key: "cashback-cap", label: "返现上限", detail: "周期上限和活动上限要一起看。", value: (card) => card.cashbackCap },
  { key: "cashback-cycle", label: "返现发放周期", detail: "通常在交易确认后发放。", value: (card) => card.cashbackCycle },
  { key: "cashback-rules", label: "返现限制", detail: "等级、持仓、活动和商户类别限制。", value: (card) => card.cashbackRequirements },
  { key: "risk", label: "风控强度", detail: "越低越适合新手和稳定使用。", value: (card) => card.riskLevel },
  { key: "freeze", label: "账户冻结风险", detail: "不是预测，只是风险点归纳。", value: (card) => card.freezeRisk },
  { key: "support", label: "客服体验", detail: "站内示例评分，仍需用户反馈补充。", value: (card) => `${card.customerSupportRating}/5` },
  { key: "suitable", label: "适合人群", detail: "根据地区、费用和功能定位归纳。", value: (card) => card.suitableFor.join(" / ") },
  { key: "not-suitable", label: "不适合人群", detail: "用于避免错误申请。", value: (card) => card.notSuitableFor.join(" / ") },
  { key: "score", label: "综合评分", detail: "100 分制，页面展示评分拆解。", value: (card) => `${card.overallScore}/100` },
];

function toneFor(row: CompareRow, card: CryptoCard, selectedCards: CryptoCard[]) {
  if (row.key === "score") {
    const max = Math.max(...selectedCards.map((item) => item.overallScore));
    const min = Math.min(...selectedCards.map((item) => item.overallScore));
    if (card.overallScore === max) return "bg-emerald-50 text-emerald-800";
    if (card.overallScore === min) return "bg-rose-50 text-rose-800";
  }
  if (row.key === "risk") {
    if (card.riskLevel === "低" || card.riskLevel === "中低") return "bg-emerald-50 text-emerald-800";
    if (card.riskLevel === "中高" || card.riskLevel === "高") return "bg-rose-50 text-rose-800";
  }
  if (["virtual", "physical", "apple", "google"].includes(row.key)) {
    const value = row.value(card);
    if (typeof value === "string" && value === "支持") return "bg-emerald-50 text-emerald-800";
    if (typeof value === "string" && value === "不支持") return "bg-rose-50 text-rose-800";
  }
  return "";
}

function searchableText(card: CryptoCard) {
  return [
    card.cardName,
    card.shortName,
    card.oneLine,
    card.summary,
    card.issuer,
    card.cardNetwork.join(" "),
    card.supportedRegions.join(" "),
    card.applicationRegions.join(" "),
    card.supportedCurrencies.join(" "),
    card.supportedStablecoins.join(" "),
    card.tags.join(" "),
    card.riskTags.join(" "),
    card.bestFor.join(" "),
    card.scenarios.join(" "),
  ]
    .join(" ")
    .toLowerCase();
}

function supportScore(card: CryptoCard) {
  return Number(card.virtualCardSupported) + Number(card.physicalCardSupported) + Number(card.applePaySupported === "yes") + Number(card.googlePaySupported === "yes");
}

function sortedPickerCards(cards: CryptoCard[], sort: PickerSort) {
  return [...cards].sort((a, b) => {
    if (sort === "score") return b.overallScore - a.overallScore;
    if (sort === "cashback") return b.scoreBreakdown.cashback.score - a.scoreBreakdown.cashback.score || b.overallScore - a.overallScore;
    if (sort === "regions") return b.supportedRegions.length - a.supportedRegions.length || b.overallScore - a.overallScore;
    return b.overallScore - a.overallScore || supportScore(b) - supportScore(a);
  });
}

export function CompareTable({
  cards,
  initialSlugs,
}: {
  cards: CryptoCard[];
  initialSlugs: string[];
}) {
  const { compareIds: selected, hydrated, notice, clearCompare, replaceCompare, toggleCompare } = useComparison();
  const [pickerQuery, setPickerQuery] = useState("");
  const [pickerSort, setPickerSort] = useState<PickerSort>("recommended");
  const [compareOpen, setCompareOpen] = useState(false);
  const [compareMessage, setCompareMessage] = useState<string | null>(null);
  const initialKey = initialSlugs.join(",");
  const syncedInitialKeyRef = useRef<string | null>(null);
  const compareButtonRef = useRef<HTMLButtonElement | null>(null);
  const [compareButtonVisible, setCompareButtonVisible] = useState(true);

  useEffect(() => {
    if (!hydrated || syncedInitialKeyRef.current === initialKey) return;

    const urlSlugs = initialKey
      .split(",")
      .filter((slug) => cards.some((card) => card.slug === slug));

    if (urlSlugs.length > 0) {
      replaceCompare(urlSlugs);
    } else if (urlSlugs.length === 0 && selected.length === 0) {
      replaceCompare(cards.slice(0, 3).map((card) => card.slug));
    }
    syncedInitialKeyRef.current = initialKey;
  }, [cards, hydrated, initialKey, replaceCompare, selected.length]);

  const selectedCards = useMemo(
    () => selected.map((slug) => cards.find((card) => card.slug === slug)).filter((card): card is CryptoCard => Boolean(card)),
    [cards, selected],
  );

  const candidateCards = useMemo(() => {
    const query = pickerQuery.trim().toLowerCase();
    const filtered = query ? cards.filter((card) => searchableText(card).includes(query)) : cards;

    return sortedPickerCards(filtered, pickerSort);
  }, [cards, pickerQuery, pickerSort]);

  useEffect(() => {
    if (!compareOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setCompareOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [compareOpen]);

  useEffect(() => {
    const node = compareButtonRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setCompareButtonVisible(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.2,
      },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const handleOpenCompare = () => {
    if (selectedCards.length < 2) {
      setCompareMessage("请至少选择 2 张 U 卡后再开始对比。");
      return;
    }

    setCompareMessage(null);
    setCompareOpen(true);
  };

  const compareNotice = selectedCards.length < 2 ? compareMessage ?? notice : notice;
  const showStickyCompareBar = selectedCards.length > 0 && !compareButtonVisible && !compareOpen;

  return (
    <div className="space-y-6 pb-24">
      <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm shadow-slate-950/5 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">Compare picker</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">选择要横向对比的 U 卡</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              通过卡面和名称快速识别产品；可用搜索缩小范围，最多选择 {MAX_COMPARE_CARDS} 张卡进行对比。
            </p>
          </div>
          <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600 sm:min-w-64">
            <div>
              <span className="block text-xs font-medium text-slate-500">已选择</span>
              <span className="mt-1 block font-mono text-2xl font-semibold text-slate-950">
                {selectedCards.length}/{MAX_COMPARE_CARDS}
              </span>
            </div>
            <button
              ref={compareButtonRef}
              type="button"
              onClick={handleOpenCompare}
              className={`inline-flex h-11 items-center justify-center rounded-xl px-5 text-sm font-semibold transition ${
                selectedCards.length >= 2
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-slate-200 text-slate-500 hover:bg-slate-300"
              }`}
            >
              开始对比
            </button>
          </div>
        </div>

        <div className="mt-5 grid gap-3 lg:grid-cols-[minmax(0,1fr)_220px]">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={pickerQuery}
              onChange={(event) => setPickerQuery(event.target.value)}
              placeholder="搜索卡片名称、地区、Apple Pay、USDT、返现…"
              className="h-12 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
            />
          </label>
          <select
            value={pickerSort}
            onChange={(event) => setPickerSort(event.target.value as PickerSort)}
            className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
            aria-label="卡片排序"
          >
            <option value="recommended">推荐优先</option>
            <option value="score">评分最高</option>
            <option value="cashback">返现权益</option>
            <option value="regions">地区覆盖</option>
          </select>
        </div>

        {compareNotice ? (
          <p className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
            {compareNotice}
          </p>
        ) : null}

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {candidateCards.map((card) => {
            const checked = selected.includes(card.slug);
            const disabled = !checked && selected.length >= MAX_COMPARE_CARDS;

            return (
              <button
                key={card.slug}
                type="button"
                onClick={() => toggleCompare(card.slug)}
                aria-pressed={checked}
                className={`card-list-item group relative flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-4 text-left shadow-sm shadow-slate-950/5 transition-all duration-150 ease-out hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] motion-reduce:transform-none sm:p-5 ${
                  disabled ? "opacity-60" : ""
                }`}
              >
                {checked ? (
                  <span className="absolute right-5 top-5 z-10 inline-flex h-8 items-center gap-1.5 rounded-lg border border-blue-600 bg-blue-600 px-2.5 text-sm font-medium text-white shadow-lg shadow-blue-600/20">
                    <Check className="h-4 w-4" />
                    已选择
                  </span>
                ) : null}
                <div className="block rounded-2xl">
                  <CardVisual card={card} compact />
                </div>
                <div className="mt-4 truncate text-center text-xl font-semibold text-slate-950">{card.cardName}</div>
              </button>
            );
          })}
        </div>

        {candidateCards.length === 0 ? (
          <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
            没有找到匹配的 U 卡，请换一个关键词。
          </div>
        ) : null}

        <p className="mt-4 text-xs leading-5 text-slate-500">
          请选择 2–{MAX_COMPARE_CARDS} 张卡后点击“开始对比”。优势项使用绿色底色，劣势或高风险项使用红色底色。
        </p>
      </section>

      <div
        aria-hidden={!showStickyCompareBar}
        className={`pointer-events-none fixed inset-x-3 bottom-4 z-[70] transition-[transform,opacity] duration-200 motion-reduce:transition-none sm:inset-x-6 ${
          showStickyCompareBar ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        <div className="compare-dock pointer-events-auto mx-auto flex min-h-[72px] max-w-6xl items-center gap-3 px-[18px] py-3 sm:px-5">
          <div className="flex min-w-0 flex-1 items-center gap-3 overflow-x-auto py-0.5">
            {selectedCards.map((card) => (
              <div
                key={card.slug}
                className="compare-selected-chip compare-dock-chip group relative flex h-12 shrink-0 items-center gap-2 p-1 pr-7"
              >
                <div className="w-12 shrink-0 overflow-hidden rounded-[7px] [&>div]:rounded-[7px] [&>div]:shadow-none">
                  <CardVisual card={card} compact interactive={false} />
                </div>
                <span className="compare-dock-card-name max-w-24 truncate text-xs font-semibold sm:max-w-36">{card.cardName}</span>
                <button
                  type="button"
                  onClick={() => toggleCompare(card.slug)}
                  aria-label={`移除 ${card.cardName}`}
                  title={`移除 ${card.cardName}`}
                  className="compare-dock-close absolute right-1 top-1 inline-flex h-[18px] w-[18px] items-center justify-center opacity-60 transition group-hover:opacity-100"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
            {compareNotice ? <span className="compare-dock-notice hidden shrink-0 text-xs font-semibold md:inline">{compareNotice}</span> : null}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={handleOpenCompare}
              className={`inline-flex h-11 shrink-0 items-center justify-center rounded-[14px] px-4 text-[15px] font-semibold transition sm:px-5 ${
                selectedCards.length >= 2
                  ? "bg-[linear-gradient(135deg,#2563eb,#4338ca)] text-white shadow-[0_8px_24px_rgba(37,99,235,0.28)] hover:-translate-y-px hover:shadow-[0_10px_28px_rgba(37,99,235,0.36)]"
                  : "compare-dock-muted-button"
              }`}
            >
              开始对比
            </button>
            <button
              type="button"
              onClick={clearCompare}
              aria-label="清空已选卡片"
              title="清空已选卡片"
              className="compare-dock-clear inline-flex h-11 w-11 shrink-0 items-center justify-center transition"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {compareOpen ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/60 p-3 backdrop-blur-sm sm:p-6" role="dialog" aria-modal="true" aria-labelledby="compare-dialog-title">
          <div className="flex max-h-[88vh] w-full max-w-7xl flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl shadow-slate-950/25">
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 bg-slate-50 px-4 py-4 sm:px-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">Compare fields</p>
                <h2 id="compare-dialog-title" className="mt-1 text-xl font-semibold tracking-tight text-slate-950">
                  U 卡横向对比
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  当前对比：{selectedCards.map((card) => card.cardName).join("、")}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setCompareOpen(false)}
                aria-label="关闭对比弹窗"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-100 hover:text-slate-950"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="overflow-auto">
              <table className="min-w-[1120px] border-separate border-spacing-0 text-left text-sm">
                <thead>
                  <tr>
                    <th className="sticky left-0 top-0 z-20 w-56 border-b border-slate-200 bg-slate-50 px-4 py-4 text-xs font-semibold uppercase text-slate-500">
                      字段
                    </th>
                    {selectedCards.map((card) => (
                      <th key={card.slug} className="sticky top-0 z-10 w-72 border-b border-slate-200 bg-slate-50 px-4 py-4 align-top">
                        <div className="text-base font-semibold text-slate-950">{card.cardName}</div>
                        <div className="mt-1 font-mono text-sm text-emerald-600">{card.overallScore}/100</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.key}>
                      <th className="sticky left-0 z-10 border-b border-slate-100 bg-white px-4 py-4 align-top">
                        <details>
                          <summary className="cursor-pointer list-none font-semibold text-slate-900">{row.label}</summary>
                          <p className="mt-1 text-xs font-normal leading-5 text-slate-500">{row.detail}</p>
                        </details>
                      </th>
                      {selectedCards.map((card) => {
                        const value = row.value(card);
                        const tone = toneFor(row, card, selectedCards);
                        return (
                          <td key={`${row.key}-${card.slug}`} className="border-b border-slate-100 px-4 py-4 align-top">
                            <div className={`rounded-xl px-3 py-2 leading-6 text-slate-700 ${tone}`}>
                              {row.key === "website" && typeof value === "string" ? (
                                <a
                                  href={value}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1 font-medium text-blue-700"
                                >
                                  官网
                                  <ExternalLink className="h-4 w-4" />
                                </a>
                              ) : (
                                value
                              )}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
