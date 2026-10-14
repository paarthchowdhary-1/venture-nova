import Link from "next/link";
import { Icon, type IconName, Sparkle } from "~/components/icons";
import { CoachDemo } from "~/components/landing/coach-demo";
import { DashboardMock } from "~/components/landing/mocks";
import { Reveal } from "~/components/landing/reveal";
import { StartCta } from "~/components/landing/start-cta";
import { VentureTabs } from "~/components/landing/venture-tabs";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { getSessionUser } from "~/lib/session";

const loop: { step: string; icon: IconName; tone: string }[] = [
  { step: "Learn", icon: "book", tone: "bg-sky-soft text-sky-ink" },
  { step: "Do", icon: "tasks", tone: "bg-mint-soft text-mint-ink" },
  { step: "Record", icon: "pencil", tone: "bg-sun-soft text-sun-ink" },
  { step: "Analyze", icon: "flask", tone: "bg-coral-soft text-coral-ink" },
  { step: "Adapt", icon: "layers", tone: "bg-grape-soft text-grape-ink" },
];

const perks: { label: string; icon: IconName; tone: string }[] = [
  { label: "Free to start", tone: "bg-mint-soft text-mint-ink", icon: "gift" },
  {
    label: "AI coach that pushes back",
    tone: "bg-grape-soft text-grape-ink",
    icon: "chat",
  },
  {
    label: "Real-world tasks",
    tone: "bg-coral-soft text-coral-ink",
    icon: "rocket",
  },
];

const facts = [
  { value: "50", label: "short lessons with quizzes" },
  { value: "10", label: "stages from idea to growth" },
  { value: "5", label: "kinds of venture, each with its own roadmap" },
  { value: "1", label: "coach that remembers your venture" },
];

export default async function Home() {
  const user = await getSessionUser();
  return (
    <div className="flex flex-col">
      <section className="bg-hero relative isolate overflow-hidden">
        <div className="bg-dots absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(70%_60%_at_50%_30%,black,transparent)]" />
        <div className="mx-auto grid w-full max-w-5xl items-center gap-10 px-4 pt-14 pb-16 sm:pt-24 sm:pb-24 lg:grid-cols-[1.05fr_1fr]">
          <div className="flex flex-col items-center gap-5 text-center sm:gap-6 lg:items-start lg:text-left">
            <Badge className="animate-rise gap-1.5 border-warm/40 bg-sun-soft px-3 py-1 text-sun-ink">
              <Sparkle className="size-3.5" />
              {user?.name
                ? `Welcome back, ${user.name}!`
                : "For young entrepreneurs, ages 12–18"}
            </Badge>
            <h1 className="animate-rise text-4xl font-extrabold tracking-tight text-balance [animation-delay:80ms] sm:text-6xl">
              You have an idea. <br className="hidden sm:block" />
              <span className="text-gradient">VentureNova</span> helps you build
              it.
            </h1>
            <p className="animate-rise max-w-xl text-lg leading-relaxed text-balance text-foreground/80 [animation-delay:160ms]">
              Describe your idea and get a personalized roadmap you can actually
              follow. Real lessons, real tasks, a coach that pushes back, and
              proof you did the work.
            </p>
            <div
              id="hero-cta"
              className="animate-rise scroll-mt-20 pt-2 [animation-delay:240ms]"
            >
              {user ? (
                <Button
                  asChild
                  size="lg"
                  variant="fun"
                  className="rounded-full px-8"
                >
                  <Link href="/dashboard">Go to your dashboard &rarr;</Link>
                </Button>
              ) : (
                <StartCta showSecondary />
              )}
            </div>
            <ul className="animate-rise mt-2 flex flex-wrap justify-center gap-2 [animation-delay:320ms] lg:justify-start">
              {perks.map((p) => (
                <li
                  key={p.label}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium ${p.tone}`}
                >
                  <Icon name={p.icon} className="size-4" />
                  {p.label}
                </li>
              ))}
            </ul>
          </div>
          <div className="animate-rise [animation-delay:200ms]">
            <DashboardMock />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-border bg-linear-to-br from-secondary via-tint to-coral-soft/60 py-12 sm:py-20">
        <Reveal className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8 px-4 lg:flex-row lg:gap-16">
          <div className="max-w-md text-center lg:text-left">
            <Badge className="gap-1.5 bg-grape-soft text-grape-ink">
              <Icon name="chat" className="size-3.5" /> The AI coach
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
        </Reveal>
      </section>

      <section className="mx-auto flex w-full max-w-4xl flex-col items-center px-4 py-12 text-center sm:py-20">
        <Reveal className="flex w-full flex-col items-center">
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
                  className="flex size-12 items-center justify-center rounded-full bg-white/70 shadow-sm"
                >
                  <Icon name={item.icon} className="size-6" />
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
            className="mt-3 text-sm font-semibold text-primary-ink underline-offset-4 hover:underline"
          >
            See how it works &rarr;
          </Link>
        </Reveal>
      </section>

      <section className="border-y border-border bg-linear-to-b from-tint to-mint-soft/50 py-12 sm:py-20">
        <Reveal className="mx-auto flex w-full max-w-4xl flex-col items-center px-4">
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
        </Reveal>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 py-12 sm:py-20">
        <Reveal className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
            Progress that only counts when it&apos;s{" "}
            <span className="text-gradient">real.</span>
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground text-balance">
            Lessons and tasks can only take you to 60%. The rest has to come
            from evidence: interviews, tested ideas, and what you learned about
            your competitors.
          </p>
          <dl className="mt-10 grid w-full grid-cols-2 gap-4 sm:grid-cols-4">
            {facts.map((f) => (
              <div
                key={f.label}
                className="rounded-2xl border border-border bg-card p-5 shadow-sm"
              >
                <dt className="text-gradient text-4xl font-extrabold">
                  {f.value}
                </dt>
                <dd className="mt-1 text-sm text-muted-foreground">
                  {f.label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      <section className="px-4 pb-12 sm:pb-20">
        <Reveal className="bg-brand-gradient relative isolate mx-auto flex w-full max-w-4xl flex-col items-center gap-5 overflow-hidden rounded-3xl px-6 py-12 text-center text-primary-foreground shadow-xl sm:py-16">
          <div className="bg-dots absolute inset-0 -z-10 opacity-30 invert" />
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
            <Link href={user ? "/dashboard" : "/signup"}>
              {user ? "Go to your dashboard" : "Start your venture"} &rarr;
            </Link>
          </Button>
          {!user && (
            <p className="text-sm text-primary-foreground/75">Free to start.</p>
          )}
        </Reveal>
      </section>
    </div>
  );
}
