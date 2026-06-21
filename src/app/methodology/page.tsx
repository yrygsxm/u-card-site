import type { Metadata } from "next";
import { Badge } from "@/components/Badge";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { scoreWeights } from "@/lib/cards";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "评分方法、数据结构与前端实现方案",
  description:
    "U 卡对比网站的信息架构、页面设计、统一数据结构、评分规则、UI 组件清单、文案示例和移动端适配方案。",
  alternates: { canonical: absoluteUrl("/methodology") },
};

const dataFields = [
  "cardName",
  "brandLogo",
  "issuer",
  "cardNetwork",
  "officialWebsite",
  "supportedRegions",
  "restrictedRegions",
  "kycRequired",
  "kycDocuments",
  "proofOfAddressRequired",
  "virtualCardSupported",
  "physicalCardSupported",
  "metalCardSupported",
  "applePaySupported",
  "googlePaySupported",
  "paypalSupported",
  "curveSupported",
  "supportedCurrencies",
  "supportedStablecoins",
  "topUpMethods",
  "openingFee",
  "monthlyFee",
  "annualFee",
  "topUpFee",
  "spendingFee",
  "fxFee",
  "atmWithdrawalFee",
  "freeAtmLimit",
  "cashbackRate",
  "cashbackCap",
  "cashbackCurrency",
  "cashbackCycle",
  "cashbackRequirements",
  "singleTransactionLimit",
  "monthlySpendingLimit",
  "atmSingleLimit",
  "atmMonthlyLimit",
  "riskLevel",
  "freezeRisk",
  "customerSupportRating",
  "suitableFor",
  "notSuitableFor",
  "pros",
  "cons",
  "summary",
  "lastUpdated",
  "sourceLinks",
  "overallScore",
];

const architecture = [
  ["首页", "首屏定位、搜索、快速筛选、热门 U 卡、核心卖点、费用/返现计算器、地区匹配推荐。"],
  ["U 卡列表页", "完整筛选、排序、紧凑卡片、收藏、加入对比、桌面浮窗和移动底部对比栏。"],
  ["对比页", "2-5 张卡横向对比，固定首列、横向滚动、优势/劣势高亮、移动端卡片式对比。"],
  ["详情页", "产品摘要、评分拆解、费用、地区与 KYC、体验、返现、风险、来源链接。"],
  ["排行榜页", "综合、日本、高返现、低费率、虚拟卡、实体卡、旅行、ATM、新手、低风险榜。"],
  ["指南页", "什么是 U 卡、USDT 充值、Apple Pay、KYC、冻结处理、日本/大陆用户等 SEO 文章。"],
];

const components = [
  "Navigation / Footer",
  "CardExplorer",
  "CardVisual",
  "CompareTable",
  "CalculatorPanel",
  "RegionMatcher",
  "ScoreBreakdown",
  "RankingBoard",
  "Breadcrumbs",
  "Badge",
  "JsonLd",
];

export default function MethodologyPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          name: "评分方法、数据结构与前端实现方案",
          url: absoluteUrl("/methodology"),
          inLanguage: "zh-CN",
        }}
      />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "评分方法" }]} />
        <div className="mb-8 max-w-4xl">
          <h1 className="text-3xl font-semibold text-slate-950">评分方法、数据结构与实现方案</h1>
          <p className="mt-3 text-base leading-7 text-slate-600">
            这个页面把产品需求转成可开发的模块、字段、组件和交互逻辑。后续接 CMS、数据库或人工审核后台时，可以直接复用当前数据结构。
          </p>
        </div>

        <section className="grid gap-4 lg:grid-cols-2">
          {architecture.map(([title, text]) => (
            <div key={title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
              <h2 className="text-lg font-semibold text-slate-950">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
            </div>
          ))}
        </section>

        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
          <h2 className="text-xl font-semibold text-slate-950">100 分制评分规则</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {scoreWeights.map((item) => (
              <div key={item.label} className="rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-semibold text-slate-950">{item.label}</h3>
                  <Badge tone="dark">{item.max} 分</Badge>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.reason}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
            <h2 className="text-xl font-semibold text-slate-950">统一数据结构</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              每张卡使用同一套字段，费用显示值和计算器数值分离，来源链接作为必填数组保存。
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {dataFields.map((field) => (
                <Badge key={field} tone="neutral">
                  {field}
                </Badge>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
            <h2 className="text-xl font-semibold text-slate-950">UI 组件清单</h2>
            <div className="mt-4 grid gap-2">
              {components.map((component) => (
                <div key={component} className="rounded-xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                  {component}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-4 md:grid-cols-3">
          <TextPanel
            title="页面文案示例"
            text="选择适合你的加密货币银行卡。先确认地区和 KYC，再比较费用、返现、移动支付、ATM 和风控限制。所有信息以官方最新说明为准。"
          />
          <TextPanel
            title="前端实现建议"
            text="使用 Next.js App Router 生成独立 SEO 页面；数据先放 TypeScript，后续可迁移到 CMS；筛选、对比和计算器作为客户端组件。"
          />
          <TextPanel
            title="移动端适配方案"
            text="列表使用单列卡片；对比页从表格切换为卡片；底部固定对比栏只在已选择卡片时出现；表单控件保持 44px 以上高度。"
          />
        </section>
      </main>
    </>
  );
}

function TextPanel({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5">
      <h2 className="text-lg font-semibold text-slate-950">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}
