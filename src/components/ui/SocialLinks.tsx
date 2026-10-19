import { site, type Social } from "@/content/site";
import { socialIcons, socialLabels } from "./icons";

export const socialEntries = (Object.entries(site.social) as [Social, string][]).filter(([, url]) => url);

/** Renders only the social profiles that have a link set in site.ts (nothing when none are set). */
export default function SocialLinks({ tone = "dark", className = "" }: { tone?: "dark" | "light"; className?: string }) {
  const entries = socialEntries;
  if (entries.length === 0) return null;
  return (
    <ul className={`flex flex-wrap gap-2.5 ${className}`}>
      {entries.map(([key, url]) => {
        const Icon = socialIcons[key];
        return (
          <li key={key}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={socialLabels[key]}
              className={`grid size-10 place-items-center rounded-full border transition-all duration-300 hover:-translate-y-0.5 ${
                tone === "dark"
                  ? "border-white/10 bg-white/5 text-ink-200 hover:border-brand-400 hover:bg-brand-500 hover:text-white"
                  : "border-ink-100 bg-white text-ink-600 hover:border-brand-500 hover:bg-brand-500 hover:text-white"
              }`}
            >
              <Icon className="size-4" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
