import type { IconName } from "~/components/icons";

/** The sections inside a venture, in the order they appear in the sidebar. */
export const VENTURE_SECTIONS: readonly {
  slug: string;
  label: string;
  icon: IconName;
}[] = [
  { slug: "", label: "My roadmap", icon: "map" },
  { slug: "learn", label: "Learn", icon: "book" },
  { slug: "tasks", label: "Tasks", icon: "tasks" },
  { slug: "coach", label: "Coach", icon: "chat" },
  { slug: "validation", label: "Validation Lab", icon: "flask" },
  { slug: "interviews", label: "Interviews", icon: "users" },
  { slug: "evidence", label: "Evidence Vault", icon: "folder" },
  { slug: "competitors", label: "Competitors", icon: "target" },
  { slug: "decisions", label: "Decisions", icon: "scale" },
  { slug: "mvp", label: "MVP Planner", icon: "layers" },
  { slug: "launch", label: "Launch", icon: "rocket" },
  { slug: "share", label: "Share", icon: "share" },
];

const VENTURE_PATH = /^\/ventures\/([0-9a-f-]{36})(?:\/|$)/;

/** The venture id when the path is inside a venture, otherwise null. */
export function ventureIdFromPath(pathname: string) {
  return pathname.match(VENTURE_PATH)?.[1] ?? null;
}

/** Which section of a venture a path belongs to ("" is the overview). */
export function ventureSectionFromPath(pathname: string, id: string) {
  const rest = pathname.startsWith(`/ventures/${id}`)
    ? pathname.slice(`/ventures/${id}`.length)
    : "";
  const first = rest.split("/").filter(Boolean)[0] ?? "";
  return first === "lessons" ? "learn" : first === "edit" ? "" : first;
}
