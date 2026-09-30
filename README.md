# PeakSwift

The PeakSwift Studios portfolio site — a showcase for the websites PeakSwift
has built, rather than a brochure about web design.

Built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS v4.
No animation library, no UI kit, no page builder — the scroll effects are a
single IntersectionObserver and one transform. Every route is statically
prerendered at build time, and the whole stylesheet is 8.7 kB gzipped.

---

## Running it

```sh
npm install
npm run dev      # http://localhost:3000
```

```sh
npm run build && npm start   # production build
```

## Deploying

Import the repository on Vercel. There is nothing to configure — Vercel detects
Next.js, runs `npm ci` against the committed lockfile, and every push to the
default branch redeploys.

**One thing to set before launch:** open `lib/site.ts` and change `url` to the
address the site is actually served from. It drives the canonical link, the
Open Graph tags, `sitemap.xml` and the JSON-LD block, so they all need to agree.

---

## The two files you'll actually edit

Almost everything on the page comes from these, so the layout never has to be
touched to change the content.

### `lib/site.ts`

Contact address, navigation, location, social links, and the deployed URL.

```ts
email: "brockcontracts@gmail.com",   // PLACEHOLDER — swap for the PeakSwift address
url: "https://peakswift-website-psi.vercel.app", // the live origin — canonical, Open Graph, sitemap
social: [],                          // add { label, href } and it appears in the footer
```

`email` is currently the Brock Contracts inbox, used as a stand-in. It is the
address behind every "Start a project" button, the contact line in the closing
panel and the footer, and the one in the structured data — changing this single
line changes all of them.

### `lib/projects.ts`

The featured work. Each project is one object, and the case-study section
renders itself from the list — add a third and it appears, correctly numbered,
with the layout alternating automatically.

```ts
{
  index: "03",
  slug: "some-project",
  name: "Some Project",
  client: "What they do · Where they are",
  headline: "One sentence on what the site had to achieve.",
  body: ["The brief.", "What was built."],
  highlights: [{ label: "...", detail: "..." }],   // aim for four
  stack: ["HTML", "CSS", "Vanilla JS", "Vercel"],
  year: "2026",
  live: "https://...",
  repo: "https://github.com/...", // omit if the repository is private
  accent: "#E0B871",        // tints that case study's glow, number and ticks
  shots: {
    desktop: { src: "/work/x-desktop.webp", width: 1440, height: 4500, alt: "..." },
    mobile:  { src: "/work/x-mobile.webp",  width: 780,  height: 6800, alt: "..." },
  },
}
```

### Adding the screenshots

The previews are real full-page screenshots, not mockup templates. Capture them
at **1440 wide** (desktop) and **390 wide** (mobile), crop to roughly 4500px and
6800px tall respectively, save as WebP into `public/work/`, and put the real
pixel dimensions in `shots`. The frame reads the aspect ratio from those numbers
to work out how far to scroll the image, so they need to be accurate.

Write the `alt` text as a description of the screenshot for someone who cannot
see it — it is read aloud, and it is the only description of the work they get.

---

## Dependencies

Everything is pinned to an exact version — no `^` ranges — so the build that
passes locally is the build Vercel runs. `npm audit` reports **0
vulnerabilities**.

- **`engines.node: >=20.9.0`** — Next 16's floor, stated explicitly so Vercel
  picks a compatible runtime instead of whatever its default happens to be.
- **`pnpm.onlyBuiltDependencies`** — an allowlist naming the only two packages
  here that ship native code (`@tailwindcss/oxide`, Tailwind's engine, and
  `sharp`, behind `next/image`). Neither runs an install script at their
  current versions, but if a package manager that blocks lifecycle scripts by
  default is ever used, exactly those two are permitted and nothing else.

When upgrading Tailwind, move `tailwindcss` and `@tailwindcss/postcss`
together. A version mismatch between them fails the CSS build with a confusing
`Missing field 'negated' on ScannerOptions.sources` error.

## How it's put together

```
app/
  layout.tsx            fonts, metadata, Open Graph, icons
  page.tsx              composes the sections
  globals.css           design tokens and the shared classes
  opengraph-image.tsx   the share card, generated from lib/site.ts
  sitemap.ts robots.ts  generated at build
components/
  site/     Header, Footer, StructuredData
  sections/ Hero, Work, Build, About, Contact
  ui/       Logo, SiteMockup, HeroPreview, PeakLines, Reveal
lib/        site.ts, projects.ts
public/     brand/ (logo, icons), work/ (screenshots)
```

### The colours are the logo

Every colour in `@theme` is sampled from the PeakSwift mark: the deep indigo of
the card (`#141728`), the cyan of the code brackets (`#0ECEFB`) and the azure of
the browser frame (`#0380E3`). The accent is rationed deliberately — eyebrow
rules, one button, the active nav item, the case-study numbers, and nothing
else. Every text colour is checked to WCAG AA against all three backgrounds.

### The scroll-linked preview

`SiteMockup` is the one piece of real interaction. A tall screenshot sits inside
a clipped device frame and translates as the section moves through the viewport,
so the visitor sees the whole site rather than a cropped hero. On desktop the
frame sticks while the copy beside it scrolls, so the preview stays on screen —
and because the scroll link measures the full-height outer element rather than
the pinned one, the site inside keeps scrolling the whole time it is stuck.

The Desktop/Mobile toggle swaps which screenshot is in the frame.

### Motion

There is no animation library. Scroll reveals are a single
`IntersectionObserver` (`components/ui/Reveal.tsx`) that adds one class; the
transitions themselves are CSS. Elements are only hidden once an inline script
has confirmed JavaScript is running, so with JS disabled the page renders in
full. Everything is disabled under `prefers-reduced-motion: reduce`.

---

## Checked before shipping

- No horizontal overflow at 320, 360, 390, 430, 834, 1024, 1440 and 1920px
- Text colours pass WCAG AA on every background they are used on
- Full content and a working page with JavaScript disabled
- No motion under `prefers-reduced-motion`
- Clean `h1 → h2 → h3` outline, alt text on every image, skip link, visible
  focus rings, and a keyboard order that matches the visual order on both
  layouts
