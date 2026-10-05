import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { DeleteVenture } from "~/components/delete-venture";
import { VentureForm } from "~/components/venture-form";
import { getSessionUser, getSupabase } from "~/lib/session";
import { deleteVenture, updateVenture } from "../../actions";

export const metadata: Metadata = {
  title: "Edit venture",
  robots: { index: false, follow: false },
};

export default async function EditVenturePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await getSupabase();
  const user = await getSessionUser();
  if (!user) redirect("/login");

  const { data: venture } = await supabase
    .from("ventures")
    .select("id, name, idea, problem, target_customer, venture_type")
    .eq("id", id)
    .maybeSingle();
  if (!venture) notFound();

  return (
    <div className="mx-auto w-full max-w-xl px-4 py-12">
      <Link
        href={`/ventures/${id}`}
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        &larr; {venture.name}
      </Link>
      <h1 className="mt-4 text-2xl font-bold tracking-tight">Edit venture</h1>
      <div className="mt-8">
        <VentureForm
          action={updateVenture.bind(null, id)}
          initial={venture}
          submitLabel="Save changes"
        />
      </div>

      <div className="mt-14 border-t border-border pt-8">
        <h2 className="text-lg font-semibold">Delete venture</h2>
        <p className="mt-1 mb-4 text-sm text-muted-foreground">
          Done with this idea? You can remove it completely.
        </p>
        <DeleteVenture
          ventureName={venture.name}
          action={deleteVenture.bind(null, id)}
        />
      </div>
    </div>
  );
}
