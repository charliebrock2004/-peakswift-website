import { site } from "@/lib/site";
import { Check } from "@/components/review/ReviewCta";
import { ReviewForm } from "@/components/review/ReviewForm";

const next = [
  "I review your website, Google presence and social media",
  "You get a clear breakdown and a prioritised action plan",
  "If you’d like help, I send a quote. If not, there’s nothing more to do",
];

export function ReviewFormSection() {
  return (
    <section id="review" className="relative py-[var(--section-y)]">
      <div className="shell">
        <div className="card relative isolate overflow-hidden" data-reveal>
          <div
            className="glow left-[-8rem] top-[-8rem] size-[28rem] bg-azure/20"
            aria-hidden="true"
          />
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-[image:var(--gradient-brand)]"
          />

          <div className="relative grid gap-[clamp(2.5rem,5vw,4.5rem)] px-5 py-[clamp(3rem,7vw,5.5rem)] sm:px-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:px-14">
            <div>
              <p className="eyebrow">Your free review</p>
              <h2 className="display-2 mt-6">
                Show me your business. I’ll show you where it could improve.
              </h2>
              <p className="lede mt-6">
                I’ll show you where your online presence could be improved, give
                you a practical plan, and if you want me to carry out the work,
                I’ll give you a clear quote.
              </p>

              <h3 className="mono-label mt-10">What happens next</h3>
              <ul className="mt-4 flex list-none flex-col gap-3 p-0">
                {next.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[0.95rem] leading-[1.55] text-muted"
                  >
                    <Check />
                    {item}
                  </li>
                ))}
              </ul>

              <p className="mt-10 text-[0.92rem] leading-[1.6] text-muted">
                Want to see prices first?{" "}
                <a
                  href="/pricing"
                  className="link-underline font-semibold text-text"
                >
                  View pricing
                </a>
              </p>
              <p className="mono-label mt-6">{site.location}</p>
            </div>

            <div className="rounded-xl border border-line bg-base/70 p-5 sm:p-8">
              <ReviewForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
