"use server";

import connectDB from "@/config/database";
import { isValidObjectId } from "@/lib/utils";
import { DeliveryInfoFormData } from "@/lib/validations/delivery";
import User from "@/models/User";
import { currentUser } from "@/utils/auth";

export const saveUserAddress = async (newAddress: DeliveryInfoFormData) => {
  try {
    // Récupérer l'utilisateur actuel
    const user = await currentUser();
    if (!user || typeof user._id !== "string" || !isValidObjectId(user._id)) {
      return { error: "Unauthorized" };
    }

    // Connexion à la base de données
    connectDB();

    // Récupérer l'utilisateur depuis la base de données
    const dbUser = await User.findOne({ _id: user._id });
    if (!dbUser) {
      return { error: "Unauthorized" };
    }

    // update user user adresse

    //    const user = User.findById({_id:dbUser._id});
    await dbUser.updateOne({
      $push: {
        addresses: newAddress,
      },
    });

    const updatedUser = await User.findById(dbUser._id);

    console.log("🚀 ~ saveAddress ~ dbUser:", updatedUser);
    // user.addresses.push(newAddress);
    // await user.save();
    //   db.disconnectDb();
    return { addresses: dbUser.addresses };
  } catch (error) {
    console.log("🚀 ~ saveAddress ~ error:", error);
    return { error: "An error occurred while saving your address" };
  }
};

export const getUserAddresses = async () => {
  try {
    // Récupérer l'utilisateur actuel
    const user = await currentUser();
    if (!user || typeof user._id !== "string" || !isValidObjectId(user._id)) {
      return { error: "Unauthorized" };
    }

    // Connexion à la base de données
    connectDB();

    // Récupérer l'utilisateur depuis la base de données
    const dbUser = await User.findOne({ _id: user._id });
    if (!dbUser && !dbUser.addresses) {
      return { error: "Unauthorized" };
    }

    return dbUser.addresses;
  } catch (error) {
    console.log("🚀 ~ getUserAddresses ~ error:", error);
    return { error: "An error occurred while getting your addresses" };
  }
};
