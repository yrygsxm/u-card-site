"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Hero3D } from "@/components/Hero3D";

export function HomeHero({ cardCount }: { cardCount: number }) {
  const reduceMotion = useReducedMotion();
  const transition = { duration: reduceMotion ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <section className="home-hero-panel grid gap-8 p-5 sm:p-8 lg:grid-cols-[minmax(0,0.91fr)_minmax(0,1.09fr)] lg:items-center lg:p-10">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transition}
      >
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: reduceMotion ? 0 : 0.05 }}
          className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl"
        >
          找到最适合你的 U 卡
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: reduceMotion ? 0 : 0.12 }}
          className="mt-4 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base"
        >
          一站式对比 {cardCount} 张加密货币银行卡的费用、返现、KYC 与地区限制
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition, delay: reduceMotion ? 0 : 0.2 }}
          className="mt-7 flex flex-col gap-3 sm:flex-row"
        >
          <a
            href="#region-match"
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white shadow-[0_10px_28px_rgba(37,99,235,0.22)] transition hover:bg-blue-700"
          >
            按我的地区推荐
          </a>
          <a
            href="#fee-calculator"
            className="home-hero-outline-button inline-flex min-h-11 items-center justify-center rounded-xl border px-4 text-sm font-semibold transition"
          >
            打开费用计算器
          </a>
          <Link
            href="/compare"
            className="home-hero-outline-button inline-flex min-h-11 items-center justify-center rounded-xl border px-4 text-sm font-semibold transition"
          >
            查看完整对比表
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 26, scale: 0.97 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ ...transition, delay: reduceMotion ? 0 : 0.16 }}
      >
        <Hero3D />
      </motion.div>
    </section>
  );
}
