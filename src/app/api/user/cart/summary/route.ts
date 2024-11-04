import { isValidObjectId } from "mongoose";
import Cart from "@/models/cart.model";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";

export const GET = auth(async (req: Request) => {
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
