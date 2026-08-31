"use client";

import { useState, type FormEvent } from "react";

export type FormField = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "select" | "radio";
  required?: boolean;
  placeholder?: string;
  help?: string;
  options?: string[];
};

type Status = "idle" | "sending" | "done";

export function SubmissionForm({
  subject,
  fields,
  submitLabel = "提交",
}: {
  subject: string;
  fields: FormField[];
  submitLabel?: string;
}) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [issueUrl, setIssueUrl] = useState<string | null>(null);
  const [fellBackToMail, setFellBackToMail] = useState(false);

  function set(name: string, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function mailtoUrl() {
    const lines = fields.map(
      (field) => `${field.label}：${(values[field.name] ?? "").trim() || "（未填）"}`,
    );
    const body = encodeURIComponent(lines.join("\n"));
    return `mailto:admin@3000books.org?subject=${encodeURIComponent(subject)}&body=${body}`;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status !== "idle") return;
    setStatus("sending");
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject,
          website: honeypot,
          fields: fields.map((field) => ({
            label: field.label,
            value: (values[field.name] ?? "").trim(),
          })),
        }),
      });
      const data = (await res.json()) as { ok?: boolean; url?: string };
      if (res.ok && data.ok) {
        setIssueUrl(data.url ?? null);
        setStatus("done");
        return;
      }
      throw new Error("submit failed");
    } catch {
      setFellBackToMail(true);
      setStatus("done");
      window.location.href = mailtoUrl();
    }
  }

  const inputClass =
    "w-full border border-rule bg-transparent px-3 py-2 font-sans text-[0.95rem] text-ink placeholder:text-ink-soft/60 focus:border-ink focus:outline-none";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {fields.map((field) => (
        <div key={field.name} className="space-y-2">
          {field.type === "radio" ? (
            <p className="font-sans text-sm text-ink-soft">
              {field.label}
              {field.required ? <span aria-hidden="true" className="ml-1">*</span> : null}
            </p>
          ) : (
            <label
              htmlFor={field.name}
              className="block font-sans text-sm text-ink-soft"
            >
              {field.label}
              {field.required ? <span aria-hidden="true" className="ml-1">*</span> : null}
              {field.help ? (
                <span className="block text-xs opacity-80">{field.help}</span>
              ) : null}
            </label>
          )}

          {field.type === "textarea" ? (
            <textarea
              id={field.name}
              name={field.name}
              rows={5}
              required={field.required}
              placeholder={field.placeholder}
              className={inputClass}
              value={values[field.name] ?? ""}
              onChange={(e) => set(field.name, e.target.value)}
            />
          ) : field.type === "select" ? (
            <select
              id={field.name}
              name={field.name}
              required={field.required}
              className={inputClass}
              value={values[field.name] ?? ""}
              onChange={(e) => set(field.name, e.target.value)}
            >
              <option value="">请选择</option>
              {field.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : field.type === "radio" ? (
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {field.options?.map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-2 font-sans text-[0.95rem] text-ink"
                >
                  <input
                    type="radio"
                    name={field.name}
                    value={option}
                    required={field.required}
                    checked={values[field.name] === option}
                    onChange={() => set(field.name, option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          ) : (
            <input
              type="text"
              id={field.name}
              name={field.name}
              required={field.required}
              placeholder={field.placeholder}
              className={inputClass}
              value={values[field.name] ?? ""}
              onChange={(e) => set(field.name, e.target.value)}
            />
          )}
        </div>
      ))}

      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </label>
      </div>

      <div className="space-y-3">
        <button
          type="submit"
          disabled={status !== "idle"}
          className="border border-ink px-6 py-2 font-sans text-sm tracking-[0.1em] text-ink hover:bg-ink hover:text-white disabled:opacity-50"
        >
          {status === "sending" ? "提交中…" : status === "done" ? "已提交" : submitLabel}
        </button>

        {status === "done" ? (
          <p className="font-sans text-sm leading-relaxed text-ink-soft">
            {fellBackToMail
              ? "服务器暂不可用，已改为打开发件箱写信至 admin@3000books.org。"
              : issueUrl
                ? "已收到，谢谢。"
                : "已收到，谢谢。"}
            {issueUrl ? (
              <>
                {" "}
                <a
                  href={issueUrl}
                  className="text-ink underline decoration-rule"
                  target="_blank"
                  rel="noreferrer"
                >
                  查看提交记录
                </a>
                。
              </>
            ) : null}
          </p>
        ) : (
          <p className="font-sans text-xs leading-relaxed text-ink-soft">
            提交后会以表单形式登记，收到后会有人读。若服务器暂不可用，会自动改为写信。
          </p>
        )}
      </div>
    </form>
  );
}