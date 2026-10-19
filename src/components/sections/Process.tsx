"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";

const tracks = {
  business: {
    label: "For Businesses",
    icon: Briefcase,
    steps: [
      { title: "Discover", text: "We learn about your business, audience and goals to understand what success looks like." },
      { title: "Strategize", text: "We plan the right mix of design, development and marketing to get you there." },
      { title: "Build & Launch", text: "Our team designs, develops and launches, keeping you updated at every stage." },
      { title: "Optimize & Grow", text: "We measure, refine and scale what works so your results keep improving." },
    ],
  },
  student: {
    label: "For Students",
    icon: GraduationCap,
    steps: [
      { title: "Learn the Concepts", text: "Build a strong foundation with clear, structured lessons." },
      { title: "Practise Hands-On", text: "Apply every concept with guided exercises using real tools." },
      { title: "Build Projects", text: "Create practical projects that show what you can do." },
      { title: "Grow Professionally", text: "Gain the confidence and skills to take the next step in your career." },
    ],
  },
} as const;

type Track = keyof typeof tracks;

export default function Process() {
  const [track, setTrack] = useState<Track>("business");
  const steps = tracks[track].steps;

  return (
    <section className="relative overflow-hidden section-y">
      <div className="container-x">
        <div className="flex flex-col items-center text-center">
          <SectionHeading
            align="center"
            eyebrow="Our Process"
            title={<>A clear path from <span className="text-gradient-deep">idea to impact</span></>}
            description="How we work with clients, and how we guide students from first lesson to professional skills."
          />

          <div role="tablist" aria-label="Process type" className="mt-8 inline-flex rounded-full border border-ink-100 bg-ink-50 p-1.5">
            {(Object.keys(tracks) as Track[]).map((k) => {
              const Icon = tracks[k].icon;
              const active = track === k;
              return (
                <button
                  key={k}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setTrack(k)}
                  className={`relative flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors sm:px-6 ${active ? "text-white" : "text-ink-500 hover:text-ink-900"}`}
                >
                  {active && (
                    <motion.span layoutId="process-pill" className="absolute inset-0 rounded-full bg-ink-900" transition={{ type: "spring", stiffness: 400, damping: 34 }} />
                  )}
                  <Icon className="relative size-4" />
                  <span className="relative">{tracks[k].label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative mt-10 lg:mt-12">
          {/* connecting line (desktop) */}
          <div aria-hidden className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-px bg-gradient-to-r from-brand-200 via-brand-400 to-brand-200 lg:block" />

          <AnimatePresence mode="wait">
            <motion.ol
              key={track}
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{ show: { transition: { staggerChildren: 0.08 } } }}
              className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
            >
              {steps.map((s, i) => (
                <motion.li
                  key={s.title}
                  variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }}
                  className="group relative flex flex-col items-center text-center"
                >
                  <span className="relative z-10 grid size-16 place-items-center rounded-full border-4 border-white bg-ink-900 font-display text-lg font-bold text-white shadow-[0_10px_30px_-10px_rgba(10,18,24,0.5)] transition-colors duration-500 group-hover:bg-brand-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="mt-4 w-full rounded-3xl lg:mt-5 border border-ink-100 bg-white p-6 transition-all duration-500 group-hover:-translate-y-1 group-hover:border-brand-200 group-hover:shadow-[0_25px_50px_-30px_rgba(1,97,121,0.5)]">
                    <h3 className="text-lg font-semibold">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-500">{s.text}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ol>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
