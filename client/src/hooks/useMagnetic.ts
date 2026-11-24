import { useMotionValue, useSpring } from "framer-motion";
import { useCallback, useRef } from "react";

interface MagneticOptions {
  /** How far the element is allowed to travel toward the cursor, in px. */
  strength?: number;
}

/**
 * Pulls an element a little way toward the cursor while the pointer is over it,
 * then springs it home on leave.
 *
 * Disabled on coarse pointers: on touch there is no hover to respond to, and
 * running the handler would only cost us a layout read per move.
 */
export function useMagnetic({ strength = 14 }: MagneticOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 320, damping: 22, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 320, damping: 22, mass: 0.5 });

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (event.pointerType !== "mouse") return;
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const offsetX = event.clientX - (rect.left + rect.width / 2);
      const offsetY = event.clientY - (rect.top + rect.height / 2);

      // Normalise by half-size so the pull is proportional, not absolute:
      // a wide button and a small icon both travel at most `strength`.
      x.set((offsetX / (rect.width / 2)) * strength);
      y.set((offsetY / (rect.height / 2)) * strength);
    },
    [strength, x, y],
  );

  const onPointerLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return { ref, x: springX, y: springY, onPointerMove, onPointerLeave };
}
