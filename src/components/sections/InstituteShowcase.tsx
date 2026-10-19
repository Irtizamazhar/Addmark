import Image from "next/image";
import { BookOpen, Laptop, Presentation, Rocket } from "lucide-react";
import { site } from "@/content/site";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import { ButtonLink } from "../ui/Button";

const features = [
  { icon: Laptop, title: "Practical Training", text: "Learn by working on real tools and real tasks, not just theory." },
  { icon: Presentation, title: "Learning Environment", text: "Focused, modern classrooms built for hands-on digital learning." },
  { icon: BookOpen, title: "Learning Opportunities", text: "Courses across development, marketing and advertising." },
  { icon: Rocket, title: "Professional Development", text: "Build the skills and confidence to grow your career or business." },
];

export default function InstituteShowcase({ showButton = true }: { showButton?: boolean }) {
  return (
    <section className="relative isolate overflow-hidden bg-ink-950 section-y text-white">
      <div aria-hidden className="bg-grid mask-radial absolute inset-0 -z-10" />
      <div aria-hidden className="absolute -left-40 top-1/3 -z-10 size-[34rem] rounded-full bg-brand-600/25 blur-[120px]" />

      <div className="container-x">
        <div className="grid items-end gap-6 lg:grid-cols-2">
          <SectionHeading
            tone="dark"
            eyebrow={site.instituteName}
            title={<>Where digital skills become <span className="text-gradient">real careers</span></>}
            description={site.instituteIntro}
          />
          {showButton && (
            <Reveal delay={0.1} className="lg:justify-self-end">
              <ButtonLink href="/institute" size="lg" arrow>Explore Institute</ButtonLink>
            </Reveal>
          )}
        </div>

        {/* Bento gallery */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:grid-rows-2">
          <Reveal className="sm:col-span-2 lg:row-span-2">
            <Tile src="/images/inst-class.webp" alt="Students attending a lecture in a modern classroom" label="Modern classrooms" tall />
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-2">
            <Tile src="/images/inst-mentor.webp" alt="Instructor guiding a group of students around a laptop" label="Guided by practitioners" />
          </Reveal>
          <Reveal delay={0.15}>
            <Tile src="/images/inst-lab.webp" alt="Students working together at computers" label="Hands-on labs" />
          </Reveal>
          <Reveal delay={0.2}>
            <Tile src="/images/inst-group.webp" alt="Students discussing ideas around a table" label="Collaborative learning" />
          </Reveal>
        </div>

        <ul className="mt-10 grid gap-px lg:mt-12 overflow-hidden rounded-3xl border border-white/8 bg-white/8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, text }, i) => (
            <Reveal as="li" key={title} delay={i * 0.08} className="group bg-ink-950 p-6 transition-colors sm:p-7 duration-500 hover:bg-ink-900">
              <Icon className="size-7 text-brand-400 transition-transform duration-500 group-hover:-translate-y-1" />
              <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-300">{text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Tile({ src, alt, label, tall }: { src: string; alt: string; label: string; tall?: boolean }) {
  return (
    <figure className={`group relative h-full overflow-hidden rounded-3xl ${tall ? "aspect-[4/3] lg:aspect-auto lg:min-h-[30rem]" : "aspect-[16/10] lg:aspect-auto lg:min-h-[14.5rem]"}`}>
      <Image src={src} alt={alt} fill sizes="(min-width:1024px) 40vw, (min-width:640px) 50vw, 100vw" className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/10 to-transparent" />
      <figcaption className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-ink-950/50 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
        <span className="size-1.5 rounded-full bg-brand-400" /> {label}
      </figcaption>
    </figure>
  );
}
