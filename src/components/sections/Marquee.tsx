import { services } from "@/content/site";

/** Brand ribbon listing services, scrolling continuously. */
export default function Marquee() {
  const items = [...services.map((s) => s.title), "Professional Training"];
  const row = [...items, ...items];
  return (
    <div className="relative z-10 overflow-hidden" aria-hidden>
      <div className="border-y border-white/15 bg-[linear-gradient(90deg,#01849e_0%,#00b3cc_50%,#01849e_100%)] py-4">
        <div className="flex w-max animate-marquee whitespace-nowrap">
          {row.map((t, i) => (
            <span key={i} className="flex items-center gap-10 pr-10 font-display text-lg font-semibold text-white sm:text-xl">
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
