import type { VentureType } from "~/lib/ventures";

/**
 * Each kind of venture gets its own color and emoji so a founder's dashboard is
 * easy to scan. Class names are written out in full so Tailwind can find them.
 */
export const TYPE_STYLE: Record<
  VentureType,
  { emoji: string; soft: string; ink: string; strip: string; ring: string }
> = {
  service: {
    emoji: "🎓",
    soft: "bg-mint-soft",
    ink: "text-mint-ink",
    strip: "from-mint to-sky",
    ring: "ring-mint/40",
  },
  physical_product: {
    emoji: "📦",
    soft: "bg-coral-soft",
    ink: "text-coral-ink",
    strip: "from-coral to-warm",
    ring: "ring-coral/40",
  },
  software: {
    emoji: "💻",
    soft: "bg-sky-soft",
    ink: "text-sky-ink",
    strip: "from-sky to-primary",
    ring: "ring-sky/40",
  },
  nonprofit: {
    emoji: "💛",
    soft: "bg-grape-soft",
    ink: "text-grape-ink",
    strip: "from-grape to-coral",
    ring: "ring-grape/40",
  },
  other: {
    emoji: "✨",
    soft: "bg-sun-soft",
    ink: "text-sun-ink",
    strip: "from-warm to-coral",
    ring: "ring-warm/40",
  },
};

export function typeStyle(type: string) {
  return TYPE_STYLE[type as VentureType] ?? TYPE_STYLE.other;
}

/** One emoji per stage, in order, for the roadmap. */
export const STAGE_EMOJI = [
  "💡",
  "🔎",
  "🧑‍🤝‍🧑",
  "✏️",
  "🛠️",
  "🧪",
  "👂",
  "🔁",
  "💼",
  "🚀",
] as const;
