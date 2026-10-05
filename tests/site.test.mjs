/**
 * Checks the site as it is actually shipped: the prerendered HTML that
 * `next build` writes to .next/server/app, plus the source it came from.
 *
 *   npm test        (runs `next build` first, then these checks)
 *
 * Node's built-in test runner only — no test dependencies to install.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const built = join(root, ".next", "server", "app");

if (!existsSync(join(built, "index.html"))) {
  throw new Error("No production build found — run `npm run build` first.");
}

const read = (...p) => readFileSync(join(...p), "utf8");
const pages = {
  home: read(built, "index.html"),
  notFound: read(built, "_not-found.html"),
  pricing: read(built, "pricing.html"),
  review: read(built, "free-online-review.html"),
};

/* The configured enquiry address, read straight from the config file so the
   test can never disagree with what the site renders. */
const siteSource = read(root, "lib", "site.ts");
const emailMatch = siteSource.match(/^\s*email:\s*(?:"([^"]+)"|null)/m);
assert.ok(emailMatch, "lib/site.ts must declare `email` as a string or null");
const configuredEmail = emailMatch[1] ?? null;
const siteUrl = siteSource.match(/^\s*url:\s*"([^"]+)"/m)[1];

/* ------------------------------------------------------------ helpers --- */

const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"');

/** Every <a> in the page, as { href, text, attrs }. */
function links(html) {
  return [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)].map((m) => ({
    attrs: m[1],
    href: decode(m[1].match(/\bhref="([^"]*)"/)?.[1] ?? ""),
    text: decode(m[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()),
  }));
}

const ids = (html) => new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]));

function sourceFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return sourceFiles(path);
    return /\.(tsx?|mjs|css|md)$/.test(name) ? [path] : [];
  });
}

/* ------------------------------------------------- contact destinations --- */

