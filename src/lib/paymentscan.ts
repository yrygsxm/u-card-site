export type PaymentscanMetrics = {
  sourceUrl: string;
  observedAt: string;
  dataThrough: string;
  totalVolume: string;
  totalTransactions: string;
  totalAddresses: string;
  activityTypes: string[];
  settlementChains: string[];
  cardDetails: Array<{ label: string; value: string }>;
  scopeNote?: string;
};

export type PaymentscanRefreshResult = {
  cardSlug: string;
  sourceUrl: string;
  status: "updated" | "fallback" | "missing";
  totalVolume?: string;
  observedAt?: string;
  error?: string;
};

export const PAYMENTSCAN_REFRESH_SECONDS = 60 * 60 * 24;

const observedAt = "2026-07-02";
const dataThrough = "Jul 2026";

function paymentscanCard(
  sourceSlug: string,
  metrics: Omit<PaymentscanMetrics, "sourceUrl" | "observedAt" | "dataThrough">,
): PaymentscanMetrics {
  return {
    ...metrics,
    sourceUrl: `https://paymentscan.xyz/cards/${sourceSlug}`,
    observedAt,
    dataThrough,
  };
}

export const paymentscanMetricsByCardSlug: Record<string, PaymentscanMetrics> = {
  "redotpay-card": paymentscanCard("redotpay", {
    totalVolume: "$6.09B",
    totalTransactions: "7,130,135",
    totalAddresses: "966,977",
    activityTypes: ["Top-Ups"],
    settlementChains: ["Arbitrum", "Base", "Bitcoin", "BSC", "Ethereum", "Polygon", "Solana", "Sonic", "TON", "TRON"],
    cardDetails: [
      { label: "上线时间", value: "Dec 2023" },
      { label: "借记消费", value: "不支持" },
      { label: "Apple Pay", value: "支持" },
      { label: "Google Pay", value: "支持" },
    ],
    scopeNote: "Paymentscan 追踪的是充值而非实际卡消费；该站指出约 20% 充值发生在链下，且链上充值量中最多约 10% 可能不是卡消费。",
  }),
  "kast-card": paymentscanCard("kast", {
    totalVolume: "$1.538B",
    totalTransactions: "1,788,868",
    totalAddresses: "222,177",
    activityTypes: ["Program-Issuer Settlements", "Top-Ups"],
    settlementChains: ["Arbitrum", "Avalanche", "Base", "BSC", "Ethereum", "Optimism", "Polygon", "Solana", "TRON"],
    cardDetails: [
      { label: "上线时间", value: "Jun 2024" },
      { label: "基础返现", value: "2%" },
      { label: "最高返现", value: "3%" },
      { label: "返现上限", value: "无上限" },
      { label: "外汇费", value: "0.5–1.75%" },
      { label: "ATM 费", value: "$3 + 2%" },
      { label: "Apple Pay / Google Pay", value: "支持 / 支持" },
    ],
    scopeNote: "Paymentscan 同时追踪充值与 Rain 的结算数据，并提示该卡追踪可能不完整，未包含 Rain 旧合约或其他发卡方的部分流量。",
  }),
  "etherfi-cash-card": paymentscanCard("etherfi", {
    totalVolume: "$1.124B",
    totalTransactions: "744,010",
    totalAddresses: "92,615",
    activityTypes: ["Spends", "Program-Issuer Settlements", "Top-Ups"],
    settlementChains: ["Optimism", "Scroll"],
    cardDetails: [
      { label: "上线时间", value: "Nov 2024" },
      { label: "基础返现", value: "3%" },
      { label: "最高返现", value: "4%" },
      { label: "返现上限", value: "$1,000–2,500/月" },
      { label: "外汇费", value: "1%" },
      { label: "ATM 费", value: "2%" },
      { label: "抵押借记", value: "支持" },
      { label: "Apple Pay / Google Pay", value: "支持 / 支持" },
    ],
  }),
  "plasma-one-card": paymentscanCard("plasma-one", {
    totalVolume: "$15.01M",
    totalTransactions: "96,532",
    totalAddresses: "10,722",
    activityTypes: ["Program-Issuer Settlements", "Clearing"],
    settlementChains: ["Plasma"],
    cardDetails: [
      { label: "上线时间", value: "Jan 2026" },
      { label: "基础返现", value: "2%" },
      { label: "最高返现", value: "4%（10% AI, flights）" },
      { label: "返现上限", value: "动态" },
      { label: "外汇费", value: "1%" },
      { label: "ATM 费", value: "—" },
      { label: "抵押借记", value: "不支持" },
      { label: "Apple Pay", value: "支持" },
      { label: "Google Pay", value: "支持" },
    ],
    scopeNote: "该站通过链上清算交易计数；每位卡用户每天只会发出一笔清算交易，因此多笔消费时交易数会低估真实使用次数。",
  }),
  "karta-card": paymentscanCard("karta", {
    totalVolume: "$154.8M",
    totalTransactions: "339",
    totalAddresses: "1",
    activityTypes: ["Program-Issuer Settlements"],
    settlementChains: ["Base"],
    cardDetails: [
      { label: "上线时间", value: "Aug 2024" },
      { label: "外汇费", value: "0–1%" },
      { label: "Apple Pay / Google Pay", value: "支持 / 支持" },
    ],
  }),
  "tria-card": paymentscanCard("tria", {
    totalVolume: "$115M",
    totalTransactions: "603,329",
    totalAddresses: "18,515",
    activityTypes: ["Spends"],
    settlementChains: ["Arbitrum", "Base", "Optimism", "Polygon", "Solana"],
    cardDetails: [
      { label: "上线时间", value: "Jul 2025" },
      { label: "基础返现", value: "1.5%" },
      { label: "最高返现", value: "6%" },
      { label: "返现上限", value: "$100K/年" },
      { label: "外汇费", value: "1%" },
      { label: "ATM 费", value: "3%" },
      { label: "抵押借记", value: "即将推出" },
      { label: "Apple Pay / Google Pay", value: "支持 / 支持" },
    ],
  }),
  "cypher-card": paymentscanCard("cypher", {
    totalVolume: "$202.9M",
    totalTransactions: "276,008",
    totalAddresses: "24,110",
    activityTypes: ["Top-Ups"],
    settlementChains: ["Arbitrum", "Avalanche", "Base", "BSC", "Ethereum", "Gnosis", "HyperEVM", "Optimism", "Plasma", "Polygon", "Solana", "zkSync"],
    cardDetails: [
      { label: "上线时间", value: "Nov 2023" },
      { label: "基础返现", value: "浮动" },
      { label: "ATM 费", value: "2–3%" },
      { label: "Apple Pay / Google Pay", value: "支持 / 支持" },
    ],
    scopeNote: "Paymentscan 对 Cypher 追踪的是充值口径，不等同于实际卡消费。",
  }),
  "kolo-card": paymentscanCard("kolo", {
    totalVolume: "$57.53M",
    totalTransactions: "492",
    totalAddresses: "5",
    activityTypes: ["Program-Issuer Settlements"],
    settlementChains: ["Arbitrum", "Base", "Ethereum", "Optimism", "Polygon"],
    cardDetails: [
      { label: "上线时间", value: "Feb 2025" },
      { label: "基础返现", value: "1%" },
      { label: "最高返现", value: "2%" },
      { label: "返现上限", value: "$100" },
      { label: "外汇费", value: "1%" },
      { label: "ATM 费", value: "不适用" },
      { label: "Apple Pay / Google Pay", value: "支持 / 支持" },
    ],
  }),
  "ready-card": paymentscanCard("ready", {
    totalVolume: "$60.29M",
    totalTransactions: "484,608",
    totalAddresses: "13,416",
    activityTypes: ["Spends"],
    settlementChains: ["Starknet"],
    cardDetails: [
      { label: "上线时间", value: "Nov 2024" },
      { label: "基础返现", value: "0.5%" },
      { label: "最高返现", value: "3%" },
      { label: "返现上限", value: "$150/月" },
      { label: "外汇费", value: "0%" },
      { label: "ATM 费", value: "$200–800 免费，之后 2%" },
      { label: "Apple Pay / Google Pay", value: "不支持 / 支持" },
    ],
  }),
  "metamask-card": paymentscanCard("metamask", {
    totalVolume: "$69.19M",
    totalTransactions: "1,249,877",
    totalAddresses: "23,912",
    activityTypes: ["Spends"],
    settlementChains: ["Base", "Linea", "Solana"],
    cardDetails: [
      { label: "上线时间", value: "Apr 2024" },
      { label: "基础返现", value: "1%" },
      { label: "最高返现", value: "3%" },
      { label: "返现上限", value: "$25/月" },
      { label: "外汇费", value: "0.5%" },
      { label: "ATM 费", value: "2%" },
      { label: "Apple Pay / Google Pay", value: "支持 / 支持" },
    ],
  }),
  "holyheld-card": paymentscanCard("holyheld", {
    totalVolume: "$172.4M",
    totalTransactions: "116,038",
    totalAddresses: "4,921",
    activityTypes: ["Top-Ups"],
    settlementChains: ["Arbitrum", "Avalanche", "Base", "BSC", "Ethereum", "Gnosis", "Optimism", "Polygon", "Solana", "zkSync"],
    cardDetails: [
      { label: "上线时间", value: "Mar 2023" },
      { label: "基础返现", value: "0.5%" },
      { label: "最高返现", value: "1%" },
      { label: "返现上限", value: "无上限" },
      { label: "外汇费", value: "2.5%" },
      { label: "ATM 费", value: "境内 €1；境外 2.5% + €2" },
      { label: "Apple Pay / Google Pay", value: "支持 / 支持" },
    ],
    scopeNote: "Paymentscan 对 Holyheld 追踪的是充值口径，不等同于实际卡消费。",
  }),
  "bitget-wallet-card": paymentscanCard("bitget-wallet", {
    totalVolume: "$43.96M",
    totalTransactions: "3,418,397",
    totalAddresses: "73,104",
    activityTypes: ["Spends", "Top-Ups", "Program-Issuer Settlements"],
    settlementChains: ["Arbitrum", "Base", "Ethereum", "Solana", "TRON"],
    cardDetails: [
      { label: "上线时间", value: "Jan 2025" },
      { label: "基础返现", value: "约 2%" },
      { label: "最高返现", value: "取决于外汇" },
      { label: "返现上限", value: "浮动" },
      { label: "外汇费", value: "1.7%" },
      { label: "抵押借记", value: "即将推出" },
      { label: "Apple Pay / Google Pay", value: "支持 / 支持" },
    ],
  }),
  "avici-card": paymentscanCard("avici", {
    totalVolume: "$25.04M",
    totalTransactions: "143,412",
    totalAddresses: "7,638",
    activityTypes: ["Program-Issuer Settlements"],
    settlementChains: ["Polygon", "Solana"],
    cardDetails: [
      { label: "上线时间", value: "Dec 2024" },
      { label: "外汇费", value: "0.4–1%" },
      { label: "ATM 费", value: "$1 + 0.6%（Signature 为 0%）" },
      { label: "抵押借记", value: "支持" },
      { label: "Apple Pay / Google Pay", value: "支持 / 支持" },
    ],
  }),
  "safepal-fiat24-mastercard": paymentscanCard("safepal", {
    totalVolume: "$34.82M",
    totalTransactions: "2,160,539",
    totalAddresses: "42,784",
    activityTypes: ["Spends"],
    settlementChains: ["Arbitrum"],
    cardDetails: [
      { label: "上线时间", value: "Nov 2023" },
      { label: "外汇费", value: "1%" },
      { label: "Apple Pay / Google Pay", value: "支持 / 支持" },
    ],
  }),
  "solayer-pay": paymentscanCard("solayer", {
    totalVolume: "$24.73M",
    totalTransactions: "102,728",
    totalAddresses: "8,201",
    activityTypes: ["Top-Ups", "Program-Issuer Settlements"],
    settlementChains: ["Solana"],
    cardDetails: [
      { label: "上线时间", value: "Mar 2025" },
      { label: "外汇费", value: "1.5%" },
      { label: "Apple Pay / Google Pay", value: "支持 / 支持" },
    ],
  }),
  "tuyo-card": paymentscanCard("tuyo", {
    totalVolume: "$13.27M",
    totalTransactions: "472",
    totalAddresses: "1",
    activityTypes: ["Program-Issuer Settlements"],
    settlementChains: ["Base"],
    cardDetails: [
      { label: "上线时间", value: "Feb 2025" },
      { label: "外汇费", value: "0–1%" },
      { label: "Apple Pay / Google Pay", value: "支持 / 支持" },
    ],
  }),
};

