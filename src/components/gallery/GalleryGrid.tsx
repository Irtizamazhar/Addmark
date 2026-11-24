"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Building2,
  ChevronLeft,
  ChevronRight,
  Clapperboard,
  GraduationCap,
  LayoutGrid,
  Martini,
  MonitorSmartphone,
  Play,
  Scissors,
  Sparkles,
  UtensilsCrossed,
  X,
  ZoomIn,
  type LucideIcon,
} from "lucide-react";
import { galleryCategories, galleryItems, type GalleryCategory, type GalleryItem } from "@/content/gallery";

type Filter = "all" | GalleryCategory;

const ease = [0.22, 1, 0.36, 1] as const;
/** Width of the lightbox photo (the stage minus its side padding); the preloads use the same value so they hit the cache. */
const lightboxSizes = "(min-width:1024px) calc(100vw - 12rem), (min-width:640px) calc(100vw - 10rem), calc(100vw - 1rem)";

const categoryIcons: Record<GalleryCategory, LucideIcon> = {
  office: Building2,
  institute: GraduationCap,
  work: MonitorSmartphone,
  videos: Clapperboard,
};
const categoryLabel = Object.fromEntries(galleryCategories.map((c) => [c.id, c.label])) as Record<GalleryCategory, string>;

/** Icons for the industry label on videos (see `industry` in gallery.ts). Any other industry gets the clapperboard. */
const industryIcons: Record<string, LucideIcon> = {
  "Real Estate": Building2,
  Restaurant: UtensilsCrossed,
  "Bar & Lounge": Martini,
  "Video Editing": Scissors,
  Branding: Sparkles,
};
const industryIcon = (industry: string) => industryIcons[industry] ?? Clapperboard;

/** "All" takes one item from each collection in turn, so every column shows a mix. */
function interleave(items: GalleryItem[]) {
  const groups = galleryCategories.map((c) => items.filter((p) => p.category === c.id));
  const longest = Math.max(0, ...groups.map((g) => g.length));
  const out: GalleryItem[] = [];
  for (let i = 0; i < longest; i++) for (const g of groups) if (g[i]) out.push(g[i]);
  return out;
}

/** Written out in full so Tailwind generates them. The index is the column count. */
const columnClass = {
  base: ["", "columns-1", "columns-2"],
  lg: ["", "lg:columns-1", "lg:columns-2", "lg:columns-3"],
  xl: ["", "xl:columns-1", "xl:columns-2", "xl:columns-3", "xl:columns-4"],
} as const;

/**
 * The most columns (up to `max`) that `n` similar-height tiles fill without leaving one empty.
 * CSS columns balance by height, so e.g. 4 tiles in 3 columns land as 2 + 2 + nothing.
 */
function fillableColumns(n: number, max: number) {
  for (let c = Math.min(max, n); c > 1; c--) if (Math.ceil(n / Math.ceil(n / c)) === c) return c;
  return 1;
}

