import Link from "next/link";

const nav = [
  { href: "/", label: "首页" },
  { href: "/books", label: "书单" },
  { href: "/about", label: "关于" },
  { href: "/contact", label: "联络" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-rule/80">
      <div className="mx-auto flex max-w-3xl items-baseline justify-between gap-6 px-6 py-6 sm:px-8">
        <div className="flex items-baseline gap-4">
          <Link
            href="/"
            className="font-serif text-lg tracking-[0.18em] text-ink no-underline"
          >
            叁仟书屋
          </Link>
          <span className="hidden font-sans text-xs tracking-[0.1em] text-ink-soft sm:inline">
            <Link
              href="/3000-books"
              className="no-underline decoration-rule underline-offset-[0.35em] hover:underline hover:text-ink"
            >
              3000本书籍
            </Link>
            <span aria-hidden="true" className="mx-2">·</span>
            <Link
              href="/3000-houses"
              className="no-underline decoration-rule underline-offset-[0.35em] hover:underline hover:text-ink"
            >
              3000座书屋
            </Link>
            <span aria-hidden="true" className="mx-2">·</span>
            <Link
              href="/3000-stories"
              className="no-underline decoration-rule underline-offset-[0.35em] hover:underline hover:text-ink"
            >
              3000个故事
            </Link>
          </span>
        </div>
        <nav aria-label="主导航" className="flex gap-5 font-sans text-sm text-ink-soft">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="no-underline decoration-rule underline-offset-[0.35em] hover:underline hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
