/**
 * ─────────────────────────────────────────────────────────────
 *  ADDMARKPRO INSTITUTE — COURSE CATALOG
 *
 *  These are the courses currently offered, with their confirmed fees.
 *  `fee` is the discounted fee students pay; `originalFee` is the regular
 *  fee shown crossed out. Amounts are in PKR.
 *
 *  To add duration, level or format for a course, set them on its entry, e.g.
 *    duration: "3 months", level: "Beginner", format: "On-campus"
 * ─────────────────────────────────────────────────────────────
 */

export type CategoryId = "it-software" | "digital-marketing" | "social-media" | "youtube" | "design-video";

export type Category = {
  id: CategoryId;
  title: string;
  short: string;
  description: string;
  audience: string;
};

export type Course = {
  id: string;
  title: string;
  category: CategoryId;
  /** One-line summary for cards. */
  short: string;
  /** Full description for the course page. */
  overview: string;
  /** What students will learn. */
  learn: string[];
  /** Who the course is for. */
  audience: string;
  fee: number;
  originalFee: number;
  image: string;
  imageAlt: string;
  duration?: string;
  level?: string;
  format?: string;
  /** "open" = confirmed open for enrollment; otherwise details are shared on request. */
  availability: "open" | "on-request";
  featured?: boolean;
};

export const categories: Category[] = [
  {
    id: "it-software",
    title: "IT & Software Development",
    short: "IT & Development",
    description: "Programming, web development and the core technology skills behind modern software.",
    audience: "Students and career-switchers who want to build websites, applications and software.",
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    short: "Digital Marketing",
    description: "SEO, paid advertising, analytics and strategy for growing brands online.",
    audience: "Aspiring marketers, business owners and freelancers who want to attract customers online.",
  },
  {
    id: "social-media",
    title: "Social Media & Content Creation",
    short: "Social Media",
    description: "Short-form video, content strategy and platform growth across today's leading social platforms.",
    audience: "Aspiring content creators, social media managers and businesses building their online presence.",
  },
  {
    id: "youtube",
    title: "YouTube Automation",
    short: "YouTube",
    description:
      "Plan, produce and grow YouTube channels with efficient, AI-assisted workflows, while respecting originality, copyright and YouTube's policies.",
    audience: "Creators, editors and freelancers who want to build a structured, policy-compliant YouTube workflow.",
  },
  {
    id: "design-video",
    title: "Animation & Video Editing",
    short: "Design & Video",
    description: "Creative video editing and animation skills with industry-standard tools.",
    audience: "Creative learners, aspiring video editors and animators, and content creators.",
  },
];

