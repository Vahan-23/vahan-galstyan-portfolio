export const siteConfig = {
  name: "Vahan Galstyan",
  email: "vahangalstyan833@gmail.com",
  phone: "+374 43 833830",
  /** Digits only, country code included — for wa.me / tel / viber */
  phoneDigits: "37443833830",
  resumePath: "/Vahan_Galstyan_Resume_EN.pdf",
  url: "https://vahangalstyan.dev", // [TODO: confirm production domain]
  links: {
    github: "https://github.com/Vahan-23",
    linkedin: "https://www.linkedin.com/in/vahan-galstyan-2862b4223/",
    telegram: "https://t.me/v8333333",
    telegramHandle: "@v8333333",
    whatsapp: "https://wa.me/37443833830",
    viber: "viber://chat?number=%2B37443833830",
  },
} as const;

export const navLinkKeys = [
  { href: "/#projects", key: "projects" },
  { href: "/#prices", key: "pricing" },
  { href: "/#about", key: "about" },
  { href: "/#experience", key: "experience" },
  { href: "/#contact", key: "contact" },
] as const;

export const skillGroupKeys = [
  "languages",
  "frontend",
  "backend",
  "tools",
] as const;

export const projectIds = ["armtruck", "opnstage", "mijocarum"] as const;

export const projectMeta = {
  armtruck: {
    displayName: "ARMTRUCK",
    domain: "armtruck.am",
    tech: ["Next.js", "TypeScript"],
    liveUrl: "https://armtruck.am" as string | null,
  },
  opnstage: {
    displayName: "OPNSTAGE",
    domain: "opnstage.ru",
    tech: ["Next.js", "TypeScript"],
    liveUrl: "https://www.opnstage.ru/" as string | null,
  },
  mijocarum: {
    displayName: "MIJOCARUM",
    domain: "mijocarum.am",
    tech: ["React", "JavaScript"],
    liveUrl: "https://mijocarum.am" as string | null,
  },
} as const;

export const experienceIds = [
  "freelance",
  "tinkoff",
  "hadros",
  "inretail",
] as const;

export const processStepIds = ["1", "2", "3", "4", "5", "6"] as const;

export const whyHireIds = [
  "communication",
  "cleanCode",
  "pixel",
  "responsive",
  "seo",
  "scalable",
  "reusable",
  "detail",
  "solver",
] as const;

export const faqIds = [
  "redesign",
  "figma",
  "apis",
  "performance",
  "support",
] as const;

export const serviceGroupMeta = [
  {
    id: "websites",
    items: [
      { id: "landing", price: "$600" },
      { id: "portfolio", price: "$900" },
      { id: "business", price: "$1,400" },
      { id: "corporate", price: "$2,200" },
    ],
  },
  {
    id: "apps",
    items: [
      { id: "dashboard", price: "$2,400" },
      { id: "admin", price: "$2,400" },
      { id: "booking", price: "$3,800" },
      { id: "restaurant", price: "$4,500" },
      { id: "ecommerce", price: "$5,500" },
      { id: "crm", price: "$6,500" },
      { id: "saas", price: "$9,000" },
    ],
  },
  {
    id: "addons",
    items: [
      { id: "api", price: "$800" },
      { id: "optimization", price: "$700" },
    ],
  },
  {
    id: "hourly",
    items: [
      { id: "bugs", price: "$60/hr" },
      { id: "review", price: "$75/hr" },
      { id: "react", price: "$80/hr" },
      { id: "consulting", price: "$95/hr" },
      { id: "nextjs", price: "$95/hr" },
    ],
  },
] as const;

/** Homepage prices — short list, easy to scan */
export const pricingTeaserIds = [
  { groupId: "websites", itemId: "landing" },
  { groupId: "websites", itemId: "business" },
  { groupId: "websites", itemId: "corporate" },
  { groupId: "apps", itemId: "dashboard" },
  { groupId: "apps", itemId: "ecommerce" },
  { groupId: "hourly", itemId: "react" },
] as const;

export const skillItems = {
  languages: ["JavaScript", "TypeScript", "HTML", "CSS", "Python"],
  frontend: [
    "React",
    "Next.js",
    "React Hooks",
    "Responsive Design",
    "Bootstrap",
  ],
  backend: ["Node.js", "REST APIs", "PostgreSQL"],
  tools: ["Git", "GitHub", "JIRA", "Agile", "Scrum", "Unity"],
} as const;
