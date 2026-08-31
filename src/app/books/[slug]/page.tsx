import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBookIndex, getBookMeta } from "@/lib/books";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const books = await getBookIndex();
  return books.map((book) => ({ slug: book.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const books = await getBookIndex();
  const item = books.find((book) => book.slug === slug);
  if (!item) {
    return { title: "未找到" };
  }
  const meta = await getBookMeta(item.id, item.slug);
  const description = meta?.oneSentenceSummary ?? `${item.title} · ${item.author}`;
  return {
    title: item.title,
    description,
    alternates: { canonical: `/books/${item.slug}` },
  };
}

export default async function BookPage({ params }: PageProps) {
  const { slug } = await params;
  const books = await getBookIndex();
  const item = books.find((book) => book.slug === slug);
  if (!item) notFound();
  const meta = await getBookMeta(item.id, item.slug);
  if (!meta) notFound();

  return (
    <article className="max-w-xl space-y-10">
      <p className="font-sans text-sm text-ink-soft">
        <Link href="/books" className="text-ink-soft no-underline hover:text-ink hover:underline">
          书单
        </Link>
        <span className="mx-2 text-rule">/</span>
        {meta.category}
      </p>

      <header className="space-y-4">
        <h1 className="text-4xl tracking-[0.12em]">{meta.title}</h1>
        <p className="font-sans text-sm tracking-wide text-ink-soft">
          {meta.author.name}
          <span className="mx-2 text-rule">·</span>
          {meta.author.era}
        </p>
      </header>

      <p className="text-[1.05rem] leading-[2]">{meta.oneSentenceSummary}</p>

      {meta.tags.length > 0 ? (
        <ul className="flex flex-wrap gap-2 font-sans text-xs tracking-wide text-ink-soft">
          {meta.tags.map((tag) => (
            <li key={tag} className="border border-rule px-2 py-1">
              {tag}
            </li>
          ))}
        </ul>
      ) : null}

      <aside className="border-t border-rule pt-8 text-[0.95rem] leading-loose text-ink-soft">
        <p>本站暂不提供全文下载。公版状态未逐本核验。</p>
      </aside>
    </article>
  );
}
