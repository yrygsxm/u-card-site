import Image from "next/image";
import Link from "next/link";
import { Mail, Send } from "lucide-react";
import { navItems } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site-footer border-t">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.7fr_0.9fr]">
          <div>
            <a
              href="https://appdo.xyz"
              target="_blank"
              rel="noreferrer"
              className="inline-flex max-w-44 items-center"
              aria-label="访问 APPDO 主网站"
            >
              <Image
                src="/assets/appdo-logo.png"
                width={793}
                height={328}
                unoptimized
                alt="APPDO 数字生活指南"
                className="h-auto w-full"
              />
            </a>
            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400">
              本站由 APPDO 数字生活指南提供内容支持，专注于加密货币银行卡、数字工具与跨境消费信息整理。
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-100">快速导航</h2>
            <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-3 text-sm">
              {navItems.concat([{ href: "/sources", label: "来源" }]).map((item) => (
                <Link key={item.href} href={item.href} className="text-slate-400 hover:text-white">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-100">品牌合作</h2>
            <p className="mt-4 text-sm leading-6 text-slate-400">
              欢迎产品收录、数据更正、媒体传播与品牌合作。请通过合作邮箱联系，我们会在核验后回复。
            </p>
            <a
              href="mailto:pm@song.al"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-200 hover:text-white"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              pm@song.al
            </a>
            <div className="mt-5 flex flex-wrap gap-2" aria-label="APPDO 社交媒体与联系方式">
              <a
                href="https://x.com/APPDOTG"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-3 text-sm font-semibold text-slate-100 transition hover:border-slate-500 hover:bg-slate-800"
                aria-label="访问 APPDO X"
              >
                <span className="text-base leading-none" aria-hidden="true">𝕏</span>
                X
              </a>
              <a
                href="https://t.me/appdodo"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-3 text-sm font-semibold text-slate-100 transition hover:border-slate-500 hover:bg-slate-800"
                aria-label="加入 APPDO Telegram"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
                Telegram
              </a>
              <a
                href="mailto:pm@song.al"
                className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-3 text-sm font-semibold text-slate-100 transition hover:border-slate-500 hover:bg-slate-800"
                aria-label="通过邮箱联系 APPDO"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                邮箱
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
