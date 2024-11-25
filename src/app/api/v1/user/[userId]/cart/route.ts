import { auth } from "@/auth";
import { connectDB } from "@/config/database";
import User from "@/models/user.model";
import Cart from "@/models/cart.model";
import { isValidObjectId } from "mongoose";
import {
  createErrorResponse,
  createSuccessResponse,
} from "@/utils/api-response.utils";

export const GET = auth(async (req) => {
  // console.log("🚀 ~ GET ~ req:", req.auth?.user._id);
  if (!req.auth) {
    return createErrorResponse(null, "unauthorized", 401);
  }

  try {
    await connectDB();

    const dbUser = await User.findOne({
      _id: req.auth?.user._id,
    });

    if (!dbUser) {
      return createErrorResponse(null, "Unauthorized User", 400);
    }

    const cart = await Cart.findOne({ user: dbUser._id });

    if (!cart) {
      return createErrorResponse(null, "cart not found", 400);
    }

    return createSuccessResponse({ cart }, "", 200);
  } catch (error: any) {
    return createErrorResponse(null, error.message, 500);
  }
});

export async function POST({
  params: { userId },
}: {
  params: { userId: string };
}) {
  try {
    if (!isValidObjectId(userId)) {
      return createErrorResponse(null, "unauthorized", 401);
    }

    const dbUser = await User.findOne({
      _id: userId,
    });

    if (!dbUser) {
      return createErrorResponse(null, "Unauthorized User", 400);
    }

    const cart = await Cart.findOne({ user: dbUser._id });

    if (!cart) {
      return createErrorResponse(null, "cart not found", 400);
    }

    return createSuccessResponse({ cart }, "", 200);
  } catch (error: any) {
    return createErrorResponse(null, error.message, 500);
  }
}

export const DELETE = auth(async (req) => {
  // console.log("🚀 ~ GET ~ req:", req.auth?.user._id);

  if (!req.auth) {
    return createErrorResponse(null, "unauthorized", 401);
  }

  try {
    await connectDB();

    const dbUser = await User.findOne({
      _id: req.auth?.user._id,
    });

    if (!dbUser) {
      return createErrorResponse(null, "Unauthorized User", 400);
    }

    const cart = await Cart.findOneAndDelete({
      userId: dbUser._id,
    });

    if (!cart) {
      return createErrorResponse(null, "User cart not found", 404);
    }

    return createSuccessResponse(null, "User cart  deleted successfully", 200);
  } catch (error: any) {
    return createErrorResponse(null, error.message, 500);
  }
});
