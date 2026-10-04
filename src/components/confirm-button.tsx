"use client";

import { Button } from "~/components/ui/button";

/** A small form button that asks "are you sure?" before running a server action. */
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
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!window.confirm(message)) e.preventDefault();
      }}
    >
      <Button
        type="submit"
        variant={variant}
        size="sm"
        className="text-muted-foreground hover:text-destructive"
      >
        {label}
      </Button>
    </form>
  );
}
