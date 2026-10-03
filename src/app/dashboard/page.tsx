import Link from "next/link";
import { redirect } from "next/navigation";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { createClient } from "~/lib/supabase/server";
import { ventureTypeLabel } from "~/lib/ventures";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: ventures } = await supabase
    .from("ventures")
    .select("id, name, idea, venture_type, current_stage")
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Your ventures</h1>
        <Button asChild>
          <Link href="/ventures/new">New venture</Link>
        </Button>
      </div>

      {!ventures || ventures.length === 0 ? (
        <div className="mt-10 rounded-xl border border-dashed border-border p-10 text-center">
          <p className="font-medium">You haven&apos;t started a venture yet.</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Tell us your idea and we&apos;ll help you figure out what to do
            next.
          </p>
          <Button className="mt-6" asChild>
            <Link href="/ventures/new">Start your first venture</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {ventures.map((venture) => (
            <Link key={venture.id} href={`/ventures/${venture.id}`}>
              <Card className="h-full transition-colors hover:bg-accent/40">
                <CardHeader>
                  <CardTitle>{venture.name}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {venture.idea}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  <Badge variant="secondary">
                    {ventureTypeLabel(venture.venture_type)}
                  </Badge>
                  <Badge variant="outline" className="capitalize">
                    Stage: {venture.current_stage}
                  </Badge>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
