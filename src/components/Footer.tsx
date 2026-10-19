import Link from "next/link";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { courses, navLinks, services, site } from "@/content/site";
import Logo from "./ui/Logo";
import SocialLinks from "./ui/SocialLinks";

export default function Footer() {
  const year = new Date().getFullYear();
  const { contact } = site;

  return (
    <footer className="relative overflow-hidden bg-ink-950 text-ink-300">
      <div aria-hidden className="bg-grid mask-fade-b pointer-events-none absolute inset-0 opacity-60" />
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-brand-600/15 blur-3xl" />
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500/60 to-transparent" />

      <div className="container-x relative grid grid-cols-2 gap-x-6 gap-y-10 pb-10 pt-14 lg:pt-16 lg:grid-cols-12 lg:gap-8 [&>*]:min-w-0">
        <div className="col-span-2 lg:col-span-3">
          <Logo variant="light" className="h-11" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-300">{site.companyIntro}</p>
          <SocialLinks className="mt-6" />
        </div>

        <FooterCol title="Quick Links" className="col-span-1 lg:col-span-2">
          {navLinks.map((l) => (
            <FooterLink key={l.href} href={l.href}>{l.label}</FooterLink>
          ))}
        </FooterCol>

        <FooterCol title="Services" className="col-span-1 lg:col-span-2">
          {services.slice(0, 6).map((s) => (
            <FooterLink key={s.id} href={`/services#${s.id}`}>{s.title}</FooterLink>
          ))}
        </FooterCol>

        <FooterCol title="Institute & Courses" className="col-span-2 sm:col-span-1 lg:col-span-2">
          <FooterLink href="/institute">About the Institute</FooterLink>
          {courses.slice(0, 5).map((c) => (
            <FooterLink key={c.id} href={`/courses/${c.id}`}>{c.title}</FooterLink>
          ))}
        </FooterCol>

        <FooterCol title="Get in Touch" className="col-span-2 sm:col-span-1 lg:col-span-3">
          <li className="flex gap-3">
            <MapPin className="mt-0.5 size-4 shrink-0 text-brand-400" />
            <span className="text-sm">{contact.address}</span>
          </li>
          {contact.phones.map((p) => (
            <li key={p}>
              <a href={`tel:${p.replace(/[^\d+]/g, "")}`} className="flex gap-3 text-sm hover:text-white">
                <Phone className="mt-0.5 size-4 shrink-0 text-brand-400" /> {p}
              </a>
            </li>
          ))}
          {contact.emails.map((e) => (
            <li key={e}>
              <a href={`mailto:${e.replace(/[[\]]/g, "")}`} className="flex gap-3 break-words text-sm hover:text-white">
                <Mail className="mt-0.5 size-4 shrink-0 text-brand-400" /> {e}
              </a>
            </li>
          ))}
          <li className="flex gap-3 text-sm">
            <Clock className="mt-0.5 size-4 shrink-0 text-brand-400" /> {contact.hours}
          </li>
        </FooterCol>
      </div>

      <div className="container-x relative flex flex-col items-center justify-between gap-3 border-t border-white/8 py-6 text-xs text-ink-300 sm:flex-row">
        <p>© {year} {site.name}. All rights reserved.</p>
        <p>{site.tagline}</p>
      </div>
    </footer>
  );
}

function FooterCol({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <h2 className="font-display text-sm font-semibold uppercase tracking-[0.15em] text-white">{title}</h2>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="group inline-flex items-center text-sm transition-colors hover:text-white">
        <span className="h-px w-0 bg-brand-400 transition-all duration-300 group-hover:mr-2 group-hover:w-3" />
        {children}
      </Link>
    </li>
  );
}
