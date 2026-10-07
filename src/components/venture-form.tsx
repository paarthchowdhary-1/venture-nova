"use client";

import { useActionState } from "react";
import type { VentureFormState } from "~/app/ventures/actions";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { VENTURE_TYPES } from "~/lib/ventures";

const textareaClass =
  "min-h-24 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-sm";

const selectClass =
  "h-9 w-full rounded-md border border-input bg-transparent px-3 text-base shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-sm";

type Initial = {
  name: string;
  idea: string;
  problem: string | null;
  target_customer: string | null;
  venture_type: string;
};

export function VentureForm({
  action,
  initial,
  submitLabel = "Create venture",
  pendingLabel = "Saving...",
}: {
  action: (
    state: VentureFormState,
    formData: FormData,
  ) => Promise<VentureFormState>;
  initial?: Initial;
  submitLabel?: string;
  pendingLabel?: string;
}) {
  const [state, formAction, pending] = useActionState<
    VentureFormState,
    FormData
  >(action, {});

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="name">What do you want to call it?</Label>
        <Input
          id="name"
          name="name"
          required
          maxLength={120}
          defaultValue={initial?.name}
          placeholder="Untitled"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="ventureType">What kind of venture is it?</Label>
        <select
          id="ventureType"
          name="ventureType"
          required
          defaultValue={initial?.venture_type ?? ""}
          className={selectClass}
        >
          <option value="" disabled>
            Choose one
          </option>
          {VENTURE_TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
        {initial && (
          <p className="text-xs text-muted-foreground">
            Changing this changes which lessons you are assigned. Lessons you
            have already passed stay passed.
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="idea">What&apos;s your idea?</Label>
        <textarea
          id="idea"
          name="idea"
          required
          maxLength={2000}
          defaultValue={initial?.idea}
          className={textareaClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="problem">What problem does it solve? (optional)</Label>
        <textarea
          id="problem"
          name="problem"
          maxLength={2000}
          defaultValue={initial?.problem ?? ""}
          className={textareaClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="targetCustomer">Who has this problem? (optional)</Label>
        <Input
          id="targetCustomer"
          name="targetCustomer"
          maxLength={1000}
          defaultValue={initial?.target_customer ?? ""}
        />
      </div>

      <Button type="submit" size="lg" disabled={pending}>
        {pending ? pendingLabel : submitLabel}
      </Button>
      {state.error && (
        <p role="alert" className="text-sm text-destructive">
          {state.error}
        </p>
      )}
    </form>
  );
}
