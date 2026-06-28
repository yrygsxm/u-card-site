import type { Metadata } from "next";
import { CategoryPage } from "@/components/CategoryPage";
import { cards } from "@/lib/cards";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "虚拟卡专区",
  description: "支持虚拟卡的 U 卡列表，便于比较订阅服务、线上消费与移动支付支持情况。",
  alternates: { canonical: absoluteUrl("/categories/virtual-card") },
};

export default function VirtualCardCategoryPage() {
  const categoryCards = cards
    .filter((card) => card.virtualCardSupported)
    .sort((a, b) => b.overallScore - a.overallScore);

  return (
    <CategoryPage
      title="虚拟卡专区"
      description="适合线上消费与订阅服务的虚拟卡选择。申请前请确认所在地区、KYC 要求及移动支付可用性。"
      cards={categoryCards}
    />
  );
}
