import { site, type Social } from "@/content/site";
import { socialIcons, socialLabels } from "./icons";

const always = site.socialAlwaysShow as readonly Social[];

/** Profiles with a URL, plus the always-shown ones (Facebook, Instagram, TikTok) even before their URL is added. */
export const socialEntries = (Object.entries(site.social) as [Social, string][]).filter(
  ([key, url]) => url || always.includes(key),
);

export default function SocialLinks({ tone = "dark", className = "" }: { tone?: "dark" | "light"; className?: string }) {
  if (socialEntries.length === 0) return null;
  const base = `grid size-10 place-items-center rounded-full border transition-all duration-300 ${
    tone === "dark" ? "border-white/10 bg-white/5 text-ink-200" : "border-ink-100 bg-white text-ink-600"
  }`;
  const hover = "hover:-translate-y-0.5 hover:border-brand-400 hover:bg-brand-500 hover:text-white";

  return (
    <ul className={`flex flex-wrap gap-2.5 ${className}`}>
      {socialEntries.map(([key, url]) => {
        const Icon = socialIcons[key];
        return (
          <li key={key}>
            {url ? (
              <a href={url} target="_blank" rel="noopener noreferrer" aria-label={socialLabels[key]} className={`${base} ${hover}`}>
                <Icon className="size-4" />
              </a>
            ) : (
              // No URL yet: show the icon without pretending to be a link.
              <span role="img" aria-label={`${socialLabels[key]} (coming soon)`} title={`${socialLabels[key]} (coming soon)`} className={base}>
                <Icon className="size-4" />
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
