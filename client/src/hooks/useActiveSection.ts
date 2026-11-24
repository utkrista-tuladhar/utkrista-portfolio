import { useEffect, useState } from "react";

/**
 * Tracks which section currently owns the viewport so the nav can show an
 * active pill.
 *
 * Uses a band across the middle of the screen (`rootMargin`) rather than
 * `amount`, so a tall section stays "active" the whole time it is being read
 * and short sections still register as you pass through them.
 */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // More than one section can intersect the band at once; the one
        // closest to the top of the band wins.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
