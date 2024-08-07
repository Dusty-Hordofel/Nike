import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";
import { connectDB } from "@/config/database";

export const POST = auth(async (req) => {
  const newAddress = await req.json();

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

    // Désactiver toutes les adresses actives
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

      return Response.json(
        {
          error: false,
          success: true,
          message: "New address successfully added ",
        },
        {
          status: 201,
        }
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
        return Response.json(
          {
            error: false,
            success: true,
            message: "address successfully updated ",
          },
          {
            status: 201,
          }
        );
      } else {
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
    }
  } catch (error: any) {
    return Response.json(
      { message: error.message },
      {
        status: 500,
      }
    );
  }
});
