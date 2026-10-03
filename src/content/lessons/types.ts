import type { Stage, VentureType } from "~/lib/ventures";

export type QuizQuestion = {
  prompt: string;
  options: readonly string[];
  /** Index into `options` of the single correct answer. */
  correct: number;
  explanation: string;
};

export type Lesson = {
  slug: string;
  stage: Stage;
  title: string;
  minutes: number;
  /** "all" lessons go to every venture; otherwise only the listed venture types. */
  appliesTo: "all" | readonly VentureType[];
  /** One line shown in lesson lists. */
  summary: string;
  /**
   * Mini-markdown: blank line between blocks, "## " subheading, lines starting
   * with "- " make a bullet list, **bold** inline.
   */
  reading: string;
  /** Prompt that ties the lesson to the user's own venture. `{name}` is replaced. */
  apply: string;
  quiz: readonly QuizQuestion[];
};
