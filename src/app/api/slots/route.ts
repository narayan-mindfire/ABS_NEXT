import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({ message: "Slots API is working" });
}
