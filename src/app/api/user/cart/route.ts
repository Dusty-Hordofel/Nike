import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectDB } from "@/config/database";
import User from "@/models/user.model";
import Cart from "@/models/cart.model";
import { isValidObjectId } from "mongoose";

export const GET = auth(async (req) => {
  if (!req.auth) {
    return NextResponse.json(
      { error: true, message: "unauthorized" },
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
      { message: error.message },
      {
        status: 500,
      }
    );
  }
});

export async function POST(
  req: NextRequest,
  { params: { userId } }: { params: { userId: string } }
) {
  try {
    if (!isValidObjectId(userId)) {
      return NextResponse.json(
        {
          success: false,
          error: true,
          message: "Unauthorized",
        },
        { status: 400 }
      );
    }

    const dbUser = await User.findOne({
      _id: userId,
    });

    if (!dbUser) {
      return NextResponse.json(
        {
          success: true,
          error: false,
          message: "Unauthorized User",
        },
        { status: 400 }
      );
    }

    const cart = await Cart.findOne({ user: dbUser._id });

    if (!cart) {
      return NextResponse.json(
        {
          success: true,
          error: false,
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
      { message: error.message },
      {
        status: 500,
      }
    );
  }
}

export const DELETE = auth(async (req) => {
  // console.log("🚀 ~ GET ~ req:", req.auth?.user._id);

  if (!req.auth) {
    return NextResponse.json(
      { error: true, message: "unauthorized" },
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
          error: true,
          success: false,
          message: "Unauthorized User",
        },
        { status: 400 }
      );
    }

    const cart = await Cart.findOneAndDelete({
      userId: dbUser._id,
    });

    if (!cart) {
      return NextResponse.json(
        {
          success: false,
          error: true,
          message: "User cart not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        error: false,
        message: "User cart  deleted successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      {
        status: 500,
      }
    );
  }
});
