import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/content/site";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import { serviceIcons } from "../ui/icons";
import { ButtonLink } from "../ui/Button";

export default function ServicesGrid() {
  return (
    <section className="relative overflow-hidden bg-ink-50 section-y">
      <div aria-hidden className="absolute -right-40 top-20 size-[30rem] rounded-full bg-brand-200/40 blur-3xl" />
      <div className="container-x relative">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Our Services"
            title={<>Everything your brand needs to <span className="text-gradient-deep">grow online</span></>}
            description="From the first line of code to the campaign that brings in customers, our team covers the full digital journey."
          />
          <Reveal delay={0.1} className="shrink-0">
            <ButtonLink href="/services" variant="outline" arrow>All Services</ButtonLink>
          </Reveal>
        </div>

        <ul className="mt-10 grid gap-4 sm:gap-5 lg:mt-12 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => {
            const Icon = serviceIcons[s.icon];
            return (
              <Reveal as="li" key={s.id} delay={(i % 4) * 0.08}>
                <Link
                  href={`/services#${s.id}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-ink-100 bg-white p-6 transition-all sm:p-7 duration-500 hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_30px_60px_-25px_rgba(1,97,121,0.45)]"
                >
                  {/* hover fill */}
                  <span aria-hidden className="absolute inset-0 origin-bottom scale-y-0 bg-ink-900 transition-transform duration-500 ease-out group-hover:scale-y-100" />
                  <span aria-hidden className="absolute -right-10 -top-10 size-32 rounded-full bg-brand-500/0 blur-2xl transition-colors duration-500 group-hover:bg-brand-500/40" />

                  <span className="relative flex items-start justify-between">
                    <span className="grid size-13 place-items-center rounded-2xl bg-brand-50 text-brand-600 transition-colors duration-500 group-hover:bg-brand-500 group-hover:text-white">
                      <Icon className="size-6" />
                    </span>
                    <span className="font-display text-sm font-semibold text-ink-200 transition-colors group-hover:text-white/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </span>
                  <h3 className="relative mt-5 text-lg sm:mt-6 font-semibold transition-colors duration-500 group-hover:text-white">{s.title}</h3>
                  <p className="relative mt-1.5 flex-1 text-sm sm:mt-2 leading-relaxed text-ink-500 transition-colors duration-500 group-hover:text-ink-300">
                    {s.short}
                  </p>
                  <span className="relative mt-5 hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition-colors group-hover:text-brand-300">
                    Learn more
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
