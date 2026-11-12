"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { BookOpen, CheckCircle2, GraduationCap, Laptop2, LayoutGrid, Rocket } from "lucide-react";
import { services, site } from "@/content/site";
import { categories, courses } from "@/content/courses";
import Reveal from "../ui/Reveal";
import { ButtonLink } from "../ui/Button";
import { Books, ChartMock, GradCap, Laptop, Phone, SiteMock } from "../ui/Devices";
import { useInView, useSceneSettings } from "../three/useSceneSettings";

// three.js is heavy and browser-only, so the scenes load after hydration in their own chunk.
const GrowthScene = dynamic(() => import("../three/FeatureScenes").then((m) => m.GrowthScene), { ssr: false });
const CoursesScene = dynamic(() => import("../three/FeatureScenes").then((m) => m.CoursesScene), { ssr: false });

/**
 * Box that holds a WebGL scene with chips floating over it.
 * Without WebGL it shows the CSS device composition passed as `fallback` instead.
 */
function SceneBox({ kind, fallback, children }: { kind: "growth" | "courses"; fallback: React.ReactNode; children?: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { webgl, lite, still } = useSceneSettings();
  const inView = useInView(ref);
  const Scene = kind === "growth" ? GrowthScene : CoursesScene;
  return (
    <div ref={ref} className="relative mx-auto aspect-[5/4] w-full max-w-xl">
      {webgl === false ? (
        <div className="absolute inset-0 grid place-items-center">{fallback}</div>
      ) : (
        <div aria-hidden className="absolute -inset-[12%]">
          {webgl && <Scene lite={lite} still={still} paused={!inView} />}
        </div>
      )}
      {children}
    </div>
  );
}

/** Scroll-linked rotation and lift for a CSS device composition (the no-WebGL fallback). */
function useDeviceScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], reduce ? [8, 8, 8] : [22, 8, -4]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], reduce ? [-14, -14, -14] : [-26, -14, -6]);
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [50, -50]);
  const floatY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [40, -70]);
  return { ref, rotateX, rotateY, y, floatY };
}

/* ───────────────────────────── Business growth ───────────────────────────── */

// Real service points from site.ts, so nothing here is invented.
const growthPoints = [
  services.find((s) => s.id === "web-development")!.points[0],
  services.find((s) => s.id === "web-development")!.points[2],
  services.find((s) => s.id === "google-ads")!.points[0],
  services.find((s) => s.id === "lead-generation")!.points[0],
];

