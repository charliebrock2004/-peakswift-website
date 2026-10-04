"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { contactHref, nav } from "@/lib/site";

/**
 * Fixed header that gets out of the way. It only paints a background once the
 * page has moved, hides itself when the visitor scrolls down and comes back
 * the moment they scroll up — so on a phone the content gets the full screen
 * while the navigation is never more than a flick away.
 */
export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const y = window.scrollY;
        setScrolled(y > 12);
        setHidden(y > 420 && y > last && !menuOpen);
        last = y;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [menuOpen]);

  /* Highlight the nav item for whichever section is currently in view. */
  useEffect(() => {
    const sections = nav
      .map((n) => document.getElementById(n.href.split("#")[1]))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length || !("IntersectionObserver" in window)) return;

    /* Kept as a running set rather than read off each callback, so that
       scrolling back up to the hero clears the highlight instead of leaving
       the last section marked current. */
    const inView = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) inView.add(entry.target.id);
          else inView.delete(entry.target.id);
        }
        const current = nav.find((n) => inView.has(n.href.split("#")[1]));
        setActive(current?.href ?? "");
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.2, 0.5] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  /* Lock the page behind the open mobile menu. */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color,backdrop-filter] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${
        scrolled || menuOpen
          ? "border-b border-line bg-base/80 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="shell flex h-[4.5rem] items-center justify-between gap-4">
        <a
          href="/#top"
          className="shrink-0 rounded-lg transition-opacity duration-200 hover:opacity-80"
          aria-label="PeakSwift Studios — home"
        >
          <Logo />
        </a>

        {/* -------------------------------------------------- desktop nav -- */}
        <nav aria-label="Main" className="hidden items-center gap-7 md:flex lg:gap-8">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={active === item.href ? "true" : undefined}
              className={`link-underline text-[0.92rem] font-medium transition-colors duration-200 ${
                active === item.href ? "text-text" : "text-muted hover:text-text"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={contactHref}
            className="btn btn-primary hidden min-h-[2.7rem] px-5 text-[0.88rem] sm:inline-flex"
          >
            Start a project
          </a>

          {/* ------------------------------------------------ menu button -- */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex size-11 flex-col items-center justify-center gap-[5px] rounded-xl border border-line bg-white/[0.04] transition-colors duration-200 hover:border-line-strong md:hidden"
          >
            <span
              className={`block h-[1.5px] w-4 bg-text transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                menuOpen ? "translate-y-[3.25px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-4 bg-text transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                menuOpen ? "-translate-y-[3.25px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* ---------------------------------------------------- mobile nav -- */}
      <nav
        id="mobile-nav"
        aria-label="Mobile"
        /* Closed, the menu is only collapsed visually; inert also takes its
           links out of the tab order and the accessibility tree. */
        inert={!menuOpen}
        className={`overflow-hidden border-t border-line bg-base/95 backdrop-blur-xl transition-[max-height,opacity] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
          menuOpen ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="shell list-none py-2">
          {nav.map((item, i) => (
            <li key={item.href} className="border-b border-line last:border-0">
              <a
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-baseline gap-4 py-4 text-lg font-medium transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  transform: menuOpen ? "none" : "translateY(-0.5rem)",
                  transitionDelay: menuOpen ? `${60 + i * 45}ms` : "0ms",
                }}
              >
                <span className="mono-label" aria-hidden="true">
                  0{i + 1}
                </span>
                {item.label}
              </a>
            </li>
          ))}
          <li className="py-4 sm:hidden">
            <a
              href={contactHref}
              onClick={() => setMenuOpen(false)}
              className="btn btn-primary w-full"
            >
              Start a project
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
