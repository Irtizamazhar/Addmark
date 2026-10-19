/**
 * ─────────────────────────────────────────────────────────────
 *  ADDMARKPRO — SITE CONTENT
 *  Every business detail on the website lives in this one file.
 *
 *  Values wrapped in [square brackets] are PLACEHOLDERS.
 *  Replace them with your real details. Leave a social link
 *  or the WhatsApp number as "" to hide it on the site.
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  name: "ADDMARKPRO",
  instituteName: "ADDMARKPRO Institute",
  tagline: "Digital Agency & Training Institute",
  url: "https://www.addmarkpro.com", // [replace with your live domain]

  companyIntro:
    "ADDMARKPRO is a digital solutions company that helps businesses build a strong online presence, from websites and mobile apps to marketing that brings in real customers.",
  instituteIntro:
    "ADDMARKPRO Institute turns the same skills we use on client work into hands-on, career-focused training for students and professionals.",

  contact: {
    address: "Office #12, First Floor, Meer Tariq Arcade, Museum Road, Khanpur Road, Taxila",
    // Set to a separate address if the institute campus is elsewhere, or leave "".
    instituteAddress: "",
    phones: ["+92 371 0908620", "+92 304 5357389"],
    // WhatsApp numbers (digits with country code). Contact-form messages open WhatsApp
    // to the first number; the confirmation screen offers to send to the others too.
    whatsapp: ["923710908620", "923045357389"],
    emails: ["addmarkprocompany@gmail.com"],
    hours: "[Mon – Sat, 9:00 AM – 6:00 PM]",
    // Text used for the embedded Google Map. Leave "" until the real address is added.
    mapQuery: "Meer Tariq Arcade, Museum Road, Khanpur Road, Taxila 47080, Pakistan",
  },

  // Paste profile URLs here, e.g. facebook: "https://www.facebook.com/yourpage".
  social: {
    facebook: "",
    instagram: "",
    tiktok: "",
    linkedin: "",
    youtube: "",
    x: "",
  },
  // These icons always show in the footer and contact panel; they become
  // clickable links as soon as their URL above is filled in.
  socialAlwaysShow: ["facebook", "instagram", "tiktok"] as const,
};

export type Social = keyof typeof site.social;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Institute", href: "/institute" },
  { label: "Courses", href: "/courses" },
  { label: "Team", href: "/team" },
  { label: "Contact Us", href: "/contact" },
];

/* ───────────────────────────── Services ───────────────────────────── */

export type IconName =
  | "code"
  | "smartphone"
  | "megaphone"
  | "search"
  | "click"
  | "target"
  | "share"
  | "magnet";

export type Service = {
  id: string;
  title: string;
  icon: IconName;
  short: string;
  description: string;
  points: string[];
  image: string;
  imageAlt: string;
};

