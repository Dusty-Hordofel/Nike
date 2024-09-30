"use server";

import { connectDB } from "@/config/database";
import { currentUser } from "@/utils/auth";
import User from "@/models/User";
import Cart, { ICart } from "@/models/Cart";
// import { isValidObjectId } from "@/lib/utils";
import { isValidObjectId } from "mongoose";
import Coupon from "@/models/Coupon";
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

    // console.log("🚀 ~ applyCoupon ~ coupon: AC", coupon);

    const { cartTotal } = (await Cart.findOne({ user: dbUser._id })) as ICart;
    // console.log("🚀 ~ applyCoupon ~ cartTotal:", cartTotal);

    let totalAfterDiscount = cartTotal - (cartTotal * coupon.discount) / 100;
    // console.log("🚀 ~ applyCoupon ~ totalAfterDiscount:", totalAfterDiscount);

    await Cart.findOneAndUpdate(
      { user: user._id },
      { totalAfterDiscount },
      {
        new: true,
      }
    );

    console.log("COUPON APPLY", cartTotal);

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

    if (coupon == null) {
      return { success: false, error: true, message: "Invalid coupon" };
    }

    revalidatePath("/cart");

    return {
      success: true,
      error: false,
      coupon: JSON.parse(JSON.stringify(coupon)),
    };
  } catch (error) {
    return { error: "Coupon not found" };
  }
}
