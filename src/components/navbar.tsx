import Link from "next/link";
import { signOut } from "~/app/auth/actions";
import { Button } from "~/components/ui/button";
import { createClient } from "~/lib/supabase/server";

export async function Navbar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="border-b border-border bg-background">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="font-semibold tracking-tight">
          VentureNova
        </Link>
        <div className="flex items-center gap-4 sm:gap-6">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Dashboard
              </Link>
              <form action={signOut}>
                <Button
                  type="submit"
                  size="sm"
                  variant="outline"
                  className="rounded-full"
                >
                  Log out
                </Button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/#how-it-works"
                className="hidden text-sm text-muted-foreground transition-colors hover:text-foreground sm:block"
              >
                How it works
              </Link>
              <Link
                href="/login"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Log in
              </Link>
              <Button size="sm" className="rounded-full" asChild>
                <Link href="/signup">Sign up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
