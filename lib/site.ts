/**
 * Single source of truth for anything that might change: contact details,
 * navigation, and the copy that appears in more than one place.
 * Change it here and it changes everywhere on the site.
 */

export const site = {
  name: "PeakSwift",
  legalName: "PeakSwift Studios",
  tagline: "Websites that make your business look the part.",
  description:
    "PeakSwift designs and builds modern, fast websites for businesses. Three live sites — WeeJob Joinery, Brock Contracts and Timber & Flame — each built around how that business actually works.",

  /* The address enquiries come to. Change this one line to change it sitewide.
     PLACEHOLDER: currently the Brock Contracts inbox — swap it for a PeakSwift
     address when there is one. */
  email: "brockcontracts@gmail.com",

  /* The origin the site is actually served from. Drives the canonical URL,
     Open Graph tags, sitemap.xml and the JSON-LD block. */
  url: "https://peakswift-website-psi.vercel.app",

  location: "Crieff, Perthshire — working with clients anywhere",

  /* Add links here and they appear in the footer automatically.
     e.g. { label: "Instagram", href: "https://instagram.com/..." } */
  social: [] as { label: string; href: string }[],
} as const;

export const nav = [
  { label: "Work", href: "#work" },
  { label: "What I build", href: "#build" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export const mailto = (subject = "New project enquiry") =>
  `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;
