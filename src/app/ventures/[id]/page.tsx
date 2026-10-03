import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Badge } from "~/components/ui/badge";
import { createClient } from "~/lib/supabase/server";
import { STAGES, ventureTypeLabel } from "~/lib/ventures";

export default async function VenturePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: venture } = await supabase
    .from("ventures")
    .select(
      "id, name, idea, problem, target_customer, venture_type, current_stage",
    )
    .eq("id", id)
    .maybeSingle();
  if (!venture) notFound();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12">
      <Link
        href="/dashboard"
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        &larr; All ventures
      </Link>
      <h1 className="mt-4 text-3xl font-bold tracking-tight">{venture.name}</h1>
      <div className="mt-3 flex flex-wrap gap-2">
        <Badge variant="secondary">
          {ventureTypeLabel(venture.venture_type)}
        </Badge>
      </div>

      <dl className="mt-8 flex flex-col gap-5">
        <div>
          <dt className="text-sm font-medium text-muted-foreground">Idea</dt>
          <dd className="mt-1">{venture.idea}</dd>
        </div>
        {venture.problem && (
          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Problem
            </dt>
            <dd className="mt-1">{venture.problem}</dd>
          </div>
        )}
        {venture.target_customer && (
          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Target customer
            </dt>
            <dd className="mt-1">{venture.target_customer}</dd>
          </div>
        )}
      </dl>

      <div className="mt-10">
        <h2 className="text-lg font-semibold">Stage</h2>
        <ol className="mt-3 flex flex-wrap gap-2">
          {STAGES.map((stage, i) => (
            <li
              key={stage}
              className={
                stage === venture.current_stage
                  ? "rounded-full border border-primary bg-primary px-3 py-1 text-sm font-medium text-primary-foreground capitalize"
                  : "rounded-full border border-border px-3 py-1 text-sm text-muted-foreground capitalize"
              }
            >
              {i + 1}. {stage}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
