"use client";

import Link from "next/link";
import { useActionState } from "react";
import { saveTask, type TaskState } from "~/app/ventures/task-actions";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

type Props = {
  ventureId: string;
  taskId: string;
  title: string;
  description: string;
  status: string;
  evidence: string;
  evidencePrompt: string;
  defaultOpen: boolean;
  help?: { href: string; title: string };
};

export function TaskCard({
  ventureId,
  taskId,
  title,
  description,
  status,
  evidence,
  evidencePrompt,
  defaultOpen,
  help,
}: Props) {
  const [state, formAction, pending] = useActionState<TaskState, FormData>(
    saveTask.bind(null, ventureId, taskId),
    {},
  );
  const done = status === "done";

  return (
    <details
      open={defaultOpen}
      className="rounded-lg border border-border bg-card open:shadow-sm"
    >
      <summary className="flex cursor-pointer list-none items-center gap-3 px-3 py-2.5">
        <span
          aria-hidden
          className={cn(
            "flex size-5 shrink-0 items-center justify-center rounded-full border text-xs",
            done
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border",
          )}
        >
          {done ? "✓" : ""}
        </span>
        <span className="flex-1 font-medium">{title}</span>
        <span className="text-xs text-muted-foreground">
          {done ? "Done" : evidence ? "In progress" : "To do"}
        </span>
      </summary>

      <form action={formAction} className="flex flex-col gap-3 px-3 pt-1 pb-4">
        <p className="text-sm text-muted-foreground">{description}</p>
        {help && (
          <p className="text-sm">
            Not sure how?{" "}
            <Link
              href={help.href}
              className="font-medium text-primary-ink underline-offset-4 hover:underline"
            >
              I don't understand this: read &ldquo;{help.title}&rdquo;
            </Link>
          </p>
        )}
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          What happened? (your evidence)
          <textarea
            name="evidence"
            defaultValue={evidence}
            maxLength={2000}
            placeholder={evidencePrompt}
            className="min-h-24 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm font-normal shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          />
        </label>
        <div className="flex flex-wrap gap-2">
          {done ? (
            <Button
              type="submit"
              name="intent"
              value="reopen"
              variant="outline"
              size="sm"
              disabled={pending}
            >
              Reopen
            </Button>
          ) : (
            <Button
              type="submit"
              name="intent"
              value="done"
              size="sm"
              disabled={pending}
            >
              Mark done
            </Button>
          )}
          <Button
            type="submit"
            name="intent"
            value="save"
            variant="outline"
            size="sm"
            disabled={pending}
          >
            {pending ? "Saving..." : "Save notes"}
          </Button>
        </div>
        {state.error && (
          <p role="alert" className="text-sm text-destructive">
            {state.error}
          </p>
        )}
        {state.saved && !state.error && (
          <p role="status" className="text-sm text-muted-foreground">
            Saved.
          </p>
        )}
      </form>
    </details>
  );
}
