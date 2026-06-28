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

const observedAt = "2026-06-22";
const dataThrough = "Jun 2026";

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
    totalVolume: "$10.93M",
    totalTransactions: "60,754",
    totalAddresses: "7,730",
    activityTypes: ["Clearing", "Program-Issuer Settlements"],
    settlementChains: ["Plasma"],
    cardDetails: [
      { label: "上线时间", value: "Jan 2026" },
      { label: "基础返现", value: "2%" },
      { label: "最高返现", value: "4%（AI、航班 10%）" },
      { label: "返现上限", value: "动态" },
      { label: "外汇费", value: "1%" },
      { label: "Apple Pay / Google Pay", value: "支持 / 支持" },
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

export function getPaymentscanMetrics(cardSlug: string) {
  return paymentscanMetricsByCardSlug[cardSlug];
}
