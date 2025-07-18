import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({ message: "My Slots API is working" });
}
