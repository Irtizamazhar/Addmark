import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Eye, Target, Sparkles } from "lucide-react";
import PageHero from "@/components/PageHero";
import AboutIntro from "@/components/sections/AboutIntro";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Process from "@/components/sections/Process";
import CtaBand from "@/components/sections/CtaBand";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${site.name}: ${site.companyIntro}`,
};

// Edit these statements to match ADMARKPRO's official mission and vision.
const pillars = [
  { icon: Target, title: "Our Mission", text: "To help businesses grow online with effective digital solutions, and to equip learners with practical skills for the digital economy." },
  { icon: Eye, title: "Our Vision", text: "To be a trusted name for both digital services and digital education, where real-world expertise and learning go hand in hand." },
  { icon: Sparkles, title: "Our Values", text: "Quality work, honest communication, continuous learning and a genuine commitment to the success of every client and student." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title={<>Building brands. <span className="text-gradient">Developing talent.</span></>}
        description={`${site.companyIntro}`}
        image="/images/about-meeting.webp"
        imageAlt="Team collaborating in a bright open-plan office"
        crumbs={[{ label: "About Us" }]}
      />

      <AboutIntro showButton={false} />

      <section className="relative overflow-hidden bg-ink-50 section-y">
        <div className="container-x">
          <SectionHeading align="center" eyebrow="What Drives Us" title={<>Mission, vision & <span className="text-gradient-deep">values</span></>} />
          <ul className="mt-10 grid gap-5 md:grid-cols-3 lg:mt-12 lg:gap-6">
            {pillars.map(({ icon: Icon, title, text }, i) => (
              <Reveal as="li" key={title} delay={i * 0.1}>
                <div className="group relative h-full overflow-hidden rounded-3xl bg-white p-7 shadow-[0_20px_50px_-35px_rgba(10,18,24,0.4)] transition-all duration-500 hover:-translate-y-1.5">
                  <span aria-hidden className="absolute -right-8 -top-8 font-display text-[7rem] font-extrabold leading-none text-ink-50 transition-colors duration-500 group-hover:text-brand-50">
                    {i + 1}
                  </span>
                  <span className="bg-brand-gradient relative grid size-14 place-items-center rounded-2xl text-white shadow-[0_12px_30px_-10px_rgba(0,179,204,0.7)]">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="relative mt-6 text-xl font-semibold">{title}</h3>
                  <p className="relative mt-3 text-sm leading-relaxed text-ink-500 sm:text-base">{text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Two sides of ADMARKPRO */}
      <section className="section-y">
        <div className="container-x grid gap-6 lg:grid-cols-2">
          {[
            { img: "/images/svc-web.webp", alt: "Developer workspace with code on a laptop", tag: "The Company", title: "Digital solutions for growing businesses", text: site.companyIntro, href: "/services", cta: "Our Services" },
            { img: "/images/inst-class.webp", alt: "Students in a modern classroom", tag: "The Institute", title: "Practical education for the digital age", text: site.instituteIntro, href: "/institute", cta: "Explore Institute" },
          ].map((c, i) => (
            <Reveal key={c.tag} delay={i * 0.1}>
              <Link href={c.href} className="group relative isolate flex min-h-[22rem] sm:min-h-[24rem] flex-col justify-end overflow-hidden rounded-[2rem] p-8 sm:p-10">
                <Image src={c.img} alt={c.alt} fill sizes="(min-width:1024px) 50vw, 100vw" className="-z-20 object-cover transition-transform duration-[1.4s] group-hover:scale-110" />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-950 via-ink-950/70 to-ink-950/10" />
                <span className="w-fit rounded-full bg-brand-500 px-3 py-1 text-xs font-semibold text-white">{c.tag}</span>
                <h3 className="mt-4 max-w-md text-2xl font-bold text-white sm:text-3xl">{c.title}</h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-300">{c.text}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-300">
                  {c.cta} <span className="transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <WhyChooseUs />
      <Process />
      <CtaBand />
    </>
  );
}
