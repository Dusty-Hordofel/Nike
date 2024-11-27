import User from "@/models/user.model";
import { auth } from "@/auth";
import { connectDB } from "@/config/database";
import {
  createErrorResponse,
  createSuccessResponse,
} from "@/utils/api-response.utils";

// we can use PUT to update  address  and POST to add address
export const POST = auth(async (req) => {
  const newAddress = await req.json();

  if (!req.auth) {
    return createErrorResponse(null, "unauthorized", 401);
  }

  try {
    await connectDB();

    const dbUser = await User.findOne({
      _id: req.auth?.user._id,
    });

    if (!dbUser) {
      return createErrorResponse(null, "Unauthorized User", 401);
    }

    // Disable all active addresses
    for (const address of dbUser.addresses) {
      if (address.active) {
        address.active = false;
      }
    }

    if (newAddress._id === undefined || newAddress._id === null) {
      dbUser.addresses.push({
        ...newAddress,
        active: true,
      });
      await dbUser.save();

      return createSuccessResponse(
        null,
        "New address successfully added ",
        201
      );
    } else {
      // Adresse existante à mettre à jour
      const existingAddress = dbUser.addresses.id(newAddress._id);
      if (existingAddress) {
        existingAddress.set({
          ...newAddress,
          active: true,
        });

        await dbUser.save();

        return createSuccessResponse(
          null,
          "address successfully updated ",
          201
        );
      } else {
        return createErrorResponse(null, "Address not found", 401);
      }
    }
  } catch (error: any) {
    return createErrorResponse({}, error.message, 500);
  }
});

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
      return createErrorResponse({}, "Unauthorized User", 400);
    }

    const userAddresses = dbUser.addresses;

    return createSuccessResponse({ addresses: userAddresses }, "", 200);
  } catch (error: any) {
    return createErrorResponse({}, error.message, 500);
  }
});
