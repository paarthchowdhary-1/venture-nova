import { StageNotice } from "~/components/stage-notice";
import { Button } from "~/components/ui/button";
import { LAUNCH_ITEMS, LAUNCH_SECTIONS } from "~/content/launch";
import { cn } from "~/lib/utils";
import { requireWorkspace } from "~/lib/workspace-page";
import { toggleLaunchItem } from "../../workspace-actions";

export default async function LaunchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { workspace, snapshot } = await requireWorkspace(id);
  const doneSlugs = workspace.launchDoneSlugs;
  const percent = Math.round((doneSlugs.size / LAUNCH_ITEMS.length) * 100);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold tracking-tight">Launch Center</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        When your MVP is ready, this is how you get it into the real world: a
        checklist, then a simple plan for your first 30 days.
      </p>
      <StageNotice
        ventureId={id}
        ventureType={snapshot.venture.venture_type}
        currentStage={snapshot.venture.current_stage}
        availableAt="testing"
      />
      <div className="mt-5">
        <div className="flex justify-between text-sm">
          <span>
            {doneSlugs.size} of {LAUNCH_ITEMS.length} done
          </span>
          <span className="text-muted-foreground">{percent}%</span>
        </div>
        <div
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          className="mt-1 h-2 w-full overflow-hidden rounded-full bg-secondary"
        >
          <div
            className="h-full rounded-full bg-primary"
            style={{ width: `${Math.max(2, percent)}%` }}
          />
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-8">
        {LAUNCH_SECTIONS.map((section) => (
          <section key={section.id}>
            <h2 className="text-lg font-semibold">{section.title}</h2>
            {section.blurb && (
              <p className="text-sm text-muted-foreground">{section.blurb}</p>
            )}
            <ul className="mt-3 flex flex-col gap-2">
              {LAUNCH_ITEMS.filter((i) => i.section === section.id).map(
                (item) => {
                  const done = doneSlugs.has(item.slug);
                  return (
                    <li key={item.slug}>
                      <form
                        action={toggleLaunchItem.bind(
                          null,
                          id,
                          item.slug,
                          !done,
                        )}
                      >
                        <Button
                          type="submit"
                          variant="outline"
                          aria-pressed={done}
                          className="h-auto w-full justify-start gap-3 py-2.5 text-left whitespace-normal"
                        >
                          <span
                            aria-hidden
                            className={cn(
                              "flex size-5 shrink-0 items-center justify-center rounded border text-xs",
                              done
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border",
                            )}
                          >
                            {done ? "✓" : ""}
                          </span>
                          <span
                            className={cn(
                              done && "text-muted-foreground line-through",
                            )}
                          >
                            {item.title}
                          </span>
                        </Button>
                      </form>
                    </li>
                  );
                },
              )}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
