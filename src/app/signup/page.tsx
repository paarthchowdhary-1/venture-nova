import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthForm } from "~/components/auth-form";
import { getSessionUser } from "~/lib/session";

export const metadata: Metadata = {
  title: "Create your account",
};

export default async function SignupPage() {
  const user = await getSessionUser();
  if (user) redirect("/dashboard");

  return <AuthForm mode="signup" />;
}
