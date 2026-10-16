import type { IconName } from "~/components/icons";
import type { VentureType } from "~/lib/ventures";

/**
 * Each kind of venture gets its own icon so a founder's dashboard is easy to
 * scan. The colors are shared: one calm tint, so the type is told apart by its
 * icon and its label, not by a different hue. Class names are written out in
 * full so Tailwind can find them.
 */
const SHARED = {
  soft: "bg-secondary",
  ink: "text-primary-ink",
  strip: "from-primary to-primary-ink",
  ring: "ring-primary/30",
} as const;

export const TYPE_STYLE: Record<
  VentureType,
  { icon: IconName; soft: string; ink: string; strip: string; ring: string }
> = {
  service: { icon: "users", ...SHARED },
  physical_product: { icon: "layers", ...SHARED },
  software: { icon: "flask", ...SHARED },
  nonprofit: { icon: "gift", ...SHARED },
  other: { icon: "map", ...SHARED },
};

export function typeStyle(type: string) {
  return TYPE_STYLE[type as VentureType] ?? TYPE_STYLE.other;
}
