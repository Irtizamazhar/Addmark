import { Suspense } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/content/site";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import ContactForm from "../ContactForm";
import SocialLinks, { socialEntries } from "../ui/SocialLinks";
import { WhatsAppIcon } from "../ui/icons";

export default function ContactSection({ showMap = false }: { showMap?: boolean }) {
  const { contact } = site;
  const wa = contact.whatsapp.replace(/\D/g, "");

  return (
    <section id="contact" className="relative overflow-hidden bg-ink-50 section-y">
      <div aria-hidden className="absolute -left-40 bottom-0 size-[30rem] rounded-full bg-brand-200/40 blur-3xl" />
      <div className="container-x relative">
        <SectionHeading
          align="center"
          eyebrow="Contact Us"
          title={<>Let&apos;s start a <span className="text-gradient-deep">conversation</span></>}
          description="Have a project in mind or want to join a course? Reach out and our team will get back to you."
        />

        <div className="mt-10 grid gap-5 lg:mt-12 lg:grid-cols-12 lg:gap-6">
          {/* Info panel */}
          <Reveal className="lg:col-span-5">
            <div className="relative isolate h-full overflow-hidden rounded-[2rem] bg-ink-900 p-7 text-white sm:p-10">
              <div aria-hidden className="absolute -right-20 -top-20 -z-10 size-64 rounded-full bg-brand-500/30 blur-3xl" />
              <div aria-hidden className="bg-grid absolute inset-0 -z-10 opacity-50" />
              <h3 className="text-2xl font-bold text-white">Get in touch</h3>
              <p className="mt-2 text-sm text-ink-300">We&apos;d love to hear from you. Choose whatever works best for you.</p>

              <ul className="mt-7 space-y-5">
                <InfoRow icon={<MapPin className="size-5" />} label={contact.instituteAddress ? "Company Office" : "Address"}>
                  {contact.address}
                </InfoRow>
                {contact.instituteAddress && (
                  <InfoRow icon={<MapPin className="size-5" />} label="Institute Campus">{contact.instituteAddress}</InfoRow>
                )}
                <InfoRow icon={<Phone className="size-5" />} label="Phone">
                  {contact.phones.map((p) => (
                    <a key={p} href={`tel:${p.replace(/[^\d+]/g, "")}`} className="block hover:text-brand-300">{p}</a>
                  ))}
                </InfoRow>
                {wa && (
                  <InfoRow icon={<WhatsAppIcon className="size-5" />} label="WhatsApp">
                    <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer" className="hover:text-brand-300">
                      Chat with us on WhatsApp
                    </a>
                  </InfoRow>
                )}
                <InfoRow icon={<Mail className="size-5" />} label="Email">
                  {contact.emails.map((e) => (
                    <a key={e} href={`mailto:${e.replace(/[[\]]/g, "")}`} className="block break-all hover:text-brand-300">{e}</a>
                  ))}
                </InfoRow>
                <InfoRow icon={<Clock className="size-5" />} label="Working Hours">{contact.hours}</InfoRow>
              </ul>

              {socialEntries.length > 0 && (
                <div className="mt-8 border-t border-white/10 pt-6">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-ink-300">Follow us</p>
                  <SocialLinks />
                </div>
              )}
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="h-full rounded-[2rem] border border-ink-100 bg-white p-7 shadow-[0_30px_60px_-40px_rgba(10,18,24,0.4)] sm:p-10">
              <h3 className="text-2xl font-bold">Send us a message</h3>
              <p className="mb-6 mt-2 text-sm text-ink-500">Fill in the form and we&apos;ll respond as soon as we can.</p>
              <Suspense fallback={<div className="min-h-[24rem]" />}>
                <ContactForm />
              </Suspense>
            </div>
          </Reveal>
        </div>

        {showMap && (
          <Reveal className="mt-6">
            {contact.mapQuery ? (
              <div className="overflow-hidden rounded-[2rem] border border-ink-100 bg-white">
                <iframe
                  title={`${site.name} location on Google Maps`}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(contact.mapQuery)}&output=embed`}
                  className="h-[22rem] w-full grayscale-[30%] sm:h-[26rem]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="flex flex-col items-start justify-between gap-3 border-t border-ink-100 px-5 py-4 sm:flex-row sm:items-center sm:px-6">
                  <p className="flex min-w-0 gap-2.5 text-sm text-ink-600">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-brand-500" /> {contact.address}
                  </p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.mapQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 rounded-full bg-ink-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
                  >
                    Get Directions
                  </a>
                </div>
              </div>
            ) : (
              <div className="bg-grid-light grid place-items-center rounded-[2rem] py-10 border border-dashed border-ink-200 bg-white text-center">
                <div className="px-6">
                  <MapPin className="mx-auto size-8 text-brand-500" />
                  <p className="mt-3 font-semibold text-ink-800">Map will appear here</p>
                  <p className="mt-1 text-sm text-ink-500">
                    Add your address as <code className="font-mono text-xs">contact.mapQuery</code> in <code className="font-mono text-xs">src/content/site.ts</code>.
                  </p>
                </div>
              </div>
            )}
          </Reveal>
        )}
      </div>
    </section>
  );
}

function InfoRow({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <li className="flex gap-4">
      <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5 text-brand-300">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-ink-300">{label}</p>
        <div className="mt-1 text-[15px] text-white">{children}</div>
      </div>
    </li>
  );
}
