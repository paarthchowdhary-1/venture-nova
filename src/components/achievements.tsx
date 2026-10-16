const STYLE = "border border-border bg-secondary text-primary-ink";

/** Achievements as quiet badges, each with a check mark. */
export function AchievementList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-4 flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium ${STYLE}`}
        >
          <span aria-hidden>✓</span>
          {item}
        </li>
      ))}
    </ul>
  );
}
