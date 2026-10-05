import type { Metadata } from "next";
import { ConfirmButton } from "~/components/confirm-button";
import { EntryForm, type Field } from "~/components/entry-form";
import { claimConfidence } from "~/lib/insights";
import { cn } from "~/lib/utils";
import { requireWorkspace } from "~/lib/workspace-page";
import {
  addClaim,
  addEvidence,
  deleteClaim,
  deleteEvidence,
} from "../../workspace-actions";

const KIND_LABEL: Record<string, string> = {
  interview: "Interviews",
  survey: "Survey responses",
  competitor: "Competitor reports",
  experiment: "Experiments",
  observation: "Things you observed",
};

const evidenceFields: readonly Field[] = [
  {
    name: "kind",
    label: "What kind of evidence?",
    type: "select",
    required: true,
    options: [
      { value: "", label: "Choose one" },
      { value: "interview", label: "Customer interviews" },
      { value: "survey", label: "Survey responses" },
      { value: "competitor", label: "Competitor research" },
      { value: "experiment", label: "A test or experiment" },
      { value: "observation", label: "Something I observed" },
    ],
  },
  {
    name: "quantity",
    label: "How many?",
    type: "number",
    required: true,
    defaultValue: 1,
    min: 1,
    max: 10000,
    help: "For example, 14 interviews or 3 survey results.",
  },
  {
    name: "description",
    label: "Describe it",
    required: true,
    maxLength: 500,
    placeholder: "9 of 12 athletes said finding a coach was the hardest part",
  },
];

const confidenceStyle = {
  none: "bg-secondary text-muted-foreground",
  low: "bg-destructive/10 text-destructive",
  medium: "bg-warm/25 text-warm-foreground",
  high: "bg-primary/10 text-primary",
} as const;

export const metadata: Metadata = {
  title: "Evidence Vault",
  robots: { index: false, follow: false },
};

export default async function EvidencePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { snapshot } = await requireWorkspace(id);
  const { claims, evidence } = snapshot;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold tracking-tight">Evidence Vault</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Whenever you believe something about your venture, write it as a claim
        and attach the evidence behind it. Your confidence grows with the amount
        and the variety of evidence, so one source alone can&apos;t make a claim
        High.
      </p>

      <section className="mt-8">
        <h2 className="text-lg font-semibold">Add a claim</h2>
        <div className="mt-4 rounded-xl border border-border p-5">
          <EntryForm
            action={addClaim.bind(null, id)}
            submitLabel="Add claim"
            fields={[
              {
                name: "statement",
                label: "What do you believe is true?",
                type: "textarea",
                required: true,
                maxLength: 500,
                placeholder:
                  "Students struggle to find affordable tennis coaching.",
              },
            ]}
          />
        </div>
      </section>

      {claims.length > 0 && (
        <ul className="mt-10 flex flex-col gap-6">
          {claims.map((claim) => {
            const items = evidence.filter((e) => e.claim_id === claim.id);
            const conf = claimConfidence(items);
            return (
              <li
                key={claim.id}
                className="rounded-xl border border-border p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="font-semibold">
                    &ldquo;{claim.statement}&rdquo;
                  </p>
                  <ConfirmButton
                    action={deleteClaim.bind(null, id, claim.id)}
                    message="Delete this claim and its evidence?"
                  />
                </div>
                <p
                  className={cn(
                    "mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium",
                    confidenceStyle[conf.level],
                  )}
                >
                  <span
                    aria-hidden
                    className="size-2 rounded-full bg-current"
                  />
                  Confidence: {conf.label}
                </p>

                {items.length > 0 && (
                  <ul className="mt-4 flex flex-col gap-2">
                    {items.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-start justify-between gap-3 rounded-lg bg-tint px-3 py-2 text-sm"
                      >
                        <span>
                          <span className="font-medium">
                            {item.quantity} &times;{" "}
                            {KIND_LABEL[item.kind] ?? item.kind}
                          </span>
                          <span className="block text-muted-foreground">
                            {item.description}
                          </span>
                        </span>
                        <ConfirmButton
                          action={deleteEvidence.bind(null, id, item.id)}
                          message="Remove this evidence?"
                        />
                      </li>
                    ))}
                  </ul>
                )}

                <details className="mt-4" open={items.length === 0}>
                  <summary className="cursor-pointer text-sm font-medium">
                    Add evidence
                  </summary>
                  <div className="mt-3">
                    <EntryForm
                      action={addEvidence.bind(null, id, claim.id)}
                      fields={evidenceFields}
                      submitLabel="Attach evidence"
                    />
                  </div>
                </details>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
