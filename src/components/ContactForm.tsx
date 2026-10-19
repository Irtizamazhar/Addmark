"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { CircleCheck, Send } from "lucide-react";
import { courses, services } from "@/content/site";
import { Button } from "./ui/Button";

type Fields = { name: string; email: string; phone: string; interest: string; message: string };
const empty: Fields = { name: "", email: "", phone: "", interest: "", message: "" };

/**
 * FRONTEND-ONLY FORM.
 * Submissions are validated in the browser but NOT sent anywhere.
 * To receive messages, connect a form service (e.g. Formspree, Web3Forms)
 * inside `onSubmit` below.
 */
export default function ContactForm() {
  const params = useSearchParams();
  const [values, setValues] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [done, setDone] = useState<string | null>(null);

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
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) er.email = "Please enter a valid email address.";
    if (values.phone && !/^[\d+\-\s()]{7,}$/.test(values.phone)) er.phone = "Please enter a valid phone number.";
    if (values.message.trim().length < 10) er.message = "Please write a short message (at least 10 characters).";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    // TODO: send `values` to your form service here.
    setDone(values.name.trim().split(" ")[0]);
    setValues(empty);
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {done ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex min-h-[24rem] flex-col items-center justify-center py-6 text-center"
            role="status"
          >
            <span className="bg-brand-gradient grid size-16 place-items-center rounded-full text-white shadow-[0_15px_40px_-10px_rgba(0,179,204,0.7)]">
              <CircleCheck className="size-8" />
            </span>
            <h3 className="mt-6 text-2xl font-bold">Thank you, {done}!</h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-500">
              Your details look good. This form is currently in <strong>demo mode</strong>, so messages aren&apos;t sent yet.
              Please reach us directly by phone or email for now.
            </p>
            <Button variant="outline" className="mt-8" onClick={() => setDone(null)}>
              Send another message
            </Button>
          </motion.div>
        ) : (
          <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
            <Field label="Full name" error={errors.name} required>
              <input id="name" value={values.name} onChange={set("name")} autoComplete="name" placeholder="Your name" className={input(errors.name)} />
            </Field>
            <Field label="Email address" error={errors.email} required>
              <input id="email" type="email" value={values.email} onChange={set("email")} autoComplete="email" placeholder="you@example.com" className={input(errors.email)} />
            </Field>
            <Field label="Phone number" error={errors.phone}>
              <input id="phone" type="tel" value={values.phone} onChange={set("phone")} autoComplete="tel" placeholder="Optional" className={input(errors.phone)} />
            </Field>
            <Field label="I'm interested in">
              <select id="interest" value={values.interest} onChange={set("interest")} className={`${input()} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23637886%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:18px] bg-[right_14px_center] bg-no-repeat pr-10`}>
                <option value="">Select an option</option>
                <optgroup label="Services">
                  {services.map((s) => <option key={s.id} value={`svc-${s.id}`}>{s.title}</option>)}
                </optgroup>
                <optgroup label="Courses">
                  <option value="course-general">Course enrollment (general)</option>
                  {courses.map((c) => <option key={c.id} value={`course-${c.id}`}>{c.title}</option>)}
                </optgroup>
                <option value="other">Something else</option>
              </select>
            </Field>
            <Field label="Message" error={errors.message} required className="sm:col-span-2">
              <textarea id="message" rows={5} value={values.message} onChange={set("message")} placeholder="Tell us about your project or the course you're interested in…" className={`${input(errors.message)} h-auto resize-none py-3.5`} />
            </Field>
            <div className="flex flex-col items-start gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-ink-400">Fields marked * are required.</p>
              <Button type="submit" size="lg" className="w-full sm:w-auto">
                Send Message <Send className="ml-1 inline size-4" />
              </Button>
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
