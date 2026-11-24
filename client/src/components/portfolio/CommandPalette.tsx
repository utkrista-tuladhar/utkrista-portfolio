import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useTheme } from "@/contexts/ThemeContext";
import { portfolioData } from "@/data/portfolio";
import {
  Briefcase,
  Download,
  FileText,
  Github,
  Layers,
  Linkedin,
  Mail,
  Moon,
  Send,
  Sun,
  User,
} from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { NAV_SECTIONS, scrollToSection } from "@/lib/sections";

const SECTION_ICONS = {
  about: User,
  work: Briefcase,
  experience: FileText,
  stack: Layers,
  contact: Send,
} as const;

/**
 * Command palette, opened with Cmd/Ctrl-K.
 *
 * Keyboard navigation is the point: everything reachable by mouse on this
 * page is reachable here without leaving the home row.
 */
export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        onOpenChange(!open);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);

  /** Close first, then act — otherwise the dialog's scroll lock fights smooth scrolling. */
  const run = (action: () => void) => {
    onOpenChange(false);
    requestAnimationFrame(() => setTimeout(action, 120));
  };

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Command menu"
      description="Jump to a section, open a link, or change the theme"
    >
      <CommandInput placeholder="Jump to a section, open a link…" />
      <CommandList>
        <CommandEmpty>No results.</CommandEmpty>

        <CommandGroup heading="Navigate">
          {NAV_SECTIONS.map((section) => {
            const Icon = SECTION_ICONS[section.id];
            return (
              <CommandItem
                key={section.id}
                value={section.label}
                onSelect={() => run(() => scrollToSection(section.id))}
              >
                <Icon />
                <span>{section.label}</span>
              </CommandItem>
            );
          })}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Links">
          <CommandItem
            value="GitHub"
            onSelect={() => run(() => window.open(portfolioData.socialLinks.github, "_blank"))}
          >
            <Github />
            <span>GitHub</span>
          </CommandItem>
          <CommandItem
            value="LinkedIn"
            onSelect={() => run(() => window.open(portfolioData.socialLinks.linkedin, "_blank"))}
          >
            <Linkedin />
            <span>LinkedIn</span>
          </CommandItem>
          <CommandItem
            value="Email copy address"
            onSelect={() =>
              run(async () => {
                try {
                  await navigator.clipboard.writeText(portfolioData.socialLinks.email);
                  toast.success("Email copied to clipboard");
                } catch {
                  window.location.href = `mailto:${portfolioData.socialLinks.email}`;
                }
              })
            }
          >
            <Mail />
            <span>Copy email address</span>
          </CommandItem>
          <CommandItem
            value="Resume download CV"
            onSelect={() => run(() => window.open(portfolioData.resume, "_blank"))}
          >
            <Download />
            <span>Download résumé</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Preferences">
          <CommandItem value="Toggle theme dark light" onSelect={() => run(() => toggleTheme?.())}>
            {theme === "dark" ? <Sun /> : <Moon />}
            <span>Switch to {theme === "dark" ? "light" : "dark"} theme</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
