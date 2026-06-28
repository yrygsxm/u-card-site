import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BarChart3, Calculator, Globe2, ShieldAlert } from "lucide-react";
import { CardExplorer } from "@/components/CardExplorer";
import { CategoryEntryCards } from "@/components/CategoryEntryCards";
import { CalculatorPanel } from "@/components/CalculatorPanel";
import { JsonLd } from "@/components/JsonLd";
import { HomeHero } from "@/components/HomeHero";
import { RegionMatcher } from "@/components/RegionMatcher";
import { cards } from "@/lib/cards";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "全球 U 卡对比指南",
  description:
    "一站式比较虚拟卡、实体卡、返现、手续费、KYC、申请地区和 Apple Pay / Google Pay 支持情况。",
  alternates: { canonical: absoluteUrl("/") },
};

const featureCards = [
  {
    icon: Globe2,
    title: "先看能否申请",
    text: "按居住地、证件、地址证明和主要使用地区过滤，避免只看宣传页。",
  },
  {
    icon: Calculator,
    title: "把费用算清楚",
    text: "开卡费、月费、消费费、外汇费、ATM 费和返现放在同一个模型里估算。",
  },
  {
    icon: BarChart3,
    title: "评分可解释",
    text: "100 分制拆成费用、返现、地区、支付、风控、体验和透明度。",
  },
  {
    icon: ShieldAlert,
    title: "风险明确展示",
    text: "地区政策、KYC 失败、账户冻结和权益调整都作为核心字段处理。",
  },
];

export default function Home() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: siteConfig.name,
          url: absoluteUrl("/"),
          inLanguage: "zh-CN",
          potentialAction: {
            "@type": "SearchAction",
            target: `${absoluteUrl("/cards")}?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        }}
      />
      <main className="home-surface relative isolate overflow-hidden">
        <div className="relative z-10 mx-auto max-w-7xl space-y-14 px-4 pb-10 pt-5 sm:px-6 lg:px-8">
          <HomeHero cardCount={cards.length} />

          <CategoryEntryCards />

          <section className="home-content-panel p-5 sm:p-6">
            <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-500">Crypto Card Compare</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-950">热门 U 卡</h2>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                  先用搜索、地区和功能快速过滤，再进入详情页核验费用、KYC、返现和风险。
                </p>
              </div>
              <Link href="/cards" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700">
                查看完整列表
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <CardExplorer cards={cards} compact />
          </section>

          <section className="grid gap-4 md:grid-cols-4">
            {featureCards.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="home-feature-card rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5"
                  style={{ animationDelay: `${index * 70}ms` }}
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-semibold text-slate-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
                </div>
              );
            })}
          </section>

          <CalculatorPanel cards={cards} />
          <RegionMatcher cards={cards} />
        </div>
      </main>
    </>
  );
}
