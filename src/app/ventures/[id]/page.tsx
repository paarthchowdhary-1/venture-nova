import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { lessonsForVenture, nextLesson, stageIndex } from "~/content/lessons";
import { createClient } from "~/lib/supabase/server";
import { cn } from "~/lib/utils";
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

  const { data: progressRows } = await supabase
    .from("lesson_progress")
    .select("lesson_slug, passed, best_score")
    .eq("venture_id", id);

  const passedSlugs = new Set(
    (progressRows ?? []).filter((r) => r.passed).map((r) => r.lesson_slug),
  );
  const lessons = lessonsForVenture(venture.venture_type);
  const currentIndex = stageIndex(venture.current_stage);
  const upNext = nextLesson(lessons, passedSlugs, venture.current_stage);
  const allDone = lessons.length > 0 && passedSlugs.size >= lessons.length;
  const currentStageLessons = lessons.filter(
    (l) => l.stage === venture.current_stage,
  );
  const currentStageDone = currentStageLessons.filter((l) =>
    passedSlugs.has(l.slug),
  ).length;
  const nextStageName = STAGES[currentIndex + 1];

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
              className={cn(
                "rounded-full border px-3 py-1 text-sm capitalize",
                stage === venture.current_stage
                  ? "border-primary bg-primary font-medium text-primary-foreground"
                  : i < currentIndex
                    ? "border-primary/40 text-foreground"
                    : "border-border text-muted-foreground",
              )}
            >
              {i + 1}. {stage}
            </li>
          ))}
        </ol>
        {!allDone && nextStageName && (
          <p className="mt-3 text-sm text-muted-foreground">
            Pass every lesson in{" "}
            <span className="font-medium capitalize text-foreground">
              {venture.current_stage}
            </span>{" "}
            ({currentStageDone} of {currentStageLessons.length} done) to move up
            to{" "}
            <span className="font-medium capitalize text-foreground">
              {nextStageName}
            </span>
            .
          </p>
        )}
      </div>

      <div className="mt-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold">Your lessons</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {passedSlugs.size} of {lessons.length} complete. These were chosen
              for a {ventureTypeLabel(venture.venture_type).toLowerCase()}.
            </p>
          </div>
          {upNext && (
            <Button asChild>
              <Link href={`/ventures/${id}/lessons/${upNext.slug}`}>
                {passedSlugs.size === 0 ? "Start learning" : "Continue"}
              </Link>
            </Button>
          )}
        </div>

        {allDone && (
          <p className="mt-4 rounded-lg border border-primary bg-primary/5 p-4 text-sm font-medium">
            You have completed every lesson for this venture.
          </p>
        )}

        <div className="mt-6 flex flex-col gap-8">
          {STAGES.map((stage, i) => {
            const stageLessons = lessons.filter((l) => l.stage === stage);
            if (stageLessons.length === 0) return null;
            const locked = i > currentIndex;
            return (
              <section key={stage}>
                <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  <span className="capitalize">
                    {i + 1}. {stage}
                  </span>
                  {locked && <Badge variant="outline">Locked</Badge>}
                </h3>
                <ul className="mt-2 flex flex-col gap-1.5">
                  {stageLessons.map((lesson) => {
                    const done = passedSlugs.has(lesson.slug);
                    const row = (
                      <>
                        <span
                          aria-hidden
                          className={cn(
                            "flex size-5 shrink-0 items-center justify-center rounded-full border text-xs",
                            done
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border",
                          )}
                        >
                          {done ? "✓" : ""}
                        </span>
                        <span className="flex-1">
                          <span className="block font-medium">
                            {lesson.title}
                          </span>
                          <span className="block text-sm text-muted-foreground">
                            {lesson.summary}
                          </span>
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {lesson.minutes} min
                        </span>
                      </>
                    );
                    return (
                      <li key={lesson.slug}>
                        {locked ? (
                          <div className="flex items-center gap-3 rounded-lg border border-border px-3 py-2.5 opacity-50">
                            {row}
                          </div>
                        ) : (
                          <Link
                            href={`/ventures/${id}/lessons/${lesson.slug}`}
                            className="flex items-center gap-3 rounded-lg border border-border px-3 py-2.5 transition-colors hover:bg-accent/40"
                          >
                            {row}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
