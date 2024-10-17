import { auth } from "@/auth";
import { connectDB } from "@/config/database";
import User from "@/models/user.model";
import { isValidObjectId } from "mongoose";
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
        // console.log(`Address with ID ${address._id} is active.YES!`);
        break;
      } else {
        // console.log(`Address with ID ${address._id} is not active.`);
      }
    }

    if (!activeAddress) {
      // console.log("No active address found");
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

export const POST = auth(async (req) => {
  const { id } = await req.json();

  // console.log("🚀 ~ GET ~ req:ACTIVE", req.auth);

  if (!req.auth || !isValidObjectId(id)) {
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
    // const dbUser = await User.findOne({
    //   _id: "6679d2feecfa26a59fc309b1",
    // });
    // console.log("🚀 ~ dbUser:", dbUser);

    if (!dbUser) {
      return new NextResponse(
        JSON.stringify({
          error: true,
          message: "Unauthorized User",
        }),
        { status: 400 }
      );
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
      return new NextResponse(
        JSON.stringify({
          error: true,
          message: "No  address founded",
        }),
        { status: 404 }
      );
    }

    return new NextResponse(
      JSON.stringify({ error: false, success: true, adress: foundedAddress }),
      {
        status: 200,
      }
    );

    // for (const address of dbUser.addresses) {
    //   if (address._id.toString() === id) {
    //     console.log(`There is an address with ID ${address._id}.`);
    //     return new NextResponse(
    //       JSON.stringify({ success: true, adress: findedAdress }),
    //       {
    //         status: 200,
    //       }
    //     );
    //   }
    // }

    // return new NextResponse(
    //   JSON.stringify({
    //     error: true,
    //     message: "No  address founded",
    //   }),
    //   { status: 404 }
    // );
  } catch (error: any) {
    return Response.json(
      { message: error.message },
      {
        status: 500,
      }
    );
  }
});

export const PUT = auth(async (req) => {
  const { id } = await req.json();

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

    // Adresse existante à mettre à jour
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

    return Response.json(
      {
        error: false,
        success: true,
        message: "address status successfully updated ",
      },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    return Response.json(
      { message: error.message },
      {
        status: 500,
      }
    );
  }
});
