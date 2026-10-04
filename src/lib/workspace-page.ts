import { notFound, redirect } from "next/navigation";
import { createClient } from "~/lib/supabase/server";
import { loadWorkspace } from "~/lib/workspace";

/** Shared guard for venture pages: must be logged in and own the venture. */
export async function requireWorkspace(ventureId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const workspace = await loadWorkspace(supabase, ventureId);
  if (!workspace) notFound();
  return { supabase, workspace, snapshot: workspace.snapshot };
}
