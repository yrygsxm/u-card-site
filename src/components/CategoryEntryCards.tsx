"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

type Brand = {
  name: string;
  domain: string;
  fallback: string;
};

const categoryEntries: Array<{
  href: string;
  title: string;
  subtitle: string;
  gradient: string;
  brands: Brand[];
}> = [
  {
    href: "/categories/cashback",
    title: "返现卡推荐",
    subtitle: "高返现：最高 10%",
    gradient: "from-blue-500 via-blue-600 to-indigo-950",
    brands: [
      { name: "Bybit", domain: "bybit.com", fallback: "BY" },
      { name: "Crypto.com", domain: "crypto.com", fallback: "CC" },
      { name: "Nexo", domain: "nexo.com", fallback: "NX" },
    ],
  },
  {
    href: "/categories/virtual-card",
    title: "虚拟卡专区",
    subtitle: "快速开卡，支持订阅服务",
    gradient: "from-orange-500 via-orange-600 to-rose-800",
    brands: [
      { name: "RedotPay", domain: "redotpay.com", fallback: "RP" },
      { name: "PokePay", domain: "pokepay.cc", fallback: "PP" },
      { name: "OneKey Card", domain: "onekey.so", fallback: "OK" },
    ],
  },
  {
    href: "/categories/travel",
    title: "海外消费",
    subtitle: "全球消费，低手续费",
    gradient: "from-teal-500 via-emerald-600 to-cyan-900",
    brands: [
      { name: "Wirex", domain: "wirexapp.com", fallback: "WX" },
      { name: "Gnosis Pay", domain: "gnosispay.com", fallback: "GP" },
      { name: "Curve", domain: "curve.com", fallback: "CV" },
    ],
  },
];

function BrandIcon({ brand }: { brand: Brand }) {
  const [imageFailed, setImageFailed] = useState(false);
  const faviconUrl = `https://www.google.com/s2/favicons?sz=64&domain=${encodeURIComponent(brand.domain)}`;

  return (
    <div className="flex min-w-0 flex-col items-center gap-1.5">
      <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg border border-white/20 bg-white/90 p-1 shadow-sm shadow-slate-950/15">
        {imageFailed ? (
          <span className="font-mono text-[10px] font-bold tracking-tight text-slate-700">{brand.fallback}</span>
        ) : (
          // Google favicon 服务是动态外部资源；加载失败时使用品牌缩写回退。
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={faviconUrl}
            width={24}
            height={24}
            alt=""
            className="h-6 w-6 object-contain"
            onError={() => setImageFailed(true)}
          />
        )}
      </span>
      <span className="max-w-16 truncate text-xs font-medium text-white">{brand.name}</span>
    </div>
  );
}

export function CategoryEntryCards() {
  const reduceMotion = useReducedMotion();

  return (
    <section aria-label="U 卡分类入口" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {categoryEntries.map((entry, index) => (
        <motion.div
          key={entry.href}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.22 }}
          transition={{ duration: reduceMotion ? 0 : 0.45, delay: reduceMotion ? 0 : index * 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href={entry.href}
            className={`group relative block min-h-[150px] overflow-hidden rounded-[18px] bg-gradient-to-br ${entry.gradient} p-5 shadow-[0_12px_24px_rgba(15,23,42,0.16)] transition-all duration-150 ease-out hover:-translate-y-0.5 hover:shadow-[0_16px_28px_rgba(15,23,42,0.22)] motion-reduce:transform-none`}
          >
            <span className="pointer-events-none absolute -bottom-12 -right-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
            <span className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/15 text-white transition-colors group-hover:bg-white/25">
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </span>
            <div className="relative flex h-full flex-col">
              <h2 className="text-xl font-semibold tracking-tight text-white">{entry.title}</h2>
              <p className="mt-1 text-sm text-white/75">{entry.subtitle}</p>
              <div className="mt-auto flex items-end gap-3 pt-4">
                {entry.brands.map((brand) => (
                  <BrandIcon key={brand.name} brand={brand} />
                ))}
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </section>
  );
}
