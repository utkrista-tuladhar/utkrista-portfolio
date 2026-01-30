export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  highlights: string[];
}

export const experienceData: Experience[] = [
  {
    id: "maitri-services",
    title: "Software Engineer",
    company: "Maitri Services Pvt. Ltd.",
    location: "Pulchwok, Lalitpur",
    startDate: "April 2025",
    endDate: "Present",
    description:
      "Building and maintaining full-stack applications using Angular and Python (Django). Contributed to healthcare technology solutions for ECLAT Health, including browser extensions and backend systems, with a strong focus on performance, integration, and data ingestion.",
    highlights: [
      "Developed and maintained full-stack applications using Angular and Python (Django)",
      "Contributed to healthcare products for ECLAT Health, including an EHR-integrated browser extension (Athena)",
      "Implemented backend APIs and data ingestion pipelines, collaborating with cross-functional teams to optimize performance",
    ],
  },
  {
    id: "code-himalaya",
    title: "Angular Developer",
    company: "Code Himalaya Pvt. Ltd.",
    location: "Kupondole, Lalitpur",
    startDate: "Aug 2023",
    endDate: "April 2025",
    description:
      "Building and maintaining web applications using Angular, HTML, CSS, and JavaScript. Designing scalable, reusable components following best practices and design patterns. Implementing efficient routing, data binding, and services with dependency injection.",
    highlights: [
      "Implemented server-side rendering for SEO optimization",
      "Mentored junior developers on best practices",
      "Led frontend team on multiple production applications",
    ],
  },
  {
    id: "ims-software",
    title: "Associate Software Engineer (Angular)",
    company: "IMS Software Pvt. Ltd.",
    location: "Tripureshwor, Kathmandu",
    startDate: "Jun 2022",
    endDate: "Aug 2023",
    description:
      "Analyzed software requirements, addressed bugs, and implemented features. Designed and developed web-based software focusing on POS systems, inventory management, and accounting applications.",
    highlights: [
      "Applied agile development methodologies",
      "Utilized Git for version control and team collaboration",
      "Provided comprehensive codebase documentation",
    ],
  },
  {
    id: "technorio",
    title: "Web Developer Intern",
    company: "Technorio Inc.",
    location: "Shankhamul, Kathmandu",
    startDate: "Dec 2021",
    endDate: "May 2022",
    description:
      "Gained hands-on experience in web development with focus on HTML, CSS, and JavaScript. Developed strong understanding of component-based architecture and interactive UI design.",
    highlights: [],
  },
];
