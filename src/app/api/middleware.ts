import { NextRequest, NextResponse } from "next/server";
const isUserRoute = (pathname: string) => {
  return pathname.startsWith("/api/users");
};
const isAdminRoute = (pathname: string) => {
  return pathname.startsWith("/api/admin");
};

export async function middleware(req: NextRequest) {
  const role: any = req.headers.get("authorization");

  const { pathname } = req.nextUrl;
  if (
    isUserRoute(pathname) &&
    !(role?.includes("user") || role?.includes("admin"))
  ) {
    return NextResponse.redirect(new URL("/api/auth/unauthorized", req.url));
  }
  if (isAdminRoute(pathname) && role !== "admin") {
    return NextResponse.redirect(new URL("/api/auth/unauthorized", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/users/:path*", "/api/admin/:path*"],
};
