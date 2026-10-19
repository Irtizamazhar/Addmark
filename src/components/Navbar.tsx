"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight, Phone } from "lucide-react";
import { navLinks, site } from "@/content/site";
import Logo from "./ui/Logo";
import { ButtonLink } from "./ui/Button";
import SocialLinks from "./ui/SocialLinks";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  // Every page opens on a dark hero, so the bar starts transparent with the light logo.
  const solid = scrolled && !open;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-all duration-500 ${
          solid ? "border-b border-ink-100/80 bg-white/85 py-2.5 shadow-[0_8px_30px_-18px_rgba(10,18,24,0.35)] backdrop-blur-xl" : "py-4 lg:py-5"
        }`}
      >
        <nav className="container-x flex items-center justify-between gap-6" aria-label="Main">
          <div className="relative">
            <span className={`transition-opacity duration-300 ${solid ? "opacity-0" : "opacity-100"}`}>
              <Logo variant="light" className="h-9 lg:h-10" priority />
            </span>
            <span className={`absolute inset-0 transition-opacity duration-300 ${solid ? "opacity-100" : "pointer-events-none opacity-0"}`}>
              <Logo variant="dark" className="h-9 lg:h-10" />
            </span>
          </div>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => {
              const active = isActive(l.href);
              return (
                <li key={l.href} className="relative">
                  <Link
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative z-10 block rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      solid
                        ? active ? "text-brand-700" : "text-ink-600 hover:text-ink-900"
                        : active ? "text-white" : "text-white/70 hover:text-white"
                    }`}
                  >
                    {l.label}
                  </Link>
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className={`absolute inset-0 rounded-full ${solid ? "bg-brand-50" : "bg-white/10"}`}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <span className="hidden sm:block"><ButtonLink href="/contact?interest=enroll" variant="primary" arrow>
              Enroll Now
            </ButtonLink></span>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className={`grid size-11 place-items-center rounded-full border transition-colors lg:hidden ${
                solid ? "border-ink-100 bg-white text-ink-900" : "border-white/15 bg-white/5 text-white backdrop-blur"
              }`}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 -z-10 overflow-y-auto bg-ink-950/98 backdrop-blur-xl lg:hidden"
          >
            <div aria-hidden className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-brand-500/20 blur-3xl" />
            <div className="container-x relative flex min-h-full flex-col pb-10 pt-28">
              <ul className="flex flex-col">
                {navLinks.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="border-b border-white/8"
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className={`group flex items-center justify-between py-4 font-display text-2xl font-semibold ${
                        isActive(l.href) ? "text-brand-300" : "text-white"
                      }`}
                    >
                      {l.label}
                      <ArrowUpRight className="size-5 text-white/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-300" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="mt-10 space-y-6"
              >
                <ButtonLink href="/contact?interest=enroll" size="lg" className="w-full" arrow onClick={() => setOpen(false)}>
                  Enroll Now
                </ButtonLink>
                <a href={`tel:${site.contact.phones[0].replace(/[^\d+]/g, "")}`} className="flex items-center gap-3 text-ink-300">
                  <Phone className="size-4 text-brand-400" /> {site.contact.phones[0]}
                </a>
                <SocialLinks />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
