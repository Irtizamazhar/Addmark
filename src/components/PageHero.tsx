"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Swoosh from "./ui/Swoosh";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  image: string;
  imageAlt: string;
  crumbs?: { label: string; href?: string }[];
  children?: React.ReactNode;
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function PageHero({ eyebrow, title, description, image, imageAlt, crumbs = [], children }: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-ink-950 pb-12 pt-24 sm:pb-14 sm:pt-28 lg:pb-16 lg:pt-32">
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease }}
        className="absolute inset-0 -z-20"
      >
        <Image src={image} alt={imageAlt} fill priority sizes="100vw" className="object-cover opacity-35" />
      </motion.div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-950 via-ink-950/85 to-ink-950/40" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-ink-950 to-transparent" />
      <div aria-hidden className="bg-grid mask-radial absolute inset-0 -z-10 opacity-60" />
      <div aria-hidden className="absolute -right-32 top-0 -z-10 size-[28rem] rounded-full bg-brand-500/25 blur-[110px]" />
      <Swoosh className="pointer-events-none absolute -right-10 bottom-0 -z-10 hidden w-[45%] max-w-2xl opacity-50 md:block" delay={0.6} />

      <div className="container-x">
        <motion.nav
          aria-label="Breadcrumb"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-300">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            {crumbs.map((c) => (
              <li key={c.label} className="flex items-center gap-1.5">
                <ChevronRight className="size-3.5" />
                {c.href ? <Link href={c.href} className="hover:text-white">{c.label}</Link> : <span className="text-brand-300">{c.label}</span>}
              </li>
            ))}
          </ol>
        </motion.nav>

        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="eyebrow mt-4 text-brand-300"
        >
          <span className="h-px w-8 bg-current opacity-60" />
          {eyebrow}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.18, ease }}
          className="mt-3 max-w-4xl text-h1 font-extrabold text-white"
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease }}
            className="mt-5 max-w-2xl text-lead text-ink-300"
          >
            {description}
          </motion.p>
        )}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.42, ease }}
            className="mt-8"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
