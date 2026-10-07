import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Greeting } from "~/components/dashboard/greeting";
import { Orbit } from "~/components/dashboard/orbit";
import { Icon, Sparkle } from "~/components/icons";
import { NameForm } from "~/components/name-form";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { ProgressBar } from "~/components/ui/progress";
import { VentureTitle } from "~/components/venture-title";
import { stageIndex } from "~/content/lessons";
import { stageInfo } from "~/content/roadmaps";
import { loadActivity, relativeDay } from "~/lib/activity";
import { recommendedActions, ventureProgress } from "~/lib/insights";
import { getSessionUser, getSupabase } from "~/lib/session";
import { cn } from "~/lib/utils";
import { typeStyle } from "~/lib/venture-style";
import { STAGES, ventureTypeLabel } from "~/lib/ventures";
import { loadWorkspace } from "~/lib/workspace";

export const metadata: Metadata = {
  title: "Your ventures",
  robots: { index: false, follow: false },
};

function Panel({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-border bg-card p-5 shadow-sm",
        className,
      )}
    >
      {children}
    </section>
  );
}

export default async function DashboardPage() {
  const supabase = await getSupabase();
  const user = await getSessionUser();
  if (!user) redirect("/login");

  const { data: ventures } = await supabase
    .from("ventures")
    .select("id")
    .order("created_at", { ascending: false });
  const [workspaces, activity] = await Promise.all([
    Promise.all(
      (ventures ?? []).map((v) => loadWorkspace(supabase, v.id)),
    ).then((list) => list.filter((w) => w !== null)),
    loadActivity(supabase),
  ]);

  const primary = workspaces[0]?.snapshot;
  const others = workspaces.slice(1);
  const next = primary ? recommendedActions(primary)[0] : undefined;
  const progress = primary ? ventureProgress(primary) : undefined;
  const currentIndex = primary ? stageIndex(primary.venture.current_stage) : 0;

  const stageCards = primary
    ? ([currentIndex - 1, currentIndex, currentIndex + 1] as const)
        .filter((i) => i >= 0 && i < STAGES.length)
        .map((i) => ({
          index: i,
          name: stageInfo(primary.venture.venture_type, STAGES[i]).name,
          state:
            i < currentIndex
              ? ("done" as const)
              : i === currentIndex
                ? ("current" as const)
                : ("next" as const),
        }))
    : [];

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Greeting name={user.name} />
        <Button asChild variant="outline" className="rounded-full">
          <Link href="/ventures/new">
            <Icon name="plus" className="size-4" /> New venture
          </Link>
        </Button>
      </div>

      {!user.name && (
        <div className="mt-5">
          <NameForm />
        </div>
      )}

      {!primary ? (
        <Panel className="mt-6 flex flex-col items-center gap-3 border-dashed py-14 text-center">
          <Sparkle className="size-10 text-primary-ink" />
          <p className="text-lg font-bold">
            You haven&apos;t started a venture yet.
          </p>
          <p className="max-w-sm text-sm text-muted-foreground">
            Tell us your idea and we&apos;ll build you a roadmap, with real
            tasks and a coach to push you.
          </p>
          <Button asChild variant="fun" size="lg" className="mt-2 rounded-full">
            <Link href="/ventures/new">Start your first venture</Link>
          </Button>
        </Panel>
      ) : (
        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_21rem]">
          <div className="flex min-w-0 flex-col gap-6">
            {/* Your venture */}
            <section className="bg-hero @container relative isolate overflow-hidden rounded-3xl border border-primary/30 p-7 shadow-xl shadow-primary/10 sm:p-10">
              <Orbit className="pointer-events-none absolute top-1/2 right-0 -z-10 h-72 -translate-y-1/2 opacity-25 @2xl:right-6 @2xl:h-80 @2xl:opacity-90" />
              <p className="text-sm font-semibold tracking-wider text-primary-ink uppercase">
                Your venture
              </p>
              <h2 className="mt-3 text-4xl leading-[1.05] font-extrabold tracking-tight sm:text-5xl @2xl:max-w-[60%] @4xl:text-6xl">
                <VentureTitle name={primary.venture.name} />
              </h2>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Badge
                  className={cn(
                    "px-3 py-1 text-sm",
                    typeStyle(primary.venture.venture_type).soft,
                    typeStyle(primary.venture.venture_type).ink,
                  )}
                >
                  {ventureTypeLabel(primary.venture.venture_type)}
                </Badge>
                <Link
                  href={`/ventures/${primary.venture.id}/edit`}
                  className="flex items-center gap-1.5 text-sm font-semibold text-primary-ink hover:underline"
                >
                  <Icon name="pencil" className="size-4" /> Edit idea
                </Link>
              </div>
            </section>

            {/* Your next move */}
            {next && (
              <section>
                <h2 className="text-xl font-bold">Your next move</h2>
                <p className="text-sm text-muted-foreground">
                  Small action. Real evidence.
                </p>
                <div className="mt-3 rounded-2xl border border-border border-l-4 border-l-primary bg-card p-5 sm:p-6">
                  <span className="inline-flex rounded-md bg-primary/20 px-2.5 py-1 text-xs font-semibold text-primary-ink">
                    {String(currentIndex + 1).padStart(2, "0")} &middot;{" "}
                    {
                      stageInfo(
                        primary.venture.venture_type,
                        primary.venture.current_stage,
                      ).name
                    }
                  </span>
                  <h3 className="mt-3 text-xl font-bold">{next.title}</h3>
                  <p className="mt-1 max-w-2xl text-muted-foreground">
                    {next.why}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                    <p className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon name="clock" className="size-4" />
                      About {next.minutes} min
                    </p>
                    <Button asChild variant="fun" size="lg">
                      <Link href={next.href}>
                        {next.cta} <Icon name="arrowRight" className="size-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </section>
            )}

            {/* Roadmap progress */}
            {progress && (
              <section className="@container">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold">Roadmap progress</h2>
                    <p className="text-sm text-muted-foreground">
                      {currentIndex} of {STAGES.length} stages complete
                    </p>
                  </div>
                  <span className="text-gradient text-2xl font-extrabold">
                    {progress.percent}%
                  </span>
                </div>
                <ProgressBar
                  percent={progress.percent}
                  className="mt-3"
                  label="Roadmap progress"
                />
                <ul className="mt-4 grid gap-3 @lg:grid-cols-3">
                  {stageCards.map((c) => (
                    <li key={c.index}>
                      <Link
                        href={`/ventures/${primary.venture.id}`}
                        className={cn(
                          "card-pop flex items-center gap-3 rounded-2xl border bg-card p-4",
                          c.state === "current"
                            ? "border-primary/60"
                            : "border-border",
                        )}
                      >
                        <span
                          aria-hidden
                          className={cn(
                            "flex size-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold",
                            c.state === "done" &&
                              "border-mint bg-mint text-background",
                            c.state === "current" &&
                              "border-primary text-primary-ink",
                            c.state === "next" &&
                              "border-border text-muted-foreground",
                          )}
                        >
                          {c.state === "done" ? "✓" : ""}
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate font-semibold">
                            {c.name}
                          </span>
                          <span
                            className={cn(
                              "text-sm",
                              c.state === "done" && "text-mint",
                              c.state === "current" && "text-primary-ink",
                              c.state === "next" && "text-muted-foreground",
                            )}
                          >
                            {c.state === "done"
                              ? "Complete"
                              : c.state === "current"
                                ? "In progress"
                                : "Up next"}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Other ventures */}
            {others.length > 0 && (
              <section>
                <h2 className="text-xl font-bold">Your other ventures</h2>
                <ul className="mt-3 grid gap-4 sm:grid-cols-2">
                  {others.map(({ snapshot }) => {
                    const v = snapshot.venture;
                    const style = typeStyle(v.venture_type);
                    const percent = ventureProgress(snapshot).percent;
                    return (
                      <li key={v.id}>
                        <Link
                          href={`/ventures/${v.id}`}
                          className="card-pop relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card"
                        >
                          <div
                            aria-hidden
                            className={cn(
                              "h-1.5 w-full bg-linear-to-r",
                              style.strip,
                            )}
                          />
                          <div className="flex flex-1 flex-col gap-3 p-5">
                            <div className="flex items-start gap-3">
                              <span
                                aria-hidden
                                className={cn(
                                  "flex size-10 shrink-0 items-center justify-center rounded-xl text-xl",
                                  style.soft,
                                )}
                              >
                                {style.emoji}
                              </span>
                              <div className="min-w-0">
                                <h3 className="font-bold">
                                  <VentureTitle name={v.name} />
                                </h3>
                              </div>
                            </div>
                            <div className="mt-auto">
                              <div className="flex justify-between text-xs font-semibold">
                                <span className="text-muted-foreground">
                                  {
                                    stageInfo(v.venture_type, v.current_stage)
                                      .name
                                  }
                                </span>
                                <span className="text-primary-ink">
                                  {percent}%
                                </span>
                              </div>
                              <ProgressBar
                                percent={percent}
                                className="mt-1.5"
                                label={`${v.name} progress`}
                              />
                            </div>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </section>
            )}
          </div>

          {/* Right column */}
          <aside className="flex flex-col gap-6" aria-label="Coach and wins">
            <Panel>
              <div className="flex items-center gap-2.5">
                <Sparkle className="size-6 text-primary-ink" />
                <h2 className="text-lg font-bold">Ask your coach</h2>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Your AI coach is ready when you are.
              </p>
              <form
                action={`/ventures/${primary.venture.id}/coach`}
                method="get"
                className="mt-4 flex items-center gap-2 rounded-xl border border-input bg-input/30 p-1.5 pl-3 focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/40"
              >
                <label htmlFor="coach-q" className="sr-only">
                  What are you stuck on?
                </label>
                <input
                  id="coach-q"
                  name="q"
                  maxLength={500}
                  placeholder="What are you stuck on?"
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
                <button
                  type="submit"
                  aria-label="Send to your coach"
                  className="bg-brand-gradient flex size-9 shrink-0 items-center justify-center rounded-full text-primary-foreground transition hover:brightness-110"
                >
                  <Icon name="send" className="size-4" />
                </button>
              </form>
            </Panel>

            <Panel>
              <h2 className="text-lg font-bold">Recent wins</h2>
              {activity.wins.length === 0 ? (
                <p className="mt-3 text-sm text-muted-foreground">
                  Your first win is one task away. Finish something and it shows
                  up here.
                </p>
              ) : (
                <ul className="mt-3 divide-y divide-border">
                  {activity.wins.map((w) => (
                    <li
                      key={w.id}
                      className="flex items-start gap-3 py-3 first:pt-0 last:pb-0"
                    >
                      <Icon
                        name={w.icon}
                        className="mt-0.5 size-5 shrink-0 text-mint"
                      />
                      <div className="min-w-0">
                        <p className="text-sm leading-snug font-medium">
                          {w.label}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {relativeDay(w.at)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </Panel>

            <Panel className="flex items-center gap-4">
              <span
                aria-hidden
                className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-warm/15 text-warm"
              >
                <Icon name="flame" className="size-7" />
              </span>
              <div>
                <p className="text-sm text-muted-foreground">
                  Your founder streak
                </p>
                <p className="text-2xl font-extrabold">
                  {activity.streak} {activity.streak === 1 ? "day" : "days"}
                </p>
              </div>
            </Panel>
          </aside>
        </div>
      )}
    </div>
  );
}
