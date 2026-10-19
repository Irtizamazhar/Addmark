import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import PageHero from "@/components/PageHero";
import Process from "@/components/sections/Process";
import CtaBand from "@/components/sections/CtaBand";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { serviceIcons } from "@/components/ui/icons";
import { services, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Services",
  description: `Web development, mobile apps, SEO, Google Ads, Meta Ads, social media marketing and lead generation by ${site.name}.`,
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title={<>Digital services that <span className="text-gradient">move you forward</span></>}
        description="Design, development and marketing, delivered by one team with a shared focus on your growth."
        image="/images/svc-marketing.webp"
        imageAlt="Laptop showing marketing analytics"
        crumbs={[{ label: "Services" }]}
      >
        {/* quick jump chips */}
        <ul className="flex max-w-3xl flex-wrap gap-2">
          {services.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="inline-block rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-ink-200 backdrop-blur transition-colors hover:border-brand-400 hover:text-white sm:text-sm">
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </PageHero>

      <section className="section-y">
        <div className="container-x space-y-16 lg:space-y-24">
          {services.map((s, i) => {
            const Icon = serviceIcons[s.icon];
            const flip = i % 2 === 1;
            return (
              <article key={s.id} id={s.id} className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <Reveal x={flip ? 40 : -40} y={0} className={flip ? "lg:order-2" : ""}>
                  <div className="relative">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-40px_rgba(10,18,24,0.55)]">
                      <Image src={s.image} alt={s.imageAlt} fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover transition-transform duration-[1.4s] hover:scale-105" />
                    </div>
                    <span className={`bg-brand-gradient absolute -bottom-6 grid size-20 place-items-center rounded-3xl text-white shadow-[0_20px_40px_-15px_rgba(0,179,204,0.8)] ${flip ? "-left-3 sm:-left-6" : "-right-3 sm:-right-6"}`}>
                      <Icon className="size-8" />
                    </span>
                    <div aria-hidden className={`bg-grid-light absolute -top-4 -z-10 h-2/3 sm:-top-6 w-2/3 rounded-[2rem] ${flip ? "-right-3 sm:-right-6" : "-left-3 sm:-left-6"}`} />
                  </div>
                </Reveal>

                <Reveal delay={0.1}>
                  <span className="font-display text-sm font-bold text-brand-500">{String(i + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}</span>
                  <h2 className="mt-3 text-h2 font-bold">{s.title}</h2>
                  <p className="mt-4 max-w-2xl text-lead text-ink-500">{s.description}</p>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 rounded-xl border border-ink-100 bg-ink-50/60 px-4 py-3 text-sm font-medium text-ink-700">
                        <CheckCircle2 className="mt-px size-4.5 shrink-0 text-brand-500" /> {p}
                      </li>
                    ))}
                  </ul>
                  <ButtonLink href={`/contact?interest=svc-${s.id}`} variant="dark" size="lg" arrow className="mt-8">
                    Discuss Your Project
                  </ButtonLink>
                </Reveal>
              </article>
            );
          })}
        </div>
      </section>

      <div className="bg-ink-50">
        <Process />
      </div>
      <CtaBand flush={false} />
    </>
  );
}
