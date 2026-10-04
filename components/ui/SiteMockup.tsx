"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/projects";

type Device = "desktop" | "mobile";

/* The frame's own aspect ratios — a 16:10 laptop and a 390x844 phone. */
const RATIO: Record<Device, number> = {
  desktop: 16 / 10,
  mobile: 390 / 844,
};

/**
 * A real screenshot of a real site, shown inside a device frame, scrolling as
 * the visitor scrolls past it. The point is to show the *whole* site rather
 * than one cropped hero image — and to prove, in a couple of seconds, that
 * the thing behind the link is finished work.
 *
 * The scroll link is a single transform driven by rAF, so it stays on the
 * compositor. Under `prefers-reduced-motion` the image simply sits at the top.
 */
export function SiteMockup({ project }: { project: Project }) {
  const [device, setDevice] = useState<Device>("desktop");
  const wrapRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  const shot = project.shots[device];
  const domain = new URL(project.live).host;

  /* Map the wrapper's journey through the viewport onto the screenshot's
     own overflow. Travel is capped so a very long page doesn't fly past. */
  const update = useCallback(() => {
    const wrap = wrapRef.current;
    const view = viewportRef.current;
    const rail = railRef.current;
    if (!wrap || !view || !rail) return;

    const rect = wrap.getBoundingClientRect();
    const vh = window.innerHeight;
    const progress = Math.min(
      1,
      Math.max(0, (vh - rect.top) / (vh + rect.height)),
    );

    const frameH = view.clientHeight;
    const imageH = (view.clientWidth * shot.height) / shot.width;
    const travel = Math.min(Math.max(0, imageH - frameH), frameH * 2.6);

    rail.style.transform = `translate3d(0, ${-(travel * progress).toFixed(2)}px, 0)`;
  }, [shot.height, shot.width]);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      if (railRef.current) railRef.current.style.transform = "none";
      return;
    }

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [update, device]);

  return (
    /* The figure fills the whole grid area and is what the scroll link
       measures, so progress keeps advancing while the inner wrapper is
       pinned — the site carries on scrolling for the whole time it is
       on screen, rather than stalling as soon as it sticks. */
    <figure className="m-0 lg:h-full" ref={wrapRef}>
      <div className="lg:sticky lg:top-28">
        {/* ------------------------------------------------- toolbar row --- */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <span className="mono-label">
            Live preview
          </span>

          <div
            role="group"
            aria-label={`Preview ${project.name} at a different screen size`}
            className="relative flex rounded-full border border-line bg-white/[0.04] p-1"
          >
            {/* Sliding indicator — one transform, no layout thrash */}
            <span
              aria-hidden="true"
              className="absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-white/10 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                transform: device === "mobile" ? "translateX(100%)" : "none",
              }}
            />
            {(["desktop", "mobile"] as Device[]).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDevice(d)}
                aria-pressed={device === d}
                className={`mono-label relative z-10 min-h-9 rounded-full px-3.5 py-1.5 transition-colors duration-200 ${
                  device === d ? "text-text" : "text-faint hover:text-muted"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* ---------------------------------------------------- the frame --- */}
        <a
          href={project.live}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={`Open the live ${project.name} website in a new tab`}
          className="group/frame block focus-visible:outline-offset-8"
        >
          <div
            className="relative mx-auto overflow-hidden rounded-2xl border border-line-strong bg-raised shadow-[0_40px_90px_-30px_rgba(0,0,0,0.85)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/frame:-translate-y-1.5"
            style={{
              maxWidth: device === "mobile" ? "310px" : "100%",
              /* Sits behind an accent glow tinted to the project's own palette */
              boxShadow: `0 40px 90px -30px rgba(0,0,0,0.85), 0 0 0 1px ${project.accent}1a`,
            }}
          >
            {/* Browser chrome — only for the desktop frame */}
            {device === "desktop" && (
              <div className="flex items-center gap-3 border-b border-line bg-white/[0.03] px-4 py-3">
                <span className="flex gap-1.5" aria-hidden="true">
                  <span className="size-2.5 rounded-full bg-white/15" />
                  <span className="size-2.5 rounded-full bg-white/15" />
                  <span className="size-2.5 rounded-full bg-white/15" />
                </span>
                <span className="mx-auto flex min-w-0 items-center gap-2 rounded-md bg-black/40 px-3 py-1">
                  <svg
                    viewBox="0 0 24 24"
                    className="size-3 shrink-0 text-faint"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    aria-hidden="true"
                  >
                    <rect x="4" y="10" width="16" height="10" rx="2" />
                    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                  </svg>
                  <span className="truncate font-[family-name:var(--font-mono)] text-[0.7rem] text-muted">
                    {domain}
                  </span>
                </span>
                <span className="w-12" aria-hidden="true" />
              </div>
            )}

            {/* Phone speaker bar — only for the mobile frame */}
            {device === "mobile" && (
              <div
                aria-hidden="true"
                className="flex items-center justify-center py-2.5"
              >
                <span className="h-1.5 w-16 rounded-full bg-white/15" />
              </div>
            )}

            {/* The clipped viewport the screenshot scrolls inside */}
            <div
              ref={viewportRef}
              className="relative overflow-hidden bg-black/60"
              style={{ aspectRatio: String(RATIO[device]) }}
            >
              <div ref={railRef} className="will-change-transform">
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  width={shot.width}
                  height={shot.height}
                  sizes={
                    device === "mobile"
                      ? "310px"
                      : "(max-width: 1100px) 92vw, 660px"
                  }
                  className="w-full"
                  style={{ height: "auto" }}
                />
              </div>

              {/* Hover affordance — hidden from assistive tech, the anchor's
                own label already says where this goes. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-center bg-gradient-to-t from-black/85 to-transparent pb-5 pt-14 opacity-0 transition-opacity duration-300 group-hover/frame:opacity-100"
              >
                <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-[0.8rem] font-semibold text-ink">
                  Open live site
                  <svg
                    viewBox="0 0 24 24"
                    className="size-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M7 17 17 7M9 7h8v8" />
                  </svg>
                </span>
              </span>
            </div>
          </div>
        </a>

        <figcaption className="mono-label mt-4 text-center">
          {device === "desktop" ? "1440 × 900" : "390 × 844"} · scroll to
          explore
        </figcaption>
      </div>
    </figure>
  );
}
