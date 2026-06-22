"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MapPin, ShieldCheck } from "lucide-react";
import type { CryptoCard } from "@/lib/cards";
import { Badge } from "@/components/Badge";

export function RegionMatcher({ cards }: { cards: CryptoCard[] }) {
  const [residence, setResidence] = useState("japan");
  const [documentType, setDocumentType] = useState("residence-card");
  const [addressProof, setAddressProof] = useState("yes");
  const [usageRegion, setUsageRegion] = useState("japan");

  const matches = useMemo(() => {
    return cards
      .map((card) => {
        let score = card.overallScore;
        if (residence === "japan") score += card.japanResidenceCardSupport === "yes" ? 20 : card.japanResidenceCardSupport === "partial" ? 10 : -20;
        if (residence === "hongkong") score += card.hongKongIdSupport === "yes" ? 20 : card.hongKongIdSupport === "partial" ? 10 : -15;
        if (residence === "europe") score += card.supportedRegions.some((region) => region.includes("欧洲") || region.includes("英国")) ? 18 : -10;
        if (residence === "mainland") score += card.mainlandChinaPassportSupport === "partial" ? 5 : -25;
        if (documentType === "passport" && card.mainlandChinaPassportSupport === "partial") score += 4;
        if (addressProof === "no" && card.proofOfAddressRequired === "yes") score -= 20;
        if (usageRegion === "travel" && card.scenarios.includes("旅行")) score += 8;
        if (usageRegion === "japan" && card.applePaySupported !== "no") score += 5;
        return { card, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }, [addressProof, cards, documentType, residence, usageRegion]);

  return (
    <section id="region-match" className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
          <MapPin className="h-5 w-5" />
        </span>
        <div>
          <h2 className="text-lg font-semibold text-slate-950">地区匹配推荐</h2>
          <p className="text-sm text-slate-500">按居住地、证件、地址证明和主要使用地区初筛。</p>
        </div>
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-4">
        <Select label="居住地" value={residence} onChange={setResidence} options={[
          ["japan", "日本"],
          ["hongkong", "香港"],
          ["europe", "欧洲/英国"],
          ["mainland", "中国大陆"],
          ["us", "美国"],
        ]} />
        <Select label="证件类型" value={documentType} onChange={setDocumentType} options={[
          ["residence-card", "居留卡/本地 ID"],
          ["passport", "护照"],
          ["hkid", "香港身份"],
        ]} />
        <Select label="地址证明" value={addressProof} onChange={setAddressProof} options={[
          ["yes", "可以提供"],
          ["no", "无法提供"],
        ]} />
        <Select label="主要场景" value={usageRegion} onChange={setUsageRegion} options={[
          ["japan", "日本日常"],
          ["travel", "旅行/跨境"],
          ["subscription", "订阅服务"],
        ]} />
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {matches.map(({ card, score }) => (
          <Link
            key={card.slug}
            href={`/cards/${card.slug}`}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4 hover:border-blue-200 hover:bg-blue-50"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="font-semibold text-slate-950">{card.cardName}</div>
              <Badge tone={score > 85 ? "positive" : "warning"}>{Math.round(score)} 匹配</Badge>
            </div>
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{card.summary}</p>
            <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="h-4 w-4" />
              {card.sourceStatus}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: [string, string][];
}) {
  return (
    <label className="space-y-1">
      <span className="text-xs font-medium text-slate-500">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
      >
        {options.map(([optionValue, labelText]) => (
          <option key={optionValue} value={optionValue}>
            {labelText}
          </option>
        ))}
      </select>
    </label>
  );
}
