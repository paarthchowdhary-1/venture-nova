"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";

export function DeleteVenture({
  ventureName,
  action,
}: {
  ventureName: string;
  action: () => Promise<void>;
}) {
  const [confirming, setConfirming] = useState(false);

  if (!confirming) {
    return (
      <Button
        type="button"
        variant="outline"
        className="text-destructive"
        onClick={() => setConfirming(true)}
      >
        Delete this venture
      </Button>
    );
  }

  return (
    <form
      action={action}
      className="flex flex-col gap-3 rounded-lg border border-destructive/40 p-4"
    >
      <p className="text-sm">
        Delete <span className="font-semibold">{ventureName}</span>? This
        permanently removes the venture, your lesson progress, and your task
        notes. It can&apos;t be undone.
      </p>
      <div className="flex gap-3">
        <Button type="submit" variant="destructive">
          Yes, delete it
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => setConfirming(false)}
        >
          Keep it
        </Button>
      </div>
    </form>
  );
}
