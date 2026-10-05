import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ResetPasswordForm } from "~/components/password-forms";
import { getSessionUser } from "~/lib/session";

export const metadata: Metadata = {
  title: "Choose a new password",
  robots: { index: false, follow: false },
};

export default async function ResetPasswordPage() {
  const user = await getSessionUser();
  if (!user) redirect("/forgot-password");

  return <ResetPasswordForm />;
}
