import { InfoPage, NextSteps, TextLink, pageJsonLd, pageMetadata } from "@/components/site/InfoPage";

const path = "/website-design-perthshire";
const title = "Web Design across Perthshire";
const description =
  "Website design for businesses across Perthshire, from a studio in Crieff. Notes on Perth, Auchterarder and Comrie, plus Stirling, which is not in Perthshire.";

const places: { name: string; body: string[] }[] = [
  {
    name: "Perth",
    body: [
      "Perth is the city, so people often compare a few businesses before they call, and the offer has to be obvious to someone who does not already know you. I do not keep an office there: the site is built in Crieff and talked through on a call, still written for a person on a phone. Enquiry forms, Google Maps and that first conversation are set out on the Perth page, rather than squeezed into a swapped town name.",
    ],
  },
  {
    name: "Auchterarder",
    body: [
      "Auchterarder is a small Perthshire town east of Crieff, with independent businesses that serve both neighbours and people who are only in the area for a short time. A neighbour wants the number or the form; someone who has never been down the street needs to understand the offer before either is useful. The build uses the same hand-coded packages, and because the studio is in Crieff you and I can meet or do it on a call.",
    ],
  },
  {
    name: "Comrie",
    body: [
      "Comrie sits west of Crieff, smaller again, and a lot of the businesses are the owner — a trade, a cafe, a place to stay. The useful site is usually short: it should load on a phone, say what you do on the first screen, and make the enquiry or the phone number obvious, because a long brochure does not help when you are the one who answers it. The price is not lower because the place is smaller, and I have not invented a Comrie client to suggest otherwise.",
    ],
  },
  {
    name: "Stirling",
    body: [
      "Stirling is not in Perthshire. It is a separate city to the south, and I will not fold it into the county so this page looks like a larger service area. I will still work with Stirling businesses from the Crieff studio, by phone or video, and there is no Stirling office and no named Stirling client on this site. You get the same hand-coded site and the same packages, with a price before the build and the balance before launch.",
    ],
  },
];

export const metadata = pageMetadata(title, description, path);

export default function PerthshirePage() {
  return (
    <InfoPage
      eyebrow="Service area · studio in Crieff"
      title={
        <>
          Website design across{" "}
          <span className="grad-text">Perthshire.</span>
        </>
      }
      lede="The studio is in Crieff. From there I work with businesses across Perthshire. Stirling is on this page because people ask, and it is not part of Perthshire."
      jsonLd={pageJsonLd({
        path,
        title,
        description,
        serviceName: "Website design across Perthshire",
        areaServed: [
          { "@type": "AdministrativeArea", name: "Perthshire" },
          { "@type": "City", name: "Crieff" },
          { "@type": "City", name: "Perth" },
          { "@type": "City", name: "Auchterarder" },
          { "@type": "City", name: "Comrie" },
          { "@type": "City", name: "Stirling" },
        ],
      })}
    >
      <section className="pb-[var(--section-y)]">
        <div className="shell">
          <p className="eyebrow">From Crieff</p>
          <h2 className="display-2 mt-5 max-w-[40rem]">
            One studio. The briefs are not interchangeable.
          </h2>
          <div className="mt-6 flex max-w-[40rem] flex-col gap-4 text-[1.02rem] leading-[1.75] text-muted">
            <p>
              Perthshire is not one audience. A business in Comrie is not the
              same job as a business in Perth, and writing the town name into
              the same paragraph does not make it one. The notes below are the
              difference.
            </p>
            <p>
              They are also not a claim that there is a finished PeakSwift site
              in every place. The published case studies — WeeJob Joinery,
              Brock Contracts and Timber {"&"} Flame — are Crieff businesses,
              and they are collected on the{" "}
              <TextLink href="/website-design-crieff">Crieff page</TextLink>.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-surface/40 py-[var(--section-y)]">
        <div className="shell flex flex-col gap-12">
          {places.map((place) => (
            <article key={place.name} className="max-w-[42rem]">
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.7rem,3vw,2.2rem)] font-semibold tracking-[-0.03em]">
                {place.name}
              </h2>
                <div className="mt-4 flex flex-col gap-4 text-[1.02rem] leading-[1.75] text-muted">
                  {place.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {place.name === "Perth" ? (
                    <p>
                      <TextLink href="/website-design-perth">
                        Website design for Perth businesses
                      </TextLink>
                    </p>
                  ) : null}
                  {place.name === "Stirling" ? (
                    <p>
                      The studio, and the Crieff work it has published, are on{" "}
                      <TextLink href="/website-design-crieff">
                        website design in Crieff
                      </TextLink>
                      .
                    </p>
                  ) : null}
                </div>
              </article>
            ))}
        </div>
      </section>

      <NextSteps
        title="Prices do not change with the town."
        lede="Starter, Business and Premium are the same wherever you are. If you want the page counts, the enquiry line and the gallery rules without the geography, read the small-business page. If you already have a site, read the redesign page before you assume you need a new one."
        links={[
          { href: "/website-design-crieff", label: "Website design in Crieff, where the studio is" },
          { href: "/website-design-perth", label: "Website design for businesses in Perth" },
          { href: "/small-business-websites", label: "What a small-business website includes" },
          { href: "/website-redesign", label: "Website redesign from the published starting price" },
          { href: "/pricing", label: "Website design prices, extras and care plans" },
        ]}
      />
    </InfoPage>
  );
}
