import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/", "/login", "/register"];
const PROTECTED_ROUTES = ["/dashboard", "/dashboard/:path*"];

/**
 * Middleware function to protect routes based on user authentication.
 *
 * - Redirects unauthenticated users away from protected routes.
 * - Redirects authenticated users away from public routes (like login/register) to dashboard.
 *
 * @param {NextRequest} req - The incoming request object provided by Next.js middleware.
 * @returns {NextResponse} - A response that may redirect or allow the request to continue.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("accessToken")?.value;

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
  const isProtectedRoute = PROTECTED_ROUTES.includes(pathname);

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/unauthenticated", req.url));
  }

  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/register", "/dashboard/:path*"],
};
