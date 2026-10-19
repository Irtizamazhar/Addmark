import Image from "next/image";
import { Compass, HeartHandshake, Layers, Lightbulb, ShieldCheck, Users } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";

// Edit these to reflect ADMARKPRO's real strengths.
const reasons = [
  { icon: Layers, title: "Agency + Institute", text: "We teach what we practise. Our training comes from real client work, and our client work benefits from a culture of learning." },
  { icon: Lightbulb, title: "Strategy Before Execution", text: "Every website, campaign and course starts with clear goals, so the work is purposeful from day one." },
  { icon: Users, title: "Hands-On Learning", text: "Students build, launch and practise with real tools instead of only reading about them." },
  { icon: HeartHandshake, title: "Clear Communication", text: "Straightforward updates and honest advice, whether you're a client or a student." },
  { icon: Compass, title: "Career & Growth Focus", text: "We care about outcomes: business growth for clients and career progress for learners." },
  { icon: ShieldCheck, title: "Modern Best Practices", text: "Up-to-date tools, techniques and standards across development and marketing." },
];

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-ink-50 section-y">
      <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              eyebrow="Why Choose Us"
              title={<>Built on practice, <span className="text-gradient-deep">driven by results</span></>}
              description="Whether you're growing a business or building a career, here's what makes working and learning with us different."
            />
            <Reveal delay={0.15} className="relative mt-8 hidden lg:block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem]">
                <Image src="/images/cta-learning.webp" alt="Overhead view of a team working on laptops around a shared table" fill sizes="35vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-700/50 to-transparent" />
              </div>
              <div aria-hidden className="bg-brand-gradient absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-[1.75rem] opacity-30" />
            </Reveal>
          </div>
        </div>

        <ul className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
          {reasons.map(({ icon: Icon, title, text }, i) => (
            <Reveal as="li" key={title} delay={(i % 2) * 0.1} className={i % 2 === 1 ? "lg:translate-y-8" : ""}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-ink-100 bg-white p-6 transition-all duration-500 hover:-translate-y-1 sm:p-7 hover:shadow-[0_25px_50px_-25px_rgba(1,97,121,0.4)]">
                <span aria-hidden className="bg-brand-gradient absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
                <span className="grid size-12 place-items-center rounded-2xl bg-ink-900 text-brand-300 transition-transform duration-500 group-hover:rotate-[-6deg] group-hover:scale-110">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
