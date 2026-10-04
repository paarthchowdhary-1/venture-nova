import { cn } from "~/lib/utils";

const NAVY = "#1E3A8A";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      className={cn("shrink-0", className)}
    >
      <rect
        x="3"
        y="3"
        width="94"
        height="94"
        rx="20"
        fill="#FFFFFF"
        stroke={NAVY}
        strokeWidth="6"
      />
      <path
        d="M16,30 L30,72 L44,30"
        fill="none"
        stroke={NAVY}
        strokeWidth="13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M56,72 L56,30 L84,72 L84,30"
        fill="none"
        stroke={NAVY}
        strokeWidth="13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
