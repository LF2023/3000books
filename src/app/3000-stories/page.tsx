import type { Metadata } from "next";
import { SubmissionForm } from "@/components/SubmissionForm";

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
          征集现在开始。规矩先立下：自愿、署名可隐、不用于任何售卖。
        </p>
        <p>
          在此之前，如果你有一件想先讲的事，可以写信给{" "}
          <a href="mailto:admin@3000books.org" className="underline decoration-rule">
            admin@3000books.org
          </a>
          。信会被读到。
        </p>
      </div>
      <section aria-labelledby="submit-heading" className="max-w-xl space-y-6 border-t border-rule pt-10">
        <h2 id="submit-heading" className="text-xl tracking-[0.12em]">讲一个故事</h2>
        <SubmissionForm
          subject="我和书籍的故事"
          submitLabel="讲给书屋"
          fields={[
            {
              name: "story",
              label: "我和书籍的故事",
              type: "textarea",
              required: true,
              placeholder: "从哪一本、哪一句讲起都可以",
            },
            { name: "book", label: "相关的书", placeholder: "书名与作者，可选" },
            { name: "caller", label: "你的称呼", help: "可选" },
            {
              name: "visibility",
              label: "公开意愿",
              type: "radio",
              required: true,
              options: ["愿意匿名公开", "愿意署名公开", "暂不公开"],
            },
          ]}
        />
      </section>
    </article>
  );
}