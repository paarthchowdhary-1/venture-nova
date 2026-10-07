"use client";

import Link from "next/link";
import { useActionState, useId } from "react";
import { type AuthState, signIn, signUp } from "~/app/auth/actions";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

const copy = {
  login: {
    title: "Welcome back",
    submit: "Log in",
    pending: "Logging in...",
    alt: {
      text: "New to VentureNova?",
      href: "/signup",
      label: "Create an account",
    },
    autoComplete: "current-password",
  },
  signup: {
    title: "Create your account",
    submit: "Create account",
    pending: "Creating account...",
    alt: { text: "Already have an account?", href: "/login", label: "Log in" },
    autoComplete: "new-password",
  },
} as const;

export function AuthForm({
  mode,
  initialError,
}: {
  mode: "login" | "signup";
  initialError?: string;
}) {
  const nameId = useId();
  const emailId = useId();
  const passwordId = useId();
  const c = copy[mode];
  const [state, formAction, pending] = useActionState<AuthState, FormData>(
    mode === "login" ? signIn : signUp,
    { error: initialError },
  );

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-6 px-4 py-16">
      <h1 className="text-center text-2xl font-bold tracking-tight">
        {c.title}
      </h1>
      <form action={formAction} className="flex flex-col gap-4">
        {mode === "signup" && (
          <div className="flex flex-col gap-1.5">
            <Label htmlFor={nameId}>Your first name</Label>
            <Input
              id={nameId}
              name="name"
              type="text"
              defaultValue={state.name}
              required
              maxLength={50}
              autoComplete="given-name"
              placeholder="Alex"
            />
          </div>
        )}
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
        <div className="flex flex-col gap-1.5">
          <Label htmlFor={passwordId}>Password</Label>
          <Input
            id={passwordId}
            name="password"
            type="password"
            required
            minLength={8}
            autoComplete={c.autoComplete}
          />
          {mode === "signup" && (
            <p className="text-xs text-muted-foreground">
              At least 8 characters. Longer is stronger.
            </p>
          )}
          {mode === "login" && (
            <Link
              href="/forgot-password"
              className="self-end text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              Forgot your password?
            </Link>
          )}
        </div>
        <Button type="submit" size="lg" disabled={pending}>
          {pending ? c.pending : c.submit}
        </Button>
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
      </form>
      <p className="text-center text-sm text-muted-foreground">
        {c.alt.text}{" "}
        <Link
          href={c.alt.href}
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          {c.alt.label}
        </Link>
      </p>
    </div>
  );
}
