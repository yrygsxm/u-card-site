import { Database, ExternalLink } from "lucide-react";
import type { PaymentscanMetrics } from "@/lib/paymentscan";

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">{label}</div>
      <div className="mt-2 font-mono text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">{value}</div>
    </div>
  );
}

export function PaymentscanMetricsPanel({ metrics }: { metrics: PaymentscanMetrics }) {
  return (
    <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
            <Database className="h-5 w-5" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-700">第三方链上指标</p>
            <h2 className="mt-1 text-xl font-semibold text-slate-950">Paymentscan 数据</h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">抓取日期：{metrics.observedAt} · 月度序列截至 {metrics.dataThrough}</p>
          </div>
        </div>
        <a
          href={metrics.sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
        >
          查看 Paymentscan 来源
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <Metric label="累计链上量" value={metrics.totalVolume} />
        <Metric label="累计交易数" value={metrics.totalTransactions} />
        <Metric label="累计活跃地址" value={metrics.totalAddresses} />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-xl border border-slate-200 p-4">
          <div className="text-sm font-semibold text-slate-950">统计口径</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {metrics.activityTypes.map((activity) => (
              <span key={activity} className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                {activity}
              </span>
            ))}
          </div>
          <div className="mt-5 text-sm font-semibold text-slate-950">结算链</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {metrics.settlementChains.map((chain) => (
              <span key={chain} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                {chain}
              </span>
            ))}
          </div>
        </div>

        <dl className="grid gap-x-4 gap-y-3 rounded-xl border border-slate-200 p-4 sm:grid-cols-2">
          {metrics.cardDetails.map((detail) => (
            <div key={detail.label}>
              <dt className="text-xs font-medium text-slate-500">{detail.label}</dt>
              <dd className="mt-1 text-sm font-semibold leading-5 text-slate-800">{detail.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <p className="mt-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs font-medium leading-5 text-amber-700">
        {metrics.scopeNote ?? "该模块为 Paymentscan 的公开链上可归因统计，可能不覆盖链下流量或全部基础设施；请勿将其单独视为完整消费规模。"}
      </p>
    </section>
  );
}
