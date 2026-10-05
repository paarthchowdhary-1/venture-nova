import type { Metadata } from "next";
import { ConfirmButton } from "~/components/confirm-button";
import { EntryForm, type Field } from "~/components/entry-form";
import { commonWeaknesses, competitorOpportunity } from "~/lib/insights";
import { requireWorkspace } from "~/lib/workspace-page";
import { addCompetitor, deleteCompetitor } from "../../workspace-actions";

const fields: readonly Field[] = [
  {
    name: "name",
    label: "Competitor",
    required: true,
    maxLength: 120,
    placeholder:
      "Another app, a tutor, a YouTube channel, or doing it yourself",
    help: 'Include indirect options and "doing nothing" too.',
  },
  {
    name: "strength",
    label: "What do they do well?",
    maxLength: 500,
    placeholder: "Great design",
  },
  {
    name: "weakness",
    label: "Where do they fall short?",
    maxLength: 500,
    placeholder: "Expensive",
  },
  {
    name: "target",
    label: "Who are they aimed at?",
    maxLength: 300,
    placeholder: "Adults",
  },
];

export const metadata: Metadata = {
  title: "Competitor Radar",
  robots: { index: false, follow: false },
};

export default async function CompetitorsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { snapshot } = await requireWorkspace(id);
  const { competitors, venture } = snapshot;
  const opportunity = competitorOpportunity(
    venture.target_customer,
    competitors,
  );
  const repeated = commonWeaknesses(competitors);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold tracking-tight">Competitor Radar</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        List every way your customers solve this problem today. Aim for about
        five. Seeing them side by side shows where you can be different.
      </p>

      {(opportunity || repeated.length > 0) && (
        <section className="mt-8 rounded-xl border border-primary/30 bg-tint p-5">
          <h2 className="text-lg font-semibold">What stands out</h2>
          {opportunity && <p className="mt-2 text-sm">{opportunity}</p>}
          {repeated.length > 0 && (
            <div className="mt-3 text-sm">
              <p className="font-medium">
                Weaknesses that show up more than once
              </p>
              <ul className="mt-1 list-disc pl-5 text-muted-foreground">
                {repeated.map(([weakness, count]) => (
                  <li key={weakness}>
                    <span className="capitalize">{weakness}</span> ({count}{" "}
                    competitors)
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      {competitors.length > 0 && (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {competitors.map((c) => (
            <article key={c.id} className="rounded-xl border border-border p-4">
              <div className="flex items-start justify-between gap-2">
                <h2 className="font-semibold">{c.name}</h2>
                <ConfirmButton
                  action={deleteCompetitor.bind(null, id, c.id)}
                  message="Remove this competitor?"
                />
              </div>
              <dl className="mt-3 flex flex-col gap-2 text-sm">
                <div>
                  <dt className="text-muted-foreground">Strength</dt>
                  <dd>{c.strength || "Not filled in"}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Weakness</dt>
                  <dd>{c.weakness || "Not filled in"}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Target</dt>
                  <dd>{c.target || "Not filled in"}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      )}

      <section className="mt-10">
        <h2 className="text-lg font-semibold">Add a competitor</h2>
        <div className="mt-4 rounded-xl border border-border p-5">
          <EntryForm
            action={addCompetitor.bind(null, id)}
            fields={fields}
            submitLabel="Add competitor"
          />
        </div>
      </section>
    </div>
  );
}
