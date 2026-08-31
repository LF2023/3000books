import type { Metadata } from "next";

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
          我们不把这里做成商店，也不急于公布尚未成形的书目。先写下阅读、保存与公共文化这三件事，是为了让来访者知道：这是一处与书有关的公共空间，而不是一套待售的服务。
        </p>
        <p>
          纸页还薄。若你愿意等候，请把等候当作阅读的一部分。
        </p>
      </div>
    </article>
  );
}
