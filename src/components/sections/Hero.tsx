"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, Briefcase, GraduationCap, Sparkles } from "lucide-react";
import { services, site } from "@/content/site";
import { ButtonLink } from "../ui/Button";
import { serviceIcons } from "../ui/icons";
import Swoosh from "../ui/Swoosh";
import { useInView, useSceneSettings } from "../three/useSceneSettings";

// three.js only runs in the browser and is heavy, so it is split out and loaded after hydration.
const HeroScene = dynamic(() => import("../three/HeroScene"), { ssr: false, loading: () => <GlobeFallback /> });

const ease = [0.22, 1, 0.36, 1] as const;
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease },
});

/* Floating glass cards around the globe: real services, each linking to its section. */
const orbitCards = [
  { id: "web-development", label: "Web Development", pos: "left-0 top-[6%] lg:-left-[4%]", depth: 1.2, delay: 0.9 },
  { id: "mobile-app-development", label: "App Development", pos: "right-0 top-[20%] lg:-right-[3%]", depth: 0.7, delay: 1.05 },
  { id: "digital-marketing", label: "Digital Marketing", pos: "left-0 bottom-[26%] lg:-left-[7%]", depth: 0.9, delay: 1.2 },
  { id: "lead-generation", label: "Lead Generation", pos: "right-0 bottom-[12%] lg:right-[-1%]", depth: 1.4, delay: 1.35 },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const glowY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.25]);

  // Pointer position over the hero (-0.5 … 0.5), smoothed. Drives the parallax of the floating cards.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative isolate overflow-hidden bg-ink-950 pb-16 pt-28 sm:pb-20 sm:pt-32 lg:flex lg:min-h-[min(100svh,56rem)] lg:items-center lg:pb-24 lg:pt-32"
    >
      {/* Background layers */}
      <div aria-hidden className="bg-grid mask-radial absolute inset-0 -z-10" />
      {/* Glows and the swoosh are anchored to the content container, not the screen edges,
          so they stay next to the content on wide and ultrawide displays. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="container-x relative h-full">
          <motion.div style={{ y: glowY }} className="absolute -right-48 top-10 size-[38rem]">
            <div className="animate-aurora size-full rounded-full bg-brand-500/25 blur-[120px]" />
          </motion.div>
          <div className="animate-aurora-slow absolute -left-56 bottom-0 size-[30rem] rounded-full bg-brand-700/30 blur-[120px]" />
          <div className="animate-aurora absolute left-1/3 top-1/4 size-[18rem] rounded-full bg-brand-300/10 blur-[100px]" />
          <Swoosh className="absolute -right-[6%] bottom-0 hidden w-[52%] max-w-3xl opacity-25 lg:block" />
        </div>
      </div>
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-ink-950 to-transparent" />

      <div className="container-x grid items-center gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-6 xl:gap-10">
        {/* Copy */}
        <motion.div style={{ y: copyY, opacity: copyOpacity }} className="relative z-10">
          <motion.span
            {...fadeUp(0.1)}
            className="glass-frame inline-flex items-center gap-2 rounded-full bg-brand-400/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-brand-200"
          >
            <span className="relative grid size-3.5 place-items-center">
              <span className="absolute inset-0 animate-ping rounded-full bg-brand-300/50" />
              <Sparkles className="relative size-3.5 text-brand-300" />
            </span>
            {site.tagline}
          </motion.span>

          <h1 className="mt-5 text-display font-extrabold text-white lg:text-[clamp(2.5rem,4.1vw,4rem)]">
            <Line delay={0.2}>Grow your business.</Line>
            <Line delay={0.34} className="text-gradient">Build your career.</Line>
          </h1>

          <motion.p {...fadeUp(0.5)} className="mt-5 max-w-xl text-lead text-ink-300">
            {site.companyIntro} {site.instituteIntro}
          </motion.p>

          <motion.div {...fadeUp(0.62)} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/services" size="lg" arrow>
              Explore Services
            </ButtonLink>
            <ButtonLink href="/courses" size="lg" variant="ghost-light">
              View Courses
            </ButtonLink>
          </motion.div>

          <motion.div {...fadeUp(0.76)} className="mt-10 grid max-w-xl gap-3 sm:grid-cols-2">
            <Pillar icon={<Briefcase className="size-5" />} title="The Company" text="Web, apps & digital marketing" />
            <Pillar icon={<GraduationCap className="size-5" />} title="The Institute" text="Practical, career-focused training" />
          </motion.div>
        </motion.div>

        <GlobeVisual x={sx} y={sy} />
      </div>

      {/* Scroll cue */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.6 }}
        className="absolute bottom-12 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 xl:flex"
      >
        <span className="flex h-9 w-5.5 justify-center rounded-full border border-white/25 pt-1.5">
          <span className="animate-scroll-dot size-1 rounded-full bg-brand-300" />
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-ink-400">Scroll</span>
      </motion.div>
    </section>
  );
}

