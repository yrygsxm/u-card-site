import Link from "next/link";
import { CreditCard, ShieldCheck } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { navItems } from "@/lib/site";

export function Navigation() {
  return (
    <header className="site-header sticky top-0 z-40 border-b backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-white">
            <CreditCard className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold text-slate-950">U 卡对比</span>
            <span className="block truncate text-xs text-slate-500">Crypto Card Compare</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="主导航">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-950"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/sources"
            className="hidden items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-100 sm:flex"
          >
            <ShieldCheck className="h-4 w-4" />
            来源与免责声明
          </Link>
        </div>
      </div>
      <nav className="flex gap-1 overflow-x-auto border-t border-slate-100 px-4 py-2 md:hidden" aria-label="移动导航">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="shrink-0 rounded-full px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
