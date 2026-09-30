import Image from "next/image";
import { projects } from "@/lib/projects";

/**
 * The hero's closing move: the live sites in a row, tilted just enough to
 * read as objects rather than flat images, stepping down toward the work.
 *
 * Purely presentational — the case studies below carry the real links, so
 * these are hidden from assistive tech to avoid announcing them twice.
 */
export function HeroPreview() {
  return (
    <div
      aria-hidden="true"
      className="rise pointer-events-none mt-[clamp(3.5rem,7vw,6rem)] [perspective:1600px]"
      style={{ "--rise-delay": "700ms" } as React.CSSProperties}
    >
      <div className="grid grid-cols-3 gap-2 [transform:rotateX(8deg)] [transform-origin:top_center] sm:gap-4 lg:gap-6">
        {projects.map((project, i) => (
          <div
            key={project.slug}
            className="overflow-hidden rounded-xl border border-line-strong bg-raised shadow-[0_36px_80px_-32px_rgba(0,0,0,0.9)]"
            style={{
              transform: `translateY(${i * 0.7}rem)`,
              boxShadow: `0 36px 80px -32px rgba(0,0,0,0.9), 0 0 0 1px ${project.accent}22`,
            }}
          >
            <div className="flex items-center gap-1.5 border-b border-line bg-white/[0.03] px-2 py-1.5 sm:px-3 sm:py-2">
              <span className="size-1.5 shrink-0 rounded-full bg-white/15" />
              <span className="size-1.5 shrink-0 rounded-full bg-white/15" />
              <span className="hidden size-1.5 shrink-0 rounded-full bg-white/15 sm:block" />
              <span className="ml-auto hidden min-w-0 truncate font-[family-name:var(--font-mono)] text-[0.62rem] uppercase tracking-[0.14em] text-faint sm:block">
                {project.name}
              </span>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[4/3] lg:aspect-[16/10]">
              <Image
                src={project.shots.top.src}
                alt=""
                width={project.shots.top.width}
                height={project.shots.top.height}
                priority={i === 0}
                sizes="(max-width: 640px) 30vw, 33vw"
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
