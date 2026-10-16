"use client";

import { useActionState, useState } from "react";
import {
  quickStartVenture,
  type VentureFormState,
} from "~/app/ventures/actions";
import { Icon, Sparkle } from "~/components/icons";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";
import { TYPE_STYLE } from "~/lib/venture-style";
import { VENTURE_TYPES, type VentureType } from "~/lib/ventures";

const TYPE_HINT: Record<VentureType, string> = {
  service: "Tutoring, lawn care, pet sitting, a small business",
  physical_product: "Bracelets, snacks, stickers, something you make",
  software: "An app, a website, or a game",
  nonprofit: "A cause or a community project",
  other: "None of these fit? Pick this one",
};

const STEPS = 3;

/**
 * The guided start a brand-new student sees instead of an empty dashboard.
 * Three short steps (idea, kind, name), then a welcome and their first task.
 * Every field lives in one form, so going back never loses what was typed.
 */
export function WelcomeStart({ firstName }: { firstName: string | null }) {
  const [state, formAction, pending] = useActionState<
    VentureFormState,
    FormData
  >(quickStartVenture, {});
  const [step, setStep] = useState(0);
  const [idea, setIdea] = useState("");
  const [type, setType] = useState<VentureType | "">("");

  const canNext = step === 0 ? idea.trim().length > 0 : type !== "";

  return (
    <section className="bg-hero relative isolate mt-6 overflow-hidden rounded-3xl border border-primary/30 p-6 shadow-xl shadow-primary/10 sm:p-10">
      <Sparkle className="pointer-events-none absolute -top-6 -right-6 -z-10 size-40 text-primary/10" />
      <p className="text-sm font-semibold tracking-wider text-primary-ink uppercase">
        Step {step + 1} of {STEPS}
      </p>
      <div className="mt-2 flex gap-1.5" aria-hidden>
        {Array.from({ length: STEPS }, (_, i) => (
          <span
            // biome-ignore lint/suspicious/noArrayIndexKey: fixed list of dots
            key={i}
            className={cn(
              "h-1.5 w-10 rounded-full transition-colors",
              i <= step ? "bg-primary" : "bg-primary/20",
            )}
          />
        ))}
      </div>

      <form action={formAction} className="mt-6">
        <div className={cn(step !== 0 && "hidden")}>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            {firstName ? `Welcome, ${firstName}!` : "Welcome!"} What&apos;s your
            idea?
          </h2>
          <p className="mt-2 max-w-xl text-muted-foreground">
            One or two sentences is plenty. It doesn&apos;t have to be perfect.
            Your coach and your roadmap will help you sharpen it.
          </p>
          <label htmlFor="idea" className="sr-only">
            Your idea
          </label>
          <textarea
            id="idea"
            name="idea"
            maxLength={2000}
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            className="mt-5 min-h-32 w-full rounded-xl border border-input bg-card px-4 py-3 text-base shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          />
        </div>

        <div className={cn(step !== 1 && "hidden")}>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            What kind of venture is it?
          </h2>
          <p className="mt-2 max-w-xl text-muted-foreground">
            This shapes your roadmap, because a tutoring business and an app
            need very different next steps. You can change it later.
          </p>
          <fieldset className="mt-5 grid gap-3 sm:grid-cols-2">
            <legend className="sr-only">Kind of venture</legend>
            {VENTURE_TYPES.map((t) => {
              const style = TYPE_STYLE[t.value];
              const selected = type === t.value;
              return (
                <label
                  key={t.value}
                  className={cn(
                    "card-pop flex cursor-pointer items-start gap-3 rounded-2xl border bg-card p-4 has-focus-visible:ring-[3px] has-focus-visible:ring-ring/50",
                    selected
                      ? "border-primary ring-2 ring-primary/40"
                      : "border-border",
                  )}
                >
                  <input
                    type="radio"
                    name="ventureType"
                    value={t.value}
                    checked={selected}
                    onChange={() => setType(t.value)}
                    className="sr-only"
                  />
                  <span
                    aria-hidden
                    className={cn(
                      "flex size-11 shrink-0 items-center justify-center rounded-xl text-xl",
                      style.soft,
                    )}
                  >
                    <Icon
                      name={style.icon}
                      className="size-5 text-primary-ink"
                    />
                  </span>
                  <span>
                    <span className="block font-semibold">{t.label}</span>
                    <span className="block text-sm text-muted-foreground">
                      {TYPE_HINT[t.value]}
                    </span>
                  </span>
                </label>
              );
            })}
          </fieldset>
        </div>

        <div className={cn(step !== 2 && "hidden")}>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Want to give it a name?
          </h2>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Totally optional. Leave it blank and it will be called Untitled. You
            can rename it any time.
          </p>
          <label htmlFor="name" className="sr-only">
            Venture name
          </label>
          <Input
            id="name"
            name="name"
            maxLength={120}
            placeholder="Untitled"
            className="mt-5 h-12 max-w-md bg-card text-base"
          />
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          {step > 0 && (
            <Button
              type="button"
              variant="outline"
              className="rounded-full"
              onClick={() => setStep(step - 1)}
            >
              Back
            </Button>
          )}
          {step < STEPS - 1 ? (
            <Button
              key="next"
              type="button"
              variant="fun"
              size="lg"
              className="rounded-full px-8"
              disabled={!canNext}
              onClick={() => setStep(step + 1)}
            >
              Next &rarr;
            </Button>
          ) : (
            // A separate element (note the keys): if React reused the Next
            // button here, its type would flip to "submit" in the middle of
            // the same click, and that click would submit the form.
            <Button
              key="submit"
              type="submit"
              variant="fun"
              size="lg"
              className="rounded-full px-8"
              disabled={pending}
            >
              {pending ? "Setting things up..." : "Start my venture"}
            </Button>
          )}
        </div>
        {state.error && (
          <p role="alert" className="mt-3 text-sm text-destructive">
            {state.error}
          </p>
        )}
      </form>
    </section>
  );
}
