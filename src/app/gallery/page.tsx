import type { Metadata } from "next";
import { Camera, Clapperboard, Images } from "lucide-react";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/sections/CtaBand";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { site } from "@/content/site";
import { galleryCategories, galleryItems, galleryPhotos, galleryVideos } from "@/content/gallery";

export const metadata: Metadata = {
  title: "Portfolio",
  description: `Photos and videos from ${site.name}: our office and team, ${site.instituteName} classes and labs, and the digital work and video content we create.`,
};

export default function GalleryPage() {
  const collections = galleryCategories.filter((c) => galleryItems.some((p) => p.category === c.id)).length;
  const stats = [
    { icon: Images, label: `${galleryPhotos.length} photos`, show: galleryPhotos.length > 0 },
    { icon: Clapperboard, label: `${galleryVideos.length} videos`, show: galleryVideos.length > 0 },
    { icon: Camera, label: `${collections} collections`, show: collections > 1 },
  ].filter((s) => s.show);

  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title={<>A look inside <span className="text-gradient">{site.name}</span></>}
        description="Our office and team, our classrooms and labs, and the digital work and videos we create, all in one place."
        image="/images/hero-team.webp"
        imageAlt="Team working on laptops around a shared wooden table"
        crumbs={[{ label: "Portfolio" }]}
      >
        <ul className="flex flex-wrap gap-3 text-sm text-ink-200">
          {stats.map(({ icon: Icon, label }) => (
            <li key={label} className="glass-frame inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2">
              <Icon className="size-4 text-brand-300" /> {label}
            </li>
          ))}
        </ul>
      </PageHero>

      <GalleryGrid />

      <CtaBand
        title={<>Want to be in our next photo?</>}
        text="Start a project with our team or join one of our courses. We'd love to work with you."
      />
    </>
  );
}
