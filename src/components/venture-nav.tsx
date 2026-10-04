"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { cn } from "~/lib/utils";

const tabs = [
  { slug: "", label: "Overview" },
  { slug: "learn", label: "Learn" },
  { slug: "tasks", label: "Tasks" },
  { slug: "validation", label: "Validation Lab" },
  { slug: "interviews", label: "Interviews" },
  { slug: "evidence", label: "Evidence" },
  { slug: "competitors", label: "Competitors" },
  { slug: "decisions", label: "Decisions" },
  { slug: "mvp", label: "MVP" },
  { slug: "launch", label: "Launch" },
  { slug: "coach", label: "Coach" },
  { slug: "share", label: "Share" },
] as const;

export function VentureNav({ id }: { id: string }) {
  const pathname = usePathname();
  const base = `/ventures/${id}`;
  const rest = pathname.startsWith(base) ? pathname.slice(base.length) : "";
  const current = rest.split("/").filter(Boolean)[0] ?? "";
  const active =
    current === "lessons" ? "learn" : current === "edit" ? "" : current;

  const scroller = useRef<HTMLDivElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: re-center the active tab whenever it changes
  useEffect(() => {
    const el = scroller.current?.querySelector<HTMLElement>(
      '[aria-current="page"]',
    );
    el?.scrollIntoView({ inline: "center", block: "nearest" });
  }, [active]);

  return (
    <nav
      aria-label="Venture sections"
      className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur"
    >
      <div
        ref={scroller}
        className="mx-auto flex max-w-5xl gap-1 overflow-x-auto px-4 py-2 [scrollbar-width:none] max-sm:[mask-image:linear-gradient(to_right,transparent,black_1rem,black_calc(100%-2.5rem),transparent)] [&::-webkit-scrollbar]:hidden"
      >
        {tabs.map((tab) => (
          <Link
            key={tab.slug}
            href={tab.slug ? `${base}/${tab.slug}` : base}
            aria-current={active === tab.slug ? "page" : undefined}
            className={cn(
              "shrink-0 rounded-full px-3 py-1.5 text-sm transition-colors",
              active === tab.slug
                ? "bg-primary font-medium text-primary-foreground"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground",
            )}
          >
            {tab.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