const formatDuration = (s: number) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, "0")}`;
const plural = (n: number, word: string) => `${word}${n === 1 ? "" : "s"}`;

export default function GalleryGrid() {
  const [filter, setFilter] = useState<Filter>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const tiles = useRef<(HTMLButtonElement | null)[]>([]);

  const items = useMemo(
    () => (filter === "all" ? interleave(galleryItems) : galleryItems.filter((p) => p.category === filter)),
    [filter],
  );
  const counts = useMemo(() => {
    const m = new Map<GalleryCategory, number>();
    for (const p of galleryItems) m.set(p.category, (m.get(p.category) ?? 0) + 1);
    return m;
  }, []);
  const nPhotos = items.filter((i) => i.type === "photo").length;
  const nVideos = items.length - nPhotos;
  // Same-shaped tiles (a videos-only view) sit in an even grid; mixed shapes use a masonry of columns.
  const uniform = nPhotos === 0;
  // Up to 2 / 3 / 4 columns (phone / laptop / large screen), but never more than the items can fill.
  const n = items.length;
  const masonryColumns =
    n === 1
      ? "mx-auto max-w-3xl columns-1"
      : `${columnClass.base[fillableColumns(n, 2)]} ${columnClass.lg[fillableColumns(n, 3)]} ${columnClass.xl[fillableColumns(n, 4)]}`;

  const close = () => {
    const i = openIndex;
    setOpenIndex(null);
    // Return focus to the item the viewer ended on, so keyboard users keep their place.
    if (i !== null) tiles.current[i]?.focus();
  };

  return (
    <section className="section-y">
      <div className="container-x">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div role="group" aria-label="Filter the gallery" className="flex flex-wrap gap-2">
            <Chip active={filter === "all"} onClick={() => setFilter("all")} icon={<LayoutGrid className="size-4" />}>
              All <span className="opacity-60">{galleryItems.length}</span>
            </Chip>
            {galleryCategories.map((c) => {
              const n = counts.get(c.id) ?? 0;
              if (!n) return null;
              const Icon = categoryIcons[c.id];
              return (
                <Chip key={c.id} active={filter === c.id} onClick={() => setFilter(c.id)} icon={<Icon className="size-4" />}>
                  {c.label} <span className="opacity-60">{n}</span>
                </Chip>
              );
            })}
          </div>
          <p aria-live="polite" className="text-sm text-ink-500">
            {nPhotos > 0 && (
              <>
                <strong className="text-ink-900">{nPhotos}</strong> {plural(nPhotos, "photo")}
              </>
            )}
            {nPhotos > 0 && nVideos > 0 && <span className="mx-1.5 text-ink-300">·</span>}
            {nVideos > 0 && (
              <>
                <strong className="text-ink-900">{nVideos}</strong> {plural(nVideos, "video")}
              </>
            )}
            {filter !== "all" && filter !== "videos" && <> in <strong className="text-ink-900">{categoryLabel[filter]}</strong></>}
          </p>
        </div>

        {/* Keyed by filter so the tiles animate in again when the collection changes. */}
        <ul
          key={filter}
          className={`mt-8 gap-3 sm:gap-4 lg:mt-10 ${uniform ? "flex flex-wrap justify-center" : masonryColumns}`}
        >
          {items.map((item, i) => (
            <li
              key={item.src}
              className={
                uniform
                  ? // 2 / 3 / 4 / 5 per row (width minus the gaps between them); a short last row is centred, not left with a hole.
                    "w-[calc((100%-0.75rem)/2)] sm:w-[calc((100%-2rem)/3)] md:w-[calc((100%-3rem)/4)] lg:w-[calc((100%-4rem)/5)]"
                  : "mb-3 break-inside-avoid sm:mb-4"
              }
            >
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -40px 0px" }}
                transition={{ duration: 0.7, delay: (i % 4) * 0.06, ease }}
              >
                <Tile
                  item={item}
                  onOpen={() => setOpenIndex(i)}
                  buttonRef={(el) => {
                    tiles.current[i] = el;
                  }}
                />
              </motion.div>
            </li>
          ))}
        </ul>
      </div>

      <Lightbox items={items} index={openIndex} onChange={setOpenIndex} onClose={close} />
    </section>
  );
}

function Tile({ item, onOpen, buttonRef }: { item: GalleryItem; onOpen: () => void; buttonRef: (el: HTMLButtonElement | null) => void }) {
  const video = item.type === "video";
  const industry = item.type === "video" ? item.industry : undefined;
  const IndustryIcon = industry ? industryIcon(industry) : null;
  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={onOpen}
      aria-label={`${video ? `Play ${industry ? `${industry} ` : ""}video` : "View larger"}: ${item.alt}`}
      className="group relative block w-full overflow-hidden rounded-2xl bg-ink-100 shadow-[0_10px_30px_-22px_rgba(10,18,24,0.5)] transition-shadow duration-500 hover:shadow-[0_24px_50px_-24px_rgba(1,97,121,0.55)] sm:rounded-3xl"
    >
      <Image
        src={video ? item.poster : item.src}
        alt=""
        width={item.width}
        height={item.height}
        sizes="(min-width:1280px) 22vw, (min-width:1024px) 30vw, 46vw"
        className="h-auto w-full transition-transform duration-[1.2s] ease-out group-hover:scale-[1.05]"
      />
      <span
        aria-hidden
        className={`absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/15 to-transparent transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 pointer-coarse:opacity-100 ${
          video ? "opacity-60" : "opacity-0"
        }`}
      />
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 translate-y-2 p-3 text-left opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 pointer-coarse:translate-y-0 pointer-coarse:opacity-100 sm:p-4"
      >
        {/* Videos already show their industry at the top, so only photos repeat the collection name here. */}
        {!video && (
          <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-300 sm:text-[11px]">
            {categoryLabel[item.category]}
          </span>
        )}
        <span className="mt-0.5 block font-display text-sm font-semibold text-white sm:text-base">{item.caption}</span>
      </span>

      {video ? (
        <>
          {/* Play button, always visible so videos read as videos at a glance */}
          <span aria-hidden className="absolute inset-0 grid place-items-center">
            <span className="relative grid size-14 place-items-center rounded-full border border-white/30 bg-ink-950/40 text-white shadow-[0_10px_30px_-8px_rgba(0,0,0,0.6)] backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:border-transparent group-hover:bg-brand-500 sm:size-16">
              <span className="absolute inset-0 animate-ping rounded-full bg-white/10 [animation-duration:2.4s]" />
              <Play className="relative ml-0.5 size-6 fill-current sm:size-7" />
            </span>
          </span>
          {/* What the video is for (Real Estate, Restaurant, ...) and how long it runs */}
          <span aria-hidden className="absolute inset-x-2 top-2 flex items-start justify-between gap-1.5 sm:inset-x-3 sm:top-3">
            {industry && IndustryIcon ? (
              <span className="inline-flex min-w-0 items-center gap-1 rounded-full bg-brand-400 px-2 py-1 text-[10px] font-bold text-ink-950 shadow-[0_6px_16px_-6px_rgba(25,196,226,0.8)] sm:gap-1.5 sm:px-2.5 sm:text-[11px]">
                <IndustryIcon className="size-3 shrink-0 sm:size-3.5" />
                <span className="truncate">{industry}</span>
              </span>
            ) : (
              <span />
            )}
            {item.duration !== undefined && (
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-ink-950/60 px-2 py-1 text-[10px] font-semibold tabular-nums text-white backdrop-blur-md sm:px-2.5 sm:text-[11px]">
                <Play className="hidden size-3 fill-current sm:block" />
                {formatDuration(item.duration)}
              </span>
            )}
          </span>
        </>
      ) : (
        <span
          aria-hidden
          className="absolute right-3 top-3 grid size-9 scale-75 place-items-center rounded-full border border-white/20 bg-ink-950/50 text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100"
        >
          <ZoomIn className="size-4" />
        </span>
      )}
    </button>
  );
}

function Chip({ active, onClick, icon, children }: { active: boolean; onClick: () => void; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-all ${
        active
          ? "border-transparent bg-ink-900 text-white shadow-[0_8px_20px_-10px_rgba(10,18,24,0.6)]"
          : "border-ink-100 bg-white text-ink-600 hover:border-brand-300 hover:text-brand-700"
      }`}
    >
      <span className={active ? "text-brand-300" : "text-brand-500"}>{icon}</span>
      {children}
    </button>
  );
}

