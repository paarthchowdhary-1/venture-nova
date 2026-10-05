"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";

/**
 * A small delete-style button that asks "are you sure?" in the page before it
 * runs a server action. It is a plain in-page step instead of the browser's
 * popup, so it looks the same everywhere and works in every browser.
 */
export function ConfirmButton({
  action,
  label = "Delete",
  message = "Delete this? This can't be undone.",
  variant = "ghost",
}: {
  action: () => Promise<void>;
  label?: string;
  message?: string;
  variant?: "ghost" | "outline";
}) {
  const [asking, setAsking] = useState(false);

  if (!asking) {
    return (
      <Button
        type="button"
        variant={variant}
        size="sm"
        className="text-muted-foreground hover:text-destructive"
        onClick={() => setAsking(true)}
      >
        {label}
      </Button>
    );
  }

  return (
    <form
      action={action}
      role="alertdialog"
      aria-label={message}
      className="flex max-w-xs flex-col items-end gap-1.5 rounded-lg border border-destructive/30 bg-destructive/5 p-2.5 text-right"
    >
      <p className="text-xs text-foreground">{message}</p>
      <div className="flex gap-1.5">
        <Button
          type="button"
          variant="ghost"
          size="xs"
          onClick={() => setAsking(false)}
        >
          Keep it
        </Button>
        <Button type="submit" variant="destructive" size="xs">
          Yes, {label.toLowerCase()}
        </Button>
      </div>
    </form>
  );
}
