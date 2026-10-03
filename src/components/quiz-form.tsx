"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { type QuizState, submitQuiz } from "~/app/ventures/lesson-actions";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

export type PublicQuestion = {
  prompt: string;
  options: readonly string[];
};

type Props = {
  ventureId: string;
  slug: string;
  questions: readonly PublicQuestion[];
};

export function QuizForm(props: Props) {
  const [attempt, setAttempt] = useState(0);
  return (
    <QuizAttempt
      key={attempt}
      {...props}
      onRetry={() => setAttempt((n) => n + 1)}
    />
  );
}

function QuizAttempt({
  ventureId,
  slug,
  questions,
  onRetry,
}: Props & { onRetry: () => void }) {
  const [state, formAction, pending] = useActionState<QuizState, FormData>(
    submitQuiz,
    {},
  );
  const result = state.result;

  if (result) {
    return (
      <div className="flex flex-col gap-6">
        <div
          role="status"
          className={cn(
            "rounded-xl border p-4",
            result.passed
              ? "border-primary bg-primary/5"
              : "border-destructive/40 bg-destructive/5",
          )}
        >
          <p className="font-semibold">
            You got {result.score} of {result.total}.{" "}
            {result.passed ? "Nice work, you passed!" : "Not quite yet."}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {result.passed
              ? "This lesson is complete."
              : `You need ${result.needed} of ${result.total} to pass. Look back over the reading, then try again.`}
          </p>
          {result.advancedTo && (
            <p className="mt-2 text-sm font-medium capitalize">
              You moved up to the {result.advancedTo} stage!
            </p>
          )}
          {result.passed && result.allDone && (
            <p className="mt-2 text-sm font-medium">
              You have finished every lesson for this venture. Amazing work.
            </p>
          )}
        </div>

        <ol className="flex flex-col gap-5">
          {questions.map((question, qi) => {
            const outcome = result.questions[qi];
            return (
              <li key={question.prompt} className="flex flex-col gap-2">
                <p className="font-medium">
                  {qi + 1}. {question.prompt}
                </p>
                <ul className="flex flex-col gap-1.5">
                  {question.options.map((option, oi) => {
                    const isCorrect = outcome?.correctIndex === oi;
                    const isPicked = outcome?.selected === oi;
                    return (
                      <li
                        key={option}
                        className={cn(
                          "rounded-md border px-3 py-2 text-sm",
                          isCorrect && "border-primary bg-primary/5",
                          isPicked && !isCorrect && "border-destructive/50",
                        )}
                      >
                        {option}
                        {isCorrect && (
                          <span className="ml-2 font-medium">(correct)</span>
                        )}
                        {isPicked && !isCorrect && (
                          <span className="ml-2 font-medium text-destructive">
                            (your answer)
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
                <p className="text-sm text-muted-foreground">
                  {outcome?.explanation}
                </p>
              </li>
            );
          })}
        </ol>

        <div className="flex flex-wrap gap-3">
          {result.passed ? (
            <>
              {result.nextSlug && (
                <Button asChild>
                  <Link
                    href={`/ventures/${ventureId}/lessons/${result.nextSlug}`}
                  >
                    Next lesson
                  </Link>
                </Button>
              )}
              <Button variant="outline" asChild>
                <Link href={`/ventures/${ventureId}`}>
                  Back to your venture
                </Link>
              </Button>
            </>
          ) : (
            <Button onClick={onRetry}>Try again</Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <input type="hidden" name="ventureId" value={ventureId} />
      <input type="hidden" name="slug" value={slug} />
      {questions.map((question, qi) => (
        <fieldset key={question.prompt} className="flex flex-col gap-2">
          <legend className="mb-1 font-medium">
            {qi + 1}. {question.prompt}
          </legend>
          {question.options.map((option, oi) => (
            <label
              key={option}
              className="flex cursor-pointer items-start gap-3 rounded-md border border-border px-3 py-2 text-sm has-[:checked]:border-primary has-[:checked]:bg-primary/5"
            >
              <input
                type="radio"
                name={`q${qi}`}
                value={oi}
                required
                className="mt-0.5 accent-primary"
              />
              <span>{option}</span>
            </label>
          ))}
        </fieldset>
      ))}
      <Button type="submit" size="lg" disabled={pending}>
        {pending ? "Checking..." : "Check my answers"}
      </Button>
      {state.error && (
        <p role="alert" className="text-sm text-destructive">
          {state.error}
        </p>
      )}
    </form>
  );
}
