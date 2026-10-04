import type { Stage } from "~/lib/ventures";

export type CatalogTask = {
  slug: string;
  stage: Stage;
  title: string;
  description: string;
  /** Shown as the hint for the evidence box: what should the user write down? */
  evidencePrompt: string;
};

/** Real-world actions for each stage. These are the "Do" and "Record" in the loop. */
export const TASK_CATALOG: readonly CatalogTask[] = [
  {
    slug: "idea-problem-statement",
    stage: "idea",
    title: "Write your problem statement",
    description:
      "In one sentence, say who struggles with what, and why. Leave your solution out of it.",
    evidencePrompt: "Paste your problem statement here.",
  },
  {
    slug: "idea-one-sentence",
    stage: "idea",
    title: "Write your one-sentence idea",
    description:
      "Use the template: I'm helping ___ to ___ by ___. Then say it to someone and see if they can repeat it back.",
    evidencePrompt: "Your sentence, and what the other person repeated back.",
  },
  {
    slug: "idea-assumptions",
    stage: "idea",
    title: "List five assumptions and pick the riskiest",
    description:
      "Finish this five times: for this to work, it must be true that... Then circle the one you have the least evidence for.",
    evidencePrompt:
      "Your five assumptions, and which one is the riskiest and why.",
  },
  {
    slug: "val-interview-five",
    stage: "validation",
    title: "Interview five people who match your customer",
    description:
      "Ask each about the last time they dealt with the problem. Listen far more than you talk. Do it with a trusted adult aware.",
    evidencePrompt:
      "How many of the five had the problem? What patterns did you hear? Include a quote.",
  },
  {
    slug: "val-review-evidence",
    stage: "validation",
    title: "Review your evidence and decide what to do",
    description:
      "Look across your notes for patterns. Decide: keep going, narrow your idea, or change it.",
    evidencePrompt:
      "What did the evidence say, and what did you decide? Write the rule you set in advance too.",
  },
  {
    slug: "cust-segment",
    stage: "customer",
    title: "Describe your first customer group",
    description:
      "Say who they are, where they are, and when the problem shows up. Could you name 20 real people in it?",
    evidencePrompt: "Your description, and 3 real examples of people who fit.",
  },
  {
    slug: "cust-alternatives",
    stage: "customer",
    title: "List five ways customers solve this today",
    description:
      "Include direct competitors, indirect options, and doing nothing. Note what each does badly.",
    evidencePrompt: "Your five alternatives and what each one is bad at.",
  },
  {
    slug: "cust-first-ten",
    stage: "customer",
    title: "Make a list of ten possible first customers",
    description:
      "Real people or specific places to find them. Add how you would reach each one safely.",
    evidencePrompt: "Your list of ten, and where or how you would reach them.",
  },
  {
    slug: "sol-value-prop",
    stage: "solution",
    title: "Write your value proposition",
    description:
      "For [customer] who [need], [name] is a [category] that [benefit]. Unlike [alternative], we [difference].",
    evidencePrompt: "Your finished value proposition.",
  },
  {
    slug: "sol-must-haves",
    stage: "solution",
    title: "Pick your must-have features",
    description:
      "List every feature you can think of, then keep only the three to five that deliver the core benefit.",
    evidencePrompt: "Your must-haves, and what you decided to cut.",
  },
  {
    slug: "mvp-riskiest",
    stage: "mvp",
    title: "Choose the riskiest assumption to test",
    description:
      "Pick the assumption that would break your idea if it were wrong and that you know least about.",
    evidencePrompt: "The assumption, and why it is the riskiest.",
  },
  {
    slug: "mvp-build",
    stage: "mvp",
    title: "Make the smallest version that can test it",
    description:
      "A landing page, a pilot with a few customers, a prototype, or a manual version. Aim for days, not months.",
    evidencePrompt:
      "What you made, how long it took, and a link or photo if you have one.",
  },
  {
    slug: "test-plan",
    stage: "testing",
    title: "Write a test with a success rule",
    description:
      "I believe [who] will [do what] because [why]. Success means [number] out of [number] within [time].",
    evidencePrompt:
      "Your hypothesis and your success rule, written before the test.",
  },
  {
    slug: "test-run",
    stage: "testing",
    title: "Run your test with at least ten people",
    description:
      "Measure what people do, not just what they say. Count everyone, including the people who said no.",
    evidencePrompt: "The numbers: how many people, and how many did the thing.",
  },
  {
    slug: "test-first-commitment",
    stage: "testing",
    title: "Ask three people to buy or commit",
    description:
      "Make a clear offer with a price, or a clear commitment such as signing up and showing up. Use a safe payment method with an adult.",
    evidencePrompt:
      "Who you asked, what they said, and their reasons for any no.",
  },
  {
    slug: "fb-collect",
    stage: "feedback",
    title: "Collect feedback from five people",
    description:
      "Ask right after they try it: what was best, what was confusing, and what would make it better?",
    evidencePrompt: "Their answers in their own words.",
  },
  {
    slug: "fb-themes",
    stage: "feedback",
    title: "Group the feedback and pick one thing to act on",
    description:
      "Look for themes. Choose what is frequent, serious, and from your target customers.",
    evidencePrompt: "Your themes, and the one thing you picked and why.",
  },
  {
    slug: "iter-small-change",
    stage: "iteration",
    title: "Make one small change and measure it",
    description:
      "Change only one thing so you know what caused the result. Compare before and after.",
    evidencePrompt: "What you changed, what you expected, and what happened.",
  },
  {
    slug: "iter-decide",
    stage: "iteration",
    title: "Decide: persevere, pivot, or stop",
    description:
      "Use the evidence you collected, not your mood. Set a date to review it again.",
    evidencePrompt:
      "Your decision, the evidence behind it, and your review date.",
  },
  {
    slug: "biz-costs",
    stage: "business",
    title: "Write down every cost of making one sale",
    description:
      "Include materials, fees, shipping, tools, and the value of your time. Mark which costs are fixed and which are variable.",
    evidencePrompt: "Your cost list and your profit on one sale.",
  },
  {
    slug: "biz-price-test",
    stage: "business",
    title: "Set a price and test it with three customers",
    description:
      "Start with your cost as the floor. Ask what price would feel too high and what would make them doubt the quality.",
    evidencePrompt: "Your price, and what three customers said about it.",
  },
  {
    slug: "biz-adult-check",
    stage: "business",
    title: "Talk to a parent or professional about money and legal basics",
    description:
      "Ask about accounts, taxes, permits, and anything you need permission for where you live.",
    evidencePrompt:
      "Who you talked to and what you learned or need to do next.",
  },
  {
    slug: "grow-channel",
    stage: "growth",
    title: "Try one marketing channel for two weeks",
    description:
      "Pick one place your customers already are. Ask every new customer how they heard about you.",
    evidencePrompt:
      "Which channel, what you did, and how many customers it brought.",
  },
  {
    slug: "grow-referrals",
    stage: "growth",
    title: "Ask three happy customers for a referral",
    description:
      "Ask right after a good result: do you know anyone else who might like this? Make sharing easy.",
    evidencePrompt: "Who you asked and how many introductions you got.",
  },
  {
    slug: "grow-pitch",
    stage: "growth",
    title: "Practice your 60-second pitch with someone",
    description:
      "Hook, problem, solution, proof from your own evidence, and a clear ask. Ask for honest feedback.",
    evidencePrompt: "Who you pitched to and what they said to improve.",
  },
];

