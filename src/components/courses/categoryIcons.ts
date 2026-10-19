import { Bot, Briefcase, CirclePlay, CodeXml, Laptop, Megaphone, Monitor, Palette, Share2, type LucideIcon } from "lucide-react";
import type { CategoryId } from "@/content/courses";

export const categoryIcons: Record<CategoryId, LucideIcon> = {
  "it-software": CodeXml,
  "ai-automation": Bot,
  "digital-marketing": Megaphone,
  "social-media": Share2,
  youtube: CirclePlay,
  computer: Monitor,
  "design-video": Palette,
  freelancing: Laptop,
  "office-business": Briefcase,
};
