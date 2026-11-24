import { portfolioData } from "@/data/portfolio";
import { educationData } from "@/data/education";
import { quickFacts } from "@/data/contact";
import { motion } from "framer-motion";
import { Reveal, RevealItem, SectionHeading, Spotlight } from "./primitives";
import { viewportOnce } from "@/lib/motion";

/**
 * About: a bento grid rather than a wall of prose.
 *
 * The photo tile, the prose tile and the fact tiles are all the same
 * component family; only their column spans differ, which keeps the grid
 * honest at every breakpoint.
 */
export function About() {
  return (
    <section id="about" className="scroll-mt-28 py-24 sm:py-32">
      <div className="container">
        <SectionHeading
          index="01"
          eyebrow="About"
          title={
            <>
              An engineer who works the{" "}
              <span className="font-serif italic font-normal text-gradient-accent">
                whole stack
              </span>
            </>
          }
          lead={portfolioData.shortBio}
        />

        <Reveal className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" step={0.08}>
          {/* Portrait */}
          <RevealItem className="lg:row-span-2">
            <Spotlight className="h-full">
              <div className="relative h-full min-h-[320px] overflow-hidden rounded-2xl">
                <img
                  src={portfolioData.profilePhoto}
                  alt={portfolioData.name}
                  loading="lazy"
                  className="h-full w-full scale-105 object-cover object-center transition-transform duration-700 hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-subtle">
                    {portfolioData.location}
                  </p>
                  <p className="mt-1 text-lg font-medium tracking-tight">
                    {portfolioData.name}
                  </p>
                </div>
              </div>
            </Spotlight>
          </RevealItem>

          {/* Prose */}
          <RevealItem className="lg:col-span-3">
            <Spotlight className="h-full">
              <div className="flex h-full flex-col justify-between gap-6 p-7 sm:p-9">
                <p className="text-lg leading-relaxed text-muted-foreground sm:text-xl sm:leading-relaxed">
                  I started out writing Angular components and kept following the
                  thread back, through the API that fed them and into the
                  pipelines that fed the API. Four years later I'd rather own a
                  feature from the data model to the button than hand half of it
                  to someone else.
                </p>
                <p className="text-base leading-relaxed text-muted-foreground">
                  Right now that means healthcare technology at Maitri Services:
                  Django services and ingestion pipelines on one side, and an
                  EHR-integrated browser extension that has to behave inside
                  someone else's DOM on the other. That second part is as
                  unforgiving as it sounds.
                </p>
              </div>
            </Spotlight>
          </RevealItem>

          {/* Facts */}
          {quickFacts.map((fact) => (
            <RevealItem key={fact.label}>
              <Spotlight className="h-full">
                <div className="flex h-full flex-col justify-between gap-6 p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">
                    {fact.label}
                  </p>
                  <p className="text-base font-medium leading-snug tracking-tight">
                    {fact.value}
                  </p>
                </div>
              </Spotlight>
            </RevealItem>
          ))}

          {/* Education */}
          <RevealItem className="lg:col-span-4">
            <Spotlight className="h-full">
              <div className="flex h-full flex-col gap-5 p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">
                  Education
                </p>
                <ul className="grid gap-4 lg:grid-cols-2 lg:gap-8">
                  {educationData.map((edu, i) => (
                    <motion.li
                      key={edu.id}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={viewportOnce}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      className="flex items-start justify-between gap-4 border-b border-border pb-4 last:border-0 last:pb-0 lg:border-0 lg:border-l lg:pb-0 lg:pl-5"
                    >
                      <div>
                        <p className="text-sm font-medium tracking-tight">{edu.degree}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {edu.institution}
                        </p>
                      </div>
                      <span className="shrink-0 font-mono text-[10px] text-subtle">
                        {edu.endDate === "Present" ? "Now" : edu.endDate.slice(-4)}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </Spotlight>
          </RevealItem>
        </Reveal>
      </div>
    </section>
  );
}
