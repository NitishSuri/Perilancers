/**
 * All site copy lives here. Edit text, links, and lists in this file;
 * components read from it, so you rarely need to touch them.
 *
 * Search for "YOUR-" to find every placeholder that still needs a real value.
 */
import {
  Bot,
  BookOpenText,
  BrainCircuit,
  CalendarCheck,
  ChartLine,
  ClipboardList,
  Cloud,
  CodeXml,
  Eye,
  FileText,
  Hammer,
  Layers,
  Megaphone,
  MessagesSquare,
  Palette,
  PhoneCall,
  RefreshCw,
  Rocket,
  Sparkles,
  TrendingUp,
  Workflow,
  type LucideIcon,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                                Feature flags                               */
/* -------------------------------------------------------------------------- */

/** Flip to `true` once `testimonials` below contains real client reviews. */
export const SHOW_TESTIMONIALS = false;

/* -------------------------------------------------------------------------- */
/*                                 Site basics                                */
/* -------------------------------------------------------------------------- */

// WhatsApp is hidden for now. To bring it back: set the number here, uncomment `whatsappUrl` below,
// and uncomment the WhatsApp blocks in components/Contact.tsx and components/Footer.tsx.
// const whatsappNumber = "YOUR-WHATSAPP-NUMBER-WITH-COUNTRY-CODE"; // digits only, e.g. 15551234567

export const site = {
  name: "Perilancers",
  /** Canonical URL, no trailing slash. */
  url: "https://perilancers.com",
  tagline: "One small team for your entire digital product.",
  description:
    "Perilancers is a two-person tech studio that plans, designs, builds, scales, and markets digital products, and builds AI agents and automations that do real work for startups and growing businesses worldwide.",
  /** Official inbox: shown on the site and used for all enquiries. */
  email: "work@perilancers.com",
  // whatsappUrl: `https://wa.me/${whatsappNumber}`,
  linkedinUrl: "https://www.linkedin.com/company/YOUR-COMPANY-PAGE",
  /** Paste verification codes from Google Search Console / Bing Webmaster Tools. */
  verification: {
    google: "",
    bing: "",
  },
  keywords: [
    "AI agent development",
    "agentic AI studio",
    "AI automation agency",
    "AI chatbot development",
    "workflow automation",
    "freelance web development",
    "Next.js development studio",
    "UI/UX design",
    "cloud and DevOps consulting",
    "product management for startups",
    "MVP development",
    "SEO and digital marketing",
  ],
};

export const nav: { label: string; href: string; highlight?: boolean }[] = [
  { label: "Services", href: "/#services" },
  { label: "AI & Automation", href: "/#ai" },
  { label: "Why Us", href: "/#why" },
  { label: "Process", href: "/#process" },
  { label: "What We Build", href: "/#build" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
];

export const ctaHref = "/#contact";

/* -------------------------------------------------------------------------- */
/*                                    Hero                                    */
/* -------------------------------------------------------------------------- */

export const hero = {
  badge: "Now building AI agents & automations",
  /** Headline is split so the highlighted word can be styled. */
  headlineBefore: "One small team for your",
  headlineHighlight: "entire",
  headlineAfter: "digital product.",
  subheadline:
    "We plan it, design it, build it, scale it, and market it. Then we put AI agents to work so your business runs faster with less busywork.",
  primaryCta: "Get a Quote",
  secondaryCta: "Explore AI Agents",
  trustLine: "Product • Design • Cloud • AI • Marketing, all under one roof",
};

/** Lines shown in the animated agent console in the hero. */
export const agentConsole = {
  title: "perilancers-agent",
  task: 'run("Launch our new landing page")',
  steps: [
    { kind: "think", text: "Planning: copy, design, build, deploy, promote" },
    { kind: "tool", text: "figma.create_wireframes(3)" },
    { kind: "done", text: "Wireframes ready for review" },
    { kind: "tool", text: "nextjs.build(pages=5)" },
    { kind: "done", text: "Deployed to production" },
    { kind: "tool", text: "seo.audit() + analytics.connect()" },
    { kind: "human", text: "Waiting for your approval to launch ads" },
  ] as { kind: "think" | "tool" | "done" | "human"; text: string }[],
  footer: "Human in the loop: always",
};

/* -------------------------------------------------------------------------- */
/*                                  Services                                  */
/* -------------------------------------------------------------------------- */

export type Service = {
  slug: string;
  title: string;
  description: string;
  deliverables: string[];
  icon: LucideIcon;
  /** Used on the dedicated /services/[slug] page */
  seoTitle: string;
  seoDescription: string;
  intro: string[];
  forWho: string[];
  outcomes: string[];
  faqs: { question: string; answer: string }[];
};

export const servicesSection = {
  eyebrow: "Services",
  title: "Everything your product needs, from",
  highlight: "one team",
  description:
    "Pick one service or combine several. Either way, you work directly with the two people doing the work.",
};

export const services: Service[] = [
  {
    slug: "ai-agents-automation",
    title: "AI Agents & Automation",
    description:
      "AI agents that take action, not just chat. They use your tools, follow your rules, and finish multi-step tasks while your team focuses on real work.",
    deliverables: [
      "Custom AI agents connected to your tools",
      "Support & sales chatbots (web, WhatsApp)",
      "Workflow automation across your apps",
      "Knowledge assistants, data pipelines & dashboards",
    ],
    icon: Bot,
    seoTitle: "AI Agent Development & Workflow Automation",
    seoDescription:
      "We build custom AI agents, chatbots, and automations that use your tools and complete real tasks, with a human in the loop. Startups and SMBs worldwide.",
    intro: [
      "An AI agent is software powered by a large language model (LLM) that can plan and carry out multi-step tasks. Unlike a basic chatbot, it can use tools like your CRM, inbox, spreadsheets, or database, check its own work, and hand off to a person when needed.",
      "We design agents around one clear job, connect them safely to the systems you already use, test them against real examples, and keep a human in the loop wherever it matters.",
    ],
    forWho: [
      "Teams drowning in repetitive admin, data entry, or copy-paste work",
      "Support teams answering the same questions every day",
      "Sales teams that need faster lead research and follow-up",
      "Founders who want an AI feature inside their product",
    ],
    outcomes: [
      "Repetitive work handed to an agent you can monitor",
      "Faster replies to customers, around the clock",
      "Clean, connected data flowing between your apps",
      "A clear log of what your agents did and why",
    ],
    faqs: [
      {
        question: "What's the difference between an AI chatbot and an AI agent?",
        answer:
          "A chatbot answers questions. An agent can also act: it plans steps, calls tools (send an email, update a CRM record, query a database), and checks results. Many projects combine both.",
      },
      {
        question: "Which AI models do you use?",
        answer:
          "We're model-agnostic. We pick from OpenAI, Anthropic Claude, Google Gemini, or open-source models based on quality, cost, speed, and your data requirements.",
      },
      {
        question: "How do you keep AI agents safe and accurate?",
        answer:
          "We limit each agent to the tools and data it needs, add approval steps for sensitive actions, test against real examples before launch, and log every action so you can review it.",
      },
    ],
  },
  {
    slug: "web-development",
    title: "Web Development",
    description:
      "Fast, SEO-friendly websites and web apps built with Next.js and React, designed to convert and easy to grow.",
    deliverables: [
      "Marketing websites & landing pages",
      "Custom web apps & dashboards",
      "CMS & third-party integrations",
      "Performance & Core Web Vitals tuning",
    ],
    icon: CodeXml,
    seoTitle: "Next.js & React Web Development",
    seoDescription:
      "Fast, SEO-friendly websites, landing pages, and web apps built with Next.js, React, and Tailwind CSS. Designed to convert and built to scale.",
    intro: [
      "Your website is often the first thing a customer sees. We build sites and web apps that load fast, rank well, and make it obvious what to do next.",
      "We work with Next.js, React, TypeScript, and Tailwind CSS, a modern stack that's easy to maintain and easy to hire for later.",
    ],
    forWho: [
      "Startups launching a product or raising a round",
      "Businesses whose current site is slow or hard to update",
      "Teams that need a custom web app or internal dashboard",
    ],
    outcomes: [
      "A site built to score well on Core Web Vitals",
      "Clear calls to action that turn visitors into leads",
      "Clean code you fully own",
    ],
    faqs: [
      {
        question: "Can you redesign our existing website?",
        answer:
          "Yes. We can redesign and rebuild it, migrate your content, and set up redirects so you keep your existing search rankings.",
      },
      {
        question: "Will I be able to edit the content myself?",
        answer:
          "Yes. We can connect a headless CMS or keep content in simple files, depending on how often you update it.",
      },
    ],
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX & Graphic Design",
    description: "Interfaces people enjoy using and brands people remember, from first wireframe to final pixel.",
    deliverables: [
      "Web & mobile app UI design",
      "Wireframes & clickable prototypes",
      "Logos & brand identity",
      "Social & marketing graphics",
    ],
    icon: Palette,
    seoTitle: "UI/UX Design, Branding & Graphic Design",
    seoDescription:
      "Product UI/UX design, wireframes, prototypes, logos, and brand identity for startups and growing businesses. Designed in Figma, built to ship.",
    intro: [
      "Good design makes products easier to use and easier to trust. We start with your users and goals, then move from wireframes to polished, on-brand screens.",
      "Because we also build what we design, every screen is realistic to develop and ready for handoff.",
    ],
    forWho: [
      "Founders who need an MVP designed fast",
      "Products with confusing flows or low conversion",
      "Businesses that need a fresh, consistent brand",
    ],
    outcomes: [
      "Clickable prototypes you can test with real users",
      "A reusable design system in Figma",
      "A brand kit with logo, colors, and type",
    ],
    faqs: [
      {
        question: "Do you deliver source files?",
        answer: "Yes. You get the full Figma files and exported assets, and you own them.",
      },
      {
        question: "Can you design for mobile apps?",
        answer: "Yes. We design responsive web apps and native-style mobile app interfaces for iOS and Android.",
      },
    ],
  },
  {
    slug: "cloud-devops",
    title: "Cloud & DevOps",
    description: "Reliable, secure infrastructure on AWS, GCP, or Azure that scales with you, without a surprise bill.",
    deliverables: [
      "Cloud architecture & migrations",
      "CI/CD pipelines",
      "Docker & Kubernetes setup",
      "Cost optimization & scalability reviews",
    ],
    icon: Cloud,
    seoTitle: "Cloud Architecture, Migration & DevOps",
    seoDescription:
      "Cloud architecture, migrations, CI/CD, Docker, Kubernetes, and infrastructure as code on AWS, Google Cloud, and Azure. Scalable and cost-aware.",
    intro: [
      "When your product grows, your infrastructure has to keep up. We design cloud setups that are secure, automated, and sized for where you are today and where you're headed.",
      "Everything is written as infrastructure as code, so it's repeatable, reviewable, and easy to hand over.",
    ],
    forWho: [
      "Startups outgrowing a single server",
      "Teams with slow or manual deployments",
      "Companies worried about rising cloud bills",
    ],
    outcomes: [
      "Automated deployments with CI/CD",
      "Monitoring, backups, and alerts in place",
      "A clear view of cloud costs and where to save",
    ],
    faqs: [
      {
        question: "Which cloud providers do you work with?",
        answer: "AWS, Google Cloud, and Microsoft Azure, plus platforms like Vercel for frontends.",
      },
      {
        question: "Can you migrate us without downtime?",
        answer:
          "We plan migrations to minimize downtime, usually with a staged rollout and a tested rollback plan. We'll be clear about any risks up front.",
      },
    ],
  },
  {
    slug: "product-management",
    title: "Product & Program Management",
    description: "Clear plans, honest timelines, and steady delivery, so your launch actually happens.",
    deliverables: [
      "MVP scoping & planning",
      "Product roadmaps",
      "Agile sprint management",
      "Launch planning & support",
    ],
    icon: ClipboardList,
    seoTitle: "Product & Program Management for Startups",
    seoDescription:
      "MVP scoping, product roadmaps, agile sprint management, and launch planning. Turn your idea into a focused plan and a shipped product.",
    intro: [
      "Many products struggle from building the wrong thing, or building the right thing too slowly. We help you decide what to build first and keep delivery on track.",
      "You get a clear roadmap, regular check-ins, and honest updates when something changes.",
    ],
    forWho: [
      "Non-technical founders turning an idea into an MVP",
      "Teams with lots of ideas and no clear priorities",
      "Projects that keep slipping past their deadlines",
    ],
    outcomes: [
      "A scoped MVP with clear priorities",
      "A roadmap your whole team understands",
      "Predictable sprints and visible progress",
    ],
    faqs: [
      {
        question: "Can you manage developers we already have?",
        answer: "Yes. We can run sprints and planning for your existing team, or combine that with our own build work.",
      },
      {
        question: "What tools do you use?",
        answer: "Whatever fits your team: Jira, Linear, Notion, Trello, or GitHub Projects.",
      },
    ],
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    description: "Get found by the right people, in search and in AI answers, and turn attention into leads and sales.",
    deliverables: [
      "SEO & AI search (AEO) optimization",
      "Social media strategy & management",
      "Content strategy & copywriting",
      "Paid campaigns (Google & Meta Ads)",
    ],
    icon: Megaphone,
    seoTitle: "SEO, AEO, Social Media & Performance Marketing",
    seoDescription:
      "SEO, answer engine optimization (AEO) for AI search, content, social media, and Google & Meta Ads campaigns that turn attention into leads.",
    intro: [
      "A great product still needs to be found. We help you show up on Google, in AI answers from tools like ChatGPT and Perplexity, and on the social platforms your customers use.",
      "We track what matters, leads and sales, not vanity metrics, and adjust based on real data.",
    ],
    forWho: [
      "New products that need their first customers",
      "Businesses with low search visibility",
      "Teams running ads without clear results",
    ],
    outcomes: [
      "Technical SEO and structured data done right",
      "A content plan built around what buyers search and ask",
      "Campaigns with clear tracking and reporting",
    ],
    faqs: [
      {
        question: "What is AEO (answer engine optimization)?",
        answer:
          "AEO means structuring your content so AI assistants and answer engines like ChatGPT, Perplexity, and Google's AI Overviews can understand it and cite it. It builds on good SEO with clear answers, structured data, and trustworthy content.",
      },
      {
        question: "How long does SEO take to show results?",
        answer:
          "SEO is a long-term channel. Technical fixes can help quickly, but meaningful growth in rankings usually takes a few months of consistent work.",
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*                                 AI & Agents                                */
/* -------------------------------------------------------------------------- */

export const aiSection = {
  eyebrow: "AI & Automation",
  title: "AI agents that take care of",
  highlight: "the busywork",
  description:
    "We build AI agents and automations that plug into the tools you already use. They handle repetitive, multi-step work like qualifying leads, answering common questions, and preparing reports, and they check with you before anything important goes out.",
  tiles: {
    agents: {
      title: "Custom AI agents",
      text: "Agents built around one clear job and connected to your CRM, inbox, docs, or database. They do the work and check with you before anything important goes out.",
    },
    chat: {
      title: "Chat & WhatsApp assistants",
      text: "Answer customer questions from your own content, around the clock.",
    },
    workflow: {
      title: "Workflow automation",
      text: "Connect your apps so data moves without copy-paste.",
    },
    product: {
      title: "AI inside your product",
      text: "Smart search, summaries, or a copilot added to your web app.",
    },
    trust: {
      title: "Built responsibly",
    },
  },
  trust: ["Human approval on key actions", "Your data kept private", "OpenAI, Claude, Gemini, or open-source"],
  cta: "Discuss an automation",
  learnMore: "How we build AI agents",
  /** Used on the AI service page and in llms.txt */
  definitionQuestion: "What is an AI agent?",
  definitionAnswer:
    "An AI agent is software powered by a large language model (LLM) that can plan and carry out multi-step tasks on its own. Unlike a basic chatbot, it can use tools such as your CRM, inbox, database, or calendar, check its own work, and hand off to a person when needed.",
  flowTitle: "How an agent handles a task",
};

/** Example automation shown next to the AI section copy. */
export const automationExample = {
  name: "Lead follow-up",
  steps: [
    { label: "New enquiry received", tool: "Website form", status: "done" },
    { label: "Lead researched and scored", tool: "AI agent", status: "done" },
    { label: "CRM record updated", tool: "CRM", status: "done" },
    { label: "Personal reply drafted", tool: "Email", status: "done" },
    { label: "Waiting for your approval", tool: "You", status: "pending" },
  ] as { label: string; tool: string; status: "done" | "pending" }[],
  footer: "Every action is logged so you can review it.",
};

export const aiCapabilities: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "Custom AI agents",
    description: "Agents that plan, use your tools, and complete real tasks, from lead research to weekly reports.",
    icon: Bot,
  },
  {
    title: "Support & sales assistants",
    description: "Chat and WhatsApp assistants trained on your content that answer, qualify, and escalate.",
    icon: MessagesSquare,
  },
  {
    title: "Workflow automation",
    description: "Connect your apps and let AI handle the repetitive steps in between, with n8n, Zapier, or custom code.",
    icon: Workflow,
  },
  {
    title: "Knowledge assistants (RAG)",
    description: "Ask questions across your docs, wikis, and data, and get answers with sources.",
    icon: BookOpenText,
  },
  {
    title: "AI features in your product",
    description: "Add smart search, summaries, recommendations, or a copilot to your app.",
    icon: Sparkles,
  },
  {
    title: "Data & AI insights",
    description: "Pipelines and dashboards that turn raw data into clear, AI-assisted insights.",
    icon: ChartLine,
  },
];

/** Steps shown in the animated agent workflow diagram. */
export const agentFlow = [
  { label: "Trigger", detail: "A new lead arrives" },
  { label: "Agent plans", detail: "Reads, reasons, decides" },
  { label: "Uses tools", detail: "CRM, email, docs" },
  { label: "You approve", detail: "Human in the loop" },
  { label: "Done", detail: "Logged & reported" },
];

/* -------------------------------------------------------------------------- */
/*                               Why Perilancers                              */
/* -------------------------------------------------------------------------- */

export const whySection = {
  eyebrow: "Why Perilancers",
  title: "Small team.",
  highlight: "Full coverage.",
  description:
    "Agencies hand you off. Solo freelancers cover one skill. We sit in the middle: a tight team that covers the whole product, AI included.",
};

export const benefits: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "One team, end to end",
    description:
      "Strategy, design, development, cloud, AI, and marketing under one roof. No hand-offs between vendors, no lost context.",
    icon: Layers,
  },
  {
    title: "AI-first thinking",
    description:
      "On every project we look for where AI can save time or open new possibilities, and we'll tell you when it can't.",
    icon: BrainCircuit,
  },
  {
    title: "Direct access to the makers",
    description: "You talk to the people doing the work. No account managers, no game of telephone.",
    icon: MessagesSquare,
  },
  {
    title: "Transparent communication",
    description: "Regular progress updates, shared boards, and straight answers, even when something changes.",
    icon: Eye,
  },
  {
    title: "Built to scale",
    description: "Clean code, solid architecture, and infrastructure as code, so growth doesn't mean a rewrite.",
    icon: TrendingUp,
  },
  {
    title: "On-time delivery",
    description:
      "We agree on milestones up front and flag risks early, so deadlines are realistic and nothing slips silently.",
    icon: CalendarCheck,
  },
];

/* -------------------------------------------------------------------------- */
/*                                How we work                                 */
/* -------------------------------------------------------------------------- */

export const processSection = {
  eyebrow: "How We Work",
  title: "A simple process,",
  highlight: "no surprises",
  description: "Five clear steps from first call to launch, and we stay around after.",
};

export const processSteps: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "Discovery Call",
    description: "A free call to understand your goals, audience, timeline, and budget.",
    icon: PhoneCall,
  },
  {
    title: "Proposal & Plan",
    description: "A written scope, milestones, timeline, and price in USD before any work starts.",
    icon: FileText,
  },
  {
    title: "Design & Build",
    description: "We design and build in short sprints and share progress you can click through.",
    icon: Hammer,
  },
  {
    title: "Review & Revisions",
    description: "You review each milestone. We refine until it matches what we agreed.",
    icon: RefreshCw,
  },
  {
    title: "Launch & Support",
    description: "We ship to production, hand over everything, and support you after launch.",
    icon: Rocket,
  },
];

