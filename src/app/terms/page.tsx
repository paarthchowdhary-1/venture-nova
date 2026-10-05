import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "~/components/legal-page";

export const metadata: Metadata = {
  title: "Terms",
  description: "The simple rules for using VentureNova.",
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms" updated="October 3, 2026">
      <p>
        These are the simple rules for using VentureNova. By creating an account
        you agree to them.
      </p>

      <h2>What VentureNova is</h2>
      <p>
        VentureNova is a learning and planning tool that helps young
        entrepreneurs test and build ideas. It gives guidance and organizes your
        work. It is not legal, financial, tax, or medical advice, and it
        can&apos;t guarantee your venture will succeed.
      </p>

      <h2>Your account</h2>
      <ul>
        <li>Keep your password private and use a real email address.</li>
        <li>You are responsible for what happens in your account.</li>
        <li>
          If you are under 18, we encourage you to involve a parent or guardian.
        </li>
      </ul>

      <h2>Your work</h2>
      <p>
        Your ideas and everything you write are yours. You give us permission to
        store and process them only to run VentureNova for you, as described in
        our{" "}
        <Link
          className="font-medium text-foreground underline underline-offset-4"
          href="/privacy"
        >
          Privacy page
        </Link>
        .
      </p>

      <h2>Be a good founder</h2>
      <ul>
        <li>Don&apos;t post or share anything harmful, hateful, or illegal.</li>
        <li>Don&apos;t mislead customers or make up evidence.</li>
        <li>
          Don&apos;t put other people&apos;s private details into VentureNova.
        </li>
        <li>
          Don&apos;t try to break, overload, or get into other people&apos;s
          accounts.
        </li>
        <li>
          Be safe: involve a trusted adult for interviews, money, and legal
          questions, and never meet strangers alone.
        </li>
      </ul>

      <h2>The AI Coach</h2>
      <p>
        The AI Coach can make mistakes. Treat its answers as suggestions to
        think about, check them yourself, and ask an adult for anything
        involving money, legal, or safety questions.
      </p>

      <h2>Ending things</h2>
      <p>
        You can stop using VentureNova and delete your ventures at any time. We
        may suspend accounts that break these rules.
      </p>

      <h2>Changes and questions</h2>
      <p>
        We may update these terms as VentureNova grows, and we&apos;ll change
        the date at the top when we do. Questions? Email{" "}
        <a
          className="font-medium text-foreground underline underline-offset-4"
          href="mailto:hello@venturenova.org"
        >
          hello@venturenova.org
        </a>
        .
      </p>
    </LegalPage>
  );
}
