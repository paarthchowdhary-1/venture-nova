import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { LessonReading } from "~/components/lesson-reading";
import { QuizForm } from "~/components/quiz-form";
import { Badge } from "~/components/ui/badge";
import {
  getLesson,
  lessonApplies,
  lessonsForVenture,
  passMark,
  personalize,
  stageIndex,
} from "~/content/lessons";
import { createClient } from "~/lib/supabase/server";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ id: string; slug: string }>;
}) {
  const { id, slug } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: venture } = await supabase
    .from("ventures")
    .select("id, name, venture_type, current_stage")
    .eq("id", id)
    .maybeSingle();
  if (!venture) notFound();

  const lesson = getLesson(slug);
  if (!lesson || !lessonApplies(lesson, venture.venture_type)) notFound();
  if (stageIndex(lesson.stage) > stageIndex(venture.current_stage)) {
    redirect(`/ventures/${id}`);
  }

  const { data: progress } = await supabase
    .from("lesson_progress")
    .select("passed, best_score")
    .eq("venture_id", id)
    .eq("lesson_slug", slug)
    .maybeSingle();

  const lessons = lessonsForVenture(venture.venture_type);
  const position = lessons.findIndex((l) => l.slug === slug);
  const questions = lesson.quiz.map(({ prompt, options }) => ({
    prompt,
    options,
  }));

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-12">
      <Link
        href={`/ventures/${id}`}
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        &larr; {venture.name}
      </Link>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <Badge variant="secondary" className="capitalize">
          {lesson.stage}
        </Badge>
        <span className="text-sm text-muted-foreground">
          Lesson {position + 1} of {lessons.length} &middot; {lesson.minutes}{" "}
          min read
        </span>
        {progress?.passed && (
          <Badge variant="outline">
            Completed &middot; best {progress.best_score}/{lesson.quiz.length}
          </Badge>
        )}
      </div>

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-balance">
        {lesson.title}
      </h1>

      <div className="mt-8">
        <LessonReading text={lesson.reading} />
      </div>

      <div className="mt-10 rounded-xl border border-border bg-muted/40 p-5">
        <p className="text-sm font-semibold text-foreground">
          Apply it to {venture.name}
        </p>
        <p className="mt-1 text-muted-foreground">
          {personalize(lesson.apply, venture.name)}
        </p>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-semibold">Quick check</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {lesson.quiz.length} short questions. Get at least{" "}
          {passMark(lesson.quiz.length)} right to finish this lesson.
        </p>
        <div className="mt-6">
          <QuizForm ventureId={id} slug={slug} questions={questions} />
        </div>
      </div>
    </div>
  );
}
