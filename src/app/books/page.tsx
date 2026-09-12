import type { Metadata } from "next";
import Link from "next/link";
import { CATEGORIES, getBookIndex, groupByCategory } from "@/lib/books";

export const metadata: Metadata = {
  title: "书单",
  description: "叁仟书屋种子书单。只列书目，不提供全文下载。公版状态未逐本核验。",
  alternates: { canonical: "/books" },
};

export default async function BooksPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category: rawCategory } = await searchParams;
  const books = await getBookIndex();
  const selected =
    rawCategory && CATEGORIES.includes(rawCategory as (typeof CATEGORIES)[number])
      ? rawCategory
      : undefined;
  const visible = selected
    ? books.filter((book) => book.category === selected)
    : books;
  const groups = groupByCategory(visible);

  return (
    <article className="space-y-14">
      <header className="space-y-4">
        <p className="font-mono text-xs tracking-[0.3em] text-ink-soft">CATALOGUE</p>
        <h1 className="text-5xl tracking-[0.16em]">书单</h1>
        <p className="max-w-xl text-[1.05rem] leading-[2] text-ink-soft">
          先放一百本种子。这里只列书目，不提供全文，也不把公版写成已经核验过的事实。
        </p>
      </header>

      <nav
        aria-label="按类目筛选"
        className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-sm text-ink-soft"
      >
        <Link
          href="/books"
          className={`no-underline underline-offset-[0.35em] hover:text-seal ${
            !selected ? "text-seal underline decoration-seal" : "hover:underline"
          }`}
        >
          全部
        </Link>
        {CATEGORIES.map((category) => (
          <Link
            key={category}
            href={`/books?category=${encodeURIComponent(category)}`}
            className={`no-underline underline-offset-[0.35em] hover:text-seal ${
              selected === category
                ? "text-seal underline decoration-seal"
                : "hover:underline"
            }`}
          >
            {category}
          </Link>
        ))}
      </nav>

      <p className="font-mono text-xs tracking-[0.2em] text-ink-soft">
        {visible.length} 本
      </p>

      <div className="space-y-16">
        {groups.map((group) => (
          <section key={group.category} aria-labelledby={`cat-${group.category}`}>
            <div className="mb-4 flex items-baseline justify-between border-b border-rule-strong pb-3">
              <h2
                id={`cat-${group.category}`}
                className="font-mono text-xs tracking-[0.3em] text-ink-soft"
              >
                {group.category}
              </h2>
              <span aria-hidden="true" className="font-mono text-xs text-ink-faint">
                {String(group.books.length).padStart(2, "0")}
              </span>
            </div>
            <ol className="divide-y divide-rule/80">
              {group.books.map((book, i) => (
                <li key={book.id}>
                  <Link
                    href={`/books/${book.slug}`}
                    className="flex flex-col gap-1 py-4 no-underline hover:text-seal sm:flex-row sm:items-baseline sm:gap-6"
                  >
                    <span
                      aria-hidden="true"
                      className="hidden w-8 shrink-0 font-mono text-xs text-ink-faint sm:block"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-lg tracking-[0.08em]">
                      {book.title}
                    </span>
                    <span className="font-sans text-sm text-ink-soft">
                      {book.author}
                      <span aria-hidden="true" className="mx-2 text-rule-strong">·</span>
                      {book.era}
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </article>
  );
}
