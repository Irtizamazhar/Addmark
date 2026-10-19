import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative isolate grid min-h-[80svh] place-items-center overflow-hidden bg-ink-950 px-4 pt-24 text-center">
      <div aria-hidden className="bg-grid mask-radial absolute inset-0 -z-10" />
      <div aria-hidden className="absolute left-1/2 top-1/2 -z-10 size-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/20 blur-[110px]" />
      <div>
        <p className="text-gradient font-display text-8xl font-extrabold sm:text-9xl">404</p>
        <h1 className="mt-4 text-2xl font-bold text-white sm:text-3xl">This page could not be found</h1>
        <p className="mt-3 text-ink-300">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <ButtonLink href="/" size="lg" arrow className="mt-8">Back to Home</ButtonLink>
      </div>
    </section>
  );
}
