import type { LucideIcon } from "lucide-react";

/**
 * A dimensional icon tile: a glossy brand-gradient face over a darker extruded base,
 * with a soft glow underneath. Pops forward when placed inside a TiltCard.
 */
export default function Icon3D({ icon: Icon, size = "md" }: { icon: LucideIcon; size?: "md" | "lg" }) {
  const box = size === "lg" ? "size-16" : "size-14";
  return (
    <span className={`relative inline-block ${box} [transform:translateZ(40px)]`}>
      <span aria-hidden className="absolute inset-x-1 -bottom-3 h-4 rounded-full bg-brand-400/40 blur-lg" />
      <span aria-hidden className="absolute inset-0 translate-x-1 translate-y-1.5 rounded-2xl bg-brand-800" />
      <span className="bg-brand-gradient relative grid h-full w-full place-items-center rounded-2xl text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.5),inset_0_-6px_12px_rgba(1,73,92,0.5)] transition-transform duration-500 group-hover:-translate-y-1">
        <span aria-hidden className="absolute inset-x-2 top-1 h-1/3 rounded-xl bg-gradient-to-b from-white/35 to-transparent" />
        <Icon className={`relative drop-shadow-[0_2px_3px_rgba(1,60,75,0.6)] ${size === "lg" ? "size-7" : "size-6"}`} />
      </span>
    </span>
  );
}
