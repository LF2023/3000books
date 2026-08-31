const DATA_BASE =
  "https://raw.githubusercontent.com/LF2023/3000-books-data/main";

export const CATEGORIES = [
  "哲学",
  "自然科学",
  "历史与社会",
  "文学",
  "地理艺术",
] as const;

export type Category = (typeof CATEGORIES)[number];

export type BookIndexItem = {
  id: string;
  slug: string;
  title: string;
  author: string;
  era: string;
  category: string;
};

export type BookMeta = {
  id: string;
  slug: string;
  title: string;
  author: { name: string; era: string };
  category: string;
  tags: string[];
  language: string;
  rights: { status: string; hostsFullText: boolean };
  oneSentenceSummary: string;
};

const revalidate = { next: { revalidate: 3600 } };

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url, revalidate);
  if (!res.ok) {
    throw new Error(`读取书目失败 ${res.status}: ${url}`);
  }
  return (await res.json()) as T;
}

export async function getBookIndex(): Promise<BookIndexItem[]> {
  const books = await getJson<BookIndexItem[]>(`${DATA_BASE}/books/index.json`);
  return [...books].sort((a, b) => a.id.localeCompare(b.id));
}

export async function getBookMeta(
  id: string,
  slug: string,
): Promise<BookMeta | null> {
  const url = `${DATA_BASE}/books/${id}-${slug}/meta.json`;
  const res = await fetch(url, revalidate);
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`读取书目失败 ${res.status}: ${url}`);
  }
  return (await res.json()) as BookMeta;
}

export function groupByCategory(books: BookIndexItem[]) {
  const groups: { category: string; books: BookIndexItem[] }[] = [];
  for (const category of CATEGORIES) {
    const items = books.filter((book) => book.category === category);
    if (items.length) groups.push({ category, books: items });
  }
  const known = new Set<string>(CATEGORIES);
  const extras = [...new Set(books.map((b) => b.category).filter((c) => !known.has(c)))];
  for (const category of extras) {
    groups.push({
      category,
      books: books.filter((book) => book.category === category),
    });
  }
  return groups;
}
