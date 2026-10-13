import type { Metadata } from "next";
import { formatDateTime, requireAdmin } from "~/lib/admin";

export const metadata: Metadata = {
  title: "Feedback",
  robots: { index: false, follow: false },
};

type FeedbackRow = {
  id: string;
  created_at: string;
  user_email: string | null;
  user_name: string | null;
  message: string;
  page: string | null;
};

export default async function AdminFeedbackPage() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.rpc("admin_feedback", { p_limit: 200 });
  const rows = (data ?? []) as FeedbackRow[];

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold tracking-tight">Feedback</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Messages students send from the Help &amp; feedback page, newest first.
      </p>
      <ul className="mt-6 flex flex-col gap-3">
        {rows.map((r) => (
          <li
            key={r.id}
            className="rounded-xl border border-border bg-card p-4 shadow-sm"
          >
            <p className="text-xs text-muted-foreground">
              <span className="font-medium text-foreground">
                {r.user_name ?? "Unnamed"}
              </span>{" "}
              ({r.user_email ?? "removed account"}) ·{" "}
              {formatDateTime(r.created_at)}
              {r.page ? ` · from ${r.page}` : ""}
            </p>
            <p className="mt-2 text-sm whitespace-pre-wrap">{r.message}</p>
          </li>
        ))}
        {rows.length === 0 && (
          <li className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
            No feedback yet.
          </li>
        )}
      </ul>
    </div>
  );
}
