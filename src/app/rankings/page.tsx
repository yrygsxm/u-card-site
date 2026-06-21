import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { RankingBoard } from "@/components/RankingBoard";
import { rankingDefinitions } from "@/lib/cards";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "U 卡排行榜",
  description:
    "综合推荐榜、日本用户推荐榜、高返现榜、低手续费榜、虚拟卡、实体卡、旅行、ATM、新手友好和风险较低榜。",
  alternates: { canonical: absoluteUrl("/rankings") },
};

export default function RankingsPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "U 卡排行榜",
          url: absoluteUrl("/rankings"),
          inLanguage: "zh-CN",
          hasPart: rankingDefinitions.map((ranking) => ({
            "@type": "ItemList",
            name: ranking.title,
            description: ranking.logic,
          })),
        }}
      />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "排行榜" }]} />
        <div className="mb-8 max-w-4xl">
          <h1 className="text-3xl font-semibold text-slate-950">U 卡排行榜</h1>
          <p className="mt-3 text-base leading-7 text-slate-600">
            排名不是简单名次，而是根据不同使用场景解释排序逻辑。所有榜单都应作为初筛工具，不能替代官方条款核验和小额实测。
          </p>
        </div>
        <RankingBoard />
      </main>
    </>
  );
}
