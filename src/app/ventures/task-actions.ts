"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "~/lib/supabase/server";

export type TaskState = { error?: string; saved?: boolean };

const taskSchema = z.object({
  evidence: z.string().trim().max(2000, "Keep it under 2000 characters."),
  intent: z.enum(["save", "done", "reopen"]),
});

export async function saveTask(
  ventureId: string,
  taskId: string,
  _prev: TaskState,
  formData: FormData,
): Promise<TaskState> {
  const parsed = taskSchema.safeParse({
    evidence: formData.get("evidence") ?? "",
    intent: formData.get("intent"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message };
  }
  const { evidence, intent } = parsed.data;

  if (intent === "done" && evidence.length < 10) {
    return {
      error:
        "Write down what actually happened first (a sentence or two), then mark it done.",
    };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data, error } = await supabase
    .from("roadmap_tasks")
    .update({
      evidence: evidence || null,
      ...(intent === "done"
        ? { status: "done", completed_at: new Date().toISOString() }
        : intent === "reopen"
          ? { status: "todo", completed_at: null }
          : {}),
    })
    .eq("id", taskId)
    .eq("venture_id", ventureId)
    .select("id")
    .maybeSingle();

  if (error || !data) {
    return { error: "Couldn't save that. Please try again." };
  }

  revalidatePath(`/ventures/${ventureId}`, "layout");
  return { saved: true };
}
