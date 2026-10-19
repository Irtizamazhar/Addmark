/**
 * ─────────────────────────────────────────────────────────────
 *  ADMARKPRO — SITE CONTENT
 *  Every business detail on the website lives in this one file.
 *
 *  Values wrapped in [square brackets] are PLACEHOLDERS.
 *  Replace them with your real details. Leave a social link
 *  or the WhatsApp number as "" to hide it on the site.
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  name: "ADMARKPRO",
  instituteName: "ADMARKPRO Institute",
  tagline: "Digital Agency & Training Institute",
  url: "https://www.admarkpro.com", // [replace with your live domain]

  companyIntro:
    "ADMARKPRO is a digital solutions company that helps businesses build a strong online presence, from websites and mobile apps to marketing that brings in real customers.",
  instituteIntro:
    "ADMARKPRO Institute turns the same skills we use on client work into hands-on, career-focused training for students and professionals.",

  contact: {
    address: "Office #12, First Floor, Meer Tariq Arcade, Museum Road, Khanpur Road, Taxila, 47080, Pakistan",
    // Set to a separate address if the institute campus is elsewhere, or leave "".
    instituteAddress: "",
    phones: ["+92 371 0908620", "+92 304 5357389"],
    whatsapp: "", // digits with country code, e.g. "923001234567" — shows WhatsApp buttons when set
    emails: ["[info@yourdomain.com]"],
    hours: "[Mon – Sat, 9:00 AM – 6:00 PM]",
    // Text used for the embedded Google Map. Leave "" until the real address is added.
    mapQuery: "Meer Tariq Arcade, Museum Road, Khanpur Road, Taxila 47080, Pakistan",
  },

  social: {
    facebook: "",
    instagram: "",
    linkedin: "",
    youtube: "",
    tiktok: "",
    x: "",
  },
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

/* ───────────────────────────── Courses ─────────────────────────────
 * Course names and descriptions are starter content — replace with your
 * real courses. Durations and fees are intentionally not shown.
 */

export type Course = {
  id: string;
  title: string;
  category: string;
  short: string;
  overview: string;
  topics: string[];
  image: string;
  imageAlt: string;
};

export const courses: Course[] = [
  {
    id: "web-development",
    title: "Web Development",
    category: "Development",
    short: "Learn to build modern, responsive websites and web apps from the ground up.",
    overview:
      "A practical path into web development, starting with the fundamentals and building up to complete, real-world websites.",
    topics: ["HTML, CSS & responsive design", "JavaScript fundamentals", "Modern frameworks", "Building & deploying projects"],
    image: "/images/course-web.webp",
    imageAlt: "Close-up of colorful code on a dark editor screen",
  },
  {
    id: "mobile-app-development",
    title: "Mobile App Development",
    category: "Development",
    short: "Design and develop mobile applications for Android and iOS.",
    overview:
      "Learn how mobile apps are planned, designed and developed, and build your own working apps along the way.",
    topics: ["Mobile UI principles", "App development basics", "Working with APIs", "Publishing apps"],
    image: "/images/course-app.webp",
    imageAlt: "Hand holding a smartphone showing app icons",
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    category: "Marketing",
    short: "Master the core channels businesses use to grow online.",
    overview:
      "A complete introduction to digital marketing: strategy, channels, content and measurement, taught through practical exercises.",
    topics: ["Marketing fundamentals", "Content & email marketing", "Analytics & reporting", "Campaign planning"],
    image: "/images/course-dm.webp",
    imageAlt: "Desk with marketing books and a 'Marketing Strategy' note",
  },
  {
    id: "seo",
    title: "Search Engine Optimization",
    category: "Marketing",
    short: "Learn how to rank websites on Google with proven SEO techniques.",
    overview:
      "Understand how search engines work and learn the technical, on-page and content practices that improve rankings.",
    topics: ["How search engines work", "Keyword research", "On-page & technical SEO", "Link building basics"],
    image: "/images/svc-marketing.webp",
    imageAlt: "Laptop with SEO and traffic analytics charts",
  },
  {
    id: "social-media-marketing",
    title: "Social Media Marketing",
    category: "Marketing",
    short: "Build and grow brands across today's leading social platforms.",
    overview:
      "Learn to plan content, grow audiences and manage brand presence across major social media platforms.",
    topics: ["Platform strategy", "Content creation", "Community growth", "Insights & analytics"],
    image: "/images/course-social.webp",
    imageAlt: "Colorful 'Social Media' lettering on a light background",
  },
  {
    id: "google-meta-ads",
    title: "Google & Meta Ads",
    category: "Advertising",
    short: "Run paid campaigns on Google, Facebook and Instagram with confidence.",
    overview:
      "Hands-on training in planning, launching and optimizing paid campaigns on Google Ads and Meta Ads.",
    topics: ["Campaign structure", "Audience & keyword targeting", "Ad creatives", "Budgeting & optimization"],
    image: "/images/course-ads.webp",
    imageAlt: "Person reviewing ad campaigns on a phone and laptop",
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
