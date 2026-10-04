import { Logo } from "@/components/ui/Logo";
import { contactHref, mailto, nav, site } from "@/lib/site";
import { projects } from "@/lib/projects";

const linkClass =
  "link-underline text-[0.92rem] text-muted transition-colors duration-200 hover:text-text";

const studioPages = [
  { href: "/website-design-crieff", label: "Website design in Crieff" },
  { href: "/website-design-perth", label: "Website design in Perth" },
  {
    href: "/website-design-perthshire",
    label: "Website design across Perthshire",
  },
  { href: "/small-business-websites", label: "Small business websites" },
  { href: "/website-redesign", label: "Website redesign" },
] as const;

export function Footer() {
  const email = mailto();

  return (
    <footer className="border-t border-line bg-surface/60">
      <div className="shell py-[clamp(3rem,6vw,4.5rem)]">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo />
            <p className="mt-5 max-w-[22rem] text-[0.92rem] leading-[1.65] text-muted">
              Fast, hand-built websites for local businesses — designed and
              coded from scratch.
            </p>
            <p className="mono-label mt-4">{site.location}</p>
          </div>

          <nav aria-label="Footer">
            <h2 className="mono-label">Navigate</h2>
            <ul className="mt-4 flex list-none flex-col gap-2.5 p-0">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={linkClass}>
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="/pricing" className={linkClass}>
                  Prices &amp; care plans
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="mono-label">Live work</h2>
            <ul className="mt-4 flex list-none flex-col gap-2.5 p-0">
              {projects.map((project) => (
                <li key={project.slug}>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={linkClass}
                  >
                    {project.name}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mono-label">Contact</h2>
            <ul className="mt-4 flex list-none flex-col gap-2.5 p-0">
              <li>
                <a href={contactHref} className={linkClass}>
                  Start a project
                </a>
              </li>
              {email ? (
                <li>
                  <a href={email} className={`${linkClass} break-all`}>
                    {site.email}
                  </a>
                </li>
              ) : null}
              {site.social.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={linkClass}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <nav aria-label="Services and places" className="mt-12 border-t border-line pt-8">
          <h2 className="mono-label">For businesses</h2>
          <ul className="mt-4 grid list-none gap-2.5 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {studioPages.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={linkClass}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="mono-label">
            © {new Date().getFullYear()} {site.legalName}
          </p>
          <a href="/#top" className="mono-label link-underline hover:text-text">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
