import Link from "next/link";
import { notFound } from "next/navigation";
import { z } from "zod";
import {
  type AdminUserDetail,
  formatDate,
  formatDateTime,
  requireAdmin,
} from "~/lib/admin";
import { ventureTypeLabel } from "~/lib/ventures";

export default async function AdminUserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!z.uuid().safeParse(id).success) notFound();
  const { supabase } = await requireAdmin();

  const { data, error } = await supabase.rpc("admin_user_detail", {
    p_user: id,
  });
  if (error || !data) notFound();
  const user = data as AdminUserDetail;

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10">
      <Link
        href="/admin"
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        &larr; All users
      </Link>
      <h1 className="mt-4 text-2xl font-bold tracking-tight break-all">
        {user.email ?? "(no email)"}
      </h1>
      <dl className="mt-3 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
        <div>
          <dt className="text-muted-foreground">Joined</dt>
          <dd>{formatDate(user.created_at)}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Last sign-in</dt>
          <dd>{formatDateTime(user.last_sign_in_at)}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Email confirmed</dt>
          <dd>{user.confirmed ? "Yes" : "No"}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Role</dt>
          <dd>{user.is_admin ? "Admin" : "Founder"}</dd>
        </div>
      </dl>

      <h2 className="mt-10 text-lg font-semibold">
        Ventures ({user.ventures.length})
      </h2>
      <p className="mt-1 text-xs text-muted-foreground">
        Opening a venture shows its private content and is recorded in the
        access log.
      </p>
      <ul className="mt-3 flex flex-col gap-3">
        {user.ventures.map((v) => (
          <li key={v.id}>
            <Link
              href={`/admin/ventures/${v.id}`}
              className="block rounded-xl border border-border p-4 transition-colors hover:bg-accent/40"
            >
              <p className="font-semibold">{v.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {ventureTypeLabel(v.venture_type)} &middot;{" "}
                <span className="capitalize">{v.current_stage}</span> stage
                &middot; started {formatDate(v.created_at)}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {v.interviews} interviews &middot; {v.coach_messages} coach
                messages &middot; {v.is_public ? "public page on" : "private"}
              </p>
            </Link>
          </li>
        ))}
        {user.ventures.length === 0 && (
          <li className="text-sm text-muted-foreground">No ventures yet.</li>
        )}
      </ul>
    </div>
  );
}
