export const VENTURE_TYPES = [
  { value: "service", label: "Service or business (e.g. tutoring)" },
  { value: "physical_product", label: "Physical product" },
  { value: "software", label: "App or software" },
  { value: "nonprofit", label: "Nonprofit or social impact" },
  { value: "other", label: "Something else" },
] as const;

export type VentureType = (typeof VENTURE_TYPES)[number]["value"];

export const VENTURE_TYPE_VALUES = VENTURE_TYPES.map((t) => t.value) as [
  VentureType,
  ...VentureType[],
];

export const STAGES = [
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

export type Stage = (typeof STAGES)[number];

export function ventureTypeLabel(value: string) {
  return VENTURE_TYPES.find((t) => t.value === value)?.label ?? value;
}
