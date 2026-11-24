import { portfolioData, yearsOfExperience } from "@/data/portfolio";
import { experienceData } from "@/data/experience";
import { projectsData, openSourceProjects } from "@/data/projects";
import { expo, snappy, wordMask } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { ActionButton, Magnetic } from "./primitives";
import { scrollToSection } from "@/lib/sections";

/* ------------------------------------------------------------------ *
 * Headline
 * ------------------------------------------------------------------ */

/**
 * Splits a phrase into words, each in its own clipping wrapper, so the line
 * reads as type lifting off the baseline instead of a block fading in.
 */
function MaskedWords({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className={cn("inline-block", className)}
            variants={wordMask}
            initial="hidden"
            animate="show"
            transition={{ delay: delay + i * 0.06, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
            <span className="inline-block w-[0.26em]" />
          </motion.span>
        </span>
      ))}
    </>
  );
}

/* ------------------------------------------------------------------ *
 * Tilting code card
 * ------------------------------------------------------------------ */

type Token = { t: string; c?: "key" | "str" | "fn" | "num" | "cmt" | "punc" };

const SNIPPET: Token[][] = [
  [{ t: "const", c: "key" }, { t: " engineer" }, { t: " = ", c: "punc" }, { t: "{", c: "punc" }],
  [{ t: "  name", c: "fn" }, { t: ": ", c: "punc" }, { t: `"Utkrista Tuladhar"`, c: "str" }, { t: ",", c: "punc" }],
  [{ t: "  role", c: "fn" }, { t: ": ", c: "punc" }, { t: `"Full-Stack Engineer"`, c: "str" }, { t: ",", c: "punc" }],
  [{ t: "  stack", c: "fn" }, { t: ": ", c: "punc" }, { t: "[", c: "punc" }, { t: `"Angular"`, c: "str" }, { t: ", ", c: "punc" }, { t: `"React"`, c: "str" }, { t: ",", c: "punc" }],
  [{ t: `    "TypeScript"`, c: "str" }, { t: ", ", c: "punc" }, { t: `"Django"`, c: "str" }, { t: "]", c: "punc" }, { t: ",", c: "punc" }],
  [{ t: "  owns", c: "fn" }, { t: ": ", c: "punc" }, { t: "[", c: "punc" }, { t: `"data"`, c: "str" }, { t: ", ", c: "punc" }, { t: `"api"`, c: "str" }, { t: ", ", c: "punc" }, { t: `"ui"`, c: "str" }, { t: "]", c: "punc" }, { t: ",", c: "punc" }],
  [{ t: "  shipping", c: "fn" }, { t: ": ", c: "punc" }, { t: "true", c: "num" }, { t: ",", c: "punc" }],
  [{ t: "}", c: "punc" }],
  [],
  [{ t: "// currently: healthcare tech @ Maitri", c: "cmt" }],
];

const TOKEN_CLASS: Record<NonNullable<Token["c"]> | "plain", string> = {
  key: "text-accent",
  str: "text-accent-2",
  fn: "text-foreground",
  num: "text-accent-3",
  cmt: "text-subtle italic",
  punc: "text-muted-foreground",
  plain: "text-muted-foreground",
};

/**
 * Card that tilts toward the cursor in 3D.
 *
 * Rotation is driven by springs off raw motion values, so the tilt lags the
 * pointer very slightly — that lag is what stops it reading as a cheap
 * CSS transform and makes it feel like a physical object.
 */
function CodeCard() {
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(py, [0, 1], [8, -8]), { stiffness: 220, damping: 24 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-10, 10]), { stiffness: 220, damping: 24 });

  // The sheen tracks the same values, so the highlight moves with the tilt.
  const sheenX = useTransform(px, [0, 1], ["0%", "100%"]);
  const sheen = useMotionTemplate`radial-gradient(420px circle at ${sheenX} 0%, var(--glow-a), transparent 65%)`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 12 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ ...expo, delay: 0.5 }}
      style={{ perspective: 1200 }}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        px.set((event.clientX - rect.left) / rect.width);
        py.set((event.clientY - rect.top) / rect.height);
      }}
      onPointerLeave={() => {
        px.set(0.5);
        py.set(0.5);
      }}
      className="relative w-full max-w-md"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative overflow-hidden rounded-2xl bg-surface/90 ring-hairline backdrop-blur-xl"
      >
        <motion.div aria-hidden style={{ background: sheen }} className="pointer-events-none absolute inset-0" />

        {/* Title bar */}
        <div className="relative flex items-center gap-2 border-b border-border px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent-3/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent-2/70" />
          <span className="ml-2 font-mono text-[11px] text-subtle">engineer.ts</span>
        </div>

        {/* Code body */}
        <pre className="relative overflow-x-auto px-4 py-5 font-mono text-[12.5px] leading-[1.85] sm:text-[13px]">
          <code>
            {SNIPPET.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.75 + i * 0.07, duration: 0.5 }}
                className="flex gap-4"
              >
                <span className="w-5 shrink-0 select-none text-right text-subtle/50">
                  {i + 1}
                </span>
                <span className="whitespace-pre">
                  {line.map((token, j) => (
                    <span key={j} className={TOKEN_CLASS[token.c ?? "plain"]}>
                      {token.t}
                    </span>
                  ))}
                  {i === SNIPPET.length - 1 && (
                    <span className="animate-caret ml-0.5 inline-block h-[1.05em] w-[7px] translate-y-[2px] bg-accent" />
                  )}
                </span>
              </motion.div>
            ))}
          </code>
        </pre>
      </motion.div>

      {/* Floating badge, parked just off the card corner. */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ ...snappy, delay: 1.3 }}
        className="glass absolute -bottom-5 -left-5 hidden items-center gap-2 rounded-full px-4 py-2.5 ring-hairline sm:flex"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-accent-2" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-2" />
        </span>
        <span className="font-mono text-[11px] text-muted-foreground">
          {yearsOfExperience()} yrs shipping
        </span>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ *
 * Hero
 * ------------------------------------------------------------------ */

