"use server";

import { connectDB, disconnectDB } from "@/config/database";
import { isValidObjectId } from "@/lib/utils";
import { DeliveryInfoFormData } from "@/lib/validations/delivery";
import User from "@/models/User";
import { currentUser } from "@/utils/auth";
import { Address } from "cluster";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

export const saveUserAddress = async (newAddress: DeliveryInfoFormData) => {
  console.log("🚀 ~ saveUserAddress ~ newAddress:", newAddress);
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

    if (newAddress._id === undefined || newAddress._id === null) {
      const activeAddress = dbUser.addresses.find(
        (address: any) => address.active === true
      );

      if (activeAddress) {
        // Désactive l'adresse active actuelle
        activeAddress.active = false;
      }

      // Ajoute la nouvelle adresse avec le statut actif
      dbUser.addresses.push({
        ...newAddress,
        active: true,
      });
      console.log({ success: "new address successfully added " });
      await dbUser.save();
      // console.log("🚀 ~ saveUserAddress ~ activeAddress:", activeAddress);
    } else {
      // Update existing address based on _id
      const existingAddress = dbUser.addresses.find(
        (address: any) => String(address._id) === String(newAddress._id)
      );

      if (!existingAddress) {
        return { error: "Address not found" };
      }

      dbUser.addresses.push({
        ...newAddress,
        active: true,
      });

      // Update address fields
      // existingAddress.firstName = newAddress.firstName;
      // existingAddress.lastName = newAddress.lastName;
      // existingAddress.address = newAddress.address;
      // existingAddress.companyInfo = newAddress.companyInfo;
      // existingAddress.city = newAddress.city;
      // existingAddress.postalCode = newAddress.postalCode;
      // existingAddress.country = newAddress.country;
      // existingAddress.email = newAddress.email;
      // existingAddress.phoneNumber = newAddress.phoneNumber;
      // existingAddress.active = true; // Ensure the updated address is marked as active

      // Deactivate other active addresses
      // dbUser.addresses.forEach((address: any) => {
      //   if (address._id !== newAddress._id) {
      //     address.active = false;
      //   }
      // });

      await dbUser.save();
      // Update existing address based on _id

      // const existingAddressIndex = dbUser.addresses;
      // console.log(
      //   "🚀 ~ saveUserAddress ~ existingAddressIndex:",
      //   existingAddressIndex
      // );
      // const existingAddressIndex2 = dbUser.addresses.findIndex(
      //   (address: any) => String(address._id) === String(newAddress._id)
      // );
      // console.log(
      //   "🚀 ~ saveUserAddress ~ existingAddressIndex:",
      //   existingAddressIndex2
      // );

      // if (existingAddressIndex === -1) {
      //   return { error: "Address not found" };
      // }

      // dbUser.addresses[existingAddressIndex] = {
      //   ...newAddress,
      //   active: true, // Ensure the updated address is marked as active
      // };

      // Optionally, deactivate the previously active address
      // dbUser.addresses.forEach((address: any) => {
      //   if (address._id !== newAddress._id) {
      //     address.active = false;
      //   }
      // });
      // let test = dbUser.addresses[existingAddressIndex];
      // console.log({ success: "Active address updated successfully", test });

      // find user and update the active adresse
    }

    // Save the updated user document
    // await dbUser.save();

    revalidatePath("/checkout");

    return {
      success: "Active address updated successfully",
    };
  } catch (error) {
    console.log("🚀 ~ saveUserAddress ~ error:", error);
    return { error: "An error occurred while saving your address" };
  }
};
// export const saveUserAddress = async (newAddress: DeliveryInfoFormData) => {
//   try {
//     const user = await currentUser();
//     console.log("🚀 ~ saveUserAddress ~ user:", user);
//     if (!user || typeof user._id !== "string" || !isValidObjectId(user._id)) {
//       return { error: "Unauthorized" };
//     }

//     connectDB();

//     const dbUser = await User.findOne({
//       _id: user._id,
//       // "addresses.active": true,
//     });

//     if (!dbUser) {
//       return { error: "Unauthorized" };
//     }

//     // console.log("Addresses:", dbUser.addresses);
//     const activeAddress = dbUser.addresses.find(
//       (address: any) => address.active === true
//     );

//     // await dbUser.updateOne({
//     //   $push: {
//     //     addresses: newAddress,
//     //   },
//     // });

//     console.log("🚀 ~ saveUserAddress ~ activeAddress:", activeAddress);

//     if (activeAddress) {
//       // Désactive l'adresse active actuelle
//       activeAddress.active = false;
//     }

//     // Ajoute la nouvelle adresse avec le statut actif
//     dbUser.addresses.push({
//       ...newAddress,
//       active: true,
//     });

//     await dbUser.save();

//     return {
//       success: "Active address updated successfully",
//     };
//   } catch (error) {
//     console.log("🚀 ~ saveUserAddress ~ error:", error);
//     return { error: "An error occurred while saving your address" };
//   }
// };

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
      // "addresses.active": true,
    });

    console.log("🚀 ~ getUserActiveAdress ~ dbUser:AC", dbUser);

    if (!dbUser) {
      return { success: false, error: true, message: "Unauthorized User" };
    }

    console.log("Addresses:ADRESSES AC", dbUser.addresses);

    let activeAddress = undefined;
    for (const address of dbUser.addresses) {
      if (address.active === true) {
        activeAddress = address;
        break;
      } else {
        console.log(`Address with ID ${address._id} is not active.`);
      }
    }

    // const activeAddress = dbUser.addresses;
    // const activeAddress = dbUser.addresses.find(
    //   (address: any) => address.address === true
    // );
    // const activeAddress = dbUser.addresses.find(
    //   (address: any) => address.active === true
    // );
    // console.log("🚀 ~ getUserActiveAdress ~ activeAddress:AC", activeAddress);
    console.log("🚀 ~ getUserActiveAdress ~ activeAddress:AC", activeAddress);

    if (!activeAddress) {
      console.log("No active address found"); // Debugging output
      return {
        success: false,
        error: true,
        message: "User has not an active address",
      };
    }

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
