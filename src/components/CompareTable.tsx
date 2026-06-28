"use client";

import { useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { Check, ExternalLink, X } from "lucide-react";
import { supportLabel, type CryptoCard } from "@/lib/cards";
import { Badge } from "@/components/Badge";
import { MAX_COMPARE_CARDS, useComparison } from "@/components/ComparisonProvider";

type CompareRow = {
  key: string;
  label: string;
  detail: string;
  value: (card: CryptoCard) => string;
};

const rows: CompareRow[] = [
  { key: "name", label: "产品名称", detail: "卡片品牌和产品名。", value: (card) => card.cardName },
  { key: "website", label: "官方网站", detail: "用于最终核验费用、地区和条款。", value: (card) => card.officialWebsite },
  { key: "network", label: "卡组织", detail: "Visa / Mastercard 等网络。", value: (card) => card.cardNetwork.join(" / ") },
  { key: "issuer", label: "发行机构", detail: "实际发卡方可能按地区不同。", value: (card) => card.issuer },
  { key: "regions", label: "支持地区", detail: "可申请或常见可用地区。", value: (card) => card.supportedRegions.join(" / ") },
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
    if (value === "支持") return "bg-emerald-50 text-emerald-800";
    if (value === "不支持") return "bg-rose-50 text-rose-800";
  }
  return "";
}

export function CompareTable({
  cards,
  initialSlugs,
}: {
  cards: CryptoCard[];
  initialSlugs: string[];
}) {
  const { compareIds: selected, hydrated, replaceCompare, toggleCompare } = useComparison();
  const initialKey = initialSlugs.join(",");
  const syncedInitialKeyRef = useRef<string | null>(null);

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

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-950/5">
        <div className="flex flex-wrap gap-2">
          {cards.map((card) => {
            const checked = selected.includes(card.slug);
            return (
              <button
                key={card.slug}
                type="button"
                onClick={() => toggleCompare(card.slug)}
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium ${
                  checked
                    ? "border-slate-950 bg-slate-950 text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                {checked ? <Check className="h-4 w-4" /> : null}
                {card.shortName}
              </button>
            );
          })}
        </div>
        <p className="mt-3 text-xs text-slate-500">请选择 2–{MAX_COMPARE_CARDS} 张卡进行横向对比。优势项使用绿色底色，劣势或高风险项使用红色底色。</p>
      </div>

      <div className="hidden overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-950/5 md:block">
        <table className="min-w-[1120px] border-separate border-spacing-0 text-left text-sm">
          <thead>
            <tr>
              <th className="sticky left-0 z-10 w-56 border-b border-slate-200 bg-slate-50 px-4 py-4 text-xs font-semibold uppercase text-slate-500">
                对比字段
              </th>
              {selectedCards.map((card) => (
                <th key={card.slug} className="w-72 border-b border-slate-200 bg-slate-50 px-4 py-4 align-top">
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
                        {row.key === "website" ? (
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

      <div className="space-y-4 md:hidden">
        {selectedCards.map((card) => (
          <article key={card.slug} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-950/5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold text-slate-950">{card.cardName}</h2>
                <p className="mt-1 text-sm text-slate-500">{card.oneLine}</p>
              </div>
              <button
                type="button"
                onClick={() => toggleCompare(card.slug)}
                aria-label="移除对比"
                className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-rose-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-4 grid gap-3">
              {rows.slice(2).map((row) => (
                <div key={row.key} className="rounded-xl bg-slate-50 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-xs font-medium text-slate-500">{row.label}</div>
                    {row.key === "score" ? <Badge tone="positive">{card.overallScore}/100</Badge> : null}
                  </div>
                  <div className="mt-1 text-sm leading-6 text-slate-800">{row.value(card)}</div>
                </div>
              ))}
            </div>
            <Link href={`/cards/${card.slug}`} className="mt-4 inline-flex rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white">
              查看详情
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
