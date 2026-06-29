import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/Badge";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CardApplicationButton } from "@/components/CardApplicationDialog";
import { CardCompareButton } from "@/components/CardCompareButton";
import { CardVisual } from "@/components/CardVisual";
import { Animated3DCard } from "@/components/Animated3DCard";
import { JsonLd } from "@/components/JsonLd";
import { PaymentscanMetricsPanel } from "@/components/PaymentscanMetricsPanel";
import { RegionSummary } from "@/components/RegionSummary";
import { ScoreBreakdown } from "@/components/ScoreBreakdown";
import { cards, getCard, supportLabel } from "@/lib/cards";
import { getPaymentscanMetrics } from "@/lib/paymentscan";
import { absoluteUrl } from "@/lib/site";
import { todeyCards } from "@/lib/todey-cards.generated";

export const revalidate = 86_400;

export function generateStaticParams() {
  const slugs = new Set([...todeyCards.map((card) => card.slug), ...cards.map((card) => card.slug)]);
  return Array.from(slugs).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const card = getCard(slug);
  if (!card) return {};

  return {
    title: `${card.cardName} 费用、KYC、地区与风险`,
    description: card.summary,
    alternates: { canonical: absoluteUrl(`/cards/${card.slug}`) },
    openGraph: {
      title: `${card.cardName} 对比详情`,
      description: card.summary,
      url: absoluteUrl(`/cards/${card.slug}`),
    },
  };
}

