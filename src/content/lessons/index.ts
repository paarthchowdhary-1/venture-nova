import { STAGES, type Stage } from "~/lib/ventures";
import { businessLessons } from "./business";
import { customerLessons } from "./customer";
import { feedbackLessons } from "./feedback";
import { growthLessons } from "./growth";
import { ideaLessons } from "./idea";
import { iterationLessons } from "./iteration";
import { mvpLessons } from "./mvp";
import { solutionLessons } from "./solution";
import { testingLessons } from "./testing";
import type { Lesson } from "./types";
import { validationLessons } from "./validation";

export type { Lesson, QuizQuestion } from "./types";

/** Every lesson, in stage order. */
export const ALL_LESSONS: readonly Lesson[] = [
  ...ideaLessons,
  ...validationLessons,
  ...customerLessons,
  ...solutionLessons,
  ...mvpLessons,
  ...testingLessons,
  ...feedbackLessons,
  ...iterationLessons,
  ...businessLessons,
  ...growthLessons,
];

/** A quiz needs at least two thirds of its questions right to pass. */
export function passMark(totalQuestions: number) {
  return Math.ceil((totalQuestions * 2) / 3);
}

export function stageIndex(stage: string) {
  return STAGES.indexOf(stage as Stage);
}

export function lessonApplies(lesson: Lesson, ventureType: string) {
  return (
    lesson.appliesTo === "all" ||
    (lesson.appliesTo as readonly string[]).includes(ventureType)
  );
}

/** The lessons assigned to a venture, chosen by its type, in teaching order. */
export function lessonsForVenture(ventureType: string): Lesson[] {
  return ALL_LESSONS.filter((lesson) => lessonApplies(lesson, ventureType));
}

export function getLesson(slug: string): Lesson | undefined {
  return ALL_LESSONS.find((lesson) => lesson.slug === slug);
}

export function personalize(text: string, ventureName: string) {
  return text.replaceAll("{name}", ventureName);
}

/**
 * A venture sits in the first stage that still has an unfinished lesson.
 * Once every lesson is passed it stays in the final stage and `complete` is true.
 */
export function stageForProgress(
  lessons: readonly Lesson[],
  passedSlugs: ReadonlySet<string>,
): { stage: Stage; complete: boolean } {
  for (const stage of STAGES) {
    const unfinished = lessons.some(
      (lesson) => lesson.stage === stage && !passedSlugs.has(lesson.slug),
    );
    if (unfinished) return { stage, complete: false };
  }
  return { stage: STAGES[STAGES.length - 1] as Stage, complete: true };
}

/** First lesson not yet passed that the venture is allowed to open. */
export function nextLesson(
  lessons: readonly Lesson[],
  passedSlugs: ReadonlySet<string>,
  currentStage: string,
): Lesson | undefined {
  const limit = stageIndex(currentStage);
  return lessons.find(
    (lesson) =>
      !passedSlugs.has(lesson.slug) && stageIndex(lesson.stage) <= limit,
  );
}
