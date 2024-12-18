"use server";

import { currentUser } from "@/utils/auth.utils";
import User from "@/models/user.model";

import Coupon, { ICoupon } from "@/models/coupon.model";
import { connectDB } from "@/config/database";
import { isValidObjectId } from "mongoose";

export async function applyCoupon(couponInfos: ICoupon) {
  try {
    // Récupérer l'utilisateur actuel
    const user = await currentUser();
    if (!user || typeof user._id !== "string" || !isValidObjectId(user._id)) {
      return { error: "Unauthorized" };
    }

    // Connexion à la base de données
    connectDB();

    // Récupérer l'utilisateur depuis la base de données
    const dbUser = await User.findOne({ email: user.email });
    if (!dbUser) {
      return { error: "Unauthorized" };
    }

    const { coupon, startDate, endDate, discount } = couponInfos;

    const test = await Coupon.findOne({ coupon });
    if (test) {
      return {
        error: "This Coupon name already exists, try with a different name.",
      };
    }
    await new Coupon({
      coupon,
      startDate,
      endDate,
      discount,
    }).save();

    return {
      message: "Coupon created successfully !",
      coupons: await Coupon.find({}),
    };
  } catch (error) {
    return { error: "Error creating coupon" };
  }
}
