"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

const ventureTypes = [
  {
    value: "tutoring",
    label: "Tutoring business",
    intro: "If you're building a tutoring business, your roadmap focuses on:",
    focusAreas: [
      "Identifying a niche subject or grade level",
      "Pricing and scheduling",
      "Local marketing and word of mouth",
      "Customer interviews with parents and students",
      "Referrals and retention",
    ],
  },
  {
    value: "product",
    label: "Physical product",
    intro: "If you're building a physical product, your roadmap focuses on:",
    focusAreas: [
      "Customer validation before you manufacture anything",
      "Prototyping and iteration",
      "Supplier and cost research",
      "Unit economics",
      "Branding and distribution",
    ],
  },
  {
    value: "saas",
    label: "App or SaaS",
    intro:
      "If you're building an app or SaaS product, your roadmap focuses on:",
    focusAreas: [
      "User interviews before writing a spec",
      "Defining the smallest useful MVP",
      "Building and user testing",
      "Retention and pricing",
      "Analytics and iteration",
    ],
  },
];

export function VentureTabs() {
  return (
    <Tabs defaultValue="tutoring" className="items-center">
      <TabsList>
        {ventureTypes.map((type) => (
          <TabsTrigger key={type.value} value={type.value}>
            {type.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {ventureTypes.map((type) => (
        <TabsContent
          key={type.value}
          value={type.value}
          className="w-full max-w-xl"
        >
          <div className="rounded-xl border border-border bg-card p-6 text-left">
            <p className="text-sm font-medium text-muted-foreground">
              {type.intro}
            </p>
            <ul className="mt-4 flex flex-col gap-2">
              {type.focusAreas.map((area) => (
                <li key={area} className="flex items-start gap-2 text-sm">
                  <span
                    aria-hidden
                    className="mt-1.5 size-2 shrink-0 rounded-full bg-warm"
                  />
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
