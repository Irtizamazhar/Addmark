"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { CircleCheck } from "lucide-react";
import { services, site } from "@/content/site";
import { categories, courses } from "@/content/courses";
import { Button } from "./ui/Button";
import { WhatsAppIcon } from "./ui/icons";

type Fields = { name: string; email: string; phone: string; interest: string; message: string };
const empty: Fields = { name: "", email: "", phone: "", interest: "", message: "" };

const waNumbers = site.contact.whatsapp.map((n) => n.replace(/\D/g, "")).filter(Boolean);
const waLink = (n: string, text: string) => `https://wa.me/${n}?text=${encodeURIComponent(text)}`;
const prettyNumber = (n: string) => `+${n.slice(0, 2)} ${n.slice(2, 5)} ${n.slice(5)}`;

function interestLabel(v: string) {
  if (v === "course-general") return "Course enrollment (general)";
  if (v === "other") return "Something else";
  if (v.startsWith("svc-")) return services.find((s) => `svc-${s.id}` === v)?.title ?? "";
  if (v.startsWith("course-")) {
    const c = courses.find((c) => `course-${c.id}` === v);
    return c ? `${c.title} (course)` : "";
  }
  return "";
}

/**
 * Sends the enquiry through WhatsApp: on submit it opens a WhatsApp chat with
 * the institute's first number and a pre-written message. Nothing is stored.
 */
export default function ContactForm({ defaultInterest }: { defaultInterest?: string }) {
  const params = useSearchParams();
  const [values, setValues] = useState<Fields>({ ...empty, interest: defaultInterest ?? "" });
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [sent, setSent] = useState<{ name: string; text: string } | null>(null);

  useEffect(() => {
    const i = params.get("interest");
    if (i) setValues((v) => ({ ...v, interest: i === "enroll" ? "course-general" : i.startsWith("svc-") ? i : `course-${i}` }));
  }, [params]);

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const validate = () => {
    const er: typeof errors = {};
    if (values.name.trim().length < 2) er.name = "Please enter your name.";
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) er.email = "Please enter a valid email address.";
    if (values.phone && !/^[\d+\-\s()]{7,}$/.test(values.phone)) er.phone = "Please enter a valid phone number.";
    if (values.message.trim().length < 10) er.message = "Please write a short message (at least 10 characters).";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const details = [
      `Name: ${values.name.trim()}`,
      values.phone && `Phone: ${values.phone.trim()}`,
      values.email && `Email: ${values.email.trim()}`,
      values.interest && `Interested in: ${interestLabel(values.interest)}`,
    ].filter(Boolean);
    const text = [`Assalam o Alaikum ${site.name},`, "", ...details, "", values.message.trim()].join("\n");
    if (waNumbers[0]) window.open(waLink(waNumbers[0], text), "_blank", "noopener,noreferrer");
    setSent({ name: values.name.trim().split(" ")[0], text });
    setValues({ ...empty, interest: defaultInterest ?? "" });
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex min-h-[24rem] flex-col items-center justify-center py-6 text-center"
            role="status"
          >
            <span className="grid size-16 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_15px_40px_-10px_rgba(37,211,102,0.7)]">
              <CircleCheck className="size-8" />
            </span>
            <h3 className="mt-5 text-2xl font-bold">Almost done, {sent.name}!</h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-500">
              WhatsApp has opened with your message to <strong>{prettyNumber(waNumbers[0])}</strong>. Press <strong>Send</strong> in
              WhatsApp to deliver it.
            </p>
            <div className="mt-6 flex w-full max-w-sm flex-col gap-3">
              {waNumbers.slice(1).map((n) => (
                <a
                  key={n}
                  href={waLink(n, sent.text)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                >
                  <WhatsAppIcon className="size-5" /> Also send to {prettyNumber(n)}
                </a>
              ))}
              <a
                href={waLink(waNumbers[0], sent.text)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-ink-600 underline-offset-4 hover:text-brand-600 hover:underline"
              >
                WhatsApp didn&apos;t open? Tap here
              </a>
            </div>
            <Button variant="outline" className="mt-6" onClick={() => setSent(null)}>
              Send another message
            </Button>
          </motion.div>
        ) : (
          <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
            <Field label="Full name" error={errors.name} required>
              <input id="name" value={values.name} onChange={set("name")} autoComplete="name" placeholder="Your name" className={input(errors.name)} />
            </Field>
            <Field label="Phone number" error={errors.phone}>
              <input id="phone" type="tel" value={values.phone} onChange={set("phone")} autoComplete="tel" placeholder="03XX XXXXXXX" className={input(errors.phone)} />
            </Field>
            <Field label="Email address" error={errors.email}>
              <input id="email" type="email" value={values.email} onChange={set("email")} autoComplete="email" placeholder="Optional" className={input(errors.email)} />
            </Field>
            <Field label="I'm interested in">
              <select id="interest" value={values.interest} onChange={set("interest")} className={`${input()} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23637886%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:18px] bg-[right_14px_center] bg-no-repeat pr-10`}>
                <option value="">Select an option</option>
                <option value="course-general">Course enrollment (general)</option>
                <optgroup label="Services">
                  {services.map((s) => <option key={s.id} value={`svc-${s.id}`}>{s.title}</option>)}
                </optgroup>
                {categories.map((cat) => (
                  <optgroup key={cat.id} label={`Courses: ${cat.short}`}>
                    {courses.filter((c) => c.category === cat.id).map((c) => (
                      <option key={c.id} value={`course-${c.id}`}>{c.title}</option>
                    ))}
                  </optgroup>
                ))}
                <option value="other">Something else</option>
              </select>
            </Field>
            <Field label="Message" error={errors.message} required className="sm:col-span-2">
              <textarea id="message" rows={5} value={values.message} onChange={set("message")} placeholder="Tell us about your project or the course you're interested in…" className={`${input(errors.message)} h-auto resize-none py-3.5`} />
            </Field>
            <div className="flex flex-col items-start gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
            
              <button
                type="submit"
                className="inline-flex h-13 w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 text-[15px] font-semibold text-white shadow-[0_10px_30px_-10px_rgba(37,211,102,0.7)] transition-all hover:-translate-y-0.5 hover:bg-[#1ebe5b] sm:w-auto"
              >
                <WhatsAppIcon className="size-5" /> Send on WhatsApp
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

const input = (err?: string) =>
  `h-12 w-full rounded-xl border bg-ink-50/60 px-4 text-sm text-ink-900 placeholder:text-ink-300 transition-all focus:bg-white focus:outline-none focus:ring-4 ${
    err ? "border-red-400 focus:ring-red-100" : "border-ink-100 focus:border-brand-400 focus:ring-brand-100"
  }`;

function Field({ label, error, required, className = "", children }: { label: string; error?: string; required?: boolean; className?: string; children: React.ReactElement<{ id: string }> }) {
  const id = children.props.id;
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-ink-800">
        {label} {required && <span className="text-brand-600">*</span>}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs font-medium text-red-500" role="alert">{error}</p>}
    </div>
  );
}
