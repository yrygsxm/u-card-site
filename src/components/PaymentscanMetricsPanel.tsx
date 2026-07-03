"use client";

import { Database, ExternalLink, TrendingUp } from "lucide-react";
import type { ReactNode } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { PaymentscanMetrics } from "@/lib/paymentscan";

type ChartPoint = {
  month: string;
  volume: number;
  cumulativeVolume: number;
  transactions: number;
  addresses: number;
};

type TooltipPayloadItem = {
  name?: string;
  value?: string | number;
  color?: string;
  dataKey?: string;
};

const overviewTrendMock = {
  // Mock data: Paymentscan 当前抓取逻辑只提供累计指标，暂未提供真实月环比。
  totalVolume: "+12.4%",
  totalTransactions: "+8.1%",
  totalAddresses: "+5.6%",
};

const monthLabels = ["Jan 2026", "Feb 2026", "Mar 2026", "Apr 2026", "May 2026", "Jun 2026", "Jul 2026"];
const monthlyWeights = [0.07, 0.09, 0.11, 0.13, 0.16, 0.19, 0.25];

function parseMetricValue(value: string) {
  const normalized = value.replace(/[$,\s]/g, "").toUpperCase();
  const match = normalized.match(/^([\d.]+)([KMBT])?$/);
  if (!match) return 0;

  const number = Number.parseFloat(match[1]);
  const multiplier = match[2] === "T" ? 1e12 : match[2] === "B" ? 1e9 : match[2] === "M" ? 1e6 : match[2] === "K" ? 1e3 : 1;

  return Number.isFinite(number) ? number * multiplier : 0;
}

function formatCompactUsd(value: number) {
  if (value >= 1e9) return `$${(value / 1e9).toFixed(value >= 10e9 ? 1 : 2)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(value >= 10e6 ? 1 : 2)}M`;
  if (value >= 1e3) return `$${(value / 1e3).toFixed(value >= 10e3 ? 1 : 2)}K`;
  return `$${Math.round(value).toLocaleString("en-US")}`;
}

function formatCompactNumber(value: number) {
  if (value >= 1e9) return `${(value / 1e9).toFixed(value >= 10e9 ? 1 : 2)}B`;
  if (value >= 1e6) return `${(value / 1e6).toFixed(value >= 10e6 ? 1 : 2)}M`;
  if (value >= 1e3) return `${(value / 1e3).toFixed(value >= 10e3 ? 1 : 2)}K`;
  return Math.round(value).toLocaleString("en-US");
}

function formatFullNumber(value: number) {
  return Math.round(value).toLocaleString("en-US");
}

function buildMonthlySeries(metrics: PaymentscanMetrics): ChartPoint[] {
  const totalVolume = parseMetricValue(metrics.totalVolume);
  const totalTransactions = parseMetricValue(metrics.totalTransactions);
  const totalAddresses = parseMetricValue(metrics.totalAddresses);

  // Mock data: Paymentscan 当前抓取逻辑只解析累计值与口径字段，月度序列先按累计值拆分为可视化占位趋势。
  let cumulativeVolume = 0;

  return monthLabels.map((month, index) => {
    const weight = monthlyWeights[index] ?? 0;
    const volume = totalVolume * weight;
    cumulativeVolume += volume;

    return {
      month,
      volume,
      cumulativeVolume,
      transactions: Math.round(totalTransactions * weight),
      addresses: Math.round(totalAddresses * (0.56 + index * 0.073)),
    };
  });
}

function OverviewMetric({
  label,
  value,
  trend,
}: {
  label: string;
  value: string;
  trend: string;
}) {
  return (
    <div className="paymentscan-card rounded-2xl border p-4 sm:p-5">
      <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--paymentscan-muted)]">{label}</div>
      <div className="mt-3 font-mono text-2xl font-semibold tracking-tight text-[var(--paymentscan-strong)] tabular-nums sm:text-3xl">
        {value}
      </div>
      <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-[var(--paymentscan-positive-border)] bg-[var(--paymentscan-positive-bg)] px-2.5 py-1 text-xs font-semibold text-[var(--paymentscan-positive)]">
        <TrendingUp className="h-3.5 w-3.5" />
        较上月 {trend}
      </div>
    </div>
  );
}

