import { auth } from "@/auth";
import { connectDB } from "@/config/database";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export const GET = auth(async (req) => {
  if (!req.auth) {
    return Response.json(
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
      return new NextResponse(
        JSON.stringify({
          error: true,
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
          error: true,
          message: "User has not an active address",
        }),
        { status: 404 }
      );
    }

    return new NextResponse(JSON.stringify({ success: true, activeAddress }), {
      status: 200,
    });
  } catch (error: any) {
    return Response.json(
      { message: error.message },
      {
        status: 500,
      }
    );
  }
});
