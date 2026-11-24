export interface Project {
  id: string;
  title: string;
  /** Short domain label shown beside the title, e.g. "Legal Tech". */
  category: string;
  description: string;
  highlights: string[];
  technologies: string[];
  /** Optional — rendered only when set, so unfilled fields stay invisible. */
  year?: string;
  role?: string;
  link?: string;
  repo?: string;
}

export const projectsData: Project[] = [
  {
    id: "hiperbrains",
    title: "Hiperbrains Job Portal",
    category: "Hiring Platform",
    description:
      "A job portal where interviews happen in the product itself. Live video rooms with a shared whiteboard, plus the billing and verification plumbing around them.",
    highlights: [
      "Online video conferencing with collaborative whiteboard",
      "Firebase push notifications",
      "OTP verification via Twilio",
      "PayPal & Stripe payment integration",
    ],
    technologies: ["Angular", "Firebase", "Stripe", "Twilio"],
  },
  {
    id: "case-status",
    title: "Case Status Management",
    category: "Legal Tech",
    description:
      "Case tracking for Indian court proceedings. Lawyers search, follow and get notified on cases instead of refreshing a government portal by hand.",
    highlights: [
      "Case search and tracking",
      "Real-time status notifications",
      "Interface built around high-frequency lookups",
    ],
    technologies: ["Angular", "REST API"],
  },
  {
    id: "ssf",
    title: "Social Security Fund",
    category: "GovTech",
    description:
      "Administration and tracking system for Nepal's Social Security Fund, built to keep financial records auditable and compliant.",
    highlights: [
      "Fund tracking and administration",
      "Accurate, auditable financial records",
      "Government compliance requirements",
    ],
    technologies: ["Angular", "REST API"],
  },
  {
    id: "hr-accounting",
    title: "HR, Accounting & Inventory",
    category: "Business Systems",
    description:
      "One system covering user management, stock and books. Most small businesses run those three in three disconnected tools.",
    highlights: [
      "Role-based user management",
      "Inventory tracking",
      "Core accounting functions",
    ],
    technologies: ["Angular", "Full-Stack"],
  },
];

export interface OpenSourceProject {
  title: string;
  description: string;
  url: string;
  technologies: string[];
}

export const openSourceProjects: OpenSourceProject[] = [
  {
    title: "Movie Review App",
    description: "Browse, rate and review films against a public movie API.",
    url: "https://github.com/utkrista-tuladhar/movie-review-app",
    technologies: ["JavaScript", "REST API"],
  },
  {
    title: "Expense Tracker",
    description: "Personal spending tracker with categorised breakdowns.",
    url: "https://github.com/utkrista-tuladhar/expense-tracker-app",
    technologies: ["JavaScript", "LocalStorage"],
  },
];

export interface PersonalProject {
  title: string;
  description: string;
}

export const personalProjects: PersonalProject[] = [
  {
    title: "Hand Sign Language Recognition",
    description: "Final year project. Recognising hand signs from camera input.",
  },
];
