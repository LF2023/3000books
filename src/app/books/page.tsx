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
    <article className="space-y-12">
      <header className="space-y-4">
        <p className="font-sans text-xs tracking-[0.28em] text-ink-soft">Catalogue</p>
        <h1 className="text-4xl tracking-[0.16em]">书单</h1>
        <p className="max-w-xl text-[1.05rem] leading-[2] text-ink-soft">
          先放一百本种子。这里只列书目，不提供全文，也不把公版写成已经核验过的事实。
        </p>
      </header>

      <nav aria-label="按类目筛选" className="flex flex-wrap gap-x-4 gap-y-2 font-sans text-sm text-ink-soft">
        <Link
          href="/books"
          className={`no-underline underline-offset-[0.35em] hover:text-ink ${
            !selected ? "text-ink underline decoration-rule" : "hover:underline"
          }`}
        >
          全部
        </Link>
        {CATEGORIES.map((category) => (
          <Link
            key={category}
            href={`/books?category=${encodeURIComponent(category)}`}
            className={`no-underline underline-offset-[0.35em] hover:text-ink ${
              selected === category
                ? "text-ink underline decoration-rule"
                : "hover:underline"
            }`}
          >
            {category}
          </Link>
        ))}
      </nav>

      <p className="font-sans text-xs tracking-wide text-ink-soft">
        {visible.length} 本
      </p>

      <div className="space-y-16">
        {groups.map((group) => (
          <section key={group.category} aria-labelledby={`cat-${group.category}`}>
            <h2
              id={`cat-${group.category}`}
              className="mb-6 font-sans text-xs tracking-[0.28em] text-ink-soft"
            >
              {group.category}
            </h2>
            <ul className="divide-y divide-rule/80 border-y border-rule/80">
              {group.books.map((book) => (
                <li key={book.id}>
                  <Link
                    href={`/books/${book.slug}`}
                    className="flex flex-col gap-1 py-4 no-underline hover:text-seal sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                  >
                    <span className="text-lg tracking-[0.08em]">{book.title}</span>
                    <span className="font-sans text-sm text-ink-soft">
                      {book.author}
                      <span className="mx-2 text-rule">·</span>
                      {book.era}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </article>
  );
}
