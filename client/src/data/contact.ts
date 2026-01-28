export interface ContactInfo {
  type: string;
  label: string;
  value: string;
  href: string;
}

export const contactData: ContactInfo[] = [
  {
    type: "email",
    label: "Email",
    value: "utktul10@gmail.com",
    href: "mailto:utktul10@gmail.com",
  },
  {
    type: "linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/utkrista-tuladhar",
    href: "https://linkedin.com/in/utkrista-tuladhar",
  },
  {
    type: "github",
    label: "GitHub",
    value: "github.com/utkrista-tuladhar",
    href: "https://github.com/utkrista-tuladhar",
  },
  {
    type: "phone",
    label: "Phone",
    value: "+977-9843139157",
    href: "tel:+977-9843139157",
  },
];

export interface QuickFact {
  label: string;
  value: string;
}

export const quickFacts: QuickFact[] = [
  {
    label: "Location",
    value: "Kathmandu, Nepal",
  },
  {
    label: "Experience",
    value: "3+ Years",
  },
  {
    label: "Specialization",
    value: "Angular & Frontend Development",
  },
  {
    label: "Currently",
    value: "Open to Opportunities",
  },
];
