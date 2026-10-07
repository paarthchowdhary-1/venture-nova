import type { Metadata } from "next";
import { ConfirmButton } from "~/components/confirm-button";
import { EntryForm, type Field } from "~/components/entry-form";
import { StageNotice } from "~/components/stage-notice";
import { Button } from "~/components/ui/button";
import { mvpWarnings } from "~/lib/insights";
import { requireWorkspace } from "~/lib/workspace-page";
import {
  addFeature,
  deleteFeature,
  moveFeature,
} from "../../workspace-actions";

const buckets = [
  {
    id: "must",
    title: "Must have",
    blurb: "Without these, you can't test your core idea.",
  },
  {
    id: "should",
    title: "Should have",
    blurb: "Useful, but your first test works without them.",
  },
  {
    id: "later",
    title: "Later",
    blurb: "Good ideas that can wait until after launch.",
  },
] as const;

const fields: readonly Field[] = [
  {
    name: "name",
    label: "Feature",
    required: true,
    maxLength: 200,
  },
  {
    name: "bucket",
    label: "Where does it belong?",
    type: "select",
    required: true,
    defaultValue: "must",
    options: [
      { value: "must", label: "Must have" },
      { value: "should", label: "Should have" },
      { value: "later", label: "Later" },
    ],
  },
];

export const metadata: Metadata = {
  title: "MVP Planner",
  robots: { index: false, follow: false },
};

export default async function MvpPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { snapshot } = await requireWorkspace(id);
  const features = snapshot.features;
  const warnings = mvpWarnings(features);

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-bold tracking-tight">MVP Planner</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Your minimum viable product is the smallest version that can test your
        riskiest assumption. Sort every feature you can think of, then build
        only the must-haves first.
      </p>
      <StageNotice
        ventureId={id}
        ventureType={snapshot.venture.venture_type}
        currentStage={snapshot.venture.current_stage}
        availableAt="solution"
      />

      {warnings.map((w) => (
        <p
          key={w}
          role="alert"
          className="mt-5 rounded-lg border border-warm bg-warm/15 p-4 text-sm"
        >
          <span className="font-semibold">Careful: </span>
          {w}
        </p>
      ))}

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {buckets.map((bucket) => {
          const items = features.filter((f) => f.bucket === bucket.id);
          return (
            <section
              key={bucket.id}
              className="rounded-xl border border-border p-4"
            >
              <h2 className="font-semibold">
                {bucket.title}{" "}
                <span className="text-sm font-normal text-muted-foreground">
                  ({items.length})
                </span>
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                {bucket.blurb}
              </p>
              <ul className="mt-3 flex flex-col gap-2">
                {items.map((f) => (
                  <li
                    key={f.id}
                    className="rounded-lg bg-tint px-3 py-2 text-sm"
                  >
                    <p className="font-medium">{f.name}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-1">
                      {buckets
                        .filter((b) => b.id !== bucket.id)
                        .map((b) => (
                          <form
                            key={b.id}
                            action={moveFeature.bind(null, id, f.id, b.id)}
                          >
                            <Button type="submit" variant="outline" size="xs">
                              Move to {b.title.toLowerCase()}
                            </Button>
                          </form>
                        ))}
                      <ConfirmButton
                        action={deleteFeature.bind(null, id, f.id)}
                        message="Remove this feature?"
                      />
                    </div>
                  </li>
                ))}
                {items.length === 0 && (
                  <li className="text-sm text-muted-foreground">
                    Nothing here yet.
                  </li>
                )}
              </ul>
            </section>
          );
        })}
      </div>

      <section className="mt-10 max-w-xl">
        <h2 className="text-lg font-semibold">Add a feature</h2>
        <div className="mt-4 rounded-xl border border-border p-5">
          <EntryForm
            action={addFeature.bind(null, id)}
            fields={fields}
            submitLabel="Add feature"
          />
        </div>
      </section>
    </div>
  );
}
