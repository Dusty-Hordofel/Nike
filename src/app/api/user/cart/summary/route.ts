import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";

export const GET = auth(async (req: Request) => {
  return NextResponse.json(
    { success: true, error: false, message: "Get all carts" },
    { status: 200 }
  );
});
