"use server";

import { connectDB } from "@/config/database";
import { currentUser } from "@/utils/auth";
import User from "@/models/User";
import mongoose from "mongoose";
import Cart, { ICart } from "@/models/Cart";
import Product, { IProduct } from "@/models/Product";
import { CartItem } from "@/store/cartSlice";
import { redirect } from "next/navigation";
import { isValidObjectId } from "@/lib/utils";
import Coupon from "@/models/Coupon";

export async function applyCoupon(coupon: number) {
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

    const checkCoupon = await Coupon.findOne({ coupon });
    if (checkCoupon == null) {
      return { error: "Invalid coupon" };
    }

    const { cartTotal } = (await Cart.findOne({ user: dbUser._id })) as ICart;

    let totalAfterDiscount =
      cartTotal - (cartTotal * checkCoupon.discount) / 100;

    await Cart.findOneAndUpdate({ user: user._id }, { totalAfterDiscount });

    // res.json({
    //   totalAfterDiscount: totalAfterDiscount.toFixed(2),
    //   discount: checkCoupon.discount,
    // });

    // db.disconnectDb();
    // return { addresses: user.address };
  } catch (error) {
    return { error: "Coupon not found" };
  }
}
