import Link from "next/link";
import { navItems } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site-footer border-t">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <div>
          <div className="text-lg font-semibold text-slate-950">U 卡对比</div>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
            本站内容仅用于信息整理和产品对比，不构成金融建议、投资建议、税务建议或法律建议。加密资产和相关金融产品存在价格波动、账户限制、政策变化和服务中止风险。所有费用、返现、地区限制、KYC 要求和权益规则可能随时调整，请以官方公告和服务条款为准。
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          {navItems.concat([{ href: "/sources", label: "来源" }]).map((item) => (
            <Link key={item.href} href={item.href} className="text-slate-600 hover:text-slate-950">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