test("no Brock Contracts contact details anywhere in the source", () => {
  const files = [
    ...["app", "components", "lib"].flatMap((d) => sourceFiles(join(root, d))),
    join(root, "README.md"),
  ];
  for (const file of files) {
    const text = readFileSync(file, "utf8");
    assert.doesNotMatch(text, /brockcontracts@/i, `${file} contains the Brock Contracts inbox`);
    assert.doesNotMatch(text, /mailto:[^"'\s]*brock/i, `${file} has a mailto to Brock Contracts`);
  }
});

test("the configured address is not another business's inbox", () => {
  if (configuredEmail === null) return;
  assert.match(configuredEmail, /^[^@\s]+@[^@\s]+\.[^@\s]+$/, "email is not a valid address");
  assert.doesNotMatch(configuredEmail, /brock/i, "email must be a PeakSwift address");
});

for (const [name, html] of Object.entries(pages)) {
  test(`${name}: no Brock Contracts address in the rendered page`, () => {
    assert.doesNotMatch(html, /brockcontracts@/i);
  });

  test(`${name}: every mailto goes to the configured PeakSwift address`, () => {
    const mailtos = links(html).filter((l) => l.href.startsWith("mailto:"));
    if (configuredEmail === null) {
      assert.deepEqual(mailtos, [], "no mailto links should render until an email is set");
      return;
    }
    for (const l of mailtos) {
      assert.equal(l.href.slice(7).split("?")[0], configuredEmail, `"${l.text}" → ${l.href}`);
    }
  });

  test(`${name}: every project call to action leads to the enquiry section`, () => {
    const ctas = links(html).filter((l) =>
      /let's build something|start a project|start with step one|not sure which you need/i.test(l.text),
    );
    assert.ok(ctas.length > 0, "expected at least one project CTA");
    for (const l of ctas) assert.equal(l.href, "/#contact", `"${l.text}" → ${l.href}`);
  });
}

test("home: every 'Let's build something' button is present and wired up", () => {
  const buttons = links(pages.home).filter((l) => /let's build something/i.test(l.text));
  assert.ok(buttons.length >= 2, `found ${buttons.length}`);
  assert.ok(ids(pages.home).has("contact"), "the #contact section must exist");
});

/* ------------------------------------------------------------- links --- */

for (const [name, html] of Object.entries(pages)) {
  test(`${name}: every in-page and home-page anchor resolves`, () => {
    const homeIds = ids(pages.home);
    const ownIds = ids(html);
    for (const { href, text } of links(html)) {
      if (href.startsWith("/#")) {
        assert.ok(homeIds.has(href.slice(2)), `"${text}" → ${href} has no target on /`);
      } else if (href.startsWith("#") || href.startsWith("?")) {
        const id = href.split("#")[1];
        assert.ok(id && ownIds.has(id), `"${text}" → ${href} has no target on this page`);
      } else if (href.startsWith("/") && !href.startsWith("//")) {
        const route = href.split(/[?#]/)[0];
        const file = route === "/" ? "index.html" : `${route.slice(1)}.html`;
        assert.ok(existsSync(join(built, file)), `"${text}" → ${href}: no page at ${route}`);
      }
    }
  });

  test(`${name}: no empty or placeholder links`, () => {
    for (const { href, text } of links(html)) {
      assert.ok(href && href !== "#" && !href.startsWith("javascript:"), `"${text}" → "${href}"`);
    }
  });

  test(`${name}: links that open a new tab are rel=noopener`, () => {
    for (const { attrs, href } of links(html)) {
      if (/target="_blank"/.test(attrs)) assert.match(attrs, /rel="[^"]*noopener/, href);
    }
  });

  test(`${name}: every local asset referenced exists in /public`, () => {
    const refs = [...html.matchAll(/(?:src|href)="(\/(?:brand|work)\/[^"?]+)"/g)].map((m) => m[1]);
    const optimised = [...html.matchAll(/url=(%2F(?:brand|work)%2F[^&"]+)/g)].map((m) =>
      decodeURIComponent(m[1]),
    );
    for (const ref of new Set([...refs, ...optimised])) {
      assert.ok(existsSync(join(root, "public", ref)), `missing ${ref}`);
    }
  });

  test(`${name}: every image has an alt attribute`, () => {
    for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) {
      assert.match(tag, /\balt="/, tag.slice(0, 120));
    }
  });

  test(`${name}: one h1, and heading levels never skip`, () => {
    const levels = [...html.matchAll(/<h([1-6])\b/g)].map((m) => Number(m[1]));
    assert.equal(levels.filter((l) => l === 1).length, 1);
    levels.reduce((prev, level) => {
      assert.ok(level <= prev + 1, `h${prev} followed by h${level}`);
      return level;
    }, 1);
  });
}

test("project links point at the real live sites", () => {
  const projectsSource = read(root, "lib", "projects.ts");
  const live = [...projectsSource.matchAll(/live:\s*"([^"]+)"/g)].map((m) => m[1]);
  assert.ok(live.length > 0);
  for (const url of live) {
    assert.match(url, /^https:\/\//);
    assert.ok(pages.home.includes(`href="${url}"`), `${url} is not linked from the home page`);
  }
});

/* --------------------------------------------------------------- SEO --- */

test("home: title, description, canonical and social cards are set", () => {
  const title = pages.home.match(/<title>([^<]+)<\/title>/)?.[1];
  const description = pages.home.match(/<meta name="description" content="([^"]+)"/)?.[1];
  assert.ok(title && decode(title).length <= 60, `title: ${title}`);
  assert.ok(description && description.length >= 70 && description.length <= 160, `description: ${description}`);
  assert.match(pages.home, new RegExp(`<link rel="canonical" href="${siteUrl}/?"`));
  for (const tag of ["og:title", "og:description", "og:image", "og:url"]) {
    assert.match(pages.home, new RegExp(`property="${tag}"`), tag);
  }
  assert.match(pages.home, /name="twitter:image"/);
  assert.match(pages.home, /<html lang="en-GB"/);
});

test("home: structured data is valid JSON and matches the config", () => {
  const raw = pages.home.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
  assert.ok(raw, "missing JSON-LD");
  const data = JSON.parse(raw);
  const business = data["@graph"].find((n) => n["@type"] === "ProfessionalService");
  assert.equal(business.email, configuredEmail ?? undefined);
});

test("404 is not indexed; robots and sitemap point at the live origin", () => {
  assert.match(pages.notFound, /<meta name="robots" content="noindex/);
  assert.match(read(built, "robots.txt.body"), new RegExp(`Sitemap: ${siteUrl}/sitemap.xml`));
  assert.match(read(built, "sitemap.xml.body"), new RegExp(`<loc>${siteUrl}/?</loc>`));
});

/* ----------------------------------------------------------- pricing --- */

/* The brief, as agreed. If a price changes in lib/pricing.ts, change it here
   too — this is the check that the site says what the business intends. */
const PACKAGES = [
  { slug: "starter", name: "Starter Website", price: "£249", cta: "Choose Starter" },
  { slug: "business", name: "Business Website", price: "£399", cta: "Choose Business" },
  { slug: "premium", name: "Premium Website", price: "£599", cta: "Choose Premium" },
];
const EXTRAS = [
  ["Single-page landing website", "£149"],
  ["Website redesign", "From £199"],
  ["Logo design", "From £49"],
  ["Google Business Profile setup", "£49"],
  ["Basic SEO setup", "From £75"],
  ["Business email setup", "From £35"],
  ["Additional website pages", "£40 each"],
  ["Website maintenance", "From £25/month"],
  ["Online shop websites", "From £699"],
  ["Booking websites", "From £499"],
  ["Website audit", "£49"],
  ["Local SEO improvement package", "From £149"],
];
const CARE = [
  { slug: "basic-care", name: "Basic Care", price: "£25", cta: "Choose Basic Care" },
  { slug: "standard-care", name: "Standard Care", price: "£40", cta: "Choose Standard Care" },
  { slug: "premium-care", name: "Premium Care", price: "£60", cta: "Choose Premium Care" },
];
const INTRO =
  "We’re currently welcoming our first clients and offering special launch prices while building our portfolio. Get in touch to secure your website at our introductory rates.";
const TERMS =
  "All prices are introductory starting prices. Final project costs depend on requirements and functionality. A 50% deposit is required to secure a project, with the remaining balance due before launch. Domain, hosting and third-party subscription fees are quoted separately unless otherwise agreed.";

/** Visible text with tags removed, so split-up figures like £<span>399 join up. */
const text = (html) =>
  decode(
    html
      .replace(/<script[\s\S]*?<\/script>/g, " ")
      .replace(/<style[\s\S]*?<\/style>/g, " ")
      .replace(/<(p|li|h[1-6]|div|section|option|a|button|dt|dd)\b[^>]*>/g, " ")
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " "),
  );

const options = (html) =>
  new Set([...html.matchAll(/<option\b[^>]*value="([^"]+)"/g)].map((m) => m[1]));

for (const name of ["home", "pricing"]) {
  const html = pages[name];
  const visible = text(html);

  test(`${name}: all three packages show the agreed name and price`, () => {
    for (const p of PACKAGES) {
      assert.ok(visible.includes(p.name), `${p.name} missing`);
      assert.ok(visible.includes(p.price), `${p.price} missing`);
    }
    assert.equal(visible.match(/Recommended/g)?.length, 1, "exactly one package is recommended");
    const recommended = visible.slice(visible.indexOf("Business Website"), visible.indexOf("Premium Website"));
    assert.match(recommended, /Recommended/, "the Business package is the recommended one");
  });

  test(`${name}: every Choose button preselects its option in this page's enquiry form`, () => {
    const all = name === "pricing" ? [...PACKAGES, ...CARE] : PACKAGES;
    const formOptions = options(html);
    assert.ok(ids(html).has("contact"), "no enquiry section on this page");
    for (const item of all) {
      const button = links(html).find((l) => l.text.startsWith(item.cta));
      assert.ok(button, `no "${item.cta}" button`);
      assert.equal(button.href, `?package=${item.slug}#contact`);
      assert.ok(formOptions.has(item.slug), `the form has no "${item.slug}" option`);
    }
  });

  test(`${name}: introductory notice and terms appear word for word`, () => {
    assert.ok(visible.includes(INTRO), "introductory pricing notice missing or reworded");
    assert.ok(visible.includes(TERMS), "pricing terms missing or reworded");
  });

  test(`${name}: nothing promises unlimited updates or support`, () => {
    for (const m of visible.matchAll(/unlimited/gi)) {
      const before = visible.slice(Math.max(0, m.index - 20), m.index);
      assert.match(before, /not include $/, `"…${before}unlimited…"`);
    }
  });
}

test("home: links to pricing from the hero and to the full pricing page", () => {
  const all = links(pages.home);
  assert.ok(all.some((l) => l.text === "View pricing" && l.href === "#pricing"), "hero View pricing");
  assert.ok(all.some((l) => l.href === "/pricing"), "link to /pricing");
  assert.ok(all.some((l) => l.text === "Pricing" && l.href === "/#pricing"), "nav Pricing");
});

test("pricing: every additional service and care plan is listed with its price", () => {
  const visible = text(pages.pricing);
  /* Search from the services list, since some names also appear in packages */
  const from = visible.indexOf("Additional services");
  for (const [service, price] of EXTRAS) {
    const at = visible.indexOf(service, from);
    assert.ok(at >= 0, `${service} missing`);
    assert.ok(visible.slice(at, at + service.length + 30).includes(price), `${service} should be ${price}`);
  }
  for (const plan of CARE) {
    const at = visible.indexOf(plan.name);
    assert.match(visible.slice(at, at + 120), new RegExp(`${plan.price}\\s*/\\s*month`), `${plan.name} should be ${plan.price}/month`);
  }
  assert.match(visible, /Domain registration, hosting and third-party subscription costs are separate unless otherwise agreed/);
});

test("pricing: page has its own title, description, canonical and sitemap entry", () => {
  const html = pages.pricing;
  const title = decode(html.match(/<title>([^<]+)<\/title>/)?.[1] ?? "");
  const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1] ?? "";
  assert.match(title, /Website Design Prices for Small Businesses/);
  assert.ok(title.length <= 65, `title too long: ${title.length}`);
  assert.ok(description.length >= 70 && description.length <= 160, `description: ${description.length}`);
  assert.match(html, new RegExp(`<link rel="canonical" href="${siteUrl}/pricing"`));
  assert.match(read(built, "sitemap.xml.body"), new RegExp(`<loc>${siteUrl}/pricing</loc>`));
});

test("structured data lists the package prices in GBP", () => {
  const raw = pages.pricing.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1];
  const business = JSON.parse(raw)["@graph"].find((n) => n["@type"] === "ProfessionalService");
  const offers = business.hasOfferCatalog.itemListElement;
  for (const p of PACKAGES) {
    const offer = offers.find((o) => o.name === p.name);
    assert.equal(`£${offer.price}`, p.price);
    assert.equal(offer.priceCurrency, "GBP");
  }
});

/* --------------------------------------------------- live enquiry form --- */

test("the enquiry address is the PeakSwift inbox and the form is live", () => {
  assert.equal(configuredEmail, "peakswiftstudio@gmail.com");
  for (const name of ["home", "pricing"]) {
    const html = pages[name];
    assert.doesNotMatch(html, /on its way|inbox is being set up|can(?:'|&#x27;)t be sent/i, `${name}: disabled-form message`);
    const button = html.match(/<button[^>]*type="submit"[^>]*>/)?.[0] ?? "";
    assert.ok(button && !/disabled/.test(button), `${name}: submit button is disabled`);
    assert.ok(links(html).some((l) => l.href.startsWith("mailto:peakswiftstudio@gmail.com")), `${name}: no mailto link`);
  }
});

/* ----------------------------------------------- free online review page --- */

const review = pages.review;
const reviewText = text(review);

test("review: headline, subheadline and primary CTA are as briefed", () => {
  assert.match(text(review.match(/<h1[\s\S]*?<\/h1>/)[0]), /^\s*Is your business doing enough online\?\s*$/);
  assert.ok(
    reviewText.includes("Get a free review of your website, Google presence, social media and overall online visibility — with a clear plan showing what I’d improve and what it could cost."),
    "subheadline missing or reworded",
  );
  const ctas = links(review).filter((l) => /^Get My Free Online Review/.test(l.text));
  assert.ok(ctas.length >= 5, `expected the CTA throughout the page, found ${ctas.length}`);
  for (const l of ctas) assert.equal(l.href, "#review", l.text);
});

test("review: every area, step and deliverable the brief asks for is present", () => {
  for (const area of [
    "Your website", "The mobile experience", "Speed and performance", "SEO and Google visibility",
    "Local search and Google Business Profile", "Reviews and online trust",
    "Social media and branding", "Calls to action and enquiries",
  ]) assert.ok(reviewText.includes(area), `review area missing: ${area}`);
  for (const step of [
    "Tell me about your business", "I review your online presence", "I identify the opportunities",
    "I send your personalised plan", "A clear quote, if you want it",
  ]) assert.ok(reviewText.includes(step), `step missing: ${step}`);
  for (const item of [
    "What you’re already doing well", "What’s holding you back", "Your biggest opportunities",
    "What I’d do first", "A prioritised action plan", "A quote for the work",
  ]) assert.ok(reviewText.includes(item), `deliverable missing: ${item}`);
});

test("review: the example report shows the briefed scores, labelled as an example", () => {
  assert.match(review, /aria-label="Online presence score: 72 out of 100"/);
  for (const [label, value] of [["Website", 78], ["Google", 61], ["Social media", 74], ["SEO", 58], ["Conversion", 69]]) {
    assert.match(reviewText, new RegExp(`${label}[^0-9]{0,20}${value}\\s*/100`), `${label} should be ${value}/100`);
  }
  assert.match(reviewText, /An example for a fictional business/);
  assert.match(reviewText, /aren’t an official Google or SEO-tool rating/);
});

test("review: the example quote uses the real price list", () => {
  assert.match(reviewText, /Google Business Profile setup\s*£49/);
  assert.match(reviewText, /Local SEO improvement package\s*From £149/);
  assert.match(reviewText, /From £198/);
});

test("review: honest positioning — free, no obligation, and no hype", () => {
  assert.match(reviewText, /no obligation/i);
  assert.match(reviewText, /Is the review really free\?/);
  assert.doesNotMatch(reviewText, /guarantee|10x|10 times|#1|number one|skyrocket|explode/i, "hype or guarantees on the page");
});

test("review: the form has every briefed field, correctly required", () => {
  const field = (id) => review.match(new RegExp(`<(?:input|textarea)[^>]*id="${id}"[^>]*>`))?.[0] ?? "";
  const required = { name: true, business: true, email: true, website: true, type: true, town: true, phone: false, social: false, improve: false };
  for (const [name, mustRequire] of Object.entries(required)) {
    const tag = field(`review-${name}`);
    assert.ok(tag, `missing field ${name}`);
    assert.match(tag, new RegExp(`name="${name}"`));
    assert.equal(/\brequired\b/.test(tag), mustRequire, `${name} required should be ${mustRequire}`);
    assert.match(review, new RegExp(`<label[^>]*for="review-${name}"`), `${name} has no label`);
  }
  assert.match(field("review-email"), /type="email"/);
});

test("review: only mailto is the PeakSwift inbox, and the form has a real submit button", () => {
  assert.ok(links(review).every((l) => !l.href.startsWith("mailto:") || l.href.startsWith("mailto:peakswiftstudio@gmail.com")));
  assert.match(review, /<button[^>]*type="submit"[^>]*>/);
  assert.doesNotMatch(review.match(/<button[^>]*type="submit"[^>]*>/)[0], /disabled/);
});

test("review: has its own title, description, canonical, social card and sitemap entry", () => {
  const title = decode(review.match(/<title>([^<]+)<\/title>/)?.[1] ?? "");
  const description = review.match(/<meta name="description" content="([^"]+)"/)?.[1] ?? "";
  assert.match(title, /Free Online Business Review/);
  assert.ok(title.length <= 62, `title ${title.length}: ${title}`);
  assert.ok(description.length >= 70 && description.length <= 160, `description ${description.length}`);
  assert.match(review, new RegExp(`<link rel="canonical" href="${siteUrl}/free-online-review"`));
  for (const tag of ["og:title", "og:description", "og:image", "og:url", "og:site_name"]) {
    assert.match(review, new RegExp(`property="${tag}"`), tag);
  }
  assert.match(review, /name="twitter:image"/);
  assert.match(read(built, "sitemap.xml.body"), new RegExp(`<loc>${siteUrl}/free-online-review</loc>`));
});

test("every page except home carries a complete social card", () => {
  for (const name of ["pricing", "review"]) {
    for (const tag of ["og:image", "og:site_name", "og:locale", "og:type"]) {
      assert.match(pages[name], new RegExp(`property="${tag}"`), `${name}: ${tag}`);
    }
  }
});

test("review: reaches the local-search terms naturally", () => {
  const all = `${reviewText} ${decode(review.match(/<title>([^<]+)<\/title>/)[1])}`.toLowerCase();
  for (const phrase of ["web design", "local business", "online business review", "seo", "google", "scotland", "perthshire", "perth"]) {
    assert.ok(all.includes(phrase), `"${phrase}" never appears`);
  }
  /* A keyword repeated this often would be stuffing, not writing */
  assert.ok((all.match(/web design/g) ?? []).length <= 6, "\"web design\" is repeated too often");
});

test("review: structured data holds a £0 Service and the FAQ", () => {
  const blocks = [...review.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
  const nodes = blocks.flatMap((b) => b["@graph"]);
  const service = nodes.find((n) => n["@type"] === "Service" && n.name === "Free Online Business Review");
  assert.equal(service.offers.price, 0);
  assert.equal(service.offers.priceCurrency, "GBP");
  const faq = nodes.find((n) => n["@type"] === "FAQPage");
  assert.ok(faq.mainEntity.length >= 4);
});

test("review: the header's call to action stays on this page", () => {
  const header = review.match(/<header[\s\S]*?<\/header>/)[0];
  assert.ok(links(header).some((l) => l.text === "Get my free review" && l.href === "#review"));
  assert.ok(!links(header).some((l) => l.href === "/#contact"), "header sends visitors back to the home page form");
});

test("the free review is linked from the footer, the sitemap and the home page", () => {
  assert.ok(links(pages.home).some((l) => l.href === "/free-online-review" && /Free online review/.test(l.text)), "footer link");
  assert.ok(links(pages.home).some((l) => l.href === "/free-online-review" && /free online review first/i.test(l.text)), "home page link");
});
