"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Check, Copy, ExternalLink, ShieldCheck, X } from "lucide-react";
import { CardVisual } from "@/components/CardVisual";
import { copyText } from "@/lib/clipboard";
import type { CryptoCard } from "@/lib/cards";

export const DEFAULT_INVITE_CODE = "APPDO";

export function CardApplicationDialog({
  card,
  onClose,
}: {
  card: CryptoCard | null;
  onClose: () => void;
}) {
  const [copyResult, setCopyResult] = useState<{ cardSlug: string; status: "copied" | "failed" } | null>(null);

  useEffect(() => {
    if (!card) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [card, onClose]);

  if (!card) return null;

  const copyInviteCode = async () => {
    const copied = await copyText(DEFAULT_INVITE_CODE);
    setCopyResult({ cardSlug: card.slug, status: copied ? "copied" : "failed" });
  };

  const copyStatus = copyResult?.cardSlug === card.slug ? copyResult.status : "idle";

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-5">
      <button
        type="button"
        aria-label="关闭申请说明"
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="application-dialog-title"
        className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-white shadow-2xl shadow-slate-950/40 sm:max-h-[88vh] sm:rounded-3xl"
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-slate-100 bg-white px-5 py-5 sm:px-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">申请指引</p>
            <h2 id="application-dialog-title" className="mt-1 text-xl font-semibold text-slate-950">
              申请 {card.cardName}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="关闭"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-slate-300 hover:bg-slate-100 hover:text-slate-950"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6 px-5 py-6 sm:px-7 sm:py-7">
          <div className="overflow-hidden rounded-2xl">
            <CardVisual card={card} />
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-emerald-700">邀请码</p>
                <p className="mt-1 text-xs font-medium leading-5 text-emerald-700">注册或申请页面出现邀请码字段时填写。</p>
              </div>
              <button
                type="button"
                onClick={copyInviteCode}
                className="inline-flex min-h-11 items-center gap-3 rounded-xl border border-emerald-300 bg-white px-3 py-2 text-left shadow-sm transition hover:border-emerald-400 hover:bg-emerald-100 focus:outline-none focus:ring-4 focus:ring-emerald-200"
                aria-label={`复制邀请码 ${DEFAULT_INVITE_CODE}`}
              >
                <span className="font-mono text-lg font-bold tracking-[0.16em] text-slate-950">{DEFAULT_INVITE_CODE}</span>
                {copyStatus === "copied" ? <Check className="h-4 w-4 text-emerald-700" /> : <Copy className="h-4 w-4 text-emerald-700" />}
              </button>
            </div>
            <p className="mt-4 text-xs font-semibold leading-5 text-emerald-700" aria-live="polite">
              {copyStatus === "copied"
                ? "邀请码已复制。"
                : copyStatus === "failed"
                  ? "浏览器未允许自动复制，请手动复制 APPDO。"
                  : "点击右侧邀请码即可复制。"}
            </p>
          </div>

          <ol className="space-y-3">
            {[
              "复制上方邀请码 APPDO。",
              `进入 ${card.cardName} 官方申请页面，注册或登录账户。`,
              "在邀请码字段粘贴 APPDO，并按页面要求完成身份验证（KYC）。",
              "提交前核对申请地区、费用、返现规则和卡片资格；通过审核后再开通或申领卡片。",
            ].map((step, index) => (
              <li key={step} className="flex gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-bold text-white">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>

          <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-medium leading-6 text-amber-700">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
            <p>申请资格、费用和邀请码可用性以官方页面为准。不要向任何人提供验证码、密码或助记词。</p>
          </div>

          <a
            href={card.officialWebsite}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300"
          >
            前往官方申请页面
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </section>
    </div>
  );
}

export function CardApplicationButton({ card }: { card: CryptoCard }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300 focus:outline-none focus:ring-4 focus:ring-emerald-200"
      >
        立即申请
        <ArrowUpRight className="h-4 w-4" />
      </button>
      <CardApplicationDialog card={open ? card : null} onClose={() => setOpen(false)} />
    </>
  );
}
