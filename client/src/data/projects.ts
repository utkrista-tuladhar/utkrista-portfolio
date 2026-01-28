export interface Project {
  id: string;
  title: string;
  description: string;
  highlights: string[];
  technologies: string[];
  link?: string;
}

export const projectsData: Project[] = [
  {
    id: "hiperbrains",
    title: "Hiperbrains Job Portal",
    description:
      "Comprehensive job portal application with video conferencing, whiteboard sharing, and payment integration.",
    highlights: [
      "Online video conferencing with whiteboard",
      "Firebase push notifications",
      "OTP verification via Twilio",
      "PayPal & Stripe integration",
    ],
    technologies: ["Angular", "Firebase", "Stripe"],
  },
  {
    id: "case-status",
    title: "Case Status Management",
    description:
      "Legal case management system for tracking and monitoring court cases in India with real-time updates.",
    highlights: [
      "Case search and tracking",
      "Real-time notifications",
      "User-friendly interface",
      "Improved case management efficiency",
    ],
    technologies: ["Angular", "REST API"],
  },
  {
    id: "ssf",
    title: "Social Security Fund (SSF)",
    description:
      "Government social security fund tracking and administration system for Nepal.",
    highlights: [
      "Fund tracking and administration",
      "Accurate financial records",
      "Government compliance",
    ],
    technologies: ["Angular", "Government"],
  },
  {
    id: "hr-accounting",
    title: "HR Accounting & Inventory",
    description:
      "Comprehensive business management system integrating user management, inventory, and accounting.",
    highlights: [
      "User management system",
      "Inventory tracking",
      "Basic accounting functions",
      "Enhanced organizational efficiency",
    ],
    technologies: ["Angular", "Full-Stack"],
  },
];

export interface OpenSourceProject {
  title: string;
  url: string;
}

export const openSourceProjects: OpenSourceProject[] = [
  {
    title: "Movie Review App",
    url: "https://github.com/utkrista-tuladhar/movie-review-app",
  },
  {
    title: "Expense Tracker",
    url: "https://github.com/utkrista-tuladhar/expense-tracker-app",
  },
];

export const personalProjects = [
  "Hand Sign Language Recognition (Final Year Project)",
];
