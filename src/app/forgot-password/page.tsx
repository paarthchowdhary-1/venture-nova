import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ForgotPasswordForm } from "~/components/password-forms";
import { getSessionUser } from "~/lib/session";

export const metadata: Metadata = {
  title: "Reset your password",
  robots: { index: false, follow: false },
};

export default async function ForgotPasswordPage() {
  const user = await getSessionUser();
  if (user) redirect("/dashboard");

  return <ForgotPasswordForm />;
}
