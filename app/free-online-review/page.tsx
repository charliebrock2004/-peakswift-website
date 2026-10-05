import type { Metadata } from "next";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { StructuredData } from "@/components/site/StructuredData";
import { ReviewHero } from "@/components/review/ReviewHero";
import {
  ExampleReport,
  ReviewAreas,
  ReviewDeliverables,
  ReviewFaq,
  ReviewSteps,
  WhyPeakSwift,
} from "@/components/review/ReviewSections";
import { ReviewFormSection } from "@/components/review/ReviewFormSection";
import { StickyCta } from "@/components/review/StickyCta";
import { RevealProvider } from "@/components/ui/Reveal";
import {
  faqs,
  reviewDescription,
  reviewNav,
  reviewPath,
  reviewTitle,
} from "@/lib/review";
import { socialMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: reviewTitle },
  description: reviewDescription,
  alternates: { canonical: reviewPath },
  ...socialMetadata({
    title: reviewTitle,
    description: reviewDescription,
    path: reviewPath,
  }),
};

/** The offer as a Service (priced at £0) plus the FAQ, for search engines. */
function ReviewStructuredData() {
  const url = `${site.url}${reviewPath}`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: "Free Online Business Review",
        serviceType: "Online presence review",
        description: reviewDescription,
        url,
        provider: { "@id": `${site.url}/#business` },
        areaServed: [
          { "@type": "City", name: "Perth" },
          { "@type": "AdministrativeArea", name: site.region },
          { "@type": "Country", name: "United Kingdom" },
        ],
        offers: {
          "@type": "Offer",
          price: 0,
          priceCurrency: "GBP",
          url,
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function FreeOnlineReviewPage() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Header
        items={reviewNav}
        cta={{ label: "Get my free review", href: "#review" }}
      />

      <main id="main">
        <ReviewHero />
        <ReviewAreas />
        <ReviewDeliverables />
        <ReviewSteps />
        <ExampleReport />
        <WhyPeakSwift />
        <ReviewFaq />
        <ReviewFormSection />
      </main>

      <Footer />
      <StickyCta />

      <RevealProvider />
      <StructuredData />
      <ReviewStructuredData />
    </>
  );
}
