import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const sessionToken = req.cookies.get("session_token")?.value;

  // Bypass middleware untuk API session
  if (req.nextUrl.pathname.startsWith("/api/auth/session")) {
    return NextResponse.next();
  }

  // Cek sesi
  if (!sessionToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Validasi session ke API
  try {
    const sessionRes = await fetch(`${req.nextUrl.origin}/api/auth/session`, {
      headers: { Cookie: `session_token=${sessionToken}` },
    });

    if (!sessionRes.ok) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
