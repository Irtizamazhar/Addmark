/**
 * ─────────────────────────────────────────────────────────────
 *  ADDMARKPRO — GALLERY
 *  Every photo on the /gallery page comes from this list.
 *
 *  The photos below are STOCK PLACEHOLDERS. To use your own:
 *   1. Put the image in /public/gallery/ (e.g. /public/gallery/office-1.webp).
 *   2. Add an entry with its path, its pixel size (width × height),
 *      a short description for screen readers (`alt`) and a caption.
 *   3. Delete the placeholder entries you no longer want.
 *  Photos appear in the order they are listed (each collection keeps its own order).
 *
 *  VIDEOS (MP4) live in /public/videos/ and are listed in `galleryVideos` below.
 *  Each one needs a still "poster" image (shown in the grid until the video is
 *  played) in /public/videos/posters/, its pixel size and its length in seconds.
 * ─────────────────────────────────────────────────────────────
 */

export const galleryCategories = [
  { id: "office", label: "Office & Team" },
  { id: "institute", label: "Institute" },
  { id: "work", label: "Digital Work" },
  { id: "videos", label: "Videos" },
] as const;

export type GalleryCategory = (typeof galleryCategories)[number]["id"];

type GalleryBase = {
  /** Pixel size of the original file, so the grid can keep its shape while it loads. */
  width: number;
  height: number;
  /** What the photo or video shows, for screen readers. */
  alt: string;
  caption: string;
  category: GalleryCategory;
};

export type GalleryPhoto = GalleryBase & { src: string };

export type GalleryVideo = GalleryBase & {
  /** The .mp4 file */
  src: string;
  /** Still image shown in the grid and before the video starts */
  poster: string;
  /** Length in seconds, shown on the thumbnail */
  duration?: number;
  /** Who or what the video is for, shown on top of the thumbnail, e.g. "Real Estate" or "Restaurant". */
  industry?: string;
};

export type GalleryItem = (GalleryPhoto & { type: "photo" }) | (GalleryVideo & { type: "video" });

export const galleryPhotos: GalleryPhoto[] = [
  /* ── Office & Team ── */
  { category: "office", src: "/images/hero-team.webp", width: 1600, height: 1067, caption: "Working session", alt: "Team working on laptops around a shared wooden table" },
  { category: "office", src: "/images/about-office.webp", width: 1600, height: 1067, caption: "Project planning", alt: "Team planning a project with sticky notes on a glass wall" },
  { category: "office", src: "/images/courses/office-teamwork.webp", width: 800, height: 1200, caption: "One team", alt: "Team members joining hands over a desk" },
  { category: "office", src: "/images/about-meeting.webp", width: 1600, height: 1200, caption: "Open-plan teamwork", alt: "Colleagues collaborating in an open-plan office" },
  { category: "office", src: "/images/courses/office-laptop-meeting.webp", width: 1200, height: 800, caption: "Team meeting", alt: "Team meeting with laptops around a conference table" },
  { category: "office", src: "/images/courses/office-collaboration.webp", width: 1200, height: 800, caption: "Celebrating wins", alt: "Two colleagues high-fiving across a desk" },
  { category: "office", src: "/images/courses/office-team-discussion.webp", width: 1200, height: 787, caption: "Brainstorming", alt: "Team discussing ideas around a long table" },
  { category: "office", src: "/images/contact-office.webp", width: 1600, height: 1068, caption: "Bright workspace", alt: "Modern, bright office interior" },

  /* ── Institute ── */
  { category: "institute", src: "/gallery/institute-building.webp", width: 1360, height: 1020, caption: "Our institute building", alt: "Exterior of the institute building at sunset, with the ADDMARK Courses & Training banner on the first floor shown in a close-up circle" },
  { category: "institute", src: "/gallery/institute-digital-marketing-class.webp", width: 1360, height: 1020, caption: "Digital marketing class", alt: "Instructor teaching a digital marketing lesson at a whiteboard to a full classroom, with SEO, social media and ads topics on the screen" },
  { category: "institute", src: "/gallery/institute-computer-lab.webp", width: 1360, height: 1020, caption: "Computer lab", alt: "Students working on laptops at desks around the institute's computer lab" },
  { category: "institute", src: "/gallery/institute-admissions-desk.webp", width: 1360, height: 1020, caption: "Admissions desk", alt: "Students meeting a counsellor at the admissions desk, with ADDMARK “Admission Open” course posters on the walls" },

  /* ── Digital Work ── */
  { category: "work", src: "/images/courses/ux-app-screens.webp", width: 1200, height: 817, caption: "App UI design", alt: "Desktop monitor showing mobile app screen designs" },
  { category: "work", src: "/images/courses/design-tablet-drawing.webp", width: 960, height: 1200, caption: "Digital illustration", alt: "Designer drawing on a graphics tablet" },
  { category: "work", src: "/images/svc-web.webp", width: 1600, height: 1065, caption: "Web development", alt: "Developer workspace with code on a laptop" },
  { category: "work", src: "/images/course-design.webp", width: 1600, height: 1067, caption: "Wireframing", alt: "Hand sketching website wireframes on paper" },
  { category: "work", src: "/images/courses/marketing-strategy-board.webp", width: 1200, height: 800, caption: "Campaign planning", alt: "Hand pinning notes to a strategy board" },
  { category: "work", src: "/images/svc-marketing.webp", width: 1600, height: 1140, caption: "Marketing analytics", alt: "Laptop showing marketing analytics" },
  { category: "work", src: "/images/courses/design-swatches.webp", width: 960, height: 1200, caption: "Brand colors", alt: "Color swatches spread across a desk" },
  { category: "work", src: "/images/courses/video-creator-setup.webp", width: 1200, height: 801, caption: "Content production", alt: "Video creator desk with monitors, a camera and lighting" },
  { category: "work", src: "/images/svc-mobile.webp", width: 1600, height: 1067, caption: "Mobile apps", alt: "Smartphone screen full of app icons" },
];

