import { ConfirmButton } from "~/components/confirm-button";
import { EntryForm, type Field } from "~/components/entry-form";
import { PivotSuggester } from "~/components/pivot-suggester";
import { aiConfigured } from "~/lib/ai";
import { hypothesisVerdict } from "~/lib/insights";
import { cn } from "~/lib/utils";
import { requireWorkspace } from "~/lib/workspace-page";
import {
  addHypothesis,
  deleteHypothesis,
  recordResults,
} from "../../workspace-actions";

const newFields: readonly Field[] = [
  {
    name: "statement",
    label: "Your hypothesis",
    type: "textarea",
    required: true,
    maxLength: 500,
    placeholder:
      "High school athletes struggle to find affordable tennis coaching.",
    help: "A belief about your customer that you can test, written so people could say yes or no to it.",
  },
  {
    name: "sample_target",
    label: "How many people will you test it with?",
    type: "number",
    required: true,
    defaultValue: 10,
    min: 1,
    max: 1000,
  },
  {
    name: "threshold_pct",
    label: "What percent need to say yes for it to count as validated?",
    type: "number",
    required: true,
    defaultValue: 60,
    min: 1,
    max: 100,
    help: "Decide this now, before you see any results, so you can't move the goalposts later.",
  },
  {
    name: "experiment",
    label: "Your experiment (optional)",
    type: "textarea",
    maxLength: 1000,
    help: "Leave blank and we'll suggest one.",
  },
  {
    name: "questions",
    label: "Questions to ask (optional)",
    type: "textarea",
    maxLength: 2000,
    help: "Leave blank and we'll suggest good ones.",
  },
];

const lenses = [
  {
    title: "Change the target audience",
    ask: "Which group felt this problem most strongly in your interviews? Could you narrow to them, or move to a nearby group?",
  },
  {
    title: "Change the problem",
    ask: "What problem did people bring up that you weren't expecting? Is it bigger or more frequent than the one you tested?",
  },
  {
    title: "Change the solution",
    ask: "If the problem is real, what is another way to solve it that is simpler or cheaper than your first idea?",
  },
  {
    title: "Combine approaches",
    ask: "Is there a smaller piece of your idea plus a piece of a competitor's that solves the problem better together?",
  },
];

const verdictStyle = {
  validated: "bg-primary/10 text-primary",
  needs_more: "bg-warm/25 text-warm-foreground",
  not_validated: "bg-destructive/10 text-destructive",
} as const;

export default async function ValidationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { snapshot } = await requireWorkspace(id);
  const hypotheses = snapshot.hypotheses;
  const anyFailed = hypotheses.some(
    (h) => hypothesisVerdict(h).status === "not_validated",
  );

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold tracking-tight">Validation Lab</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Turn your biggest guesses into tests. Write a hypothesis, decide what
        counts as success, test it with real people, and enter the results.
        VentureNova tells you whether the evidence supports it.
      </p>

      {hypotheses.length > 0 && (
        <ul className="mt-8 flex flex-col gap-5">
          {hypotheses.map((h) => {
            const verdict = hypothesisVerdict(h);
            return (
              <li key={h.id} className="rounded-xl border border-border p-5">
                <div className="flex items-start justify-between gap-3">
                  <p className="font-semibold">{h.statement}</p>
                  <ConfirmButton
                    action={deleteHypothesis.bind(null, id, h.id)}
                    message="Delete this hypothesis and its results?"
                  />
                </div>
                <p
                  className={cn(
                    "mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium",
                    verdictStyle[verdict.status],
                  )}
                >
                  <span
                    aria-hidden
                    className="size-2 rounded-full bg-current"
                  />
                  {verdict.label}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {verdict.detail}
                </p>

                {h.experiment && (
                  <div className="mt-4">
                    <p className="text-sm font-medium">Experiment</p>
                    <p className="text-sm text-muted-foreground">
                      {h.experiment}
                    </p>
                  </div>
                )}
                {h.questions && (
                  <div className="mt-3">
                    <p className="text-sm font-medium">Questions to ask</p>
                    <ul className="mt-1 list-disc pl-5 text-sm text-muted-foreground">
                      {h.questions
                        .split("\n")
                        .filter(Boolean)
                        .map((q) => (
                          <li key={q}>{q}</li>
                        ))}
                    </ul>
                  </div>
                )}

                <details
                  className="mt-4 rounded-lg bg-tint p-4"
                  open={h.tested === 0}
                >
                  <summary className="cursor-pointer text-sm font-medium">
                    Enter your results
                  </summary>
                  <div className="mt-4">
                    <EntryForm
                      action={recordResults.bind(null, id, h.id)}
                      resetOnSuccess={false}
                      submitLabel="Save results"
                      fields={[
                        {
                          name: "tested",
                          label: "How many people did you test?",
                          type: "number",
                          required: true,
                          defaultValue: h.tested,
                          min: 0,
                        },
                        {
                          name: "supported",
                          label: "How many supported your hypothesis?",
                          type: "number",
                          required: true,
                          defaultValue: h.supported,
                          min: 0,
                        },
                        {
                          name: "results_notes",
                          label: "What did you learn? (optional)",
                          type: "textarea",
                          defaultValue: h.results_notes ?? "",
                        },
                      ]}
                    />
                  </div>
                </details>
              </li>
            );
          })}
        </ul>
      )}

      <section className="mt-10">
        <h2 className="text-lg font-semibold">Add a hypothesis</h2>
        <div className="mt-4 rounded-xl border border-border p-5">
          <EntryForm
            action={addHypothesis.bind(null, id)}
            fields={newFields}
            submitLabel="Create experiment"
          />
        </div>
      </section>

      {anyFailed && (
        <section className="mt-12">
          <h2 className="text-lg font-semibold">
            Your evidence says this direction isn&apos;t strong yet
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            That isn&apos;t failure. It&apos;s exactly what testing is for, and
            you found out before spending months building it. Here are four ways
            to change direction. Think about each one, then log what you choose
            in your Decision Log.
          </p>
          <ol className="mt-4 grid gap-3 sm:grid-cols-2">
            {lenses.map((lens, i) => (
              <li
                key={lens.title}
                className="rounded-xl border border-border p-4"
              >
                <p className="font-semibold">
                  {i + 1}. {lens.title}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{lens.ask}</p>
              </li>
            ))}
          </ol>
          <div className="mt-6">
            <PivotSuggester ventureId={id} enabled={aiConfigured()} />
          </div>
        </section>
      )}
    </div>
  );
}
