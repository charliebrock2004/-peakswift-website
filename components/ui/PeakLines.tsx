/**
 * The mountain from the PeakSwift mark, redrawn as a wide contour line and
 * dropped behind the hero at very low opacity. It draws itself in once on
 * load and then stops — no looping, nothing floating about.
 */
export function PeakLines() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[min(60vh,34rem)] w-full"
      viewBox="0 0 1440 520"
      preserveAspectRatio="xMidYMax slice"
      fill="none"
    >
      <defs>
        <linearGradient id="peak-stroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0ECEFB" />
          <stop offset="100%" stopColor="#0380E3" />
        </linearGradient>
        <linearGradient id="peak-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0" />
          <stop offset="55%" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id="peak-mask">
          <rect width="1440" height="520" fill="url(#peak-fade)" />
        </mask>
      </defs>

      <g mask="url(#peak-mask)" stroke="url(#peak-stroke)" strokeWidth="1.25">
        {[0, 42, 84, 126].map((offset, i) => (
          <path
            key={offset}
            d={`M-40 ${470 + offset} L360 ${196 + offset} L520 ${318 + offset} L760 ${104 + offset} L980 ${300 + offset} L1180 ${208 + offset} L1480 ${434 + offset}`}
            opacity={0.28 - i * 0.055}
            style={{
              strokeDasharray: 2600,
              strokeDashoffset: 2600,
              animation: `peak-draw 2.4s cubic-bezier(0.22, 1, 0.36, 1) ${240 + i * 160}ms forwards`,
            }}
          />
        ))}
      </g>

      <style>{`
        @keyframes peak-draw { to { stroke-dashoffset: 0; } }
        @media (prefers-reduced-motion: reduce) {
          [mask="url(#peak-mask)"] path { animation: none !important; stroke-dashoffset: 0 !important; }
        }
      `}</style>
    </svg>
  );
}
