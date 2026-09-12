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

  const rightsLabel = meta.rights.status === "public_domain" ? "公版" : "未核验";

  return (
    <article className="max-w-xl space-y-12">
      <p className="font-mono text-sm text-ink-soft">
        <Link href="/books" className="no-underline hover:text-seal">
          书单
        </Link>
        <span aria-hidden="true" className="mx-2 text-rule-strong">/</span>
        {meta.category}
      </p>

      <header className="space-y-6 border-b border-rule pb-10">
        <h1 className="text-5xl leading-tight tracking-[0.1em]">{meta.title}</h1>
        <p className="font-mono text-sm tracking-wide text-ink-soft">
          {meta.author.name}
          <span aria-hidden="true" className="mx-2 text-rule-strong">·</span>
          {meta.author.era}
        </p>
      </header>

      <p className="text-[1.08rem] leading-[2]">{meta.oneSentenceSummary}</p>

      {meta.tags.length > 0 ? (
        <ul className="flex flex-wrap gap-2 font-sans text-xs tracking-wide text-ink-soft">
          {meta.tags.map((tag) => (
            <li key={tag} className="border border-rule-strong px-2 py-1">
              {tag}
            </li>
          ))}
        </ul>
      ) : null}

      <aside className="space-y-2 border-t border-rule pt-8 text-[0.95rem] leading-loose text-ink-soft">
        <p className="font-mono text-xs tracking-[0.15em]">
          语言 {meta.language}
          <span aria-hidden="true" className="mx-2 text-rule-strong">·</span>
          版权 {rightsLabel}
          <span aria-hidden="true" className="mx-2 text-rule-strong">·</span>
          不提供全文
        </p>
        <p>本站暂不提供全文下载。公版状态未逐本核验。</p>
      </aside>
    </article>
  );
}
