import { CirclePlay, CodeXml, Megaphone, Palette, Share2, type LucideIcon } from "lucide-react";
import type { CategoryId } from "@/content/courses";

export const categoryIcons: Record<CategoryId, LucideIcon> = {
  "it-software": CodeXml,
  "digital-marketing": Megaphone,
  "social-media": Share2,
  youtube: CirclePlay,
  "design-video": Palette,
};
