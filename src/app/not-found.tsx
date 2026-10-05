import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center gap-4 px-4 py-24 text-center">
      <p className="text-sm font-semibold tracking-wide text-primary uppercase">
        404
      </p>
      <h1 className="text-3xl font-bold tracking-tight text-balance">
        We couldn&apos;t find that page
      </h1>
      <p className="text-muted-foreground text-balance">
        The link may be old, or the venture or lesson may have been removed.
        Every good founder hits a dead end now and then. Here&apos;s a way back.
      </p>
      <div className="flex gap-3 pt-2">
        <Button asChild className="rounded-full">
          <Link href="/dashboard">Go to my dashboard</Link>
        </Button>
        <Button asChild variant="outline" className="rounded-full">
          <Link href="/">Home</Link>
        </Button>
      </div>
    </div>
  );
}
