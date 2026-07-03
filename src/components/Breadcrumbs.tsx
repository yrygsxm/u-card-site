import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export type Crumb = {
  label: string;
  href?: string;
};

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500" aria-label="面包屑">
      <Link href="/" className="inline-flex items-center gap-1 hover:text-slate-900">
        <Home className="h-4 w-4" />
        首页
      </Link>
      {items.map((item) => (
        <span key={`${item.label}-${item.href ?? "current"}`} className="inline-flex items-center gap-2">
          <ChevronRight className="h-4 w-4 text-slate-300" />
          {item.href ? (
            <Link href={item.href} className="hover:text-slate-900">
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-slate-700">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
