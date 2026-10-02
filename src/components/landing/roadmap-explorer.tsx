"use client";

import { useState } from "react";
import { cn } from "~/lib/utils";

const stages = [
  {
    title: "Idea",
    description: "Understand the problem you think you're solving, and why.",
  },
  {
    title: "Validation",
    description:
      "Determine whether the problem actually exists for real people.",
  },
  {
    title: "Customer",
    description: "Identify exactly who experiences this problem most.",
  },
  {
    title: "Solution",
    description: "Define what you're actually building, and why it fits.",
  },
  {
    title: "MVP",
    description: "Create the simplest version that's still useful.",
  },
  {
    title: "Testing",
    description: "Put it in front of real people and watch what happens.",
  },
  {
    title: "Feedback",
    description: "Understand what worked, what didn't, and why.",
  },
  {
    title: "Iteration",
    description: "Change the product based on evidence, not guesses.",
  },
  {
    title: "Business",
    description: "Develop pricing, operations, and a real business model.",
  },
  {
    title: "Growth",
    description: "Acquire customers and improve the venture over time.",
  },
];

export function RoadmapExplorer() {
  const [active, setActive] = useState(0);

  return (
    <div className="w-full max-w-3xl">
      <div className="flex flex-wrap justify-center gap-2">
        {stages.map((stage, i) => (
          <button
            key={stage.title}
            type="button"
            onClick={() => setActive(i)}
            className={cn(
              "flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
              i === active
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:text-foreground",
            )}
          >
            <span
              className={cn(
                "flex size-5 items-center justify-center rounded-full text-xs",
                i === active
                  ? "bg-primary-foreground text-primary"
                  : "bg-muted text-muted-foreground",
              )}
            >
              {i + 1}
            </span>
            {stage.title}
          </button>
        ))}
      </div>
      <div className="mt-6 rounded-xl border border-border bg-card p-6 text-left">
        <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          Stage {active + 1} of {stages.length}
        </span>
        <h3 className="mt-1 text-xl font-semibold">{stages[active]?.title}</h3>
        <p className="mt-2 text-muted-foreground">
          {stages[active]?.description}
        </p>
      </div>
      <p className="mt-3 text-center text-sm text-muted-foreground">
        A tutoring business and an app move through these stages differently
        &mdash; the tasks inside each one adapt to your venture.
      </p>
    </div>
  );
}
