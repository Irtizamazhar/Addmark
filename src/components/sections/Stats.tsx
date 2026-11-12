import { BadgePercent, GraduationCap, Layers, LayoutGrid } from "lucide-react";
import { services } from "@/content/site";
import { categories, courses, discountPercent } from "@/content/courses";
import Reveal from "../ui/Reveal";
import CountUp from "../ui/CountUp";

/** Headline numbers, all derived from the real content files (nothing invented). */
export default function Stats() {
  const maxDiscount = Math.max(...courses.map(discountPercent));
  const stats = [
    { icon: Layers, value: services.length, suffix: "", label: "Digital services", text: "Web, apps and marketing under one roof" },
    { icon: GraduationCap, value: courses.length, suffix: "", label: "Professional courses", text: "Practical, career-focused training" },
    { icon: LayoutGrid, value: categories.length, suffix: "", label: "Learning tracks", text: "From development to design and video" },
    { icon: BadgePercent, value: maxDiscount, suffix: "%", label: "Off course fees", text: "Limited-time admission discount" },
  ];

  return (
    <section className="relative pt-4 sm:pt-6">
      <div className="container-x">
        <Reveal>
          <ul className="grid grid-cols-2 overflow-hidden rounded-[2rem] border border-ink-100 bg-white shadow-[0_30px_70px_-45px_rgba(1,97,121,0.55)] lg:grid-cols-4">
            {stats.map(({ icon: Icon, value, suffix, label, text }, i) => (
              <li
                key={label}
                className={`spotlight group p-5 sm:p-7 ${i % 2 === 1 ? "border-l border-ink-100" : ""} ${i > 1 ? "border-t border-ink-100 lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""}`}
              >
                <span className="grid size-11 place-items-center rounded-xl bg-brand-50 text-brand-600 transition-all duration-500 group-hover:-translate-y-1 group-hover:bg-brand-500 group-hover:text-white">
                  <Icon className="size-5" />
                </span>
                <p className="mt-4 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
                  <CountUp to={value} suffix={suffix} className="text-gradient-deep tabular-nums" />
                </p>
                <p className="mt-2 font-display text-sm font-semibold text-ink-900 sm:text-base">{label}</p>
                <p className="mt-1 hidden text-sm text-ink-500 sm:block">{text}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
