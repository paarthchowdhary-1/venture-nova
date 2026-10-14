import { Icon } from "~/components/icons";

/**
 * A faithful, static picture of the student dashboard, shown on the landing
 * page so visitors see what they would get. Sample data only.
 */
export function DashboardMock() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/15 bg-background text-foreground shadow-2xl shadow-black/50">
      <div className="flex items-center gap-1.5 border-b border-border bg-muted px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-coral/70" />
        <span className="size-2.5 rounded-full bg-warm/80" />
        <span className="size-2.5 rounded-full bg-mint/80" />
        <span className="ml-3 text-[11px] text-muted-foreground">
          venturenova.org/dashboard
        </span>
      </div>
      <div className="grid gap-4 p-5 sm:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col gap-4">
          <p className="text-lg font-extrabold tracking-tight">
            Good morning, <span className="text-gradient">Sam</span>
          </p>
          <div className="bg-hero rounded-2xl border border-primary/25 p-5">
            <p className="text-[10px] font-semibold tracking-wider text-primary-ink uppercase">
              Your venture
            </p>
            <p className="mt-1.5 text-2xl font-extrabold tracking-tight">
              Bead &amp; Co
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-coral-soft px-2.5 py-0.5 text-xs font-semibold text-coral-ink">
                Physical product
              </span>
              <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
                Now: Validation
              </span>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Venture progress</span>
                <span className="font-bold">38%</span>
              </div>
              <div className="mt-1.5 h-2 rounded-full bg-primary/15">
                <div className="bg-brand-gradient h-2 w-[38%] rounded-full" />
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border p-4">
            <p className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
              Your next move
            </p>
            <p className="mt-1 font-semibold">
              Interview five people who might buy your bracelets
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              About 30 minutes
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="rounded-xl border border-border p-4">
            <p className="flex items-center gap-1.5 text-sm font-semibold">
              <Icon name="chat" className="size-4 text-grape-ink" />
              Ask your coach
            </p>
            <div className="mt-2 rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">
              What should I test first?
            </div>
          </div>
          <div className="rounded-xl border border-border p-4">
            <p className="flex items-center gap-1.5 text-sm font-semibold">
              <Icon name="flame" className="size-4 text-coral-ink" />4 day
              streak
            </p>
            <ul className="mt-2 flex flex-col gap-1.5 text-xs text-muted-foreground">
              <li className="flex items-center gap-1.5">
                <Icon name="check" className="size-3.5 text-mint-ink" />
                Passed &ldquo;Find the real problem&rdquo;
              </li>
              <li className="flex items-center gap-1.5">
                <Icon name="check" className="size-3.5 text-mint-ink" />
                Logged an interview
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
