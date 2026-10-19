import type { ReactNode } from "react";
import Reveal from "./Reveal";

type Props = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
};

export default function SectionHeading({ eyebrow, title, description, align = "left", tone = "light", className = "" }: Props) {
  const center = align === "center";
  return (
    <Reveal className={`${center ? "mx-auto max-w-3xl text-center" : "max-w-2xl"} ${className}`}>
      <span className={`eyebrow ${tone === "dark" ? "text-brand-300" : ""}`}>
        <span className="h-px w-8 bg-current opacity-60" />
        {eyebrow}
        {center && <span className="h-px w-8 bg-current opacity-60" />}
      </span>
      <h2
        className={`mt-3 text-h2 font-bold ${tone === "dark" ? "text-white" : ""}`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-lead ${tone === "dark" ? "text-ink-300" : "text-ink-500"}`}>
          {description}
        </p>
      )}
    </Reveal>
  );
}
