"use client";

import { motion } from "framer-motion";

/** The rising arrow from the logo, redrawn as a decorative animated stroke. */
export default function Swoosh({ className = "", delay = 0.4 }: { className?: string; delay?: number }) {
  return (
    <svg viewBox="0 0 600 260" fill="none" aria-hidden className={className}>
      <defs>
        <linearGradient id="swoosh-g" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#19c4e2" stopOpacity="0" />
          <stop offset="0.35" stopColor="#19c4e2" stopOpacity="0.7" />
          <stop offset="1" stopColor="#52d5ec" />
        </linearGradient>
      </defs>
      <motion.path
        d="M10 250 C 180 240, 330 190, 470 70"
        stroke="url(#swoosh-g)"
        strokeWidth="5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, delay, ease: [0.65, 0, 0.35, 1] }}
      />
      <motion.path
        d="M420 60 L 520 18 L 488 120"
        stroke="#52d5ec"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: delay + 1.3, ease: "easeOut" }}
      />
    </svg>
  );
}
