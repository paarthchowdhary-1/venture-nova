"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { LAUNCH_ITEMS } from "~/content/launch";
import { parseTags } from "~/lib/insights";
import { createClient } from "~/lib/supabase/server";
import { buildPublicSummary, loadWorkspace } from "~/lib/workspace";

export type FormState = { ok?: boolean; error?: string };

async function session() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  return supabase;
}

function done(ventureId: string): FormState {
  revalidatePath(`/ventures/${ventureId}`, "layout");
  return { ok: true };
}

const text = (max: number) => z.string().trim().max(max);
const required = (max: number, message: string) =>
  z.string().trim().min(1, message).max(max);
const whole = (min: number, max: number, message: string) =>
  z.coerce
    .number({ error: message })
    .int(message)
    .min(min, message)
    .max(max, message);

function firstError(result: { error: z.ZodError }): FormState {
  return {
    error: result.error.issues[0]?.message ?? "Please check your answers.",
  };
}

// ------------------------------------------------------------- interviews

const interviewSchema = z.object({
  interviewee: required(
    120,
    "Who did you talk to? A first name or label is fine.",
  ),
  interviewed_on: z.string().trim().optional(),
  notes: text(4000),
  key_quote: text(500),
  tags: z.string().max(600),
});

export async function addInterview(
  ventureId: string,
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = interviewSchema.safeParse({
    interviewee: formData.get("interviewee") ?? "",
    interviewed_on: formData.get("interviewed_on") ?? "",
    notes: formData.get("notes") ?? "",
    key_quote: formData.get("key_quote") ?? "",
    tags: formData.get("tags") ?? "",
  });
  if (!parsed.success) return firstError(parsed);
  const d = parsed.data;

  const supabase = await session();
  const { error } = await supabase.from("interviews").insert({
    venture_id: ventureId,
    interviewee: d.interviewee,
    ...(d.interviewed_on ? { interviewed_on: d.interviewed_on } : {}),
    notes: d.notes || null,
    key_quote: d.key_quote || null,
    tags: parseTags(d.tags),
  });
  if (error)
    return { error: "Couldn't save that interview. Please try again." };
  return done(ventureId);
}

export async function deleteInterview(ventureId: string, id: string) {
  const supabase = await session();
  await supabase
    .from("interviews")
    .delete()
    .eq("id", id)
    .eq("venture_id", ventureId);
  revalidatePath(`/ventures/${ventureId}`, "layout");
}

// ------------------------------------------------------------- hypotheses

const hypothesisSchema = z.object({
  statement: required(500, "Write your hypothesis first."),
  experiment: text(1000),
  questions: text(2000),
  sample_target: whole(1, 1000, "Choose how many people to test (1 to 1000)."),
  threshold_pct: whole(1, 100, "Choose a success percentage (1 to 100)."),
});

const DEFAULT_QUESTIONS = [
  "How do you handle this today?",
  "What's the hardest part about it?",
  "When did it last happen, and what did you do?",
  "What have you tried so far?",
  "What would an ideal solution look like?",
].join("\n");

export async function addHypothesis(
  ventureId: string,
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = hypothesisSchema.safeParse({
    statement: formData.get("statement") ?? "",
    experiment: formData.get("experiment") ?? "",
    questions: formData.get("questions") ?? "",
    sample_target: formData.get("sample_target"),
    threshold_pct: formData.get("threshold_pct"),
  });
  if (!parsed.success) return firstError(parsed);
  const d = parsed.data;

  const supabase = await session();
  const { data: venture } = await supabase
    .from("ventures")
    .select("target_customer")
    .eq("id", ventureId)
    .maybeSingle();
  if (!venture) return { error: "Couldn't find that venture." };

  const audience =
    venture.target_customer?.trim() || "people who match your target customer";
  const { error } = await supabase.from("hypotheses").insert({
    venture_id: ventureId,
    statement: d.statement,
    experiment:
      d.experiment ||
      `Talk to ${d.sample_target} ${audience}. Count how many say this is true for them, with a real example.`,
    questions: d.questions || DEFAULT_QUESTIONS,
    sample_target: d.sample_target,
    threshold_pct: d.threshold_pct,
  });
  if (error)
    return { error: "Couldn't save your hypothesis. Please try again." };
  return done(ventureId);
}