export const paymentscanTrackedCardSlugs = Object.keys(paymentscanMetricsByCardSlug);

const activityLabels = ["Spends", "Top-Ups", "Program-Issuer Settlements", "Clearing"];

const chainLabels = [
  "Arbitrum",
  "Avalanche",
  "Base",
  "Bitcoin",
  "BSC",
  "Ethereum",
  "Gnosis",
  "HyperEVM",
  "Linea",
  "Optimism",
  "Plasma",
  "Polygon",
  "Scroll",
  "Solana",
  "Sonic",
  "Starknet",
  "TON",
  "TRON",
  "zkSync",
];

const cardDetailLabels = [
  { source: "Launch Date", label: "上线时间" },
  { source: "Base Cashback", label: "基础返现" },
  { source: "Max Cashback", label: "最高返现" },
  { source: "Cashback Limit", label: "返现上限" },
  { source: "FX Fee", label: "外汇费" },
  { source: "ATM Fee", label: "ATM 费" },
  { source: "Borrow to Spend", label: "抵押借记" },
  { source: "Apple Pay", label: "Apple Pay" },
  { source: "Google Pay", label: "Google Pay" },
  { source: "Card Provider", label: "发卡方" },
];

export async function getPaymentscanMetrics(cardSlug: string) {
  const fallback = paymentscanMetricsByCardSlug[cardSlug];
  if (!fallback) return undefined;

  return loadPaymentscanMetrics(cardSlug).then((result) => result.metrics ?? fallback);
}

