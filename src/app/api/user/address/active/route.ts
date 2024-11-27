import { auth } from "@/auth";
import { connectDB } from "@/config/database";
import User from "@/models/user.model";
import {
  createErrorResponse,
  createSuccessResponse,
} from "@/utils/api-response.utils";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

export const GET = auth(async (req) => {
  if (!req.auth) {
    return createErrorResponse(null, "unauthorized", 401);
  }

  try {
    await connectDB();

    const dbUser = await User.findOne({
      _id: req.auth?.user._id,
    });

    if (!dbUser) {
      return createErrorResponse(null, "unauthorized", 401);
    }

    let activeAddress = undefined;

    for (const address of dbUser.addresses) {
      if (address.active === true) {
        activeAddress = address;
        // console.log(`Address with ID ${address._id} is active.YES!`);
        break;
      } else {
        // console.log(`Address with ID ${address._id} is not active.`);
      }
    }

    if (!activeAddress) {
      return createErrorResponse({}, "User has not an active address", 404);
    }

    return createSuccessResponse({ activeAddress }, "", 200);
  } catch (error: any) {
    return createErrorResponse({}, error.message, 500);
  }
});

export const POST = auth(async (req) => {
  const { id } = await req.json();

  if (!req.auth || !isValidObjectId(id)) {
    return createErrorResponse(null, "unauthorized", 401);
  }

  try {
    await connectDB();

    const dbUser = await User.findOne({
      _id: req.auth?.user._id,
    });

    if (!dbUser) {
      return createErrorResponse(null, "unauthorized User", 400);
    }

    let foundedAddress;

    for (const address of dbUser.addresses) {
      if (address._id.toString() === id) {
        foundedAddress = address;
        // console.log(`there is an Address with ID ${address._id}.`);
        break;
      } else {
        // console.log(`there is not an Address with ID ${address._id}.`);
      }
    }

    if (!foundedAddress) {
      return createErrorResponse(null, "No  address founded", 404);
    }

    return new NextResponse(
      JSON.stringify({ error: false, success: true, adress: foundedAddress }),
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return createErrorResponse({}, error.message, 500);
  }
});

export const PUT = auth(async (req) => {
  const { id } = await req.json();

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

    // Disable all active addresses
    for (const address of dbUser.addresses) {
      if (address.active) {
        address.active = false;
      }
    }

    // Existing address to be updated
    const existingAddress = dbUser.addresses.id(id);

    if (!existingAddress) {
      return Response.json(
        {
          error: true,
          success: false,
          message: "Address not found",
        },
        {
          status: 401,
        }
      );
    }

    existingAddress.set({
      active: true,
    });

    await dbUser.save();

    return createSuccessResponse(
      null,
      "address status successfully updated ",
      201
    );
  } catch (error: any) {
    return createErrorResponse({}, error.message, 500);
  }
});
