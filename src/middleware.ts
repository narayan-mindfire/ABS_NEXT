import { NextResponse, NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log("Middleware is running...");
  //   return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: "/login",
};
