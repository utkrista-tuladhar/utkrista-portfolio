import { useTheme } from "@/contexts/ThemeContext";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";
import { snappy } from "@/lib/motion";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { Command, Moon, Sun, X } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { NAV_SECTIONS, scrollToSection } from "@/lib/sections";

export function Nav({ onOpenPalette }: { onOpenPalette: () => void }) {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const ids = useMemo(() => NAV_SECTIONS.map((s) => s.id), []);
  const active = useActiveSection(ids);

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });

  // The bar only condenses once you've left the hero, so the top of the page
  // stays uncluttered.
  useMotionValueEvent(scrollY, "change", (value) => setScrolled(value > 80));

  const go = useCallback((id: string) => {
    scrollToSection(id);
    setMenuOpen(false);
  }, []);

  return (
    <>
      {/* Reading progress */}
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-px origin-left bg-gradient-to-r from-accent to-accent-2"
      />

      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
        <motion.nav
          initial={false}
          animate={{
            maxWidth: scrolled ? 760 : 1360,
            paddingLeft: scrolled ? 10 : 16,
            paddingRight: scrolled ? 10 : 16,
          }}
          transition={snappy}
          className={cn(
            "mx-auto flex h-14 items-center justify-between rounded-full transition-[background,box-shadow] duration-500",
            scrolled ? "glass ring-hairline shadow-lg shadow-black/5" : "bg-transparent",
          )}
        >
          {/* Wordmark */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-2.5 rounded-full px-3 py-1.5"
            aria-label="Back to top"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-accent" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="font-mono text-sm font-medium tracking-tight">
              utkrista
              <span className="text-subtle">.dev</span>
            </span>
          </button>

          {/* Desktop links with a shared-layout active pill */}
          <div className="hidden items-center gap-1 md:flex">
            {NAV_SECTIONS.map((section) => {
              const isActive = active === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => go(section.id)}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-sm transition-colors duration-300",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      transition={snappy}
                      className="absolute inset-0 rounded-full bg-elevated ring-hairline"
                    />
                  )}
                  <span className="relative">{section.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-1.5">
            {/* Command palette trigger */}
            <button
              onClick={onOpenPalette}
              aria-label="Open command menu"
              className="hidden items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground sm:flex"
            >
              <Command size={13} />
              <kbd className="font-mono text-[11px]">K</kbd>
            </button>

            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ y: 14, opacity: 0, rotate: -40 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: -14, opacity: 0, rotate: 40 }}
                  transition={snappy}
                  className="absolute"
                >
                  {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
                </motion.span>
              </AnimatePresence>
            </button>

            {/* Mobile trigger */}
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="grid h-9 w-9 place-items-center rounded-full border border-border md:hidden"
            >
              <span className="flex flex-col gap-[3px]">
                <span className="h-px w-3.5 bg-foreground" />
                <span className="h-px w-3.5 bg-foreground" />
              </span>
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[70] md:hidden"
          >
            <div className="glass absolute inset-0" />

            <div className="relative flex h-full flex-col px-6 pt-6">
              <div className="flex justify-end">
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="grid h-10 w-10 place-items-center rounded-full border border-border"
                >
                  <X size={16} />
                </button>
              </div>

              <nav className="mt-10 flex flex-col gap-1">
                {NAV_SECTIONS.map((section, i) => (
                  <motion.button
                    key={section.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * i + 0.08, ...snappy }}
                    onClick={() => go(section.id)}
                    className="flex items-baseline gap-4 border-b border-border py-5 text-left"
                  >
                    <span className="eyebrow text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-3xl font-medium tracking-tight">
                      {section.label}
                    </span>
                  </motion.button>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
