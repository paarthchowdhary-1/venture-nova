"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { lessonsForVenture, stageForProgress } from "~/content/lessons";
import { createClient } from "~/lib/supabase/server";
import { VENTURE_TYPE_VALUES } from "~/lib/ventures";

export type VentureFormState = { error?: string };

const ventureSchema = z.object({
  name: z.string().trim().min(1, "Give your venture a name.").max(120),
  idea: z
    .string()
    .trim()
    .min(1, "Describe your idea in a sentence or two.")
    .max(2000),
  problem: z.string().trim().max(2000),
  targetCustomer: z.string().trim().max(1000),
  ventureType: z.enum(VENTURE_TYPE_VALUES, {
    error: "Pick the kind of venture this is.",
  }),
});

export async function createVenture(
  _prev: VentureFormState,
  formData: FormData,
): Promise<VentureFormState> {
  const parsed = ventureSchema.safeParse({
    name: formData.get("name") ?? "",
    idea: formData.get("idea") ?? "",
    problem: formData.get("problem") ?? "",
    targetCustomer: formData.get("targetCustomer") ?? "",
    ventureType: formData.get("ventureType"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { name, idea, problem, targetCustomer, ventureType } = parsed.data;
  const { data, error } = await supabase
    .from("ventures")
    .insert({
      name,
      idea,
      problem: problem || null,
      target_customer: targetCustomer || null,
      venture_type: ventureType,
    })
    .select("id")
    .single();

  if (error || !data) {
    return { error: "Couldn't save your venture. Please try again." };
  }
  redirect(`/ventures/${data.id}`);
}

/**
 * The guided first-run form only asks for the idea and the kind of venture.
 * A name is optional: leaving it blank saves the venture as "Untitled", which
 * the student can rename at any time. They land on the venture with a welcome
 * moment and their first task.
 */
export async function quickStartVenture(
  _prev: VentureFormState,
  formData: FormData,
): Promise<VentureFormState> {
  const typedName = String(formData.get("name") ?? "").trim();
  const parsed = ventureSchema.safeParse({
    name: typedName || "Untitled",
    idea: formData.get("idea") ?? "",
    problem: "",
    targetCustomer: "",
    ventureType: formData.get("ventureType"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { name, idea, ventureType } = parsed.data;
  const { data, error } = await supabase
    .from("ventures")
    .insert({ name, idea, venture_type: ventureType })
    .select("id")
    .single();

  if (error || !data) {
    return { error: "Couldn't save your venture. Please try again." };
  }
  revalidatePath("/dashboard");
  redirect(`/ventures/${data.id}?welcome=1`);
}

export async function updateVenture(
  ventureId: string,
  _prev: VentureFormState,
  formData: FormData,
): Promise<VentureFormState> {
  const parsed = ventureSchema.safeParse({
    name: formData.get("name") ?? "",
    idea: formData.get("idea") ?? "",
    problem: formData.get("problem") ?? "",
    targetCustomer: formData.get("targetCustomer") ?? "",
    ventureType: formData.get("ventureType"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { name, idea, problem, targetCustomer, ventureType } = parsed.data;
  const { data, error } = await supabase
    .from("ventures")
    .update({
      name,
      idea,
      problem: problem || null,
      target_customer: targetCustomer || null,
      venture_type: ventureType,
    })
    .eq("id", ventureId)
    .select("id")
    .maybeSingle();

  if (error || !data) {
    return { error: "Couldn't save your changes. Please try again." };
  }

  // A different venture type means a different set of lessons, so work out
  // the stage again from what has already been passed.
  const { data: rows } = await supabase
    .from("lesson_progress")
    .select("lesson_slug")
    .eq("venture_id", ventureId)
    .eq("passed", true);
  const passedSlugs = new Set((rows ?? []).map((r) => r.lesson_slug));
  const { stage } = stageForProgress(
    lessonsForVenture(ventureType),
    passedSlugs,
  );
  await supabase
    .from("ventures")
    .update({ current_stage: stage })
    .eq("id", ventureId);

  revalidatePath(`/ventures/${ventureId}`, "layout");
  revalidatePath("/dashboard");
  redirect(`/ventures/${ventureId}`);
}

export async function deleteVenture(ventureId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { error } = await supabase
    .from("ventures")
    .delete()
    .eq("id", ventureId);
  if (error) {
    throw new Error("Couldn't delete this venture.");
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}
