import type { Metadata } from "next";
import { SubmissionForm } from "@/components/SubmissionForm";

export const metadata: Metadata = {
  title: "3000座书屋",
  description: "书被安放的处所：叁仟书屋的第二件事。",
  alternates: { canonical: "/3000-houses" },
};

export default function ThreeThousandHousesPage() {
  return (
    <article className="max-w-xl space-y-10">
      <header className="space-y-4">
        <p className="font-sans text-xs tracking-[0.28em] text-ink-soft">3000 Houses</p>
        <h1 className="text-4xl tracking-[0.16em]">3000座书屋</h1>
      </header>

      <div className="space-y-6 text-[1.05rem] leading-[2]">
        <p>
          书不该只活在目录里。它需要一个被安放的位置——一间屋子、一面墙、一处任何人都能走近的书架。叁仟书屋的第二个愿望，是让这样的处所慢慢出现。
        </p>
        <p>
          如实说明：目前一间实体书屋也没有。没有节点清单，没有守书人，也没有任何被登记的馆藏。我们不想用想象中的地图代替真实。
        </p>
        <p>
          当第一座书屋真正立起来，它会连同地址与来历一起，写在这一页。在那之前，这里保留空白。
        </p>
      </div>
      <section aria-labelledby="submit-heading" className="max-w-xl space-y-6 border-t border-rule pt-10">
        <h2 id="submit-heading" className="text-xl tracking-[0.12em]">提供一处书屋线索</h2>
        <SubmissionForm
          subject="书屋线索"
          submitLabel="提交线索"
          fields={[
            { name: "country", label: "国家", required: true },
            { name: "place", label: "地点", required: true, placeholder: "城市 / 街区" },
            {
              name: "kind",
              label: "书屋类型",
              type: "select",
              options: ["图书馆", "书店", "咖啡馆", "学校", "其他"],
            },
            {
              name: "status",
              label: "现状",
              type: "select",
              options: ["已开放", "筹备中", "只是一个想法"],
            },
            { name: "contact", label: "联系方式", required: true, help: "邮箱或可转达的渠道" },
            { name: "notes", label: "补充说明", type: "textarea", placeholder: "任何值得知道的细节" },
          ]}
        />
      </section>
    </article>
  );
}