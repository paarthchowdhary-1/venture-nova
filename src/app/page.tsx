import Link from "next/link";
import { CoachDemo } from "~/components/landing/coach-demo";
import { StartCta } from "~/components/landing/start-cta";
import { VentureTabs } from "~/components/landing/venture-tabs";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";

const loop = [
  { step: "Learn", emoji: "📚", tone: "bg-sky-soft text-sky-ink" },
  { step: "Do", emoji: "🛠️", tone: "bg-mint-soft text-mint-ink" },
  { step: "Record", emoji: "📝", tone: "bg-sun-soft text-warm-foreground" },
  { step: "Analyze", emoji: "🔍", tone: "bg-coral-soft text-coral-ink" },
  { step: "Adapt", emoji: "🔄", tone: "bg-grape-soft text-grape-ink" },
];

const perks = [
  { label: "Free to start", tone: "bg-mint-soft text-mint-ink", emoji: "🎉" },
  {
    label: "AI coach that pushes back",
    tone: "bg-grape-soft text-grape-ink",
    emoji: "🤖",
  },
  {
    label: "Real-world tasks",
    tone: "bg-coral-soft text-coral-ink",
    emoji: "🚀",
  },
];

function Floaty({
  children,
  className,
  slow = false,
}: {
  children: string;
  className: string;
  slow?: boolean;
}) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute select-none ${
        slow ? "animate-float-slow" : "animate-float"
      } ${className}`}
    >
      {children}
    </span>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="bg-hero relative isolate overflow-hidden">
        <div className="bg-dots absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(70%_60%_at_50%_30%,black,transparent)]" />
        <Floaty className="top-10 left-[6%] hidden text-4xl sm:block">
          💡
        </Floaty>
        <Floaty slow className="top-24 right-[7%] hidden text-5xl sm:block">
          🚀
        </Floaty>
        <Floaty className="bottom-16 left-[10%] hidden text-3xl lg:block">
          🎯
        </Floaty>
        <Floaty slow className="right-[12%] bottom-24 hidden text-4xl lg:block">
          ✨
        </Floaty>
        <Floaty className="top-1/2 left-[2%] hidden text-3xl xl:block">
          🧠
        </Floaty>

        <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-5 px-4 pt-14 pb-14 text-center sm:gap-6 sm:pt-28 sm:pb-24">
          <Badge className="animate-rise gap-1.5 border-warm/40 bg-sun-soft px-3 py-1 text-warm-foreground">
            <span aria-hidden>⚡</span> For young entrepreneurs, ages
            12&ndash;18
          </Badge>
          <h1 className="animate-rise max-w-5xl text-4xl font-extrabold tracking-tight text-balance [animation-delay:80ms] sm:text-6xl">
            You have an idea. <br className="hidden sm:block" />
            <span className="text-gradient">VentureNova</span>{" "}
            <span className="sm:whitespace-nowrap">helps you build it.</span>
          </h1>
          <p className="animate-rise max-w-2xl text-lg leading-relaxed text-balance text-foreground/80 [animation-delay:160ms]">
            Describe your idea and get a personalized roadmap you can actually
            follow. Real lessons, real tasks, a coach that pushes back, and
            proof you did the work.
          </p>
          <div
            id="hero-cta"
            className="animate-rise scroll-mt-20 pt-2 [animation-delay:240ms]"
          >
            <StartCta showSecondary />
          </div>
          <ul className="animate-rise mt-2 flex flex-wrap justify-center gap-2 [animation-delay:320ms]">
            {perks.map((p) => (
              <li
                key={p.label}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium ${p.tone}`}
              >
                <span aria-hidden>{p.emoji}</span>
                {p.label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-border bg-linear-to-br from-secondary via-tint to-coral-soft/60 py-12 sm:py-20">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8 px-4 lg:flex-row lg:gap-16">
          <div className="max-w-md text-center lg:text-left">
            <Badge className="bg-grape-soft text-grape-ink">
              <span aria-hidden>🤖</span> The AI coach
            </Badge>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
              It remembers your venture. And it{" "}
              <span className="text-gradient">pushes back.</span>
            </h2>
            <p className="mt-3 text-muted-foreground text-balance">
              It knows what stage you&apos;re at and what you haven&apos;t
              tested yet, and it challenges weak assumptions instead of cheering
              them on.
            </p>
          </div>
          <div className="flex w-full justify-center">
            <CoachDemo />
          </div>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-4xl flex-col items-center px-4 py-12 text-center sm:py-20">
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Not a checklist. A <span className="text-gradient">loop.</span>
        </h2>
        <ol className="mt-8 grid w-full grid-cols-2 gap-3 sm:grid-cols-5">
          {loop.map((item, i) => (
            <li
              key={item.step}
              className={`card-pop flex flex-col items-center gap-2 rounded-2xl border border-transparent p-4 ${item.tone}`}
            >
              <span
                aria-hidden
                className="flex size-12 items-center justify-center rounded-full bg-white/70 text-2xl shadow-sm"
              >
                {item.emoji}
              </span>
              <span className="text-xs font-semibold opacity-70">
                Step {i + 1}
              </span>
              <span className="font-bold">{item.step}</span>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-muted-foreground text-balance">
          Learn something, do it for real, record what happened, and let your
          roadmap adapt to the evidence.
        </p>
        <Link
          href="/how-it-works"
          className="mt-3 text-sm font-semibold text-primary underline-offset-4 hover:underline"
        >
          See how it works &rarr;
        </Link>
      </section>

      <section className="border-y border-border bg-linear-to-b from-tint to-mint-soft/50 py-12 sm:py-20">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-4">
          <div className="max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
              Your roadmap,{" "}
              <span className="text-gradient">not a generic one.</span>
            </h2>
            <p className="mt-3 text-muted-foreground text-balance">
              A tutoring business and an app need very different next steps. Try
              switching the venture type.
            </p>
          </div>
          <div className="mt-8 flex w-full justify-center">
            <VentureTabs />
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:py-20">
        <div className="bg-brand-gradient relative isolate mx-auto flex w-full max-w-4xl flex-col items-center gap-5 overflow-hidden rounded-3xl px-6 py-12 text-center text-primary-foreground shadow-xl sm:py-16">
          <div className="bg-dots absolute inset-0 -z-10 opacity-30 invert" />
          <Floaty className="top-4 left-6 text-3xl opacity-80">⭐</Floaty>
          <Floaty slow className="right-8 bottom-5 text-3xl opacity-80">
            🚀
          </Floaty>
          <h2 className="max-w-xl text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
            Your idea deserves a next step.
          </h2>
          <p className="max-w-md text-primary-foreground/85 text-balance">
            It takes about a minute to start. Your first task is waiting.
          </p>
          <Button
            asChild
            size="lg"
            variant="warm"
            className="rounded-full px-8"
          >
            <Link href="/signup">Start your venture &rarr;</Link>
          </Button>
          <p className="text-sm text-primary-foreground/75">Free to start.</p>
        </div>
      </section>
    </div>
  );
}
