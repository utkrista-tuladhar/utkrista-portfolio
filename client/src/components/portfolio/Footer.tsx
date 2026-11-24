import { portfolioData } from "@/data/portfolio";
import { ArrowUp } from "lucide-react";
import { Magnetic } from "./primitives";

export function Footer() {
  const links = [
    { label: "GitHub", href: portfolioData.socialLinks.github },
    { label: "LinkedIn", href: portfolioData.socialLinks.linkedin },
    { label: "Email", href: `mailto:${portfolioData.socialLinks.email}` },
  ];

  return (
    <footer className="border-t border-border py-10">
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex flex-col gap-1.5">
            <p className="font-mono text-sm tracking-tight">
              utkrista<span className="text-subtle">.dev</span>
            </p>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} {portfolioData.name}. Built with React,
              TypeScript & Tailwind.
            </p>
          </div>

          <div className="flex items-center gap-6">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="link-underline text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}

            <Magnetic strength={8}>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                aria-label="Back to top"
                className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-accent hover:text-accent"
              >
                <ArrowUp size={14} />
              </button>
            </Magnetic>
          </div>
        </div>
      </div>
    </footer>
  );
}
