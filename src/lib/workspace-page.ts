import { notFound, redirect } from "next/navigation";
import { getSessionUser, getSupabase } from "~/lib/session";
import { loadWorkspace } from "~/lib/workspace";

/** Shared guard for venture pages: must be logged in and own the venture. */
export async function requireWorkspace(ventureId: string) {
  const supabase = await getSupabase();
  const user = await getSessionUser();
  if (!user) redirect("/login");

  const workspace = await loadWorkspace(supabase, ventureId);
  if (!workspace) notFound();
  return { supabase, workspace, snapshot: workspace.snapshot };
}
