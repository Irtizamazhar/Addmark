import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { CalendarClock, CheckCircle2, Info, Layers, MonitorPlay, Signal, Users } from "lucide-react";
import PageHero from "@/components/PageHero";
import CourseCard from "@/components/CourseCard";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { courses, getCategory } from "@/content/courses";
import { site } from "@/content/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const course = courses.find((c) => c.id === slug);
  return course ? { title: `${course.title} Course`, description: course.short } : {};
}

const approach = [
  "Hands-on practice with real tools from the first class",
  "Guidance from instructors throughout the course",
  "Practical exercises you can apply to real work",
];

export default async function CoursePage({ params }: Params) {
  const { slug } = await params;
  const course = courses.find((c) => c.id === slug);
  if (!course) notFound();
  const category = getCategory(course.category);
  const related = courses.filter((c) => c.category === course.category && c.id !== course.id).slice(0, 3);
  const wa = site.contact.whatsapp[0];
  const waText = encodeURIComponent(`Assalam o Alaikum ${site.name}, I'd like to know more about the "${course.title}" course.`);

  const details = [
    { icon: Layers, label: "Category", value: category.title },
    { icon: CalendarClock, label: "Duration", value: course.duration ?? "Shared on request" },
    { icon: Signal, label: "Level", value: course.level ?? "Shared on request" },
    { icon: MonitorPlay, label: "Format", value: course.format ?? "Shared on request" },
  ];

  return (
    <>
      <PageHero
        eyebrow={category.title}
        title={course.title}
        description={course.short}
        image={course.image}
        imageAlt={course.imageAlt}
        crumbs={[
          { label: "Courses", href: "/courses" },
          { label: category.short, href: `/courses?category=${category.id}#catalog` },
          { label: course.title },
        ]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="#enroll" size="lg" arrow>Enroll Now</ButtonLink>
          {wa && (
            <a
              href={`https://wa.me/${wa}?text=${waText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-13 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 text-[15px] font-semibold text-white backdrop-blur transition-all hover:-translate-y-0.5 hover:border-[#25D366] hover:bg-[#25D366]/15"
            >
              <WhatsAppIcon className="size-5 text-[#25D366]" /> Ask on WhatsApp
            </a>
          )}
        </div>
      </PageHero>

      <section className="section-y">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 space-y-10 lg:col-span-7">
            <Reveal>
              <h2 className="text-h2 font-bold">Course overview</h2>
              <p className="mt-4 text-lead text-ink-500">{course.short} {category.description}</p>
            </Reveal>

            <Reveal delay={0.05}>
              <h3 className="flex items-center gap-2.5 text-xl font-bold">
                <Users className="size-5 text-brand-500" /> Who this course is for
              </h3>
              <p className="mt-3 text-ink-500">{category.audience}</p>
            </Reveal>

            <Reveal delay={0.1}>
              <h3 className="text-xl font-bold">How you&apos;ll learn</h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-3">
                {approach.map((t) => (
                  <li key={t} className="flex items-start gap-2.5 rounded-2xl border border-ink-100 bg-ink-50/60 p-4 text-sm font-medium text-ink-700">
                    <CheckCircle2 className="mt-px size-5 shrink-0 text-brand-500" /> {t}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="flex gap-3 rounded-2xl border border-brand-100 bg-brand-50/60 p-5 text-sm leading-relaxed text-ink-700">
                <Info className="mt-0.5 size-5 shrink-0 text-brand-600" />
                <p>
                  The detailed course outline, prerequisites, schedule and fees are shared when you enquire. Course availability depends
                  on upcoming batches, so contact us to confirm.
                  {course.category === "youtube" && (
                    <>
                      {" "}This course teaches YouTube as a content production and workflow skill, including originality, copyright
                      and YouTube&apos;s policies. It does not guarantee views, subscribers, monetization or income.
                    </>
                  )}
                </p>
              </div>
            </Reveal>
          </div>

          <aside className="min-w-0 lg:col-span-5">
            <Reveal delay={0.1} className="lg:sticky lg:top-28">
              <div className="overflow-hidden rounded-[2rem] border border-ink-100 bg-white shadow-[0_30px_60px_-40px_rgba(10,18,24,0.5)]">
                <div className="relative aspect-[16/9] bg-ink-100">
                  <Image src={course.image} alt={course.imageAlt} fill sizes="(min-width:1024px) 35vw, 100vw" className="object-cover" />
                  <span
                    className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold ${
                      course.availability === "open" ? "bg-brand-500 text-white" : "bg-white/95 text-ink-700"
                    }`}
                  >
                    {course.availability === "open" ? "Enrolling now" : "Availability on request"}
                  </span>
                </div>
                <dl className="divide-y divide-ink-100 px-6">
                  {details.map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-center justify-between gap-4 py-3.5 text-sm">
                      <dt className="flex items-center gap-2.5 text-ink-500">
                        <Icon className="size-4 text-brand-500" /> {label}
                      </dt>
                      <dd className="text-right font-semibold text-ink-800">{value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="grid gap-3 border-t border-ink-100 p-6">
                  <ButtonLink href="#enroll" size="lg" arrow className="w-full">Enroll Now</ButtonLink>
                  <ButtonLink href={`tel:${site.contact.phones[0].replace(/[^\d+]/g, "")}`} variant="outline" size="lg" className="w-full">
                    Call {site.contact.phones[0]}
                  </ButtonLink>
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      {/* Enrollment */}
      <section id="enroll" className="scroll-mt-20 bg-ink-50 section-y">
        <div className="container-x">
          <div className="mx-auto max-w-3xl rounded-[2rem] border border-ink-100 bg-white p-6 shadow-[0_30px_60px_-40px_rgba(10,18,24,0.4)] sm:p-10">
            <span className="eyebrow"><span className="h-px w-8 bg-current opacity-60" />Enrollment</span>
            <h2 className="mt-3 text-h3 font-bold">Enroll in {course.title}</h2>
            <p className="mb-7 mt-2 text-sm text-ink-500">
              Fill in your details and send them to us on WhatsApp. Our team will reply with availability, schedule and fees.
            </p>
            <Suspense fallback={<div className="min-h-[24rem]" />}>
              <ContactForm defaultInterest={`course-${course.id}`} />
            </Suspense>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section-y-sm">
          <div className="container-x">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-h3 font-bold">More in {category.title}</h2>
              <ButtonLink href={`/courses?category=${category.id}#catalog`} variant="outline" arrow>View all</ButtonLink>
            </div>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((c, i) => (
                <Reveal as="li" key={c.id} delay={i * 0.08} className={i === 2 ? "sm:max-lg:hidden" : ""}>
                  <CourseCard course={c} />
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
