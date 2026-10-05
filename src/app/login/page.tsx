import { redirect } from "next/navigation";
import { AuthForm } from "~/components/auth-form";
import { getSessionUser } from "~/lib/session";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const user = await getSessionUser();
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
