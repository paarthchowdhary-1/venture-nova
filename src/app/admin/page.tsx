import type { Metadata } from "next";
import Link from "next/link";
import { stageInfo } from "~/content/roadmaps";
import {
  type AdminDay,
  type AdminOverview,
  type AdminUserRow,
  formatDate,
  requireAdmin,
} from "~/lib/admin";
import { STAGES, ventureTypeLabel } from "~/lib/ventures";

const PAGE_SIZE = 25;

function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: number | string;
  hint?: string;
}) {
  return (
    <div className="rounded-xl border border-border p-4">
      <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
        {label}
      </p>
      <p className="mt-1 text-2xl font-bold tabular-nums">{value}</p>
      {hint && <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

function MiniBars({
  title,
  days,
  pick,
}: {
  title: string;
  days: AdminDay[];
  pick: (d: AdminDay) => number;
}) {
  const values = days.map(pick);
  const max = Math.max(1, ...values);
  const total = values.reduce((a, b) => a + b, 0);
  return (
    <div className="rounded-xl border border-border p-4">
      <div className="flex items-baseline justify-between">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">{total} in 30 days</p>
      </div>
      <div
        role="img"
        aria-label={`${title}: ${total} in the last 30 days`}
        className="mt-3 flex h-16 items-end gap-0.5"
      >
        {days.map((d, i) => (
          <div
            key={d.day}
            title={`${formatDate(d.day)}: ${values[i]}`}
            className="min-h-0.5 flex-1 rounded-sm bg-primary/70"
            style={{ height: `${Math.max(3, (values[i] / max) * 100)}%` }}
          />
        ))}
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Overview",
  robots: { index: false, follow: false },
};

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const { q = "", page = "1" } = await searchParams;
  const pageNumber = Math.max(1, Number.parseInt(page, 10) || 1);
  const search = q.trim().slice(0, 100);
  const { supabase } = await requireAdmin();

  const [overviewRes, dailyRes, usersRes] = await Promise.all([
    supabase.rpc("admin_overview"),
    supabase.rpc("admin_daily", { p_days: 30 }),
    supabase.rpc("admin_users", {
      p_limit: PAGE_SIZE,
      p_offset: (pageNumber - 1) * PAGE_SIZE,
      p_search: search || null,
    }),
  ]);

  const o = overviewRes.data as AdminOverview | null;
  const days = (dailyRes.data ?? []) as AdminDay[];
  const users = (usersRes.data ?? []) as AdminUserRow[];
  const totalUsers = users[0]?.total ?? 0;
  const pageCount = Math.max(1, Math.ceil(totalUsers / PAGE_SIZE));

  if (!o) {
    return (
      <div className="mx-auto w-full max-w-5xl px-4 py-10">
        <h1 className="text-2xl font-bold tracking-tight">Admin</h1>
        <p role="alert" className="mt-4 text-sm text-destructive">
          Couldn&apos;t load the stats. {overviewRes.error?.message}
        </p>
      </div>
    );
  }

  const linkFor = (p: number) =>
    `/admin?${new URLSearchParams({ ...(search ? { q: search } : {}), page: String(p) })}`;

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-bold tracking-tight">Admin overview</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Live numbers for all of VentureNova. Opening someone&apos;s private
        content is recorded in the{" "}
        <Link
          href="/admin/log"
          className="font-medium text-foreground underline underline-offset-4"
        >
          access log
        </Link>
        .
      </p>

      <section className="mt-8">
        <h2 className="text-lg font-semibold">People</h2>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label="Total users" value={o.users_total} />
          <Stat
            label="New (7 days)"
            value={o.users_7d}
            hint={`${o.users_30d} in 30 days`}
          />
          <Stat
            label="Active (7 days)"
            value={o.users_active_7d}
            hint="signed in"
          />
          <Stat
            label="Unconfirmed"
            value={o.users_unconfirmed}
            hint="haven't clicked the email"
          />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold">Last 30 days</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <MiniBars title="New users" days={days} pick={(d) => d.signups} />
          <MiniBars
            title="Ventures started"
            days={days}
            pick={(d) => d.ventures}
          />
          <MiniBars
            title="Coach messages"
            days={days}
            pick={(d) => d.coach_messages}
          />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold">What founders are doing</h2>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat
            label="Ventures"
            value={o.ventures_total}
            hint={`${o.ventures_7d} this week`}
          />
          <Stat label="Public pages" value={o.ventures_public} />
          <Stat label="Lessons passed" value={o.lessons_passed} />
          <Stat label="Tasks done" value={o.tasks_done} />
          <Stat label="Interviews logged" value={o.interviews} />
          <Stat
            label="Hypotheses"
            value={o.hypotheses}
            hint={`${o.hypotheses_tested} tested`}
          />
          <Stat
            label="Claims"
            value={o.claims}
            hint={`${o.evidence_items} pieces of evidence`}
          />
          <Stat label="Decisions logged" value={o.decisions} />
          <Stat label="Competitors" value={o.competitors} />
          <Stat label="MVP features" value={o.mvp_features} />
          <Stat label="Launch steps done" value={o.launch_items_done} />
          <Stat label="Old waitlist" value={o.waitlist_total} hint="signups" />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold">AI Coach</h2>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label="Messages (24h)" value={o.coach_messages_24h} />
          <Stat label="Messages (7 days)" value={o.coach_messages_7d} />
          <Stat label="All time" value={o.coach_messages_total} />
          <Stat label="Users (7 days)" value={o.coach_users_7d} />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          For the actual cost, check usage at
          platform.claude.com/settings/billing. Roughly 1 cent per message.
        </p>
      </section>

      <section className="mt-8 grid gap-6 sm:grid-cols-2">
        <div>
          <h2 className="text-lg font-semibold">Ventures by type</h2>
          <ul className="mt-3 flex flex-col gap-1.5 text-sm">
            {Object.entries(o.ventures_by_type).map(([type, n]) => (
              <li
                key={type}
                className="flex justify-between rounded-md bg-tint px-3 py-1.5"
              >
                <span>{ventureTypeLabel(type)}</span>
                <span className="tabular-nums">{n}</span>
              </li>
            ))}
            {Object.keys(o.ventures_by_type).length === 0 && (
              <li className="text-muted-foreground">None yet.</li>
            )}
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Ventures by stage</h2>
          <ul className="mt-3 flex flex-col gap-1.5 text-sm">
            {STAGES.filter((s) => o.ventures_by_stage[s]).map((s) => (
              <li
                key={s}
                className="flex justify-between rounded-md bg-tint px-3 py-1.5"
              >
                <span className="capitalize">{stageInfo("other", s).name}</span>
                <span className="tabular-nums">{o.ventures_by_stage[s]}</span>
              </li>
            ))}
            {Object.keys(o.ventures_by_stage).length === 0 && (
              <li className="text-muted-foreground">None yet.</li>
            )}
          </ul>
        </div>
      </section>

      <section className="mt-10">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-lg font-semibold">Users ({totalUsers})</h2>
          <form action="/admin" className="flex gap-2">
            <label htmlFor="admin-search" className="sr-only">
              Search by name or email
            </label>
            <input
              id="admin-search"
              name="q"
              defaultValue={search}
              placeholder="Search by name or email"
              className="h-9 w-56 rounded-md border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
            />
            <button
              type="submit"
              className="h-9 rounded-md border border-border px-3 text-sm hover:bg-secondary"
            >
              Search
            </button>
          </form>
        </div>

        <div className="mt-3 overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[46rem] text-left text-sm">
            <thead className="bg-tint text-xs tracking-wide text-muted-foreground uppercase">
              <tr>
                <th className="px-3 py-2 font-medium">Name</th>
                <th className="px-3 py-2 font-medium">Email</th>
                <th className="px-3 py-2 font-medium">Joined</th>
                <th className="px-3 py-2 font-medium">Last sign-in</th>
                <th className="px-3 py-2 text-right font-medium">Ventures</th>
                <th className="px-3 py-2 text-right font-medium">Lessons</th>
                <th className="px-3 py-2 text-right font-medium">Coach</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-t border-border">
                  <td className="px-3 py-2 font-medium">
                    {u.name ?? (
                      <span className="font-normal text-muted-foreground">
                        (not set)
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-2">
                    <Link
                      href={`/admin/users/${u.id}`}
                      className="font-medium underline-offset-4 hover:underline"
                    >
                      {u.email ?? "(no email)"}
                    </Link>
                    {u.is_admin && (
                      <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
                        admin
                      </span>
                    )}
                    {!u.confirmed && (
                      <span className="ml-2 rounded-full bg-warm/25 px-2 py-0.5 text-xs text-warm-foreground">
                        unconfirmed
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-2 text-muted-foreground">
                    {formatDate(u.created_at)}
                  </td>
                  <td className="px-3 py-2 text-muted-foreground">
                    {formatDate(u.last_sign_in_at)}
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums">
                    {u.ventures}
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums">
                    {u.lessons_passed}
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums">
                    {u.coach_messages}
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-3 py-6 text-center text-muted-foreground"
                  >
                    No users match.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {pageCount > 1 && (
          <div className="mt-3 flex items-center justify-between text-sm">
            {pageNumber > 1 ? (
              <Link
                href={linkFor(pageNumber - 1)}
                className="underline underline-offset-4"
              >
                &larr; Newer
              </Link>
            ) : (
              <span />
            )}
            <span className="text-muted-foreground">
              Page {pageNumber} of {pageCount}
            </span>
            {pageNumber < pageCount ? (
              <Link
                href={linkFor(pageNumber + 1)}
                className="underline underline-offset-4"
              >
                Older &rarr;
              </Link>
            ) : (
              <span />
            )}
          </div>
        )}
      </section>
    </div>
  );
}
