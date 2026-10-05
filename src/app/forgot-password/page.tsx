import { redirect } from "next/navigation";
import { ForgotPasswordForm } from "~/components/password-forms";
import { getSessionUser } from "~/lib/session";

export default async function ForgotPasswordPage() {
  const user = await getSessionUser();
  if (user) redirect("/dashboard");

  return <ForgotPasswordForm />;
}
