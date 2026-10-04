"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import {
  getLesson,
  lessonApplies,
  lessonsForVenture,
  nextLesson,
  passMark,
  stageForProgress,
  stageIndex,
} from "~/content/lessons";
import { createClient } from "~/lib/supabase/server";
import type { Stage } from "~/lib/ventures";

export type QuizQuestionResult = {
  correct: boolean;
  selected: number;
  correctIndex: number;
  explanation: string;
};

export type QuizResult = {
  passed: boolean;
  score: number;
  total: number;
  needed: number;
  questions: QuizQuestionResult[];
  advancedTo?: Stage;
  nextSlug?: string;
  allDone: boolean;
};

export type QuizState = { error?: string; result?: QuizResult };

const idSchema = z.object({
  ventureId: z.uuid(),
  slug: z.string().min(1).max(100),
});

export async function submitQuiz(
  _prev: QuizState,
  formData: FormData,
): Promise<QuizState> {
  const ids = idSchema.safeParse({
    ventureId: formData.get("ventureId"),
    slug: formData.get("slug"),
  });
  if (!ids.success) return { error: "Something went wrong. Please reload." };
  const { ventureId, slug } = ids.data;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Please log in again." };

  const { data: venture } = await supabase
    .from("ventures")
    .select("id, venture_type, current_stage")
    .eq("id", ventureId)
    .maybeSingle();
  const lesson = getLesson(slug);
  if (!venture || !lesson || !lessonApplies(lesson, venture.venture_type)) {
    return { error: "That lesson isn't available for this venture." };
  }
  if (stageIndex(lesson.stage) > stageIndex(venture.current_stage)) {
    return { error: "Finish your current stage to unlock this lesson." };
  }

  const selections: number[] = [];
  for (let i = 0; i < lesson.quiz.length; i++) {
    const value = Number(formData.get(`q${i}`));
    const question = lesson.quiz[i];
    if (
      !question ||
      !Number.isInteger(value) ||
      value < 0 ||
      value >= question.options.length
    ) {
      return { error: "Please answer every question." };
    }
    selections.push(value);
  }

  const questions: QuizQuestionResult[] = lesson.quiz.map((q, i) => ({
    correct: selections[i] === q.correct,
    selected: selections[i] ?? -1,
    correctIndex: q.correct,
    explanation: q.explanation,
  }));
  const score = questions.filter((q) => q.correct).length;
  const total = lesson.quiz.length;
  const needed = passMark(total);
  const passed = score >= needed;

  const { data: existing } = await supabase
    .from("lesson_progress")
    .select("id, attempts, best_score, passed")
    .eq("venture_id", ventureId)
    .eq("lesson_slug", slug)
    .maybeSingle();

  const saveError = existing
    ? (
        await supabase
          .from("lesson_progress")
          .update({
            attempts: existing.attempts + 1,
            best_score: Math.max(existing.best_score, score),
            passed: existing.passed || passed,
            ...(passed && !existing.passed
              ? { passed_at: new Date().toISOString() }
              : {}),
          })
          .eq("id", existing.id)
      ).error
    : (
        await supabase.from("lesson_progress").insert({
          venture_id: ventureId,
          lesson_slug: slug,
          best_score: score,
          passed,
          passed_at: passed ? new Date().toISOString() : null,
        })
      ).error;
  if (saveError) {
    return { error: "Couldn't save your result. Please try again." };
  }

  let advancedTo: Stage | undefined;
  let nextSlug: string | undefined;
  let allDone = false;

  if (passed) {
    const { data: rows } = await supabase
      .from("lesson_progress")
      .select("lesson_slug")
      .eq("venture_id", ventureId)
      .eq("passed", true);
    const passedSlugs = new Set((rows ?? []).map((r) => r.lesson_slug));
    const lessons = lessonsForVenture(venture.venture_type);
    const { stage, complete } = stageForProgress(lessons, passedSlugs);
    allDone = complete;

    if (stageIndex(stage) > stageIndex(venture.current_stage)) {
      const { error: stageError } = await supabase
        .from("ventures")
        .update({ current_stage: stage })
        .eq("id", ventureId);
      if (!stageError) advancedTo = stage;
    }
    nextSlug = nextLesson(lessons, passedSlugs, advancedTo ?? stage)?.slug;
  }

  revalidatePath(`/ventures/${ventureId}`, "layout");
  revalidatePath("/dashboard");

  return {
    result: {
      passed,
      score,
      total,
      needed,
      questions,
      advancedTo,
      nextSlug,
      allDone,
    },
  };
}
