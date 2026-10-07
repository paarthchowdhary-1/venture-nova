import Link from "next/link";
import { Button } from "~/components/ui/button";

export function StartCta({
  showSecondary = false,
}: {
  showSecondary?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex flex-col items-center gap-3 sm:flex-row">
        <Button asChild size="lg" variant="fun" className="rounded-full px-8">
          <Link href="/signup">Start your venture &rarr;</Link>
        </Button>
        {showSecondary && (
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full border-white/20 bg-white/5 px-8 backdrop-blur hover:bg-white/10"
          >
            <Link href="/how-it-works">See how it works</Link>
          </Button>
        )}
      </div>
      <p className="text-sm text-muted-foreground">
        Free to start. Takes about a minute.
      </p>
    </div>
  );
}
