import Link from "next/link";
import { stageInfo } from "~/content/roadmaps";
import { STAGES } from "~/lib/ventures";

/**
 * A soft heads-up on tools that belong to a later stage. It never blocks the page:
 * founders can still look ahead, they just know it isn't their next step.
 */
export function StageNotice({
  ventureId,
  ventureType,
  currentStage,
  availableAt,
}: {
  ventureId: string;
  ventureType: string;
  currentStage: string;
  availableAt: (typeof STAGES)[number];
}) {
  const ahead =
    STAGES.indexOf(currentStage as never) < STAGES.indexOf(availableAt);
  if (!ahead) return null;

  const current = stageInfo(ventureType, currentStage).name;
  const target = stageInfo(ventureType, availableAt).name;
  return (
    <div className="mt-5 rounded-lg border border-warm/60 bg-warm/15 p-4 text-sm">
      <p className="font-medium">This one is for later.</p>
      <p className="mt-1 text-muted-foreground">
        You&apos;re in &ldquo;{current}&rdquo; right now. This tool fits best
        once you reach &ldquo;{target}&rdquo;. You&apos;re welcome to look
        around, but{" "}
        <Link
          href={`/ventures/${ventureId}`}
          className="font-medium text-foreground underline underline-offset-4"
        >
          your next best action
        </Link>{" "}
        will get you further.
      </p>
    </div>
  );
}