export default async function CardDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const card = getCard(slug);
  if (!card) notFound();
  const paymentscanMetrics = await getPaymentscanMetrics(card.slug);
  const relatedCards = getRelatedCards(card.slug);

  const feeRows: Array<[string, ReactNode]> = [
    ["开卡费", card.openingFee],
    ["月费", card.monthlyFee],
    ["年费", card.annualFee],
    ["充值费", card.topUpFee],
    ["消费费", card.spendingFee],
    ["外汇费", card.fxFee],
    ["ATM 取现费", card.atmWithdrawalFee],
    ["免费 ATM 额度", card.freeAtmLimit],
  ];

  const experienceRows: Array<[string, ReactNode]> = [
    ["虚拟卡", card.virtualCardSupported ? "支持" : "不支持"],
    ["实体卡", card.physicalCardSupported ? "支持" : "不支持"],
    ["金属卡", card.metalCardSupported ? "支持" : "不支持"],
    ["Apple Pay", supportLabel(card.applePaySupported)],
    ["Google Pay", supportLabel(card.googlePaySupported)],
    ["PayPal", supportLabel(card.paypalSupported)],
    ["Curve", supportLabel(card.curveSupported)],
    ["主要场景", card.scenarios.join(" / ")],
  ];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FinancialProduct",
          name: card.cardName,
          description: card.summary,
          url: absoluteUrl(`/cards/${card.slug}`),
          provider: card.issuer,
          areaServed: card.supportedRegions,
        }}
      />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "U 卡列表", href: "/cards" }, { label: card.cardName }]} />

        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Animated3DCard>
              <CardVisual card={card} interactive={false} />
            </Animated3DCard>
          </div>

          <div>
            <div className="flex flex-wrap gap-2">
              {card.tags.map((tag) => (
                <Badge key={tag} tone="info">
                  {tag}
                </Badge>
              ))}
              {card.riskTags.map((tag) => (
                <Badge key={tag} tone="warning">
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="mt-5 text-3xl font-semibold leading-tight text-slate-950 sm:text-4xl">{card.cardName}</h1>
            <p className="mt-4 text-lg leading-8 text-slate-700">{card.summary}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <CardApplicationButton card={card} />
              <a
                href={card.officialWebsite}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                官方网站
                <ExternalLink className="h-4 w-4" />
              </a>
              <CardCompareButton slug={card.slug} cardName={card.cardName} />
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-sm font-medium text-slate-500">综合评分</div>
              <div className="mt-1 font-mono text-4xl font-semibold tracking-tight text-slate-950">
                {card.overallScore}
                <span className="ml-1 text-base font-medium text-slate-500">/100</span>
              </div>
            </div>
            <Badge tone={card.riskLevel.includes("高") ? "warning" : "positive"}>风险：{card.riskLevel}</Badge>
          </div>
          <div className="mt-6 text-sm font-semibold text-slate-950">评分拆解</div>
          <p className="mt-1 text-sm text-slate-500">基于费用、返现、地区、支付、风险、体验与透明度。</p>
          <div className="mt-5">
            <ScoreBreakdown card={card} />
          </div>
        </section>

        {paymentscanMetrics ? <PaymentscanMetricsPanel metrics={paymentscanMetrics} /> : null}

        <section className="mt-12 grid gap-6 lg:grid-cols-3">
          <InfoPanel title="主要优点" items={card.pros} tone="positive" />
          <InfoPanel title="主要缺点" items={card.cons} tone="warning" />
          <InfoPanel title="不适合人群" items={card.notSuitableFor} tone="negative" />
        </section>

        <section className="mt-12 grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <DataTable title="费用概览" rows={feeRows} />
          <DataTable
            title="地区与 KYC"
            rows={[
              [
                "支持地区",
                <RegionSummary
                  key={`${card.slug}-supported-regions`}
                  regions={card.supportedRegions}
                  title={`${card.cardName} 支持地区`}
                />,
              ],
              ["限制地区", card.restrictedRegions.join(" / ")],
              ["申请条件", card.residencyRequirement],
              ["KYC 文件", card.kycDocuments.join(" / ")],
              ["地址证明", supportLabel(card.proofOfAddressRequired)],
              ["中国大陆护照", supportLabel(card.mainlandChinaPassportSupport)],
              ["日本在留卡", supportLabel(card.japanResidenceCardSupport)],
              ["香港身份", supportLabel(card.hongKongIdSupport)],
            ]}
          />
        </section>

        <section className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1fr]">
          <DataTable title="使用体验" rows={experienceRows} />
          <DataTable
            title="返现与限额"
            rows={[
              ["返现比例", card.cashbackRate],
              ["返现上限", card.cashbackCap],
              ["返现币种", card.cashbackCurrency],
              ["发放周期", card.cashbackCycle],
              ["限制条件", card.cashbackRequirements],
              ["单笔消费限额", card.singleTransactionLimit],
              ["月消费限额", card.monthlySpendingLimit],
              ["单笔取现限额", card.atmSingleLimit],
              ["月取现限额", card.atmMonthlyLimit],
            ]}
          />
        </section>

        <section className="mt-8">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div>
              <p className="text-sm font-medium text-slate-500">随机推荐</p>
              <h2 className="mt-1 text-xl font-semibold text-slate-950">你可能还想了解</h2>
            </div>
            <Link href="/cards" className="text-sm font-semibold text-blue-700 hover:text-blue-800">
              查看全部 U 卡
            </Link>
          </div>
          <div className="mt-4 grid grid-flow-col auto-cols-[minmax(11rem,1fr)] gap-3 overflow-x-auto pb-1 lg:grid-flow-row lg:grid-cols-5 lg:overflow-visible lg:pb-0">
            {relatedCards.map((relatedCard) => (
              <Link
                key={relatedCard.slug}
                href={`/cards/${relatedCard.slug}`}
                className="group block rounded-2xl border border-slate-200 bg-white p-2 shadow-sm shadow-slate-950/5 transition-all duration-150 ease-out hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-950/10 motion-reduce:transform-none"
              >
                <CardVisual card={relatedCard} compact />
                <div className="px-1 pb-1 pt-3">
                  <h3 className="text-base font-semibold text-slate-950">{relatedCard.cardName}</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {relatedCard.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} tone="info">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
          <h2 className="text-lg font-semibold text-slate-950">官方来源</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {card.sourceLinks.map((source) => (
              <a
                key={source.url}
                href={source.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 hover:border-blue-200 hover:bg-blue-50"
              >
                {source.label}
                <ExternalLink className="h-4 w-4 shrink-0 text-blue-700" />
              </a>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

function InfoPanel({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: "positive" | "warning" | "negative";
}) {
  const toneStyle = {
    positive: {
      surface: "border-emerald-200 bg-emerald-50",
      text: "text-emerald-700",
    },
    warning: {
      surface: "border-amber-200 bg-amber-50",
      text: "text-amber-700",
    },
    negative: {
      surface: "border-rose-200 bg-rose-50",
      text: "text-rose-900",
    },
  }[tone];

  return (
    <div className={`rounded-2xl border p-5 ${toneStyle.surface}`}>
      <h2 className={`text-lg font-bold tracking-tight ${toneStyle.text}`}>{title}</h2>
      <ul className={`mt-4 space-y-3 text-sm font-medium leading-6 ${toneStyle.text}`}>
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span aria-hidden="true">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DataTable({ title, rows }: { title: string; rows: Array<[string, ReactNode]> }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
      <h2 className="text-lg font-semibold text-slate-950">{title}</h2>
      <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
        <table className="w-full border-separate border-spacing-0 text-left text-sm">
          <tbody>
            {rows.map(([label, value]) => (
              <tr key={label}>
                <th className="w-36 border-b border-slate-100 bg-slate-50 px-4 py-3 align-top font-medium text-slate-600">
                  {label}
                </th>
                <td className="border-b border-slate-100 px-4 py-3 leading-6 text-slate-800">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function getRelatedCards(currentCardSlug: string) {
  let seed = Array.from(currentCardSlug).reduce(
    (value, character) => (value * 31 + character.charCodeAt(0)) >>> 0,
    2_166_136_261,
  );

  return cards
    .filter((item) => item.slug !== currentCardSlug)
    .map((item) => {
      seed = (seed * 1_664_525 + 1_013_904_223) >>> 0;
      return { item, sortOrder: seed };
    })
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .slice(0, 5)
    .map(({ item }) => item);
}
