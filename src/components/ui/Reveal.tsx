"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  className?: string;
  as?: "div" | "li" | "section";
} & Omit<HTMLMotionProps<"div">, "children">;

const ease = [0.22, 1, 0.36, 1] as const;

/** Fades and slides its children in once when scrolled into view. */
export default function Reveal({ children, delay = 0, y = 28, x = 0, className, as = "div", ...rest }: Props) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.8, delay, ease }}
      className={className}
      {...rest}
    >
      {children}
    </Comp>
  );
}
