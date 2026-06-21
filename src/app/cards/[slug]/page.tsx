import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ExternalLink, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/Badge";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CardApplicationButton } from "@/components/CardApplicationDialog";
import { CardVisual } from "@/components/CardVisual";
import { JsonLd } from "@/components/JsonLd";
import { ScoreBreakdown } from "@/components/ScoreBreakdown";
import { cards, getCard, supportLabel } from "@/lib/cards";
import { absoluteUrl } from "@/lib/site";

export function generateStaticParams() {
  return cards.map((card) => ({ slug: card.slug }));
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

  const feeRows = [
    ["开卡费", card.openingFee],
    ["月费", card.monthlyFee],
    ["年费", card.annualFee],
    ["充值费", card.topUpFee],
    ["消费费", card.spendingFee],
    ["外汇费", card.fxFee],
    ["ATM 取现费", card.atmWithdrawalFee],
    ["免费 ATM 额度", card.freeAtmLimit],
  ];

  const experienceRows = [
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
          <div className="space-y-5">
            <CardVisual card={card} />
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm text-slate-500">综合评分</div>
                  <div className="mt-1 font-mono text-4xl font-semibold text-slate-950">{card.overallScore}</div>
                </div>
                <Badge tone={card.riskLevel.includes("高") ? "warning" : "positive"}>风险：{card.riskLevel}</Badge>
              </div>
              <div className="mt-5">
                <ScoreBreakdown card={card} />
              </div>
            </div>
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
              <Link
                href={`/compare?cards=${card.slug},${cards.filter((item) => item.slug !== card.slug).slice(0, 2).map((item) => item.slug).join(",")}`}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                加入对比
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <dl className="mt-8 grid gap-4 sm:grid-cols-2">
              <SummaryBox label="最后更新" value={card.lastUpdated} />
              <SummaryBox label="资料状态" value={card.sourceStatus} />
              <SummaryBox label="适合人群" value={card.suitableFor.join(" / ")} />
              <SummaryBox label="最大风险" value={card.freezeRisk} />
            </dl>
          </div>
        </section>

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
              ["支持地区", card.supportedRegions.join(" / ")],
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

        <section className="mt-8 rounded-2xl border border-rose-200 bg-rose-50 p-5">
          <div className="flex items-start gap-3">
            <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-rose-700" />
            <div>
              <h2 className="text-lg font-semibold text-rose-950">风险提示</h2>
              <ul className="mt-3 grid gap-2 text-sm leading-6 text-rose-800 md:grid-cols-2">
                <li>地区政策和发卡方规则可能变化。</li>
                <li>KYC 失败、资料复核或地址证明不足可能导致申请失败。</li>
                <li>账户冻结、消费拒付和资金来源审查可能发生。</li>
                <li>返现活动、权益等级和费用规则可能随时调整。</li>
                <li>加密资产价格波动和兑换价差会影响实际成本。</li>
                <li>本站内容不构成投资、税务、法律或金融建议。</li>
              </ul>
            </div>
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

function SummaryBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-950/5">
      <dt className="text-xs font-medium text-slate-500">{label}</dt>
      <dd className="mt-2 text-sm leading-6 text-slate-800">{value}</dd>
    </div>
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
  const toneClass = {
    positive: "border-emerald-200 bg-emerald-50 text-emerald-900",
    warning: "border-amber-200 bg-amber-50 text-amber-900",
    negative: "border-rose-200 bg-rose-50 text-rose-900",
  }[tone];

  return (
    <div className={`rounded-2xl border p-5 ${toneClass}`}>
      <h2 className="text-lg font-semibold">{title}</h2>
      <ul className="mt-3 space-y-2 text-sm leading-6">
        {items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}

function DataTable({ title, rows }: { title: string; rows: string[][] }) {
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
