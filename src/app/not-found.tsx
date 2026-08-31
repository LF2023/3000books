import Link from "next/link";

export default function NotFound() {
  return (
    <article className="max-w-xl space-y-6">
      <h1 className="text-3xl tracking-[0.16em]">此页不存在</h1>
      <p className="leading-loose text-ink-soft">你要找的纸页尚未写下。</p>
      <p>
        <Link href="/" className="underline decoration-rule">
          回到首页
        </Link>
      </p>
    </article>
  );
}
