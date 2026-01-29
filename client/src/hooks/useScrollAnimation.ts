import { useEffect, useRef, useState } from "react";

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
}

/**
 * Custom hook for triggering animations when elements come into view
 * Uses Intersection Observer API for optimal performance
 */
export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const { threshold = 0.1, rootMargin = "0px" } = options;
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Unobserve after animation triggers to avoid re-triggering
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, rootMargin]);

  return { ref, isVisible };
}
