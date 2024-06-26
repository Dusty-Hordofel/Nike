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

    // Désactiver toutes les adresses actives
    dbUser.addresses.forEach((address: any) => {
      if (address.active) {
        address.active = false;
      }
    });

    // const existingAddress = dbUser.addresses
    if (newAddress._id === undefined || newAddress._id === null) {
      console.log("NEW ADD", newAddress);
      // const activeAddress = dbUser.addresses.find(
      //   (address: any) => address.active === true
      // );
      // console.log(
      //   "🚀 ~ saveUserAddress ~ activeAddress:AC-ACTIVE",
      //   activeAddress
      // );

      // if (activeAddress) {
      //   // Désactive l'adresse active actuelle
      //   activeAddress.active = false;
      // }

      // await dbUser.save();

      dbUser.addresses.push({
        ...newAddress,
        active: true,
      });
      console.log({ success: "new address successfully added " });
      await dbUser.save();

      console.log("YA SIKA");

      revalidatePath("/checkout");

      return {
        error: false,
        success: true,
        message: "New address successfully added ",
      };
    } else {
      // 2ieme solution
      // Adresse existante à mettre à jour
      const existingAddress = dbUser.addresses.id(newAddress._id);
      if (existingAddress) {
        existingAddress.set({
          ...newAddress,
          active: true,
        });

        await dbUser.save();

        console.log("ESSALEMI");

        revalidatePath("/checkout");

        return {
          error: false,
          success: true,
          message: "Active address updated successfully",
        };
      } else {
        return { error: true, success: false, message: "Address not found" };
      }
      // other solution
      // const dbUser = await User.findOneAndUpdate(
      //   { _id: user._id, "addresses._id": updatedAddress._id },
      //   {
      //     $set: {
      //       "addresses.$.lastName": updatedAddress.lastName,
      //       "addresses.$.firstName": updatedAddress.firstName,
      //       "addresses.$.region": updatedAddress.region,
      //       // Ajoutez d'autres champs à mettre à jour ici si nécessaire
      //     },
      //   },
      //   { new: true }
      // );

      // const updatedAddress = {
      //   _id: "667c677626f4501bccd1d2f3", // ID de l'adresse à mettre à jour
      //   lastName: "NouveauNomDeFamille", // Nouveau nom de famille
      // };

      // const dbUser = await User.findOneAndUpdate(
      //   { _id: user._id, "addresses._id": updatedAddress._id }, // Critère de recherche
      //   {
      //     $set: {
      //       "addresses.$.lastName": updatedAddress.lastName,
      //     },
      //   },
      //   { new: true }
      // );

      // 1ere solution
      // console.log("UPDATE ADD", newAddress);
      // const activeAddressIndex = dbUser.addresses.findIndex(
      //   (address: any) => String(address._id) === String(newAddress._id)
      // );

      // if (activeAddressIndex === -1) {
      //   return { error: true, success: false, message: "Address not found" };
      // }

      // const { _id, ...rest } = newAddress;

      // dbUser.addresses[activeAddressIndex] = {
      //   ...rest,
      //   active: true,
      // };

      // await dbUser.save();

      // console.log("ESSALEMI");

      // revalidatePath("/checkout");

      // return {
      //   error: false,
      //   success: true,
      //   message: "Active address updated successfully",
      // };
    }
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
