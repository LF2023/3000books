import { NextResponse } from "next/server";

const REPO = "LF2023/3000-books-data";
const ALLOWED_SUBJECTS = new Set(["书籍推荐", "书屋线索", "我和书籍的故事"]);

type Submission = {
  subject?: unknown;
  fields?: unknown;
  website?: unknown;
};

export async function POST(req: Request) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return NextResponse.json(
      { ok: false, error: "not-configured" },
      { status: 503 },
    );
  }

  let payload: Submission;
  try {
    payload = (await req.json()) as Submission;
  } catch {
    return NextResponse.json({ ok: false, error: "bad-json" }, { status: 400 });
  }

  const subject = typeof payload.subject === "string" ? payload.subject.trim() : "";
  if (!ALLOWED_SUBJECTS.has(subject)) {
    return NextResponse.json({ ok: false, error: "bad-subject" }, { status: 400 });
  }

  // Honeypot: silently accept, never create an issue.
  if (typeof payload.website === "string" && payload.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  if (!Array.isArray(payload.fields)) {
    return NextResponse.json({ ok: false, error: "bad-fields" }, { status: 400 });
  }
  const fields = payload.fields
    .filter(
      (f): f is { label: string; value: string } =>
        typeof f === "object" &&
        f !== null &&
        typeof (f as { label?: unknown }).label === "string" &&
        typeof (f as { value?: unknown }).value === "string",
    )
    .slice(0, 20)
    .map((f) => ({
      label: f.label.slice(0, 100),
      value: f.value.slice(0, 2000),
    }));
  if (fields.length === 0) {
    return NextResponse.json({ ok: false, error: "empty" }, { status: 400 });
  }

  const body =
    fields
      .map((f) => `**${f.label}**：${f.value.trim() || "（未填）"}`)
      .join("\n\n")
      .slice(0, 6000) + "\n\n---\n来自 3000books.org 表单提交。";

  const firstFilled = fields.find((f) => f.value.trim() !== "");
  const summary = firstFilled ? firstFilled.value.trim().slice(0, 40) : "（空白）";
  const title = `[${subject}] ${summary}`;

  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}/issues`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, body, labels: ["submission"] }),
    });
    if (!res.ok) {
      return NextResponse.json(
        { ok: false, error: `github-${res.status}` },
        { status: 502 },
      );
    }
    const issue = (await res.json()) as { html_url?: string };
    return NextResponse.json({ ok: true, url: issue.html_url });
  } catch {
    return NextResponse.json({ ok: false, error: "network" }, { status: 502 });
  }
}