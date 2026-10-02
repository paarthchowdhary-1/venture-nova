import { CoachDemo } from "~/components/landing/coach-demo";
import { EvidenceToggle } from "~/components/landing/evidence-toggle";
import { RoadmapExplorer } from "~/components/landing/roadmap-explorer";
import { VentureTabs } from "~/components/landing/venture-tabs";
import { Badge } from "~/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { WaitlistForm } from "~/components/waitlist-form";

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
      "Turn it into a real action — an interview, a prototype, a test.",
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
    body: "Selective, cohort-based, and built for startups that already exist — not a first idea.",
  },
];

export default function Home() {
  return (
    <main className="flex flex-col">
      {/* Hero: promise + highlighted short explanation + CTA/capture */}
      <section className="mx-auto flex w-full max-w-4xl flex-col items-center gap-6 px-4 pt-20 pb-16 text-center sm:pt-28 sm:pb-24">
        <Badge variant="secondary">
          For young entrepreneurs, ages 12&ndash;18
        </Badge>
        {/* Promise */}
        <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-6xl">
          You have an idea. <br className="hidden sm:block" />
          VentureNova helps you build it.
        </h1>

        {/* Short explanation, highlighted */}
        <p className="max-w-2xl text-lg leading-relaxed text-balance">
          <span className="rounded bg-accent px-1 py-0.5 text-accent-foreground [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">
            Describe your idea. Get a personalized roadmap you can actually
            follow &mdash; not another generic checklist.
          </span>
        </p>

        {/* CTA + capture */}
        <div id="hero-cta" className="scroll-mt-20 pt-2">
          <WaitlistForm />
        </div>
      </section>

      {/* AI coach demo */}
      <section className="border-y border-border bg-muted/30 py-16 sm:py-24">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-10 px-4 lg:flex-row lg:items-center lg:gap-16">
          <div className="max-w-md text-center lg:text-left">
            <Badge variant="outline">The AI coach</Badge>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              It remembers your venture. And it pushes back.
            </h2>
            <p className="mt-4 text-muted-foreground text-balance">
              VentureNova doesn&apos;t just answer questions &mdash; it knows
              what stage you&apos;re at, what you&apos;ve already tried, and
              what you haven&apos;t tested yet. It challenges weak assumptions
              instead of cheering them on.
            </p>
          </div>
          <div className="flex w-full justify-center">
            <CoachDemo />
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="mx-auto w-full max-w-4xl px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Having an idea isn&apos;t the hard part.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-balance">
            &ldquo;I want to start a clothing brand.&rdquo; &ldquo;I want to
            build an app for students.&rdquo; &ldquo;I have an idea, but I
            don&apos;t know if anyone would buy it.&rdquo; Most young
            entrepreneurs get stuck right after that sentence &mdash; not
            because the idea is bad, but because no one ever answers:
            <span className="font-medium text-foreground">
              {" "}
              okay, what do I actually do next?
            </span>
          </p>
        </div>
      </section>

      <Separator className="mx-auto max-w-4xl" />

      {/* How it works */}
      <section
        id="how-it-works"
        className="mx-auto w-full max-w-5xl px-4 py-16 sm:py-24"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Learn. Do. Record. Analyze. Adapt.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-balance">
            VentureNova doesn&apos;t hand you a checklist and disappear. It
            builds a continuous feedback loop around your specific venture.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {loop.map((item) => (
            <Card key={item.step} className="gap-3">
              <CardHeader>
                <span className="text-sm font-semibold text-muted-foreground">
                  {item.step}
                </span>
                <CardTitle className="text-lg">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{item.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Venture-specific personalization */}
      <section className="border-y border-border bg-muted/30 py-16 sm:py-24">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-4">
          <div className="max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Your roadmap, not a generic one.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-balance">
              A tutoring business and an app share entrepreneurial principles
              &mdash; but the execution is completely different. Try switching
              the venture type below.
            </p>
          </div>
          <div className="mt-10 flex w-full justify-center">
            <VentureTabs />
          </div>
        </div>
      </section>

      {/* Roadmap explorer */}
      <section className="mx-auto flex w-full max-w-4xl flex-col items-center px-4 py-16 sm:py-24">
        <div className="max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            A roadmap that actually moves.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-balance">
            Ten stages take a venture from a raw idea to real growth. Click
            through them &mdash; your roadmap isn&apos;t locked to a straight
            line either.
          </p>
        </div>
        <div className="mt-10 flex w-full justify-center">
          <RoadmapExplorer />
        </div>
      </section>

      {/* Evidence vs activity */}
      <section className="border-y border-border bg-muted/30 py-16 sm:py-24">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-4">
          <div className="max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Progress that means something.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-balance">
              Entrepreneurship isn&apos;t a video game. VentureNova tracks real
              evidence &mdash; interviews, prototypes, validated assumptions
              &mdash; not just lessons you clicked through.
            </p>
          </div>
          <div className="mt-10 flex w-full justify-center">
            <EvidenceToggle />
          </div>
        </div>
      </section>

      {/* Differentiation */}
      <section className="mx-auto w-full max-w-5xl px-4 py-16 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Why not just ask ChatGPT?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-balance">
            Because your venture deserves more than a one-off answer.
            VentureNova remembers your idea, your customer, and everything
            you&apos;ve already tried &mdash; and it isn&apos;t any of these:
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {comparisons.map((item) => (
            <Card key={item.title}>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{item.body}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="mx-auto max-w-4xl" />

      {/* Mission */}
      <section className="mx-auto w-full max-w-3xl px-4 py-16 text-center sm:py-24">
        <Badge variant="outline">Our mission</Badge>
        <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Access to entrepreneurship shouldn&apos;t depend on your zip code.
        </h2>
        <p className="mt-4 text-lg text-muted-foreground text-balance">
          Adults can find accelerators, mentors, and startup communities. A
          14-year-old with an idea usually just has Google and good luck.
          VentureNova exists to give every young person a structured system for
          actually building something &mdash; regardless of their school,
          location, or network.
        </p>
      </section>

      <Separator className="mx-auto max-w-4xl" />

      {/* Final CTA */}
      <section className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 px-4 py-20 text-center sm:py-28">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Your idea deserves a next step.
        </h2>
        <p className="max-w-xl text-lg text-muted-foreground text-balance">
          Bring whatever you&apos;re thinking about. VentureNova will help you
          figure out what to do with it.
        </p>
        <WaitlistForm />
      </section>
    </main>
  );
}
