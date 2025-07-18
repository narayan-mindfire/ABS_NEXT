import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  return NextResponse.json({ message: `User API is working ${id}` });
}

export function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  return NextResponse.json({ message: `User with ID ${id} updated` });
}

export function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  return NextResponse.json({ message: `User with ID ${id} deleted` });
}
