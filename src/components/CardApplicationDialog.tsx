"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, Check, Copy, ExternalLink, ShieldCheck, X } from "lucide-react";
import { Animated3DCard } from "@/components/Animated3DCard";
import { CardVisual } from "@/components/CardVisual";
import { copyText } from "@/lib/clipboard";
import type { CryptoCard } from "@/lib/cards";

export const DEFAULT_INVITE_CODE = "APPDO";

const cardInviteCodes: Record<string, string> = {
  "plasma-one-card": "APPAPP",
};

type InviteContent = {
  description: string[];
};

const defaultInviteContent: InviteContent = {
  description: ["使用邀请码注册，可领取平台当前新用户权益。"],
};

const cardInviteContent: Record<string, InviteContent> = {
  "plasma-one-card": {
    description: [
      "使用邀请码注册，可免费领取 Core 一年。",
      "享 3% 消费返现、AI 订阅返现 5%，并赠送 ChatGPT Go。",
    ],
  },
};

const cardGuideLinks: Record<string, { href: string; title: string; description: string }> = {
  "plasma-one-card": {
    href: "/guides/plasma-one-core-chatgpt-go",
    title: "Plasma One 申请与权益说明",
    description: "了解 3% 返现、AI 订阅返现 5%、ChatGPT Go 和 Core 等级领取方式。",
  },
};

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

  const inviteCode = cardInviteCodes[card.slug] ?? DEFAULT_INVITE_CODE;
  const inviteContent = cardInviteContent[card.slug] ?? defaultInviteContent;
  const relatedGuide = cardGuideLinks[card.slug];

  const copyInviteCode = async () => {
    const copied = await copyText(inviteCode);
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
        className="relative max-h-[92vh] w-full max-w-[980px] overflow-y-auto rounded-t-3xl bg-white shadow-2xl shadow-slate-950/40 sm:max-h-[86vh] sm:rounded-3xl"
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-slate-100 bg-white px-5 py-4 sm:px-6">
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

        <div className="space-y-5 px-4 py-5 sm:px-6 sm:py-6">
          <div className="grid items-start gap-4 lg:grid-cols-2 lg:items-stretch">
            <div className="flex aspect-[1.58/1] overflow-visible lg:h-auto lg:self-stretch">
              <div className="w-full">
                <Animated3DCard>
                  <CardVisual card={card} compact interactive={false} frameless={Boolean(card.coverImage)} />
                </Animated3DCard>
              </div>
            </div>

            <div className="relative isolate flex h-full min-h-full self-stretch overflow-hidden rounded-2xl border border-emerald-300/25 bg-[radial-gradient(circle_at_86%_12%,rgba(110,231,183,0.2),transparent_34%),radial-gradient(circle_at_10%_96%,rgba(20,184,166,0.15),transparent_36%),linear-gradient(145deg,rgba(6,78,59,0.98),rgba(2,44,34,0.96)_56%,rgba(3,24,22,0.99))] p-6 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_22px_48px_rgba(2,44,34,0.28)] sm:p-7 lg:aspect-[1.58/1] lg:h-auto lg:min-h-0">
              <span className="pointer-events-none absolute -right-24 -top-24 h-52 w-52 rounded-full bg-emerald-300/10 blur-3xl" />
              <span className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-emerald-200/30 to-transparent" />

              <div className="relative z-10 flex min-h-full w-full flex-col md:h-full">
                <p className="text-sm font-semibold tracking-[0.16em] text-emerald-200/90">专属邀请码</p>
                <h3 className="mt-3 text-2xl font-semibold leading-tight text-white sm:text-[26px]">用邀请码注册，领取额外权益</h3>

                <div className="mt-5 space-y-2 text-sm font-medium leading-6 text-emerald-50/75 sm:text-[15px]">
                  {inviteContent.description.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    onClick={copyInviteCode}
                    className="inline-flex min-h-[52px] w-full items-center justify-between gap-4 rounded-full border border-emerald-300/50 bg-slate-950/75 px-5 py-3 text-left text-emerald-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_12px_26px_rgba(0,0,0,0.22)] transition hover:border-emerald-200/80 hover:bg-slate-950/90 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_14px_32px_rgba(16,185,129,0.16)] focus:outline-none focus:ring-4 focus:ring-emerald-300/20"
                    aria-label={`复制邀请码 ${inviteCode}`}
                  >
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold text-emerald-100/60">邀请码</span>
                      <span className="mt-0.5 block font-mono text-xl font-bold tracking-[0.2em] text-white">{inviteCode}</span>
                    </span>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-emerald-300/30 bg-emerald-300/10 text-emerald-100">
                      {copyStatus === "copied" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </span>
                  </button>

                  {copyStatus !== "idle" ? (
                    <p className="mt-3 text-xs font-semibold leading-5 text-emerald-100/80" aria-live="polite">
                      {copyStatus === "copied" ? "邀请码已复制。" : `浏览器未允许自动复制，请手动复制 ${inviteCode}。`}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          {relatedGuide ? (
            <Link
              href={relatedGuide.href}
              onClick={onClose}
              className="group flex items-start gap-3 rounded-2xl border border-blue-200 bg-blue-50 p-4 text-left transition hover:border-blue-300 hover:bg-blue-100 sm:p-5"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-600/20">
                <BookOpen className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-blue-700">申请前阅读指南</span>
                <span className="mt-1 block text-base font-semibold text-slate-950">{relatedGuide.title}</span>
                <span className="mt-1 block text-sm leading-6 text-slate-600">{relatedGuide.description}</span>
              </span>
              <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-blue-700 transition group-hover:translate-x-0.5" />
            </Link>
          ) : null}

          <ol className="space-y-3">
            {[
              `复制上方邀请码 ${inviteCode}。`,
              `进入 ${card.cardName} 官方申请页面，注册或登录账户。`,
              `在邀请码字段粘贴 ${inviteCode}，并按页面要求完成身份验证（KYC）。`,
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

          {card.officialWebsite ? (
            <a
              href={card.officialWebsite}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300"
            >
              前往官方申请页面
              <ExternalLink className="h-4 w-4" />
            </a>
          ) : null}
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
