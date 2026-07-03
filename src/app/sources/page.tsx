import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { allSourceLinks } from "@/lib/cards";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "官方来源与免责声明",
  description:
    "查看 U 卡对比网站使用的官方产品页、帮助中心和费用说明来源，以及金融、投资、税务和法律免责声明。",
  alternates: { canonical: absoluteUrl("/sources") },
};

export default function SourcesPage() {
  const sources = allSourceLinks();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "官方来源与免责声明",
          url: absoluteUrl("/sources"),
          inLanguage: "zh-CN",
        }}
      />
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "来源" }]} />
        <h1 className="text-3xl font-semibold text-slate-950">官方来源与免责声明</h1>
        <p className="mt-3 text-base leading-7 text-slate-600">
          当前站点内置的是可开发示例数据。上线前应建立人工复核流程，记录抓取时间、条款版本、地区页面和截图证据。
        </p>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
          <h2 className="text-xl font-semibold text-slate-950">来源链接</h2>
          <div className="mt-5 grid gap-3">
            {sources.map((source) => (
              <a
                key={source.url}
                href={source.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm hover:border-blue-200 hover:bg-blue-50"
              >
                <span>
                  <span className="font-semibold text-slate-900">{source.label}</span>
                  <span className="ml-2 text-slate-500">{source.cardName}</span>
                </span>
                <ExternalLink className="h-4 w-4 shrink-0 text-blue-700" />
              </a>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <h2 className="text-xl font-semibold text-amber-950">免责声明</h2>
          <p className="mt-3 text-sm leading-7 text-amber-900">
            本站内容仅用于信息整理和产品对比，不构成金融建议、投资建议、税务建议或法律建议。加密资产和相关金融产品存在价格波动、账户限制、政策变化和服务中止风险。所有费用、返现、地区限制、KYC 要求和权益规则可能随时调整，请以官方公告和服务条款为准。
          </p>
        </section>
      </main>
    </>
  );
}
