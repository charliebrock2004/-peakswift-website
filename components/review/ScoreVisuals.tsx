/**
 * The report's visual language: a ring for the overall score and a bar per
 * area. Both draw themselves once when scrolled into view (see globals.css)
 * and are fully drawn with JavaScript off or reduced motion on.
 */

export function ScoreRing({
  value,
  label = "Online presence score",
  size = "lg",
}: {
  value: number;
  label?: string;
  size?: "md" | "lg";
}) {
  return (
    <div
      className={`relative shrink-0 ${size === "lg" ? "size-36" : "size-28"}`}
      role="img"
      aria-label={`${label}: ${value} out of 100`}
    >
      <svg viewBox="0 0 120 120" className="size-full" aria-hidden="true">
        <circle
          cx="60"
          cy="60"
          r="52"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.1"
          strokeWidth="7"
        />
        <circle
          className="ring-fill text-cyan"
          cx="60"
          cy="60"
          r="52"
          fill="none"
          stroke="currentColor"
          strokeWidth="7"
          strokeLinecap="round"
          pathLength={100}
          transform="rotate(-90 60 60)"
          style={{ "--v": value } as React.CSSProperties}
        />
      </svg>
      <div
        className="absolute inset-0 flex flex-col items-center justify-center"
        aria-hidden="true"
      >
        <span
          className={`font-[family-name:var(--font-display)] font-semibold leading-none tracking-[-0.05em] ${
            size === "lg" ? "text-[2.6rem]" : "text-[2.1rem]"
          }`}
        >
          {value}
        </span>
        <span className="mono-label mt-1 tracking-[0.12em]">/ 100</span>
      </div>
    </div>
  );
}

export function ScoreBar({
  label,
  value,
  focus,
  index = 0,
}: {
  label: string;
  value: number;
  focus?: boolean;
  index?: number;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3 text-[0.9rem]">
        <span className="flex items-baseline gap-2.5 text-text">
          {label}
          {focus ? <span className="mono-label text-cyan">Focus</span> : null}
        </span>
        <span className="font-[family-name:var(--font-mono)] text-[0.82rem] text-muted">
          {value}
          <span className="text-faint">/100</span>
        </span>
      </div>
      <div
        className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.07]"
        role="presentation"
      >
        <div
          className="score-fill h-full rounded-full bg-[image:var(--gradient-brand)]"
          style={
            {
              "--v": value / 100,
              "--d": `${index * 90}ms`,
            } as React.CSSProperties
          }
        />
      </div>
    </div>
  );
}
