import Link from "next/link";
import { CoachDemo } from "~/components/landing/coach-demo";
import { StartCta } from "~/components/landing/start-cta";
import { VentureTabs } from "~/components/landing/venture-tabs";
import { Badge } from "~/components/ui/badge";

const loop = ["Learn", "Do", "Record", "Analyze", "Adapt"];

export default function Home() {
  return (
    <main className="flex flex-col">
      <section className="flex w-full flex-col items-center gap-5 bg-linear-to-b from-tint to-background px-4 pt-12 pb-12 text-center sm:gap-6 sm:pt-28 sm:pb-24">
        <Badge variant="secondary">
          For young entrepreneurs, ages 12&ndash;18
        </Badge>
        <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-balance sm:text-6xl">
          You have an idea. <br className="hidden sm:block" />
          <span className="text-primary">VentureNova</span> helps you build it.
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-balance">
          <span className="rounded bg-accent px-1 py-0.5 text-accent-foreground [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">
            Describe your idea. Get a personalized roadmap you can actually
            follow &mdash; not another generic checklist.
          </span>
        </p>
        <div id="hero-cta" className="scroll-mt-20 pt-2">
          <StartCta showSecondary />
        </div>
      </section>

      <section className="border-y border-border bg-tint py-12 sm:py-20">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8 px-4 lg:flex-row lg:gap-16">
          <div className="max-w-md text-center lg:text-left">
            <Badge variant="outline">The AI coach</Badge>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              It remembers your venture. And it pushes back.
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

      <section className="mx-auto flex w-full max-w-3xl flex-col items-center px-4 py-12 text-center sm:py-20">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Not a checklist. A loop.
        </h2>
        <ol className="mt-6 flex flex-wrap justify-center gap-2">
          {loop.map((step, i) => (
            <li
              key={step}
              className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium"
            >
              <span className="flex size-5 items-center justify-center rounded-full bg-warm text-xs font-semibold text-warm-foreground">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
        <p className="mt-5 text-muted-foreground text-balance">
          Learn something, do it for real, record what happened, and let your
          roadmap adapt to the evidence.
        </p>
        <Link
          href="/how-it-works"
          className="mt-3 text-sm font-medium text-primary underline-offset-4 hover:underline"
        >
          See how it works &rarr;
        </Link>
      </section>

      <section className="border-y border-border bg-tint py-12 sm:py-20">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-4">
          <div className="max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Your roadmap, not a generic one.
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

      <section className="flex w-full flex-col items-center gap-5 px-4 py-12 text-center sm:py-20">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Your idea deserves a next step.
        </h2>
        <StartCta />
      </section>
    </main>
  );
}
