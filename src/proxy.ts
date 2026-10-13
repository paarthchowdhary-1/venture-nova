import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import { env } from "~/env";

/** Pages that need a signed-in founder. */
const APP_PATH = /^\/(dashboard|portfolio|ventures|admin|feedback)(\/|$)/;

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          for (const { name, value } of cookiesToSet) {
            request.cookies.set(name, value);
          }
          response = NextResponse.next({ request });
          for (const { name, value, options } of cookiesToSet) {
            response.cookies.set(name, value, options);
          }
        },
      },
    },
  );

  // Refresh the auth token when it has expired. getClaims() checks the signed
  // token locally, so a normal request needs no round trip to the auth server.
  const { data } = await supabase.auth.getClaims();

  // Signed-in pages: send logged-out visitors to log in before anything renders,
  // so they get a real redirect instead of a page that redirects after loading.
  if (!data?.claims && APP_PATH.test(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
