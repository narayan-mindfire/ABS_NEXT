import { NextResponse } from "next/server";

export function PUT() {
  return NextResponse.json({
    message: "Update appointment by ID API is working",
  });
}

export function DELETE() {
  return NextResponse.json({
    message: "Delete appointment by ID API is working",
  });
}
