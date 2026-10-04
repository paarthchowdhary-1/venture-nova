import type { Stage, VentureType } from "~/lib/ventures";

type StageInfo = { name: string; goal: string };

/**
 * The same 10 stages underneath, but named and described for the kind of venture
 * the founder is building, so an app, a product, a service and a nonprofit each
 * see a roadmap that makes sense for them.
 */
export const ROADMAPS: Record<VentureType, Record<Stage, StageInfo>> = {
  software: {
    idea: { name: "Idea", goal: "Define the problem your app solves." },
    validation: {
      name: "Research & validation",
      goal: "Prove people really have this problem.",
    },
    customer: {
      name: "Know your users",
      goal: "Pick who you build for first.",
    },
    solution: {
      name: "Design the solution",
      goal: "Map the main user flow and the must-have features.",
    },
    mvp: {
      name: "Build the MVP",
      goal: "Make the smallest version that tests your riskiest guess.",
    },
    testing: { name: "Test with users", goal: "Watch real people use it." },
    feedback: {
      name: "Learn from feedback",
      goal: "Turn what people say into themes.",
    },
    iteration: {
      name: "Improve",
      goal: "Fix what matters, one change at a time.",
    },
    business: {
      name: "Business model",
      goal: "Pricing, costs, and the rules to follow.",
    },
    growth: {
      name: "Launch & grow",
      goal: "Find your first real users and keep them.",
    },
  },
  physical_product: {
    idea: { name: "Idea", goal: "Define the problem your product solves." },
    validation: {
      name: "Research",
      goal: "Prove people want this before you make it.",
    },
    customer: {
      name: "Target customer",
      goal: "Pick who you make it for first.",
    },
    solution: {
      name: "Product design",
      goal: "Sketch it, set a target cost, choose materials.",
    },
    mvp: {
      name: "Prototype",
      goal: "Build cheap early versions that answer one question each.",
    },
    testing: { name: "Testing", goal: "Put it in real hands and watch." },
    feedback: {
      name: "Feedback",
      goal: "Find the patterns in what people tell you.",
    },
    iteration: { name: "Refine", goal: "Improve one thing at a time." },
    business: {
      name: "Manufacturing & pricing",
      goal: "Suppliers, costs, shipping, and a price that works.",
    },
    growth: { name: "Launch & grow", goal: "Sell, ship, and earn referrals." },
  },
  service: {
    idea: { name: "Idea", goal: "Define the problem your service solves." },
    validation: {
      name: "Validate demand",
      goal: "Prove people would actually pay for this.",
    },
    customer: {
      name: "Pick your customer",
      goal: "Choose who you serve first.",
    },
    solution: {
      name: "Design your service",
      goal: "Decide exactly what you deliver and how.",
    },
    mvp: {
      name: "Pilot",
      goal: "Serve a few real customers the simplest way.",
    },
    testing: {
      name: "Test",
      goal: "Check results and ask for a real commitment.",
    },
    feedback: {
      name: "Feedback",
      goal: "Learn what customers valued and what confused them.",
    },
    iteration: {
      name: "Improve",
      goal: "Make your service better, one step at a time.",
    },
    business: {
      name: "Pricing & operations",
      goal: "Price your time fairly and know your limits.",
    },
    growth: {
      name: "Get clients & grow",
      goal: "Word of mouth, referrals, and steady customers.",
    },
  },
  nonprofit: {
    idea: {
      name: "Problem",
      goal: "Define the problem you want to help solve.",
    },
    validation: {
      name: "Community research",
      goal: "Learn from the people you want to help.",
    },
    customer: {
      name: "Who you serve",
      goal: "Be specific about the community and its needs.",
    },
    solution: {
      name: "Impact model",
      goal: "Connect what you do to the change you want.",
    },
    mvp: {
      name: "Pilot",
      goal: "Run a small, measurable version of your program.",
    },
    testing: {
      name: "Measure",
      goal: "Check whether people's lives actually improved.",
    },
    feedback: {
      name: "Listen & learn",
      goal: "Ask the community what worked.",
    },
    iteration: {
      name: "Improve",
      goal: "Adjust your program based on evidence.",
    },
    business: {
      name: "Funding & partnerships",
      goal: "Find support and follow the rules for raising money.",
    },
    growth: {
      name: "Scale",
      goal: "Reach more people without losing quality.",
    },
  },
  other: {
    idea: { name: "Idea", goal: "Define the problem you are solving." },
    validation: { name: "Validation", goal: "Prove the problem is real." },
    customer: { name: "Customer", goal: "Pick who you are serving first." },
    solution: { name: "Solution", goal: "Decide what you are building." },
    mvp: {
      name: "MVP",
      goal: "Make the smallest version that teaches you something.",
    },
    testing: { name: "Testing", goal: "Put it in front of real people." },
    feedback: { name: "Feedback", goal: "Find the patterns in what they say." },
    iteration: { name: "Iteration", goal: "Improve based on evidence." },
    business: {
      name: "Business",
      goal: "Pricing, costs, and the rules to follow.",
    },
    growth: { name: "Growth", goal: "Find customers and keep them." },
  },
};

export function stageInfo(ventureType: string, stage: string): StageInfo {
  const roadmap = ROADMAPS[ventureType as VentureType] ?? ROADMAPS.other;
  return roadmap[stage as Stage] ?? { name: stage, goal: "" };
}
