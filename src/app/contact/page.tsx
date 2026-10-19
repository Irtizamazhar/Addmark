import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactSection from "@/components/sections/ContactSection";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with ${site.name} about services or course enrollment.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title={<>We&apos;re here to <span className="text-gradient">help you grow</span></>}
        description="Questions about a project, a service or a course? Send us a message or reach us directly."
        image="/images/contact-office.webp"
        imageAlt="Modern, bright office interior"
        crumbs={[{ label: "Contact Us" }]}
      />
      <ContactSection showMap />
    </>
  );
}
