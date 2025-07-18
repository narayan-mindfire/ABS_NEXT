import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({ message: "Users base API is working" });
}