/* ── The 3D globe with service cards floating around it ── */
function GlobeVisual({ x, y }: { x: MotionValue<number>; y: MotionValue<number> }) {
  const ref = useRef<HTMLDivElement>(null);
  const { webgl, lite, still } = useSceneSettings();
  const inView = useInView(ref);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, delay: 0.2, ease }}
      className="relative mx-auto aspect-square w-full max-w-[30rem] lg:max-w-[40rem]"
    >
      <div ref={ref} aria-hidden className="absolute -inset-[14%]">
        {webgl ? <HeroScene lite={lite} still={still} paused={!inView} /> : <GlobeFallback />}
      </div>
      {orbitCards.map((c) => (
        <OrbitCard key={c.id} {...c} x={x} y={y} />
      ))}
    </motion.div>
  );
}

function OrbitCard({
  id,
  label,
  pos,
  depth,
  delay,
  x,
  y,
}: (typeof orbitCards)[number] & { x: MotionValue<number>; y: MotionValue<number> }) {
  const service = services.find((s) => s.id === id)!;
  const Icon = serviceIcons[service.icon];
  // Nearer cards (higher depth) move further, which reads as depth.
  const tx = useTransform(x, (v) => v * depth * -36);
  const ty = useTransform(y, (v) => v * depth * -28);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay, ease }}
      className={`absolute ${pos}`}
    >
      <motion.div style={{ x: tx, y: ty }}>
        <Link
          href={`/services#${id}`}
          className="glass-frame group flex animate-float items-center gap-2.5 rounded-2xl bg-ink-900/70 p-2 pr-3 shadow-2xl backdrop-blur-xl transition-colors hover:bg-ink-800/80 sm:gap-3 sm:p-2.5 sm:pr-4"
          style={{ animationDelay: `${-depth * 2.5}s` }}
        >
          <span className="bg-brand-gradient grid size-8 shrink-0 place-items-center rounded-xl text-white shadow-[0_8px_20px_-6px_rgba(0,179,204,0.8)] sm:size-10">
            <Icon className="size-4 sm:size-5" />
          </span>
          <span className="text-xs font-semibold text-white sm:text-sm">{label}</span>
          <ArrowUpRight className="hidden size-3.5 text-brand-300 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:block" />
        </Link>
      </motion.div>
    </motion.div>
  );
}

/** Shown while three.js loads and when WebGL is unavailable: a CSS-only globe with rings. */
function GlobeFallback() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="relative aspect-square w-[46%]">
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_30%,#1c4a5c,#0b1c26_55%,#050b10)] shadow-[0_0_80px_10px_rgba(25,196,226,0.35)]" />
        <div className="mask-radial absolute inset-0 rounded-full bg-[radial-gradient(rgba(95,227,246,0.55)_1px,transparent_1.5px)] opacity-70 [background-size:10px_10px]" />
        <div className="absolute -inset-[22%] rotate-[-18deg] rounded-full border border-brand-400/60 [transform:rotateX(70deg)]" />
        <div className="absolute -inset-[38%] rotate-[24deg] rounded-full border border-brand-400/30 [transform:rotateX(72deg)]" />
      </div>
    </div>
  );
}

/** One headline line that slides up from behind a mask. */
function Line({ children, delay, className = "" }: { children: React.ReactNode; delay: number; className?: string }) {
  return (
    <span className="-mb-[0.14em] block overflow-hidden pb-[0.14em]">
      <motion.span
        className={`block ${className}`}
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function Pillar({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="spotlight group flex items-center gap-3.5 rounded-2xl border border-white/8 bg-ink-950/80 p-3.5 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400/30 hover:bg-ink-900/90">
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