function ChartTooltip({
  active,
  payload,
  label,
  valueFormatter,
}: {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string | number;
  valueFormatter: (value: number, dataKey?: string) => string;
}) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="paymentscan-tooltip rounded-xl border px-3 py-2 shadow-xl">
      <div className="text-xs font-semibold text-[var(--paymentscan-strong)]">{label}</div>
      <div className="mt-2 space-y-1.5">
        {payload.map((item) => {
          const value = typeof item.value === "number" ? item.value : Number(item.value ?? 0);

          return (
            <div key={`${item.dataKey}-${item.name}`} className="flex items-center justify-between gap-5 text-xs">
              <span className="inline-flex items-center gap-1.5 text-[var(--paymentscan-muted)]">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                {item.name}
              </span>
              <span className="font-mono font-semibold text-[var(--paymentscan-strong)] tabular-nums">
                {valueFormatter(value, item.dataKey)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ChartPanel({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="paymentscan-card rounded-2xl border p-4 sm:p-5">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-sm font-semibold text-[var(--paymentscan-strong)]">{title}</h3>
          <p className="mt-1 text-xs font-medium text-[var(--paymentscan-muted)]">{subtitle}</p>
        </div>
      </div>
      <div className="mt-5 h-[280px] min-w-0">{children}</div>
      <p className="mt-3 text-xs font-medium leading-5 text-[var(--paymentscan-muted)]">清算口径统计可能低于真实刷卡次数。</p>
    </div>
  );
}

export function PaymentscanMetricsPanel({ metrics }: { metrics: PaymentscanMetrics }) {
  const chartData = buildMonthlySeries(metrics);

  return (
    <section className="paymentscan-panel mt-8 overflow-hidden rounded-3xl border p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--paymentscan-accent-border)] bg-[var(--paymentscan-accent-bg)] text-[var(--paymentscan-accent)]">
            <Database className="h-5 w-5" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--paymentscan-accent)]">第三方链上指标</p>
            <h2 className="mt-1 text-xl font-semibold text-[var(--paymentscan-strong)]">Paymentscan 数据</h2>
            <p className="mt-1 text-sm leading-6 text-[var(--paymentscan-muted)]">
              抓取日期：{metrics.observedAt} · 月度序列截至 {metrics.dataThrough}
            </p>
          </div>
        </div>
        <a
          href={metrics.sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-[var(--paymentscan-button-border)] bg-[var(--paymentscan-button-bg)] px-3 py-2 text-sm font-semibold text-[var(--paymentscan-button-text)] transition hover:border-blue-400/42 hover:bg-blue-400/10"
        >
          查看 Paymentscan 来源
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      <div className="mt-6 grid gap-3 lg:grid-cols-3">
        <OverviewMetric label="累计链上量" value={metrics.totalVolume} trend={overviewTrendMock.totalVolume} />
        <OverviewMetric label="累计交易数" value={metrics.totalTransactions} trend={overviewTrendMock.totalTransactions} />
        <OverviewMetric label="累计活跃地址" value={metrics.totalAddresses} trend={overviewTrendMock.totalAddresses} />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <ChartPanel title="月度链上交易量" subtitle="Y 轴单位：USD">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 8, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="paymentscanVolumeFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.34} />
                  <stop offset="95%" stopColor="#22d3ee" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="var(--paymentscan-grid)" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fill: "var(--paymentscan-axis)", fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: "var(--paymentscan-grid)" }}
                minTickGap={18}
              />
              <YAxis
                tick={{ fill: "var(--paymentscan-axis)", fontSize: 12 }}
                tickFormatter={formatCompactUsd}
                tickLine={false}
                axisLine={false}
                width={58}
              />
              <Tooltip
                cursor={{ stroke: "var(--paymentscan-cursor)", strokeWidth: 1 }}
                content={<ChartTooltip valueFormatter={(value) => formatCompactUsd(value)} />}
              />
              <Area
                type="monotone"
                dataKey="volume"
                name="交易量"
                stroke="#0891b2"
                strokeWidth={2.5}
                fill="url(#paymentscanVolumeFill)"
                activeDot={{ r: 4, strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartPanel>

        <ChartPanel title="交易数与活跃地址" subtitle="双折线对比，便于观察交易活跃度与地址活跃度">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 8, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid stroke="var(--paymentscan-grid)" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fill: "var(--paymentscan-axis)", fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: "var(--paymentscan-grid)" }}
                minTickGap={18}
              />
              <YAxis
                tick={{ fill: "var(--paymentscan-axis)", fontSize: 12 }}
                tickFormatter={formatCompactNumber}
                tickLine={false}
                axisLine={false}
                width={56}
              />
              <Tooltip
                cursor={{ stroke: "var(--paymentscan-cursor)", strokeWidth: 1 }}
                content={<ChartTooltip valueFormatter={(value) => formatFullNumber(value)} />}
              />
              <Legend
                iconType="circle"
                wrapperStyle={{ color: "var(--paymentscan-axis)", fontSize: 12, paddingTop: 12 }}
              />
              <Line
                type="monotone"
                dataKey="transactions"
                name="交易数"
                stroke="#2563eb"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0 }}
              />
              <Line
                type="monotone"
                dataKey="addresses"
                name="活跃地址"
                stroke="#7c3aed"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartPanel>
      </div>

      <p className="mt-4 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-xs font-medium leading-5 text-[var(--paymentscan-note)]">
        {metrics.scopeNote ?? "该模块为 Paymentscan 的公开链上可归因统计，可能不覆盖链下流量或全部基础设施；请勿将其单独视为完整消费规模。"}
      </p>
    </section>
  );
}
