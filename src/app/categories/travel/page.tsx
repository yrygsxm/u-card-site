import type { Metadata } from "next";
import { CategoryPage } from "@/components/CategoryPage";
import { cards } from "@/lib/cards";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "海外消费 U 卡",
  description: "面向跨境与旅行消费场景的 U 卡列表，帮助比较外汇费、ATM 费用与地区支持。",
  alternates: { canonical: absoluteUrl("/categories/travel") },
};

export default function TravelCategoryPage() {
  const categoryCards = cards
    .filter((card) => card.scenarios.includes("旅行") || card.scenarios.includes("跨境支付"))
    .sort((a, b) => b.scoreBreakdown.cost.score - a.scoreBreakdown.cost.score);

  return (
    <CategoryPage
      title="海外消费"
      description="面向旅行、跨境支付与海外消费的 U 卡。请重点核对外汇费、ATM 规则、地区覆盖和商户限制。"
      cards={categoryCards}
    />
  );
}
