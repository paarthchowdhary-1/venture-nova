import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { FeedbackForm } from "~/components/feedback-form";
import { getSessionUser } from "~/lib/session";

export const metadata: Metadata = {
  title: "Help & feedback",
  robots: { index: false, follow: false },
};

export default async function FeedbackPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  const { from } = await searchParams;

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight">
        Help &amp; feedback
      </h1>
      <p className="mt-2 text-muted-foreground">
        Found a bug? Stuck on something? Have an idea for VentureNova? Tell us.
        A real person reads every message.
      </p>
      <div className="mt-8">
        <FeedbackForm from={from?.slice(0, 200)} />
      </div>
      <p className="mt-8 text-sm text-muted-foreground">
        You can also email{" "}
        <span className="font-medium text-foreground select-all">
          hello@venturenova.org
        </span>
        .
      </p>
    </div>
  );
}