export async function refreshPaymentscanMetrics() {
  const settledResults = await Promise.allSettled(
    paymentscanTrackedCardSlugs.map((cardSlug) => loadPaymentscanMetrics(cardSlug)),
  );

  const results = settledResults.map((result, index): PaymentscanRefreshResult => {
    const cardSlug = paymentscanTrackedCardSlugs[index];
    const fallback = paymentscanMetricsByCardSlug[cardSlug];

    if (result.status === "rejected") {
      return {
        cardSlug,
        sourceUrl: fallback.sourceUrl,
        status: "fallback",
        totalVolume: fallback.totalVolume,
        observedAt: fallback.observedAt,
        error: result.reason instanceof Error ? result.reason.message : "Unknown Paymentscan refresh error",
      };
    }

    return result.value;
  });

  return {
    refreshedAt: new Date().toISOString(),
    total: results.length,
    updated: results.filter((result) => result.status === "updated").length,
    fallback: results.filter((result) => result.status === "fallback").length,
    missing: results.filter((result) => result.status === "missing").length,
    results,
  };
}

async function loadPaymentscanMetrics(cardSlug: string): Promise<PaymentscanRefreshResult & { metrics?: PaymentscanMetrics }> {
  const fallback = paymentscanMetricsByCardSlug[cardSlug];
  if (!fallback) {
    return {
      cardSlug,
      sourceUrl: "",
      status: "missing",
      error: "No static Paymentscan fallback was configured for this card.",
    };
  }

  try {
    const response = await fetch(fallback.sourceUrl, buildPaymentscanFetchOptions());

    if (!response.ok) {
      throw new Error(`Paymentscan responded with HTTP ${response.status}`);
    }

    const html = await response.text();
    const parsedMetrics = parsePaymentscanPage(html, fallback);

    if (!parsedMetrics) {
      return {
        cardSlug,
        sourceUrl: fallback.sourceUrl,
        status: "fallback",
        metrics: fallback,
        totalVolume: fallback.totalVolume,
        observedAt: fallback.observedAt,
        error: "Could not find Paymentscan metric blocks in the page HTML.",
      };
    }

    return {
      cardSlug,
      sourceUrl: fallback.sourceUrl,
      status: "updated",
      metrics: parsedMetrics,
      totalVolume: parsedMetrics.totalVolume,
      observedAt: parsedMetrics.observedAt,
    };
  } catch (error) {
    return {
      cardSlug,
      sourceUrl: fallback.sourceUrl,
      status: "fallback",
      metrics: fallback,
      totalVolume: fallback.totalVolume,
      observedAt: fallback.observedAt,
      error: error instanceof Error ? error.message : "Unknown Paymentscan fetch error",
    };
  }
}

