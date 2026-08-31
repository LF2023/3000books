import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "联络",
  description: "联络叁仟书屋：admin@3000books.org",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <article className="max-w-xl space-y-10">
      <header className="space-y-4">
        <p className="font-sans text-xs tracking-[0.28em] text-ink-soft">Contact</p>
        <h1 className="text-4xl tracking-[0.16em]">联络</h1>
      </header>

      <div className="space-y-6 text-[1.05rem] leading-[2]">
        <p>目前只设一封信箱。若你有话要说，请直接写信。</p>
        <p>
          <a
            href="mailto:admin@3000books.org"
            className="text-xl tracking-wide text-ink underline decoration-rule"
          >
            admin@3000books.org
          </a>
        </p>
        <p className="text-ink-soft">我们会在能够回复的时候回复。请不必催促。</p>
      </div>
    </article>
  );
}
