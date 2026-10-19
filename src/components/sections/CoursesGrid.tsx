import { featuredCourses } from "@/content/courses";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import CourseCard from "../CourseCard";
import { ButtonLink } from "../ui/Button";

export default function CoursesGrid({ limit, showButton = true }: { limit?: number; showButton?: boolean }) {
  const list = limit ? featuredCourses.slice(0, limit) : featuredCourses;
  return (
    <section className="relative section-y">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Our Courses"
            title={<>Learn the skills the <span className="text-gradient-deep">digital world</span> runs on</>}
            description="Career-focused courses built around the same work we deliver for our clients every day."
          />
          {showButton && (
            <Reveal delay={0.1} className="shrink-0">
              <ButtonLink href="/courses" variant="outline" arrow>View All Courses</ButtonLink>
            </Reveal>
          )}
        </div>

        <ul className="mt-10 grid gap-5 lg:mt-12 lg:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((c, i) => (
            <Reveal as="li" key={c.id} delay={(i % 3) * 0.1} id={c.id} className="scroll-mt-28">
              <CourseCard course={c} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