export const galleryVideos: GalleryVideo[] = [
  { category: "videos", industry: "Real Estate", src: "/videos/real-estate-site-tour.mp4", poster: "/videos/posters/real-estate-site-tour.webp", width: 720, height: 1280, duration: 28, caption: "Real estate site tour", alt: "Presenter in a hard hat walking through a residential tower construction site" },
  { category: "videos", industry: "Restaurant", src: "/videos/restaurant-food-reel.mp4", poster: "/videos/posters/restaurant-food-reel.webp", width: 720, height: 1280, duration: 18, caption: "Restaurant food reel", alt: "Close-up shots of plated dishes, bowls and coffee being served" },
  { category: "videos", industry: "Bar & Lounge", src: "/videos/cocktail-menu-reel.mp4", poster: "/videos/posters/cocktail-menu-reel.webp", width: 720, height: 1280, duration: 13, caption: "Cocktail menu reel", alt: "Colorful cocktails presented one by one on a dark bar counter" },
  { category: "videos", industry: "Real Estate", src: "/videos/property-showcase.mp4", poster: "/videos/posters/property-showcase.webp", width: 720, height: 1280, duration: 83, caption: "Property showcase", alt: "Presenter in a suit showing a housing project's infrastructure, kitchens and gardens" },
  { category: "videos", industry: "Video Editing", src: "/videos/before-after-edit.mp4", poster: "/videos/posters/before-after-edit.webp", width: 720, height: 1280, duration: 29, caption: "Before & after edit", alt: "Split-screen comparison of raw footage and the finished, edited video" },
  { category: "videos", industry: "Restaurant", src: "/videos/restaurant-ambience-reel.mp4", poster: "/videos/posters/restaurant-ambience-reel.webp", width: 720, height: 1280, duration: 35, caption: "Restaurant ambience reel", alt: "Tour of a restaurant interior with plants, a bar and a lit staircase" },
  { category: "videos", industry: "Real Estate", src: "/videos/real-estate-promo.mp4", poster: "/videos/posters/real-estate-promo.webp", width: 720, height: 1280, duration: 51, caption: "Real estate promo reel", alt: "Presenter on a lawn in front of high-rise towers introducing a residential project" },
  { category: "videos", industry: "Real Estate", src: "/videos/waterfront-lifestyle-reel.mp4", poster: "/videos/posters/waterfront-lifestyle-reel.webp", width: 720, height: 1280, duration: 56, caption: "Waterfront home tour", alt: "Presenters on a beach and a marina showing a waterfront home" },
  { category: "videos", industry: "Branding", src: "/videos/brand-strategy-explainer.mp4", poster: "/videos/posters/brand-strategy-explainer.webp", width: 720, height: 1280, duration: 12, caption: "Brand strategy explainer", alt: "Animated explainer about common branding mistakes and growth" },
];

/** Everything shown on the gallery page, photos and videos together. */
export const galleryItems: GalleryItem[] = [
  ...galleryPhotos.map((p) => ({ ...p, type: "photo" as const })),
  ...galleryVideos.map((v) => ({ ...v, type: "video" as const })),
];
