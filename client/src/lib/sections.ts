/**
 * Section registry.
 *
 * Kept out of the Nav component file on purpose: a module that exports both a
 * component and plain values can't be Fast Refreshed, so every nav tweak would
 * force a full page reload during development.
 */

export const NAV_SECTIONS = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof NAV_SECTIONS)[number]["id"];

export function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}
