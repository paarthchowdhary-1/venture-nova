import { createClient } from "@supabase/supabase-js";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AchievementList } from "~/components/achievements";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { stageInfo } from "~/content/roadmaps";
import { env } from "~/env";
import { ventureTypeLabel } from "~/lib/ventures";

export const metadata: Metadata = {
  title: "Founder portfolio",
  robots: { index: false, follow: false },
};

type Summary = { progress?: number; achievements?: string[] };

export default async function PublicVenturePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // A plain anonymous client: it can only ever see ventures the owner made
  // public, and only the columns granted to the anon role.
  const supabase = createClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
  const { data: venture } = await supabase
    .from("ventures")
    .select("id, name, idea, venture_type, current_stage, public_summary")
    .eq("id", id)
    .eq("is_public", true)
    .maybeSingle();
  if (!venture) notFound();

  const summary = (venture.public_summary ?? {}) as Summary;
  const stage = stageInfo(venture.venture_type, venture.current_stage);

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-12">
      <Badge variant="secondary">Founder portfolio</Badge>
      <h1 className="mt-4 text-3xl font-bold tracking-tight">{venture.name}</h1>
      <div className="mt-3 flex flex-wrap gap-2">
        <Badge variant="outline">
          {ventureTypeLabel(venture.venture_type)}
        </Badge>
        <Badge variant="outline">Stage: {stage.name}</Badge>
      </div>
      <p className="mt-6 text-lg">{venture.idea}</p>

      {typeof summary.progress === "number" && (
        <div className="mt-8">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Venture progress</span>
            <span className="text-muted-foreground">{summary.progress}%</span>
          </div>
          <div
            role="progressbar"
            aria-valuenow={summary.progress}
            aria-valuemin={0}
            aria-valuemax={100}
            className="mt-1 h-3 w-full overflow-hidden rounded-full bg-secondary"
          >
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${Math.max(2, summary.progress)}%` }}
            />
          </div>
        </div>
      )}

      {summary.achievements && summary.achievements.length > 0 && (
        <section className="mt-8">
          <h2 className="text-lg font-semibold">Achievements</h2>
          <AchievementList items={summary.achievements} />
        </section>
      )}

      <div className="mt-12 rounded-xl border border-border p-5 text-center">
        <p className="font-medium">
          Built with VentureNova, the entrepreneurship coach for young founders.
        </p>
        <Button className="mt-3" asChild>
          <Link href="/">Start your own venture</Link>
        </Button>
      </div>
    </div>
  );
}
