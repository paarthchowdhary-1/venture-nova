import type { Metadata } from "next";
import { LegalPage } from "~/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy | VentureNova",
  description: "What VentureNova collects, why, and the choices you have.",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy" updated="October 3, 2026">
      <p>
        VentureNova helps young entrepreneurs build real ventures. You share
        your ideas and what you learn with us, so this page explains, in plain
        language, what we keep and what we do with it.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>
          Your email address and password (we never see your password in plain
          text).
        </li>
        <li>
          What you put into your workspace: venture names and ideas, lesson and
          quiz progress, tasks and notes, customer interview notes, hypotheses,
          claims and evidence, competitors, MVP features, decisions and launch
          checklist progress.
        </li>
        <li>
          Your messages to the AI Coach, so the conversation can continue.
        </li>
      </ul>

      <h2>How we use it</h2>
      <ul>
        <li>To run your account and show you your own workspace.</li>
        <li>To work out your progress, health score, and next best action.</li>
        <li>
          To send emails you need, like confirming your account or resetting a
          password.
        </li>
      </ul>
      <p>
        We do not sell your information and we do not show ads. We do not use
        your venture details to advertise to you.
      </p>

      <h2>The AI Coach</h2>
      <p>
        When the AI Coach is switched on, your message and a short summary of
        your venture are sent to an AI provider (Anthropic) to write a reply.
        Please don&apos;t put private details like your home address, phone
        number, or other people&apos;s full names into the coach or into
        interview notes.
      </p>

      <h2>Your public page</h2>
      <p>
        Your founder page is private unless you choose to make it public. If you
        do, it shows only your venture&apos;s name, type, idea, stage, progress,
        and achievements. It never shows your name, email, interview notes,
        evidence, problem statement, or target customer. You can turn it off at
        any time.
      </p>

      <h2>Interviews and other people</h2>
      <p>
        When you log customer interviews, use first names or labels only, and
        don&apos;t record last names or contact details. Talk to people with a
        trusted adult aware, and never meet strangers alone.
      </p>

      <h2>Where it&apos;s stored</h2>
      <p>
        Your data is stored with our database and sign-in provider, Supabase,
        and the website is hosted on Vercel. Access to your workspace is
        restricted to your own account.
      </p>

      <h2>Your choices</h2>
      <ul>
        <li>
          Edit or delete any venture from its Edit page. Deleting removes its
          lessons progress, tasks, and notes.
        </li>
        <li>Clear your coach conversation from the Coach page.</li>
        <li>
          To delete your whole account or ask any question about your data,
          email{" "}
          <a
            className="font-medium text-foreground underline underline-offset-4"
            href="mailto:hello@venturenova.org"
          >
            hello@venturenova.org
          </a>
          .
        </li>
      </ul>

      <h2>Young founders</h2>
      <p>
        VentureNova is made for people aged 12 to 18. If you are under 18, we
        encourage you to talk with a parent or guardian about using it,
        especially before you share anything online or involve money.
      </p>

      <h2>Changes</h2>
      <p>
        If we change this page in a way that matters, we&apos;ll update the date
        at the top.
      </p>
    </LegalPage>
  );
}
