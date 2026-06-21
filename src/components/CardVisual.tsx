import type { CryptoCard } from "@/lib/cards";

export function CardVisual({
  card,
  compact = false,
}: {
  card: Pick<CryptoCard, "cardName" | "shortName" | "brandLogo" | "brandColor" | "cardNetwork">;
  compact?: boolean;
}) {
  return (
    <div
      role="img"
      className={`group relative isolate aspect-[1.58/1] w-full overflow-hidden rounded-2xl border border-white/20 bg-slate-900 shadow-lg shadow-slate-950/20 transition duration-500 hover:-translate-y-1 hover:scale-[1.015] hover:rotate-[0.6deg] hover:shadow-2xl hover:shadow-slate-950/35 motion-reduce:transform-none ${
        compact ? "min-w-0" : "min-w-44"
      }`}
      style={{
        background: `linear-gradient(135deg, ${card.brandColor} 0%, #162033 62%, #0b1020 100%)`,
      }}
      aria-label={`${card.cardName} card visual`}
    >
      <div className="absolute -right-12 -top-16 h-40 w-40 rounded-full bg-white/25 blur-3xl transition duration-700 group-hover:scale-125 group-hover:opacity-80" />
      <div className="absolute -bottom-16 -left-10 h-44 w-44 rounded-full border border-white/15 transition duration-700 group-hover:translate-x-8 group-hover:-translate-y-4" />
      <div className="pointer-events-none absolute inset-y-0 -left-[70%] w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 group-hover:translate-x-[380%] motion-reduce:hidden" />
      <div className="relative flex h-full flex-col justify-between p-4 text-white sm:p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-9 min-w-9 items-center justify-center rounded-full border border-white/35 bg-white/10 px-2 text-xs font-bold tracking-[0.08em] backdrop-blur">
            {card.brandLogo}
          </div>
          <span className="text-sm font-semibold uppercase tracking-[0.08em] text-white/90">{card.cardNetwork[0]}</span>
        </div>
        <div className="flex items-end justify-between gap-4 transition duration-500 group-hover:-translate-y-1">
          <div>
            <div className="mb-3 h-7 w-11 rounded-md border border-white/30 bg-gradient-to-br from-amber-100 to-amber-400 shadow-inner shadow-amber-950/30" />
            <div className="text-base font-semibold tracking-tight text-white sm:text-lg">{card.shortName}</div>
            <div className="mt-1 font-mono text-[10px] tracking-[0.16em] text-white/70 sm:text-xs">•••• 2048</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/60">Crypto card</div>
            <div className="mt-1 h-1.5 w-12 rounded-full bg-emerald-300 shadow-[0_0_16px_rgba(110,231,183,0.9)]" />
          </div>
        </div>
      </div>
    </div>
  );
}
