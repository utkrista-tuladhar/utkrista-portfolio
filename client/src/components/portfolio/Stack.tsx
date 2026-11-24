import { skillGroups } from "@/data/skills";
import { clientsData } from "@/data/clients";
import { snappy, viewportOnce } from "@/lib/motion";
import { motion } from "framer-motion";
import { Reveal, RevealItem, SectionHeading, Spotlight } from "./primitives";

/**
 * Stack: grouped skills, each group annotated with why it's there.
 *
 * Chips stagger in per group rather than all at once — with ~20 chips a
 * single stagger would run far too long to feel responsive.
 */
export function Stack() {
  return (
    <section id="stack" className="scroll-mt-28 py-24 sm:py-32">
      <div className="container">
        <SectionHeading
          index="04"
          eyebrow="Stack"
          title="What I work with"
          lead="Spread across the stack on purpose. Everything here has shipped on a real project with a real deadline. It is not a list of things I've read the docs for."
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-2">
          {skillGroups.map((group, groupIndex) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ delay: groupIndex * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <Spotlight className="h-full">
                <div className="flex h-full flex-col gap-5 p-7 sm:p-8">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-lg font-medium tracking-tight">{group.title}</h3>
                    <span className="font-mono text-[10px] text-subtle">
                      {String(group.skills.length).padStart(2, "0")}
                    </span>
                  </div>

                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {group.note}
                  </p>

                  <div className="mt-auto flex flex-wrap gap-2 pt-2">
                    {group.skills.map((skill, i) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={viewportOnce}
                        transition={{ delay: 0.15 + i * 0.04, ...snappy }}
                        whileHover={{ y: -2 }}
                        className="cursor-default rounded-lg border border-border bg-elevated/60 px-3 py-1.5 text-[13px] text-muted-foreground transition-colors hover:border-accent/50 hover:text-foreground"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </Spotlight>
            </motion.div>
          ))}
        </div>

        {/* Clients: a quiet logo strip, not a carousel competing for attention. */}
        <Reveal className="mt-16">
          <RevealItem className="mb-7 flex items-center gap-3">
            <span className="eyebrow">Also designed for</span>
            <span className="h-px flex-1 bg-border" />
          </RevealItem>

          <RevealItem>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {clientsData.map((client) => (
                <motion.div
                  key={client.id}
                  whileHover={{ y: -3 }}
                  transition={snappy}
                  className="group flex items-center justify-center rounded-xl border border-border bg-surface/40 p-6"
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    loading="lazy"
                    title={client.name}
                    className="h-10 w-auto max-w-[120px] object-contain opacity-50 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0"
                  />
                </motion.div>
              ))}
            </div>
          </RevealItem>
        </Reveal>
      </div>
    </section>
  );
}
