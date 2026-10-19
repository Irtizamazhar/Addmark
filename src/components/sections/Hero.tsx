"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Briefcase, GraduationCap, Sparkles, TrendingUp } from "lucide-react";
import { site } from "@/content/site";
import { ButtonLink } from "../ui/Button";
import Swoosh from "../ui/Swoosh";

const ease = [0.22, 1, 0.36, 1] as const;
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease },
});

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-ink-950 pb-16 pt-28 sm:pb-20 sm:pt-32 lg:flex lg:min-h-[min(100svh,54rem)] lg:items-center lg:pb-20 lg:pt-32">
      {/* Background layers */}
      <div aria-hidden className="bg-grid mask-radial absolute inset-0 -z-10" />
      <motion.div style={{ y: glowY }} aria-hidden className="absolute -right-40 top-10 -z-10 size-[38rem] rounded-full bg-brand-500/25 blur-[120px]" />
      <div aria-hidden className="absolute -left-40 bottom-0 -z-10 size-[30rem] rounded-full bg-brand-700/30 blur-[120px]" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-ink-950 to-transparent" />
      <Swoosh className="pointer-events-none absolute -right-[4%] bottom-0 -z-10 hidden w-[48%] max-w-3xl opacity-35 lg:block" />

      <div className="container-x grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-10 xl:gap-16">
        {/* Copy */}
        <div>
          <motion.span
            {...fadeUp(0.1)}
            className="inline-flex items-center gap-2 rounded-full border border-brand-400/25 bg-brand-400/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-brand-200"
          >
            <Sparkles className="size-3.5 text-brand-300" />
            {site.tagline}
          </motion.span>

          <motion.h1
            {...fadeUp(0.2)}
            className="mt-5 text-display font-extrabold text-white"
          >
            Grow your business.
            <br />
            <span className="text-gradient">Build your career.</span>
          </motion.h1>

          <motion.p {...fadeUp(0.35)} className="mt-5 max-w-xl text-lead text-ink-300">
            {site.companyIntro} {site.instituteIntro}
          </motion.p>

          <motion.div {...fadeUp(0.5)} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/services" size="lg" arrow>
              Explore Services
            </ButtonLink>
            <ButtonLink href="/courses" size="lg" variant="ghost-light">
              View Courses
            </ButtonLink>
          </motion.div>

          <motion.div {...fadeUp(0.65)} className="mt-10 grid max-w-xl gap-3 sm:grid-cols-2">
            <Pillar icon={<Briefcase className="size-5" />} title="The Company" text="Web, apps & digital marketing" />
            <Pillar icon={<GraduationCap className="size-5" />} title="The Institute" text="Practical, career-focused training" />
          </motion.div>
        </div>

        {/* Visual composition */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.25, ease }}
          className="relative mx-auto w-full max-w-xl lg:max-w-none"
        >
          <div aria-hidden className="absolute -inset-6 -z-10 animate-spin-slow rounded-full border border-dashed border-brand-400/15" />

          <motion.div style={{ y: imgY }} className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] ring-1 ring-white/10 [clip-path:polygon(14%_0,100%_0,100%_100%,0_100%,0_16%)] sm:aspect-[5/4] lg:aspect-square">
              <Image
                src="/images/hero-team.webp"
                alt="A focused team collaborating on laptops in a modern workspace"
                fill
                priority
                sizes="(min-width:1024px) 45vw, 92vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-ink-950/70 via-ink-950/10 to-brand-500/20" />
            </div>

            {/* inset secondary image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.9, ease }}
              className="absolute -bottom-8 -left-2 w-[42%] sm:-left-5 lg:-left-8"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border-4 border-ink-950 shadow-2xl">
                <Image
                  src="/images/inst-students.webp"
                  alt="Students learning together with laptops"
                  fill
                  sizes="(min-width:1024px) 20vw, 40vw"
                  className="object-cover"
                />
              </div>
            </motion.div>

            {/* floating cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1, ease }}
              className="absolute -right-2 top-8 sm:-right-6"
            >
              <div className="animate-float flex items-center gap-3 rounded-2xl border border-white/10 bg-ink-900/70 p-3 pr-5 shadow-2xl backdrop-blur-xl">
                <span className="bg-brand-gradient grid size-10 place-items-center rounded-xl text-white">
                  <TrendingUp className="size-5" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-white">Growth-focused</span>
                  <span className="block text-xs text-ink-300">Digital solutions</span>
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3, ease }}
              className="absolute -right-1 bottom-10 hidden sm:block lg:-right-4"
            >
              <div className="animate-float-slow flex items-center gap-3 rounded-2xl border border-white/60 bg-white/90 p-3 pr-5 shadow-2xl backdrop-blur-xl">
                <span className="grid size-10 place-items-center rounded-xl bg-ink-900 text-brand-300">
                  <GraduationCap className="size-5" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-ink-900">Learn by doing</span>
                  <span className="block text-xs text-ink-500">Hands-on courses</span>
                </span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Pillar({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="group flex items-center gap-3.5 rounded-2xl border border-white/8 bg-ink-950/80 p-3.5 backdrop-blur-md transition-colors hover:border-brand-400/30 hover:bg-ink-900/90">
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-400/10 text-brand-300 transition-colors group-hover:bg-brand-400/20">
        {icon}
      </span>
      <span>
        <span className="block font-display text-sm font-semibold text-white">{title}</span>
        <span className="block text-sm text-ink-300">{text}</span>
      </span>
    </div>
  );
}
