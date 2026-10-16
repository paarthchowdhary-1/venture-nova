"use client";

import { Icon } from "~/components/icons";
import { Button } from "~/components/ui/button";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center gap-4 px-4 py-24 text-center">
      <span
        aria-hidden
        className="flex size-14 items-center justify-center rounded-2xl bg-secondary text-primary-ink"
      >
        <Icon name="help" className="size-7" />
      </span>
      <h1 className="text-2xl font-extrabold tracking-tight">
        Something went wrong on our side
      </h1>
      <p className="text-muted-foreground text-balance">
        It&apos;s not you. Your work is safe. Try again, and if it keeps
        happening, email hello@venturenova.org.
      </p>
      <Button variant="fun" className="rounded-full" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
}
