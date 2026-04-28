import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function unauthorized() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Admin", charset="UTF-8"',
    },
  });
}

function decodeBasicAuth(headerValue: string): { user: string; pass: string } | null {
  if (!headerValue.startsWith("Basic ")) return null;
  const b64 = headerValue.slice("Basic ".length).trim();
  if (!b64) return null;

  // Middleware runs on the Edge runtime; Buffer isn't available.
  let decoded = "";
  try {
    decoded = atob(b64);
  } catch {
    return null;
  }

  const idx = decoded.indexOf(":");
  if (idx < 0) return null;
  return { user: decoded.slice(0, idx), pass: decoded.slice(idx + 1) };
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith("/admin")) return NextResponse.next();

  const user = process.env.ADMIN_USER;
  const pass = process.env.ADMIN_PASS;

  // If creds aren't configured, fail closed (admin stays inaccessible).
  if (!user || !pass) return unauthorized();

  const authHeader = req.headers.get("authorization");
  if (!authHeader) return unauthorized();
  const creds = decodeBasicAuth(authHeader);
  if (!creds) return unauthorized();
  const { user: providedUser, pass: providedPass } = creds;

  if (providedUser !== user || providedPass !== pass) return unauthorized();
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

