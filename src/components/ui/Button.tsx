import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "dark" | "outline" | "ghost-light" | "white";
type Size = "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold transition-all duration-300 will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-gradient text-white shadow-[0_10px_30px_-10px_rgba(0,179,204,0.7)] hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-12px_rgba(0,179,204,0.85)]",
  dark: "bg-ink-900 text-white hover:-translate-y-0.5 hover:bg-ink-800 shadow-[0_10px_30px_-12px_rgba(10,18,24,0.6)]",
  outline: "border border-ink-200 bg-white text-ink-900 hover:-translate-y-0.5 hover:border-brand-400 hover:text-brand-700",
  "ghost-light":
    "border border-white/20 bg-white/5 text-white backdrop-blur hover:-translate-y-0.5 hover:border-brand-300/60 hover:bg-white/10",
  white: "bg-white text-ink-900 hover:-translate-y-0.5 hover:bg-brand-50 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.4)]",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-[15px]",
};

type Common = { variant?: Variant; size?: Size; arrow?: boolean; children: ReactNode; className?: string };

function Inner({ children, arrow }: { children: ReactNode; arrow?: boolean }) {
  return (
    <>
      {/* sheen sweep on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/25 opacity-0 transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100"
      />
      <span className="relative">{children}</span>
      {arrow && <ArrowRight className="relative size-4 transition-transform duration-300 group-hover:translate-x-1" />}
    </>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  arrow,
  children,
  className = "",
  ...rest
}: Common & Omit<ComponentProps<typeof Link>, "className" | "children">) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...rest}>
      <Inner arrow={arrow}>{children}</Inner>
    </Link>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  arrow,
  children,
  className = "",
  ...rest
}: Common & Omit<ComponentProps<"button">, "className" | "children">) {
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...rest}>
      <Inner arrow={arrow}>{children}</Inner>
    </button>
  );
}
