import { redirect } from "next/navigation";
import { VentureForm } from "~/components/venture-form";
import { createClient } from "~/lib/supabase/server";
import { createVenture } from "../actions";

export default async function NewVenturePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
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
