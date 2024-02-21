import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
const isUserRoute = (pathname: string) => {
  return pathname.startsWith("/api/users");
};
const isAdminRoute = (pathname: string) => {
  return pathname.startsWith("/api/admin");
};

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  // Define paths that are considered public (accessible without a token)
  const isPublicPath =
    path === "/login" || path === "/signup" || path === "/verifyemail";

  // Get the token from the cookies
  const token = request.cookies.get("session")?.value || "";

  // Redirect logic based on the path and token presence
  if (isPublicPath && token) {
    // If trying to access a public path with a token, redirect to the home page
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  // If trying to access a protected path without a token, redirect to the login page
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  const role = request.headers.get("authorization");

  const { pathname } = request.nextUrl;
  if (
    isUserRoute(pathname) &&
    !(role?.includes("user") || role?.includes("admin"))
  ) {
    return NextResponse.redirect(
      new URL("/api/auth/unauthorized", request.url)
    );
  }
  if (isAdminRoute(pathname) && role !== "admin") {
    return NextResponse.redirect(
      new URL("/api/auth/unauthorized", request.url)
    );
  }
  return NextResponse.next();
}

// It specifies the paths for which this middleware should be executed.
// In this case, it's applied to '/', '/profile', '/login', and '/signup'.
export const config = {
  matcher: [
    "/",
    "/profile",
    "/login",
    "/signup",
    "/verifyemail",
    "/api/users/:path*",
    "/api/admin/:path*",
  ],
};
