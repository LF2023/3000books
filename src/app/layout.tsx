import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const siteName = "叁仟书屋";
const siteUrl = "https://3000books.org";
const description =
  "叁仟书屋是一个安静的非营利文化计划，昵称「3000本书」。关心阅读、保存与公共文化。";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} · 3000 Books`,
    template: `%s · ${siteName}`,
  },
  description,
  applicationName: siteName,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  keywords: ["叁仟书屋", "3000 Books", "3000本书", "阅读", "公共文化"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: siteUrl,
    siteName,
    title: `${siteName} · 3000 Books`,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="flex min-h-screen flex-col antialiased">
        <SiteHeader />
        <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16 sm:px-8 sm:py-24">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