const resultsSchema = z
  .object({
    tested: whole(0, 100000, "Enter how many people you tested."),
    supported: whole(0, 100000, "Enter how many supported the hypothesis."),
    results_notes: text(2000),
  })
  .refine((v) => v.supported <= v.tested, {
    message:
      "The number who supported it can't be more than the number tested.",
    path: ["supported"],
  });

export async function recordResults(
  ventureId: string,
  hypothesisId: string,
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = resultsSchema.safeParse({
    tested: formData.get("tested"),
    supported: formData.get("supported"),
    results_notes: formData.get("results_notes") ?? "",
  });
  if (!parsed.success) return firstError(parsed);

  const supabase = await session();
  const { data, error } = await supabase
    .from("hypotheses")
    .update({
      tested: parsed.data.tested,
      supported: parsed.data.supported,
      results_notes: parsed.data.results_notes || null,
    })
    .eq("id", hypothesisId)
    .eq("venture_id", ventureId)
    .select("id")
    .maybeSingle();
  if (error || !data) return { error: "Couldn't save those results." };
  return done(ventureId);
}

export async function deleteHypothesis(ventureId: string, id: string) {
  const supabase = await session();
  await supabase
    .from("hypotheses")
    .delete()
    .eq("id", id)
    .eq("venture_id", ventureId);
  revalidatePath(`/ventures/${ventureId}`, "layout");
}

// ------------------------------------------------------------- evidence vault

export async function addClaim(
  ventureId: string,
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = z
    .object({
      statement: required(500, "Write the claim you want to back up."),
    })
    .safeParse({ statement: formData.get("statement") ?? "" });
  if (!parsed.success) return firstError(parsed);

  const supabase = await session();
  const { error } = await supabase
    .from("claims")
    .insert({ venture_id: ventureId, statement: parsed.data.statement });
  if (error) return { error: "Couldn't save that claim." };
  return done(ventureId);
}

export async function deleteClaim(ventureId: string, id: string) {
  const supabase = await session();
  await supabase
    .from("claims")
    .delete()
    .eq("id", id)
    .eq("venture_id", ventureId);
  revalidatePath(`/ventures/${ventureId}`, "layout");
}

const evidenceSchema = z.object({
  kind: z.enum(
    ["interview", "survey", "competitor", "experiment", "observation"],
    {
      error: "Pick what kind of evidence this is.",
    },
  ),
  description: required(500, "Describe the evidence."),
  quantity: whole(1, 10000, "Enter how many (1 or more)."),
});

export async function addEvidence(
  ventureId: string,
  claimId: string,
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = evidenceSchema.safeParse({
    kind: formData.get("kind"),
    description: formData.get("description") ?? "",
    quantity: formData.get("quantity"),
  });
  if (!parsed.success) return firstError(parsed);

  const supabase = await session();
  const { error } = await supabase.from("evidence_items").insert({
    venture_id: ventureId,
    claim_id: claimId,
    ...parsed.data,
  });
  if (error) return { error: "Couldn't save that evidence." };
  return done(ventureId);
}

export async function deleteEvidence(ventureId: string, id: string) {
  const supabase = await session();
  await supabase
    .from("evidence_items")
    .delete()
    .eq("id", id)
    .eq("venture_id", ventureId);
  revalidatePath(`/ventures/${ventureId}`, "layout");
}

// ------------------------------------------------------------- competitors

const competitorSchema = z.object({
  name: required(120, "What is the competitor called?"),
  strength: text(500),
  weakness: text(500),
  target: text(300),
});

export async function addCompetitor(
  ventureId: string,
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = competitorSchema.safeParse({
    name: formData.get("name") ?? "",
    strength: formData.get("strength") ?? "",
    weakness: formData.get("weakness") ?? "",
    target: formData.get("target") ?? "",
  });
  if (!parsed.success) return firstError(parsed);

  const supabase = await session();
  const { error } = await supabase.from("competitors").insert({
    venture_id: ventureId,
    name: parsed.data.name,
    strength: parsed.data.strength || null,
    weakness: parsed.data.weakness || null,
    target: parsed.data.target || null,
  });
  if (error) return { error: "Couldn't save that competitor." };
  return done(ventureId);
}

