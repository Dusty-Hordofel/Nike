import { NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
  { params: { userId } }: { params: { userId: string } }
) {}
