export const STAGE_ORDER = [
  "idea",
  "validation",
  "customer",
  "solution",
  "mvp",
  "testing",
  "feedback",
  "iteration",
  "business",
  "growth",
] as const;

export type Interview = {
  id: string;
  interviewee: string;
  interviewed_on: string;
  notes: string | null;
  key_quote: string | null;
  tags: string[];
};
export type Hypothesis = {
  id: string;
  statement: string;
  experiment: string | null;
  questions: string | null;
  sample_target: number;
  threshold_pct: number;
  tested: number;
  supported: number;
  results_notes: string | null;
};
export type Claim = { id: string; statement: string };
export type EvidenceItem = {
  id: string;
  claim_id: string;
  kind: string;
  description: string;
  quantity: number;
};
export type Competitor = {
  id: string;
  name: string;
  strength: string | null;
  weakness: string | null;
  target: string | null;
};
export type MvpFeature = { id: string; name: string; bucket: string };
export type Decision = {
  id: string;
  decided_on: string;
  decision: string;
  reason: string | null;
  evidence: string | null;
};
export type TaskLite = {
  catalog_slug: string | null;
  stage: string;
  title: string;
  status: string;
};

export type Snapshot = {
  venture: {
    id: string;
    name: string;
    idea: string;
    problem: string | null;
    target_customer: string | null;
    venture_type: string;
    current_stage: string;
  };
  lessons: {
    passed: number;
    total: number;
    next: { slug: string; title: string } | null;
  };
  tasks: TaskLite[];
  interviews: Interview[];
  hypotheses: Hypothesis[];
  claims: Claim[];
  evidence: EvidenceItem[];
  competitors: Competitor[];
  features: MvpFeature[];
  decisions: Decision[];
  launchDone: number;
  launchTotal: number;
};

const stageIdx = (stage: string) => STAGE_ORDER.indexOf(stage as never);
const clamp01 = (n: number) => Math.max(0, Math.min(1, n));
const taskDone = (s: Snapshot, slug: string) =>
  s.tasks.some((t) => t.catalog_slug === slug && t.status === "done");

// ---------------------------------------------------------------- hypotheses

export type Verdict = {
  status: "validated" | "needs_more" | "not_validated";
  label: string;
  detail: string;
};

export function hypothesisVerdict(h: Hypothesis): Verdict {
  if (h.tested < h.sample_target) {
    return {
      status: "needs_more",
      label: "Needs more evidence",
      detail: `${h.tested} of ${h.sample_target} people tested so far.`,
    };
  }
  const pct = Math.round((h.supported / Math.max(h.tested, 1)) * 100);
  if (pct >= h.threshold_pct) {
    return {
      status: "validated",
      label: "Validated",
      detail: `${h.supported} of ${h.tested} (${pct}%) supported it, and you needed ${h.threshold_pct}%.`,
    };
  }
  return {
    status: "not_validated",
    label: "Not validated",
    detail: `Only ${h.supported} of ${h.tested} (${pct}%) supported it, and you needed ${h.threshold_pct}%.`,
  };
}

// ---------------------------------------------------------------- evidence

const KIND_WEIGHT: Record<string, { per: number; cap: number }> = {
  interview: { per: 0.5, cap: 5 },
  survey: { per: 0.2, cap: 3 },
  competitor: { per: 1, cap: 3 },
  experiment: { per: 1.5, cap: 4 },
  observation: { per: 0.2, cap: 1 },
};

export function evidencePoints(items: EvidenceItem[]) {
  return items.reduce((sum, item) => {
    const w = KIND_WEIGHT[item.kind] ?? { per: 0.2, cap: 1 };
    return sum + Math.min(item.quantity * w.per, w.cap);
  }, 0);
}

export function claimConfidence(items: EvidenceItem[]): {
  level: "none" | "low" | "medium" | "high";
  label: string;
} {
  const points = evidencePoints(items);
  if (items.length === 0) return { level: "none", label: "No evidence yet" };
  if (points >= 6) return { level: "high", label: "High" };
  if (points >= 3) return { level: "medium", label: "Medium" };
  return { level: "low", label: "Low" };
}

// ---------------------------------------------------------------- interviews

export function interviewPatterns(interviews: Interview[]) {
  const counts = new Map<string, number>();
  for (const interview of interviews) {
    const seen = new Set(
      interview.tags.map((t) => t.trim().toLowerCase()).filter(Boolean),
    );
    for (const tag of seen) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 6)
    .map(([tag, count]) => ({ tag, count, total: interviews.length }));
}

