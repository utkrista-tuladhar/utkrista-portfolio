import { cn } from "@/lib/utils";
import { riseIn, snappy, stagger, viewportOnce } from "@/lib/motion";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import type { ReactNode } from "react";
import { useMagnetic } from "@/hooks/useMagnetic";

/* ------------------------------------------------------------------ *
 * Reveal
 * ------------------------------------------------------------------ */

/**
 * Scroll-triggered entrance. Wraps children in a stagger parent so nesting
 * `<Reveal.Item>` inside gives you a sequence for free.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  step = 0.07,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  step?: number;
  as?: "div" | "section" | "ul" | "header";
}) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      variants={stagger(step, delay)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {children}
    </Comp>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "p" | "h2" | "h3" | "span";
}) {
  const Comp = motion[as];
  return (
    <Comp variants={riseIn} className={className}>
      {children}
    </Comp>
  );
}

/* ------------------------------------------------------------------ *
 * Section heading
 * ------------------------------------------------------------------ */

/**
 * Every section opens the same way: a mono eyebrow with an index, a large
 * title, an optional lead paragraph, and a rule that draws itself in.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  lead,
  align = "left",
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
      )}
    >
      <RevealItem className="flex items-center gap-3">
        <span className="eyebrow text-accent">{index}</span>
        <span className="h-px w-8 bg-border-strong" />
        <span className="eyebrow">{eyebrow}</span>
      </RevealItem>

      <RevealItem
        as="h2"
        className="max-w-3xl text-4xl leading-[1.05] sm:text-5xl lg:text-[3.5rem]"
      >
        {title}
      </RevealItem>

      {lead && (
        <RevealItem
          as="p"
          className={cn(
            "max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg",
            align === "center" && "mx-auto",
          )}
        >
          {lead}
        </RevealItem>
      )}

      <motion.div
        className="mt-2 h-px w-full origin-left bg-gradient-to-r from-border-strong via-border to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      />
    </Reveal>
  );
}

/* ------------------------------------------------------------------ *
 * Spotlight surface
 * ------------------------------------------------------------------ */

/**
 * Card that lights up under the cursor.
 *
 * The highlight is a motion template rather than a React state update, so
 * pointer movement never triggers a re-render — only a style write.
 */
export function Spotlight({
  children,
  className,
  radius = 320,
}: {
  children: ReactNode;
  className?: string;
  radius?: number;
}) {
  const mx = useMotionValue(-9999);
  const my = useMotionValue(-9999);
  const background = useMotionTemplate`radial-gradient(${radius}px circle at ${mx}px ${my}px, var(--glow-a), transparent 72%)`;

  return (
    <div
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        mx.set(event.clientX - rect.left);
        my.set(event.clientY - rect.top);
      }}
      onPointerLeave={() => {
        mx.set(-9999);
        my.set(-9999);
      }}
      className={cn(
        "group/spot relative overflow-hidden rounded-2xl bg-surface ring-hairline",
        className,
      )}
    >
      <motion.div
        aria-hidden
        style={{ background }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
      />
      <div className="relative">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Magnetic wrapper
 * ------------------------------------------------------------------ */

export function Magnetic({
  children,
  strength = 14,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const { ref, x, y, onPointerMove, onPointerLeave } = useMagnetic({ strength });

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ *
 * Small parts
 * ------------------------------------------------------------------ */

export function Pill({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-elevated/60 px-3 py-1 font-mono text-[11px] tracking-wide text-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Primary call to action: filled, magnetic, with a sheen on hover. */
export function ActionButton({
  children,
  href,
  onClick,
  download,
  variant = "solid",
  className,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  download?: string;
  variant?: "solid" | "outline";
  className?: string;
}) {
  const content = (
    <motion.span
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={snappy}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-medium",
        variant === "solid"
          ? "bg-foreground text-background"
          : "border border-border-strong text-foreground hover:border-accent",
        className,
      )}
    >
      {variant === "solid" && (
        <span
          aria-hidden
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-background/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
        />
      )}
      <span className="relative flex items-center gap-2">{children}</span>
    </motion.span>
  );

  if (href) {
    const external = href.startsWith("http");
    return (
      <Magnetic strength={10}>
        <a
          href={href}
          download={download}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
        >
          {content}
        </a>
      </Magnetic>
    );
  }

  return (
    <Magnetic strength={10}>
      <button type="button" onClick={onClick}>
        {content}
      </button>
    </Magnetic>
  );
}
