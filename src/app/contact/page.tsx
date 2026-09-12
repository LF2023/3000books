import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "联络",
  description: "联络叁仟书屋：admin@3000books.org",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <article className="max-w-xl space-y-12">
      <header className="space-y-4">
        <p className="font-mono text-xs tracking-[0.3em] text-ink-soft">CONTACT</p>
        <h1 className="text-5xl tracking-[0.14em]">联络</h1>
      </header>

      <div className="space-y-6 text-[1.05rem] leading-[2]">
        <p>目前只设一封信箱。若你有话要说，请直接写信。</p>
        <p>
          <a
            href="mailto:admin@3000books.org"
            className="text-2xl tracking-[0.06em] text-ink underline decoration-rule-strong hover:text-seal"
          >
            admin@3000books.org
          </a>
        </p>
        <p className="text-ink-soft">我们会在能够回复的时候回复。请不必催促。</p>
      </div>
    </article>
  );
}
