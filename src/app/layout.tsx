import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ComparisonProvider } from "@/components/ComparisonProvider";
import { Footer } from "@/components/Footer";
import { FloatingCompareBar } from "@/components/FloatingCompareBar";
import { Navigation } from "@/components/Navigation";
import { RouteTransition } from "@/components/RouteTransition";
import { cards } from "@/lib/cards";
import { absoluteUrl, siteConfig } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "全球 U 卡对比指南 | 加密货币银行卡与虚拟卡比较",
    template: "%s | U 卡对比",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.author }],
  keywords: [
    "U 卡",
    "U 卡推荐",
    "加密货币银行卡",
    "虚拟卡",
    "实体 U 卡",
    "USDT 银行卡",
    "Crypto Card",
    "日本 U 卡",
    "香港 U 卡",
    "U 卡返现",
    "U 卡手续费",
    "U 卡对比",
    "U 卡申请",
  ],
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: "全球 U 卡对比指南",
    description: siteConfig.description,
    url: absoluteUrl("/"),
    images: [
      {
        url: "/assets/crypto-card-comparison.png",
        width: 1600,
        height: 900,
        alt: "Crypto card comparison dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "全球 U 卡对比指南",
    description: siteConfig.description,
    images: ["/assets/crypto-card-comparison.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col antialiased">
        <ComparisonProvider>
          <Navigation />
          <RouteTransition>{children}</RouteTransition>
          <Footer />
          <FloatingCompareBar cards={cards} />
        </ComparisonProvider>
      </body>
    </html>
  );
}
