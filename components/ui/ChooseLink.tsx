"use client";

import { chooseHref } from "@/lib/pricing";

export const CHOOSE_EVENT = "peakswift:choose";

/**
 * A "Choose …" button. Its href is a real link — this page's enquiry section
 * with `?package=` set — so it works when opened in a new tab or shared.
 * When clicked normally it skips the reload: it updates the URL, tells the
 * enquiry form which option to select, and scrolls to the form.
 */
export function ChooseLink({
  slug,
  className,
  children,
}: {
  slug: string;
  className?: string;
  children: React.ReactNode;
}) {
  function onClick(e: React.MouseEvent<HTMLAnchorElement>) {
    const form = document.getElementById("contact");
    if (
      !form ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      e.button !== 0
    )
      return;
    e.preventDefault();

    window.history.replaceState(null, "", chooseHref(slug));
    window.dispatchEvent(new CustomEvent(CHOOSE_EVENT, { detail: slug }));

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    form.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
    /* Put keyboard and screen-reader users where they need to be next */
    document.getElementById("enquiry-name")?.focus({ preventScroll: true });
  }

  return (
    <a href={chooseHref(slug)} onClick={onClick} className={className}>
      {children}
    </a>
  );
}
