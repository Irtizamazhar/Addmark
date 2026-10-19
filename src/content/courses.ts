/**
 * ─────────────────────────────────────────────────────────────
 *  ADDMARKPRO INSTITUTE — COURSE CATALOG
 *
 *  This list describes the courses the institute CAN offer. It does not
 *  confirm that every course is currently running.
 *
 *  To confirm details for a course, add them in `confirmed` below, e.g.
 *    "web-development": { duration: "3 months", level: "Beginner",
 *                         format: "On-campus", availability: "open" },
 *  Anything left unset is shown as "Available on request" on the site.
 *  Never add prices, schedules or certificates that aren't confirmed.
 * ─────────────────────────────────────────────────────────────
 */

export type CategoryId =
  | "it-software"
  | "ai-automation"
  | "digital-marketing"
  | "social-media"
  | "youtube"
  | "computer"
  | "design-video"
  | "freelancing"
  | "office-business";

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
  short: string;
  image: string;
  imageAlt: string;
  /** Only set when confirmed by the institute. */
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
    description: "Programming, web and app development, databases and the core technology skills behind modern software.",
    audience: "Students and career-switchers who want to build websites, apps and software, or strengthen their technical foundations.",
  },
  {
    id: "ai-automation",
    title: "AI, Generative AI & Automation",
    short: "AI & Automation",
    description: "Practical, responsible use of AI tools, chatbots, agents and automation to work smarter.",
    audience: "Professionals, freelancers, creators and business owners who want to use AI tools effectively and responsibly.",
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    short: "Digital Marketing",
    description: "SEO, paid advertising, analytics, content and strategy for growing brands online.",
    audience: "Aspiring marketers, business owners and freelancers who want to attract customers online.",
  },
  {
    id: "social-media",
    title: "Social Media Marketing",
    short: "Social Media",
    description: "Content, strategy, community and analytics across today's leading social platforms.",
    audience: "Aspiring social media managers, content creators and businesses building their online presence.",
  },
  {
    id: "youtube",
    title: "YouTube Automation & Content Creation",
    short: "YouTube",
    description:
      "Plan, produce and manage YouTube content with efficient workflows, while respecting originality, copyright and YouTube's policies.",
    audience: "Creators, editors and freelancers who want to build a structured, policy-compliant YouTube workflow.",
  },
  {
    id: "computer",
    title: "Computer Short Courses",
    short: "Computer Courses",
    description: "Everyday computer, office software and IT basics for study, work and online opportunities.",
    audience: "Beginners, students and office workers who want confident, practical computer skills.",
  },
  {
    id: "design-video",
    title: "Graphic Design & Video Editing",
    short: "Design & Video",
    description: "Creative design and video editing skills with industry tools and AI-assisted workflows.",
    audience: "Creative learners, aspiring designers and video editors, and content creators.",
  },
  {
    id: "freelancing",
    title: "Freelancing & Online Business",
    short: "Freelancing",
    description: "Find clients, communicate professionally and build an online service or business.",
    audience: "Anyone who wants to offer their skills online or start a digital business.",
  },
  {
    id: "office-business",
    title: "Office, Business & Professional Skills",
    short: "Professional Skills",
    description: "Communication, administration and workplace skills that help you succeed professionally.",
    audience: "Job seekers, office staff and professionals who want to grow in the workplace.",
  },
];

/* ───────────────────────────── Raw course list (title, description) ───────────────────────────── */

type Raw = [title: string, short: string];