const list: Omit<Course, "availability">[] = [
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    category: "digital-marketing",
    short: "A complete master course covering SEO, social media, paid ads, content and analytics.",
    overview:
      "Our Digital Marketing Master Course gives you a complete, practical grounding in how brands grow online. You will learn to plan and run campaigns across Google, Meta, TikTok and YouTube, rank websites through SEO, create content that converts and measure results with analytics. The course is built around hands-on projects, so you finish with real campaign experience you can show to employers or clients.",
    learn: [
      "Search Engine Optimization (SEO)",
      "Social Media Marketing (SMM)",
      "Google Ads campaigns",
      "Meta Ads for Facebook and Instagram",
      "TikTok Ads and viral content",
      "YouTube marketing",
      "Content creation and strategy",
      "Website analytics and performance tracking",
      "E-commerce marketing",
      "Campaign planning, execution and scaling",
    ],
    audience:
      "Students, job seekers, freelancers and business owners who want a complete, job-ready skill set in digital marketing.",
    fee: 10500,
    originalFee: 15000,
    image: "/images/course-dm.webp",
    imageAlt: "Desk with marketing books and a strategy note",
    featured: true,
  },
  {
    id: "web-and-software-development",
    title: "Web & Software Development",
    category: "it-software",
    short: "Build modern websites and applications with HTML, CSS, JavaScript and Python.",
    overview:
      "Turn your ideas into working websites and software. This course takes you from the fundamentals of HTML, CSS and JavaScript through to backend development, databases and Python programming. You will build responsive websites, interactive user interfaces and complete full-stack projects from scratch, learning the same workflow professional developers use every day.",
    learn: [
      "Web development with HTML, CSS and JavaScript",
      "Frontend development and responsive interfaces",
      "Backend development, databases, server-side logic and APIs",
      "Python programming",
      "Full-stack projects built from scratch",
      "Software development and design principles",
    ],
    audience:
      "Beginners, students and career-switchers who want to become web or software developers, or build their own projects.",
    fee: 21000,
    originalFee: 30000,
    image: "/images/course-web.webp",
    imageAlt: "Colorful code on a dark editor screen",
    featured: true,
  },
  {
    id: "seo",
    title: "SEO (Search Engine Optimization)",
    category: "digital-marketing",
    short: "Rank higher on Google, grow organic traffic and turn searches into customers.",
    overview:
      "Learn how to improve a website's Google ranking and attract steady, organic traffic. This course covers every part of modern SEO, from keyword research and on-page optimization to link building and technical SEO. You will work with professional SEO tools to audit websites, track progress and build a long-term growth strategy for your own site or your clients'.",
    learn: [
      "Keyword research that brings real traffic",
      "On-page SEO: content, meta tags and site structure",
      "Off-page SEO and quality backlink building",
      "Technical SEO: site speed, mobile-friendliness and fixes",
      "SEO tools and analytics",
      "SEO strategy and long-term growth",
    ],
    audience:
      "Website owners, bloggers, marketers and freelancers who want to grow traffic and offer SEO as a service.",
    fee: 17500,
    originalFee: 25000,
    image: "/images/svc-marketing.webp",
    imageAlt: "Laptop showing a marketing analytics dashboard",
    featured: true,
  },
  {
    id: "google-ads",
    title: "Google Ads",
    category: "digital-marketing",
    short: "Master Search, Display and YouTube ads and turn clicks into customers.",
    overview:
      "Learn to promote businesses, products and services with Google Ads. This course shows you how to plan, launch and manage profitable campaigns across Google Search, the Display Network and YouTube. You will learn to target the right audience, control your budget, measure return on investment and continuously optimize campaigns for better results.",
    learn: [
      "Google Search Ads",
      "Google Display Ads across websites and apps",
      "YouTube video ad campaigns",
      "Campaign setup, management and tracking",
      "Analytics, reporting and ROI measurement",
      "Ad optimization for better performance",
    ],
    audience: "Business owners, marketers and freelancers who want to generate leads and sales through paid search.",
    fee: 21000,
    originalFee: 30000,
    image: "/images/course-ads.webp",
    imageAlt: "Person reviewing ad campaigns on a phone and laptop",
    featured: true,
  },
  {
    id: "meta-ads",
    title: "Meta Ads & Advertising",
    category: "digital-marketing",
    short: "Run smart Facebook and Instagram ad campaigns that deliver real results.",
    overview:
      "Learn to run Facebook and Instagram ads that grow a business, brand or online store. You will work hands-on in Meta Ads Manager to build targeted campaigns, reach the right audience and generate leads and sales. The course also covers reading campaign data so you can optimize spend and scale what works.",
    learn: [
      "Facebook Ads creation and optimization",
      "Instagram Ads for brand growth and sales",
      "Audience targeting for maximum results",
      "Campaign planning and management",
      "Lead generation and sales campaigns",
      "Analytics and optimization",
    ],
    audience: "Business owners, online sellers, marketers and freelancers who want to advertise on Facebook and Instagram.",
    fee: 7000,
    originalFee: 10000,
    image: "/images/svc-ads.webp",
    imageAlt: "Monitor with audience analytics charts",
  },
  {
    id: "youtube-automation",
    title: "YouTube Automation",
    category: "youtube",
    short: "Build and grow YouTube channels with AI tools and efficient workflows.",
    overview:
      "Learn how to set up, run and grow a YouTube channel with a smart, efficient workflow. This course covers channel setup, finding the right niche, scripting and content planning, and using AI tools for voiceovers, video, thumbnails and uploads. You will also learn YouTube SEO, monetization requirements and how to build a complete automation strategy, all while following YouTube's policies on originality and copyright.",
    learn: [
      "YouTube channel setup and optimization",
      "Niche research, script ideas and content creation",
      "AI tools for voiceover, video, thumbnails and uploads",
      "YouTube SEO for more views and growth",
      "Monetization and multiple income streams",
      "A complete automation strategy",
    ],
    audience: "Aspiring YouTubers, content creators and freelancers who want to build a structured YouTube workflow.",
    fee: 17500,
    originalFee: 25000,
    image: "/images/courses/yt-play-icon.webp",
    imageAlt: "Red video play button icon",
    featured: true,
  },
  {
    id: "video-editing",
    title: "Video Editing",
    category: "design-video",
    short: "Turn raw footage into professional videos with Premiere Pro, After Effects and more.",
    overview:
      "Turn raw footage into engaging, professional videos. This course takes you from editing basics to advanced techniques using industry tools including Adobe Premiere Pro, After Effects, DaVinci Resolve, CapCut and Filmora. You will learn cutting, transitions, color grading, audio editing, motion graphics and green-screen effects, and build a portfolio that helps you start freelancing.",
    learn: [
      "Editing basics: tools, interface and workflow",
      "Cutting and trimming for a smooth flow",
      "Transitions and effects",
      "Color grading",
      "Audio editing, music and sound effects",
      "Motion graphics, text and titles",
      "Green screen and VFX",
      "YouTube, Reels, Shorts and TikTok editing",
      "Export settings for every platform",
      "Portfolio building and freelancing guidance",
    ],
    audience: "Beginners, content creators and aspiring editors who want to edit professionally or offer editing services.",
    fee: 10500,
    originalFee: 15000,
    image: "/images/courses/video-editing-studio.webp",
    imageAlt: "Video editing software open on a desktop computer",
    featured: true,
  },
  {
    id: "content-creation-and-reels-production",
    title: "Content Creation & Reels Production",
    category: "social-media",
    short: "Plan, shoot and edit engaging short videos and viral-style reels.",
    overview:
      "Turn your creativity into a professional skill. This course teaches you how to plan, shoot and edit short-form videos that grab attention, from camera angles and lighting to hooks and storytelling. You will learn how Instagram Reels, YouTube Shorts and TikTok work, and how to create platform-specific content that builds your personal brand and audience.",
    learn: [
      "Short-form video planning and creation",
      "Shooting and lighting techniques",
      "Hooks and storytelling that keep viewers watching",
      "Branding and personal brand content",
      "Instagram Reels and YouTube Shorts best practices",
      "Editing and transitions",
      "Platform-specific social media content",
    ],
    audience: "Aspiring creators, influencers, small businesses and social media managers.",
    fee: 7000,
    originalFee: 10000,
    image: "/images/courses/video-creator-setup.webp",
    imageAlt: "Content creator studio with camera and monitors",
  },
  {
    id: "2d-and-3d-animation",
    title: "2D & 3D Animation",
    category: "design-video",
    short: "Learn character design, modeling, rigging and animation.",
    overview:
      "Learn professional 2D and 3D animation and bring your creative ideas to life. This course covers the complete animation pipeline: designing original characters, modeling them in 2D and 3D, rigging skeletons and controls for realistic movement, and animating them into finished scenes. It is a strong foundation for careers in animation, games, advertising and content creation.",
    learn: [
      "Character design from scratch",
      "2D and 3D modeling techniques",
      "Rigging: skeletons and controls for realistic movement",
      "Animation principles and bringing characters to life",
    ],
    audience: "Creative learners, artists and aspiring animators interested in animation, games and visual content.",
    fee: 17500,
    originalFee: 25000,
    image: "/images/courses/design-tablet-drawing.webp",
    imageAlt: "Designer drawing on a graphics tablet",
  },
];

export const courses: Course[] = list.map((c) => ({ availability: "open", ...c }));

export const featuredCourses: Course[] = courses.filter((c) => c.featured);

export const getCategory = (id: CategoryId) => categories.find((c) => c.id === id)!;

export const coursesIn = (id: CategoryId) => courses.filter((c) => c.category === id);

export const formatFee = (n: number) => `Rs ${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

export const discountPercent = (c: Course) => Math.round((1 - c.fee / c.originalFee) * 100);
