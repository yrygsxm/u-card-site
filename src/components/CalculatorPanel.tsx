"use client";

import { useMemo, useState } from "react";
import { Calculator, Coins } from "lucide-react";
import { AnimatedNumber } from "@/components/AnimatedNumber";
import type { CryptoCard } from "@/lib/cards";

export function CalculatorPanel({ cards }: { cards: CryptoCard[] }) {
  const [cardSlug, setCardSlug] = useState(cards[0]?.slug ?? "");
  const [amount, setAmount] = useState(1200);
  const [region, setRegion] = useState("overseas");

  const selectedCard = useMemo(
    () => cards.find((card) => card.slug === cardSlug) ?? cards[0],
    [cardSlug, cards],
  );

  const result = useMemo(() => {
    if (!selectedCard) return null;
    const fxRate = region === "same-currency" ? 0 : selectedCard.feeModel.fxRatePct;
    const transactionFee = amount * (selectedCard.feeModel.spendingRatePct / 100);
    const fxFee = amount * (fxRate / 100);
    const rawCashback = amount * (selectedCard.feeModel.cashbackRatePct / 100);
    const cashback =
      selectedCard.feeModel.cashbackCapUsd === undefined
        ? rawCashback
        : Math.min(rawCashback, selectedCard.feeModel.cashbackCapUsd);
    const net = cashback - transactionFee - fxFee;
    const effectiveRate = amount > 0 ? (net / amount) * 100 : 0;
    return { transactionFee, fxFee, cashback, net, effectiveRate };
  }, [amount, region, selectedCard]);

  if (!selectedCard || !result) return null;

  return (
    <section id="fee-calculator" className="home-calculator-section grid gap-4 scroll-mt-24 lg:grid-cols-2">
      <div className="home-tool-panel rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
        <div className="flex items-center gap-3">
          <span className="home-tool-icon home-tool-icon--blue flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
            <Calculator className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-lg font-semibold text-slate-950">费用计算器</h2>
            <p className="text-sm text-slate-500">估算消费手续费、外汇损耗和返现后的净结果。</p>
          </div>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <label className="space-y-1">
            <span className="text-xs font-medium text-slate-500">卡片</span>
            <select
              value={cardSlug}
              onChange={(event) => setCardSlug(event.target.value)}
              className="home-tool-field h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
            >
              {cards.map((card) => (
                <option key={card.slug} value={card.slug}>
                  {card.cardName}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-1">
            <span className="text-xs font-medium text-slate-500">月消费金额 USD</span>
            <input
              type="number"
              min="0"
              value={amount}
              onChange={(event) => setAmount(Number(event.target.value))}
              className="home-tool-field h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
            />
          </label>
          <label className="space-y-1">
            <span className="text-xs font-medium text-slate-500">消费地区</span>
            <select
              value={region}
              onChange={(event) => setRegion(event.target.value)}
              className="home-tool-field h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
            >
              <option value="overseas">跨币种/旅行</option>
              <option value="same-currency">同币种消费</option>
            </select>
          </label>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-4">
          <Metric label="消费费" value={result.transactionFee} format={(value) => `$${value.toFixed(2)}`} />
          <Metric label="外汇损耗" value={result.fxFee} format={(value) => `$${value.toFixed(2)}`} />
          <Metric label="返现金额" value={result.cashback} format={(value) => `$${value.toFixed(2)}`} positive />
          <Metric
            label="净收益率"
            value={result.effectiveRate}
            format={(value) => `${value.toFixed(2)}%`}
            flashBySign
          />
        </div>
        <p className="mt-4 text-xs leading-5 text-slate-500">
          计算器使用站内示例费率，不包含链上网络费、平台兑换价差、税务成本和活动资格限制。
        </p>
      </div>
      <div className="home-tool-panel rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
        <div className="flex items-center gap-3">
          <span className="home-tool-icon home-tool-icon--green flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
            <Coins className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-lg font-semibold text-slate-950">返现计算器</h2>
            <p className="text-sm text-slate-500">把名义返现和费用放在同一张表里看。</p>
          </div>
        </div>
        <label className="mt-5 block space-y-1">
          <span className="text-xs font-medium text-slate-500">卡片</span>
          <select
            value={cardSlug}
            onChange={(event) => setCardSlug(event.target.value)}
            className="home-tool-field h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
          >
            {cards.map((card) => (
              <option key={card.slug} value={card.slug}>
                {card.cardName}
              </option>
            ))}
          </select>
        </label>
        <div className="home-tool-detail mt-4 rounded-2xl bg-slate-50 p-4">
          <div className="text-sm font-semibold text-slate-900">{selectedCard.cardName}</div>
          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            <div>
              <div className="text-xs text-slate-500">名义返现</div>
              <div className="mt-1 text-sm font-medium text-slate-900">{selectedCard.cashbackRate}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500">返现上限</div>
              <div className="mt-1 text-sm font-medium text-slate-900">{selectedCard.cashbackCap}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500">计算后返现</div>
              <div className="mt-1 font-mono text-xl font-semibold text-emerald-600">
                <AnimatedNumber value={result.cashback} format={(value) => `$${value.toFixed(2)}`} />
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-500">扣费后结果</div>
              <div className="mt-1 font-mono text-xl font-semibold text-slate-950">
                <AnimatedNumber
                  value={result.net}
                  format={(value) => `${value >= 0 ? "+" : "-"}$${Math.abs(value).toFixed(2)}`}
                  flashBySign
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({
  label,
  value,
  format,
  positive = false,
  flashBySign = false,
}: {
  label: string;
  value: number;
  format: (value: number) => string;
  positive?: boolean;
  flashBySign?: boolean;
}) {
  return (
    <div className="home-tool-metric rounded-xl bg-slate-50 p-3">
      <div className="text-xs text-slate-500">{label}</div>
      <div className={`mt-1 font-mono text-lg font-semibold ${positive ? "text-emerald-600" : "text-slate-950"}`}>
        <AnimatedNumber value={value} format={format} flashBySign={flashBySign} />
      </div>
    </div>
  );
}
