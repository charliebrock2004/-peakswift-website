import { projects, type Project } from "@/lib/projects";
import { SiteMockup } from "@/components/ui/SiteMockup";

export function Work() {
  return (
    <section id="work" className="relative py-[var(--section-y)]">
      <div className="shell">
        {/* --------------------------------------------------- section head */}
        <header className="max-w-[42rem]" data-reveal>
          <p className="eyebrow">Featured work</p>
          <h2 className="display-2 mt-5">
            Two businesses. Two sites. Both live.
          </h2>
          <p className="lede mt-5">
            Not mockups or concepts — these are running in production, taking
            real enquiries. Scroll through either one below, or open it and
            judge it properly.
          </p>
        </header>
      </div>

      <div className="mt-[clamp(3.5rem,7vw,6rem)] flex flex-col gap-[clamp(4.5rem,9vw,8rem)]">
        {projects.map((project, i) => (
          <CaseStudy key={project.slug} project={project} flip={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}

function CaseStudy({ project, flip }: { project: Project; flip: boolean }) {
  return (
    <article className="relative">
      {/* A wash of the project's own accent, so each case study has its own
          temperature without introducing a second brand colour.

          It is clipped by its own wrapper rather than by the <article>: an
          overflow-clipped ancestor becomes the scroll container for
          position:sticky, which would stop the preview column sticking. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="glow top-1/4 size-[30rem] opacity-[0.07]"
          style={{
            background: project.accent,
            [flip ? "right" : "left"]: "-10rem",
          }}
        />
      </div>

      <div className="shell relative">
        <div className={`case-grid ${flip ? "case-grid--flip" : ""}`}>
          {/* --------------------------------------------------- heading -- */}
          <div className="case-head" data-reveal>
            <div className="flex items-baseline gap-4">
              <span
                className="font-[family-name:var(--font-display)] text-[clamp(2.6rem,6vw,4rem)] font-semibold leading-none tracking-[-0.05em]"
                style={{ color: project.accent, opacity: 0.55 }}
                aria-hidden="true"
              >
                {project.index}
              </span>
              <span className="h-px flex-1 bg-line" aria-hidden="true" />
              <span className="font-[family-name:var(--font-mono)] text-[0.68rem] uppercase tracking-[0.18em] text-faint">
                {project.year}
              </span>
            </div>

            <h3 className="display-3 mt-7">{project.name}</h3>
            <p className="mt-2 font-[family-name:var(--font-mono)] text-[0.72rem] uppercase tracking-[0.16em] text-faint">
              {project.client}
            </p>

            <p className="mt-6 text-[1.08rem] font-medium leading-[1.5] text-text">
              {project.headline}
            </p>
          </div>

          {/* Sticks while the copy scrolls past, so the site stays on screen
              the whole time you are reading about it. */}
          <div className="case-mock" data-reveal>
            <SiteMockup project={project} />
          </div>

          {/* ------------------------------------------------------ body -- */}
          <div className="case-body lg:mt-8" data-reveal>
            <div className="flex flex-col gap-4 text-[0.98rem] leading-[1.7] text-muted">
              {project.body.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>

            {/* --------------------------------------------- highlights -- */}
            <dl className="mt-9 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {project.highlights.map((item) => (
                <div key={item.label}>
                  <dt className="flex items-start gap-2.5 text-[0.92rem] font-semibold text-text">
                    <svg
                      viewBox="0 0 24 24"
                      className="mt-[0.3rem] size-3 shrink-0"
                      fill="none"
                      stroke={project.accent}
                      strokeWidth="3"
                      aria-hidden="true"
                    >
                      <path d="M4 12.5 9.5 18 20 6" />
                    </svg>
                    {item.label}
                  </dt>
                  <dd className="m-0 mt-1.5 pl-[1.4rem] text-[0.88rem] leading-[1.6] text-muted">
                    {item.detail}
                  </dd>
                </div>
              ))}
            </dl>

            {/* -------------------------------------------------- stack -- */}
            <ul className="mt-9 flex list-none flex-wrap gap-2 p-0">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-line bg-white/[0.03] px-3 py-1.5 font-[family-name:var(--font-mono)] text-[0.68rem] uppercase tracking-[0.14em] text-muted"
                >
                  {tech}
                </li>
              ))}
            </ul>

            {/* --------------------------------------------------- links -- */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer noopener"
                className="btn btn-primary"
              >
                Visit {project.name}
                <svg
                  viewBox="0 0 24 24"
                  className="size-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden="true"
                >
                  <path d="M7 17 17 7M9 7h8v8" />
                </svg>
              </a>
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer noopener"
                className="btn btn-ghost"
              >
                <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
                  <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
                </svg>
                Source code
              </a>
            </div>
          </div>

          {/* --------------------------------------------------- mockup --- */}
        </div>
      </div>
    </article>
  );
}
