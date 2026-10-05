import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AchievementList } from "~/components/achievements";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { stageInfo } from "~/content/roadmaps";
import { achievements, ventureProgress } from "~/lib/insights";
import { getSessionUser, getSupabase } from "~/lib/session";
import { ventureTypeLabel } from "~/lib/ventures";
import { loadWorkspace } from "~/lib/workspace";

export const metadata: Metadata = {
  title: "Founder portfolio",
  robots: { index: false, follow: false },
};

export default async function PortfolioPage() {
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
    <div className="mx-auto w-full max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-bold tracking-tight">
        Your founder portfolio
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        A record of what you&apos;ve actually accomplished across your ventures.
      </p>

      {workspaces.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-border p-8 text-center">
          <p className="font-medium">No ventures yet.</p>
          <Button className="mt-4" asChild>
            <Link href="/ventures/new">Start your first venture</Link>
          </Button>
        </div>
      ) : (
        <ul className="mt-8 flex flex-col gap-6">
          {workspaces.map(({ snapshot, isPublic }) => {
            const v = snapshot.venture;
            const list = achievements(snapshot);
            return (
              <li
                key={v.id}
                className="card-pop rounded-2xl border border-border p-5 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-semibold">{v.name}</h2>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Badge variant="secondary">
                        {ventureTypeLabel(v.venture_type)}
                      </Badge>
                      <Badge variant="outline">
                        {stageInfo(v.venture_type, v.current_stage).name}
                      </Badge>
                      <Badge variant="outline">
                        {isPublic ? "Public" : "Private"}
                      </Badge>
                    </div>
                  </div>
                  <span className="text-gradient text-3xl font-extrabold">
                    {ventureProgress(snapshot).percent}%
                  </span>
                </div>
                {list.length > 0 ? (
                  <AchievementList items={list} />
                ) : (
                  <p className="mt-4 text-sm text-muted-foreground">
                    Nothing here yet. Your achievements show up as you do the
                    work.
                  </p>
                )}
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/ventures/${v.id}`}>Open venture</Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/ventures/${v.id}/share`}>Share settings</Link>
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