/* -------------------------------------------------------------------------- */
/*                             What we can build                              */
/* -------------------------------------------------------------------------- */

export type ProjectVisual = "dashboard" | "chat" | "agent" | "cloud" | "docs" | "brand";

export const buildSection = {
  eyebrow: "Example projects",
  title: "What we can build",
  highlight: "for you",
  description: "A few examples of the kind of projects we take on. Every engagement is tailored to your goals.",
  disclaimer: "These are example project types to show what's possible, not past client work.",
};

export const projectIdeas: {
  title: string;
  description: string;
  includes: string[];
  services: string[];
  visual: ProjectVisual;
}[] = [
  {
    title: "AI customer-support agent",
    description:
      "An assistant trained on your docs that resolves common questions, takes actions like order lookups, and hands off to a human when needed.",
    includes: ["Knowledge base ingestion", "Website & WhatsApp integration", "Conversation analytics"],
    services: ["AI Agents", "Web Dev"],
    visual: "chat",
  },
  {
    title: "Agentic lead-qualification workflow",
    description:
      "An agent that researches every new lead, scores it, drafts a personal reply, and updates your CRM for your approval.",
    includes: ["CRM & inbox integration", "Approval step before sending", "Daily summary report"],
    services: ["AI Agents", "Automation"],
    visual: "agent",
  },
  {
    title: "SaaS landing page + analytics dashboard",
    description:
      "A high-converting marketing site paired with an in-app dashboard your customers actually understand.",
    includes: ["Conversion-focused landing page", "Interactive charts & reports", "Auth, billing & analytics setup"],
    services: ["Design", "Web Dev", "Data"],
    visual: "dashboard",
  },
  {
    title: "Internal knowledge assistant",
    description:
      "Ask questions across your policies, docs, and wikis in plain English, and get answers with links to the source.",
    includes: ["Secure document ingestion", "Answers with citations", "Slack or web interface"],
    services: ["AI", "Data"],
    visual: "docs",
  },
  {
    title: "Cloud migration for a growing startup",
    description: "Move from a single fragile server to a scalable, automated, cost-aware cloud setup.",
    includes: ["Architecture plan & runbook", "Containers, CI/CD & IaC", "Monitoring, backups & cost controls"],
    services: ["Cloud", "DevOps"],
    visual: "cloud",
  },
  {
    title: "Brand + social media launch kit",
    description: "Everything you need to launch with a consistent, professional look and a plan to grow.",
    includes: ["Logo, colors & typography", "Social templates & launch content", "30-day content & ads plan"],
    services: ["Branding", "Marketing"],
    visual: "brand",
  },
];

