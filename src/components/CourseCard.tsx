import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Course } from "@/content/site";
import { ButtonLink } from "./ui/Button";

export default function CourseCard({ course }: { course: Course }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-[0_10px_40px_-25px_rgba(10,18,24,0.35)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-25px_rgba(1,97,121,0.4)]">
      <Link href={`/courses/${course.id}`} className="relative block aspect-[16/10] overflow-hidden" tabIndex={-1} aria-hidden>
        <Image
          src={course.image}
          alt={course.imageAlt}
          fill
          sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 100vw"
          className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/50 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-700 backdrop-blur">
          {course.category}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="text-xl font-semibold">
          <Link href={`/courses/${course.id}`} className="transition-colors hover:text-brand-600">
            {course.title}
          </Link>
        </h3>
        <p className="mt-2.5 flex-1 text-sm min-w-0 leading-relaxed text-ink-500">{course.short}</p>

        <div className="mt-5 flex items-center gap-3 border-t border-ink-100 pt-5">
          <ButtonLink href={`/contact?interest=${course.id}`} className="flex-1 sm:flex-none">
            Enroll Now
          </ButtonLink>
          <Link
            href={`/courses/${course.id}`}
            className="group/l inline-flex items-center gap-1.5 px-2 text-sm font-semibold text-ink-700 transition-colors hover:text-brand-600"
          >
            Learn More
            <ArrowUpRight className="size-4 transition-transform group-hover/l:-translate-y-0.5 group-hover/l:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
