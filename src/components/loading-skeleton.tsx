/** A calm placeholder shown while a signed-in page loads. */
export function LoadingSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-4 py-12"
    >
      <div className="h-8 w-56 animate-pulse rounded-lg bg-secondary" />
      <div className="h-4 w-80 max-w-full animate-pulse rounded bg-secondary" />
      <div className="mt-4 h-40 animate-pulse rounded-2xl bg-linear-to-br from-secondary to-grape-soft" />
      <div className="h-24 animate-pulse rounded-2xl bg-secondary" />
    </div>
  );
}
