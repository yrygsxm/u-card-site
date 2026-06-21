import type { CryptoCard } from "@/lib/cards";

export function ScoreBreakdown({ card }: { card: CryptoCard }) {
  const entries = Object.values(card.scoreBreakdown);

  return (
    <div className="space-y-4">
      {entries.map((item) => (
        <div key={item.label} className="space-y-2">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-sm font-semibold text-slate-900">{item.label}</div>
              <p className="mt-1 text-xs leading-5 text-slate-500">{item.reason}</p>
            </div>
            <div className="font-mono text-sm font-semibold text-slate-900">
              {item.score}/{item.max}
            </div>
          </div>
          <div className="h-2 rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-emerald-500"
              style={{ width: `${Math.round((item.score / item.max) * 100)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
