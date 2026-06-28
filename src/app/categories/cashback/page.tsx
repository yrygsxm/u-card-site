import type { Metadata } from "next";
import { CategoryPage } from "@/components/CategoryPage";
import { cards } from "@/lib/cards";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "返现卡推荐",
  description: "按返现能力筛选的 U 卡推荐，帮助比较返现比例、上限、费用与权益条件。",
  alternates: { canonical: absoluteUrl("/categories/cashback") },
};

export default function CashbackCategoryPage() {
  const categoryCards = cards
    .filter((card) => card.feeModel.cashbackRatePct >= 1.5 || card.scoreBreakdown.cashback.score >= 11)
    .sort((a, b) => b.scoreBreakdown.cashback.score - a.scoreBreakdown.cashback.score);

  return (
    <CategoryPage
      title="返现卡推荐"
      description="按返现能力筛选的 U 卡。请同时核对返现上限、会员等级、消费类别和地区资格。"
      cards={categoryCards}
    />
  );
}
