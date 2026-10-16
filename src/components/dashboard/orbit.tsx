/** A decorative orbit illustration for the venture card. */
export function Orbit({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 360 220"
      aria-hidden="true"
      className={className}
      fill="none"
    >
      <defs>
        <radialGradient id="orbit-core" cx="50%" cy="50%" r="50%">
          <stop
            offset="0%"
            stopColor="oklch(0.82 0.08 275)"
            stopOpacity="0.9"
          />
          <stop offset="100%" stopColor="oklch(0.6 0.15 275)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="180" cy="110" r="70" fill="url(#orbit-core)" opacity="0.45" />
      <ellipse
        cx="180"
        cy="110"
        rx="165"
        ry="82"
        stroke="oklch(0.6 0.15 275)"
        strokeOpacity="0.7"
        strokeWidth="1.5"
      />
      <ellipse
        cx="180"
        cy="110"
        rx="105"
        ry="52"
        stroke="oklch(0.6 0.15 275)"
        strokeOpacity="0.55"
        strokeWidth="1.5"
      />
      <path
        d="M180 78 187 103 212 110 187 117 180 142 173 117 148 110 173 103z"
        fill="oklch(0.72 0.1 275)"
      />
      <circle cx="262" cy="52" r="9" fill="oklch(0.66 0.12 275)" />
      <circle cx="330" cy="104" r="8" fill="oklch(0.78 0.07 275)" />
      <circle cx="228" cy="158" r="7" fill="oklch(0.58 0.14 275)" />
      <g fill="oklch(0.55 0.1 285)" opacity="0.5">
        <circle cx="40" cy="40" r="1.6" />
        <circle cx="90" cy="180" r="1.4" />
        <circle cx="320" cy="30" r="1.6" />
        <circle cx="300" cy="190" r="1.4" />
        <circle cx="130" cy="20" r="1.2" />
        <circle cx="20" cy="120" r="1.2" />
      </g>
    </svg>
  );
}
