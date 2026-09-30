/**
 * PROJECT DATA — the source of truth for the Featured Work section.
 *
 * Everything here is drawn from the real sites and their repositories.
 * Nothing is invented: if a feature is listed, it is in the deployed site.
 *
 * To add a project:
 *   1. Drop the screenshots in /public/work (desktop ~1440w, mobile ~780w, top 1200×750)
 *   2. Copy a block below, fill it in, and the whole section renders itself.
 *   3. Only set `repo` when the repository is public. A private repo link 404s for visitors.
 */

export type ProjectShot = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type Project = {
  /** Zero-padded index shown as the case-study number, e.g. "01" */
  index: string;
  slug: string;
  name: string;
  /** One line under the name — who the client is */
  client: string;
  /**
   * The commercial job of the site, in a few words.
   * This is what separates the projects: enquiries, portfolio, ordering.
   */
  purpose: string;
  /** The sentence that sits beside the big number */
  headline: string;
  /** Two short paragraphs: the brief, then what was built */
  body: string[];
  /** Shown as a labelled grid — the things worth pointing at */
  highlights: { label: string; detail: string }[];
  /** Mono chips under the mockup */
  stack: string[];
  year: string;
  live: string;
  /** Public repository only. Omit when the repo is private. */
  repo?: string;
  /** Accent used for this case study's glow and rules */
  accent: string;
  shots: {
    desktop: ProjectShot;
    mobile: ProjectShot;
    /** Cropped homepage, used in the hero filmstrip */
    top: ProjectShot;
  };
};

