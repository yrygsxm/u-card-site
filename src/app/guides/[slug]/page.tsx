import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/Badge";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { getGuide, guideArticles } from "@/lib/guides";
import { absoluteUrl } from "@/lib/site";

export function generateStaticParams() {
  return guideArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getGuide(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: absoluteUrl(`/guides/${article.slug}`) },
    openGraph: {
      title: article.title,
      description: article.description,
      url: absoluteUrl(`/guides/${article.slug}`),
      type: "article",
    },
  };
}

export default async function GuideDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getGuide(slug);
  if (!article) notFound();

  const related = guideArticles.filter((item) => item.slug !== article.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.description,
          url: absoluteUrl(`/guides/${article.slug}`),
          inLanguage: "zh-CN",
        }}
      />
      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "指南", href: "/guides" }, { label: article.title }]} />
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-950/5 sm:p-8">
          <div className="flex flex-wrap gap-2">
            {article.keywords.map((keyword) => (
              <Badge key={keyword} tone="info">
                {keyword}
              </Badge>
            ))}
            <Badge>{article.readingTime}</Badge>
          </div>
          <h1 className="mt-5 text-3xl font-semibold leading-tight text-slate-950">{article.title}</h1>
          <p className="mt-4 text-base leading-7 text-slate-600">{article.description}</p>
          <div className="mt-8 space-y-8">
            {article.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-xl font-semibold text-slate-950">{section.heading}</h2>
                <div className="mt-3 space-y-3">
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="text-base leading-8 text-slate-700">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
          <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-800">
            费用、地区限制、KYC 要求和权益规则可能随时调整。申请或充值前，请以官方公告、服务条款和账户内展示为准。
          </div>
        </article>
        <section className="mt-8">
          <h2 className="text-lg font-semibold text-slate-950">相关指南</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/guides/${item.slug}`}
                className="rounded-2xl border border-slate-200 bg-white p-4 text-sm font-medium text-slate-700 hover:border-blue-200 hover:bg-blue-50"
              >
                <span>{item.title}</span>
                <ArrowRight className="mt-3 h-4 w-4 text-blue-700" />
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
