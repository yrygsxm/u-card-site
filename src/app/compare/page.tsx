import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CompareTable } from "@/components/CompareTable";
import { JsonLd } from "@/components/JsonLd";
import { cards } from "@/lib/cards";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "U 卡横向对比",
  description:
    "选择 2-5 张 U 卡，对比费用、KYC、地区、限额、返现、Apple Pay、ATM、风控和适合人群。",
  alternates: { canonical: absoluteUrl("/compare") },
};

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<{ cards?: string }>;
}) {
  const params = await searchParams;
  const initialSlugs = params.cards?.split(",").filter(Boolean) ?? [];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "U 卡横向对比",
          url: absoluteUrl("/compare"),
          inLanguage: "zh-CN",
        }}
      />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "横向对比" }]} />
        <div className="mb-8 max-w-4xl">
          <h1 className="text-3xl font-semibold text-slate-950">U 卡横向对比</h1>
          <p className="mt-3 text-base leading-7 text-slate-600">
            对比表包含产品、官网、卡组织、地区、申请条件、KYC、虚拟卡、实体卡、费用、限额、稳定币、移动支付、返现、风控、客服和适合人群。桌面端固定首列，移动端自动切换为卡片式对比。
          </p>
        </div>
        <CompareTable cards={cards} initialSlugs={initialSlugs} />
      </main>
    </>
  );
}
