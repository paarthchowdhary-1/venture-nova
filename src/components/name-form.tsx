"use client";

import { useActionState } from "react";
import { type AuthState, saveName } from "~/app/auth/actions";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

/** Shown to accounts that were created before we asked for a first name. */
export function NameForm() {
  const [state, formAction, pending] = useActionState<AuthState, FormData>(
    saveName,
    {},
  );
  return (
    <form
      action={formAction}
      className="flex flex-col gap-2 rounded-2xl border border-primary/20 bg-secondary/60 p-4 sm:flex-row sm:items-end"
    >
      <div className="flex flex-1 flex-col gap-1.5">
        <label htmlFor="first-name" className="text-sm font-medium">
          <span aria-hidden>👋 </span>What should we call you?
        </label>
        <Input
          id="first-name"
          name="name"
          required
          maxLength={50}
          autoComplete="given-name"
          placeholder="Your first name"
          className="bg-white"
        />
      </div>
      <Button type="submit" disabled={pending}>
        {pending ? "Saving..." : "Save"}
      </Button>
      {state.error && (
        <p role="alert" className="text-sm text-destructive sm:basis-full">
          {state.error}
        </p>
      )}
    </form>
  );
}
