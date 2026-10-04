import Link from "next/link";
import { TaskCard } from "~/components/task-card";
import { Badge } from "~/components/ui/badge";
import { getLesson, stageIndex } from "~/content/lessons";
import { stageInfo } from "~/content/roadmaps";
import { TASK_CATALOG, TASK_HELP } from "~/content/tasks";
import { recommendedActions } from "~/lib/insights";
import { STAGES } from "~/lib/ventures";
import { requireWorkspace } from "~/lib/workspace-page";

export default async function TasksPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { workspace, snapshot } = await requireWorkspace(id);
  const venture = snapshot.venture;
  const tasks = workspace.tasks;

  const promptBySlug = new Map(
    TASK_CATALOG.map((t) => [t.slug, t.evidencePrompt]),
  );
  const currentIndex = stageIndex(venture.current_stage);
  const doneCount = tasks.filter((t) => t.status === "done").length;
  const firstOpenId = tasks.find(
    (t) => t.stage === venture.current_stage && t.status !== "done",
  )?.id;
  const recommended = recommendedActions(snapshot).slice(0, 5);

  function helpFor(slug: string | null) {
    const lessonSlug = slug ? TASK_HELP[slug] : undefined;
    const lesson = lessonSlug ? getLesson(lessonSlug) : undefined;
    return lesson
      ? { href: `/ventures/${id}/lessons/${lesson.slug}`, title: lesson.title }
      : undefined;
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold tracking-tight">Your tasks</h1>
      <p className="mt-2 text-muted-foreground">
        Lessons teach you. Tasks make you try it for real. For each one, write
        down what actually happened, because evidence is what shows how your
        venture is really doing.
      </p>
      <p className="mt-3 text-sm font-medium">
        {doneCount} of {tasks.length} done
      </p>

      <section className="mt-8 rounded-xl border border-primary/30 bg-tint p-5">
        <h2 className="text-lg font-semibold">Recommended for you right now</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          These update as you work. Finish one and the next appears.
        </p>
        <ol className="mt-4 flex flex-col gap-2">
          {recommended.map((a, i) => (
            <li key={a.title}>
              <Link
                href={a.href}
                className="flex items-start gap-3 rounded-lg bg-background px-3 py-2.5 transition-colors hover:bg-accent/40"
              >
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-warm text-xs font-semibold text-warm-foreground">
                  {i + 1}
                </span>
                <span className="flex-1">
                  <span className="block font-medium">{a.title}</span>
                  <span className="block text-sm text-muted-foreground">
                    {a.why}
                  </span>
                </span>
                <span className="shrink-0 text-xs text-muted-foreground">
                  ~{a.minutes} min
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-10 flex flex-col gap-10">
        {STAGES.map((stage, i) => {
          const stageTasks = tasks.filter((t) => t.stage === stage);
          if (stageTasks.length === 0) return null;
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
              <div className="mt-3 flex flex-col gap-2">
                {stageTasks.map((task) =>
                  locked ? (
                    <div
                      key={task.id}
                      className="rounded-lg border border-border px-3 py-2.5 opacity-50"
                    >
                      <span className="font-medium">{task.title}</span>
                    </div>
                  ) : (
                    <TaskCard
                      key={task.id}
                      ventureId={id}
                      taskId={task.id}
                      title={task.title}
                      description={task.description ?? ""}
                      status={task.status}
                      evidence={task.evidence ?? ""}
                      evidencePrompt={
                        promptBySlug.get(task.catalog_slug ?? "") ??
                        "What happened?"
                      }
                      defaultOpen={task.id === firstOpenId}
                      help={helpFor(task.catalog_slug)}
                    />
                  ),
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
