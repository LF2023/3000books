import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "3000个故事",
  description: "书与人相遇的事：叁仟书屋的第三件事。",
  alternates: { canonical: "/3000-stories" },
};

export default function ThreeThousandStoriesPage() {
  return (
    <article className="max-w-xl space-y-10">
      <header className="space-y-4">
        <p className="font-sans text-xs tracking-[0.28em] text-ink-soft">3000 Stories</p>
        <h1 className="text-4xl tracking-[0.16em]">3000个故事</h1>
      </header>

      <div className="space-y-6 text-[1.05rem] leading-[2]">
        <p>
          每本书背后都有一场相遇：谁在什么时候翻开它，被哪一句留住，又把它交给了谁。叁仟书屋想收集这样的三千件事——不写书评，只记相遇。
        </p>
        <p>
          故事的征集尚未开始。等到开始的那天，会先立下规矩：自愿、署名可隐、不用于任何售卖。
        </p>
        <p>
          在此之前，如果你有一件想先讲的事，可以写信给{" "}
          <a href="mailto:admin@3000books.org" className="underline decoration-rule">
            admin@3000books.org
          </a>
          。信会被读到。
        </p>
      </div>
    </article>
  );
}