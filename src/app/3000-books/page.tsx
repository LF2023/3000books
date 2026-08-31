import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "3000本书籍",
  description: "叁仟书屋的第一件事：聚拢 3000 本值得留存的书目。",
  alternates: { canonical: "/3000-books" },
};

export default function ThreeThousandBooksPage() {
  return (
    <article className="max-w-xl space-y-10">
      <header className="space-y-4">
        <p className="font-sans text-xs tracking-[0.28em] text-ink-soft">3000 Books</p>
        <h1 className="text-4xl tracking-[0.16em]">3000本书籍</h1>
      </header>

      <div className="space-y-6 text-[1.05rem] leading-[2]">
        <p>
          第一件事是书目。叁仟书屋想聚拢三千本值得留存的书——不为凑数，只为让「值得」有一个可以慢慢翻阅的清单。
        </p>
        <p>
          现在的一百本种子，已经放进{" "}
          <Link href="/books" className="underline decoration-rule">
            书单
          </Link>
          。此后的每一本，都会先经过挑选，再进入目录；数字增长得慢，也没有关系。
        </p>
        <p>
          书目只作整理与指引。本站不提供全文下载，公版状态亦未逐本核验，这些诚实的保留，是清单的一部分。
        </p>
      </div>
    </article>
  );
}