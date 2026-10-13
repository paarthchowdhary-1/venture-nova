"use server";

import { z } from "zod";
import { createClient } from "~/lib/supabase/server";

export type FeedbackState = { error?: string; sent?: boolean };

const MAX_PER_HOUR = 5;

const feedbackSchema = z.object({
  message: z
    .string()
    .trim()
    .min(1, "Write a message first.")
    .max(2000, "Keep it under 2000 characters."),
  page: z.string().trim().max(200).optional(),
});

export async function sendFeedback(
  _prev: FeedbackState,
  formData: FormData,
): Promise<FeedbackState> {
  const parsed = feedbackSchema.safeParse({
    message: formData.get("message") ?? "",
    page: formData.get("page") || undefined,
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Please log in to send feedback." };

  // A small cap so one account can't flood the inbox.
  const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { count } = await supabase
    .from("feedback")
    .select("id", { count: "exact", head: true })
    .gte("created_at", since);
  if ((count ?? 0) >= MAX_PER_HOUR) {
    return {
      error: "You've sent a lot of messages. Please try again in a bit.",
    };
  }

  const { error } = await supabase
    .from("feedback")
    .insert({ message: parsed.data.message, page: parsed.data.page ?? null });
  if (error) {
    return { error: "Couldn't send that. Please try again." };
  }
  return { sent: true };
}
