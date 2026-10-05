import { cn } from "~/lib/utils";

const FILL = {
  brand: "bg-brand-gradient",
  mint: "bg-linear-to-r from-mint to-sky",
  coral: "bg-linear-to-r from-coral to-warm",
  sky: "bg-linear-to-r from-sky to-primary",
  grape: "bg-linear-to-r from-grape to-coral",
  sun: "bg-linear-to-r from-warm to-coral",
} as const;

export type ProgressTone = keyof typeof FILL;

/** A rounded progress bar with a gradient fill. */
export function ProgressBar({
  percent,
  tone = "brand",
  className,
  label,
}: {
  percent: number;
  tone?: ProgressTone;
  className?: string;
  label?: string;
}) {
  const value = Math.min(100, Math.max(0, Math.round(percent)));
  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      className={cn(
        "h-2.5 w-full overflow-hidden rounded-full bg-secondary",
        className,
      )}
    >
      <div
        className={cn(
          "h-full rounded-full transition-[width] duration-700 ease-out",
          FILL[tone],
        )}
        style={{ width: `${Math.max(3, value)}%` }}
      />
    </div>
  );
}
