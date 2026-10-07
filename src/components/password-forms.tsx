"use client";

import Link from "next/link";
import { useActionState, useId } from "react";
import {
  type AuthState,
  requestPasswordReset,
  updatePassword,
} from "~/app/auth/actions";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

function Messages({ state }: { state: AuthState }) {
  return (
    <>
      {state.error && (
        <p role="alert" className="text-sm text-destructive">
          {state.error}
        </p>
      )}
      {state.message && (
        <p role="status" className="text-sm text-foreground">
          {state.message}
        </p>
      )}
    </>
  );
}

export function ForgotPasswordForm() {
  const emailId = useId();
  const [state, formAction, pending] = useActionState<AuthState, FormData>(
    requestPasswordReset,
    {},
  );

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-6 px-4 py-16">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight">
          Reset your password
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Enter your email and we&apos;ll send you a link to choose a new one.
        </p>
      </div>
      <form action={formAction} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor={emailId}>Email</Label>
          <Input
            id={emailId}
            name="email"
            type="email"
            defaultValue={state.email}
            required
            autoComplete="email"
            placeholder="you@example.com"
          />
        </div>
        <Button type="submit" size="lg" disabled={pending}>
          {pending ? "Sending..." : "Send reset link"}
        </Button>
        <Messages state={state} />
      </form>
      <p className="text-center text-sm text-muted-foreground">
        <Link
          href="/login"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          Back to log in
        </Link>
      </p>
    </div>
  );
}

export function ResetPasswordForm() {
  const passwordId = useId();
  const confirmId = useId();
  const [state, formAction, pending] = useActionState<AuthState, FormData>(
    updatePassword,
    {},
  );

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-6 px-4 py-16">
      <h1 className="text-center text-2xl font-bold tracking-tight">
        Choose a new password
      </h1>
      <form action={formAction} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor={passwordId}>New password</Label>
          <Input
            id={passwordId}
            name="password"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor={confirmId}>Confirm new password</Label>
          <Input
            id={confirmId}
            name="confirm"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
          />
        </div>
        <Button type="submit" size="lg" disabled={pending}>
          {pending ? "Saving..." : "Save new password"}
        </Button>
        <Messages state={state} />
      </form>
    </div>
  );
}
