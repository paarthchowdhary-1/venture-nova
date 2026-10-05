import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { lessonsForVenture, nextLesson, stageIndex } from "~/content/lessons";
import { stageInfo } from "~/content/roadmaps";
import { cn } from "~/lib/utils";
import { STAGES, ventureTypeLabel } from "~/lib/ventures";
import { requireWorkspace } from "~/lib/workspace-page";

export const metadata: Metadata = {
  title: "Learn",
  robots: { index: false, follow: false },
};

export default async function LearnPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { workspace, snapshot } = await requireWorkspace(id);
  const venture = snapshot.venture;
  const passedSlugs = workspace.passedSlugs;

  const lessons = lessonsForVenture(venture.venture_type);
  const currentIndex = stageIndex(venture.current_stage);
  const upNext = nextLesson(lessons, passedSlugs, venture.current_stage);
  const allDone = lessons.length > 0 && passedSlugs.size >= lessons.length;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Learn</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {passedSlugs.size} of {lessons.length} lessons complete. Chosen for
            a {ventureTypeLabel(venture.venture_type).toLowerCase()}. Pass every
            lesson in a stage to move up.
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

      <div className="mt-8 flex flex-col gap-8">
        {STAGES.map((stage, i) => {
          const stageLessons = lessons.filter((l) => l.stage === stage);
          if (stageLessons.length === 0) return null;
          const locked = i > currentIndex;
          return (
            <section key={stage}>
              <h2 className="flex items-center gap-2 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
                <span>
                  {i + 1}. {stageInfo(venture.venture_type, stage).name}
                </span>
                {stage === venture.current_stage && (
                  <Badge variant="secondary">Current stage</Badge>
                )}
                {locked && <Badge variant="outline">Locked</Badge>}
              </h2>
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
  );
}
