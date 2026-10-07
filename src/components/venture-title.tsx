import { cn } from "~/lib/utils";

/** The text shown for a venture's name, with "Untitled" when it is blank. */
export function ventureName(name: string | null | undefined) {
  const trimmed = (name ?? "").trim();
  return trimmed || "Untitled";
}

/**
 * A venture's name that wraps between words but never splits a hyphenated word
 * ("after-school") across two lines.
 */
export function VentureTitle({
  name,
  className,
}: {
  name: string | null | undefined;
  className?: string;
}) {
  let offset = 0;
  const words = ventureName(name)
    .split(/\s+/)
    .map((word) => {
      const entry = { word, key: `at-${offset}` };
      offset += word.length + 1;
      return entry;
    });
  return (
    <span className={cn("[overflow-wrap:anywhere]", className)}>
      {words.map(({ word, key }, i) => (
        <span key={key}>
          <span
            className={word.includes("-") ? "whitespace-nowrap" : undefined}
          >
            {word}
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}
