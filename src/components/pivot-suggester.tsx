"use client";

import { useActionState } from "react";
import {
  getPivotSuggestions,
  type PivotState,
} from "~/app/ventures/ai-actions";
import { Button } from "~/components/ui/button";

const TYPE_LABEL: Record<string, string> = {
  audience: "Change the audience",
  problem: "Change the problem",
  solution: "Change the solution",
  combine: "Combine approaches",
};

export function PivotSuggester({
  ventureId,
  enabled,
}: {
  ventureId: string;
  enabled: boolean;
}) {
  const [state, formAction, pending] = useActionState<PivotState, FormData>(
    getPivotSuggestions.bind(null, ventureId),
    {},
  );

  return (
    <div className="flex flex-col gap-4">
      <form action={formAction} className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={pending || !enabled}>
          {pending ? "Thinking..." : "Suggest pivots from my evidence"}
        </Button>
        {!enabled && (
          <span className="text-sm text-muted-foreground">
            AI suggestions aren&apos;t switched on yet. Use the worksheet above
            in the meantime.
          </span>
        )}
      </form>
      {state.error && (
        <p role="alert" className="text-sm text-destructive">
          {state.error}
        </p>
      )}
      {state.pivots && (
        <ol className="grid gap-3 sm:grid-cols-2">
          {state.pivots.map((p) => (
            <li key={p.title} className="rounded-xl border border-border p-4">
              <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                {TYPE_LABEL[p.type] ?? p.type}
              </p>
              <p className="mt-1 font-semibold">{p.title}</p>
              <p className="mt-1 text-sm">{p.change}</p>
              <p className="mt-2 text-sm text-muted-foreground">{p.why}</p>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
