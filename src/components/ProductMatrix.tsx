"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Globe2, Send } from "lucide-react";

type ProductKind = "telegram" | "x" | "appdo" | "simon";

type Product = {
  category: string;
  name: string;
  account: string;
  description: string;
  action: string;
  href: string;
  kind: ProductKind;
};

const products: Product[] = [
  {
    category: "Telegram 频道",
    name: "APPDO 数字生活指南",
    account: "@APPDO",
    description: "分享数字工具、网络服务、隐私安全、AI 工具、科技新闻与使用教程。持续更新真实体验与深度评测内容。",
    action: "加入频道",
    href: "https://t.me/APPDO",
    kind: "telegram",
  },
  {
    category: "Telegram 社区",
    name: "APPDO 的互联网记忆",
    account: "@APPDO_Memory",
    description: "记录互联网产品、行业动态、有趣发现与频道补充内容。更加轻松和开放的交流空间。",
    action: "加入社区",
    href: "https://t.me/APPDO_Memory",
    kind: "telegram",
  },
  {
    category: "X（Twitter）",
    name: "APPDO",
    account: "@APPDO_OFFICIAL",
    description: "发布频道更新、产品动态、行业观察与数字生活资讯。与全球用户实时互动。",
    action: "关注账号",
    href: "https://x.com/APPDO_OFFICIAL",
    kind: "x",
  },
  {
    category: "独立网站",
    name: "APPDO 数字生活指南",
    account: "appdo.co",
    description: "提供 App 推荐、工具导航、使用教程、网络安全科普与深度评测文章。帮助用户发现更好的数字产品。",
    action: "访问网站",
    href: "https://appdo.co",
    kind: "appdo",
  },
  {
    category: "独立 KOL（X）",
    name: "SIMONJP404",
    account: "@SIMONJP404",
    description: "专注数字生活、海外互联网服务、AI 工具、效率提升与日本生活内容分享。",
    action: "关注作者",
    href: "https://x.com/SIMONJP404",
    kind: "simon",
  },
];

function XMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M18.91 2.91h3.68l-8.04 9.19L24 21.09h-7.41l-5.8-7.58-6.63 7.58H.48l8.6-9.83L0 2.91h7.6l5.24 6.93 6.07-6.93Zm-1.29 16.72h2.04L6.49 4.3H4.3l13.32 15.33Z" />
    </svg>
  );
}

function ProductLogo({ kind }: { kind: ProductKind }) {
  if (kind === "telegram") {
    return (
      <div className="product-logo product-logo--telegram">
        <Send className="h-6 w-6 translate-x-0.5 -translate-y-0.5 fill-white text-white" strokeWidth={1.8} aria-hidden="true" />
      </div>
    );
  }

  if (kind === "x") {
    return (
      <div className="product-logo product-logo--x">
        <XMark className="h-6 w-6 text-white" />
      </div>
    );
  }

  if (kind === "appdo") {
    return (
      <div className="product-logo product-logo--appdo">
        <span className="text-xl font-black tracking-[-0.1em] text-white">a</span>
      </div>
    );
  }

  return (
    <div className="product-logo product-logo--simon">
      <span className="relative z-10 text-xl font-black tracking-[-0.08em] text-white">S</span>
      <span className="absolute inset-2 rounded-full border border-sky-100/45" />
      <span className="absolute h-1.5 w-1.5 translate-x-4 -translate-y-4 rounded-full bg-sky-200 shadow-[0_0_18px_rgba(125,211,252,0.95)]" />
    </div>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const reduceMotion = useReducedMotion();
  const isXAction = product.kind === "x" || product.kind === "simon";

  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      whileHover={reduceMotion ? undefined : { y: -8 }}
      transition={{ duration: reduceMotion ? 0 : 0.46, delay: reduceMotion ? 0 : index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="product-matrix-card group flex h-[400px] flex-col overflow-hidden rounded-[24px] border border-white/[0.08] bg-white/[0.03] p-6 shadow-[0_18px_48px_rgba(0,0,0,0.14)] backdrop-blur-[20px]"
    >
      <p className="inline-flex w-fit rounded-full border border-sky-300/20 bg-sky-400/[0.1] px-3 py-1 text-xs font-semibold tracking-[0.04em] text-sky-200">
        {product.category}
      </p>
      <div className="mt-5">
        <ProductLogo kind={product.kind} />
      </div>
      <h3 className="mt-6 line-clamp-2 text-2xl font-bold leading-[1.12] tracking-[-0.04em] text-white sm:text-[26px]">{product.name}</h3>
      <p className="mt-2 text-base font-medium text-sky-100/75">{product.account}</p>
      <p className="mt-4 line-clamp-3 max-w-xl text-sm leading-6 text-white/75">{product.description}</p>
      <a
        href={product.href}
        target="_blank"
        rel="noreferrer"
        className="product-action-button mt-auto inline-flex w-fit items-center gap-2 pt-5 text-sm font-semibold text-white"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-sky-200/25 bg-sky-400/[0.12] text-sky-100">
          {isXAction ? (
            <XMark className="h-4 w-4" />
          ) : product.kind === "telegram" ? (
            <Send className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Globe2 className="h-4 w-4" aria-hidden="true" />
          )}
        </span>
        {product.action}
        <ArrowUpRight className="h-4 w-4 text-sky-200" aria-hidden="true" />
      </a>
    </motion.article>
  );
}

export function ProductMatrix() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative mt-20 px-5 pb-8 pt-16 sm:px-8 sm:pb-10 sm:pt-20 lg:mt-28 lg:px-12 lg:pb-12 lg:pt-24"
      aria-labelledby="product-matrix-title"
    >
      <div className="relative z-10 mx-auto max-w-[1400px]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.16 }}
          transition={{ duration: reduceMotion ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-sm font-semibold tracking-[0.04em] text-[#78b7ff]">APPDO 产品矩阵</p>
          <h2 id="product-matrix-title" className="mt-5 text-5xl font-extrabold leading-[1.08] tracking-[-0.06em] text-white sm:text-6xl lg:text-[64px]">
            <span className="bg-gradient-to-r from-[#3b82f6] to-[#60a5fa] bg-clip-text text-transparent">APPDO</span> 的产品矩阵
          </h2>
          <p className="mt-6 max-w-4xl text-lg leading-[1.8] text-white/75 sm:text-xl lg:text-[22px]">
            发现更好用的工具、获取真实可靠的评测与资讯，加入 APPDO 的各个产品和社区。
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 3).map((product, index) => (
            <ProductCard key={product.account} product={product} index={index} />
          ))}
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {products.slice(3).map((product, index) => (
            <ProductCard key={product.account} product={product} index={index + 3} />
          ))}
        </div>

      </div>
    </section>
  );
}