const raw: Record<CategoryId, Raw[]> = {
  "it-software": [
    ["Web Development", "Build modern, responsive websites from the ground up."],
    ["Frontend Web Development", "Create the visual, interactive side of websites that users see and use."],
    ["Backend Web Development", "Build the servers, logic and data handling that power web applications."],
    ["Full-Stack Web Development", "Combine frontend and backend skills to build complete web applications."],
    ["HTML and CSS", "Structure and style web pages with the core languages of the web."],
    ["JavaScript Programming", "Add interactivity and logic to websites with the language of the web."],
    ["TypeScript", "Write safer, more maintainable JavaScript with static types."],
    ["React.js", "Build fast, component-based user interfaces with React."],
    ["Next.js", "Create production-ready React websites with routing and server rendering."],
    ["Node.js", "Use JavaScript on the server to build APIs and backend services."],
    ["Python Programming", "Learn a beginner-friendly language used in web, data and automation."],
    ["Java Programming", "Learn object-oriented programming with one of the most widely used languages."],
    ["C and C++ Programming", "Understand programming fundamentals with two foundational languages."],
    ["PHP and Laravel Development", "Build dynamic websites and web applications with PHP and Laravel."],
    ["Database Management and SQL", "Design databases and query data with SQL."],
    ["MySQL Database", "Create, manage and query relational databases with MySQL."],
    ["MongoDB", "Store and work with flexible, document-based data in MongoDB."],
    ["API Development", "Design and build APIs that let applications communicate."],
    ["Git and GitHub", "Track code changes and collaborate using version control."],
    ["Software Development Fundamentals", "Understand how software is planned, built, tested and maintained."],
    ["WordPress Website Development", "Build and customize professional websites with WordPress."],
    ["Shopify Store Development", "Set up and customize online stores on Shopify."],
    ["E-commerce Website Development", "Plan and build websites that sell products online."],
    ["UI/UX Design", "Design user-friendly, attractive interfaces and digital experiences."],
    ["Figma for UI/UX Design", "Design and prototype websites and apps in Figma."],
    ["Software Testing and QA Fundamentals", "Learn how to test software and keep quality high."],
    ["Android App Development", "Build mobile applications for Android devices."],
    ["Mobile Application Development Fundamentals", "Understand how mobile apps are designed, built and published."],
    ["Cloud Computing Fundamentals", "Understand cloud services, hosting and how modern apps run online."],
    ["Cybersecurity Fundamentals", "Learn the basics of protecting systems, data and users online."],
  ],
  "ai-automation": [
    ["Artificial Intelligence Fundamentals", "Understand what AI is, how it works and where it is used."],
    ["Generative AI Fundamentals", "Learn how AI creates text, images, audio and video."],
    ["Prompt Engineering", "Write clear, effective prompts to get better results from AI tools."],
    ["AI Tools for Productivity", "Use AI tools to research, write and organize work more efficiently."],
    ["AI Content Creation", "Create written and visual content with the help of AI tools."],
    ["AI Image Generation", "Generate and refine images with AI image tools, responsibly."],
    ["AI Video Creation", "Produce videos using AI-powered creation and editing tools."],
    ["AI Voiceover and Audio Tools", "Create voiceovers and edit audio with AI-powered tools."],
    ["AI Chatbot Development", "Build chatbots that answer questions and assist users."],
    ["AI Agents Development", "Understand and build AI agents that complete multi-step tasks."],
    ["AI Workflow Automation", "Connect AI tools into automated workflows that save time."],
    ["No-Code Automation", "Automate repetitive tasks without writing code."],
    ["Business Process Automation", "Identify and automate routine business processes."],
    ["AI for Digital Marketing", "Use AI to plan, create and analyze marketing campaigns."],
    ["AI for Social Media Content", "Plan and create social media content faster with AI tools."],
    ["AI for Freelancers", "Use AI tools to deliver client work more efficiently."],
    ["AI-Powered Website Development", "Build websites faster with AI-assisted development tools."],
    ["Introduction to Machine Learning", "Learn the core ideas behind machine learning and how models learn."],
    ["Python for AI Fundamentals", "Use Python to work with data and basic AI concepts."],
    ["AI Automation for Businesses", "Apply AI and automation to everyday business operations."],
  ],
  "digital-marketing": [
    ["Complete Digital Marketing", "A broad, practical course covering the main digital marketing channels."],
    ["Digital Marketing Fundamentals", "Learn the core concepts and channels of digital marketing."],
    ["Search Engine Optimization (SEO)", "Improve website visibility on search engines like Google."],
    ["On-Page SEO", "Optimize website content and structure for better rankings."],
    ["Off-Page SEO", "Build authority through links, mentions and online reputation."],
    ["Technical SEO Fundamentals", "Improve site speed, crawling and indexing for search engines."],
    ["Local SEO and Google Business Profile", "Help local businesses get found in local search and Maps."],
    ["Google Ads", "Plan and manage advertising campaigns on Google."],
    ["Search Advertising", "Reach people actively searching with targeted search ads."],
    ["Display Advertising", "Build awareness with visual ads across websites and apps."],
    ["YouTube Advertising", "Plan and run video ad campaigns on YouTube."],
    ["Meta Ads", "Advertise across Facebook and Instagram with Meta's ad tools."],
    ["Facebook Advertising", "Create and manage targeted advertising campaigns on Facebook."],
    ["Instagram Advertising", "Run visual ad campaigns that reach audiences on Instagram."],
    ["Google Analytics Fundamentals", "Measure website traffic and user behavior with Google Analytics."],
    ["Google Search Console", "Monitor and improve how your site appears in Google Search."],
    ["Keyword Research", "Find the search terms your audience uses."],
    ["Content Marketing", "Attract and engage audiences with valuable content."],
    ["Email Marketing", "Build email lists and send campaigns that people want to read."],
    ["Affiliate Marketing", "Understand how affiliate partnerships and commissions work."],
    ["Lead Generation", "Attract and capture potential customers for a business."],
    ["Conversion Rate Optimization", "Turn more website visitors into customers or leads."],
    ["Marketing Analytics", "Measure campaign performance and make data-informed decisions."],
    ["Digital Marketing Strategy", "Plan marketing that connects business goals to the right channels."],
    ["E-commerce Marketing", "Promote online stores and grow product sales."],
    ["Freelancing in Digital Marketing", "Offer digital marketing services to clients as a freelancer."],
  ],
  "social-media": [
    ["Social Media Marketing Fundamentals", "Learn how brands grow and engage audiences on social media."],
    ["Facebook Page Management", "Set up, manage and grow a professional Facebook page."],
    ["Instagram Marketing", "Grow a brand on Instagram with strong content and strategy."],
    ["Facebook and Instagram Marketing", "Market a brand across Facebook and Instagram together."],
    ["Social Media Account Management", "Manage brand accounts professionally across platforms."],
    ["Social Media Strategy", "Plan social media activity around clear goals and audiences."],
    ["Social Media Content Planning", "Plan consistent, on-brand content in advance."],
    ["Social Media Calendar Creation", "Build content calendars that keep posting organized."],
    ["Content Creation for Social Media", "Create posts, carousels and stories that engage audiences."],
    ["Social Media Graphic Design", "Design eye-catching graphics for social media posts."],
    ["Reels Creation and Editing", "Plan, shoot and edit short vertical videos."],
    ["Short-Form Video Editing", "Edit engaging short videos for Reels, Shorts and TikTok."],
    ["Instagram Reels Marketing", "Use Reels to grow reach and engagement on Instagram."],
    ["Facebook Reels", "Create and publish Reels that perform on Facebook."],
    ["TikTok Marketing", "Build brand presence and engagement on TikTok."],
    ["LinkedIn Marketing", "Grow professional and B2B brands on LinkedIn."],
    ["Personal Branding", "Build a credible, consistent personal brand online."],
    ["Social Media Community Management", "Engage followers, handle comments and build community."],
    ["Social Media Analytics", "Track performance and improve results with social media data."],
    ["Influencer Marketing Fundamentals", "Understand how brands work with creators and influencers."],
    ["Social Media Advertising", "Run paid campaigns across social media platforms."],
    ["Social Media Marketing with AI", "Use AI tools to plan, create and analyze social content."],
    ["Freelancing as a Social Media Manager", "Offer social media management services to clients."],
  ],
  youtube: [
    ["YouTube Automation Fundamentals", "Learn how to run a structured YouTube content workflow with tools and teams."],
    ["YouTube Channel Creation", "Set up a professional YouTube channel the right way."],
    ["YouTube Channel Management", "Manage uploads, playlists and channel settings effectively."],
    ["YouTube Content Strategy", "Plan content around your audience and channel goals."],
    ["YouTube Niche Research", "Research and choose a sustainable channel niche."],
    ["YouTube Keyword Research", "Find topics and search terms viewers look for on YouTube."],
    ["YouTube SEO", "Optimize titles, descriptions and tags for discovery on YouTube."],
    ["YouTube Script Writing", "Write clear, engaging scripts for YouTube videos."],
    ["AI-Powered Script Writing", "Draft and refine scripts with AI, keeping content original."],
    ["YouTube Voiceover Creation", "Record and produce clear, professional voiceovers."],
    ["AI Voiceover Tools", "Create voiceovers with AI tools while following platform policies."],
    ["YouTube Video Editing", "Edit videos with pacing, graphics and sound that keep viewers watching."],
    ["Faceless YouTube Channel Creation", "Produce original content for channels without appearing on camera."],
    ["AI Video Production", "Use AI tools to support research, visuals and editing."],
    ["YouTube Thumbnail Design", "Design clear, clickable thumbnails that represent videos honestly."],
    ["YouTube Channel Branding", "Create a consistent look for banners, logos and intros."],
    ["YouTube Shorts Creation", "Plan and produce vertical Shorts for YouTube."],
    ["YouTube Analytics", "Use YouTube Analytics to understand viewers and improve content."],
    ["YouTube Monetization Fundamentals", "Understand YouTube's monetization requirements and policies. No earnings are guaranteed."],
    ["YouTube Copyright and Content Policies", "Learn copyright, fair use basics and YouTube's community guidelines."],
    ["YouTube Content Planning", "Organize ideas, schedules and production pipelines."],
    ["YouTube Workflow Automation", "Streamline production tasks with tools, templates and checklists."],
    ["YouTube Content Repurposing", "Turn long videos into Shorts, posts and other formats."],
    ["Freelancing for YouTube Creators", "Offer editing, scripting and channel services to creators."],
  ],
  // Design and video tools live in "design-video"; this category keeps core computer and office skills.
  computer: [
    ["Basic Computer Skills", "Use a computer confidently for everyday tasks."],
    ["Computer Fundamentals", "Understand how computers, software and files work."],
    ["MS Office", "Learn Word, Excel and PowerPoint for study and work."],
    ["Microsoft Word", "Create and format professional documents."],
    ["Microsoft Excel", "Organize data, build tables and use essential formulas."],
    ["Microsoft PowerPoint", "Design clear, engaging presentations."],
    ["Microsoft Outlook", "Manage email, calendars and contacts efficiently."],
    ["Advanced Excel", "Work with advanced formulas, pivot tables and data tools."],
    ["Excel Formulas and Functions", "Master the formulas and functions used every day at work."],
    ["Excel Data Analysis", "Analyze, summarize and visualize data in Excel."],
    ["Google Workspace", "Work and collaborate with Google's online productivity tools."],
    ["Google Docs", "Create and collaborate on documents online."],
    ["Google Sheets", "Organize and analyze data in online spreadsheets."],
    ["Google Slides", "Build and present slides online."],
    ["Internet and Email Fundamentals", "Browse safely and communicate effectively by email."],
    ["Windows Operating System Fundamentals", "Navigate and manage files, settings and apps in Windows."],
    ["Computer Hardware Fundamentals", "Understand computer components and basic troubleshooting."],
    ["Computer Networking Fundamentals", "Learn how computers connect and share data across networks."],
    ["Data Entry", "Enter and manage data accurately and efficiently."],
    ["Typing Skills", "Improve typing speed and accuracy."],
    ["Urdu and English Typing", "Type confidently in both Urdu and English."],
    ["Office Administration", "Handle day-to-day office tasks and documentation."],
    ["Computerized Accounting Fundamentals", "Learn the basics of keeping accounts with software."],
    ["QuickBooks Fundamentals", "Manage basic bookkeeping tasks in QuickBooks."],
    ["Online Work and Digital Skills", "Build the digital skills needed for online study and work."],
    ["E-commerce Fundamentals", "Understand how online stores and selling online work."],
  ],
  "design-video": [
    ["Graphic Design Fundamentals", "Learn the principles of layout, color and typography."],
    ["Adobe Photoshop", "Edit photos and create graphics in Photoshop."],
    ["Adobe Illustrator", "Create logos, icons and vector illustrations."],
    ["Canva Graphic Design", "Design professional graphics quickly with Canva."],
    ["Logo Design Fundamentals", "Design simple, memorable logos for brands."],
    ["Brand Identity Design", "Create cohesive visual identities for businesses."],
    ["Video Editing Fundamentals", "Learn cutting, transitions, audio and color basics."],
    ["CapCut Video Editing", "Edit engaging videos quickly with CapCut."],
    ["Adobe Premiere Pro", "Edit professional videos with Premiere Pro."],
    ["Motion Graphics Fundamentals", "Bring designs to life with simple animation."],
    ["AI-Assisted Design", "Speed up design work with AI tools, responsibly."],
    ["AI Video Editing Tools", "Edit videos faster with AI-powered features."],
    ["Creative Content Production", "Plan and produce visual content from idea to delivery."],
    ["Freelancing for Designers and Video Editors", "Offer design and editing services to clients."],
  ],
  freelancing: [
    ["Freelancing Fundamentals", "Understand how freelancing works and how to get started."],
    ["Freelancing Profile Optimization", "Create profiles that clearly present your skills and services."],
    ["Client Communication", "Communicate professionally and manage client expectations."],
    ["Proposal Writing", "Write clear proposals that respond to client needs."],
    ["Personal Branding for Freelancers", "Present yourself professionally online as a freelancer."],
    ["Finding Clients Online", "Find and approach potential clients ethically."],
    ["Upwork Fundamentals", "Learn how Upwork works, following its policies."],
    ["Fiverr Fundamentals", "Learn how Fiverr works and how to offer services there, following its policies."],
    ["Remote Work Skills", "Work productively and communicate well with remote teams."],
    ["Portfolio-Free Freelancing Strategies", "Win early work through samples, trial tasks and clear communication."],
    ["Digital Service Business Fundamentals", "Turn your skills into a structured service business."],
    ["E-commerce Business Fundamentals", "Understand products, suppliers and selling online."],
    ["Shopify Store Management", "Run day-to-day operations of a Shopify store."],
    ["WordPress Business Websites", "Build and manage business websites with WordPress."],
    ["Virtual Assistant Skills", "Support businesses remotely with admin and organization tasks."],
    ["Digital Product Fundamentals", "Understand how to plan and sell digital products."],
    ["Online Business Marketing", "Promote an online business and attract customers."],
  ],
  "office-business": [
    ["Office Management", "Organize office operations, people and resources."],
    ["Administrative Skills", "Handle scheduling, records and office coordination."],
    ["Business Communication", "Communicate clearly in writing, meetings and calls."],
    ["Professional Email Writing", "Write clear, polite and effective professional emails."],
    ["Presentation Skills", "Present ideas confidently and clearly."],
    ["Microsoft Office Productivity", "Use Office tools efficiently in daily work."],
    ["Excel for Business", "Use Excel for reports, budgets and business data."],
    ["Data Analysis Fundamentals", "Understand data and draw useful conclusions from it."],
    ["Customer Support Fundamentals", "Help customers professionally across channels."],
    ["Customer Relationship Management Fundamentals", "Manage customer relationships and data with CRM tools."],
    ["Project Management Fundamentals", "Plan, organize and deliver projects on time."],
    ["Business Documentation", "Prepare reports, letters and business documents."],
    ["Digital Workplace Skills", "Work effectively with modern digital workplace tools."],
    ["Professional CV and Resume Preparation", "Prepare a clear, professional CV."],
    ["Interview Preparation", "Prepare and practise for job interviews."],
    ["Workplace Computer Skills", "Use the computer skills employers expect day to day."],
  ],
};

