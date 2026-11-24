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
    value: "utkrista.tul@gmail.com",
    href: "mailto:utkrista.tul@gmail.com",
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

/**
 * Rendered as the three tiles in the About bento grid.
 * Location and years live in the hero, so they aren't repeated here.
 */
export const quickFacts: QuickFact[] = [
  {
    label: "Focus",
    value: "End-to-end delivery: data model, API, interface",
  },
  {
    label: "Currently",
    value: "Healthcare tech at Maitri Services",
  },
  {
    label: "Also does",
    value: "Mentoring, and leading teams",
  },
];
