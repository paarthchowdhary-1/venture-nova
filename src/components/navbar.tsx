import Link from "next/link";
import { Button } from "~/components/ui/button";

export function Navbar() {
  return (
    <nav className="border-b border-border bg-background">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="font-semibold tracking-tight">
          VentureNova
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="#how-it-works"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            How it works
          </Link>
          <Button size="sm" className="rounded-full" asChild>
            <Link href="#hero-cta">Join waitlist</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
