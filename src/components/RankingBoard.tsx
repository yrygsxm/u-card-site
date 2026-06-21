import Link from "next/link";
import { ArrowRight, Trophy } from "lucide-react";
import { rankingDefinitions } from "@/lib/cards";
import { Badge } from "@/components/Badge";
import { CardVisual } from "@/components/CardVisual";

export function RankingBoard() {
  return (
    <div className="space-y-8">
      {rankingDefinitions.map((ranking) => (
        <section
          key={ranking.slug}
          id={ranking.slug}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-950/5"
        >
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
            <div>
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-amber-500" />
                <h2 className="text-xl font-semibold text-slate-950">{ranking.title}</h2>
              </div>
              <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-600">{ranking.logic}</p>
            </div>
            <Badge tone="warning">排名逻辑已说明</Badge>
          </div>
          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {ranking.cards.slice(0, 3).map((card, index) => (
              <Link
                href={`/cards/${card.slug}`}
                key={`${ranking.slug}-${card.slug}`}
                className="group rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-200 hover:bg-blue-50"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-950 font-mono text-sm font-semibold text-white">
                    {index + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-slate-950">{card.cardName}</div>
                    <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-600">{card.oneLine}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <CardVisual card={card} compact />
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="font-mono text-lg font-semibold text-slate-950">{card.overallScore}/100</div>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-blue-700">
                    详情
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