export function tasksForStage(stage: string) {
  return TASK_CATALOG.filter((t) => t.stage === stage);
}

/** Which lesson explains each task, for the "I don't understand this" help link. */
export const TASK_HELP: Record<string, string> = {
  "idea-problem-statement": "idea-start-with-problem",
  "idea-one-sentence": "idea-one-sentence",
  "idea-assumptions": "idea-assumptions",
  "val-interview-five": "val-interviews",
  "val-review-evidence": "val-reading-evidence",
  "cust-segment": "cust-segments",
  "cust-alternatives": "cust-competition",
  "cust-first-ten": "cust-first-ten",
  "sol-value-prop": "sol-value-prop",
  "sol-must-haves": "sol-benefits",
  "mvp-riskiest": "idea-assumptions",
  "mvp-build": "mvp-what",
  "test-plan": "test-hypothesis",
  "test-run": "test-watch-users",
  "test-first-commitment": "test-first-sale",
  "fb-collect": "fb-collecting",
  "fb-themes": "fb-sorting",
  "iter-small-change": "iter-small-fast",
  "iter-decide": "iter-pivot",
  "biz-costs": "biz-costs-margins",
  "biz-price-test": "biz-pricing",
  "biz-adult-check": "biz-legal",
  "grow-channel": "grow-marketing",
  "grow-referrals": "grow-word-of-mouth",
  "grow-pitch": "grow-pitch",
};