function buildPaymentscanFetchOptions(): RequestInit {
  return {
    cache: "no-store",
    headers: {
      accept: "text/html,application/xhtml+xml",
      "user-agent": "APPDO-UCard-Compare/1.0 (+https://appdo.xyz)",
    },
  };
}

function parsePaymentscanPage(html: string, fallback: PaymentscanMetrics): PaymentscanMetrics | undefined {
  const text = normalizeText(stripTags(html));

  const totalVolume = extractMetricBeforeLabel(text, "TOTAL VOLUME");
  const totalTransactions = extractMetricBeforeLabel(text, "TOTAL TRANSACTIONS");
  const totalAddresses = extractMetricBeforeLabel(text, "TOTAL ADDRESSES");
  const activityTypes = extractKnownLabels(text, "Types of Activity Tracked", "Settlement Chains", activityLabels);
  const settlementChains = extractKnownLabels(text, "Settlement Chains", "Card Details", chainLabels);
  const cardDetails = extractCardDetails(text, fallback.cardDetails);
  const dataThroughValue = extractDataThrough(text) ?? fallback.dataThrough;

  const hasParsedMetrics = Boolean(
    totalVolume ||
      totalTransactions ||
      totalAddresses ||
      activityTypes.length > 0 ||
      settlementChains.length > 0 ||
      cardDetails.length > 0,
  );

  if (!hasParsedMetrics) return undefined;

  return {
    ...fallback,
    observedAt: formatDateForSource(),
    dataThrough: dataThroughValue,
    totalVolume: totalVolume ?? fallback.totalVolume,
    totalTransactions: totalTransactions ?? fallback.totalTransactions,
    totalAddresses: totalAddresses ?? fallback.totalAddresses,
    activityTypes: activityTypes.length > 0 ? activityTypes : fallback.activityTypes,
    settlementChains: settlementChains.length > 0 ? settlementChains : fallback.settlementChains,
    cardDetails: cardDetails.length > 0 ? cardDetails : fallback.cardDetails,
  };
}

