import { openSourceProjects, personalProjects, projectsData } from "@/data/projects";
import { snappy, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Github, Plus } from "lucide-react";
import { useState } from "react";
import { Pill, Reveal, RevealItem, SectionHeading, Spotlight } from "./primitives";

/**
 * Work: an expanding list, not a grid of cards.
 *
 * Only one project is open at a time, so the page never becomes a wall of
 * bullet points. `AnimatePresence` + height animation does the open/close;
 * the row number and title stay put so the eye keeps its anchor.
 */
function ProjectRow({
  project,
  index,
  isOpen,
  onToggle,
}: {
  project: (typeof projectsData)[number];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ delay: index * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group border-b border-border"
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="relative flex w-full items-center gap-5 py-7 text-left sm:gap-8 sm:py-9"
      >
        {/* Hover wash, inset so it never touches the divider lines. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-[-1rem] inset-y-0 -z-10 rounded-xl bg-gradient-to-r from-accent/[0.07] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />

        <span className="shrink-0 font-mono text-xs text-subtle transition-colors group-hover:text-accent">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            {/* A <button> may only contain phrasing content, so the heading is
                a span carrying the heading role rather than an <h3> element. */}
            <span
              role="heading"
              aria-level={3}
              className="text-xl font-medium tracking-tight transition-colors group-hover:text-accent sm:text-2xl lg:text-3xl"
            >
              {project.title}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-subtle">
              {project.category}
            </span>
          </div>

          {/* Collapsed preview — hidden once the row opens to avoid repeating. */}
          <p
            className={cn(
              "mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground transition-opacity duration-300 sm:text-base",
              isOpen && "opacity-0",
            )}
          >
            {project.description}
          </p>
        </div>

        {/* Tech chips, desktop only — they'd wrap badly on a phone. */}
        <div className="hidden shrink-0 items-center gap-2 lg:flex">
          {project.technologies.slice(0, 3).map((tech) => (
            <Pill key={tech}>{tech}</Pill>
          ))}
        </div>

        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={snappy}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-colors group-hover:border-accent group-hover:text-accent"
        >
          <Plus size={15} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="grid gap-8 pb-9 pl-0 sm:pl-[3.25rem] lg:grid-cols-[1.2fr_1fr]">
              <div>
                <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
                  {project.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2 lg:hidden">
                  {project.technologies.map((tech) => (
                    <Pill key={tech}>{tech}</Pill>
                  ))}
                </div>

                {(project.link || project.repo) && (
                  <div className="mt-6 flex gap-4">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline inline-flex items-center gap-1.5 text-sm text-accent"
                      >
                        Live site <ArrowUpRight size={14} />
                      </a>
                    )}
                    {project.repo && (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline inline-flex items-center gap-1.5 text-sm text-accent"
                      >
                        Source <Github size={14} />
                      </a>
                    )}
                  </div>
                )}
              </div>

              <ul className="flex flex-col gap-3">
                {project.highlights.map((highlight, i) => (
                  <motion.li
                    key={highlight}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                    className="flex gap-3 text-sm text-muted-foreground"
                  >
                    <span className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {highlight}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function Work() {
  const [openId, setOpenId] = useState<string | null>(projectsData[0]?.id ?? null);

  return (
    <section id="work" className="scroll-mt-28 py-24 sm:py-32">
      <div className="container">
        <SectionHeading
          index="02"
          eyebrow="Selected work"
          title="Things I've shipped"
          lead="Production systems built with teams. Angular on the surface, REST APIs and service logic underneath, for people whose job depends on them not breaking."
        />

        <div className="mt-12 border-t border-border">
          {projectsData.map((project, index) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={index}
              isOpen={openId === project.id}
              onToggle={() => setOpenId(openId === project.id ? null : project.id)}
            />
          ))}
        </div>

        {/* Side projects */}
        <Reveal className="mt-16">
          <RevealItem className="mb-6 flex items-center gap-3">
            <span className="eyebrow">Open source & personal</span>
            <span className="h-px flex-1 bg-border" />
          </RevealItem>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {openSourceProjects.map((project) => (
              <RevealItem key={project.title}>
                <Spotlight className="h-full">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/card flex h-full flex-col gap-4 p-6"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <Github size={17} className="text-subtle" />
                      <ArrowUpRight
                        size={16}
                        className="text-subtle transition-transform duration-300 group-hover/card:-translate-y-0.5 group-hover/card:translate-x-0.5 group-hover/card:text-accent"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-base font-medium tracking-tight">
                        {project.title}
                      </h4>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {project.description}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Pill key={tech}>{tech}</Pill>
                      ))}
                    </div>
                  </a>
                </Spotlight>
              </RevealItem>
            ))}

            {personalProjects.map((project) => (
              <RevealItem key={project.title}>
                <Spotlight className="h-full">
                  <div className="flex h-full flex-col gap-4 p-6">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">
                      Academic
                    </span>
                    <div className="flex-1">
                      <h4 className="text-base font-medium tracking-tight">
                        {project.title}
                      </h4>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </Spotlight>
              </RevealItem>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
