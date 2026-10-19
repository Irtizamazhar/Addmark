import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock, Signal } from "lucide-react";
import { getCategory, type Course } from "@/content/courses";
import { ButtonLink } from "./ui/Button";

export default function CourseCard({ course }: { course: Course }) {
  const category = getCategory(course.category);
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-[0_10px_30px_-24px_rgba(10,18,24,0.35)] transition-all duration-500 hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_24px_50px_-28px_rgba(1,97,121,0.45)]">
      <Link href={`/courses/${course.id}`} className="relative block aspect-[16/10] overflow-hidden bg-ink-100" tabIndex={-1} aria-hidden>
        <Image
          src={course.image}
          alt={course.imageAlt}
          fill
          sizes="(min-width:1280px) 25vw, (min-width:1024px) 30vw, (min-width:640px) 45vw, 100vw"
          className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/45 to-transparent" />
        <span className="absolute left-3 top-3 max-w-[calc(100%-1.5rem)] truncate rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-brand-700 backdrop-blur">
          {category.short}
        </span>
        {course.availability === "open" && (
          <span className="absolute right-3 top-3 rounded-full bg-brand-500 px-2.5 py-1 text-xs font-semibold text-white">Enrolling now</span>
        )}
      </Link>

      <div className="flex min-w-0 flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold leading-snug">
          <Link href={`/courses/${course.id}`} className="block py-0.5 transition-colors hover:text-brand-600">
            {course.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-ink-500">{course.short}</p>

        {(course.duration || course.level) && (
          <ul className="mt-3 flex flex-wrap gap-2 text-xs font-medium text-ink-600">
            {course.duration && (
              <li className="inline-flex items-center gap-1.5 rounded-full bg-ink-50 px-2.5 py-1">
                <Clock className="size-3.5 text-brand-500" /> {course.duration}
              </li>
            )}
            {course.level && (
              <li className="inline-flex items-center gap-1.5 rounded-full bg-ink-50 px-2.5 py-1">
                <Signal className="size-3.5 text-brand-500" /> {course.level}
              </li>
            )}
          </ul>
        )}

        <div className="mt-4 flex items-center justify-between gap-3 border-t border-ink-100 pt-4">
          <ButtonLink href={`/courses/${course.id}#enroll`} className="h-10 px-4">
            Enroll Now
          </ButtonLink>
          <Link
            href={`/courses/${course.id}`}
            className="group/l inline-flex min-h-10 items-center gap-1 rounded-full px-1 py-2 text-sm font-semibold text-ink-700 transition-colors hover:text-brand-600"
          >
            Learn More
            <ArrowUpRight className="size-4 transition-transform group-hover/l:-translate-y-0.5 group-hover/l:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