function stripTags(html: string) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&mdash;|&#8212;/g, "—")
    .replace(/&#x2713;|&#10003;/g, "✓")
    .replace(/&#x2717;|&#10007;/g, "✗");
}

function normalizeText(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function extractMetricBeforeLabel(text: string, label: string) {
  const labelIndex = text.indexOf(label);
  if (labelIndex === -1) return undefined;

  const beforeLabel = text.slice(Math.max(0, labelIndex - 80), labelIndex);
  const matches = beforeLabel.match(/(?:\$)?\d[\d,.]*(?:\.\d+)?\s?[KMBT]?/gi);
  const value = matches?.at(-1)?.replace(/\s+/g, "");

  return value && !/^\d{4}$/.test(value) ? value : undefined;
}

function extractKnownLabels(text: string, startLabel: string, endLabel: string, labels: string[]) {
  const segment = extractSegment(text, startLabel, endLabel);
  if (!segment) return [];

  return labels.filter((label) => new RegExp(`\\b${escapeRegExp(label)}\\b`, "i").test(segment));
}

function extractCardDetails(text: string, fallbackDetails: PaymentscanMetrics["cardDetails"]) {
  const segment = extractSegment(text, "Card Details", "Methodology");
  if (!segment) return [];

  const parsedDetails = cardDetailLabels
    .map(({ source, label }, index) => {
      const nextSource = cardDetailLabels[index + 1]?.source ?? "Methodology";
      const rawValue = extractSegment(segment, source, nextSource);
      const value = normalizeDetailValue(rawValue);

      return value ? { label, value } : undefined;
    })
    .filter((detail): detail is { label: string; value: string } => Boolean(detail));

  if (parsedDetails.length === 0) return [];

  const fallbackByLabel = new Map(fallbackDetails.map((detail) => [detail.label, detail.value]));

  return parsedDetails.map((detail) => ({
    ...detail,
    value: detail.value === "—" ? (fallbackByLabel.get(detail.label) ?? detail.value) : detail.value,
  }));
}

function extractSegment(text: string, startLabel: string, endLabel: string) {
  const startIndex = text.indexOf(startLabel);
  if (startIndex === -1) return undefined;

  const valueStart = startIndex + startLabel.length;
  const endIndex = text.indexOf(endLabel, valueStart);

  return text.slice(valueStart, endIndex === -1 ? undefined : endIndex).trim();
}

function extractDataThrough(text: string) {
  return text.match(/monthly data from [A-Z][a-z]{2} \d{4} to ([A-Z][a-z]{2} \d{4})/i)?.[1];
}

function normalizeDetailValue(value?: string) {
  if (!value) return undefined;

  const normalized = normalizeText(value)
    .replace(/^:/, "")
    .replace(/\s+\/\s+/g, " / ")
    .trim();

  if (!normalized || normalized === "Card Details") return undefined;

  return normalized.replace(/✓/g, "支持").replace(/✗/g, "不支持");
}

function formatDateForSource() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "UTC",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
