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
      } else if (href.startsWith("#")) {
        assert.ok(ownIds.has(href.slice(1)), `"${text}" → ${href} has no target on this page`);
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
