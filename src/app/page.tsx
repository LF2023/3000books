import type { Metadata } from "next";
import Link from "next/link";
import { getBookIndex } from "@/lib/books";

export const metadata: Metadata = {
  title: "叁仟书屋 · 3000 Books",
  description:
    "叁仟书屋是一个安静的非营利文化计划，昵称「3000本书」。关心阅读、保存与公共文化。",
  alternates: { canonical: "/" },
};

const values = [
  {
    title: "阅读",
    body: "把书当作日常，而不是展示。阅读是进入文字的方式，不必急于变成产品。",
  },
  {
    title: "保存",
    body: "让文字有处可栖。保存不是囤积，而是让值得留下的东西经得起时间。",
  },
  {
    title: "公共文化",
    body: "书属于公共生活。我们希望文化能被遇见、被分享，而不是锁在封闭的收藏里。",
  },
];

export default async function HomePage() {
  let count: number | null = null;
  try {
    count = (await getBookIndex()).length;
  } catch {
    // 数据仓不可达时降级为静态文案，不让首页挂掉
  }

  return (
    <article className="space-y-24">
      <header className="space-y-8 border-b border-rule pb-16">
        <p className="font-mono text-xs tracking-[0.3em] text-ink-soft">
          3000 BOOKS · NON-PROFIT READING
        </p>
        <h1 className="text-6xl leading-none tracking-[0.16em] sm:text-7xl">
          叁仟书屋
        </h1>
        <p className="max-w-xl text-lg leading-loose text-ink-soft">
          一个安静的非营利文化计划，昵称「3000本书」。
        </p>
      </header>

      <section
        aria-label="站点数据"
        className="grid grid-cols-3 gap-6 border-y border-rule py-8"
      >
        <div>
          <p className="font-mono text-3xl text-ink sm:text-4xl">
            {count ?? "—"}
          </p>
          <p className="mt-2 font-sans text-xs tracking-[0.2em] text-ink-soft">现存书目</p>
        </div>
        <div>
          <p className="font-mono text-3xl text-ink sm:text-4xl">3000</p>
          <p className="mt-2 font-sans text-xs tracking-[0.2em] text-ink-soft">最终目标</p>
        </div>
        <div>
          <p className="font-mono text-3xl text-ink sm:text-4xl">0</p>
          <p className="mt-2 font-sans text-xs tracking-[0.2em] text-ink-soft">全文下载</p>
        </div>
      </section>

      <section className="max-w-xl space-y-5 text-[1.05rem] leading-[2] text-ink">
        <p>
          叁仟书屋不把规模写成成绩。我们先把态度说清楚：阅读应当缓慢，保存应当郑重，公共文化应当向人敞开。
        </p>
        <p>
          这是一处纸与墨的站点。目录从一百本种子开始，仍不提供全文下载。若你路过，欢迎读完这些句子；若你愿意写信，信会到达。
        </p>
      </section>

      <section aria-labelledby="values-heading" className="space-y-8">
        <h2
          id="values-heading"
          className="font-mono text-xs tracking-[0.3em] text-ink-soft"
        >
          我们看重的三件事
        </h2>
        <ol className="divide-y divide-rule border-y border-rule">
          {values.map((value, i) => (
            <li
              key={value.title}
              className="flex flex-col gap-2 py-6 sm:flex-row sm:items-baseline sm:gap-10"
            >
              <span aria-hidden="true" className="font-mono text-sm text-seal">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-xl tracking-[0.18em] sm:w-40 sm:shrink-0">
                {value.title}
              </h3>
              <p className="text-[0.95rem] leading-relaxed text-ink-soft">
                {value.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="grid gap-12 border-t border-rule pt-12 sm:grid-cols-2">
        <div className="space-y-4">
          <h2 className="font-mono text-xs tracking-[0.3em] text-ink-soft">书单</h2>
          <p className="text-[1.02rem] leading-loose text-ink-soft">
            只列书目，不提供下载。
          </p>
          <Link
            href="/books"
            className="inline-block text-2xl tracking-[0.14em] text-ink no-underline hover:text-seal"
          >
            浏览书单 →
          </Link>
        </div>
        <div className="space-y-4">
          <h2 className="font-mono text-xs tracking-[0.3em] text-ink-soft">联络</h2>
          <p className="text-[1.02rem] leading-loose text-ink-soft">
            来信请寄，信会到达。
          </p>
          <a
            href="mailto:admin@3000books.org"
            className="inline-block text-2xl tracking-[0.06em] text-ink no-underline hover:text-seal"
          >
            admin@3000books.org
          </a>
        </div>
      </section>
    </article>
  );
}
