"use client";

import { useState } from "react";

const knownDomains: Array<[string, string]> = [
  ["Wirex", "wirexapp.com"],
  ["Crypto.com", "crypto.com"],
  ["Bybit", "bybit.com"],
  ["Nexo", "nexo.com"],
  ["Coinbase", "coinbase.com"],
  ["RedotPay", "redotpay.com"],
  ["Tria", "tria.so"],
  ["Plasma", "plasma.to"],
  ["ether.fi", "ether.fi"],
  ["Bitget Card", "bitget.com"],
  ["SafePal", "safepal.com"],
  ["MetaMask", "metamask.io"],
  ["Infini", "infini.money"],
];

function faviconDomain(cardName: string, officialWebsite: string) {
  const matchedDomain = knownDomains.find(([name]) => cardName.includes(name))?.[1];
  if (matchedDomain) return matchedDomain;

  try {
    return new URL(officialWebsite).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

export function BrandMark({
  cardName,
  brandLogo,
  officialWebsite,
  size = "card",
}: {
  cardName: string;
  brandLogo: string;
  officialWebsite: string;
  size?: "card" | "compact";
}) {
  const [faviconFailed, setFaviconFailed] = useState(false);
  const domain = faviconDomain(cardName, officialWebsite);
  const faviconUrl = domain ? `https://www.google.com/s2/favicons?sz=64&domain=${encodeURIComponent(domain)}` : "";
  const compact = size === "compact";

  return (
    <span
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-lg bg-slate-100 shadow-sm shadow-slate-950/10 ${
        compact ? "h-8 w-8 p-1" : "h-11 w-11 p-1.5"
      }`}
    >
      {faviconUrl && !faviconFailed ? (
        // Google 的 favicon 服务是动态外部资源；保留原生图片以便 onError 后立即显示缩写回退。
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={faviconUrl}
          width={32}
          height={32}
          alt=""
          className={`${compact ? "h-6 w-6" : "h-8 w-8"} object-contain`}
          onError={() => setFaviconFailed(true)}
        />
      ) : (
        <span className="font-mono text-xs font-bold tracking-[0.08em] text-slate-700">{brandLogo}</span>
      )}
    </span>
  );
}
