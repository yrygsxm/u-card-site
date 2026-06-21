import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CalculatorPanel } from "@/components/CalculatorPanel";
import { CardExplorer } from "@/components/CardExplorer";
import { JsonLd } from "@/components/JsonLd";
import { RegionMatcher } from "@/components/RegionMatcher";
import { cards } from "@/lib/cards";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "U 卡列表与筛选",
  description:
    "按地区、KYC、虚拟卡、实体卡、Apple Pay、USDT、USDC、返现、手续费和使用场景筛选 U 卡。",
  alternates: { canonical: absoluteUrl("/cards") },
  openGraph: {
    title: "U 卡列表与筛选",
    description: "比较加密货币银行卡、虚拟卡和实体卡的费用、地区与风险。",
    url: absoluteUrl("/cards"),
  },
};

export default function CardsPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "U 卡列表与筛选",
          url: absoluteUrl("/cards"),
          inLanguage: "zh-CN",
          mainEntity: {
            "@type": "ItemList",
            itemListElement: cards.map((card, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: card.cardName,
              url: absoluteUrl(`/cards/${card.slug}`),
            })),
          },
        }}
      />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "U 卡列表" }]} />
        <div className="mb-8 max-w-4xl">
          <h1 className="text-3xl font-semibold text-slate-950">U 卡列表与筛选</h1>
          <p className="mt-3 text-base leading-7 text-slate-600">
            通过可申请地区、居住地要求、证件、KYC、卡片类型、卡组织、支持币种、移动支付、ATM、返现和费用范围筛选。列表中的费用和地区规则均为示例化整理，实际申请前请打开官方来源逐项确认。
          </p>
        </div>
        <CardExplorer cards={cards} />
        <div className="mt-14 space-y-8">
          <CalculatorPanel cards={cards} />
          <RegionMatcher cards={cards} />
        </div>
      </main>
    </>
  );
}
