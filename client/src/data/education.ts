export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
}

export const educationData: Education[] = [
  {
    id: "mba",
    degree: "MBA",
    institution: "Lincoln International College",
    location: "Kathmandu",
    startDate: "Sep 2024",
    endDate: "Present",
  },
  {
    id: "bsc-csit",
    degree: "BSc. CSIT (Computer Science & IT)",
    institution: "Prime College",
    location: "Kathmandu",
    startDate: "Oct 2017",
    endDate: "Oct 2022",
  },
];
