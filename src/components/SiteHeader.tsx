import Link from "next/link";

const nav = [
  { href: "/", label: "首页" },
  { href: "/about", label: "关于" },
  { href: "/contact", label: "联络" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-rule/80">
      <div className="mx-auto flex max-w-3xl items-baseline justify-between gap-6 px-6 py-6 sm:px-8">
        <Link
          href="/"
          className="font-serif text-lg tracking-[0.18em] text-ink no-underline"
        >
          叁仟书屋
        </Link>
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
