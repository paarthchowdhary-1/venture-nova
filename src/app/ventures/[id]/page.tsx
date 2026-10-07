import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { ProgressBar, type ProgressTone } from "~/components/ui/progress";
import { VentureTitle } from "~/components/venture-title";
import { stageIndex } from "~/content/lessons";
import { stageInfo } from "~/content/roadmaps";
import {
  recommendedActions,
  ventureHealth,
  ventureProgress,
} from "~/lib/insights";
import { cn } from "~/lib/utils";
import { STAGE_EMOJI, typeStyle } from "~/lib/venture-style";
import { STAGES, ventureTypeLabel } from "~/lib/ventures";
import { requireWorkspace } from "~/lib/workspace-page";

const PART_TONE: Record<string, ProgressTone> = {
  Lessons: "sky",
  Tasks: "mint",
  Evidence: "grape",
};
const HEALTH_TONES: ProgressTone[] = [
  "brand",
  "mint",
  "coral",
  "sky",
  "grape",
  "sun",
];

export const metadata: Metadata = {
  title: "Venture overview",
  robots: { index: false, follow: false },
};

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
  const style = typeStyle(venture.venture_type);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <Link
        href="/dashboard"
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        &larr; All ventures
      </Link>
      <header
        className={cn(
          "relative mt-4 overflow-hidden rounded-2xl border border-border p-5 sm:p-6",
          style.soft,
        )}
      >
        <div
          aria-hidden
          className={cn(
            "absolute inset-x-0 top-0 h-1.5 bg-linear-to-r",
            style.strip,
          )}
        />
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white/80 text-2xl shadow-sm"
            >
              {style.emoji}
            </span>
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              <VentureTitle name={venture.name} />
            </h1>
          </div>
          <Button variant="outline" size="sm" className="bg-white/70" asChild>
            <Link href={`/ventures/${id}/edit`}>Edit</Link>
          </Button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-white/80">
            {ventureTypeLabel(venture.venture_type)}
          </Badge>
          <Badge className="bg-primary text-primary-foreground">
            Now: {info.name}
          </Badge>
        </div>
        <p className="mt-4 text-foreground/80">{venture.idea}</p>
      </header>

      {nextAction && (
        <section className="bg-brand-gradient mt-8 rounded-2xl p-[2px] shadow-lg shadow-primary/20">
          <div className="rounded-[calc(var(--radius-xl)+0.0625rem)] bg-card p-5">
            <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              <span aria-hidden className="mr-1">
                🎯
              </span>
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
            <Button className="mt-4" variant="fun" asChild>
              <Link href={nextAction.href}>{nextAction.cta} &rarr;</Link>
            </Button>
          </div>
        </section>
      )}

      <section className="mt-8 rounded-2xl border border-border p-5 shadow-sm">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-lg font-semibold">Venture progress</h2>
          <span className="text-gradient text-3xl font-extrabold">
            {progress.percent}%
          </span>
        </div>
        <ProgressBar
          percent={progress.percent}
          className="mt-3 h-4"
          label="Venture progress"
        />
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
              <ProgressBar
                percent={part.percent}
                tone={PART_TONE[part.label] ?? "brand"}
                className="mt-1"
                label={part.label}
              />
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
                  state === "current" && "bg-secondary ring-1 ring-primary/30",
                  state === "next" && "text-muted-foreground",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full text-sm",
                    state === "done" && "bg-mint text-white",
                    state === "current" && "bg-brand-gradient glow",
                    state === "next" && "bg-muted grayscale",
                  )}
                >
                  {state === "done" ? "✓" : STAGE_EMOJI[i]}
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

      <section className="mt-8 rounded-2xl border border-border p-5 shadow-sm">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-lg font-semibold">Venture health</h2>
          <span className="text-gradient text-3xl font-extrabold">
            {health.overall}/100
          </span>
        </div>
        <ul className="mt-4 flex flex-col gap-3">
          {health.categories.map((c, i) => (
            <li key={c.id}>
              <div className="flex justify-between text-sm">
                <span>{c.label}</span>
                <span className="text-muted-foreground">{c.score}</span>
              </div>
              <ProgressBar
                percent={c.score}
                tone={HEALTH_TONES[i % HEALTH_TONES.length]}
                className="mt-1"
                label={c.label}
              />
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
