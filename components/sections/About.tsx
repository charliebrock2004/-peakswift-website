import Image from "next/image";

const principles = [
  {
    title: "You talk to the person building it",
    copy: "No account manager, no handover, nothing lost in the middle. You describe the problem to the person who solves it.",
  },
  {
    title: "Written, not assembled",
    copy: "No page builder, no bought theme. That is why these sites load quickly and why nothing on them is there by accident.",
  },
  {
    title: "Yours to keep",
    copy: "The code lives in your repository and deploys on push. Every site comes with a plain-English guide to updating it.",
  },
];

export function About() {
  return (
    <section id="about" className="relative overflow-hidden py-[var(--section-y)]">
      <div
        className="glow left-[-6rem] top-1/3 size-[28rem] bg-azure/15"
        aria-hidden="true"
      />

      <div className="shell relative">
        <div className="grid gap-[clamp(2.5rem,5vw,4.5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
          <div data-reveal>
            <p className="eyebrow">About PeakSwift</p>
            <h2 className="display-2 mt-5">
              A small studio,
              <br />
              and that&apos;s the point.
            </h2>
            <div className="mt-6 flex flex-col gap-4 text-[1.02rem] leading-[1.75] text-muted">
              <p>
                PeakSwift is one person: I design the site, I write the code,
                and I&apos;m the one you email when you want something changed.
                There is no team to pretend otherwise about.
              </p>
              <p>
                What that buys you is directness. Decisions happen in a phone
                call rather than a meeting, and the site gets built to suit your
                business instead of whatever template was closest.
              </p>
              <p>
                Every site above was built end to end that way —
                design, copy structure, code, hosting, and a plain way for the
                owner to keep them current.
              </p>
            </div>
          </div>

          <ul className="m-0 flex list-none flex-col gap-px overflow-hidden rounded-2xl border border-line bg-line p-0">
            {principles.map((item, i) => (
              <li
                key={item.title}
                data-reveal
                style={{ "--reveal-delay": `${i * 80}ms` } as React.CSSProperties}
                className="bg-base p-7 sm:p-8"
              >
                <h3 className="flex items-baseline gap-3 font-[family-name:var(--font-display)] text-[1.1rem] font-semibold tracking-[-0.02em]">
                  <span className="mono-label text-cyan" aria-hidden="true">
                    0{i + 1}
                  </span>
                  {item.title}
                </h3>
                <p className="mt-2 pl-[2.25rem] text-[0.92rem] leading-[1.65] text-muted">
                  {item.copy}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* The brand lockup, used once, where it means something */}
        <div
          className="mt-[clamp(3rem,6vw,5rem)] flex justify-center border-t border-line pt-[clamp(3rem,6vw,5rem)]"
          data-reveal
        >
          <Image
            src="/brand/peakswift-lockup.png"
            alt="PeakSwift Studios"
            width={604}
            height={417}
            sizes="180px"
            className="opacity-70"
            style={{ width: "180px", height: "auto" }}
          />
        </div>
      </div>
    </section>
  );
}
