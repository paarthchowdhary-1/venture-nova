"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  aiConfigured,
  buildVentureContext,
  coachReply,
  type PivotSuggestion,
  suggestPivots,
} from "~/lib/ai";
import { createClient } from "~/lib/supabase/server";
import { loadWorkspace } from "~/lib/workspace";

export type CoachState = { ok?: boolean; error?: string };
export type PivotState = { pivots?: PivotSuggestion[]; error?: string };

const MAX_MESSAGES_PER_HOUR = 30;
const NOT_CONNECTED = "The AI coach isn't switched on yet. Check back soon.";

async function session() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  return supabase;
}

export async function sendCoachMessage(
  ventureId: string,
  _prev: CoachState,
  formData: FormData,
): Promise<CoachState> {
  const parsed = z
    .string()
    .trim()
    .min(1, "Type a message first.")
    .max(2000, "Keep your message under 2000 characters.")
    .safeParse(formData.get("message") ?? "");
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message };
  }
  if (!aiConfigured()) return { error: NOT_CONNECTED };

  const supabase = await session();
  const workspace = await loadWorkspace(supabase, ventureId);
  if (!workspace) return { error: "Couldn't find that venture." };

  const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { count } = await supabase
    .from("coach_messages")
    .select("id", { count: "exact", head: true })
    .eq("venture_id", ventureId)
    .eq("role", "user")
    .gte("created_at", since);
  if ((count ?? 0) >= MAX_MESSAGES_PER_HOUR) {
    return {
      error:
        "You've sent a lot of messages in the last hour. Take a break, try the next step, and come back.",
    };
  }

  const { error: saveError } = await supabase.from("coach_messages").insert({
    venture_id: ventureId,
    role: "user",
    content: parsed.data,
  });
  if (saveError) return { error: "Couldn't send that. Please try again." };

  const { data: recent } = await supabase
    .from("coach_messages")
    .select("role, content")
    .eq("venture_id", ventureId)
    .order("created_at", { ascending: false })
    .limit(20);
  const history = (recent ?? [])
    .reverse()
    .map((m) => ({ role: m.role as "user" | "assistant", content: m.content }));
  while (history[0] && history[0].role !== "user") history.shift();

  let reply: string;
  try {
    reply = await coachReply(buildVentureContext(workspace.snapshot), history);
  } catch (error) {
    console.error("Coach reply failed:", error);
    return {
      error:
        "The coach couldn't answer just now. Please try again in a moment.",
    };
  }

  await supabase.from("coach_messages").insert({
    venture_id: ventureId,
    role: "assistant",
    content: reply.slice(0, 8000),
  });

  revalidatePath(`/ventures/${ventureId}/coach`);
  return { ok: true };
}

export async function clearCoachChat(ventureId: string) {
  const supabase = await session();
  await supabase.from("coach_messages").delete().eq("venture_id", ventureId);
  revalidatePath(`/ventures/${ventureId}/coach`);
}

export async function getPivotSuggestions(
  ventureId: string,
  _prev: PivotState,
): Promise<PivotState> {
  if (!aiConfigured()) return { error: NOT_CONNECTED };
  const supabase = await session();
  const workspace = await loadWorkspace(supabase, ventureId);
  if (!workspace) return { error: "Couldn't find that venture." };

  try {
    const pivots = await suggestPivots(buildVentureContext(workspace.snapshot));
    return { pivots };
  } catch (error) {
    console.error("Pivot suggestions failed:", error);
    return {
      error: "Couldn't come up with pivots just now. Please try again.",
    };
  }
}
