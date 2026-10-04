"use client";

import { useActionState, useEffect, useRef } from "react";
import { type CoachState, sendCoachMessage } from "~/app/ventures/ai-actions";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

export type ChatMessage = { id: string; role: string; content: string };

export function CoachChat({
  ventureId,
  messages,
  enabled,
}: {
  ventureId: string;
  messages: ChatMessage[];
  enabled: boolean;
}) {
  const [state, formAction, pending] = useActionState<CoachState, FormData>(
    sendCoachMessage.bind(null, ventureId),
    {},
  );
  const formRef = useRef<HTMLFormElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.ok) formRef.current?.reset();
  }, [state]);

  const count = messages.length;
  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll whenever the conversation length changes
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [count, pending]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex min-h-64 flex-col gap-3 rounded-xl border border-border bg-card p-4">
        {messages.length === 0 && (
          <div className="text-sm text-muted-foreground">
            <p className="font-medium text-foreground">
              Ask your coach anything about your venture.
            </p>
            <ul className="mt-2 list-disc pl-5">
              <li>What should I do next?</li>
              <li>Is my idea actually solving a real problem?</li>
              <li>Help me write better interview questions.</li>
              <li>I don&apos;t understand how to price this.</li>
            </ul>
          </div>
        )}
        {messages.map((m) => (
          <div
            key={m.id}
            className={cn(
              "flex",
              m.role === "user" ? "justify-end" : "justify-start",
            )}
          >
            <p
              className={cn(
                "max-w-[85%] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap",
                m.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground",
              )}
            >
              {m.content}
            </p>
          </div>
        ))}
        {pending && (
          <div className="flex justify-start">
            <span className="rounded-lg bg-secondary px-3 py-2 text-sm text-muted-foreground">
              Thinking...
            </span>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <form ref={formRef} action={formAction} className="flex flex-col gap-3">
        <label className="sr-only" htmlFor="coach-message">
          Message your coach
        </label>
        <textarea
          id="coach-message"
          name="message"
          required
          maxLength={2000}
          disabled={!enabled}
          placeholder={
            enabled
              ? "Ask a question or tell your coach what you're working on..."
              : "The AI coach isn't switched on yet."
          }
          className="min-h-20 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:opacity-60 md:text-sm"
        />
        <Button
          type="submit"
          disabled={pending || !enabled}
          className="self-start"
        >
          {pending ? "Sending..." : "Send"}
        </Button>
        {state.error && (
          <p role="alert" className="text-sm text-destructive">
            {state.error}
          </p>
        )}
      </form>
    </div>
  );
}
