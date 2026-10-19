import Image from "next/image";
import { Briefcase, CheckCircle2, GraduationCap } from "lucide-react";
import { site } from "@/content/site";
import Reveal from "../ui/Reveal";
import { ButtonLink } from "../ui/Button";

export default function AboutIntro({ showButton = true }: { showButton?: boolean }) {
  return (
    <section className="relative overflow-hidden section-y">
      <div aria-hidden className="bg-grid-light mask-radial absolute inset-0 -z-10 opacity-70" />
      <div className="container-x grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Image collage */}
        <Reveal className="relative order-2 lg:order-1">
          <div className="relative grid grid-cols-12 gap-4">
            <div className="col-span-7 row-span-2">
              <div className="relative aspect-[3/4] overflow-hidden rounded-[1.75rem] shadow-[0_30px_60px_-30px_rgba(10,18,24,0.5)]">
                <Image
                  src="/images/about-office.webp"
                  alt="Team planning a project with sticky notes on a glass wall"
                  fill
                  sizes="(min-width:1024px) 28vw, 58vw"
                  className="object-cover transition-transform duration-[1.2s] hover:scale-105"
                />
              </div>
            </div>
            <div className="col-span-5 self-end">
              <div className="relative aspect-square overflow-hidden rounded-[1.5rem] shadow-[0_30px_60px_-30px_rgba(10,18,24,0.5)]">
                <Image
                  src="/images/about-meeting.webp"
                  alt="Colleagues collaborating in an open-plan office"
                  fill
                  sizes="(min-width:1024px) 20vw, 40vw"
                  className="object-cover transition-transform duration-[1.2s] hover:scale-105"
                />
              </div>
            </div>
            <div className="col-span-5">
              <div className="bg-brand-gradient relative overflow-hidden rounded-[1.5rem] p-4 text-white sm:p-6">
                <div aria-hidden className="absolute -right-6 -top-6 size-24 rounded-full bg-white/15" />
                <p className="font-display text-sm font-bold leading-snug sm:text-xl">One brand.<br />Two strengths.</p>
                <p className="mt-2 hidden text-xs text-white/80 sm:block sm:text-sm">Agency expertise, shared through education.</p>
              </div>
            </div>
          </div>
          <div aria-hidden className="absolute -bottom-6 -left-6 -z-10 size-40 rounded-full bg-brand-200/50 blur-2xl" />
        </Reveal>

        {/* Copy */}
        <div className="order-1 lg:order-2">
          <Reveal>
            <span className="eyebrow"><span className="h-px w-8 bg-current opacity-60" />About {site.name}</span>
            <h2 className="mt-3 text-h2 font-bold">
              A digital company and a <span className="text-gradient-deep">learning institute</span>, under one roof.
            </h2>
            <p className="mt-4 max-w-2xl text-lead text-ink-500">
              {site.companyIntro}
            </p>
          </Reveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Reveal delay={0.1}>
              <Card icon={<Briefcase className="size-5" />} title="For Businesses">
                Websites, apps and marketing that build your brand and bring in customers.
              </Card>
            </Reveal>
            <Reveal delay={0.2}>
              <Card icon={<GraduationCap className="size-5" />} title="For Learners">
                {site.instituteIntro}
              </Card>
            </Reveal>
          </div>

          <Reveal delay={0.25}>
            <ul className="mt-6 grid gap-3 text-sm text-ink-600 sm:grid-cols-2">
              {["Strategy-first approach", "Practical, real-world skills", "Clear communication", "Modern tools & methods"].map((t) => (
                <li key={t} className="flex items-center gap-2.5">
                  <CheckCircle2 className="size-5 shrink-0 text-brand-500" /> {t}
                </li>
              ))}
            </ul>
            {showButton && (
              <ButtonLink href="/about" variant="dark" size="lg" arrow className="mt-8">
                More About Us
              </ButtonLink>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Card({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="h-full rounded-2xl border border-ink-100 bg-white p-5 shadow-[0_10px_30px_-20px_rgba(10,18,24,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-200">
      <span className="grid size-11 place-items-center rounded-xl bg-brand-50 text-brand-600">{icon}</span>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{children}</p>
    </div>
  );
}
