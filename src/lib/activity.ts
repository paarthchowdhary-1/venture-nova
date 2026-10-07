import type { SupabaseClient } from "@supabase/supabase-js";
import type { IconName } from "~/components/icons";
import { getLesson } from "~/content/lessons";

export type Win = { id: string; label: string; at: string; icon: IconName };

type Row = Record<string, string | null>;

async function recent(
  supabase: SupabaseClient,
  table: string,
  columns: string,
  dateColumn: string,
  equals?: [column: string, value: string | boolean],
) {
  let query = supabase
    .from(table)
    .select(columns)
    .not(dateColumn, "is", null)
    .order(dateColumn, { ascending: false })
    .limit(30);
  if (equals) query = query.eq(equals[0], equals[1]);
  const { data } = await query;
  return (data ?? []) as unknown as Row[];
}

/**
 * The founder's recent real activity across every venture: used for the
 * "Recent wins" list and the daily streak. Row level security keeps each query
 * to the signed-in founder's own data.
 */
export async function loadActivity(supabase: SupabaseClient) {
  const [
    tasks,
    lessons,
    interviews,
    hypotheses,
    claims,
    decisions,
    competitors,
  ] = await Promise.all([
    recent(
      supabase,
      "roadmap_tasks",
      "id, title, completed_at",
      "completed_at",
      ["status", "done"],
    ),
    recent(
      supabase,
      "lesson_progress",
      "id, lesson_slug, passed_at",
      "passed_at",
      ["passed", true],
    ),
    recent(supabase, "interviews", "id, interviewee, created_at", "created_at"),
    recent(supabase, "hypotheses", "id, created_at", "created_at"),
    recent(supabase, "claims", "id, created_at", "created_at"),
    recent(supabase, "decisions", "id, created_at", "created_at"),
    recent(supabase, "competitors", "id, name, created_at", "created_at"),
  ]);

  const wins: Win[] = [
    ...tasks.map((r) => ({
      id: `t${r.id}`,
      label: `Completed "${r.title}"`,
      at: r.completed_at as string,
      icon: "checkCircle" as const,
    })),
    ...lessons.map((r) => ({
      id: `l${r.id}`,
      label: `Passed "${getLesson(r.lesson_slug as string)?.title ?? "a lesson"}"`,
      at: r.passed_at as string,
      icon: "checkCircle" as const,
    })),
    ...interviews.map((r) => ({
      id: `i${r.id}`,
      label: `Logged an interview with ${r.interviewee}`,
      at: r.created_at as string,
      icon: "users" as const,
    })),
    ...hypotheses.map((r) => ({
      id: `h${r.id}`,
      label: "Created a hypothesis to test",
      at: r.created_at as string,
      icon: "flask" as const,
    })),
    ...claims.map((r) => ({
      id: `c${r.id}`,
      label: "Recorded a claim in your Evidence Vault",
      at: r.created_at as string,
      icon: "file" as const,
    })),
    ...decisions.map((r) => ({
      id: `d${r.id}`,
      label: "Logged a decision",
      at: r.created_at as string,
      icon: "file" as const,
    })),
    ...competitors.map((r) => ({
      id: `k${r.id}`,
      label: `Added ${r.name} to your competitor radar`,
      at: r.created_at as string,
      icon: "target" as const,
    })),
  ].sort((a, b) => (a.at < b.at ? 1 : -1));

  return { wins: wins.slice(0, 4), streak: streakDays(wins.map((w) => w.at)) };
}

const dayKey = (d: Date) => d.toISOString().slice(0, 10);

/** Consecutive days with activity, counting back from today (or yesterday). */
export function streakDays(timestamps: string[], now = new Date()) {
  const days = new Set(timestamps.map((t) => dayKey(new Date(t))));
  const cursor = new Date(now);
  if (!days.has(dayKey(cursor))) cursor.setUTCDate(cursor.getUTCDate() - 1);
  let streak = 0;
  while (days.has(dayKey(cursor))) {
    streak += 1;
    cursor.setUTCDate(cursor.getUTCDate() - 1);
  }
  return streak;
}

/** "Today", "Yesterday", or a short date. */
export function relativeDay(iso: string, now = new Date()) {
  const diff = Math.round(
    (Date.parse(dayKey(now)) - Date.parse(dayKey(new Date(iso)))) / 86_400_000,
  );
  if (diff <= 0) return "Today";
  if (diff === 1) return "Yesterday";
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}
