import { isValidObjectId } from "@/lib/utils";
import Cart from "@/models/Cart";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params: { userId } }: { params: { userId: string } }
) {
  try {
    if (!isValidObjectId(userId)) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          error: true,
          message: "Unauthorized",
        }),
        { status: 400 }
      );
    }

    const dbUser = await User.findOne({
      _id: userId,
    });

    if (!dbUser) {
      return new NextResponse(
        JSON.stringify({
          success: true,
          error: false,
          message: "Unauthorized User",
        }),
        { status: 400 }
      );
    }

    const cart = await Cart.findOne({ user: dbUser._id });
    console.log("🚀 ~ cart:", cart);
    if (!cart) {
      return new NextResponse(
        JSON.stringify({
          success: true,
          error: false,
          message: "cart not found",
        }),
        {
          status: 400,
        }
      );
    }

    console.log("🚀 ~ getCart ~ cart:", cart);

    return new NextResponse(
      JSON.stringify({ success: true, error: false, cart }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("🚀 ~ getCart ~ error:", error);
    return { error: "An error occurred while loading cart items" };
  }
}
