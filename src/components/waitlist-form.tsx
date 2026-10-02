"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

type Status = "idle" | "submitting" | "success" | "error";

export function WaitlistForm() {
  const emailId = useId();
  const ideaId = useId();
  const [expanded, setExpanded] = useState(false);
  const [email, setEmail] = useState("");
  const [idea, setIdea] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const response = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, idea: idea || undefined }),
    });

    if (!response.ok) {
      const body = await response.json().catch(() => null);
      setStatus("error");
      setErrorMessage(body?.error ?? "Something went wrong. Please try again.");
      return;
    }

    setStatus("success");
  }

  if (status === "success") {
    return (
      <p className="text-sm font-medium text-foreground">
        You&apos;re on the list! Check your inbox for a confirmation email.
      </p>
    );
  }

  if (!expanded) {
    return (
      <div className="flex flex-col items-center gap-3">
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            size="lg"
            className="rounded-full px-8"
            onClick={() => setExpanded(true)}
          >
            Join the waitlist &rarr;
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full px-8"
            asChild
          >
            <Link href="#how-it-works">See how it works</Link>
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          No spam. We&apos;ll only email you when VentureNova is ready.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-sm flex-col items-stretch gap-3"
    >
      <div className="flex flex-col gap-1.5 text-left">
        <Label htmlFor={emailId}>Email</Label>
        <Input
          id={emailId}
          type="email"
          required
          autoFocus
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1.5 text-left">
        <Label htmlFor={ideaId}>What&apos;s your idea? (optional)</Label>
        <Input
          id={ideaId}
          type="text"
          placeholder="A tutoring business, a clothing brand, an app..."
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
        />
      </div>
      <Button
        type="submit"
        size="lg"
        className="rounded-full"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Joining..." : "Join the waitlist"}
      </Button>
      {status === "error" && (
        <p className="text-sm text-destructive">{errorMessage}</p>
      )}
      <p className="text-xs text-muted-foreground">
        No spam. We&apos;ll only email you when VentureNova is ready.
      </p>
    </form>
  );
}
