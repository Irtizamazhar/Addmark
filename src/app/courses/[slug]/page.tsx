import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CheckCircle2, MessageCircle } from "lucide-react";
import PageHero from "@/components/PageHero";
import CourseCard from "@/components/CourseCard";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { courses, site } from "@/content/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const course = courses.find((c) => c.id === slug);
  return course ? { title: `${course.title} Course`, description: course.short } : {};
}

export default async function CoursePage({ params }: Params) {
  const { slug } = await params;
  const course = courses.find((c) => c.id === slug);
  if (!course) notFound();
  const related = courses.filter((c) => c.id !== course.id).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={course.category}
        title={course.title}
        description={course.short}
        image={course.image}
        imageAlt={course.imageAlt}
        crumbs={[{ label: "Courses", href: "/courses" }, { label: course.title }]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={`/contact?interest=${course.id}`} size="lg" arrow>Enroll Now</ButtonLink>
          <ButtonLink href="/contact" size="lg" variant="ghost-light">Ask a Question</ButtonLink>
        </div>
      </PageHero>

      <section className="section-y">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="text-h2 font-bold">Course overview</h2>
              <p className="mt-4 text-lead text-ink-500">{course.overview}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h3 className="mt-10 text-2xl font-bold">What you&apos;ll learn</h3>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {course.topics.map((t) => (
                  <li key={t} className="flex items-start gap-3 rounded-2xl border border-ink-100 bg-white p-4 text-sm font-medium text-ink-700 shadow-[0_10px_30px_-25px_rgba(10,18,24,0.4)]">
                    <CheckCircle2 className="mt-px size-5 shrink-0 text-brand-500" /> {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <aside className="lg:col-span-5">
            <Reveal delay={0.15} className="lg:sticky lg:top-28">
              <div className="overflow-hidden rounded-[2rem] border border-ink-100 bg-white shadow-[0_30px_60px_-40px_rgba(10,18,24,0.5)]">
                <div className="relative aspect-[16/10]">
                  <Image src={course.image} alt={course.imageAlt} fill sizes="(min-width:1024px) 35vw, 100vw" className="object-cover" />
                </div>
                <div className="p-7">
                  <h3 className="text-xl font-bold">Interested in this course?</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">
                    Schedules, duration and fees are available on request. Contact {site.instituteName} for the latest details.
                  </p>
                  <div className="mt-6 grid gap-3">
                    <ButtonLink href={`/contact?interest=${course.id}`} size="lg" arrow className="w-full">Enroll Now</ButtonLink>
                    <ButtonLink href="/contact" variant="outline" size="lg" className="w-full">
                      <MessageCircle className="mr-1 inline size-4" /> Contact Us
                    </ButtonLink>
                  </div>
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      <section className="bg-ink-50 section-y-sm">
        <div className="container-x">
          <h2 className="text-h2 font-bold">Explore other courses</h2>
          <ul className="mt-8 grid gap-5 lg:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((c, i) => (
              <Reveal as="li" key={c.id} delay={i * 0.08}>
                <CourseCard course={c} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