export const projects: Project[] = [
  {
    index: "01",
    slug: "weejob-joinery",
    name: "WeeJob Joinery",
    client: "Joiner · Crieff, Perthshire",
    purpose: "Built for enquiries",
    headline:
      "A one-page site built to turn a phone full of job photos into enquiries.",
    body: [
      "WeeJob is a joiner who takes the jobs bigger firms turn down. The site had to say that in the first second, and then make it effortless to get in touch — most visitors arrive on a phone, standing in the room that needs the work.",
      "It is a single page, hand-built with no framework and no dependencies, so it loads almost instantly. The enquiry form takes photos of the job straight from the camera roll, and a sticky call bar follows the visitor down the page.",
    ],
    highlights: [
      {
        label: "Photo enquiry form",
        detail:
          "Multiple job photos upload with the enquiry. Submits without a page reload, and still works with JavaScript switched off.",
      },
      {
        label: "Built for local search",
        detail:
          "LocalBusiness and FAQ structured data, canonical URLs, sitemap and Open Graph tags — so it can rank for the towns it covers.",
      },
      {
        label: "Fast on mobile data",
        detail:
          "Every photo served as WebP with a JPEG fallback, and a sticky call button that never leaves the screen.",
      },
      {
        label: "Brand from the logo out",
        detail:
          "Navy, cream and gold sampled from the client's own logo, with the gold rationed so it still means something.",
      },
    ],
    stack: ["HTML", "CSS", "Vanilla JS", "Vercel"],
    year: "2026",
    live: "https://weejob-joinery.vercel.app",
    accent: "#E0B871",
    shots: {
      desktop: {
        src: "/work/weejob-desktop.webp",
        width: 1440,
        height: 4500,
        alt: "The WeeJob Joinery homepage on desktop, showing the navy hero with the headline 'No job too wee' beside a photo of a red timber door",
      },
      mobile: {
        src: "/work/weejob-mobile.webp",
        width: 780,
        height: 6800,
        alt: "The WeeJob Joinery homepage on a phone, with the hero headline, quote button and services stacked in a single column",
      },
      top: {
        src: "/work/weejob-top.webp",
        width: 1200,
        height: 750,
        alt: "The WeeJob Joinery homepage, a navy hero with the headline 'No job too wee' beside a photograph of a red timber door",
      },
    },
  },
  {
    index: "02",
    slug: "brock-contracts",
    name: "Brock Contracts",
    client: "Joiners & building contractors · Crieff",
    purpose: "Built to show the work",
    headline:
      "A project portfolio the client can add to themselves, without touching the design.",
    body: [
      "Brock Contracts are third-generation joiners and building contractors. The work is the sales pitch, so the site is built around a growing portfolio of finished projects rather than a list of services.",
      "Adding a project means dropping photos in a folder and filling in one block in a single data file. The homepage preview, the filterable projects index and every individual project page all build themselves from it.",
    ],
    highlights: [
      {
        label: "One file to update",
        detail:
          "Every project page, card and category filter reads from a single data file. No CMS to pay for, no build step to run.",
      },
      {
        label: "Filterable project index",
        detail:
          "Categories appear as filter buttons only once a project uses them, so the page never shows an empty tab.",
      },
      {
        label: "Photography-led design",
        detail:
          "Full-bleed hero photography behind a scrim, a gallery lightbox with captions, and a graceful placeholder wherever a photo has not been added yet.",
      },
      {
        label: "Considered typography",
        detail:
          "A fluid type scale with no breakpoint jumps, generous spacing, and contrast checked to WCAG AA throughout.",
      },
    ],
    stack: ["HTML", "CSS", "Vanilla JS", "Vercel"],
    year: "2026",
    live: "https://brock-contracts-website.vercel.app",
    repo: "https://github.com/charliebrock2004/brock-contracts-website",
    accent: "#B9C3D1",
    shots: {
      desktop: {
        src: "/work/brock-desktop.webp",
        width: 1440,
        height: 4500,
        alt: "The Brock Contracts homepage on desktop, with an aerial photograph of a completed new build behind the headline 'Quality craftsmanship, built to last'",
      },
      mobile: {
        src: "/work/brock-mobile.webp",
        width: 780,
        height: 6800,
        alt: "The Brock Contracts homepage on a phone, showing the photographic hero and stacked service cards",
      },
      top: {
        src: "/work/brock-top.webp",
        width: 1200,
        height: 750,
        alt: "The Brock Contracts homepage, an aerial photograph of a completed new build behind the headline 'Quality craftsmanship, built to last'",
      },
    },
  },
  {
    index: "03",
    slug: "timber-and-flame",
    name: "Timber & Flame",
    client: "Firewood supplier · Crieff, Perthshire",
    purpose: "Built to take orders",
    headline:
      "A working shop for a local firewood business — prices, delivery and a real order, not a brochure.",
    body: [
      "Timber & Flame sells seasoned firewood, kindling, road salt and pickup loads around Crieff, and already runs an honesty stand. The site had to make the prices obvious, explain delivery without a phone call, and let someone place an order — without pretending the stand had stopped mattering.",
      "Customers add a bag or a load to a basket, check a postcode, and place the order in three steps. It is saved, numbered and emailed to the business and the customer. Nothing is paid on the site: order now, settle later, which is how a supplier this size actually sells. Prices, photos and delivery zones are changed in a private admin, and the server recalculates every total.",
    ],
    highlights: [
      {
        label: "A real ordering flow",
        detail:
          "Shop, basket and a three-step checkout — your details, delivery, then review. The confirmation says the order was received. It never says it was paid.",
      },
      {
        label: "Delivery that doesn't guess",
        detail:
          "A Crieff postcode shows delivery included. Outside Crieff the charge is left to be confirmed, not invented. The basket and the server use the same rule.",
      },
      {
        label: "The honesty stand, explained",
        detail:
          "What is stocked, how to pay at the stand, and a clear line that stand prices are separate from an online order.",
      },
      {
        label: "The owner can run it",
        detail:
          "Products, prices, photos, delivery zones and order status live in a private admin. Change a price there and the next order uses it.",
      },
    ],
    stack: ["Next.js", "TypeScript", "Postgres", "Vercel"],
    year: "2026",
    live: "https://timber-and-flame-1.vercel.app",
    repo: "https://github.com/charliebrock2004/timber-and-flame-",
    accent: "#E08A62",
    shots: {
      desktop: {
        src: "/work/timber-desktop.webp",
        width: 1440,
        height: 4500,
        alt: "The Timber & Flame homepage on desktop, with the flame logo and a photograph of the honesty stand, then firewood, kindling and road salt priced per bag with add-to-basket controls",
      },
      mobile: {
        src: "/work/timber-mobile.webp",
        width: 780,
        height: 10128,
        alt: "The Timber & Flame homepage on a phone, opening with the flame logo and a shop button, then seasoned firewood at £10 a bag with a live line total and an add-to-basket button",
      },
      top: {
        src: "/work/timber-top.webp",
        width: 1200,
        height: 750,
        alt: "The Timber & Flame homepage hero, with the flame logo, the line Quality Wood, Honest Prices, and bagged firewood stacked in the honesty stand",
      },
    },
  },
];
