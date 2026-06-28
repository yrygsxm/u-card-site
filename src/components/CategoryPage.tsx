import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CardExplorer } from "@/components/CardExplorer";
import type { CryptoCard } from "@/lib/cards";

export function CategoryPage({
  title,
  description,
  cards,
}: {
  title: string;
  description: string;
  cards: CryptoCard[];
}) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "U 卡列表", href: "/cards" }, { label: title }]} />
      <div className="mb-8 max-w-4xl">
        <h1 className="text-3xl font-semibold text-slate-950">{title}</h1>
        <p className="mt-3 text-base leading-7 text-slate-600">{description}</p>
      </div>
      <CardExplorer cards={cards} />
    </main>
  );
}
