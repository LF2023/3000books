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
  const [sent, setSent] = useState(false);

  function set(name: string, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sent) return;
    const lines = fields.map(
      (field) => `${field.label}：${(values[field.name] ?? "").trim() || "（未填）"}`,
    );
    const body = encodeURIComponent(lines.join("\n"));
    const url = `mailto:admin@3000books.org?subject=${encodeURIComponent(subject)}&body=${body}`;
    setSent(true);
    window.location.href = url;
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

      <div className="space-y-3">
        <button
          type="submit"
          disabled={sent}
          className="border border-ink px-6 py-2 font-sans text-sm tracking-[0.1em] text-ink hover:bg-ink hover:text-white disabled:opacity-50"
        >
          {sent ? "已打开发件箱" : submitLabel}
        </button>
        <p className="font-sans text-xs leading-relaxed text-ink-soft">
          提交会打开你的邮件客户端，收件人为 admin@3000books.org，正文按所填字段自动生成。不愿使用表单，直接写信也可以。
        </p>
      </div>
    </form>
  );
}