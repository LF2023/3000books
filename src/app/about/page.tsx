import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "关于",
  description: "关于叁仟书屋：一个安静的非营利文化计划，昵称「3000本书」。",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <article className="max-w-xl space-y-10">
      <header className="space-y-4">
        <p className="font-sans text-xs tracking-[0.28em] text-ink-soft">About</p>
        <h1 className="text-4xl tracking-[0.16em]">关于</h1>
      </header>

      <div className="space-y-6 text-[1.05rem] leading-[2]">
        <p>
          叁仟书屋（3000 Books）是一个安静的非营利文化计划，昵称「3000本书」。站点设在{" "}
          <a href="https://3000books.org" className="underline decoration-rule">
            3000books.org
          </a>
          。
        </p>
        <p>
          我们不把这里做成商店。书目从一百本种子开始，见{" "}
          <Link href="/books" className="underline decoration-rule">
            书单
          </Link>
          ；本站不提供全文下载，公版状态也未逐本核验。
        </p>
        <p>
          纸页还薄。若你愿意等候，请把等候当作阅读的一部分。
        </p>
      </div>
    </article>
  );
}
