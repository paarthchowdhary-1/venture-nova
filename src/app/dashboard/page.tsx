import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { ProgressBar } from "~/components/ui/progress";
import { stageInfo } from "~/content/roadmaps";
import { recommendedActions, ventureProgress } from "~/lib/insights";
import { getSessionUser, getSupabase } from "~/lib/session";
import { cn } from "~/lib/utils";
import { typeStyle } from "~/lib/venture-style";
import { ventureTypeLabel } from "~/lib/ventures";
import { loadWorkspace } from "~/lib/workspace";

export const metadata: Metadata = {
  title: "Your ventures",
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  const supabase = await getSupabase();
  const user = await getSessionUser();
  if (!user) redirect("/login");

  const { data: ventures } = await supabase
    .from("ventures")
    .select("id")
    .order("created_at", { ascending: false });
  const workspaces = (
    await Promise.all(
      (ventures ?? []).map((v) => loadWorkspace(supabase, v.id)),
    )
  ).filter((w) => w !== null);

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-extrabold tracking-tight">
          Your <span className="text-gradient">ventures</span>
        </h1>
        <Button asChild variant="fun">
          <Link href="/ventures/new">+ New venture</Link>
        </Button>
      </div>

      {workspaces.length === 0 ? (
        <div className="mt-10 rounded-xl border border-dashed border-border p-10 text-center">
          <p className="font-medium">You haven&apos;t started a venture yet.</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Tell us your idea and we&apos;ll help you figure out what to do
            next.
          </p>
          <Button className="mt-6" asChild>
            <Link href="/ventures/new">Start your first venture</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {workspaces.map(({ snapshot }) => {
            const venture = snapshot.venture;
            const next = recommendedActions(snapshot)[0];
            const style = typeStyle(venture.venture_type);
            const percent = ventureProgress(snapshot).percent;
            return (
              <Link
                key={venture.id}
                href={`/ventures/${venture.id}`}
                className="group card-pop relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
              >
                <div
                  aria-hidden
                  className={cn("h-1.5 w-full bg-linear-to-r", style.strip)}
                />
                <div className="flex flex-1 flex-col gap-4 p-5">
                  <div className="flex items-start gap-3">
                    <span
                      aria-hidden
                      className={cn(
                        "flex size-11 shrink-0 items-center justify-center rounded-xl text-xl",
                        style.soft,
                      )}
                    >
                      {style.emoji}
                    </span>
                    <div className="min-w-0">
                      <h2 className="truncate text-lg font-bold">
                        {venture.name}
                      </h2>
                      <p className="line-clamp-2 text-sm text-muted-foreground">
                        {venture.idea}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge className={cn(style.soft, style.ink)}>
                      {ventureTypeLabel(venture.venture_type)}
                    </Badge>
                    <Badge variant="outline">
                      {
                        stageInfo(venture.venture_type, venture.current_stage)
                          .name
                      }
                    </Badge>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="text-primary">{percent}%</span>
                    </div>
                    <ProgressBar
                      percent={percent}
                      className="mt-1.5"
                      label={`${venture.name} progress`}
                    />
                  </div>
                  {next && (
                    <div className="mt-auto rounded-xl bg-tint p-3 transition-colors group-hover:bg-secondary">
                      <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                        <span aria-hidden>🎯</span> Next best action
                      </p>
                      <p className="mt-1 text-sm font-medium">{next.title}</p>
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
