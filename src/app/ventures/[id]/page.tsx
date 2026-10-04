import Link from "next/link";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { stageIndex } from "~/content/lessons";
import { stageInfo } from "~/content/roadmaps";
import {
  recommendedActions,
  ventureHealth,
  ventureProgress,
} from "~/lib/insights";
import { cn } from "~/lib/utils";
import { STAGES, ventureTypeLabel } from "~/lib/ventures";
import { requireWorkspace } from "~/lib/workspace-page";

function Bar({ percent, className }: { percent: number; className?: string }) {
  return (
    <div
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn(
        "h-2 w-full overflow-hidden rounded-full bg-secondary",
        className,
      )}
    >
      <div
        className="h-full rounded-full bg-primary"
        style={{ width: `${Math.max(2, percent)}%` }}
      />
    </div>
  );
}

export default async function VenturePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { snapshot } = await requireWorkspace(id);
  const venture = snapshot.venture;

  const actions = recommendedActions(snapshot);
  const nextAction = actions[0];
  const progress = ventureProgress(snapshot);
  const health = ventureHealth(snapshot);
  const currentIndex = stageIndex(venture.current_stage);
  const info = stageInfo(venture.venture_type, venture.current_stage);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <Link
        href="/dashboard"
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        &larr; All ventures
      </Link>
      <div className="mt-4 flex items-start justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">{venture.name}</h1>
        <Button variant="outline" size="sm" asChild>
          <Link href={`/ventures/${id}/edit`}>Edit</Link>
        </Button>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <Badge variant="secondary">
          {ventureTypeLabel(venture.venture_type)}
        </Badge>
        <Badge variant="outline">Now: {info.name}</Badge>
      </div>
      <p className="mt-5 text-muted-foreground">{venture.idea}</p>

      {nextAction && (
        <section className="mt-8 rounded-xl border border-primary/30 bg-tint p-5">
          <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            Your next best action
          </p>
          <h2 className="mt-1 text-xl font-semibold">{nextAction.title}</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Why: </span>
            {nextAction.why}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">
              Estimated time:{" "}
            </span>
            about {nextAction.minutes} minutes
          </p>
          <Button className="mt-4" asChild>
            <Link href={nextAction.href}>{nextAction.cta}</Link>
          </Button>
        </section>
      )}

      <section className="mt-8 rounded-xl border border-border p-5">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-lg font-semibold">Venture progress</h2>
          <span className="text-2xl font-bold text-primary">
            {progress.percent}%
          </span>
        </div>
        <Bar percent={progress.percent} className="mt-3 h-3" />
        <p className="mt-2 text-xs text-muted-foreground">
          Lessons and tasks can only take you to 60%. The rest has to come from
          real evidence: interviews, tested hypotheses, and competitors.
        </p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-3">
          {progress.parts.map((part) => (
            <li key={part.label}>
              <div className="flex justify-between text-sm">
                <span>{part.label}</span>
                <span className="text-muted-foreground">{part.percent}%</span>
              </div>
              <Bar percent={part.percent} className="mt-1" />
            </li>
          ))}
        </ul>

        <h3 className="mt-6 text-sm font-semibold">Your roadmap</h3>
        <ol className="mt-3 flex flex-col gap-1.5">
          {STAGES.map((stage, i) => {
            const s = stageInfo(venture.venture_type, stage);
            const state =
              i < currentIndex
                ? "done"
                : i === currentIndex
                  ? "current"
                  : "next";
            return (
              <li
                key={stage}
                className={cn(
                  "flex items-start gap-3 rounded-lg px-3 py-2 text-sm",
                  state === "current" && "bg-secondary",
                  state === "next" && "text-muted-foreground",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border text-xs",
                    state === "done" &&
                      "border-primary bg-primary text-primary-foreground",
                    state === "current" && "border-primary text-primary",
                  )}
                >
                  {state === "done" ? "✓" : state === "current" ? "→" : ""}
                </span>
                <span>
                  <span
                    className={cn(
                      "font-medium",
                      state !== "next" && "text-foreground",
                    )}
                  >
                    {s.name}
                  </span>
                  {state === "current" && (
                    <span className="block text-muted-foreground">
                      {s.goal}
                    </span>
                  )}
                </span>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="mt-8 rounded-xl border border-border p-5">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-lg font-semibold">Venture health</h2>
          <span className="text-2xl font-bold text-primary">
            {health.overall}/100
          </span>
        </div>
        <ul className="mt-4 flex flex-col gap-3">
          {health.categories.map((c) => (
            <li key={c.id}>
              <div className="flex justify-between text-sm">
                <span>{c.label}</span>
                <span className="text-muted-foreground">{c.score}</span>
              </div>
              <Bar percent={c.score} className="mt-1" />
            </li>
          ))}
        </ul>
        <div className="mt-5 rounded-lg bg-tint p-4 text-sm">
          <p>
            <span className="font-semibold">Biggest weakness: </span>
            {health.weakest.label}
          </p>
          <p className="mt-1 text-muted-foreground">{health.weakest.tip}</p>
        </div>
      </section>

      {actions.length > 1 && (
        <section className="mt-8">
          <h2 className="text-lg font-semibold">Also worth doing</h2>
          <ul className="mt-3 flex flex-col gap-2">
            {actions.slice(1, 5).map((a) => (
              <li key={a.title}>
                <Link
                  href={a.href}
                  className="flex items-center justify-between gap-3 rounded-lg border border-border px-3 py-2.5 transition-colors hover:bg-accent/40"
                >
                  <span>
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
          </ul>
        </section>
      )}
    </div>
  );
}
