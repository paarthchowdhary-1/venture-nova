import Link from "next/link";
import { LogoMark } from "~/components/logo";
import { Button } from "~/components/ui/button";
import { getIsAdmin, getSessionUser } from "~/lib/session";

export async function Navbar() {
  const [user, isAdmin] = await Promise.all([getSessionUser(), getIsAdmin()]);

  return (
    <nav className="border-b border-border bg-background">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold tracking-tight"
        >
          <LogoMark className="size-7 shrink-0" />
          <span className={isAdmin ? "max-[420px]:hidden" : undefined}>
            VentureNova
          </span>
        </Link>
        <div className="flex items-center gap-3 sm:gap-6">
          {user ? (
            <>
              {user.name && (
                <span className="hidden max-w-32 truncate text-sm font-medium text-foreground sm:block">
                  Hi, {user.name}
                </span>
              )}
              <Link
                href="/dashboard"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Dashboard
              </Link>
              {isAdmin && (
                <Link
                  href="/admin"
                  className="text-sm font-medium text-primary-ink transition-colors hover:underline"
                >
                  Admin
                </Link>
              )}
              <Link
                href="/portfolio"
                className="hidden text-sm text-muted-foreground transition-colors hover:text-foreground sm:block"
              >
                Portfolio
              </Link>
              <form action="/auth/signout" method="post">
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
                href="/how-it-works"
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
