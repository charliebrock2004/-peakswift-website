import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { StructuredData } from "@/components/site/StructuredData";
import { Contact } from "@/components/sections/Contact";
import { RevealProvider } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

type AreaServed = {
  "@type": "City" | "AdministrativeArea" | "Country";
  name: string;
};

/** Metadata for an indexable page. The title is the segment before the root template. */
export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  const fullTitle = `${title} — ${site.legalName}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: `${site.url}${path}`,
    },
    twitter: { title: fullTitle, description },
  };
}

/**
 * Page-level WebPage + Service graph. It points at the site-wide business
 * and website nodes rather than repeating them, so the two scripts agree.
 */
export function pageJsonLd({
  path,
  title,
  description,
  serviceName,
  areaServed,
}: {
  path: string;
  title: string;
  description: string;
  serviceName: string;
  areaServed: AreaServed[];
}) {
  const url = `${site.url}${path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: `${title} — ${site.legalName}`,
        description,
        inLanguage: "en-GB",
        isPartOf: { "@id": `${site.url}/#website` },
        about: { "@id": `${site.url}/#business` },
        mainEntity: { "@id": `${url}#service` },
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: serviceName,
        description,
        url,
        provider: { "@id": `${site.url}/#business` },
        areaServed,
      },
    ],
  };
}

export function TextLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className="link-underline text-text"
      {...(external
        ? { target: "_blank" as const, rel: "noreferrer noopener" }
        : {})}
    >
      {children}
      {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
    </a>
  );
}

export function NextSteps({
  title,
  lede,
  links,
}: {
  title: string;
  lede: string;
  links: { href: string; label: string }[];
}) {
  return (
    <section className="border-t border-line py-[var(--section-y)]">
      <div className="shell">
        <h2 className="display-2 max-w-[36rem]">{title}</h2>
        <p className="lede mt-5 max-w-[38rem]">{lede}</p>
        <ul className="mt-8 flex list-none flex-col gap-3 p-0">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="link-underline text-[1.05rem] font-medium"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="/#contact" className="btn btn-primary">
            Start a project
          </a>
          <a href="/pricing" className="btn btn-ghost">
            Website design prices
          </a>
        </div>
      </div>
    </section>
  );
}

export function InfoPage({
  eyebrow,
  title,
  lede,
  children,
  jsonLd,
}: {
  eyebrow: string;
  title: ReactNode;
  lede: ReactNode;
  children: ReactNode;
  jsonLd: object;
}) {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Header />

      <main id="main">
        <section className="relative isolate overflow-hidden pt-[7.5rem] pb-[clamp(2.5rem,5vw,4rem)] md:pt-[9.5rem]">
          <div className="grid-bg" aria-hidden="true" />
          <div
            className="glow left-1/2 top-[-12rem] size-[32rem] -translate-x-1/2 bg-azure/20"
            aria-hidden="true"
          />
          <div className="shell relative">
            <div className="max-w-[52rem]">
              <p className="eyebrow">{eyebrow}</p>
              <h1 className="display-1 mt-6">{title}</h1>
              <p className="lede mt-7 max-w-[40rem]">{lede}</p>
            </div>
          </div>
        </section>

        {children}

        <Contact />
      </main>

      <Footer />

      <RevealProvider />
      <StructuredData />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
