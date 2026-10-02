import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { env } from "~/env";

const bodySchema = z.object({
  email: z.string().trim().email(),
  idea: z
    .string()
    .trim()
    .max(500)
    .optional()
    .transform((v) => (v ? v : undefined)),
});

const resend = new Resend(env.RESEND_API_KEY);

export async function POST(request: Request) {
  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid email." }, { status: 400 });
  }
  const { email, idea } = parsed.data;

  const supabase = createClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
  const { error } = await supabase
    .from("waitlist_signups")
    .insert({ email, idea: idea ?? null });

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "That email is already on the waitlist." },
        { status: 409 },
      );
    }
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }

  const { error: emailError } = await resend.emails.send({
    from: "VentureNova <hello@venturenova.org>",
    to: [email],
    subject: "You're on the VentureNova waitlist",
    text: idea
      ? `You're on the list!\n\nYou told us you're working on: ${idea}\n\nWe'll email you as soon as VentureNova is ready.\n\n— The VentureNova team`
      : "You're on the list!\n\nWe'll email you as soon as VentureNova is ready.\n\n— The VentureNova team",
  });

  if (emailError) {
    console.error("Resend send failed:", emailError);
  }

  return NextResponse.json({ ok: true });
}
