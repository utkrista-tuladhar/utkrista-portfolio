import type { Transition, Variants } from "framer-motion";

/**
 * Shared motion language.
 *
 * Two rules keep the whole site feeling like one object:
 *  - Entrances ease out of a spring, never a linear fade.
 *  - Anything that reacts to the pointer uses `snappy`, so hover feedback
 *    always arrives faster than scroll reveals.
 */

export const spring: Transition = {
  type: "spring",
  stiffness: 220,
  damping: 30,
  mass: 0.9,
};

export const snappy: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 34,
  mass: 0.6,
};

export const expo: Transition = {
  duration: 0.75,
  ease: [0.16, 1, 0.3, 1],
};

/** Parent that releases its children one after another. */
export const stagger = (step = 0.07, delay = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: step, delayChildren: delay },
  },
});

/** Default child entrance: rise and settle. */
export const riseIn: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: expo,
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: expo },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: spring },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -28 },
  show: { opacity: 1, x: 0, transition: expo },
};

/**
 * Per-word hero entrance. Each word is clipped by its own overflow-hidden
 * wrapper, so the text appears to lift out of the line rather than fade in.
 */
export const wordMask: Variants = {
  hidden: { y: "110%" },
  show: {
    y: "0%",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

/** Viewport config reused by every scroll-triggered section. */
export const viewportOnce = { once: true, amount: 0.25 } as const;
