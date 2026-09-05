import { Logo } from "@/components/ui/Logo";
import { mailto, nav, site } from "@/lib/site";
import { projects } from "@/lib/projects";

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface/60">
      <div className="shell py-[clamp(3rem,6vw,4.5rem)]">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <Logo />
            <p className="mt-5 max-w-[22rem] text-[0.92rem] leading-[1.65] text-muted">
              Modern websites designed and built for businesses.
            </p>
            <p className="mt-4 font-[family-name:var(--font-mono)] text-[0.68rem] uppercase tracking-[0.16em] text-faint">
              {site.location}
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="font-[family-name:var(--font-mono)] text-[0.68rem] uppercase tracking-[0.2em] text-faint">
              Navigate
            </h2>
            <ul className="mt-4 flex list-none flex-col gap-2.5 p-0">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="link-underline text-[0.92rem] text-muted transition-colors duration-200 hover:text-text"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-[family-name:var(--font-mono)] text-[0.68rem] uppercase tracking-[0.2em] text-faint">
              Contact
            </h2>
            <ul className="mt-4 flex list-none flex-col gap-2.5 p-0">
              <li>
                <a
                  href={mailto()}
                  className="link-underline text-[0.92rem] text-muted transition-colors duration-200 hover:text-text"
                >
                  {site.email}
                </a>
              </li>
              {site.social.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="link-underline text-[0.92rem] text-muted transition-colors duration-200 hover:text-text"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <h2 className="mt-8 font-[family-name:var(--font-mono)] text-[0.68rem] uppercase tracking-[0.2em] text-faint">
              Live work
            </h2>
            <ul className="mt-4 flex list-none flex-col gap-2.5 p-0">
              {projects.map((project) => (
                <li key={project.slug}>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="link-underline text-[0.92rem] text-muted transition-colors duration-200 hover:text-text"
                  >
                    {project.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-[family-name:var(--font-mono)] text-[0.68rem] uppercase tracking-[0.14em] text-faint">
            © {new Date().getFullYear()} {site.legalName}
          </p>
          <p className="font-[family-name:var(--font-mono)] text-[0.68rem] uppercase tracking-[0.14em] text-faint">
            Designed &amp; built by PeakSwift
          </p>
        </div>
      </div>
    </footer>
  );
}
