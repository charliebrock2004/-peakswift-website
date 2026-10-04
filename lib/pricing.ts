/**
 * PRICING — the single source for every price and pricing condition on the
 * site. The home page pricing section, the /pricing page, the enquiry form's
 * package list and the structured data all read from here, so a price or a
 * line of terms only ever needs changing once.
 */

export type Package = {
  slug: string;
  name: string;
  price: number;
  subtitle: string;
  features: string[];
  cta: string;
  recommended?: boolean;
};

export type Extra = {
  slug: string;
  name: string;
  price: number;
  from?: boolean;
  unit?: "each" | "month";
};

export type CarePlan = {
  slug: string;
  name: string;
  price: number;
  summary: string;
  features: string[];
  cta: string;
};

export const packages: Package[] = [
  {
    slug: "starter",
    name: "Starter Website",
    price: 249,
    subtitle: "Perfect for small businesses and sole traders.",
    features: [
      "Up to 3 professionally designed pages",
      "Mobile-friendly responsive design",
      "Contact information and enquiry buttons",
      "Basic SEO setup",
      "Social media integration",
      "Google Maps integration",
      "One round of revisions",
    ],
    cta: "Choose Starter",
  },
  {
    slug: "business",
    name: "Business Website",
    price: 399,
    subtitle: "Everything your business needs to stand out online.",
    features: [
      "Up to 5 custom-designed pages",
      "Premium responsive design",
      "Contact and enquiry forms",
      "SEO foundations",
      "Portfolio or image gallery",
      "Google Maps integration",
      "Google Analytics setup",
      "Social media integration",
      "Two rounds of revisions",
    ],
    cta: "Choose Business",
    recommended: true,
  },
  {
    slug: "premium",
    name: "Premium Website",
    price: 599,
    subtitle: "A bespoke website for businesses wanting more.",
    features: [
      "Up to 8 custom-designed pages",
      "Bespoke website design",
      "Advanced contact forms",
      "Portfolio and gallery features",
      "Enhanced SEO setup",
      "Performance optimisation",
      "Google Analytics integration",
      "Custom animations and interactions",
      "Three rounds of revisions",
    ],
    cta: "Choose Premium",
  },
];

export const extras: Extra[] = [
  { slug: "landing-page", name: "Single-page landing website", price: 149 },
  { slug: "redesign", name: "Website redesign", price: 199, from: true },
  { slug: "logo", name: "Logo design", price: 49, from: true },
  {
    slug: "google-business-profile",
    name: "Google Business Profile setup",
    price: 49,
  },
  { slug: "basic-seo", name: "Basic SEO setup", price: 75, from: true },
  {
    slug: "business-email",
    name: "Business email setup",
    price: 35,
    from: true,
  },
  {
    slug: "extra-pages",
    name: "Additional website pages",
    price: 40,
    unit: "each",
  },
  {
    slug: "maintenance",
    name: "Website maintenance",
    price: 25,
    from: true,
    unit: "month",
  },
  { slug: "online-shop", name: "Online shop websites", price: 699, from: true },
  { slug: "booking", name: "Booking websites", price: 499, from: true },
  { slug: "audit", name: "Website audit", price: 49 },
  {
    slug: "local-seo",
    name: "Local SEO improvement package",
    price: 149,
    from: true,
  },
];

export const carePlans: CarePlan[] = [
  {
    slug: "basic-care",
    name: "Basic Care",
    price: 25,
    summary: "Keeps the site running and up to date.",
    features: [
      "Website uptime checks",
      "Technical maintenance",
      "Dependency updates where applicable",
      "Basic technical support",
    ],
    cta: "Choose Basic Care",
  },
  {
    slug: "standard-care",
    name: "Standard Care",
    price: 40,
    summary: "For sites that change now and then.",
    features: [
      "Everything in Basic Care",
      "Up to 30 minutes of small website content updates monthly",
      "Ongoing website checks",
    ],
    cta: "Choose Standard Care",
  },
  {
    slug: "premium-care",
    name: "Premium Care",
    price: 60,
    summary: "For businesses that update often.",
    features: [
      "Everything in Standard Care",
      "Up to 1 hour of website updates monthly",
      "Priority support",
    ],
    cta: "Choose Premium Care",
  },
];

/* ------------------------------------------------------------ wording --- */

export const introNotice = {
  title: "Introductory pricing",
  body: "We’re currently welcoming our first clients and offering special launch prices while building our portfolio. Get in touch to secure your website at our introductory rates.",
};

/* Shown beneath pricing wherever it appears. Keep it word-for-word. */
export const pricingTerms =
  "All prices are introductory starting prices. Final project costs depend on requirements and functionality. A 50% deposit is required to secure a project, with the remaining balance due before launch. Domain, hosting and third-party subscription fees are quoted separately unless otherwise agreed.";

export const careTerms =
  "Care plans are monthly. Domain registration, hosting and third-party subscription costs are separate unless otherwise agreed. Update time is the monthly allowance shown — plans do not include unlimited updates or support, and anything beyond the allowance is quoted before it is done.";

/* ------------------------------------------------------------ helpers --- */

export const gbp = (n: number) => `£${n.toLocaleString("en-GB")}`;

export function formatExtra(extra: Extra) {
  const unit =
    extra.unit === "month" ? "/month" : extra.unit === "each" ? " each" : "";
  return `${extra.from ? "From " : ""}${gbp(extra.price)}${unit}`;
}

export const lowestPackagePrice = Math.min(...packages.map((p) => p.price));

/** Everything a visitor can pick in the enquiry form, grouped, with prices. */
export const enquiryOptions = [
  {
    group: "Website packages",
    items: packages.map((p) => ({
      slug: p.slug,
      label: `${p.name} — ${gbp(p.price)}`,
    })),
  },
  {
    group: "Additional services",
    items: extras.map((e) => ({
      slug: e.slug,
      label: `${e.name} — ${formatExtra(e)}`,
    })),
  },
  {
    group: "Monthly care plans",
    items: carePlans.map((c) => ({
      slug: c.slug,
      label: `${c.name} — ${gbp(c.price)}/month`,
    })),
  },
  {
    group: "Something else",
    items: [{ slug: "not-sure", label: "Not sure yet — I'd like some advice" }],
  },
];

export const enquirySlugs = enquiryOptions.flatMap((g) =>
  g.items.map((i) => i.slug),
);

/** The link a "Choose …" button uses: this page's enquiry section, preselected. */
export const chooseHref = (slug: string) => `?package=${slug}#contact`;
