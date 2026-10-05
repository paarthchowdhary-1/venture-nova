import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { AchievementList } from "~/components/achievements";
import { Button } from "~/components/ui/button";
import { achievements, ventureProgress } from "~/lib/insights";
import { requireWorkspace } from "~/lib/workspace-page";
import { setSharing } from "../../workspace-actions";

export const metadata: Metadata = {
  title: "Share your portfolio",
  robots: { index: false, follow: false },
};

export default async function SharePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { workspace, snapshot } = await requireWorkspace(id);
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "venturenova.org";
  const protocol = host.startsWith("localhost") ? "http" : "https";
  const url = `${protocol}://${host}/v/${id}`;
  const list = achievements(snapshot);
  const progress = ventureProgress(snapshot).percent;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold tracking-tight">Share your venture</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Make a public page that shows what you&apos;ve accomplished, to send to
        a mentor, a teacher, or a competition. It&apos;s off by default, and you
        can turn it off at any time.
      </p>

      <section className="mt-8 rounded-xl border border-border p-5">
        <h2 className="text-lg font-semibold">Your founder portfolio</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {snapshot.venture.name} &middot; {progress}% progress
        </p>
        {list.length > 0 ? (
          <AchievementList items={list} />
        ) : (
          <p className="mt-4 text-sm text-muted-foreground">
            Your achievements will appear here as you do the work.
          </p>
        )}
      </section>

      <section className="mt-6 rounded-xl border border-border bg-tint p-5">
        <h2 className="font-semibold">What a public page shows</h2>
        <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground">
          <li>Your venture&apos;s name, type, idea, and current stage</li>
          <li>Your progress and the achievements above</li>
        </ul>
        <h2 className="mt-4 font-semibold">What it never shows</h2>
        <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground">
          <li>Your name, email, or any account details</li>
          <li>Interview notes, who you talked to, or your evidence</li>
          <li>Your problem statement and target customer</li>
        </ul>
        <p className="mt-3 text-sm text-muted-foreground">
          Search engines are asked not to list it. Only people you send the link
          to will find it.
        </p>
      </section>

      <section className="mt-6">
        {workspace.isPublic ? (
          <div className="flex flex-col gap-4">
            <p className="text-sm font-medium">Your page is public:</p>
            <Link
              href={`/v/${id}`}
              className="text-sm break-all text-primary underline-offset-4 hover:underline"
            >
              {url}
            </Link>
            <div className="flex flex-wrap gap-3">
              <form action={setSharing.bind(null, id, true)}>
                <Button type="submit" variant="outline">
                  Update with my latest progress
                </Button>
              </form>
              <form action={setSharing.bind(null, id, false)}>
                <Button type="submit" variant="outline">
                  Stop sharing
                </Button>
              </form>
            </div>
          </div>
        ) : (
          <form action={setSharing.bind(null, id, true)}>
            <Button type="submit">Make my page public</Button>
          </form>
        )}
      </section>
    </div>
  );
}
