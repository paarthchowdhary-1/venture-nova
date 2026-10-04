import { ConfirmButton } from "~/components/confirm-button";
import { EntryForm, type Field } from "~/components/entry-form";
import { requireWorkspace } from "~/lib/workspace-page";
import { addDecision, deleteDecision } from "../../workspace-actions";

const fields: readonly Field[] = [
  {
    name: "decision",
    label: "What did you decide?",
    type: "textarea",
    required: true,
    maxLength: 500,
    placeholder: "Target high school athletes first.",
  },
  {
    name: "reason",
    label: "Why?",
    type: "textarea",
    maxLength: 1000,
    placeholder: "8 of 12 interviews named the same problem.",
  },
  {
    name: "evidence",
    label: "What evidence did you have?",
    maxLength: 1000,
    placeholder: "14 customer interviews, 3 survey results",
  },
  {
    name: "decided_on",
    label: "Date",
    type: "date",
    help: "Defaults to today.",
  },
];

export default async function DecisionsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { snapshot } = await requireWorkspace(id);
  const decisions = snapshot.decisions;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold tracking-tight">
        Founder Decision Log
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Write down every big decision, why you made it, and what evidence you
        had. Months from now you can look back and ask: was that the right call?
      </p>

      <section className="mt-8">
        <h2 className="text-lg font-semibold">Log a decision</h2>
        <div className="mt-4 rounded-xl border border-border p-5">
          <EntryForm
            action={addDecision.bind(null, id)}
            fields={fields}
            submitLabel="Save decision"
          />
        </div>
      </section>

      {decisions.length > 0 && (
        <ol className="mt-10 flex flex-col gap-4">
          {decisions.map((d) => (
            <li key={d.id} className="rounded-xl border border-border p-5">
              <div className="flex items-start justify-between gap-3">
                <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  {d.decided_on}
                </p>
                <ConfirmButton
                  action={deleteDecision.bind(null, id, d.id)}
                  message="Delete this decision?"
                />
              </div>
              <p className="mt-1 font-semibold">{d.decision}</p>
              {d.reason && (
                <p className="mt-2 text-sm">
                  <span className="font-medium">Reason: </span>
                  <span className="text-muted-foreground">{d.reason}</span>
                </p>
              )}
              {d.evidence && (
                <p className="mt-1 text-sm">
                  <span className="font-medium">Evidence: </span>
                  <span className="text-muted-foreground">{d.evidence}</span>
                </p>
              )}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
