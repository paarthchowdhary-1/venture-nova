"use client";

import { useActionState } from "react";
import { type FeedbackState, sendFeedback } from "~/app/feedback/actions";
import { Button } from "~/components/ui/button";

const textareaClass =
  "min-h-36 w-full rounded-xl border border-input bg-card px-4 py-3 text-base shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50";

/** A short message that goes straight to the person who runs VentureNova. */
export function FeedbackForm({ from }: { from?: string }) {
  const [state, formAction, pending] = useActionState<FeedbackState, FormData>(
    sendFeedback,
    {},
  );

  if (state.sent) {
    return (
      <div
        role="status"
        className="flex flex-col items-start gap-3 rounded-2xl border border-mint/40 bg-mint-soft p-6"
      >
        <p className="text-xl font-extrabold text-mint-ink">
          <span aria-hidden>🎉 </span>Thank you! Your message was sent.
        </p>
        <p className="text-sm text-mint-ink/80">
          Every message gets read. It helps make VentureNova better for you and
          everyone after you.
        </p>
        <Button
          variant="outline"
          className="rounded-full bg-white/70"
          onClick={() => window.location.assign("/feedback")}
        >
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="page" value={from ?? ""} />
      <label htmlFor="message" className="text-sm font-medium">
        What&apos;s on your mind? A bug, an idea, a question, anything.
      </label>
      <textarea
        id="message"
        name="message"
        required
        maxLength={2000}
        className={textareaClass}
      />
      <div className="flex flex-wrap items-center gap-3">
        <Button
          type="submit"
          variant="fun"
          size="lg"
          className="rounded-full px-8"
          disabled={pending}
        >
          {pending ? "Sending..." : "Send"}
        </Button>
      </div>
      {state.error && (
        <p role="alert" className="text-sm text-destructive">
          {state.error}
        </p>
      )}
    </form>
  );
}
