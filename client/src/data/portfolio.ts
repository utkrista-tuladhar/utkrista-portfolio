export const portfolioData = {
  name: "Utkrista Tuladhar",
  firstName: "Utkrista",
  lastName: "Tuladhar",
  role: "Full-Stack Engineer",
  focus: "Full-stack",
  location: "Kathmandu, Nepal",
  timezone: "Asia/Kathmandu",

  /** Drives the hero headline. Kept short enough to stay on two lines. */
  headline: {
    lead: "I build",
    emphasis: "end-to-end",
    trail: "web applications.",
  },

  tagline:
    "Full-stack engineer working across Angular, TypeScript, Python and Django.",

  bio: "I take features from schema to screen. That means modelling the data, building the APIs that serve it, and the interfaces people actually work in. Currently building healthcare technology at Maitri Services.",

  shortBio:
    "Full-stack engineer who owns features end to end: data model, API, and the interface on top of it.",

  /** Month the first professional role began; hero stats derive from this. */
  careerStart: "2021-12",

  available: true,
  availabilityNote: "Open to opportunities",

  profilePhoto: `${import.meta.env.BASE_URL}assets/profile-photo.jpg`,
  resume: `${import.meta.env.BASE_URL}assets/Utkrista-Tuladhar-Resume.pdf`,

  socialLinks: {
    linkedin: "https://linkedin.com/in/utkrista-tuladhar",
    github: "https://github.com/utkrista-tuladhar",
    email: "utkrista.tul@gmail.com",
  },
};

/** Whole years since `careerStart`, so the hero stat never goes stale. */
export function yearsOfExperience(): number {
  const [year, month] = portfolioData.careerStart.split("-").map(Number);
  const start = new Date(year, month - 1);
  const months =
    (new Date().getFullYear() - start.getFullYear()) * 12 +
    (new Date().getMonth() - start.getMonth());
  return Math.max(1, Math.floor(months / 12));
}
