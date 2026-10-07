import type { Metadata } from "next";
import { EvidenceToggle } from "~/components/landing/evidence-toggle";
import { RoadmapExplorer } from "~/components/landing/roadmap-explorer";
import { StartCta } from "~/components/landing/start-cta";
import { Badge } from "~/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "How VentureNova turns an idea into a real venture: a loop of learning, doing, recording, analyzing, and adapting.",
};

const loop = [
  {
    step: "01",
    title: "Learn",
    description:
      "Get the exact concept you need, right when your venture needs it.",
  },
  {
    step: "02",
    title: "Do",
    description:
      "Turn it into a real action: an interview, a prototype, a test.",
  },
  {
    step: "03",
    title: "Record",
    description: "Capture what actually happened, not just what you hoped.",
  },
  {
    step: "04",
    title: "Analyze",
    description:
      "See what the evidence really says about your idea and your customer.",
  },
  {
    step: "05",
    title: "Adapt",
    description: "Your roadmap changes based on what you just learned.",
  },
];

const comparisons = [
  {
    title: "A chatbot",
    body: "Answers a question, then forgets everything about your venture the moment you close the tab.",
  },
  {
    title: "A course",
    body: "Teaches the same curriculum to everyone, whether you're building an app or a tutoring business.",
  },
  {
    title: "An accelerator",
    body: "Selective, cohort-based, and built for startups that already exist, not a first idea.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="flex flex-col">
      <section className="flex w-full flex-col items-center gap-4 bg-linear-to-b from-tint to-background px-4 pt-14 pb-12 text-center sm:pt-20 sm:pb-16">
        <Badge variant="secondary">How it works</Badge>
        <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-balance sm:text-5xl">
          Having an idea isn&apos;t the hard part.
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground text-balance">
          &ldquo;I want to start a clothing brand.&rdquo; &ldquo;I want to build
          an app for students.&rdquo; &ldquo;I have an idea, but I don&apos;t
          know if anyone would buy it.&rdquo; Most young entrepreneurs get stuck
          right after that sentence, not because the idea is bad, but because no
          one ever answers:{" "}
          <span className="font-medium text-foreground">
            okay, what do I actually do next?
          </span>
        </p>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Learn. Do. Record. Analyze. Adapt.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-balance">
            VentureNova doesn&apos;t hand you a checklist and disappear. It
            builds a continuous feedback loop around your specific venture.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {loop.map((item) => (
            <Card key={item.step} className="gap-3">
              <CardHeader>
                <span className="flex size-8 items-center justify-center rounded-full bg-warm text-sm font-semibold text-warm-foreground">
                  {item.step}
                </span>
                <CardTitle className="text-lg text-primary-ink">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{item.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-tint py-12 sm:py-20">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-4">
          <div className="max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              A roadmap that actually moves.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-balance">
              Ten stages take a venture from a raw idea to real growth. Click
              through them. Your roadmap isn&apos;t locked to a straight line
              either.
            </p>
          </div>
          <div className="mt-10 flex w-full justify-center">
            <RoadmapExplorer />
          </div>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-4xl flex-col items-center px-4 py-12 sm:py-20">
        <div className="max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Progress that means something.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-balance">
            Entrepreneurship isn&apos;t a video game. VentureNova tracks real
            evidence, like interviews, prototypes, and validated assumptions,
            not just lessons you clicked through.
          </p>
        </div>
        <div className="mt-10 flex w-full justify-center">
          <EvidenceToggle />
        </div>
      </section>

      <section className="border-y border-border bg-tint py-12 sm:py-20">
        <div className="mx-auto w-full max-w-5xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Why not just ask ChatGPT?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-balance">
              Because your venture deserves more than a one-off answer.
              VentureNova remembers your idea, your customer, and everything
              you&apos;ve already tried, and it isn&apos;t any of these:
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {comparisons.map((item) => (
              <Card key={item.title}>
                <CardHeader>
                  <CardTitle className="text-primary-ink">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{item.body}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-3xl px-4 py-12 text-center sm:py-20">
        <Badge variant="secondary">Our mission</Badge>
        <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Access to entrepreneurship shouldn&apos;t depend on your zip code.
        </h2>
        <p className="mt-4 text-lg text-muted-foreground text-balance">
          Adults can find accelerators, mentors, and startup communities. A
          14-year-old with an idea usually just has Google and good luck.
          VentureNova exists to give every young person a structured system for
          actually building something, regardless of their school, location, or
          network.
        </p>
      </section>

      <Separator className="mx-auto max-w-4xl" />

      <section className="flex w-full flex-col items-center gap-6 px-4 py-14 text-center sm:py-20">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Your idea deserves a next step.
        </h2>
        <StartCta />
      </section>
    </div>
  );
}