export function parseTags(raw: string) {
  return Array.from(
    new Set(
      raw
        .split(/[,\n]/)
        .map((t) => t.trim().toLowerCase())
        .filter((t) => t.length > 0 && t.length <= 60),
    ),
  ).slice(0, 12);
}

// ---------------------------------------------------------------- competitors

const STOP = new Set([
  "the",
  "and",
  "for",
  "who",
  "with",
  "that",
  "this",
  "from",
  "into",
  "their",
  "have",
  "are",
  "students",
  "people",
  "users",
  "kids",
  "teens",
]);

export function competitorOpportunity(
  targetCustomer: string | null,
  competitors: Competitor[],
): string | null {
  const withTargets = competitors.filter((c) => c.target?.trim());
  if (!targetCustomer?.trim() || withTargets.length < 2) return null;
  const keywords = targetCustomer
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length >= 4 && !STOP.has(w));
  if (keywords.length === 0) return null;
  const covered = withTargets.some((c) =>
    keywords.some((k) => (c.target ?? "").toLowerCase().includes(k)),
  );
  return covered
    ? null
    : `None of your competitors list "${targetCustomer.trim()}" as their target. That could be a real gap, so check it with your interviews.`;
}

export function commonWeaknesses(competitors: Competitor[]) {
  const counts = new Map<string, number>();
  for (const c of competitors) {
    const w = c.weakness?.trim().toLowerCase();
    if (w) counts.set(w, (counts.get(w) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .filter(([, n]) => n > 1)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);
}

// ---------------------------------------------------------------- mvp

export function mvpWarnings(features: MvpFeature[]) {
  const must = features.filter((f) => f.bucket === "must").length;
  const warnings: string[] = [];
  if (features.length > 12 || must > 5) {
    warnings.push(
      `You're trying to build ${features.length} features for your first version (${must} are must-haves). Start with the 3 to 5 that are needed to test your core idea.`,
    );
  }
  if (features.length > 0 && must === 0) {
    warnings.push(
      "Nothing is marked must-have yet. Pick the few features without which your core idea can't be tested.",
    );
  }
  return warnings;
}

// ---------------------------------------------------------------- progress

export type Progress = {
  percent: number;
  parts: { label: string; percent: number; weight: number }[];
};

export function ventureProgress(s: Snapshot): Progress {
  const lessons = s.lessons.total ? s.lessons.passed / s.lessons.total : 0;
  const tasks = s.tasks.length
    ? s.tasks.filter((t) => t.status === "done").length / s.tasks.length
    : 0;
  const validated = s.hypotheses.filter(
    (h) => hypothesisVerdict(h).status === "validated",
  ).length;
  const strongClaims = s.claims.filter((c) =>
    ["medium", "high"].includes(
      claimConfidence(s.evidence.filter((e) => e.claim_id === c.id)).level,
    ),
  ).length;
  const evidence =
    0.4 * clamp01(s.interviews.length / 10) +
    0.3 * clamp01(validated / 2) +
    0.15 * clamp01(strongClaims / 2) +
    0.15 * clamp01(s.competitors.length / 5);

  const parts = [
    { label: "Lessons", percent: Math.round(lessons * 100), weight: 30 },
    { label: "Tasks", percent: Math.round(tasks * 100), weight: 30 },
    { label: "Evidence", percent: Math.round(evidence * 100), weight: 40 },
  ];
  const percent = Math.round(lessons * 30 + tasks * 30 + evidence * 40);
  return { percent: Math.min(100, percent), parts };
}

// ---------------------------------------------------------------- health

export type HealthCategory = {
  id: string;
  label: string;
  score: number;
  tip: string;
};

export function ventureHealth(s: Snapshot): {
  overall: number;
  categories: HealthCategory[];
  weakest: HealthCategory;
} {
  const v = s.venture;
  const interviews = clamp01(s.interviews.length / 10);
  const validated = s.hypotheses.filter(
    (h) => hypothesisVerdict(h).status === "validated",
  ).length;
  const strongClaims = s.claims.filter((c) =>
    ["medium", "high"].includes(
      claimConfidence(s.evidence.filter((e) => e.claim_id === c.id)).level,
    ),
  ).length;
  const customerTasks = s.tasks.filter((t) => t.stage === "customer");
  const customerTaskRatio = customerTasks.length
    ? customerTasks.filter((t) => t.status === "done").length /
      customerTasks.length
    : 0;
  const filled = s.competitors.filter(
    (c) => c.strength?.trim() && c.weakness?.trim(),
  ).length;
  const weaknesses = s.competitors.filter((c) => c.weakness?.trim()).length;

  const problem =
    25 * Number((v.problem?.trim().length ?? 0) >= 30) +
    25 * Number(v.idea.trim().length >= 30) +
    25 * Number(taskDone(s, "idea-problem-statement")) +
    25 * Number(taskDone(s, "idea-one-sentence"));
  const customer =
    20 * Number(Boolean(v.target_customer?.trim())) +
    50 * interviews +
    30 * customerTaskRatio;
  const validation =
    35 * clamp01(validated / 2) +
    25 * interviews +
    25 * clamp01(strongClaims / 2) +
    15 * Number(s.hypotheses.some((h) => h.tested > 0));
  const competition =
    60 * clamp01(s.competitors.length / 5) +
    40 * (s.competitors.length ? filled / s.competitors.length : 0);
  const differentiation =
    40 * Number(taskDone(s, "sol-value-prop")) +
    40 * clamp01(weaknesses / 3) +
    20 * Number(Boolean(v.target_customer?.trim()));
  const progress = ventureProgress(s).percent;

  const categories: HealthCategory[] = [
    {
      id: "problem",
      label: "Problem clarity",
      score: Math.round(problem),
      tip: "Write a specific problem statement and a clear one-sentence idea.",
    },
    {
      id: "customer",
      label: "Customer understanding",
      score: Math.round(customer),
      tip: "Name your target customer and log customer interviews.",
    },
    {
      id: "validation",
      label: "Validation",
      score: Math.round(validation),
      tip: "Test a hypothesis with real people and record evidence for your claims.",
    },
    {
      id: "competition",
      label: "Competition",
      score: Math.round(competition),
      tip: "Add about five competitors with their strengths and weaknesses.",
    },
    {
      id: "differentiation",
      label: "Differentiation",
      score: Math.round(differentiation),
      tip: "Write your value proposition and find three competitor weaknesses.",
    },
    {
      id: "progress",
      label: "Progress",
      score: progress,
      tip: "Keep finishing lessons and tasks, and back them with evidence.",
    },
  ];
  const overall = Math.round(
    categories.reduce((sum, c) => sum + c.score, 0) / categories.length,
  );
  const weakest = categories.reduce((a, b) => (b.score < a.score ? b : a));
  return { overall, categories, weakest };
}

// ---------------------------------------------------------------- next best action

export type Action = {
  title: string;
  why: string;
  minutes: number;
  href: string;
  cta: string;
};

export function recommendedActions(s: Snapshot): Action[] {
  const id = s.venture.id;
  const idx = stageIdx(s.venture.current_stage);
  const base = `/ventures/${id}`;
  const actions: Action[] = [];

  if (!taskDone(s, "idea-problem-statement")) {
    actions.push({
      title: "Write your problem statement",
      why: "Everything else you build rests on a clear, specific problem.",
      minutes: 10,
      href: `${base}/tasks`,
      cta: "Open tasks",
    });
  }

  if (idx >= 1 && s.interviews.length < 5) {
    const left = 5 - s.interviews.length;
    actions.push({
      title: `Interview ${left} more potential ${left === 1 ? "customer" : "customers"}`,
      why:
        s.interviews.length === 0
          ? "You haven't talked to anyone yet, so your idea is still built on assumptions."
          : `You've logged ${s.interviews.length} of 5 interviews. A pattern needs at least five voices.`,
      minutes: 45,
      href: `${base}/interviews`,
      cta: "Log an interview",
    });
  }

  if (idx >= 1 && s.hypotheses.length === 0) {
    actions.push({
      title: "Write your first hypothesis",
      why: "A hypothesis turns a hunch into a test you can pass or fail.",
      minutes: 15,
      href: `${base}/validation`,
      cta: "Open the Validation Lab",
    });
  }

  const unfinished = s.hypotheses.find(
    (h) => hypothesisVerdict(h).status === "needs_more",
  );
  if (idx >= 1 && unfinished) {
    actions.push({
      title: `Finish testing: "${truncate(unfinished.statement, 60)}"`,
      why: `Only ${unfinished.tested} of ${unfinished.sample_target} people have been tested, which isn't enough to judge it.`,
      minutes: 40,
      href: `${base}/validation`,
      cta: "Record results",
    });
  }

  const failed = s.hypotheses.find(
    (h) => hypothesisVerdict(h).status === "not_validated",
  );
  if (failed) {
    actions.push({
      title: "Rethink your direction",
      why: `The evidence didn't support: "${truncate(failed.statement, 60)}". That's useful, and it's not failure. Look at your pivot options.`,
      minutes: 20,
      href: `${base}/validation`,
      cta: "See pivot options",
    });
  }

  if (idx >= 2 && s.competitors.length < 5) {
    actions.push({
      title: `Find ${5 - s.competitors.length} more competitors`,
      why: "Knowing how customers solve the problem today shows where you can be different.",
      minutes: 30,
      href: `${base}/competitors`,
      cta: "Open Competitor Radar",
    });
  }

  if (idx >= 1 && s.claims.length === 0 && s.interviews.length >= 3) {
    actions.push({
      title: "Record your first claim and its evidence",
      why: "You have interviews. Turn what you've learned into a claim you can back up.",
      minutes: 15,
      href: `${base}/evidence`,
      cta: "Open the Evidence Vault",
    });
  }

  const validated = s.hypotheses.some(
    (h) => hypothesisVerdict(h).status === "validated",
  );
  if (idx >= 3 && validated && s.features.length === 0) {
    actions.push({
      title: "Plan your MVP features",
      why: "Your idea has some validation. Decide the smallest version worth building.",
      minutes: 25,
      href: `${base}/mvp`,
      cta: "Open the MVP Planner",
    });
  }

  if (s.lessons.next) {
    actions.push({
      title: `Read: ${s.lessons.next.title}`,
      why: "A short lesson and a quick quiz will get you ready for the next step.",
      minutes: 5,
      href: `${base}/lessons/${s.lessons.next.slug}`,
      cta: "Start the lesson",
    });
  }

  const nextTask = s.tasks.find(
    (t) => t.stage === s.venture.current_stage && t.status !== "done",
  );
  if (nextTask && !actions.some((a) => a.title === nextTask.title)) {
    actions.push({
      title: nextTask.title,
      why: "It's the next real-world step for your current stage.",
      minutes: 30,
      href: `${base}/tasks`,
      cta: "Open tasks",
    });
  }

  if (idx >= 5 && s.launchDone < s.launchTotal) {
    actions.push({
      title: "Work through your launch checklist",
      why: `${s.launchDone} of ${s.launchTotal} launch steps are done.`,
      minutes: 30,
      href: `${base}/launch`,
      cta: "Open the Launch Center",
    });
  }

  if (actions.length === 0) {
    actions.push({
      title: "Log a decision you've made",
      why: "You're caught up. Writing down what you decided and why makes your thinking sharper.",
      minutes: 10,
      href: `${base}/decisions`,
      cta: "Open the Decision Log",
    });
  }
  return actions;
}

function truncate(text: string, n: number) {
  return text.length > n ? `${text.slice(0, n - 1)}...` : text;
}

// ---------------------------------------------------------------- achievements

export function achievements(s: Snapshot) {
  const out: string[] = [];
  const validated = s.hypotheses.filter(
    (h) => hypothesisVerdict(h).status === "validated",
  ).length;
  if (s.interviews.length >= 1)
    out.push(
      `Completed ${s.interviews.length} customer interview${s.interviews.length === 1 ? "" : "s"}`,
    );
  if (s.hypotheses.length >= 1)
    out.push(
      `Ran ${s.hypotheses.filter((h) => h.tested > 0).length} validation experiment${s.hypotheses.filter((h) => h.tested > 0).length === 1 ? "" : "s"}`,
    );
  if (validated >= 1)
    out.push(`Validated ${validated} hypothesis${validated === 1 ? "" : "es"}`);
  if (s.competitors.length >= 1)
    out.push(
      `Mapped ${s.competitors.length} competitor${s.competitors.length === 1 ? "" : "s"}`,
    );
  const must = s.features.filter((f) => f.bucket === "must").length;
  if (must >= 1)
    out.push(
      `Defined an MVP with ${must} must-have feature${must === 1 ? "" : "s"}`,
    );
  if (s.lessons.passed >= 1)
    out.push(
      `Passed ${s.lessons.passed} lesson${s.lessons.passed === 1 ? "" : "s"}`,
    );
  const done = s.tasks.filter((t) => t.status === "done").length;
  if (done >= 1)
    out.push(`Completed ${done} real-world task${done === 1 ? "" : "s"}`);
  if (s.decisions.length >= 1)
    out.push(
      `Logged ${s.decisions.length} decision${s.decisions.length === 1 ? "" : "s"}`,
    );
  // A launch badge only counts once the venture has actually reached the testing
  // stage, so ticking every box early can't claim a launch that hasn't happened.
  if (
    s.launchTotal > 0 &&
    s.launchDone === s.launchTotal &&
    stageIdx(s.venture.current_stage) >= stageIdx("testing")
  )
    out.push("Launched");
  return out;
}