export async function deleteCompetitor(ventureId: string, id: string) {
  const supabase = await session();
  await supabase
    .from("competitors")
    .delete()
    .eq("id", id)
    .eq("venture_id", ventureId);
  revalidatePath(`/ventures/${ventureId}`, "layout");
}

// ------------------------------------------------------------- mvp features

const featureSchema = z.object({
  name: required(200, "Name the feature."),
  bucket: z.enum(["must", "should", "later"], {
    error: "Pick must have, should have, or later.",
  }),
});

export async function addFeature(
  ventureId: string,
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = featureSchema.safeParse({
    name: formData.get("name") ?? "",
    bucket: formData.get("bucket"),
  });
  if (!parsed.success) return firstError(parsed);

  const supabase = await session();
  const { error } = await supabase
    .from("mvp_features")
    .insert({ venture_id: ventureId, ...parsed.data });
  if (error) return { error: "Couldn't save that feature." };
  return done(ventureId);
}

export async function moveFeature(
  ventureId: string,
  id: string,
  bucket: string,
) {
  if (!["must", "should", "later"].includes(bucket)) return;
  const supabase = await session();
  await supabase
    .from("mvp_features")
    .update({ bucket })
    .eq("id", id)
    .eq("venture_id", ventureId);
  revalidatePath(`/ventures/${ventureId}`, "layout");
}

export async function deleteFeature(ventureId: string, id: string) {
  const supabase = await session();
  await supabase
    .from("mvp_features")
    .delete()
    .eq("id", id)
    .eq("venture_id", ventureId);
  revalidatePath(`/ventures/${ventureId}`, "layout");
}

// ------------------------------------------------------------- decisions

const decisionSchema = z.object({
  decision: required(500, "What did you decide?"),
  reason: text(1000),
  evidence: text(1000),
  decided_on: z.string().trim().optional(),
});

export async function addDecision(
  ventureId: string,
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = decisionSchema.safeParse({
    decision: formData.get("decision") ?? "",
    reason: formData.get("reason") ?? "",
    evidence: formData.get("evidence") ?? "",
    decided_on: formData.get("decided_on") ?? "",
  });
  if (!parsed.success) return firstError(parsed);
  const d = parsed.data;

  const supabase = await session();
  const { error } = await supabase.from("decisions").insert({
    venture_id: ventureId,
    decision: d.decision,
    reason: d.reason || null,
    evidence: d.evidence || null,
    ...(d.decided_on ? { decided_on: d.decided_on } : {}),
  });
  if (error) return { error: "Couldn't save that decision." };
  return done(ventureId);
}

export async function deleteDecision(ventureId: string, id: string) {
  const supabase = await session();
  await supabase
    .from("decisions")
    .delete()
    .eq("id", id)
    .eq("venture_id", ventureId);
  revalidatePath(`/ventures/${ventureId}`, "layout");
}

// ------------------------------------------------------------- launch center

export async function toggleLaunchItem(
  ventureId: string,
  slug: string,
  value: boolean,
) {
  if (!LAUNCH_ITEMS.some((i) => i.slug === slug)) return;
  const supabase = await session();
  await supabase.from("launch_items").upsert(
    {
      venture_id: ventureId,
      slug,
      done: value,
      done_at: value ? new Date().toISOString() : null,
    },
    { onConflict: "venture_id,slug" },
  );
  revalidatePath(`/ventures/${ventureId}`, "layout");
}

// ------------------------------------------------------------- sharing

export async function setSharing(ventureId: string, enabled: boolean) {
  const supabase = await session();
  if (enabled) {
    const workspace = await loadWorkspace(supabase, ventureId);
    if (!workspace) return;
    await supabase
      .from("ventures")
      .update({
        is_public: true,
        public_summary: buildPublicSummary(workspace.snapshot),
      })
      .eq("id", ventureId);
  } else {
    await supabase
      .from("ventures")
      .update({ is_public: false, public_summary: null })
      .eq("id", ventureId);
  }
  revalidatePath(`/ventures/${ventureId}`, "layout");
  revalidatePath(`/v/${ventureId}`);
}
