export function SiteFooter() {
  return (
    <footer className="border-t border-rule/80">
      <div className="mx-auto flex max-w-3xl flex-col gap-2 px-6 py-8 font-sans text-xs tracking-wide text-ink-soft sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>© 2026 叁仟书屋</p>
        <p>
          <a href="mailto:admin@3000books.org" className="text-ink-soft no-underline hover:text-seal">
            admin@3000books.org
          </a>
        </p>
      </div>
    </footer>
  );
}
