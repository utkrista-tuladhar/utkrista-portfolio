export interface SkillGroup {
  id: string;
  title: string;
  /** Short note on how this group shows up in the work. */
  note: string;
  skills: string[];
}

/**
 * Four groups, weighted evenly across the stack — the point of the section is
 * that no single layer is where the work stops.
 */
export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    title: "Frontend",
    note: "Component systems that stay readable as they grow, and stay fast as they fill up.",
    skills: [
      "Angular",
      "React",
      "TypeScript",
      "JavaScript",
      "HTML & CSS",
      "Component Architecture",
      "Server-Side Rendering",
      "Responsive UI",
    ],
  },
  {
    id: "backend",
    title: "Backend & APIs",
    note: "The half behind the screen: endpoints, business rules, and the contracts between them.",
    skills: [
      "Python",
      "Django",
      "REST API Design",
      "Data Ingestion Pipelines",
      "Authentication & OTP Flows",
    ],
  },
  {
    id: "platform",
    title: "Platform & Integrations",
    note: "Third-party systems I've shipped against where failure is visible to users.",
    skills: [
      "Firebase",
      "Stripe",
      "PayPal",
      "Twilio",
      "EHR Systems (Athena)",
      "Browser Extensions",
    ],
  },
  {
    id: "practice",
    title: "Practice & Delivery",
    note: "The unglamorous half that decides whether a codebase survives its second year.",
    skills: [
      "Git & Version Control",
      "Webpack & Module Bundlers",
      "Agile Development",
      "Code Documentation",
      "Mentoring",
    ],
  },
];

/** Flat list for the scrolling strip under the hero. */
export const marqueeSkills: string[] = [
  "Angular",
  "TypeScript",
  "Python",
  "Django",
  "REST APIs",
  "JavaScript",
  "Firebase",
  "SSR",
  "Webpack",
  "Git",
  "Stripe",
  "Agile",
];

export const languages: string[] = [];
