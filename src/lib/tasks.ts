import type { SupabaseClient } from "@supabase/supabase-js";
import { TASK_CATALOG } from "~/content/tasks";

export type VentureTask = {
  id: string;
  stage: string;
  title: string;
  description: string | null;
  status: string;
  evidence: string | null;
  completed_at: string | null;
  catalog_slug: string | null;
  position: number;
};

/**
 * Makes sure a venture has a row for every catalog task, then returns all of its
 * tasks in order. Safe to call on every page view: it only inserts what is missing.
 */
export async function loadTasks(
  supabase: SupabaseClient,
  ventureId: string,
): Promise<VentureTask[]> {
  const { data: existing } = await supabase
    .from("roadmap_tasks")
    .select("catalog_slug")
    .eq("venture_id", ventureId)
    .not("catalog_slug", "is", null);
  const have = new Set((existing ?? []).map((r) => r.catalog_slug));

  const missing = TASK_CATALOG.map((task, position) => ({ task, position }))
    .filter(({ task }) => !have.has(task.slug))
    .map(({ task, position }) => ({
      venture_id: ventureId,
      catalog_slug: task.slug,
      stage: task.stage,
      title: task.title,
      description: task.description,
      position,
    }));
  if (missing.length > 0) {
    await supabase.from("roadmap_tasks").insert(missing);
  }

  const { data } = await supabase
    .from("roadmap_tasks")
    .select(
      "id, stage, title, description, status, evidence, completed_at, catalog_slug, position",
    )
    .eq("venture_id", ventureId)
    .order("position", { ascending: true });
  return (data ?? []) as VentureTask[];
}
