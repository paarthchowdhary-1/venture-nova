import type { Metadata } from "next";
import { CoachChat } from "~/components/coach-chat";
import { ConfirmButton } from "~/components/confirm-button";
import { aiConfigured } from "~/lib/ai";
import { requireWorkspace } from "~/lib/workspace-page";
import { clearCoachChat } from "../../ai-actions";

export const metadata: Metadata = {
  title: "AI Coach",
  robots: { index: false, follow: false },
};

export default async function CoachPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { supabase, snapshot } = await requireWorkspace(id);
  const { data } = await supabase
    .from("coach_messages")
    .select("id, role, content")
    .eq("venture_id", id)
    .order("created_at", { ascending: true })
    .limit(100);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            AI Venture Coach
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Your coach knows {snapshot.venture.name}: your idea, your stage,
            your interviews, your tests, and what you&apos;ve decided. It asks
            questions and challenges your thinking, but you make the decisions.
          </p>
        </div>
        {data && data.length > 0 && (
          <ConfirmButton
            action={clearCoachChat.bind(null, id)}
            label="Clear chat"
            message="Clear this conversation? Your venture data stays."
            variant="outline"
          />
        )}
      </div>

      {!aiConfigured() && (
        <p className="mt-6 rounded-lg border border-border bg-tint p-4 text-sm">
          The AI coach isn&apos;t switched on yet. Everything else in your
          workspace works in the meantime.
        </p>
      )}

      <div className="mt-6">
        <CoachChat
          ventureId={id}
          messages={data ?? []}
          enabled={aiConfigured()}
        />
      </div>
      <p className="mt-4 text-xs text-muted-foreground">
        The coach gives general guidance only. For money, legal, safety, or
        privacy questions, talk to a parent, guardian, or qualified
        professional.
      </p>
    </div>
  );
}
