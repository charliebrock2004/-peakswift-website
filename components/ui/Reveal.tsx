"use client";

import { useEffect } from "react";

/**
 * One IntersectionObserver for every `[data-reveal]` on the page, mounted once.
 *
 * Deliberately not an animation library: the transition itself lives in CSS
 * (see globals.css) and this only adds the class that starts it. That keeps
 * the whole scroll-reveal system at roughly 30 lines and zero KB of vendor JS.
 */
export function RevealProvider() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) {
      nodes.forEach((n) => n.classList.add("is-in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target); // reveal once, then stop watching
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  return null;
}
