import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({ message: "appointments list API is working" });
}

export function POST() {
  return NextResponse.json({
    message: "Create new appointment API is working",
  });
}
