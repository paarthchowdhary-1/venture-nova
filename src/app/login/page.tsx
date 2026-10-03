import { redirect } from "next/navigation";
import { AuthForm } from "~/components/auth-form";
import { createClient } from "~/lib/supabase/server";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) redirect("/dashboard");

  const { error } = await searchParams;
  return (
    <AuthForm
      mode="login"
      initialError={
        error === "confirmation_failed"
          ? "That confirmation link is invalid or has expired. Try logging in, or sign up again."
          : undefined
      }
    />
  );
}
