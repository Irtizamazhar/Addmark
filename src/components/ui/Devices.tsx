import type { ReactNode } from "react";

/* CSS-3D device mockups. Each sits in its own perspective so it can be tilted by a parent. */

export function Laptop({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative [transform-style:preserve-3d] ${className}`}>
      {/* Screen */}
      <div className="relative rounded-t-[1rem] border border-white/12 bg-ink-800 p-[2.5%] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9),0_0_60px_-20px_rgba(25,196,226,0.45)]">
        <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-ink-950">
          {children}
          {/* glass reflection */}
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.09)_0%,transparent_38%)]" />
        </div>
      </div>
      {/* Keyboard deck, folded toward the viewer */}
      <div className="relative -mx-[7%] h-3 origin-top rounded-b-xl bg-gradient-to-b from-ink-500 to-ink-700 [transform:rotateX(60deg)] sm:h-4">
        <div className="mx-auto h-1 w-1/5 rounded-b-md bg-ink-800" />
      </div>
      <div aria-hidden className="mx-auto -mt-1 h-6 w-[90%] rounded-[50%] bg-black/70 blur-xl" />
    </div>
  );
}

export function Phone({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative rounded-[1.6rem] border border-white/15 bg-ink-800 p-1.5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9),0_0_40px_-12px_rgba(25,196,226,0.5)] ${className}`}>
      <div className="relative aspect-[9/19] overflow-hidden rounded-[1.25rem] bg-ink-950">
        <div aria-hidden className="absolute left-1/2 top-1.5 z-10 h-1.5 w-1/3 -translate-x-1/2 rounded-full bg-ink-800" />
        {children}
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.1)_0%,transparent_40%)]" />
      </div>
    </div>
  );
}

/** Abstract website preview: no real figures, just the shape of a clean landing page. */
export function SiteMock() {
  return (
    <div className="absolute inset-0 flex flex-col p-[5%]">
      <div className="flex items-center gap-[3%]">
        <span className="bg-brand-gradient h-[6%] min-h-1.5 w-[10%] rounded-full" />
        <span className="ml-auto h-1 w-[8%] rounded-full bg-white/25" />
        <span className="h-1 w-[8%] rounded-full bg-white/25" />
        <span className="h-1 w-[8%] rounded-full bg-white/25" />
        <span className="h-2.5 w-[14%] rounded-full bg-brand-400/80" />
      </div>
      <div className="mt-[7%] grid flex-1 grid-cols-[1.1fr_1fr] gap-[5%]">
        <div className="space-y-[6%]">
          <span className="block h-[11%] w-11/12 rounded bg-white/85" />
          <span className="block h-[11%] w-2/3 rounded bg-brand-300" />
          <span className="block h-[5%] w-full rounded bg-white/20" />
          <span className="block h-[5%] w-4/5 rounded bg-white/20" />
          <span className="mt-[8%] block h-[12%] w-2/5 rounded-full bg-brand-gradient" />
        </div>
        <div className="relative rounded-lg bg-[radial-gradient(circle_at_50%_45%,#0f4b5c,#0a1218_70%)] ring-1 ring-white/10">
          <span className="absolute left-1/2 top-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-300/60 shadow-[0_0_25px_rgba(25,196,226,0.6)]" />
          <span className="absolute left-1/2 top-1/2 h-1/4 w-[85%] -translate-x-1/2 -translate-y-1/2 -rotate-12 rounded-[50%] border border-brand-400/50" />
        </div>
      </div>
      <div className="mt-[6%] grid grid-cols-3 gap-[3%]">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-5 rounded-md bg-white/[0.06] ring-1 ring-white/10 sm:h-7" />
        ))}
      </div>
    </div>
  );
}

/** Abstract analytics preview: growth curve and bars without labels or numbers. */
export function ChartMock() {
  return (
    <div className="absolute inset-0 flex flex-col gap-3 p-3 pt-6">
      <span className="h-1.5 w-1/2 rounded-full bg-white/40" />
      <div className="rounded-xl bg-white/[0.05] p-2 ring-1 ring-white/10">
        <svg viewBox="0 0 100 60" className="w-full" fill="none">
          <defs>
            <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#19c4e2" stopOpacity="0.5" />
              <stop offset="1" stopColor="#19c4e2" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 52 C 18 48, 25 40, 38 38 S 60 26, 72 20 S 90 8, 100 4 V60 H0Z" fill="url(#chart-fill)" />
          <path d="M0 52 C 18 48, 25 40, 38 38 S 60 26, 72 20 S 90 8, 100 4" stroke="#5fe3f6" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <div className="flex flex-1 items-end gap-1.5 rounded-xl bg-white/[0.05] p-2 ring-1 ring-white/10">
        {[35, 50, 42, 65, 58, 80, 92].map((h, i) => (
          <span key={i} className="flex-1 rounded-sm bg-gradient-to-t from-brand-700 to-brand-300" style={{ height: `${h}%` }} />
        ))}
      </div>
      <span className="h-6 rounded-full bg-brand-gradient" />
    </div>
  );
}

/** Stack of three books seen in perspective. */
export function Books({ className = "" }: { className?: string }) {
  const books = [
    { w: "w-full", c: "from-brand-500 to-brand-700", s: "bg-brand-800" },
    { w: "w-[90%]", c: "from-ink-500 to-ink-700", s: "bg-ink-800" },
    { w: "w-[95%]", c: "from-brand-300 to-brand-600", s: "bg-brand-700" },
  ];
  return (
    <div className={`flex flex-col-reverse items-center ${className}`}>
      {books.map((b, i) => (
        <div key={i} className={`relative ${b.w} -mt-px`}>
          <div className={`h-4 rounded-sm bg-gradient-to-r ${b.c} shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] sm:h-5`} />
          <div className={`absolute inset-y-0.5 right-1 w-[70%] rounded-sm ${b.s} opacity-40`} />
          <div className="absolute inset-y-1 left-0 w-1 rounded-l-sm bg-white/70" />
        </div>
      ))}
    </div>
  );
}

export function GradCap({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 90" className={className} fill="none" aria-hidden>
      <defs>
        <linearGradient id="cap-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#243845" />
          <stop offset="1" stopColor="#0a1218" />
        </linearGradient>
        <linearGradient id="cap-band" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#172733" />
          <stop offset="1" stopColor="#060c11" />
        </linearGradient>
      </defs>
      <path d="M30 42 V62 C30 72 90 72 90 62 V42" fill="url(#cap-band)" stroke="#19c4e2" strokeOpacity="0.4" />
      <path d="M60 14 L114 36 L60 58 L6 36 Z" fill="url(#cap-top)" stroke="#5fe3f6" strokeOpacity="0.7" strokeWidth="1.5" />
      <path d="M60 36 L96 46 V70" stroke="#19c4e2" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="96" cy="74" r="5" fill="#19c4e2" />
      <circle cx="60" cy="36" r="3.5" fill="#5fe3f6" />
    </svg>
  );
}
