import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import AboutIntro from "@/components/sections/AboutIntro";
import ServicesGrid from "@/components/sections/ServicesGrid";
import InstituteShowcase from "@/components/sections/InstituteShowcase";
import CoursesGrid from "@/components/sections/CoursesGrid";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Process from "@/components/sections/Process";
import CtaBand from "@/components/sections/CtaBand";
import ContactSection from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <AboutIntro />
      <ServicesGrid />
      <InstituteShowcase />
      <CoursesGrid limit={6} />
      <WhyChooseUs />
      <Process />
      <CtaBand />
      <ContactSection />
    </>
  );
}
