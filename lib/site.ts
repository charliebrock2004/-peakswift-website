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
    "PeakSwift designs and builds modern, fast websites for businesses. See two real sites built end to end — WeeJob Joinery and Brock Contracts.",

  /* The address enquiries come to. Change this one line to change it sitewide.
     PLACEHOLDER: currently the Brock Contracts inbox — swap it for a PeakSwift
     address when there is one. */
  email: "brockcontracts@gmail.com",

  /* Set this to the deployed origin before launch — it drives the canonical
     URL, the Open Graph tags and the JSON-LD block. */
  url: "https://peakswift.vercel.app",

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
