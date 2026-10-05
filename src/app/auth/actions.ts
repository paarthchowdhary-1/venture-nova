"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "~/lib/supabase/server";

export type AuthState = { error?: string; message?: string };

const credentialsSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(72, "Password must be 72 characters or fewer."),
});

const nameSchema = z
  .string()
  .trim()
  .min(1, "Tell us your first name.")
  .max(50, "Keep your name under 50 characters.");

function readCredentials(formData: FormData) {
  return credentialsSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
}

export async function signUp(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const parsed = readCredentials(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message };
  }
  const name = nameSchema.safeParse(formData.get("name") ?? "");
  if (!name.success) {
    return { error: name.error.issues[0]?.message };
  }

  const requestHeaders = await headers();
  const origin =
    requestHeaders.get("origin") ?? `https://${requestHeaders.get("host")}`;

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    ...parsed.data,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      data: { full_name: name.data },
    },
  });

  if (error) {
    return { error: error.message };
  }
  if (data.session) {
    redirect("/dashboard");
  }
  return {
    message: "Check your email to confirm your account, then log in.",
  };
}

export async function signIn(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const parsed = readCredentials(formData);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error) {
    return { error: error.message };
  }
  redirect("/dashboard");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

const emailSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
});

export async function requestPasswordReset(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const parsed = emailSchema.safeParse({ email: formData.get("email") });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message };
  }

  const requestHeaders = await headers();
  const origin =
    requestHeaders.get("origin") ?? `https://${requestHeaders.get("host")}`;

  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(
    parsed.data.email,
    { redirectTo: `${origin}/auth/callback?next=/reset-password` },
  );
  if (error?.status === 429) {
    return { error: "Please wait a minute before asking for another link." };
  }

  return {
    message:
      "If an account exists for that email, we've sent a link to reset your password.",
  };
}

const newPasswordSchema = z
  .object({
    password: credentialsSchema.shape.password,
    confirm: z.string(),
  })
  .refine((v) => v.password === v.confirm, {
    message: "Those passwords don't match.",
    path: ["confirm"],
  });

export async function updatePassword(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const parsed = newPasswordSchema.safeParse({
    password: formData.get("password"),
    confirm: formData.get("confirm"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { error: "That reset link has expired. Please request a new one." };
  }

  const { error } = await supabase.auth.updateUser({
    password: parsed.data.password,
  });
  if (error) {
    return { error: error.message };
  }
  redirect("/dashboard");
}

/** Lets an existing account (made before names were collected) add its name. */
export async function saveName(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const name = nameSchema.safeParse(formData.get("name") ?? "");
  if (!name.success) {
    return { error: name.error.issues[0]?.message };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { error } = await supabase.auth.updateUser({
    data: { full_name: name.data },
  });
  if (error) {
    return { error: "Couldn't save your name. Please try again." };
  }
  // The name is read from the login token, so refresh it to pick up the change.
  await supabase.auth.refreshSession();
  revalidatePath("/", "layout");
  return { message: "Saved." };
}
