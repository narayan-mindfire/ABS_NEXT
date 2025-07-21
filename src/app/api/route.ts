import connectDB from "@/db/config";
import { NextResponse } from "next/server";

connectDB();

export async function GET() {
  return NextResponse.json({ message: "API is working" });
}