export function Hero() {
  const stats = [
    { value: `${yearsOfExperience()}+`, label: "Years experience" },
    { value: `${experienceData.length}`, label: "Companies" },
    { value: `${projectsData.length + openSourceProjects.length}`, label: "Shipped projects" },
  ];

  const stackLayers = [
    { label: "Interface", value: "Angular · React · TypeScript" },
    { label: "Service", value: "Django · REST" },
    { label: "Data", value: "Postgres · MySQL · Firebase · Pipelines" },
  ];

  const social = [
    { icon: Github, href: portfolioData.socialLinks.github, label: "GitHub" },
    { icon: Linkedin, href: portfolioData.socialLinks.linkedin, label: "LinkedIn" },
    { icon: Mail, href: `mailto:${portfolioData.socialLinks.email}`, label: "Email" },
  ];

  return (
    <section className="relative flex min-h-[100svh] items-center pb-20 pt-32 sm:pt-36">
      <div className="container">
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          {/* ---------- Left column ---------- */}
          <div>
            {/* Availability */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...expo, delay: 0.1 }}
              className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/50 py-1.5 pl-2 pr-4 backdrop-blur"
            >
              <span className="relative flex h-1.5 w-1.5 ml-1">
                <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-accent-2" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-2" />
              </span>
              <span className="font-mono text-[11px] tracking-wide text-muted-foreground">
                {portfolioData.availabilityNote}
                <span className="mx-2 text-border-strong">/</span>
                {portfolioData.location}
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-[clamp(2.6rem,8vw,5.25rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
              <MaskedWords text={portfolioData.headline.lead} delay={0.22} />
              <span className="relative inline-block overflow-hidden pb-[0.12em] align-bottom">
                <motion.span
                  className="text-gradient-accent inline-block font-serif italic font-normal"
                  variants={wordMask}
                  initial="hidden"
                  animate="show"
                  transition={{ delay: 0.34, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                >
                  {portfolioData.headline.emphasis}
                  <span className="inline-block w-[0.26em]" />
                </motion.span>
              </span>
              <br className="hidden sm:block" />
              <MaskedWords text={portfolioData.headline.trail} delay={0.42} />
            </h1>

            {/* Role line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ...expo, delay: 0.75 }}
              className="mt-8 flex items-center gap-3"
            >
              <span className="h-px w-10 bg-accent" />
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {portfolioData.name}
                <span className="mx-2 text-border-strong">/</span>
                {portfolioData.role}
              </p>
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...expo, delay: 0.85 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              {portfolioData.bio}
            </motion.p>

            {/* Stack layers — states the full-stack claim as three concrete tiers
                rather than leaving it as an adjective in the bio. */}
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ...expo, delay: 0.92 }}
              className="mt-7 flex max-w-xl flex-col gap-px overflow-hidden rounded-xl ring-hairline"
            >
              {stackLayers.map((layer, i) => (
                <motion.li
                  key={layer.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + i * 0.08, duration: 0.5 }}
                  className="flex items-center gap-4 bg-surface/50 px-4 py-2.5"
                >
                  <span className="w-20 shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                    {layer.label}
                  </span>
                  <span className="h-px flex-1 bg-border" />
                  <span className="text-right font-mono text-[11px] text-muted-foreground">
                    {layer.value}
                  </span>
                </motion.li>
              ))}
            </motion.ul>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...expo, delay: 0.95 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <ActionButton onClick={() => scrollToSection("work")}>
                View work
                <ArrowDown size={15} className="transition-transform group-hover:translate-y-0.5" />
              </ActionButton>

              <ActionButton href={portfolioData.resume} download="Utkrista-Tuladhar-Resume.pdf" variant="outline">
                Résumé
                <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </ActionButton>

              <div className="ml-1 flex items-center gap-1">
                {social.map(({ icon: Icon, href, label }) => (
                  <Magnetic key={label} strength={8}>
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="grid h-10 w-10 place-items-center rounded-full border border-transparent text-muted-foreground transition-colors hover:border-border hover:text-foreground"
                    >
                      <Icon size={17} />
                    </a>
                  </Magnetic>
                ))}
              </div>
            </motion.div>

            {/* Stats */}
            <motion.dl
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ...expo, delay: 1.1 }}
              className="mt-12 flex max-w-lg divide-x divide-border border-t border-border pt-6"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="flex-1 pr-4 pl-4 first:pl-0">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-subtle">
                    {stat.label}
                  </dt>
                  <dd className="mt-1.5 text-2xl font-semibold tracking-tight sm:text-3xl">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* ---------- Right column ---------- */}
          <div className="flex justify-center lg:justify-end">
            <CodeCard />
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.button
        onClick={() => scrollToSection("about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        aria-label="Scroll to about"
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
      >
        <span className="eyebrow text-[10px]">Scroll</span>
        <span className="relative h-10 w-px overflow-hidden bg-border">
          <motion.span
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-x-0 h-1/2 bg-accent"
          />
        </span>
      </motion.button>
    </section>
  );
}
