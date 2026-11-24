import { experienceData } from "@/data/experience";
import { viewportOnce } from "@/lib/motion";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { Pill, SectionHeading } from "./primitives";

/**
 * Experience timeline with a rail that fills as you scroll past it.
 *
 * The fill is driven by the section's own scroll progress rather than
 * per-item observers, so the line stays continuous instead of jumping
 * between entries.
 */
export function Experience() {
  const railRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 0.75", "end 0.55"],
  });

  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.5 });
  const fillHeight = useTransform(fill, (value) => `${value * 100}%`);

  return (
    <section id="experience" className="scroll-mt-28 py-24 sm:py-32">
      <div className="container">
        <SectionHeading
          index="03"
          eyebrow="Experience"
          title="Where I've worked"
          lead="Four years across healthcare, legal, government and retail systems, building features end to end and leading the frontend side of them."
        />

        <div ref={railRef} className="relative mt-16">
          {/* Rail */}
          <div className="absolute left-0 top-2 hidden h-full w-px bg-border sm:block">
            <motion.div
              style={{ height: fillHeight }}
              className="absolute inset-x-0 top-0 bg-gradient-to-b from-accent to-accent-2"
            />
          </div>

          <div className="flex flex-col gap-14 sm:gap-16">
            {experienceData.map((job, index) => (
              <motion.article
                key={job.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="relative sm:pl-10"
              >
                {/* Node */}
                <span className="absolute left-0 top-2 hidden -translate-x-1/2 sm:block">
                  <span className="relative grid h-3 w-3 place-items-center">
                    <span className="absolute h-3 w-3 rounded-full bg-background" />
                    <span className="relative h-2 w-2 rounded-full bg-border-strong transition-colors" />
                  </span>
                </span>

                <div className="grid gap-5 lg:grid-cols-[180px_1fr] lg:gap-10">
                  {/* Dates */}
                  <div className="lg:pt-1">
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                      {job.startDate} – {job.endDate}
                    </p>
                    <p className="mt-1.5 font-mono text-[11px] text-subtle">
                      {job.location}
                    </p>
                  </div>

                  {/* Body */}
                  <div>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="text-xl font-medium tracking-tight sm:text-2xl">
                        {job.title}
                      </h3>
                      {index === 0 && (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-2/40 bg-accent-2/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-accent-2">
                          <span className="h-1 w-1 rounded-full bg-accent-2" />
                          Current
                        </span>
                      )}
                    </div>

                    <p className="mt-1 text-sm text-muted-foreground">{job.company}</p>

                    <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {job.description}
                    </p>

                    {job.highlights.length > 0 && (
                      <ul className="mt-5 flex flex-col gap-2.5">
                        {job.highlights.map((highlight) => (
                          <li
                            key={highlight}
                            className="flex gap-3 text-sm text-muted-foreground"
                          >
                            <span className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-border-strong" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
