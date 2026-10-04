export type LaunchItem = {
  slug: string;
  section: "checklist" | "week1" | "week2" | "week3" | "week4";
  title: string;
};

export const LAUNCH_SECTIONS = [
  {
    id: "checklist",
    title: "Launch checklist",
    blurb: "Get ready to go live.",
  },
  { id: "week1", title: "Week 1: Get your first users", blurb: "" },
  { id: "week2", title: "Week 2: Collect feedback", blurb: "" },
  { id: "week3", title: "Week 3: Improve the product", blurb: "" },
  { id: "week4", title: "Week 4: Analyze the results", blurb: "" },
] as const;

export const LAUNCH_ITEMS: readonly LaunchItem[] = [
  { slug: "lc-finalize-mvp", section: "checklist", title: "Finalize your MVP" },
  {
    slug: "lc-test-ten",
    section: "checklist",
    title: "Test it with 10 people",
  },
  {
    slug: "lc-fix-major",
    section: "checklist",
    title: "Fix the major problems you found",
  },
  {
    slug: "lc-landing",
    section: "checklist",
    title: "Create a simple page that explains it",
  },
  {
    slug: "lc-announcement",
    section: "checklist",
    title: "Prepare your announcement",
  },
  {
    slug: "lc-recruit",
    section: "checklist",
    title: "Line up your first users",
  },
  {
    slug: "lc-feedback-plan",
    section: "checklist",
    title: "Decide how you will collect feedback",
  },
  {
    slug: "lc-adult-check",
    section: "checklist",
    title: "Check money, safety and privacy basics with an adult",
  },
  {
    slug: "w1-announce",
    section: "week1",
    title: "Share your announcement where your customers are",
  },
  {
    slug: "w1-personal",
    section: "week1",
    title: "Personally invite 10 people",
  },
  {
    slug: "w1-help",
    section: "week1",
    title: "Help every new user get started",
  },
  {
    slug: "w2-ask",
    section: "week2",
    title: "Ask every user what was best and what was confusing",
  },
  {
    slug: "w2-record",
    section: "week2",
    title: "Record all feedback in your interview hub",
  },
  {
    slug: "w3-themes",
    section: "week3",
    title: "Group the feedback and pick the top problem",
  },
  { slug: "w3-fix", section: "week3", title: "Fix it and tell your users" },
  {
    slug: "w4-numbers",
    section: "week4",
    title: "Review your numbers: users, returns, referrals",
  },
  {
    slug: "w4-decide",
    section: "week4",
    title: "Decide: persevere, pivot, or stop, and log it",
  },
];
