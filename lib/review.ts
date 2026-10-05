/**
 * THE FREE ONLINE BUSINESS REVIEW — copy and data for /free-online-review.
 *
 * The page, its structured data and its tests all read from here, so the
 * offer is described once. Prices come from lib/pricing.ts, never retyped.
 */

import { extras, formatExtra, gbp } from "@/lib/pricing";

export const reviewPath = "/free-online-review";

/** The primary call to action, word for word, wherever it appears. */
export const reviewCta = "Get My Free Online Review";

export const reviewHeadline = {
  lead: "Is your business doing",
  accent: "enough online?",
};

export const reviewSubheadline =
  "Get a free review of your website, Google presence, social media and overall online visibility — with a clear plan showing what I’d improve and what it could cost.";

export const reviewTitle =
  "Free Online Business Review — PeakSwift Studios, Perthshire";
export const reviewDescription =
  "Free online business review from PeakSwift Studios: your website, Google presence and social media checked, with a clear plan and quote. No obligation.";

export const reviewTrust = [
  "Free, with no obligation to buy",
  "Honest, practical findings",
  "A clear quote only if you want help",
];

/* The nav on this page: sections of the page itself, plus the portfolio. */
export const reviewNav = [
  { label: "What I review", href: "#review-areas" },
  { label: "Example report", href: "#example" },
  { label: "How it works", href: "#how" },
  { label: "FAQ", href: "#faq" },
  { label: "Our work", href: "/#work" },
];

/* ------------------------------------------------------------- areas --- */

export type Area = {
  title: string;
  copy: string;
  /** Inner SVG markup for a 24×24 stroke icon */
  icon: string;
};

/** Eight cards covering every area of the review. */
export const areas: Area[] = [
  {
    title: "Your website",
    copy: "Design, content and clarity — does a stranger understand what you do, and trust you, within a few seconds?",
    icon: '<rect x="3" y="4.5" width="18" height="14" rx="2"/><path d="M3 9.5h18"/>',
  },
  {
    title: "The mobile experience",
    copy: "How it looks and works on a phone, which is where most local customers find you.",
    icon: '<rect x="7" y="2.5" width="10" height="19" rx="2"/><path d="M11 18.5h2"/>',
  },
  {
    title: "Speed and performance",
    copy: "How quickly pages load, especially on mobile data, and what is slowing them down.",
    icon: '<path d="M4 17a8 8 0 1 1 16 0"/><path d="m12 17 4-5"/>',
  },
  {
    title: "SEO and Google visibility",
    copy: "Whether people searching for what you do can find you, and what is getting in the way.",
    icon: '<circle cx="11" cy="11" r="6"/><path d="m20 20-4.2-4.2"/>',
  },
  {
    title: "Local search and Google Business Profile",
    copy: "Your Maps listing, your local rankings and whether the details customers see are right.",
    icon: '<path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z"/><circle cx="12" cy="11" r="2"/>',
  },
  {
    title: "Reviews and online trust",
    copy: "Customer reviews, and every other signal that makes a new customer feel safe getting in touch.",
    icon: '<path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.8l-5.2 2.8 1-5.8-4.3-4.1 5.9-.9Z"/>',
  },
  {
    title: "Social media and branding",
    copy: "Whether your social presence is active, consistent and professional alongside the rest of your business.",
    icon: '<circle cx="6" cy="12" r="2.3"/><circle cx="18" cy="6" r="2.3"/><circle cx="18" cy="18" r="2.3"/><path d="m8 11 8-4M8 13l8 4"/>',
  },
  {
    title: "Calls to action and enquiries",
    copy: "How easy it is to call, message or ask for a quote — and where enquiries are being missed.",
    icon: '<path d="M4 5.5h16v10.5H10l-4.5 4v-4H4Z"/>',
  },
];

/* ---------------------------------------------------- what you receive --- */

export const deliverables = [
  {
    title: "What you’re already doing well",
    copy: "Honest credit for what is working, so you keep doing it.",
  },
  {
    title: "What’s holding you back",
    copy: "The specific things costing you visibility, trust or enquiries.",
  },
  {
    title: "Your biggest opportunities",
    copy: "Where a little effort is most likely to bring more customers.",
  },
  {
    title: "What I’d do first",
    copy: "One clear starting point, rather than a list of everything.",
  },
  {
    title: "A prioritised action plan",
    copy: "The steps in order, with an idea of effort, so you can act on them yourself or with anyone you like.",
  },
  {
    title: "A quote for the work",
    copy: "If you’d like PeakSwift to do any of it, a clear price. If you wouldn’t, you simply keep the plan.",
  },
];

