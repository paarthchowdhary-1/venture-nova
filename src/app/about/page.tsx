import type { Metadata } from "next";
import Link from "next/link";
import { Icon, type IconName } from "~/components/icons";
import { StartCta } from "~/components/landing/start-cta";
import { Badge } from "~/components/ui/badge";

export const metadata: Metadata = {
  title: "About",
  description:
    "VentureNova is a free, AI-coached entrepreneurship platform for young founders ages 12 to 18, built by a student.",
};

const principles: {
  icon: IconName;
  title: string;
  body: string;
  tone: string;
}[] = [
  {
    icon: "folder",
    title: "Evidence over clicks",
    body: "Lessons and tasks only take you part of the way. The rest of your progress has to come from real evidence: interviews you did, ideas you tested, and what you learned.",
    tone: "bg-secondary text-primary-ink",
  },
  {
    icon: "chat",
    title: "A coach that asks, not tells",
    body: "The AI coach knows your venture and your stage. It asks hard questions and challenges weak assumptions, and you make the decisions.",
    tone: "bg-secondary text-primary-ink",
  },
  {
    icon: "gift",
    title: "Free to start",
    body: "No credit card, no ads. Sign up with an email and password and you can start your first venture in about a minute.",
    tone: "bg-secondary text-primary-ink",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      <section className="flex w-full flex-col items-center gap-4 bg-linear-to-b from-tint to-background px-4 pt-14 pb-12 text-center sm:pt-20 sm:pb-16">
        <Badge variant="secondary">About</Badge>
        <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-balance sm:text-5xl">
          Built by a student, for young founders.
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground text-balance">
          VentureNova is a free, AI-coached platform that helps people ages 12
          to 18 turn an idea into a real venture, with a roadmap, lessons, real
          tasks, and proof of the work.
        </p>
      </section>

      <section className="mx-auto w-full max-w-3xl px-4 py-12 sm:py-16">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Why it exists
        </h2>
        <div className="mt-4 flex flex-col gap-4 text-lg leading-relaxed text-muted-foreground">
          <p>
            Lots of young people have a business idea. Very few get any help
            with what comes next. Most tools hand you a checklist and reward you
            for clicking through it, which feels like progress without
            necessarily being any.
          </p>
          <p>
            VentureNova is built around a simple loop instead: learn something,
            do it for real, record what happened, analyze it, and adapt your
            plan. The point is to find out whether your idea works, early,
            before you spend months on it.
          </p>
        </div>
      </section>

      <section className="border-y border-border bg-tint py-12 sm:py-16">
        <div className="mx-auto grid w-full max-w-5xl gap-4 px-4 sm:grid-cols-3">
          {principles.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <span
                className={`flex size-11 items-center justify-center rounded-xl ${p.tone}`}
              >
                <Icon name={p.icon} className="size-5" />
              </span>
              <h3 className="mt-4 text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-3xl px-4 py-12 sm:py-16">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          How the AI coach is used
        </h2>
        <ul className="mt-4 flex flex-col gap-3 text-lg leading-relaxed text-muted-foreground">
          <li className="flex gap-3">
            <Icon
              name="check"
              className="mt-1.5 size-5 shrink-0 text-primary-ink"
            />
            It asks questions and challenges your thinking. It does not do the
            work for you.
          </li>
          <li className="flex gap-3">
            <Icon
              name="check"
              className="mt-1.5 size-5 shrink-0 text-primary-ink"
            />
            It won&apos;t make up customer quotes or evidence. If you
            haven&apos;t tested something yet, it says so.
          </li>
          <li className="flex gap-3">
            <Icon
              name="check"
              className="mt-1.5 size-5 shrink-0 text-primary-ink"
            />
            It is not a financial advisor and doesn&apos;t give personal
            financial advice.
          </li>
        </ul>
      </section>

      <section className="border-y border-border bg-tint py-12 sm:py-16">
        <div className="mx-auto w-full max-w-3xl px-4">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Your work stays yours
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Your ventures, interviews, notes and coach chats belong to your
            account. Only the person who runs VentureNova can open them, for
            support and safety, and every time that happens it is recorded in a
            log. You choose whether a venture has a public page. Read the full
            details in the{" "}
            <Link
              href="/privacy"
              className="font-medium text-primary-ink underline-offset-4 hover:underline"
            >
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link
              href="/terms"
              className="font-medium text-primary-ink underline-offset-4 hover:underline"
            >
              Terms
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-3xl px-4 py-12 sm:py-16">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Who&apos;s behind it
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          VentureNova is built by Paarth, a student and Lumos Fellow. It&apos;s
          new, and it gets better with feedback from the people who use it. If
          you have a question, an idea, or you&apos;re a teacher who wants to
          use it with a class, write to{" "}
          <a
            href="mailto:hello@venturenova.org"
            className="font-medium text-primary-ink underline-offset-4 hover:underline"
          >
            hello@venturenova.org
          </a>
          .
        </p>
      </section>

      <section className="flex flex-col items-center gap-3 px-4 pb-16 text-center">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Ready to try it?
        </h2>
        <StartCta />
      </section>
    </div>
  );
}
