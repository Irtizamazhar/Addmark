"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, LayoutGrid, RotateCcw, Search, SearchX, X } from "lucide-react";
import { categories, courses, type CategoryId } from "@/content/courses";
import CourseCard from "../CourseCard";
import { categoryIcons } from "./categoryIcons";

const PAGE = 12;
const PER_GROUP = 6; // cards per category in the grouped "All" view (3 on mobile)

const normalize = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[^a-z0-9+#.]+/g, " ").trim();

export default function CourseCatalog() {
  const params = useSearchParams();
  // Initial state comes from the URL (?category=…&q=…), read once.
  const [category, setCategory] = useState<CategoryId | "all">(() => {
    const c = params.get("category");
    return c && categories.some((x) => x.id === c) ? (c as CategoryId) : "all";
  });
  const [query, setQuery] = useState(() => params.get("q") ?? "");
  const [limit, setLimit] = useState(PAGE);

  // Follow category links clicked while already on this page (e.g. from the footer).
  const urlCategory = params.get("category");
  useEffect(() => {
    if (urlCategory && categories.some((x) => x.id === urlCategory)) setCategory(urlCategory as CategoryId);
  }, [urlCategory]);

  // Keep the URL shareable without triggering navigation
  useEffect(() => {
    const url = new URL(window.location.href);
    if (category === "all") url.searchParams.delete("category");
    else url.searchParams.set("category", category);
    if (query.trim()) url.searchParams.set("q", query.trim());
    else url.searchParams.delete("q");
    window.history.replaceState(null, "", url.pathname + url.search + url.hash);
    setLimit(PAGE);
  }, [category, query]);

  const counts = useMemo(() => {
    const m = new Map<CategoryId, number>();
    courses.forEach((c) => m.set(c.category, (m.get(c.category) ?? 0) + 1));
    return m;
  }, []);

  const results = useMemo(() => {
    const terms = normalize(query).split(" ").filter(Boolean);
    return courses.filter((c) => {
      if (category !== "all" && c.category !== category) return false;
      if (terms.length === 0) return true;
      const hay = normalize(`${c.title} ${c.short} ${categories.find((k) => k.id === c.category)?.title ?? ""}`);
      return terms.every((t) => hay.includes(t));
    });
  }, [category, query]);

  const filtered = category !== "all" || query.trim() !== "";
  const clear = () => {
    setCategory("all");
    setQuery("");
  };
  const activeCat = categories.find((c) => c.id === category);

  return (
    <section id="catalog" className="section-y scroll-mt-20">
      <div className="container-x">
        {/* ── Controls ── */}
        <div className="rounded-3xl border border-ink-100 bg-white p-4 shadow-[0_20px_50px_-35px_rgba(10,18,24,0.45)] sm:p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <label htmlFor="course-search" className="sr-only">Search courses</label>
            <div className="relative min-w-0 flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-ink-300" />
              <input
                id="course-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search courses, e.g. Excel, React, YouTube SEO"
                className="h-12 w-full rounded-full border border-ink-100 bg-ink-50/60 pl-12 pr-11 text-sm text-ink-900 placeholder:text-ink-300 focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-100 [&::-webkit-search-cancel-button]:hidden"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full text-ink-400 hover:bg-ink-100 hover:text-ink-700"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>

            {/* Mobile / small tablet: compact category select */}
            <div className="md:hidden">
              <label htmlFor="course-category" className="sr-only">Category</label>
              <select
                id="course-category"
                value={category}
                onChange={(e) => setCategory(e.target.value as CategoryId | "all")}
                className="h-12 w-full appearance-none rounded-full border border-ink-100 bg-ink-50/60 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23637886%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:18px] bg-[right_16px_center] bg-no-repeat px-5 pr-11 text-sm font-medium text-ink-800 focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-100"
              >
                <option value="all">All categories ({courses.length})</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.title} ({counts.get(c.id)})</option>
                ))}
              </select>
            </div>

            {filtered && (
              <button
                type="button"
                onClick={clear}
                className="hidden h-12 shrink-0 items-center justify-center gap-2 rounded-full border border-ink-100 px-5 text-sm font-semibold text-ink-700 transition-colors hover:border-brand-300 hover:text-brand-700 md:inline-flex"
              >
                <RotateCcw className="size-4" /> Clear filters
              </button>
            )}
          </div>

          {/* Tablet & desktop: category chips */}
          <div role="group" aria-label="Filter by category" className="mt-4 hidden flex-wrap gap-2 md:flex">
            <Chip active={category === "all"} onClick={() => setCategory("all")} icon={<LayoutGrid className="size-4" />}>
              All <span className="opacity-60">{courses.length}</span>
            </Chip>
            {categories.map((c) => {
              const Icon = categoryIcons[c.id];
              return (
                <Chip key={c.id} active={category === c.id} onClick={() => setCategory(c.id)} icon={<Icon className="size-4" />}>
                  {c.short} <span className="opacity-60">{counts.get(c.id)}</span>
                </Chip>
              );
            })}
          </div>
        </div>

        {/* ── Result summary ── */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p aria-live="polite" className="text-sm text-ink-500">
            {filtered ? (
              <>
                <strong className="text-ink-900">{results.length}</strong> {results.length === 1 ? "course" : "courses"}
                {activeCat && <> in <strong className="text-ink-900">{activeCat.title}</strong></>}
                {query.trim() && <> matching “<strong className="text-ink-900">{query.trim()}</strong>”</>}
              </>
            ) : (
              <>Browse <strong className="text-ink-900">{courses.length}</strong> courses across <strong className="text-ink-900">{categories.length}</strong> categories</>
            )}
          </p>
          {filtered && (
            <button type="button" onClick={clear} className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-600 md:hidden">
              <RotateCcw className="size-4" /> Clear filters
            </button>
          )}
        </div>

        {/* ── Results ── */}
        {results.length === 0 ? (
          <div className="mt-6 flex flex-col items-center rounded-3xl border border-dashed border-ink-200 bg-white px-6 py-14 text-center">
            <span className="grid size-14 place-items-center rounded-2xl bg-ink-50 text-ink-400">
              <SearchX className="size-7" />
            </span>
            <h3 className="mt-5 text-xl font-semibold">No courses found</h3>
            <p className="mt-2 max-w-md text-sm text-ink-500">
              Try a different keyword or category. If you&apos;re looking for something specific, ask us. We may be able to help.
            </p>
            <button type="button" onClick={clear} className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-ink-900 px-5 text-sm font-semibold text-white hover:bg-ink-800">
              <RotateCcw className="size-4" /> Clear filters
            </button>
          </div>
        ) : filtered ? (
          <>
            <Grid>
              {results.slice(0, limit).map((c) => (
                <li key={c.id}><CourseCard course={c} /></li>
              ))}
            </Grid>
            {results.length > limit && (
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={() => setLimit((l) => l + PAGE)}
                  className="inline-flex h-12 items-center gap-2 rounded-full border border-ink-200 bg-white px-6 text-sm font-semibold text-ink-800 transition-colors hover:border-brand-400 hover:text-brand-700"
                >
                  Show more courses <span className="text-ink-400">({results.length - limit} more)</span>
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="mt-6 space-y-14 lg:space-y-16">
            {categories.map((cat) => {
              const list = courses.filter((c) => c.category === cat.id);
              const Icon = categoryIcons[cat.id];
              return (
                <div key={cat.id} id={`cat-${cat.id}`} className="scroll-mt-24">
                  <div className="flex flex-col gap-4 border-b border-ink-100 pb-5 sm:flex-row sm:items-end sm:justify-between">
                    <div className="flex min-w-0 gap-4">
                      <span className="bg-brand-gradient grid size-12 shrink-0 place-items-center rounded-2xl text-white shadow-[0_10px_25px_-10px_rgba(0,179,204,0.7)]">
                        <Icon className="size-6" />
                      </span>
                      <div className="min-w-0">
                        <h2 className="text-h3 font-bold">{cat.title}</h2>
                        <p className="mt-1 max-w-2xl text-sm text-ink-500 sm:text-base">{cat.description}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setCategory(cat.id);
                        document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="group inline-flex shrink-0 items-center gap-1.5 self-start text-sm font-semibold text-brand-700 hover:text-brand-600 sm:self-auto"
                    >
                      View all {list.length} courses
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </div>
                  <Grid>
                    {list.slice(0, PER_GROUP).map((c, i) => (
                      <li key={c.id} className={i >= 3 ? "max-sm:hidden" : ""}>
                        <CourseCard course={c} />
                      </li>
                    ))}
                  </Grid>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{children}</ul>;
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
