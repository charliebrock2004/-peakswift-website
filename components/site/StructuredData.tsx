import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

/**
 * Schema.org data for the studio and every shipped project, so search
 * engines can tell what PeakSwift does and what it has built.
 */
export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${site.url}/#business`,
        name: site.legalName,
        alternateName: site.name,
        description: site.description,
        url: site.url,
        /* Only published once a PeakSwift inbox is configured */
        ...(site.email ? { email: site.email } : {}),
        image: `${site.url}/brand/icon-512.png`,
        logo: `${site.url}/brand/icon-512.png`,
        areaServed: [
          { "@type": "City", name: site.locality },
          { "@type": "AdministrativeArea", name: site.region },
          { "@type": "Country", name: "United Kingdom" },
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: site.locality,
          addressRegion: site.region,
          addressCountry: "GB",
        },
        knowsAbout: [
          "Web design",
          "Web development",
          "Responsive design",
          "Online ordering",
          "Search engine optimisation",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Web design and development",
          itemListElement: [
            "Enquiry websites",
            "Portfolio websites",
            "Online ordering websites",
            "Landing pages",
          ].map((name) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.legalName,
        inLanguage: "en-GB",
        publisher: { "@id": `${site.url}/#business` },
      },
      ...projects.map((project) => ({
        "@type": "CreativeWork",
        name: `${project.name} — website`,
        image: `${site.url}${project.shots.top.src}`,
        about: project.client,
        url: project.live,
        dateCreated: project.year,
        creator: { "@id": `${site.url}/#business` },
        abstract: project.headline,
      })),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
