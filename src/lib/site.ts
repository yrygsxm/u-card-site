export const siteConfig = {
  name: "全球 U 卡对比指南",
  shortName: "U 卡对比",
  description:
    "面向中文用户的 U 卡、加密货币银行卡、虚拟卡与实体卡信息聚合和对比工具。",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ucard.example.com",
  locale: "zh_CN",
  author: "U 卡对比编辑部",
};

export const navItems = [
  { href: "/", label: "首页" },
  { href: "/cards", label: "U 卡列表" },
  { href: "/compare", label: "横向对比" },
  { href: "/rankings", label: "排行榜" },
  { href: "/guides", label: "指南" },
  { href: "/methodology", label: "评分方法" },
];

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
