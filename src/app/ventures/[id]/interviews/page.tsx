import type { Metadata } from "next";
import { ConfirmButton } from "~/components/confirm-button";
import { EntryForm, type Field } from "~/components/entry-form";
import { Badge } from "~/components/ui/badge";
import { interviewPatterns } from "~/lib/insights";
import { requireWorkspace } from "~/lib/workspace-page";
import { addInterview, deleteInterview } from "../../workspace-actions";

const fields: readonly Field[] = [
  {
    name: "interviewee",
    label: "Who did you talk to?",
    placeholder: "Maya, 10th grade",
    required: true,
    maxLength: 120,
    help: "A first name or label is plenty. Don't record last names or contact details.",
  },
  { name: "interviewed_on", label: "Date", type: "date" },
  {
    name: "notes",
    label: "Notes",
    type: "textarea",
    maxLength: 4000,
    placeholder:
      "What did they tell you about the last time they had this problem?",
  },
  {
    name: "tags",
    label: "Problems or themes they mentioned",
    maxLength: 600,
    placeholder: "finding partners, scheduling, cost",
    help: "Separate with commas. VentureNova counts these across your interviews to find patterns.",
  },
  {
    name: "key_quote",
    label: "A quote worth keeping (optional)",
    maxLength: 500,
    placeholder: "I never know who to ask.",
  },
];

export const metadata: Metadata = {
  title: "Customer interviews",
  robots: { index: false, follow: false },
};

export default async function InterviewsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { snapshot } = await requireWorkspace(id);
  const interviews = snapshot.interviews;
  const patterns = interviewPatterns(interviews);
  const quotes = interviews.filter((i) => i.key_quote).slice(0, 3);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold tracking-tight">Customer interviews</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Log what you learn from each conversation. Tag the problems people
        mention, and patterns show up on their own. Do interviews with a trusted
        adult aware, and never meet strangers alone.
      </p>

      <section className="mt-8 rounded-xl border border-border p-5">
        <h2 className="text-lg font-semibold">
          {interviews.length}{" "}
          {interviews.length === 1 ? "interview" : "interviews"} analyzed
        </h2>
        {interviews.length < 5 && (
          <p className="mt-1 text-sm text-muted-foreground">
            Aim for at least 5. Patterns get trustworthy around then.
          </p>
        )}
        {patterns.length > 0 ? (
          <>
            <h3 className="mt-4 text-sm font-semibold">Most common problems</h3>
            <ol className="mt-2 flex flex-col gap-2">
              {patterns.map((p, i) => (
                <li
                  key={p.tag}
                  className="flex items-center justify-between gap-3 text-sm"
                >
                  <span>
                    {i + 1}. <span className="capitalize">{p.tag}</span>
                  </span>
                  <Badge variant="secondary">
                    {p.count}/{p.total}
                  </Badge>
                </li>
              ))}
            </ol>
          </>
        ) : (
          <p className="mt-3 text-sm text-muted-foreground">
            Add some tags to your interviews and the most common problems will
            appear here.
          </p>
        )}
        {quotes.length > 0 && (
          <>
            <h3 className="mt-5 text-sm font-semibold">What people said</h3>
            <ul className="mt-2 flex flex-col gap-2">
              {quotes.map((q) => (
                <li key={q.id} className="rounded-lg bg-tint px-3 py-2 text-sm">
                  &ldquo;{q.key_quote}&rdquo;
                  <span className="text-muted-foreground">
                    {" "}
                    {q.interviewee}
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold">Log an interview</h2>
        <div className="mt-4 rounded-xl border border-border p-5">
          <EntryForm
            action={addInterview.bind(null, id)}
            fields={fields}
            submitLabel="Save interview"
          />
        </div>
      </section>

      {interviews.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-semibold">All interviews</h2>
          <ul className="mt-4 flex flex-col gap-3">
            {interviews.map((i) => (
              <li key={i.id} className="rounded-xl border border-border p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{i.interviewee}</p>
                    <p className="text-xs text-muted-foreground">
                      {i.interviewed_on}
                    </p>
                  </div>
                  <ConfirmButton
                    action={deleteInterview.bind(null, id, i.id)}
                    message="Delete this interview?"
                  />
                </div>
                {i.notes && (
                  <p className="mt-2 text-sm whitespace-pre-wrap">{i.notes}</p>
                )}
                {i.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {i.tags.map((t) => (
                      <Badge key={t} variant="outline">
                        {t}
                      </Badge>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