export function GrowthFeature() {
  return (
    <section className="relative section-y">
      <div className="container-x">
        <Reveal>
          <div className="glass-frame relative isolate overflow-hidden rounded-[2rem] bg-ink-950 px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
            <div aria-hidden className="absolute -right-24 top-1/2 -z-10 size-[34rem] -translate-y-1/2">
              <div className="animate-aurora size-full rounded-full bg-brand-500/25 blur-[120px]" />
            </div>
            <div aria-hidden className="bg-grid mask-radial absolute inset-0 -z-10 opacity-60" />

            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-10">
              <div className="relative z-10">
                <span className="eyebrow text-brand-300"><span className="h-px w-8 bg-current opacity-60" />Business Growth</span>
                <h2 className="mt-3 text-h2 font-bold text-white">
                  Websites and campaigns built to <span className="text-gradient">bring in customers</span>
                </h2>
                <p className="mt-4 max-w-xl text-lead text-ink-300">{site.companyIntro}</p>
                <ul className="mt-6 grid gap-3 text-sm text-ink-200 sm:grid-cols-2">
                  {growthPoints.map((t) => (
                    <li key={t} className="flex items-center gap-2.5">
                      <CheckCircle2 className="size-5 shrink-0 text-brand-400" /> {t}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink href="/contact" size="lg" arrow>Start a Project</ButtonLink>
                  <ButtonLink href="/services" size="lg" variant="ghost-light">View Services</ButtonLink>
                </div>
              </div>

              <SceneBox kind="growth" fallback={<GrowthDevices />}>
                {/* Floating chips: real service capabilities */}
                <FloatChip tone="dark" className="left-0 top-[6%] sm:-left-4" icon={<Laptop2 className="size-4" />} delay={0}>
                  {services[0].points[3]}
                </FloatChip>
                <FloatChip tone="dark" className="bottom-[10%] right-0 sm:-right-2" icon={<Rocket className="size-4" />} delay={-3}>
                  {services[4].points[3]}
                </FloatChip>
              </SceneBox>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function GrowthDevices() {
  const { ref, rotateX, rotateY, y, floatY } = useDeviceScroll();
  return (
    <div ref={ref} className="relative w-full [perspective:1400px]">
      <motion.div style={{ rotateX, rotateY, y }} className="[transform-style:preserve-3d]">
        <Laptop>
          <SiteMock />
        </Laptop>
      </motion.div>
      <motion.div style={{ y: floatY }} className="absolute -bottom-6 -right-1 w-[26%] sm:-right-4">
        <div className="animate-float-slow">
          <Phone>
            <ChartMock />
          </Phone>
        </div>
      </motion.div>
    </div>
  );
}

function FloatChip({
  className,
  icon,
  delay,
  tone,
  children,
}: {
  className: string;
  icon: React.ReactNode;
  delay: number;
  tone: "dark" | "light";
  children: React.ReactNode;
}) {
  const skin =
    tone === "dark"
      ? "glass-frame bg-ink-900/80 text-white"
      : "border border-ink-100 bg-white/90 text-ink-900";
  return (
    <div
      className={`absolute flex animate-float items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold shadow-2xl backdrop-blur-xl ${skin} ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <span className={`grid size-7 place-items-center rounded-lg bg-brand-400/15 ${tone === "dark" ? "text-brand-300" : "text-brand-600"}`}>{icon}</span>
      {children}
    </div>
  );
}

/* ───────────────────────────── Courses & training ───────────────────────────── */

export function CoursesFeature() {
  return (
    <section className="relative section-y-sm">
      <div className="container-x">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[2rem] border border-ink-100 bg-[linear-gradient(135deg,#e9fbfe_0%,#ffffff_55%,#f4f7f9_100%)] px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
            <div aria-hidden className="animate-aurora-slow absolute -left-24 top-1/3 -z-10 size-[30rem] rounded-full bg-brand-500/20 blur-[120px]" />
            <div aria-hidden className="bg-grid-light mask-radial absolute inset-0 -z-10 opacity-60" />

            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-10">
              {/* Educational composition */}
              <div className="order-2 lg:order-1">
                <SceneBox kind="courses" fallback={<CourseDevices />}>
                  <FloatChip tone="light" className="left-0 top-[8%] sm:-left-2" icon={<BookOpen className="size-4" />} delay={0}>
                    {courses.length} courses
                  </FloatChip>
                  <FloatChip tone="light" className="bottom-[8%] right-0 sm:-right-2" icon={<LayoutGrid className="size-4" />} delay={-3}>
                    {categories.length} learning tracks
                  </FloatChip>
                </SceneBox>
              </div>

              <div className="relative z-10 order-1 lg:order-2">
                <span className="eyebrow"><span className="h-px w-8 bg-current opacity-60" />{site.instituteName}</span>
                <h2 className="mt-3 text-h2 font-bold text-ink-900">
                  Learn the skills that <span className="text-gradient-deep">power digital growth</span>
                </h2>
                <p className="mt-4 max-w-xl text-lead text-ink-500">{site.instituteIntro}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {categories.map((c) => (
                    <li key={c.id} className="rounded-full border border-ink-100 bg-ink-50 px-3 py-1.5 text-xs font-medium text-ink-600">
                      {c.short}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 flex items-center gap-2 text-sm text-ink-500">
                  <BookOpen className="size-4 text-brand-500" /> {courses.length} courses across {categories.length} categories
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink href="/courses" size="lg" arrow>Explore Courses</ButtonLink>
                  <ButtonLink href="/contact?interest=enroll" size="lg" variant="outline">Enroll Now</ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CourseDevices() {
  const { ref, rotateX, rotateY, y, floatY } = useDeviceScroll();
  const mirroredY = useTransform(rotateY, (v) => -v);
  return (
    <div ref={ref} className="relative w-full max-w-lg [perspective:1400px]">
      <motion.div style={{ rotateX, rotateY: mirroredY, y }} className="[transform-style:preserve-3d]">
        <Laptop>
          <CourseScreen />
        </Laptop>
      </motion.div>
      <motion.div style={{ y: floatY }} className="absolute -bottom-8 -left-2 w-[34%] sm:-left-6">
        <Books className="animate-float-slow drop-shadow-[0_20px_25px_rgba(0,0,0,0.6)]" />
      </motion.div>
      <motion.div style={{ y: floatY }} className="absolute -right-2 -top-10 w-[30%] sm:-right-6">
        <GradCap className="w-full animate-float drop-shadow-[0_15px_25px_rgba(25,196,226,0.35)]" />
      </motion.div>
    </div>
  );
}

/** Abstract lesson screen: video area and a progress list, no real data implied. */
function CourseScreen() {
  return (
    <div className="absolute inset-0 grid grid-cols-[1.6fr_1fr] gap-[4%] p-[5%]">
      <div className="relative grid place-items-center rounded-lg bg-[radial-gradient(circle_at_50%_40%,#0f4b5c,#0a1218_75%)] ring-1 ring-white/10">
        <span className="bg-brand-gradient grid size-[22%] place-items-center rounded-full shadow-[0_0_30px_rgba(25,196,226,0.7)]">
          <GraduationCap className="size-1/2 text-white" />
        </span>
        <span className="absolute inset-x-[6%] bottom-[8%] h-1 rounded-full bg-white/15">
          <span className="block h-full w-3/5 rounded-full bg-brand-400" />
        </span>
      </div>
      <div className="flex flex-col gap-[8%]">
        {[1, 1, 1, 0, 0].map((done, i) => (
          <span key={i} className="flex flex-1 items-center gap-1.5 rounded-md bg-white/[0.05] px-1.5 ring-1 ring-white/10">
            <span className={`size-1.5 shrink-0 rounded-full ${done ? "bg-brand-400" : "bg-white/25"}`} />
            <span className="h-1 flex-1 rounded-full bg-white/25" />
          </span>
        ))}
      </div>
    </div>
  );
}
