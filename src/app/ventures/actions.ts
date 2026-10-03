"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
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
