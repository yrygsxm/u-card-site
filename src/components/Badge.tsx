import type { ReactNode } from "react";

type Tone = "neutral" | "positive" | "warning" | "negative" | "info" | "dark";

const toneClass: Record<Tone, string> = {
  neutral: "border-slate-200 bg-white text-slate-700",
  positive: "border-emerald-200 bg-emerald-50 text-emerald-700",
  warning: "border-amber-200 bg-amber-50 text-amber-700",
  negative: "border-rose-200 bg-rose-50 text-rose-700",
  info: "border-blue-200 bg-blue-50 text-blue-700",
  dark: "border-slate-700 bg-slate-900 text-slate-100",
};

export function Badge({
  children,
  tone = "neutral",
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium leading-none ${toneClass[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
