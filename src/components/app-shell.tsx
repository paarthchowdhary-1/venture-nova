"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, useEffect, useState } from "react";
import { signOut } from "~/app/auth/actions";
import { Icon, type IconName } from "~/components/icons";
import { LogoMark } from "~/components/logo";
import { ventureName } from "~/components/venture-title";
import {
  VENTURE_SECTIONS,
  ventureIdFromPath,
  ventureSectionFromPath,
} from "~/lib/nav";
import { cn } from "~/lib/utils";

export type ShellUser = {
  name: string | null;
  email: string | null;
  isAdmin: boolean;
};
export type ShellVenture = { id: string; name: string };

/** Pages that live inside the signed-in app (sidebar) instead of the marketing site. */
const APP_PATH = /^\/(dashboard|portfolio|ventures|admin)(\/|$)/;

function NavLink({
  href,
  icon,
  label,
  active,
  wrap = false,
}: {
  href: string;
  icon: IconName;
  label: string;
  active: boolean;
  wrap?: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-secondary text-primary-ink ring-1 ring-primary/25"
          : "text-muted-foreground hover:bg-secondary hover:text-foreground",
      )}
    >
      <Icon
        name={icon}
        className={cn(
          "size-[18px] shrink-0",
          active ? "text-primary-ink" : "group-hover:text-primary-ink",
        )}
      />
      <span
        className={wrap ? "leading-snug [overflow-wrap:anywhere]" : "truncate"}
      >
        {label}
      </span>
    </Link>
  );
}

function SidebarContent({
  user,
  ventures,
  pathname,
}: {
  user: ShellUser;
  ventures: ShellVenture[];
  pathname: string;
}) {
  const ventureId = ventureIdFromPath(pathname);
  const currentVenture = ventures.find((v) => v.id === ventureId);
  const section = ventureId ? ventureSectionFromPath(pathname, ventureId) : "";
  const initial = (user.name ?? user.email ?? "?")
    .trim()
    .charAt(0)
    .toUpperCase();

  return (
    <div className="flex h-full flex-col gap-1 overflow-y-auto px-3 py-4">
      <Link
        href="/dashboard"
        className="mb-2 flex items-center gap-2.5 px-2 pb-3 font-semibold tracking-tight"
      >
        <LogoMark className="size-8" />
        <span className="text-lg">VentureNova</span>
      </Link>
      <div className="mx-2 mb-2 border-t border-border" />

      <NavLink
        href="/dashboard"
        icon="home"
        label="Home"
        active={pathname === "/dashboard"}
      />

      {ventureId ? (
        <>
          <p className="mt-4 mb-1 truncate px-3 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
            {currentVenture ? ventureName(currentVenture.name) : "This venture"}
          </p>
          {VENTURE_SECTIONS.map((item) => (
            <NavLink
              key={item.slug}
              href={
                item.slug
                  ? `/ventures/${ventureId}/${item.slug}`
                  : `/ventures/${ventureId}`
              }
              icon={item.icon}
              label={item.label}
              active={section === item.slug}
            />
          ))}
        </>
      ) : (
        ventures.length > 0 && (
          <>
            <p className="mt-4 mb-1 px-3 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
              My ventures
            </p>
            {ventures.map((v) => (
              <NavLink
                key={v.id}
                href={`/ventures/${v.id}`}
                icon="map"
                label={ventureName(v.name)}
                active={false}
                wrap
              />
            ))}
          </>
        )
      )}

      <NavLink
        href="/ventures/new"
        icon="plus"
        label="New venture"
        active={pathname === "/ventures/new"}
      />

      <p className="mt-4 mb-1 px-3 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
        Account
      </p>
      <NavLink
        href="/portfolio"
        icon="briefcase"
        label="Founder portfolio"
        active={pathname === "/portfolio"}
      />
      {user.isAdmin && (
        <NavLink
          href="/admin"
          icon="shield"
          label="Admin"
          active={pathname.startsWith("/admin")}
        />
      )}

      <div className="mt-auto flex flex-col gap-1 pt-6">
        <a
          href="mailto:hello@venturenova.org?subject=VentureNova%20feedback"
          className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <Icon name="help" className="size-[18px]" />
          Help &amp; feedback
        </a>
        <div className="mx-2 my-2 border-t border-border" />
        <div className="flex items-center gap-3 px-2">
          <span
            aria-hidden
            className="bg-brand-gradient flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-primary-foreground"
          >
            {initial}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">
              {user.name ?? "Founder"}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {user.email}
            </p>
          </div>
          <form action={signOut}>
            <button
              type="submit"
              aria-label="Log out"
              title="Log out"
              className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <Icon name="logout" className="size-[18px]" />
            </button>
          </form>
        </div>
        <p className="mt-3 px-3 text-[11px] text-muted-foreground">
          <Link href="/terms" className="hover:text-foreground">
            Terms
          </Link>{" "}
          &middot;{" "}
          <Link href="/privacy" className="hover:text-foreground">
            Privacy
          </Link>
        </p>
      </div>
    </div>
  );
}

