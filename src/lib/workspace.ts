import type { SupabaseClient } from "@supabase/supabase-js";
import { LAUNCH_ITEMS } from "~/content/launch";
import { lessonsForVenture, nextLesson } from "~/content/lessons";
import {
  achievements,
  type Claim,
  type Competitor,
  type Decision,
  type EvidenceItem,
  type Hypothesis,
  type Interview,
  type MvpFeature,
  type Snapshot,
  ventureProgress,
} from "~/lib/insights";
import { loadTasks, type VentureTask } from "~/lib/tasks";

export type Workspace = {
  snapshot: Snapshot;
  tasks: VentureTask[];
  launchDoneSlugs: Set<string>;
  passedSlugs: Set<string>;
  isPublic: boolean;
};

/** Loads everything the workspace pages need for one venture. Returns null if it isn't theirs. */
export async function loadWorkspace(
  supabase: SupabaseClient,
  ventureId: string,
): Promise<Workspace | null> {
  const { data: venture } = await supabase
    .from("ventures")
    .select(
      "id, name, idea, problem, target_customer, venture_type, current_stage, is_public",
    )
    .eq("id", ventureId)
    .maybeSingle();
  if (!venture) return null;

  const [
    tasks,
    progress,
    interviews,
    hypotheses,
    claims,
    evidence,
    competitors,
    features,
    decisions,
    launch,
  ] = await Promise.all([
    loadTasks(supabase, ventureId),
    supabase
      .from("lesson_progress")
      .select("lesson_slug")
      .eq("venture_id", ventureId)
      .eq("passed", true),
    supabase
      .from("interviews")
      .select("id, interviewee, interviewed_on, notes, key_quote, tags")
      .eq("venture_id", ventureId)
      .order("interviewed_on", { ascending: false })
      .order("created_at", { ascending: false }),
    supabase
      .from("hypotheses")
      .select(
        "id, statement, experiment, questions, sample_target, threshold_pct, tested, supported, results_notes",
      )
      .eq("venture_id", ventureId)
      .order("created_at", { ascending: true }),
    supabase
      .from("claims")
      .select("id, statement")
      .eq("venture_id", ventureId)
      .order("created_at", { ascending: true }),
    supabase
      .from("evidence_items")
      .select("id, claim_id, kind, description, quantity")
      .eq("venture_id", ventureId)
      .order("created_at", { ascending: true }),
    supabase
      .from("competitors")
      .select("id, name, strength, weakness, target")
      .eq("venture_id", ventureId)
      .order("created_at", { ascending: true }),
    supabase
      .from("mvp_features")
      .select("id, name, bucket")
      .eq("venture_id", ventureId)
      .order("created_at", { ascending: true }),
    supabase
      .from("decisions")
      .select("id, decided_on, decision, reason, evidence")
      .eq("venture_id", ventureId)
      .order("decided_on", { ascending: false })
      .order("created_at", { ascending: false }),
    supabase
      .from("launch_items")
      .select("slug, done")
      .eq("venture_id", ventureId),
  ]);

  const passed = new Set((progress.data ?? []).map((r) => r.lesson_slug));
  const lessons = lessonsForVenture(venture.venture_type);
  const next = nextLesson(lessons, passed, venture.current_stage);
  const launchDoneSlugs = new Set(
    (launch.data ?? []).filter((r) => r.done).map((r) => r.slug),
  );

  const snapshot: Snapshot = {
    venture,
    lessons: {
      passed: passed.size,
      total: lessons.length,
      next: next ? { slug: next.slug, title: next.title } : null,
    },
    tasks: tasks.map((t) => ({
      catalog_slug: t.catalog_slug,
      stage: t.stage,
      title: t.title,
      status: t.status,
    })),
    interviews: (interviews.data ?? []) as Interview[],
    hypotheses: (hypotheses.data ?? []) as Hypothesis[],
    claims: (claims.data ?? []) as Claim[],
    evidence: (evidence.data ?? []) as EvidenceItem[],
    competitors: (competitors.data ?? []) as Competitor[],
    features: (features.data ?? []) as MvpFeature[],
    decisions: (decisions.data ?? []) as Decision[],
    launchDone: launchDoneSlugs.size,
    launchTotal: LAUNCH_ITEMS.length,
  };

  return {
    snapshot,
    tasks,
    launchDoneSlugs,
    passedSlugs: passed,
    isPublic: Boolean(venture.is_public),
  };
}

/** What a public portfolio page may show: counts and achievements only. */
export function buildPublicSummary(snapshot: Snapshot) {
  return {
    progress: ventureProgress(snapshot).percent,
    achievements: achievements(snapshot),
    updated_at: new Date().toISOString(),
  };
}
