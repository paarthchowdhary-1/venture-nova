import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import { env } from "~/env";

/**
 * Log out. The Log out buttons post here as a plain form, so the browser does a
 * full page load on the way back to the home page. That throws away anything
 * the page had cached, so a signed-in top bar can never linger after logging
 * out.
 *
 * The auth server is told to end the session, but the login cookies are
 * deleted here directly and unconditionally, even if that call fails (no
 * connection, or the login had already expired). So logging out always works
 * on this device.
 */
export async function POST(request: NextRequest) {
  const supabase = createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        // The cookies are deleted below, in one place.
        setAll() {},
      },
    },
  );

  try {
    await supabase.auth.signOut();
  } catch {
    // Fall through: the cookies are cleared below either way.
  }

  const response = NextResponse.redirect(new URL("/", request.url), 303);
  for (const { name } of request.cookies.getAll()) {
    if (name.startsWith("sb-")) {
      response.cookies.set(name, "", {
        path: "/",
        maxAge: 0,
        expires: new Date(0),
      });
    }
  }
  response.headers.set("Cache-Control", "no-store");
  return response;
}