/* ------------------------------------------------------------- steps --- */

export const steps = [
  {
    title: "Tell me about your business",
    copy: "Fill in the short form with your website and any social pages.",
  },
  {
    title: "I review your online presence",
    copy: "I look at your website, Google, social media and reviews the way a customer would.",
  },
  {
    title: "I identify the opportunities",
    copy: "What’s working, what’s not, and where the biggest gains are.",
  },
  {
    title: "I send your personalised plan",
    copy: "A clear breakdown and a prioritised action plan, written for a business owner.",
  },
  {
    title: "A clear quote, if you want it",
    copy: "If you’d like me to do the work, I’ll quote for it. If not, there’s nothing to pay.",
  },
];

/* ----------------------------------------------------- example report --- */

/* Scores are the studio's own judgement, shown to explain how the review
   reads. They are not an official rating from Google or any SEO tool. */
export const exampleReport = {
  business: "Example business",
  detail: "Local trades · Perth",
  overall: 72,
  scores: [
    { label: "Website", value: 78 },
    { label: "Google", value: 61 },
    { label: "Social media", value: 74 },
    { label: "SEO", value: 58 },
    { label: "Conversion", value: 69 },
  ],
  /* Weakest areas are flagged as the place to start */
  focus: ["SEO", "Google"],
  doingWell: [
    "Phone number is easy to find on mobile",
    "Branding is consistent across the website and Facebook",
    "Recent customer reviews are positive",
  ],
  holdingBack: [
    "Google Business Profile is missing opening hours and service areas",
    "There is no separate page for each service offered",
    "The enquiry form sits three clicks from the home page",
  ],
  plan: [
    { step: "Complete the Google Business Profile", effort: "Quick win" },
    {
      step: "Add a “Request a quote” button to every page",
      effort: "Quick win",
    },
    {
      step: "Compress the large images slowing down mobile",
      effort: "Small job",
    },
    { step: "Build a page for each main service", effort: "Larger project" },
  ],
};

const gbp1 = extras.find((e) => e.slug === "google-business-profile")!;
const seo1 = extras.find((e) => e.slug === "local-seo")!;

/** The example quote, built from the real price list so it can't drift. */
export const exampleQuote = {
  lines: [
    { label: gbp1.name, price: formatExtra(gbp1) },
    { label: seo1.name, price: formatExtra(seo1) },
  ],
  total: `From ${gbp(gbp1.price + seo1.price)}`,
};

export const exampleNote =
  "An example for a fictional business. Scores are my own judgement, there to show you where to focus — they aren’t an official Google or SEO-tool rating.";

/* --------------------------------------------------------- why us --- */

export const pillars = [
  {
    title: "Web design",
    copy: "Sites designed and coded from scratch, built to be fast and to turn visits into enquiries.",
  },
  {
    title: "SEO and local search",
    copy: "Helping the right people find you on Google and Maps when they search for what you do.",
  },
  {
    title: "AI",
    copy: "Modern AI tools used where they save time and sharpen the analysis. The judgement and the advice stay human.",
  },
  {
    title: "Digital strategy",
    copy: "Looking at the whole picture, so effort goes where it will make the most difference first.",
  },
];

/* ----------------------------------------------------------------- faq --- */

export const faqs = [
  {
    q: "Is the review really free?",
    a: "Yes. The review is free and there is no obligation to buy anything — now or afterwards. If you’d like help with what I find, I’ll give you a clear quote. If you wouldn’t, you keep the plan and can use it however you like.",
  },
  {
    q: "Will I just be pushed into buying a new website?",
    a: "No. This isn’t a website pitch. The review looks at your whole online presence, and the biggest gain is often something smaller, like a better Google Business Profile or a simple way to ask for a quote. If a new website isn’t what you need, I’ll say so.",
  },
  {
    q: "What do I need to give you?",
    a: "Your name, business name, email, a link to your website and any social pages, what your business does and where it is. A phone number and a note about what you’d most like to improve are optional. No website yet? Tell me, and I’ll review what you do have.",
  },
  {
    q: "Do you only work with businesses in Perthshire?",
    a: "I’m based in Crieff, Perthshire, and work with local businesses in Perth, across Scotland and throughout the UK. Everything is done online, so where you are rarely matters.",
  },
  {
    q: "What happens to my details?",
    a: "They’re used to prepare your review and to reply to you, and for nothing else.",
  },
];
