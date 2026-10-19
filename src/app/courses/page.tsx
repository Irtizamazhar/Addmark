import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CoursesGrid from "@/components/sections/CoursesGrid";
import CtaBand from "@/components/sections/CtaBand";
import Accordion from "@/components/Accordion";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Courses",
  description: `Explore practical digital skills courses at ${site.instituteName}.`,
};

const faqs = [
  { q: "How do I enroll in a course?", a: "Use the Enroll Now button on any course or fill in the contact form. Our team will get in touch to guide you through enrollment and upcoming batches." },
  { q: "Are the classes practical?", a: "Yes. Our courses focus on hands-on learning, so you practise each concept with real tools as you learn." },
  { q: "Where can I find course schedules and fees?", a: "Schedules and fees are shared on request. Contact us by phone, email or the contact form and we'll send you the latest details." },
  { q: "Which course is right for me?", a: "Tell us about your goals and current experience through the contact form, and we'll help you choose the course that suits you best." },
];

export default function CoursesPage() {
  return (
    <>
      <PageHero
        eyebrow="Courses"
        title={<>Courses that build <span className="text-gradient">job-ready skills</span></>}
        description="Choose a course and start learning the practical digital skills businesses rely on."
        image="/images/course-web.webp"
        imageAlt="Code on a dark screen"
        crumbs={[{ label: "Courses" }]}
      />

      <CoursesGrid showButton={false} />

      <section className="bg-ink-50 section-y">
        <div className="container-x grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="FAQ" title={<>Questions about <span className="text-gradient-deep">enrollment?</span></>} description="Here are quick answers to common questions. Can't find yours? Just get in touch." />
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