export const services: Service[] = [
  {
    id: "web-development",
    title: "Web Development",
    icon: "code",
    short: "Fast, modern websites built to win trust and convert visitors.",
    description:
      "From company websites to custom web applications, we design and build responsive, search-friendly sites that load fast and are easy for your team to manage.",
    points: ["Business & corporate websites", "Custom web applications", "E-commerce stores", "Speed & SEO-ready builds"],
    image: "/images/svc-web.webp",
    imageAlt: "Laptop showing code on a bright, minimal developer desk",
  },
  {
    id: "mobile-app-development",
    title: "Mobile App Development",
    icon: "smartphone",
    short: "Android and iOS apps with smooth, intuitive experiences.",
    description:
      "We plan, design and develop mobile apps that feel natural to use, from the first wireframe to store-ready release.",
    points: ["Android & iOS apps", "Cross-platform development", "UI/UX design for mobile", "Launch & maintenance support"],
    image: "/images/svc-mobile.webp",
    imageAlt: "Smartphone home screen filled with app icons",
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    icon: "megaphone",
    short: "Strategy-led campaigns that grow your brand online.",
    description:
      "A connected marketing plan across search, social and paid media, built around your goals and measured by real results.",
    points: ["Marketing strategy", "Content planning", "Campaign management", "Performance reporting"],
    image: "/images/svc-marketing.webp",
    imageAlt: "Laptop displaying a marketing analytics dashboard",
  },
  {
    id: "seo",
    title: "Search Engine Optimization",
    icon: "search",
    short: "Be found by customers who are already searching for you.",
    description:
      "Technical, on-page and content SEO that improves your visibility on Google and brings in steady, high-intent traffic.",
    points: ["Technical SEO audits", "On-page optimization", "Keyword & content strategy", "Local SEO"],
    image: "/images/svc-seo.webp",
    imageAlt: "Team sketching website wireframes and a mobile layout on paper",
  },
  {
    id: "google-ads",
    title: "Google Ads",
    icon: "click",
    short: "Search and display campaigns that reach ready-to-buy customers.",
    description:
      "Carefully structured Google Ads campaigns with focused keywords, compelling ads and ongoing optimization to make every click count.",
    points: ["Search & display campaigns", "Keyword research", "Ad copy & extensions", "Conversion tracking"],
    image: "/images/course-ads.webp",
    imageAlt: "Person checking ad performance on a phone and laptop",
  },
  {
    id: "meta-ads",
    title: "Meta Ads",
    icon: "target",
    short: "Facebook & Instagram ads aimed at the right audience.",
    description:
      "Creative, audience-focused campaigns on Facebook and Instagram, designed to build awareness, engagement and sales.",
    points: ["Audience targeting", "Creative ad design", "Retargeting campaigns", "A/B testing"],
    image: "/images/svc-ads.webp",
    imageAlt: "Monitor displaying audience and campaign analytics charts",
  },
  {
    id: "social-media-marketing",
    title: "Social Media Marketing",
    icon: "share",
    short: "Consistent, on-brand content that builds your community.",
    description:
      "We plan, create and manage social content that keeps your brand visible, consistent and engaging across every platform.",
    points: ["Content calendars", "Post & reel creation", "Community management", "Profile optimization"],
    image: "/images/svc-social.webp",
    imageAlt: "3D social media app icons on a dark background",
  },
  {
    id: "lead-generation",
    title: "Lead Generation",
    icon: "magnet",
    short: "A steady pipeline of qualified enquiries for your sales team.",
    description:
      "Landing pages, funnels and campaigns built to capture and qualify leads, so your team spends time on the right conversations.",
    points: ["Landing pages & funnels", "Lead capture forms", "Lead qualification", "CRM-ready handoff"],
    image: "/images/svc-leads.webp",
    imageAlt: "Team meeting in a modern office around a whiteboard presentation",
  },
];

/* ───────────────────────────── Team ─────────────────────────────
 * PLACEHOLDERS — replace names, roles and photos with your real team.
 * To change a photo, replace the file in /public/team (keep the same name)
 * or point `image` to a new file. Portrait images (4:5) look best.
 * `group` decides which section of the Team page a member appears in.
 */

export type TeamMember = {
  name: string;
  role: string;
  group: "company" | "institute";
  image: string;
};

export const team: TeamMember[] = [
  { name: "[Team Member Name]", role: "[Founder / CEO]", group: "company", image: "/team/member-1.webp" },
  { name: "[Team Member Name]", role: "[Web Developer]", group: "company", image: "/team/member-2.webp" },
  { name: "[Team Member Name]", role: "[Digital Marketing Specialist]", group: "company", image: "/team/member-3.webp" },
  { name: "[Team Member Name]", role: "[Graphic Designer]", group: "company", image: "/team/member-4.webp" },
  { name: "[Team Member Name]", role: "[Instructor]", group: "institute", image: "/team/member-5.webp" },
  { name: "[Team Member Name]", role: "[Instructor]", group: "institute", image: "/team/member-6.webp" },
];
