import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/sections/CtaBand";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { site, team, type TeamMember } from "@/content/site";

export const metadata: Metadata = {
  title: "Our Team",
  description: `Meet the people behind ${site.name} and ${site.instituteName}.`,
};

const groups = [
  {
    key: "company",
    eyebrow: "The Company",
    title: <>The people behind <span className="text-gradient-deep">your growth</span></>,
    description: "Developers, marketers and designers who plan, build and grow digital projects for our clients.",
  },
  {
    key: "institute",
    eyebrow: site.instituteName,
    title: <>Meet our <span className="text-gradient-deep">instructors</span></>,
    description: "Practitioners who bring real project experience into every class.",
  },
] as const;

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Team"
        title={<>The people who make <span className="text-gradient">{site.name}</span></>}
        description="One team behind our digital services and our institute, working together to help businesses and learners grow."
        image="/images/about-office.webp"
        imageAlt="Team collaborating around a glass wall covered in sticky notes"
        crumbs={[{ label: "Team" }]}
      />

      {groups.map((g, gi) => {
        const members = team.filter((m) => m.group === g.key);
        if (members.length === 0) return null;
        return (
          <section key={g.key} className={`section-y ${gi % 2 === 1 ? "bg-ink-50" : ""}`}>
            <div className="container-x">
              <SectionHeading eyebrow={g.eyebrow} title={g.title} description={g.description} />
              <ul className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 lg:mt-12 lg:grid-cols-4 lg:gap-6">
                {members.map((m, i) => (
                  <Reveal as="li" key={`${g.key}-${i}`} delay={(i % 4) * 0.08}>
                    <MemberCard member={m} />
                  </Reveal>
                ))}
              </ul>
            </div>
          </section>
        );
      })}

      <CtaBand
        flush={false}
        title={<>Want to work or learn with us?</>}
        text="Get in touch to start a project with our team or to join one of our courses."
      />
    </>
  );
}

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <figure className="group h-full overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-[0_10px_40px_-25px_rgba(10,18,24,0.35)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-25px_rgba(1,97,121,0.4)]">
      <div className="relative aspect-[4/5] overflow-hidden bg-ink-100">
        <Image
          src={member.image}
          alt={`${member.name}, ${member.role}`}
          fill
          sizes="(min-width:1024px) 22vw, 45vw"
          className="object-cover object-top transition-transform duration-[1.2s] ease-out group-hover:scale-105"
        />
        <span aria-hidden className="bg-brand-gradient absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
      </div>
      <figcaption className="p-4 sm:p-5">
        <p className="break-words font-display text-sm font-semibold text-ink-900 sm:text-base">{member.name}</p>
        <p className="mt-1 break-words text-xs text-brand-700 sm:text-sm">{member.role}</p>
      </figcaption>
    </figure>
  );
}
