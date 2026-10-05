const TONES = [
  "bg-mint-soft text-mint-ink",
  "bg-sky-soft text-sky-ink",
  "bg-grape-soft text-grape-ink",
  "bg-coral-soft text-coral-ink",
  "bg-sun-soft text-warm-foreground",
] as const;

/** Achievements as colorful badges, each with a check mark. */
export function AchievementList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-4 flex flex-wrap gap-2">
      {items.map((item, i) => (
        <li
          key={item}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium ${TONES[i % TONES.length]}`}
        >
          <span aria-hidden>✓</span>
          {item}
        </li>
      ))}
    </ul>
  );
}
