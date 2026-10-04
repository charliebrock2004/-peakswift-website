/**
 * Single source of truth for anything that might change: contact details,
 * navigation, and the copy that appears in more than one place.
 * Change it here and it changes everywhere on the site.
 */

import { lowestPackagePrice } from "@/lib/pricing";

export const site = {
  name: "PeakSwift",
  legalName: "PeakSwift Studios",
  tagline: "Websites that make your business look the part.",
  /* The <title> on the home page: what a searcher needs to see in one line. */
  title: "PeakSwift Studios — Web Design in Crieff & Perthshire",
  description:
    `Affordable, hand-built websites for small businesses and tradespeople from £${lowestPackagePrice}. A web design studio in Crieff, Perthshire, working across the UK.`,

  /* The address enquiries come to. Every "Start a project" and "Let's build
     something" button, the enquiry form, the footer and the structured data
     all read it from here — set it once and it is live everywhere.

     Leave it null until there is a dedicated PeakSwift inbox. While it is
     null the site shows no address and no mailto link at all; it must never
     point at another business's inbox as a stand-in. */
  email: null as string | null,

  /* The origin the site is actually served from. Drives the canonical URL,
     Open Graph tags, sitemap.xml and the JSON-LD block. */
  url: "https://peakswift-website-psi.vercel.app",

  locality: "Crieff",
  region: "Perthshire",
  location: "Crieff, Perthshire — working with clients anywhere",

  /* Add links here and they appear in the footer automatically.
     e.g. { label: "Instagram", href: "https://instagram.com/..." } */
  social: [] as { label: string; href: string }[],
};

/* Root-relative, so the same links work from the 404 page as well as home. */
export const nav = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Process", href: "/#process" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
] as const;

/* Every project call to action goes to the enquiry section rather than
   straight to an email client: it explains what to send, and it works for
   visitors who have no mail app set up. */
export const contactHref = "/#contact";

export const mailto = (subject = "New project enquiry", body?: string) => {
  if (!site.email) return null;
  const params = [`subject=${encodeURIComponent(subject)}`];
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${site.email}?${params.join("&")}`;
};
