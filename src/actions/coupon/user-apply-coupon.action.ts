"use server";

import { connectDB } from "@/config/database";
import { currentUser } from "@/utils/auth.utils";
import User from "@/models/user.model";
import Cart, { ICart } from "@/models/cart.model";
// import { isValidObjectId } from "@/lib/utils";
import { isValidObjectId } from "mongoose";
import Coupon, { ICoupon } from "@/models/coupon.model";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function applyCouponCode(couponCode: string) {
  try {
    // Récupérer l'utilisateur actuel
    const user = await currentUser();
    if (!user || typeof user._id !== "string" || !isValidObjectId(user._id)) {
      return { success: false, error: true, message: "Unauthorized" };
    }

    // Connexion à la base de données
    connectDB();

    // Récupérer l'utilisateur depuis la base de données
    const dbUser = await User.findOne({ email: user.email });
    if (!dbUser) {
      return { success: false, error: true, message: "Unauthorized" };
    }

    const coupon = await Coupon.findOne({ coupon: couponCode });

    if (coupon == null) {
      return { success: false, error: true, message: "Invalid coupon" };
    }

    const { cartTotal } = (await Cart.findOne({ user: dbUser._id })) as ICart;

    let totalAfterDiscount = cartTotal - (cartTotal * coupon.discount) / 100;

    await Cart.findOneAndUpdate(
      { user: user._id },
      { totalAfterDiscount },
      {
        new: true,
      }
    );

    // revalidatePath("/checkout");
    // revalidatePath("/cart");
    // redirect("/checkout");
    // res.json({
    //   totalAfterDiscount: totalAfterDiscount.toFixed(2),
    //   discount: coupon.discount,
    // });

    return { success: "Coupon successfully applied" };

    // db.disconnectDb();
    // return { addresses: user.address };
    // return {
    //   success: true,
    //   error: false,
    //   message: "Coupon applyed successfully",
    // };
  } catch (error) {
    return { error: "Coupon not found" };
  }
}

function isCouponValid(coupon: ICoupon) {
  const today = new Date();

  const startDate = new Date(coupon.startDate);

  const endDate = new Date(coupon.endDate);

  return today >= startDate && today <= endDate;
  // return today >= startDate && today <= endDate;
}

export async function getCouponCode(couponCode: string) {
  try {
    // Récupérer l'utilisateur actuel
    const user = await currentUser();
    if (!user || typeof user._id !== "string" || !isValidObjectId(user._id)) {
      return { success: false, error: true, message: "Unauthorized" };
    }

    // Connexion à la base de données
    connectDB();

    // Récupérer l'utilisateur depuis la base de données
    const dbUser = await User.findOne({ email: user.email });
    if (!dbUser) {
      return { success: false, error: true, message: "Unauthorized" };
    }

    const coupon = await Coupon.findOne({ coupon: couponCode });
    console.log("🚀 ~ getCouponCode ~ coupon:SEELELO", coupon);
    if (!coupon) {
      return { success: false, error: true, message: "Coupon not found" };
    }

    const mona = isCouponValid(coupon);
    console.log("🚀 ~ getCouponCode ~ mona:RESULT", mona);

    if (!isCouponValid(coupon)) {
      return { success: false, error: true, message: "Coupon expired" };
    }

    // if (coupon == null) {
    //   return { success: false, error: true, message: "Invalid coupon" };
    // }

    // revalidatePath("/cart");

    return {
      success: true,
      error: false,
      coupon: JSON.parse(JSON.stringify(coupon)),
    };
  } catch (error) {
    return { error: "Coupon not found" };
  }
}
