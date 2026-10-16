"use client";

import { useState } from "react";
import { cn } from "~/lib/utils";

const evidenceItems = [
  { label: "Customer interviews completed", value: "7" },
  { label: "Prototypes tested", value: "1" },
  { label: "Assumptions validated", value: "2 of 5" },
  { label: "Paying customers", value: "0" },
];

export function EvidenceToggle() {
  const [view, setView] = useState<"activity" | "evidence">("activity");

  return (
    <div className="w-full max-w-md">
      <div className="mx-auto flex w-fit rounded-lg bg-secondary p-1">
        <button
          type="button"
          onClick={() => setView("activity")}
          className={cn(
            "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
            view === "activity"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground",
          )}
        >
          Activity view
        </button>
        <button
          type="button"
          onClick={() => setView("evidence")}
          className={cn(
            "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
            view === "evidence"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground",
          )}
        >
          Evidence view
        </button>
      </div>

      <div className="mt-4 rounded-xl border border-border bg-card p-6">
        {view === "activity" ? (
          <div className="text-center">
            <p className="text-3xl font-bold">83%</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Lessons completed
            </p>
            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-secondary">
              <div className="h-full w-[83%] rounded-full bg-primary" />
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Looks great. Tells you almost nothing about the venture.
            </p>
          </div>
        ) : (
          <div>
            <ul className="flex flex-col gap-3">
              {evidenceItems.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-semibold">{item.value}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-muted-foreground">
              Slower to feel good about. Actually tells you where the venture
              stands.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
