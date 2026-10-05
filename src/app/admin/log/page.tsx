import { type AdminLogRow, formatDateTime, requireAdmin } from "~/lib/admin";

const LABELS: Record<string, string> = {
  view_user: "Opened a user",
  view_venture: "Opened a venture's content",
  view_coach: "Read a coach chat",
};

export default async function AdminLogPage() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.rpc("admin_access_log_recent", {
    p_limit: 100,
  });
  const rows = (data ?? []) as AdminLogRow[];

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10">
      <h1 className="text-2xl font-bold tracking-tight">Access log</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Every time an admin opens a user, a venture, or a coach chat, it is
        recorded here. The database writes these entries itself, so private
        content can&apos;t be opened without a record.
      </p>
      <div className="mt-6 overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[36rem] text-left text-sm">
          <thead className="bg-tint text-xs tracking-wide text-muted-foreground uppercase">
            <tr>
              <th className="px-3 py-2 font-medium">When</th>
              <th className="px-3 py-2 font-medium">Admin</th>
              <th className="px-3 py-2 font-medium">What</th>
              <th className="px-3 py-2 font-medium">Whose</th>
              <th className="px-3 py-2 font-medium">Venture</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={`${r.created_at}-${r.action}-${r.venture_name}`}
                className="border-t border-border"
              >
                <td className="px-3 py-2 text-muted-foreground">
                  {formatDateTime(r.created_at)}
                </td>
                <td className="px-3 py-2">{r.admin_email ?? "(removed)"}</td>
                <td className="px-3 py-2">{LABELS[r.action] ?? r.action}</td>
                <td className="px-3 py-2">{r.target_email ?? "-"}</td>
                <td className="px-3 py-2">{r.venture_name ?? "-"}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-3 py-6 text-center text-muted-foreground"
                >
                  Nothing has been opened yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
