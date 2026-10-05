import { notFound, redirect } from "next/navigation";
import { cache } from "react";
import { getIsAdmin, getSessionUser, getSupabase } from "~/lib/session";

/**
 * Gate for every admin page. Non-admins get a plain 404 so the existence of the
 * admin area isn't advertised. The database enforces this too: each admin
 * function refuses to run for anyone who isn't in public.admins.
 */
export const requireAdmin = cache(async () => {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  if (!(await getIsAdmin())) notFound();
  return { supabase: await getSupabase(), user };
});

export type AdminOverview = {
  users_total: number;
  users_7d: number;
  users_30d: number;
  users_active_7d: number;
  users_unconfirmed: number;
  ventures_total: number;
  ventures_7d: number;
  ventures_public: number;
  lessons_passed: number;
  tasks_done: number;
  interviews: number;
  hypotheses: number;
  hypotheses_tested: number;
  claims: number;
  evidence_items: number;
  competitors: number;
  mvp_features: number;
  decisions: number;
  launch_items_done: number;
  coach_messages_total: number;
  coach_messages_24h: number;
  coach_messages_7d: number;
  coach_users_7d: number;
  waitlist_total: number;
  ventures_by_type: Record<string, number>;
  ventures_by_stage: Record<string, number>;
};

export type AdminDay = {
  day: string;
  signups: number;
  ventures: number;
  lessons_passed: number;
  coach_messages: number;
};

export type AdminUserRow = {
  id: string;
  email: string | null;
  name: string | null;
  created_at: string;
  last_sign_in_at: string | null;
  confirmed: boolean;
  ventures: number;
  lessons_passed: number;
  tasks_done: number;
  coach_messages: number;
  is_admin: boolean;
  total: number;
};

export type AdminUserDetail = {
  id: string;
  email: string | null;
  name: string | null;
  created_at: string;
  last_sign_in_at: string | null;
  confirmed: boolean;
  is_admin: boolean;
  ventures: {
    id: string;
    name: string;
    venture_type: string;
    current_stage: string;
    is_public: boolean;
    created_at: string;
    interviews: number;
    coach_messages: number;
  }[];
};

export type AdminVentureDetail = {
  venture: {
    id: string;
    user_id: string;
    owner_email: string | null;
    name: string;
    idea: string;
    problem: string | null;
    target_customer: string | null;
    venture_type: string;
    current_stage: string;
    is_public: boolean;
    created_at: string;
  };
  tasks: {
    stage: string;
    title: string;
    status: string;
    evidence: string | null;
    completed_at: string | null;
  }[];
  lessons: {
    lesson_slug: string;
    best_score: number;
    attempts: number;
    passed: boolean;
    passed_at: string | null;
  }[];
  interviews: {
    interviewee: string;
    interviewed_on: string;
    notes: string | null;
    key_quote: string | null;
    tags: string[];
  }[];
  hypotheses: {
    statement: string;
    experiment: string | null;
    questions: string | null;
    sample_target: number;
    threshold_pct: number;
    tested: number;
    supported: number;
    results_notes: string | null;
  }[];
  claims: {
    statement: string;
    evidence: { kind: string; quantity: number; description: string }[];
  }[];
  competitors: {
    name: string;
    strength: string | null;
    weakness: string | null;
    target: string | null;
  }[];
  features: { name: string; bucket: string }[];
  decisions: {
    decided_on: string;
    decision: string;
    reason: string | null;
    evidence: string | null;
  }[];
  launch_done: string[];
  coach_messages: number;
};

export type AdminChatMessage = {
  role: string;
  content: string;
  created_at: string;
};

export type AdminLogRow = {
  created_at: string;
  admin_email: string | null;
  action: string;
  target_email: string | null;
  venture_name: string | null;
};

export function formatDate(value: string | null | undefined) {
  if (!value) return "never";
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatDateTime(value: string | null | undefined) {
  if (!value) return "never";
  return new Date(value).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
