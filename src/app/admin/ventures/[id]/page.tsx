import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { z } from "zod";
import { type AdminVentureDetail, formatDate, requireAdmin } from "~/lib/admin";
import { ventureTypeLabel } from "~/lib/ventures";

function Section({
  title,
  count,
  children,
}: {
  title: string;
  count?: number;
  children: ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="text-lg font-semibold">
        {title}
        {count !== undefined && (
          <span className="ml-2 text-sm font-normal text-muted-foreground">
            {count}
          </span>
        )}
      </h2>
      <div className="mt-3 flex flex-col gap-3">{children}</div>
    </section>
  );
}

function Empty() {
  return <p className="text-sm text-muted-foreground">Nothing here yet.</p>;
}

function Card({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border border-border p-4 text-sm whitespace-pre-wrap">
      {children}
    </div>
  );
}

export default async function AdminVenturePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!z.uuid().safeParse(id).success) notFound();
  const { supabase } = await requireAdmin();

  const { data, error } = await supabase.rpc("admin_venture_detail", {
    p_venture: id,
  });
  if (error || !data) notFound();
  const d = data as AdminVentureDetail;
  const v = d.venture;
  const passed = d.lessons.filter((l) => l.passed).length;
  const done = d.tasks.filter((t) => t.status === "done").length;

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10">
      <Link
        href={`/admin/users/${v.user_id}`}
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        &larr; {v.owner_email ?? "Back to user"}
      </Link>

      <div className="mt-4 rounded-lg border border-warm/60 bg-warm/15 p-3 text-sm">
        Read-only. Viewing this founder&apos;s private workspace has been
        recorded in the access log.
      </div>

      <h1 className="mt-4 text-2xl font-bold tracking-tight">{v.name}</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {ventureTypeLabel(v.venture_type)} &middot;{" "}
        <span className="capitalize">{v.current_stage}</span> stage &middot;
        started {formatDate(v.created_at)} &middot;{" "}
        {v.is_public ? "public page on" : "private"}
      </p>
      <div className="mt-4 flex flex-wrap gap-3 text-sm">
        <Link
          href={`/admin/ventures/${v.id}/chat`}
          className="rounded-full border border-border px-4 py-1.5 font-medium hover:bg-secondary"
        >
          Coach chat ({d.coach_messages} messages)
        </Link>
      </div>

      <Section title="The venture">
        <Card>
          <p className="font-medium">Idea</p>
          <p className="text-muted-foreground">{v.idea}</p>
          <p className="mt-3 font-medium">Problem</p>
          <p className="text-muted-foreground">
            {v.problem || "Not written yet."}
          </p>
          <p className="mt-3 font-medium">Target customer</p>
          <p className="text-muted-foreground">
            {v.target_customer || "Not chosen yet."}
          </p>
        </Card>
      </Section>

      <Section title="Customer interviews" count={d.interviews.length}>
        {d.interviews.length === 0 && <Empty />}
        {d.interviews.map((i) => (
          <Card
            key={`${i.interviewee}-${i.interviewed_on}-${i.notes?.slice(0, 20)}`}
          >
            <p className="font-medium">
              {i.interviewee}{" "}
              <span className="font-normal text-muted-foreground">
                {formatDate(i.interviewed_on)}
              </span>
            </p>
            {i.notes && <p className="mt-1 text-muted-foreground">{i.notes}</p>}
            {i.key_quote && (
              <p className="mt-2 italic">&ldquo;{i.key_quote}&rdquo;</p>
            )}
            {i.tags.length > 0 && (
              <p className="mt-2 text-xs text-muted-foreground">
                Tags: {i.tags.join(", ")}
              </p>
            )}
          </Card>
        ))}
      </Section>

      <Section title="Hypotheses" count={d.hypotheses.length}>
        {d.hypotheses.length === 0 && <Empty />}
        {d.hypotheses.map((h) => (
          <Card key={h.statement}>
            <p className="font-medium">{h.statement}</p>
            <p className="mt-1 text-muted-foreground">
              {h.supported} of {h.tested} supported (target {h.sample_target}{" "}
              people, needs {h.threshold_pct}%)
            </p>
            {h.experiment && <p className="mt-2">Experiment: {h.experiment}</p>}
            {h.results_notes && (
              <p className="mt-2 text-muted-foreground">
                Learned: {h.results_notes}
              </p>
            )}
          </Card>
        ))}
      </Section>

      <Section title="Claims and evidence" count={d.claims.length}>
        {d.claims.length === 0 && <Empty />}
        {d.claims.map((c) => (
          <Card key={c.statement}>
            <p className="font-medium">{c.statement}</p>
            {c.evidence.length === 0 && (
              <p className="mt-1 text-muted-foreground">
                No evidence attached.
              </p>
            )}
            <ul className="mt-2 list-disc pl-5 text-muted-foreground">
              {c.evidence.map((e) => (
                <li key={`${e.kind}-${e.description}`}>
                  <span className="capitalize">{e.kind}</span> &times;
                  {e.quantity}: {e.description}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </Section>

      <Section title="Tasks and notes" count={d.tasks.length}>
        <p className="text-sm text-muted-foreground">
          {done} of {d.tasks.length} done
        </p>
        {d.tasks
          .filter((t) => t.status !== "todo" || t.evidence)
          .map((t) => (
            <Card key={t.title}>
              <p className="font-medium">
                {t.title}{" "}
                <span className="font-normal text-muted-foreground">
                  ({t.status.replace("_", " ")})
                </span>
              </p>
              {t.evidence && (
                <p className="mt-1 text-muted-foreground">{t.evidence}</p>
              )}
            </Card>
          ))}
        {d.tasks.every((t) => t.status === "todo" && !t.evidence) && <Empty />}
      </Section>

      <Section title="Competitors" count={d.competitors.length}>
        {d.competitors.length === 0 && <Empty />}
        {d.competitors.map((c) => (
          <Card key={c.name}>
            <p className="font-medium">{c.name}</p>
            <p className="text-muted-foreground">
              Strength: {c.strength || "-"} &middot; Weakness:{" "}
              {c.weakness || "-"} &middot; Target: {c.target || "-"}
            </p>
          </Card>
        ))}
      </Section>

      <Section title="MVP features" count={d.features.length}>
        {d.features.length === 0 && <Empty />}
        {(["must", "should", "later"] as const).map((bucket) => {
          const items = d.features.filter((f) => f.bucket === bucket);
          if (items.length === 0) return null;
          return (
            <Card key={bucket}>
              <p className="font-medium capitalize">{bucket}</p>
              <p className="text-muted-foreground">
                {items.map((f) => f.name).join(", ")}
              </p>
            </Card>
          );
        })}
      </Section>

      <Section title="Decisions" count={d.decisions.length}>
        {d.decisions.length === 0 && <Empty />}
        {d.decisions.map((x) => (
          <Card key={`${x.decided_on}-${x.decision}`}>
            <p className="font-medium">
              {x.decision}{" "}
              <span className="font-normal text-muted-foreground">
                {formatDate(x.decided_on)}
              </span>
            </p>
            {x.reason && (
              <p className="text-muted-foreground">Why: {x.reason}</p>
            )}
            {x.evidence && (
              <p className="text-muted-foreground">Evidence: {x.evidence}</p>
            )}
          </Card>
        ))}
      </Section>

      <Section title="Learning and launch">
        <Card>
          <p>
            {passed} lessons passed &middot; {d.launch_done.length} launch steps
            done
          </p>
        </Card>
      </Section>
    </div>
  );
}
