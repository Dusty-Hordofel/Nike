import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";
import Cart from "@/models/cart.model";
import { connectDB } from "@/config/database";
import User from "@/models/user.model";

export const GET = auth(async (req: any) => {
  if (!req.auth) {
    return NextResponse.json(
      { success: false, error: true, message: "unauthorized" },
      {
        status: 401,
      }
    );
  }

  try {
    await connectDB();

    const dbUser = await User.findOne({
      _id: req.auth?.user._id,
    });

    if (!dbUser) {
      return NextResponse.json(
        {
          success: false,
          error: true,
          message: "Unauthorized User",
        },
        { status: 400 }
      );
    }

    const cart = await Cart.findOne({ user: dbUser._id });

    if (!cart) {
      return NextResponse.json(
        {
          success: false,
          error: true,
          message: "cart not found",
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      { success: true, error: false, cart },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: true, message: error.message },
      {
        status: 500,
      }
    );
  }
});

export const POST = auth(async (req: Request) => {
  return NextResponse.json(
    { success: true, error: false, message: "Get all carts" },
    { status: 200 }
  );
});
