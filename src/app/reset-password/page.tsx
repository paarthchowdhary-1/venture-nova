import { redirect } from "next/navigation";
import { ResetPasswordForm } from "~/components/password-forms";
import { getSessionUser } from "~/lib/session";

export default async function ResetPasswordPage() {
  const user = await getSessionUser();
  if (!user) redirect("/forgot-password");

  return <ResetPasswordForm />;
}
