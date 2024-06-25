"use server";

import { connectDB, disconnectDB } from "@/config/database";
import { isValidObjectId } from "@/lib/utils";
import { DeliveryInfoFormData } from "@/lib/validations/delivery";
import User from "@/models/User";
import { currentUser } from "@/utils/auth";
import { Address } from "cluster";
import mongoose from "mongoose";

export const saveUserAddress = async (newAddress: DeliveryInfoFormData) => {
  try {
    const user = await currentUser();
    console.log("🚀 ~ saveUserAddress ~ user:", user);
    if (!user || typeof user._id !== "string" || !isValidObjectId(user._id)) {
      return { error: "Unauthorized" };
    }

    connectDB();

    const dbUser = await User.findOne({
      _id: user._id,
      // "addresses.active": true,
    });

    if (!dbUser) {
      return { error: "Unauthorized" };
    }

    // console.log("Addresses:", dbUser.addresses);
    const activeAddress = dbUser.addresses.find(
      (address: any) => address.active === true
    );

    // await dbUser.updateOne({
    //   $push: {
    //     addresses: newAddress,
    //   },
    // });

    console.log("🚀 ~ saveUserAddress ~ activeAddress:", activeAddress);

    if (activeAddress) {
      // Désactive l'adresse active actuelle
      activeAddress.active = false;
    }

    // Ajoute la nouvelle adresse avec le statut actif
    dbUser.addresses.push({
      ...newAddress,
      active: true,
    });

    await dbUser.save();

    return {
      success: "Active address updated successfully",
    };
  } catch (error) {
    console.log("🚀 ~ saveUserAddress ~ error:", error);
    return { error: "An error occurred while saving your address" };
  }
};

// await dbUser.updateOne({
//   $push: {
//     addresses: newAddress,
//   },
// });

export const getUserAddresses = async () => {
  try {
    const user = await currentUser();
    if (!user || typeof user._id !== "string" || !isValidObjectId(user._id)) {
      return { error: "Unauthorized" };
    }

    connectDB();

    const dbUser = await User.findOne({ _id: user._id });

    if (!dbUser && !dbUser.addresses) {
      return { error: "Unauthorized" };
    }

    return JSON.parse(JSON.stringify(dbUser.addresses));
  } catch (error) {
    console.log("🚀 ~ getUserAddresses ~ error:", error);
    return { error: "An error occurred while getting your addresses" };
  }
};

export const getUserActiveAdress = async () => {
  try {
    const user = await currentUser();
    if (!user || typeof user._id !== "string" || !isValidObjectId(user._id)) {
      return { success: false, error: true, message: "Unauthorized" };
    }

    connectDB();

    const dbUser = await User.findOne({
      _id: user._id,
      "addresses.active": true,
    });

    if (!dbUser) {
      return { success: false, error: true, message: "Unauthorized" };
    }

    console.log("Addresses:", dbUser.addresses);
    const activeAddress = dbUser.addresses.find(
      (address: any) => address.active === true
    );

    if (!activeAddress)
      return {
        success: false,
        error: true,
        message: "User has not an active address",
      };

    // console.log("All Addresses:ALL", dbUser.addresses);

    // console.log("Active Address:MOLO", activeAddress);

    return {
      success: true,
      error: false,
      activeAddress: JSON.parse(JSON.stringify(activeAddress)),
    };
  } catch (error) {
    console.log("🚀 ~ getUserAddresses ~ error:", error);
    return {
      sucess: false,
      error: true,
      message: "An error occurred while getting your addresses",
    };
  }
};
