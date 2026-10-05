import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { VentureForm } from "~/components/venture-form";
import { getSessionUser } from "~/lib/session";
import { createVenture } from "../actions";

export const metadata: Metadata = {
  title: "Start a venture",
  robots: { index: false, follow: false },
};

export default async function NewVenturePage() {
  const user = await getSessionUser();
  if (!user) redirect("/login");

  return (
    <div className="mx-auto w-full max-w-xl px-4 py-12">
      <h1 className="text-2xl font-bold tracking-tight">Start a venture</h1>
      <p className="mt-2 text-muted-foreground">
        Tell us about your idea. You can change any of this later.
      </p>
      <div className="mt-8">
        <VentureForm action={createVenture} />
      </div>
    </div>
  );
}