/* ───────────────────────────── Lightbox ───────────────────────────── */

const slide = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 60 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir * -60 }),
};

function Lightbox({
  items,
  index,
  onChange,
  onClose,
}: {
  items: GalleryItem[];
  index: number | null;
  onChange: (i: number) => void;
  onClose: () => void;
}) {
  const [dir, setDir] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const item = index === null ? undefined : items[index];
  const open = item !== undefined;
  const many = items.length > 1;
  const IndustryIcon = item?.type === "video" && item.industry ? industryIcon(item.industry) : null;

  const go = (step: number) => {
    if (index === null || !many) return;
    setDir(step);
    onChange((index + step + items.length) % items.length);
  };

  // The key handler is registered once per opening; this ref always points at the latest callbacks.
  const latest = useRef({ go, onClose });
  useEffect(() => {
    latest.current = { go, onClose };
  });

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      // Arrow keys on a focused video seek it, so leave those to the player.
      const onVideo = e.target instanceof HTMLVideoElement;
      if (e.key === "Escape") latest.current.onClose();
      else if (e.key === "ArrowRight" && !onVideo) latest.current.go(1);
      else if (e.key === "ArrowLeft" && !onVideo) latest.current.go(-1);
      else if (e.key === "Tab") {
        // Keep focus inside the dialog.
        const focusables = [...(dialogRef.current?.querySelectorAll<HTMLElement>("button, video") ?? [])].filter((el) => el.offsetParent !== null);
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Load the neighbouring photos at the same size, so stepping through is instant. Videos load only when opened.
  const neighbours =
    open && many && index !== null
      ? [items[(index + 1) % items.length], items[(index - 1 + items.length) % items.length]].filter((n) => n.type === "photo")
      : [];

  return (
    <AnimatePresence>
      {open && index !== null && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${item.type === "video" ? "Video" : "Photo"} ${index + 1} of ${items.length}: ${item.caption}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[80] flex flex-col bg-ink-950/95 backdrop-blur-xl"
        >
          <div aria-hidden className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-brand-500/15 blur-3xl" />

          {/* Top bar */}
          <div className="relative flex items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4">
            <p className="text-sm font-medium tabular-nums text-ink-300">
              <span className="text-white">{index + 1}</span> / {items.length}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close gallery"
              className="grid size-11 place-items-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/15"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Photo or video */}
          <div className="relative min-h-0 flex-1 overflow-hidden">
            {/* Sits behind the media and stays visible only until it has loaded over it. */}
            <div aria-hidden className="absolute inset-0 grid place-items-center">
              <span className="size-9 animate-spin rounded-full border-2 border-white/15 border-t-brand-400" />
            </div>
            <AnimatePresence initial={false} custom={dir}>
              <motion.div
                key={item.src}
                custom={dir}
                variants={slide}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease }}
                // Swiping a video would fight its scrub bar, so only photos can be swiped.
                drag={many && item.type === "photo" ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.5}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -70) go(1);
                  else if (info.offset.x > 70) go(-1);
                }}
                className="absolute inset-0 px-2 sm:px-20 lg:px-24"
              >
                {item.type === "video" ? (
                  <LightboxVideo item={item} />
                ) : (
                  <div className="relative size-full">
                    <Image src={item.src} alt={item.alt} fill sizes={lightboxSizes} draggable={false} className="select-none object-contain" />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {many && (
              <>
                <NavButton side="left" onClick={() => go(-1)} />
                <NavButton side="right" onClick={() => go(1)} />
              </>
            )}

            <div aria-hidden className="pointer-events-none absolute size-px overflow-hidden opacity-0">
              {neighbours.map((n) => (
                <div key={n.src} className="relative size-px">
                  <Image src={n.src} alt="" fill sizes={lightboxSizes} loading="eager" />
                </div>
              ))}
            </div>
          </div>

          {/* Caption */}
          <div className="relative px-4 pb-6 pt-4 text-center sm:pb-8">
            {item.type === "video" && item.industry && IndustryIcon ? (
              <p className="inline-flex items-center gap-1.5 rounded-full bg-brand-400 px-3 py-1 text-xs font-bold text-ink-950">
                <IndustryIcon className="size-3.5" />
                {item.industry} video
              </p>
            ) : (
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-300">{categoryLabel[item.category]}</p>
            )}
            <p className="mt-1 font-display text-lg font-semibold text-white sm:text-xl">{item.caption}</p>
            {many && item.type === "photo" && <p className="mt-2 text-xs text-ink-400 pointer-fine:hidden">Swipe to see more</p>}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * The player is sized to the video itself (not the whole stage), so its controls line up with the picture.
 * It starts playing straight away; if the browser blocks sound it starts muted and the viewer can unmute.
 */
function LightboxVideo({ item }: { item: Extract<GalleryItem, { type: "video" }> }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.play().catch(() => {
      v.muted = true;
      v.play().catch(() => {});
    });
  }, []);
  const ratio = item.width / item.height;
  return (
    <div className="grid size-full place-items-center [container-type:size]">
      <video
        ref={ref}
        src={item.src}
        poster={item.poster}
        aria-label={item.alt}
        controls
        playsInline
        preload="metadata"
        style={{ aspectRatio: `${item.width} / ${item.height}`, width: `min(100cqw, calc(${ratio} * 100cqh))` }}
        className="h-auto rounded-2xl bg-black object-contain shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
      />
    </div>
  );
}

function NavButton({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "left" ? "Previous" : "Next"}
      className={`absolute top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-ink-900/60 text-white backdrop-blur-md transition-colors hover:bg-brand-500 hover:text-ink-950 sm:size-12 ${
        side === "left" ? "left-3 sm:left-5" : "right-3 sm:right-5"
      }`}
    >
      <Icon className="size-5 sm:size-6" />
    </button>
  );
}
