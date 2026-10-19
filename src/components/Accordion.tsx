"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

export default function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();
  return (
    <ul className="divide-y divide-ink-100 overflow-hidden rounded-3xl border border-ink-100 bg-white">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <li key={it.q}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${base}-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left font-display text-base font-semibold text-ink-900 transition-colors hover:text-brand-700 sm:px-8 sm:text-lg"
              >
                {it.q}
                <span className={`grid size-9 shrink-0 place-items-center rounded-full transition-all duration-300 ${isOpen ? "rotate-45 bg-brand-500 text-white" : "bg-ink-50 text-ink-600"}`}>
                  <Plus className="size-4" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${base}-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-sm leading-relaxed text-ink-500 sm:px-8 sm:text-base">{it.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
