import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBookIndex, getBookMeta } from "@/lib/books";
import { BookCover } from "@/components/BookCover";
import { coverUrlFor } from "@/lib/books";

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

  const rightsLabel = meta.rights.status === "public_domain" ? "公版" : "未核验";
  const hasRealCover = Boolean(coverUrlFor(item));
  const coverNote = hasRealCover
    ? "页面封面来自公开书目库。"
    : "页面书衣为站内排印生成，非原书装帧。";

  return (
    <article className="max-w-3xl space-y-10">
      <p className="rise font-mono text-sm text-ink-soft">
        <Link href="/books" className="no-underline hover:text-seal">
          书单
        </Link>
        <span aria-hidden="true" className="mx-2 text-rule-strong">/</span>
        {meta.category}
      </p>

      <div className="rise flex flex-col gap-10 sm:flex-row sm:gap-12" style={{ animationDelay: "0.1s" }}>
        <div className="mx-auto w-48 shrink-0 border border-rule sm:mx-0 sm:w-56">
          <BookCover
            variant="full"
            title={meta.title}
            category={meta.category}
            author={meta.author.name}
            coverUrl={coverUrlFor(item)}
          />
        </div>

        <div className="min-w-0 flex-1 space-y-6">
          <header className="space-y-4 border-b border-rule pb-8">
            <h1 className="text-4xl leading-snug tracking-[0.08em]">{meta.title}</h1>
            <p className="font-mono text-sm tracking-wide text-ink-soft">
              {meta.author.name}
              <span aria-hidden="true" className="mx-2 text-rule-strong">·</span>
              {meta.author.era}
            </p>
          </header>

          <p className="text-[1.05rem] leading-[2]">{meta.oneSentenceSummary}</p>

          {meta.tags.length > 0 ? (
            <ul className="flex flex-wrap gap-2 font-sans text-xs tracking-wide text-ink-soft">
              {meta.tags.map((tag) => (
                <li key={tag} className="border border-rule-strong px-2 py-1">
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      <aside
        className="rise space-y-2 border-t border-rule pt-8 text-[0.95rem] leading-loose text-ink-soft"
        style={{ animationDelay: "0.2s" }}
      >
        <p className="font-mono text-xs tracking-[0.15em]">
          语言 {meta.language}
          <span aria-hidden="true" className="mx-2 text-rule-strong">·</span>
          版权 {rightsLabel}
          <span aria-hidden="true" className="mx-2 text-rule-strong">·</span>
          不提供全文
        </p>
        <p>本站暂不提供全文下载。公版状态未逐本核验。{coverNote}</p>
      </aside>
    </article>
  );
}
