import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { Badge } from "@/components/Badge";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { guideArticles } from "@/lib/guides";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "U 卡指南",
  description:
    "了解什么是 U 卡、如何充值 USDT、如何绑定 Apple Pay、KYC、冻结处理、日本用户选择和手续费注意事项。",
  alternates: { canonical: absoluteUrl("/guides") },
};

export default function GuidesPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "U 卡指南",
          url: absoluteUrl("/guides"),
          inLanguage: "zh-CN",
          blogPost: guideArticles.map((article) => ({
            "@type": "BlogPosting",
            headline: article.title,
            url: absoluteUrl(`/guides/${article.slug}`),
          })),
        }}
      />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "指南" }]} />
        <div className="mb-8 max-w-4xl">
          <h1 className="text-3xl font-semibold text-slate-950">文章 / 指南</h1>
          <p className="mt-3 text-base leading-7 text-slate-600">
            内容栏目用于 SEO 和用户教育，帮助中文用户在申请前理解费用、KYC、充值、移动支付和风控边界。
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {guideArticles.map((article) => (
            <Link
              href={`/guides/${article.slug}`}
              key={article.slug}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5 hover:border-blue-200 hover:bg-blue-50"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white">
                  <BookOpen className="h-5 w-5" />
                </span>
                <Badge tone="neutral">{article.readingTime}</Badge>
              </div>
              <h2 className="mt-5 text-lg font-semibold text-slate-950">{article.title}</h2>
              <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">{article.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {article.keywords.slice(0, 3).map((keyword) => (
                  <Badge key={keyword} tone="info">
                    {keyword}
                  </Badge>
                ))}
              </div>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-blue-700">
                阅读
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
