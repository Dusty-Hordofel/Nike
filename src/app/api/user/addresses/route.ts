// import connectDB from "@/config/database";
import { connectDB } from "@/config/database";
import Product from "@/models/Product";
import User, { IAddress } from "@/models/User";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    // Récupérer l'utilisateur actuel
    // const user = await currentUser();
    // if (!user || typeof user._id !== "string" || !isValidObjectId(user._id)) {
    //   return { error: "Unauthorized" };
    // }

    // Connexion à la base de données
    connectDB();

    // Récupérer l'utilisateur depuis la base de données
    const dbUser = await User.findOne({
      _id: "6679d2feecfa26a59fc309b1",
      // ,
      // "addresses.active": true,
    });
    console.log("🚀 ~ POST ~ dbUser:", dbUser);

    if (!dbUser) {
      return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
        status: 400,
      });
    }

    // update user user adresse

    //    const user = User.findById({_id:dbUser._id});
    await dbUser.updateOne({
      $push: {
        addresses: { ...body },
      },
    });

    const updatedUser = await User.findById(dbUser._id);

    const formattedAddresses = updatedUser?.addresses.map(
      ({ _id, ...rest }: { _id: mongoose.Types.ObjectId; rest: IAddress }) =>
        rest
    );
    console.log(
      "🚀 ~ saveUserAddress ~ formattedAddresses:",
      formattedAddresses
    );

    return new NextResponse(JSON.stringify(dbUser.addresses), {
      status: 200,
    });
    // const adresses = [...dbUser.addresses]
  } catch (error) {
    console.log("🚀 ~ getUserAddresses ~ error:", error);
    return { error: "An error occurred while getting your addresses" };
  }
}

export async function GET(req: NextRequest) {
  try {
    // Récupérer l'utilisateur actuel
    // const user = await currentUser();
    // if (!user || typeof user._id !== "string" || !isValidObjectId(user._id)) {
    //   return { error: "Unauthorized" };
    // }

    // Connexion à la base de données
    connectDB();
    // await connectDB();

    // Récupérer l'utilisateur depuis la base de données
    const dbUser = await User.findOne({
      _id: "6679d2feecfa26a59fc309b1",
      "addresses.active": true,
    });

    if (!dbUser) {
      return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
        status: 400,
      });
    }

    // Trouvez l'adresse active de l'utilisateur
    // const activeAddress = dbUser.addresses.find(
    //   (address: any) => address.active
    // );
    console.log("Addresses:", dbUser.addresses);
    const activeAddress = dbUser.addresses.find(
      (address: any) => address.active === true
    );

    console.log("All Addresses:ALL", dbUser.addresses);

    console.log("Active Address:MOLO", activeAddress);

    // return new NextResponse(JSON.stringify({ activeAddress }), {
    //   status: 200,
    // });
    return new NextResponse(JSON.stringify({ user: dbUser }), {
      status: 200,
    });
    // const adresses = [...dbUser.addresses]

    // Trouvez l'adresse active de l'utilisateur
    // const activeAddress = dbUser.addresses.map((address: any, index: number) =>
    //   console.log(`N° ${index}`, address)
    // );

    // const activeAddress = dbUser.find((address) => address.active);

    // if (!activeAddress) {
    //   return { error: "Active address not found" };
    //   // throw new Error('Active address not found');
    // }

    // Trouvez l'adresse active de l'utilisateur
    // const activeAddress = dbUser.addresses.find(
    //   (address: any) => address.active === true
    // );

    // cosnt dbUserAdress = await

    // return activeAddress;
    // return JSON.parse(JSON.stringify(dbUser));
    // return JSON.parse(JSON.stringify(dbUser));
    // return { user: dbUser };

    // de base
    // return JSON.parse(JSON.stringify(dbUser.addresses));

    // return dbUser.addresses;
  } catch (error) {
    console.log("🚀 ~ getUserAddresses ~ error:", error);
    return { error: "An error occurred while getting your addresses" };
  }
}
//   try {
//     await connectDB();
//     const products = await Product.find().sort({ createdAt: -1 }).lean();

//     if (!products) {
//       return new NextResponse(
//         JSON.stringify({ message: "No products found" }),
//         { status: 400 }
//       );
//     }

//     return new NextResponse(JSON.stringify({ products }), { status: 200 });
//   } catch (error) {
//     return new Response(JSON.stringify({ error }), { status: 500 });
//   }
