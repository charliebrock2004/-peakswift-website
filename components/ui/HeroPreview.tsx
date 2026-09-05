import Image from "next/image";
import { projects } from "@/lib/projects";

const shots = [
  {
    slug: "weejob-joinery",
    src: "/work/weejob-top.webp",
    alt: "The WeeJob Joinery homepage, a navy hero with the headline 'No job too wee' beside a photograph of a red timber door",
  },
  {
    slug: "brock-contracts",
    src: "/work/brock-top.webp",
    alt: "The Brock Contracts homepage, an aerial photograph of a completed new build behind the headline 'Quality craftsmanship, built to last'",
  },
];

/**
 * The hero's closing move: the two real sites, side by side, tilted just
 * enough to read as objects rather than flat images, and cropped by the
 * bottom of the section so they pull the visitor into the work.
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
      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8 [transform:rotateX(9deg)] [transform-origin:top_center]">
        {shots.map((shot, i) => {
          const project = projects.find((p) => p.slug === shot.slug);
          return (
            <div
              key={shot.slug}
              className="overflow-hidden rounded-xl border border-line-strong bg-raised shadow-[0_36px_80px_-32px_rgba(0,0,0,0.9)]"
              style={{
                transform: `translateY(${i === 1 ? "1.75rem" : "0"})`,
                boxShadow: `0 36px 80px -32px rgba(0,0,0,0.9), 0 0 0 1px ${project?.accent ?? "#fff"}14`,
              }}
            >
              <div className="flex items-center gap-1.5 border-b border-line bg-white/[0.03] px-3 py-2">
                <span className="size-1.5 rounded-full bg-white/15" />
                <span className="size-1.5 rounded-full bg-white/15" />
                <span className="size-1.5 rounded-full bg-white/15" />
              </div>
              <Image
                src={shot.src}
                alt={shot.alt}
                width={1200}
                height={750}
                priority={i === 0}
                sizes="(max-width: 768px) 46vw, 560px"
                className="w-full"
                style={{ height: "auto" }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
