import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AboutExperience } from "@/components/AboutExperience";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "关于 APPDO",
  description: "APPDO 数字生活指南：专注于 App 评测、数字工具推荐与实用教程。",
  alternates: { canonical: absoluteUrl("/about") },
};

export default function AboutPage() {
  return (
    <div className={inter.className}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "APPDO 数字生活指南",
          url: "https://appdo.xyz",
          description: "专注于 App 评测、数字工具推荐与使用教程的内容平台。",
        }}
      />
      <AboutExperience />
    </div>
  );
}
