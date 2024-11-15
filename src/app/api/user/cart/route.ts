import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";

export const GET = auth(async (req: any) => {
  if (!req.auth) {
    return NextResponse.json(
      { error: true, message: "unauthorized" },
      {
        status: 401,
      }
    );
  }

  return NextResponse.json(
    { success: true, error: false, message: "Get all carts" },
    { status: 200 }
  );
});
export const POST = auth(async (req: Request) => {
  return NextResponse.json(
    { success: true, error: false, message: "Get all carts" },
    { status: 200 }
  );
});