/* -------------------------------------------------------------------------- */
/*                                 Tech stack                                 */
/* -------------------------------------------------------------------------- */

export const stackSection = {
  eyebrow: "Tech Stack",
  title: "Tools we",
  highlight: "know well",
  description: "Modern, widely used technologies, so your product is easy to maintain and hand over.",
};

export const techStack: { group: string; items: string[] }[] = [
  {
    group: "AI & Agents",
    items: [
      "OpenAI",
      "Anthropic Claude",
      "Google Gemini",
      "Open-source LLMs",
      "LangChain",
      "LangGraph",
      "Vercel AI SDK",
      "Model Context Protocol",
      "pgvector",
      "n8n",
    ],
  },
  { group: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"] },
  { group: "Backend & Data", items: ["Node.js", "Python", "FastAPI", "PostgreSQL", "REST & GraphQL APIs"] },
  {
    group: "Cloud & DevOps",
    items: ["AWS", "Google Cloud", "Azure", "Docker", "Kubernetes", "Terraform", "GitHub Actions", "Vercel"],
  },
  {
    group: "Design & Marketing",
    items: ["Figma", "Adobe Creative Suite", "Google Analytics", "Search Console", "Google Ads", "Meta Ads"],
  },
];

/* -------------------------------------------------------------------------- */
/*                                    Team                                    */
/* -------------------------------------------------------------------------- */

export type TeamMember = {
  name: string;
  role: string;
  initials: string;
  bio: string;
  skills: string[];
  linkedinUrl: string;
  /** Optional photo in /public, e.g. "/team/khushi.jpg". Falls back to initials. */
  photo?: string;
};

export const teamSection = {
  eyebrow: "Team",
  title: "The two people",
  highlight: "behind the work",
  description: "Two complementary skill sets, one shared standard: build things that work and grow.",
};

export const team: TeamMember[] = [
  {
    name: "Khushi Tiwari",
    role: "Product, Cloud & AI",
    initials: "KT",
    bio: "Khushi keeps projects focused and shipping, from product strategy and roadmaps to agile delivery. On the technical side, Khushi designs scalable cloud architecture on AWS, GCP, and Azure, sets up CI/CD and Kubernetes, and builds the backends, data pipelines, and AI agents that keep products running.",
    skills: [
      "Product Strategy",
      "Roadmapping",
      "Agile Delivery",
      "AWS / GCP / Azure",
      "CI/CD",
      "Docker & Kubernetes",
      "Infrastructure as Code",
      "Data Pipelines",
      "AI Agents & Automation",
    ],
    linkedinUrl: "https://www.linkedin.com/in/YOUR-KHUSHI-PROFILE",
  },
  {
    name: "Nitish Suri",
    role: "Marketing & Frontend",
    initials: "NS",
    bio: "Nitish makes products look great and get found. Nitish designs clean interfaces and brand visuals, then builds them as fast, responsive frontends with React, Next.js, and Tailwind CSS. After launch, Nitish drives growth with SEO, AI search optimization, content, social media, and performance campaigns.",
    skills: [
      "Marketing Strategy",
      "SEO & AEO",
      "Social Media",
      "Copywriting",
      "Paid Ads",
      "Branding",
      "React & Next.js",
      "Tailwind CSS",
      "UI/UX Design",
    ],
    linkedinUrl: "https://www.linkedin.com/in/YOUR-NITISH-PROFILE",
  },
];

/* -------------------------------------------------------------------------- */
/*                                   Pricing                                  */
/* -------------------------------------------------------------------------- */

export const pricingSection = {
  eyebrow: "Pricing",
  title: "Flexible ways",
  highlight: "to work together",
  description: "Choose the engagement model that fits your project and budget.",
  note: "Every project is different. Pricing is shared on request in USD after a quick discovery call.",
  cta: "Request Pricing",
};

export const engagements: { title: string; bestFor: string; description: string; features: string[] }[] = [
  {
    title: "Fixed-Scope Project",
    bestFor: "MVPs, websites, AI agents, and clearly defined builds",
    description: "A clear scope, timeline, and price agreed up front. Ideal when you know what you need.",
    features: [
      "Written scope & deliverables",
      "Milestone-based payments in USD",
      "Review point at every milestone",
      "Handover docs & post-launch support",
    ],
  },
  {
    title: "Monthly Retainer",
    bestFor: "Ongoing development, AI operations, DevOps, or marketing",
    description: "Reserved monthly capacity from our team for continuous improvements and growth.",
    features: [
      "Dedicated hours each month",
      "Priority response",
      "Agent monitoring & improvements",
      "Monthly progress report",
    ],
  },
  {
    title: "Hourly Consulting",
    bestFor: "AI strategy, audits, architecture reviews, and expert advice",
    description: "Focused sessions when you need a second opinion or a specific problem solved.",
    features: [
      "AI readiness & automation audits",
      "Cloud & architecture reviews",
      "SEO & marketing audits",
      "No long-term commitment",
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*                                     FAQ                                    */
/* -------------------------------------------------------------------------- */

export const faqSection = {
  eyebrow: "FAQ",
  title: "Questions,",
  highlight: "answered",
  description: "Can't find what you're looking for? Just email us at work@perilancers.com.",
};

/** Written answer-first so search engines and AI assistants can quote them directly. */
export const faqs: { question: string; answer: string }[] = [
  {
    question: "What does Perilancers do?",
    answer:
      "Perilancers is a two-person tech studio that handles the full lifecycle of a digital product: product strategy, UI/UX design, web development, cloud and DevOps, AI agents and automation, and digital marketing. We work with startups, small and medium businesses, and international clients.",
  },
  {
    question: "What is an AI agent, and does my business need one?",
    answer:
      "An AI agent is LLM-powered software that can plan and complete multi-step tasks using your tools, like updating a CRM or answering support tickets. If your team spends hours on repetitive, rules-based work, an agent can likely help. On a discovery call, we'll tell you honestly whether it's worth it.",
  },
  {
    question: "Is our data safe when you build AI tools?",
    answer:
      "We give agents access only to the data and tools they need, add approval steps for sensitive actions, and configure AI providers so your data isn't used for model training where the provider supports it. We're happy to work within your security and compliance requirements.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "It depends on scope. As a rough guide, a landing page often takes 1–3 weeks, a focused AI agent or automation 2–6 weeks, and an MVP web app 6–12 weeks. After the discovery call, we give you a written timeline with clear milestones.",
  },
  {
    question: "How much does a project cost?",
    answer:
      "Every project is different, so we share pricing in USD after a short discovery call. Cost depends on scope, complexity, integrations, and timeline. You can choose a fixed-scope project, a monthly retainer, or hourly consulting.",
  },
  {
    question: "How many revisions are included?",
    answer:
      "Each proposal lists the revision rounds included, usually two rounds per design milestone. If you need more, we estimate the extra work transparently before doing it.",
  },
  {
    question: "What are your payment terms?",
    answer:
      "We price and invoice in USD. Fixed-scope projects are milestone-based: a deposit to start, then payments tied to agreed milestones. Retainers are billed monthly in advance, and consulting is billed by the hour.",
  },
  {
    question: "Can you work across time zones?",
    answer:
      "Yes. We work with clients in the US, UK, and elsewhere. We schedule calls in overlapping hours and share written updates asynchronously, so progress continues while you sleep.",
  },
  {
    question: "What do you need from us to get started?",
    answer:
      "Your goals, any existing brand assets or content, access to relevant accounts (hosting, domains, analytics), and one point of contact who can give timely feedback.",
  },
  {
    question: "Do you offer support after launch?",
    answer:
      "Yes. Every project includes a post-launch support window for bug fixes, defined in your proposal. For ongoing improvements, agent monitoring, or marketing, we offer monthly retainers.",
  },
  {
    question: "Will you sign an NDA?",
    answer: "Absolutely. We're happy to sign your NDA (or provide ours) before you share any confidential details.",
  },
  {
    question: "Who owns the code and designs?",
    answer:
      "You do. Once the final payment is made, full ownership of the code, designs, and deliverables transfers to you. Open-source libraries we use remain under their own licenses.",
  },
];

/* -------------------------------------------------------------------------- */
/*                                Testimonials                                */
/* -------------------------------------------------------------------------- */

export const testimonialsSection = {
  eyebrow: "Testimonials",
  title: "What clients",
  highlight: "say",
  description: "Real feedback from people we've worked with.",
};

/** Add real reviews only, then set SHOW_TESTIMONIALS = true above. */
export const testimonials: { quote: string; name: string; role: string; company: string }[] = [
  // {
  //   quote: "Perilancers took our idea from a napkin sketch to a live product.",
  //   name: "Jane Doe",
  //   role: "Founder",
  //   company: "Example Inc.",
  // },
];

/* -------------------------------------------------------------------------- */
/*                                   Contact                                  */
/* -------------------------------------------------------------------------- */

export const contactSection = {
  eyebrow: "Contact",
  title: "Let's build something",
  highlight: "great together",
  description: "Tell us a little about your project. We aim to reply within one business day.",
  /** Email-first contact panel (used while the contact form is turned off). */
  emailTitle: "Email us about your project",
  emailText:
    "Click below to open a ready-to-fill email, or copy our address. A few details up front help us reply with useful next steps.",
  emailButton: "Write an email",
  copyButton: "Copy address",
  emailSubject: "Project enquiry from the Perilancers website",
  emailBody: [
    "Hi Perilancers team,",
    "",
    "Name:",
    "Company (optional):",
    "Service needed (AI agents, web development, design, cloud, product, or marketing):",
    "Budget range (USD):",
    "Timeline:",
    "",
    "About the project:",
    "",
    "",
    "Thanks!",
  ].join("\n"),
  includeTitle: "Helpful to include",
  include: [
    "Your name and company",
    "The service you need",
    "Budget range in USD",
    "Timeline or launch date",
    "Links to anything we should see",
  ],
  nextStepsTitle: "What happens next",
  nextSteps: [
    "We read your message and reply by email.",
    "We book a free discovery call at a time that suits you.",
    "You receive a clear proposal with scope, timeline, and pricing in USD.",
  ],
  successMessage: "Thanks, your message is on its way! We'll get back to you within one business day.",
  errorMessage: "Something went wrong while sending your message. Please try again, or email us directly.",
};

export const serviceOptions = [...services.map((s) => s.title), "Not sure yet"];

export const budgetOptions = ["<$1k", "$1k–$5k", "$5k–$15k", "$15k+", "Not sure"];

/* -------------------------------------------------------------------------- */
/*                                   Footer                                   */
/* -------------------------------------------------------------------------- */

export const footer = {
  tagline:
    "A two-person studio that plans, designs, builds, scales, and markets digital products, with AI agents built in.",
};

export const privacyLastUpdated = "October 31, 2026";
