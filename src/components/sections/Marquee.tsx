import { services } from "@/content/site";

/** Slanted brand ribbon listing services — echoes the italic geometry of the logo. */
export default function Marquee() {
  const items = [...services.map((s) => s.title), "Professional Training"];
  const row = [...items, ...items];
  return (
    <div className="relative z-10 -mt-6 overflow-hidden py-6" aria-hidden>
      <div className="bg-brand-gradient -mx-4 -rotate-[1.5deg] py-4 shadow-[0_20px_50px_-20px_rgba(0,179,204,0.6)]">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
          {row.map((t, i) => (
            <span key={i} className="flex items-center gap-10 font-display text-lg font-semibold text-white sm:text-xl">
              {t}
              <svg viewBox="0 0 24 24" className="size-4 text-ink-900" fill="currentColor">
                <path d="M3 21 21 3M21 3h-9M21 3v9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
              </svg>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
