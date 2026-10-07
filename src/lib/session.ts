import { cache } from "react";
import { createClient } from "~/lib/supabase/server";

/**
 * Per-request helpers for server components. React's cache() makes the navbar,
 * layouts and pages that render in the same request share one Supabase client
 * and one answer to "who is this and are they an admin", instead of each
 * asking again over the network.
 *
 * getSessionUser() verifies the signed login token locally (the project uses
 * asymmetric signing keys), so it needs no round trip to the auth server. That
 * is right for deciding what to render. Server actions that change data still
 * call supabase.auth.getUser(), which checks with the server on every write.
 */
export const getSupabase = cache(async () => createClient());

export const getSessionUser = cache(async () => {
  const supabase = await getSupabase();
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;
  if (!claims?.sub) return null;
  const meta = claims.user_metadata as { full_name?: unknown } | undefined;
  const name =
    typeof meta?.full_name === "string" && meta.full_name.trim()
      ? meta.full_name.trim()
      : null;
  return {
    id: claims.sub,
    email: typeof claims.email === "string" ? claims.email : null,
    name,
  };
});

export const getIsAdmin = cache(async () => {
  const user = await getSessionUser();
  if (!user) return false;
  const supabase = await getSupabase();
  const { data } = await supabase.rpc("is_admin");
  return data === true;
});

/** The founder's ventures, newest first, for the sidebar. */
export const getMyVentures = cache(async () => {
  const user = await getSessionUser();
  if (!user) return [];
  const supabase = await getSupabase();
  const { data } = await supabase
    .from("ventures")
    .select("id, name")
    .order("created_at", { ascending: false })
    .limit(8);
  return (data ?? []) as { id: string; name: string }[];
});
