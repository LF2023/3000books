import type { Metadata } from "next";
import Link from "next/link";

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

export default function HomePage() {
  return (
    <article className="space-y-20">
      <header className="space-y-6">
        <p className="font-sans text-xs tracking-[0.35em] text-ink-soft uppercase">
          3000 Books
        </p>
        <h1 className="text-[2.6rem] leading-none tracking-[0.22em] sm:text-6xl">
          叁仟书屋
        </h1>
        <p className="max-w-xl text-lg leading-loose text-ink-soft">
          一个安静的非营利文化计划，昵称「3000本书」。
        </p>
        <p className="text-base leading-loose tracking-[0.1em] text-ink">
          3000本书籍，3000座书屋，3000个故事。
        </p>
      </header>

      <section className="max-w-xl space-y-5 text-[1.05rem] leading-[2] text-ink">
        <p>
          叁仟书屋不把规模写成成绩。我们先把态度说清楚：阅读应当缓慢，保存应当郑重，公共文化应当向人敞开。
        </p>
        <p>
          这是一处纸与墨的站点。目录从一百本种子开始，仍不提供全文下载。若你路过，欢迎读完这些句子；若你愿意写信，信会到达。
        </p>
      </section>

      <section aria-labelledby="values-heading" className="space-y-8">
        <h2 id="values-heading" className="font-sans text-xs tracking-[0.28em] text-ink-soft">
          我们看重的三件事
        </h2>
        <ul className="grid gap-10 sm:grid-cols-3">
          {values.map((value) => (
            <li key={value.title} className="space-y-3 border-t border-rule pt-5">
              <h3 className="text-xl tracking-[0.18em]">{value.title}</h3>
              <p className="text-[0.95rem] leading-relaxed text-ink-soft">
                {value.body}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="max-w-xl border-t border-rule pt-10 text-[1.02rem] leading-loose">
        <h2 className="mb-3 text-xl tracking-[0.12em]">书单</h2>
        <p className="text-ink-soft">
          一百本种子已放在{" "}
          <Link href="/books" className="text-ink underline decoration-rule">
            书单
          </Link>
          。只列书目，不提供下载。
        </p>
      </section>

      <section className="max-w-xl border-t border-rule pt-10 text-[1.02rem] leading-loose">
        <h2 className="mb-3 text-xl tracking-[0.12em]">联络</h2>
        <p className="text-ink-soft">
          来信请寄{" "}
          <a href="mailto:admin@3000books.org" className="text-ink underline decoration-rule">
            admin@3000books.org
          </a>
          。
        </p>
      </section>
    </article>
  );
}