/* ───────────────────────────── Confirmed details (edit me) ───────────────────────────── */

export const confirmed: Record<string, Partial<Pick<Course, "duration" | "level" | "format" | "availability">>> = {
  // "web-development": { duration: "3 months", level: "Beginner", format: "On-campus", availability: "open" },
};

/** Courses highlighted on the Home and Institute pages. */
const featuredIds = [
  "web-development",
  "generative-ai-fundamentals",
  "complete-digital-marketing",
  "social-media-marketing-fundamentals",
  "youtube-automation-fundamentals",
  "ms-office",
];

/* ───────────────────────────── Images ───────────────────────────── */

const I = (file: string, alt: string) => ({ src: file.startsWith("/") ? file : `/images/courses/${file}.webp`, alt });

const pools = {
  dev: [
    I("/images/course-web.webp", "Colorful code on a dark editor screen"),
    I("dev-laptop-code", "Laptop showing code on a bright desk"),
    I("dev-svg-code", "Close-up of web code on a screen"),
    I("dev-dark-editor", "Code editor open on a laptop in a dark room"),
    I("dev-desk-code", "Developer desk with code on a laptop"),
    I("/images/svc-web.webp", "Minimal developer workspace with code on screen"),
  ],
  python: [I("dev-python-code", "Python code on a dark screen")],
  ux: [
    I("ux-app-screens", "App interface designs displayed on a large monitor"),
    I("ux-desk-wireframes", "Designer desk with wireframes and mobile sketches"),
    I("/images/svc-seo.webp", "Team sketching wireframes for a website and app"),
  ],
  infra: [
    I("tech-server-network", "Network cables connected to server racks"),
    I("tech-global-network", "Earth at night showing connected city lights"),
    I("tech-circuit-board", "Close-up of a computer circuit board"),
  ],
  ai: [
    I("ai-abstract-network", "Abstract illustration of connected AI nodes"),
    I("ai-robot", "Friendly humanoid robot"),
    I("ai-letters", "3D letters spelling AI on a digital grid"),
    I("ai-robot-hand", "Robotic hand on a light background"),
  ],
  marketing: [
    I("/images/svc-marketing.webp", "Laptop showing a marketing analytics dashboard"),
    I("/images/course-dm.webp", "Desk with marketing books and a strategy note"),
    I("/images/svc-ads.webp", "Monitor with audience analytics charts"),
    I("/images/course-ads.webp", "Person reviewing ad campaigns on a phone and laptop"),
    I("marketing-strategy-board", "Hand arranging a marketing plan on a whiteboard"),
  ],
  social: [
    I("/images/course-social.webp", "Colorful 'Social Media' lettering"),
    I("/images/svc-social.webp", "3D social media app icons"),
    I("social-laptop-phone", "Person browsing social media on a laptop and phone"),
    I("/images/svc-mobile.webp", "Smartphone home screen with app icons"),
  ],
  video: [
    I("video-timeline", "Video editing timeline on a monitor"),
    I("video-editing-studio", "Video editing software open on a desktop computer"),
    I("video-creator-setup", "Content creator studio with camera and monitors"),
    I("video-camera-lens", "Close-up of a camera lens with colorful lighting"),
  ],
  youtube: [
    I("yt-play-icon", "Red video play button icon"),
    I("video-creator-setup", "Content creator studio with camera and monitors"),
    I("video-editing-studio", "Video editing software open on a desktop computer"),
    I("video-timeline", "Video editing timeline on a monitor"),
    I("video-camera-lens", "Close-up of a camera lens with colorful lighting"),
  ],
  computer: [
    I("computer-typing", "Hands typing on a laptop keyboard"),
    I("computer-bright-desk", "Laptop on a bright, tidy desk"),
    I("computer-online-class", "Laptop on a table ready for an online class"),
    I("computer-typing-bw", "Person typing on a laptop, in black and white"),
    I("/images/inst-lab.webp", "Students working together at computers"),
  ],
  design: [
    I("design-swatches", "Color swatches and brand design materials"),
    I("design-tablet-drawing", "Designer drawing on a graphics tablet"),
    I("design-creative-apps", "Designer desk with creative app stickers"),
    I("ux-app-screens", "App interface designs displayed on a large monitor"),
  ],
  freelance: [
    I("freelance-remote-overhead", "Freelancer working remotely on a laptop"),
    I("freelance-cafe-laptop", "Laptop and notebook on a cafe table"),
    I("freelance-home-desk", "Bright home office desk with laptop"),
  ],
  office: [
    I("office-laptop-meeting", "Team meeting around a table with laptops"),
    I("office-team-discussion", "Colleagues in a business discussion"),
    I("office-collaboration", "Two colleagues celebrating at work"),
    I("office-teamwork", "Team putting hands together"),
    I("office-professional", "Smiling professional in a business setting"),
  ],
};

