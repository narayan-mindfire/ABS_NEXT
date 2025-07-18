import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({ message: "Users me API is working" });
}

export function PUT() {
  return NextResponse.json({ message: "Update user information" });
}

export function DELETE() {
  return NextResponse.json({ message: "Delete user account" });
}
