import Link from "next/link";
import { notFound } from "next/navigation";
import { z } from "zod";
import {
  type AdminChatMessage,
  formatDateTime,
  requireAdmin,
} from "~/lib/admin";
import { cn } from "~/lib/utils";

export default async function AdminChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!z.uuid().safeParse(id).success) notFound();
  const { supabase } = await requireAdmin();

  const { data, error } = await supabase.rpc("admin_coach_chat", {
    p_venture: id,
  });
  if (error) notFound();
  const messages = (data ?? []) as AdminChatMessage[];

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <Link
        href={`/admin/ventures/${id}`}
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        &larr; Back to venture
      </Link>
      <div className="mt-4 rounded-lg border border-warm/60 bg-warm/15 p-3 text-sm">
        Read-only. Viewing this coach conversation has been recorded in the
        access log.
      </div>
      <h1 className="mt-4 text-2xl font-bold tracking-tight">Coach chat</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {messages.length} messages (most recent 500 shown).
      </p>

      <div className="mt-6 flex flex-col gap-3">
        {messages.length === 0 && (
          <p className="text-sm text-muted-foreground">No messages yet.</p>
        )}
        {messages.map((m) => (
          <div
            key={`${m.created_at}-${m.role}`}
            className={cn(
              "flex",
              m.role === "user" ? "justify-end" : "justify-start",
            )}
          >
            <div className="max-w-[85%]">
              <p
                className={cn(
                  "rounded-lg px-3 py-2 text-sm whitespace-pre-wrap",
                  m.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground",
                )}
              >
                {m.content}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {m.role === "user" ? "Founder" : "Coach"} &middot;{" "}
                {formatDateTime(m.created_at)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