function InviteButton() {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        const url = "https://venturenova.org";
        try {
          if (navigator.share) {
            await navigator.share({
              title: "VentureNova",
              text: "The AI startup coach for teen founders.",
              url,
            });
            return;
          }
          await navigator.clipboard.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {
          // Sharing was cancelled or isn't available. Nothing else to do.
        }
      }}
      className="hidden items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground sm:flex"
    >
      <Icon name="gift" className="size-4" />
      <span aria-live="polite">
        {copied ? "Link copied!" : "Invite a friend"}
      </span>
    </button>
  );
}

export function AppShell({
  user,
  ventures,
  topNav,
  footer,
  children,
}: {
  user: ShellUser | null;
  ventures: ShellVenture[];
  topNav: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isApp = Boolean(user) && APP_PATH.test(pathname);

  // Close the mobile menu whenever the page changes.
  // biome-ignore lint/correctness/useExhaustiveDependencies: close on navigation
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const skip = (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-sm focus:text-primary-foreground"
    >
      Skip to content
    </a>
  );

  if (!isApp || !user) {
    return (
      <div className="flex min-h-screen flex-col">
        {skip}
        {topNav}
        <main id="main" className="flex-1">
          {children}
        </main>
        {footer}
      </div>
    );
  }

  const ventureId = ventureIdFromPath(pathname);
  const current = ventures.find((v) => v.id === ventureId);
  // The path shown in the top bar: Home, then where you are. "Home" is always a
  // link back to the dashboard.
  const section = ventureId ? ventureSectionFromPath(pathname, ventureId) : "";
  const sectionLabel = VENTURE_SECTIONS.find((x) => x.slug === section)?.label;
  const crumbs: { key: string; label: string; href?: string }[] = [];
  if (pathname === "/portfolio") {
    crumbs.push({ key: "portfolio", label: "Founder portfolio" });
  } else if (pathname === "/ventures/new") {
    crumbs.push({ key: "new", label: "New venture" });
  } else if (pathname.startsWith("/admin")) {
    crumbs.push({
      key: "admin",
      label: "Admin",
      href: pathname === "/admin" ? undefined : "/admin",
    });
  } else if (ventureId) {
    crumbs.push({
      key: "venture",
      label: current ? ventureName(current.name) : "Venture",
      href:
        section || pathname.endsWith("/edit")
          ? `/ventures/${ventureId}`
          : undefined,
    });
    if (section && sectionLabel) {
      crumbs.push({ key: "section", label: sectionLabel });
    } else if (pathname.endsWith("/edit")) {
      crumbs.push({ key: "edit", label: "Edit" });
    }
  }

  return (
    <div className="flex min-h-screen">
      {skip}
      <aside
        aria-label="Main"
        className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-border bg-card md:block"
      >
        <SidebarContent user={user} ventures={ventures} pathname={pathname} />
      </aside>

      {open && (
        <div className="fixed inset-0 z-40 md:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <aside
            aria-label="Main"
            className="animate-rise absolute inset-y-0 left-0 w-72 max-w-[85vw] border-r border-border bg-card shadow-2xl"
          >
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="absolute top-4 right-3 z-10 flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary"
            >
              <Icon name="close" className="size-5" />
            </button>
            <SidebarContent
              user={user}
              ventures={ventures}
              pathname={pathname}
            />
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur">
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="flex size-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary md:hidden"
          >
            <Icon name="menu" className="size-5" />
          </button>
          <Link href="/dashboard" className="md:hidden" aria-label="Home">
            <LogoMark className="size-7" />
          </Link>
          <nav
            aria-label="Breadcrumb"
            className="flex min-w-0 flex-1 items-center gap-2 text-sm font-semibold"
          >
            <Link
              href="/dashboard"
              aria-current={crumbs.length === 0 ? "page" : undefined}
              className="shrink-0 rounded-md px-1.5 py-1 transition-colors hover:bg-secondary hover:text-primary-ink"
            >
              Home
            </Link>
            {crumbs.map((crumb) => (
              <span key={crumb.key} className="flex min-w-0 items-center gap-2">
                <span aria-hidden className="text-muted-foreground">
                  /
                </span>
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="truncate rounded-md px-1.5 py-1 transition-colors hover:bg-secondary hover:text-primary-ink"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="truncate px-1.5">
                    {crumb.label}
                  </span>
                )}
              </span>
            ))}
          </nav>
          <InviteButton />
          {ventures[0] && (
            <Link
              href={`/ventures/${ventures[0].id}`}
              className="bg-brand-gradient glow hidden rounded-full px-4 py-1.5 text-sm font-semibold text-primary-foreground transition hover:brightness-110 sm:block"
            >
              Continue building
            </Link>
          )}
        </header>
        <main id="main" className="min-w-0 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
