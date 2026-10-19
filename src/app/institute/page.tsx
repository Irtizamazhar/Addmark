import type { Metadata } from "next";
import Image from "next/image";
import { Award, BookOpen, Briefcase, Lightbulb, MonitorSmartphone, UsersRound } from "lucide-react";
import PageHero from "@/components/PageHero";
import InstituteShowcase from "@/components/sections/InstituteShowcase";
import CoursesGrid from "@/components/sections/CoursesGrid";
import CtaBand from "@/components/sections/CtaBand";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Institute",
  description: site.instituteIntro,
};

const offerings = [
  { icon: MonitorSmartphone, title: "Practical Labs", text: "Learn on the same kinds of tools and platforms used in the industry." },
  { icon: UsersRound, title: "Guided Learning", text: "Instructors who explain clearly and support you as you practise." },
  { icon: BookOpen, title: "Structured Courses", text: "Step-by-step learning paths from fundamentals to advanced topics." },
  { icon: Briefcase, title: "Industry Exposure", text: "Learn from a team that delivers digital projects for real businesses." },
  { icon: Lightbulb, title: "Project-Based", text: "Build projects you can show, not just notes you can read." },
  { icon: Award, title: "Career Readiness", text: "Develop the professional skills and confidence to move forward." },
];

export default function InstitutePage() {
  return (
    <>
      <PageHero
        eyebrow={site.instituteName}
        title={<>Learn the skills. <span className="text-gradient">Shape your future.</span></>}
        description={site.instituteIntro}
        image="/images/inst-class.webp"
        imageAlt="Students attending a class in a modern lecture room"
        crumbs={[{ label: "Institute" }]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/courses" size="lg" arrow>Browse Courses</ButtonLink>
          <ButtonLink href="/contact?interest=enroll" size="lg" variant="ghost-light">Enroll Now</ButtonLink>
        </div>
      </PageHero>

      {/* Intro split */}
      <section className="section-y">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Our Approach"
              title={<>Education built on <span className="text-gradient-deep">real-world practice</span></>}
            />
            <div className="mt-4 space-y-4 text-lead text-ink-500">
              <p>
                At {site.instituteName}, learning is hands-on. Our training draws on the same skills and tools that our company team uses on
                client projects in development and digital marketing.
              </p>
              <p>
                Students learn concepts, practise them straight away and build practical work along the way, gaining skills they can use with
                confidence.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="relative">
            <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-40px_rgba(10,18,24,0.55)]">
              <Image src="/images/inst-mentor.webp" alt="Instructor helping students at a laptop" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
            </div>
            <div className="absolute -bottom-8 -left-2 w-1/2 overflow-hidden rounded-2xl border-[6px] border-white shadow-xl lg:-left-8">
              <div className="relative aspect-[4/3]">
                <Image src="/images/inst-students.webp" alt="Students working together" fill sizes="25vw" className="object-cover" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <InstituteShowcase showButton={false} />

      <section className="bg-ink-50 section-y">
        <div className="container-x">
          <SectionHeading align="center" eyebrow="Learning Environment" title={<>What you get as a <span className="text-gradient-deep">student</span></>} />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-5">
            {offerings.map(({ icon: Icon, title, text }, i) => (
              <Reveal as="li" key={title} delay={(i % 3) * 0.08}>
                <div className="group flex h-full gap-5 rounded-3xl border border-ink-100 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:border-brand-200 sm:p-7 hover:shadow-[0_25px_50px_-30px_rgba(1,97,121,0.5)]">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-600 transition-colors duration-500 group-hover:bg-brand-500 group-hover:text-white">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CoursesGrid limit={3} />
      <CtaBand
        title={<>Ready to start learning?</>}
        text="Get in touch to learn about upcoming batches, schedules and enrollment."
      />
    </>
  );
}
