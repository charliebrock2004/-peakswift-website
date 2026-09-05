import Image from "next/image";

/**
 * The PeakSwift lockup: the logo mark as artwork, the name set in the site's
 * own display face. Keeping the wordmark as live text means it stays crisp at
 * every size, scales with the type, and is readable to search engines.
 */
export function Logo({
  size = "md",
  className = "",
}: {
  size?: "sm" | "md";
  className?: string;
}) {
  const mark = size === "sm" ? 26 : 34;

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Image
        src="/brand/peakswift-mark.png"
        alt=""
        width={340}
        height={241}
        priority
        aria-hidden="true"
        style={{ width: "auto", height: `${mark}px` }}
      />
      <span className="flex flex-col leading-none">
        <span
          className="font-[family-name:var(--font-display)] font-semibold tracking-[-0.03em]"
          style={{ fontSize: size === "sm" ? "1rem" : "1.15rem" }}
        >
          PeakSwift
        </span>
        <span
          className="font-[family-name:var(--font-mono)] uppercase text-faint"
          style={{
            fontSize: size === "sm" ? "0.5rem" : "0.55rem",
            letterSpacing: "0.3em",
            marginTop: "0.2rem",
          }}
        >
          Studios
        </span>
      </span>
    </span>
  );
}
