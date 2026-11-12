import Image from "next/image";
import Reveal from "../ui/Reveal";
import Swoosh from "../ui/Swoosh";
import SceneBackdrop from "../three/SceneBackdrop";
import { ButtonLink } from "../ui/Button";

type Props = {
  title?: React.ReactNode;
  text?: string;
  /** Drop the top padding when the previous section has the same (white) background. */
  flush?: boolean;
};

export default function CtaBand({
  title = <>Ready to grow your brand, <br className="hidden sm:block" />or start your digital career?</>,
  text = "Talk to our team about your project, or ask us about our upcoming courses. We're happy to help you find the right next step.",
  flush = true,
}: Props) {
  return (
    <section className={`relative section-y-sm ${flush ? "pt-0!" : ""}`}>
      <div className="container-x">
        <Reveal>
          <div className="glass-frame relative isolate overflow-hidden rounded-[2rem] bg-ink-900 px-6 py-12 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
            <Image src="/images/inst-lab.webp" alt="" fill sizes="(min-width:1280px) 1200px, 100vw" className="-z-20 object-cover opacity-25" />
            <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-950 via-ink-950/90 to-brand-700/70" />
            <div aria-hidden className="animate-aurora absolute -right-24 -top-24 -z-10 size-80 rounded-full bg-brand-500/30 blur-3xl" />
            <div aria-hidden className="animate-aurora-slow absolute -bottom-32 left-1/4 -z-10 size-72 rounded-full bg-brand-600/20 blur-3xl" />
            <SceneBackdrop className="absolute inset-0 -z-10 opacity-60" />
            <Swoosh className="absolute -bottom-4 right-0 -z-10 w-[30rem] max-w-[70%] opacity-30" delay={0.3} />

            <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div className="max-w-2xl">
                <h2 className="text-h2 font-bold text-white">{title}</h2>
                <p className="mt-4 text-lead text-ink-300">{text}</p>
              </div>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:flex-col xl:flex-row">
                <ButtonLink href="/contact" size="lg" arrow>Start a Project</ButtonLink>
                <ButtonLink href="/contact?interest=enroll" size="lg" variant="white">Enroll in a Course</ButtonLink>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
