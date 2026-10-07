"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { VENTURE_SECTIONS, ventureSectionFromPath } from "~/lib/nav";
import { cn } from "~/lib/utils";

export function VentureNav({ id }: { id: string }) {
  const pathname = usePathname();
  const base = `/ventures/${id}`;
  const active = ventureSectionFromPath(pathname, id);

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
      className="sticky top-14 z-20 border-b border-border bg-background/90 backdrop-blur md:hidden"
    >
      <div
        ref={scroller}
        className="mx-auto flex max-w-5xl gap-1 overflow-x-auto px-4 py-2 [scrollbar-width:none] max-sm:[mask-image:linear-gradient(to_right,transparent,black_1rem,black_calc(100%-2.5rem),transparent)] [&::-webkit-scrollbar]:hidden"
      >
        {VENTURE_SECTIONS.map((tab) => (
          <Link
            key={tab.slug}
            href={tab.slug ? `${base}/${tab.slug}` : base}
            aria-current={active === tab.slug ? "page" : undefined}
            className={cn(
              "shrink-0 rounded-full px-3 py-1.5 text-sm transition-colors",
              active === tab.slug
                ? "bg-brand-gradient font-semibold text-primary-foreground shadow-md"
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
