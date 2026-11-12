"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin brand-gradient bar at the very top showing how far the page is scrolled. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="bg-brand-gradient fixed inset-x-0 top-0 z-[70] h-[3px] origin-left shadow-[0_0_12px_rgba(25,196,226,0.8)]"
    />
  );
}
