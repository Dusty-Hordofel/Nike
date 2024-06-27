import { connectDB } from "@/config/database";
import { isValidObjectId } from "@/lib/utils";
import Product from "@/models/Product";
import User from "@/models/User";
import { currentUser } from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params: { userId } }: { params: { userId: string } }
) {
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

  let activeAddress = undefined;

  for (const address of dbUser.addresses) {
    if (address.active === true) {
      activeAddress = address;
      console.log(`Address with ID ${address._id} is active.YES!`);
      break;
    } else {
      console.log(`Address with ID ${address._id} is not active.`);
    }
  }

  if (!activeAddress) {
    console.log("No active address found");
    return new NextResponse(
      JSON.stringify({
        success: true,
        error: false,
        message: "User has not an active address",
      }),
      { status: 200 }
    );
  }

  return new NextResponse(
    JSON.stringify({ success: true, error: false, activeAddress }),
    {
      status: 200,
    }
  );
}
