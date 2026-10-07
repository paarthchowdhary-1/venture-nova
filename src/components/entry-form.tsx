"use client";

import { useActionState, useEffect, useRef } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export type FormState = { ok?: boolean; error?: string };

export type Field = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "number" | "date" | "select";
  placeholder?: string;
  required?: boolean;
  options?: readonly { value: string; label: string }[];
  defaultValue?: string | number;
  min?: number;
  max?: number;
  maxLength?: number;
  help?: string;
};

const textareaClass =
  "min-h-20 w-full rounded-md border border-input bg-input/30 px-3 py-2 text-base shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-sm";
const selectClass =
  "h-9 w-full rounded-md border border-input bg-input/30 px-3 text-base shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-sm";

function localToday() {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
}

/** Date fields start on the founder's local date, not the server's (UTC) date. */
function fillBlankDates(form: HTMLFormElement | null) {
  if (!form) return;
  for (const input of form.querySelectorAll<HTMLInputElement>(
    'input[type="date"]',
  )) {
    if (!input.value && !input.defaultValue) input.value = localToday();
  }
}

export function EntryForm({
  action,
  fields,
  submitLabel,
  pendingLabel = "Saving...",
  resetOnSuccess = true,
}: {
  action: (state: FormState, formData: FormData) => Promise<FormState>;
  fields: readonly Field[];
  submitLabel: string;
  pendingLabel?: string;
  resetOnSuccess?: boolean;
}) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(
    action,
    {},
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    fillBlankDates(formRef.current);
  }, []);

  useEffect(() => {
    if (state.ok && resetOnSuccess) {
      formRef.current?.reset();
      fillBlankDates(formRef.current);
    }
  }, [state, resetOnSuccess]);

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-4">
      {fields.map((field) => {
        const id = `f-${field.name}`;
        return (
          <div key={field.name} className="flex flex-col gap-1.5">
            <Label htmlFor={id}>{field.label}</Label>
            {field.type === "textarea" ? (
              <textarea
                id={id}
                name={field.name}
                required={field.required}
                maxLength={field.maxLength ?? 2000}
                placeholder={field.placeholder}
                defaultValue={field.defaultValue}
                className={textareaClass}
              />
            ) : field.type === "select" ? (
              <select
                id={id}
                name={field.name}
                required={field.required}
                defaultValue={field.defaultValue ?? ""}
                className={selectClass}
              >
                {field.options?.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            ) : (
              <Input
                id={id}
                name={field.name}
                type={field.type ?? "text"}
                required={field.required}
                min={field.min}
                max={field.max}
                maxLength={field.maxLength ?? 300}
                placeholder={field.placeholder}
                defaultValue={field.defaultValue}
              />
            )}
            {field.help && (
              <p className="text-xs text-muted-foreground">{field.help}</p>
            )}
          </div>
        );
      })}
      <Button type="submit" disabled={pending} className="self-start">
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
