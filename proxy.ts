import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function proxy(request: NextRequest) {
  // Create a response that we can modify
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // IMPORTANT: Do NOT use supabase.auth.getSession() as it does not
  // validate the JWT. Use getUser() instead for security.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // Protect all /admin/* routes except /admin/login
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    if (!user) {
      // Not authenticated → redirect to login
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If user is logged in and tries to access /admin/login, redirect to /admin/hero
  if (pathname === "/admin/login" && user) {
    const dashboardUrl = new URL("/admin/hero", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // IMPORTANT: Return the supabaseResponse to persist session cookies
  return supabaseResponse;
}

export const config = {
  matcher: [
    // Match all /admin routes
    "/admin/:path*",
  ],
};