type Pool = keyof typeof pools;

const categoryPool: Record<CategoryId, Pool> = {
  "it-software": "dev",
  "ai-automation": "ai",
  "digital-marketing": "marketing",
  "social-media": "social",
  youtube: "youtube",
  computer: "computer",
  "design-video": "design",
  freelancing: "freelance",
  "office-business": "office",
};

// More specific imagery for certain topics, regardless of category.
const keywordPools: [RegExp, Pool][] = [
  [/python/i, "python"],
  [/ui\/ux|figma/i, "ux"],
  [/cloud|network|cyber|hardware/i, "infra"],
  [/youtube|thumbnail/i, "youtube"],
  [/video|reels|capcut|premiere|motion|shorts|tiktok/i, "video"],
  [/photoshop|illustrator|canva|logo|brand identity|graphic|design/i, "design"],
];

/* ───────────────────────────── Build the catalog ───────────────────────────── */

export const slugify = (t: string) =>
  t
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/\+\+/g, "pp")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

// When a course appears in several categories, the earliest category in this order keeps it.
const priority: CategoryId[] = [
  "it-software",
  "ai-automation",
  "digital-marketing",
  "social-media",
  "youtube",
  "design-video",
  "freelancing",
  "office-business",
  "computer",
];

function build(): Course[] {
  const seen = new Set<string>();
  const byCategory = new Map<CategoryId, Course[]>();
  for (const cat of priority) {
    const list: Course[] = [];
    raw[cat].forEach(([title, short]) => {
      const id = slugify(title);
      if (seen.has(id)) return;
      seen.add(id);
      const kw = keywordPools.find(([re]) => re.test(title))?.[1];
      const pool = pools[kw && !(cat === "youtube" && kw === "video") ? kw : categoryPool[cat]];
      const img = pool[list.length % pool.length];
      list.push({
        id,
        title,
        category: cat,
        short,
        image: img.src,
        imageAlt: img.alt,
        availability: "on-request",
        featured: featuredIds.includes(id),
        ...confirmed[id],
      });
    });
    byCategory.set(cat, list);
  }
  // Return in the display order of `categories`.
  return categories.flatMap((c) => byCategory.get(c.id) ?? []);
}

export const courses: Course[] = build();

export const featuredCourses: Course[] = featuredIds
  .map((id) => courses.find((c) => c.id === id))
  .filter((c): c is Course => Boolean(c));

export const getCategory = (id: CategoryId) => categories.find((c) => c.id === id)!;

export const coursesIn = (id: CategoryId) => courses.filter((c) => c.category === id);
