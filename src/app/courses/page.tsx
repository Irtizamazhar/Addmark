import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/sections/CtaBand";
import Accordion from "@/components/Accordion";
import CourseCatalog from "@/components/courses/CourseCatalog";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { categories } from "@/content/courses";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Courses",
  description: `Web development, digital marketing, SEO, Google Ads, Meta Ads, YouTube automation, video editing, content creation and animation courses at ${site.instituteName}.`,
};

const faqs = [
  { q: "How do I enroll in a course?", a: "Press Enroll Now on any course and send us your details on WhatsApp. Our team will reply with the next steps and upcoming batches." },
  { q: "What are the course fees?", a: "Each course shows its fee on its card and course page. All courses currently have a 30% discount, and the discounted fee is what you pay." },
  { q: "When do classes start?", a: "Admissions are open. Class timings and upcoming batch dates are shared when you enquire, so contact us by phone or WhatsApp to reserve your seat." },
  { q: "Are the classes practical?", a: "Yes. Our training focuses on hands-on learning, so you practise each concept with real tools as you learn." },
  { q: "Which course is right for me?", a: "Tell us about your goals and current experience, and we'll help you choose a course that suits you." },
];

export default function CoursesPage() {
  return (
    <>
      <PageHero
        eyebrow={`${site.instituteName} · Courses`}
        title={<>Training programs for the <span className="text-gradient">digital world</span></>}
        description="From web development and digital marketing to YouTube, video editing and animation: practical, career-focused courses, now with 30% off."
        image="/images/inst-class.webp"
        imageAlt="Students attending a class in a modern classroom"
        crumbs={[{ label: "Courses" }]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="#catalog" size="lg" arrow>Browse Courses</ButtonLink>
          <ButtonLink href="/contact?interest=enroll" size="lg" variant="ghost-light">Ask About a Course</ButtonLink>
        </div>
        <ul className="mt-8 flex max-w-3xl flex-wrap gap-2">
          {categories.map((c) => (
            <li key={c.id}>
              <Link
                href={`/courses?category=${c.id}#catalog`}
                className="inline-block rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-ink-200 backdrop-blur transition-colors hover:border-brand-400 hover:text-white sm:text-sm"
              >
                {c.short}
              </Link>
            </li>
          ))}
        </ul>
      </PageHero>

      <Suspense fallback={<div className="section-y container-x min-h-[60vh]" />}>
        <CourseCatalog />
      </Suspense>

      <section className="bg-ink-50 section-y">
        <div className="container-x grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="FAQ"
              title={<>Questions about <span className="text-gradient-deep">enrollment?</span></>}
              description="Quick answers to common questions. Can't find yours? Just get in touch."
            />
          </div>
          <Reveal delay={0.1} className="lg:col-span-8">
            <Accordion items={faqs} />
          </Reveal>
        </div>
      </section>

      <CtaBand flush={false} title={<>Not sure where to start?</>} text="Talk to our team and we'll help you pick the right course for your goals." />
    </>
  );
}
