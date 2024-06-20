"use server";

import { signIn } from "@/auth";
import { LoginFormData, LogInSchema } from "@/lib/validations/auth";
import { isRedirectError } from "next/dist/client/components/redirect";
import connectDB from "@/config/database";
import { currentUser } from "@/utils/auth";
import User from "@/models/User";
import mongoose from "mongoose";
import Cart from "@/models/Cart";
import Product from "@/models/Product";
import { CartItem } from "@/store/cartSlice";

const isValidObjectId = (id: string): boolean => {
  return mongoose.Types.ObjectId.isValid(id);
};

export async function saveCartItems(cartItems: CartItem[]) {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  if (typeof user._id !== "string" || !isValidObjectId(user._id)) {
    return { error: "Unauthorized" };
    // return { error: 'Invalid ID format' };
  }

  connectDB();

  const dbUser = await User.findOne({ email: user.email });
  //   console.log("🚀 ~ saveCart ~ dbUser:", dbUser);

  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  let products = [];

  let existing_cart = await Cart.findOne({ user: user._id });
  if (existing_cart) {
    await Cart.deleteOne({ _id: existing_cart._id });
  }

  console.log("USER ACTIONS", cartItems);

  for (let i = 0; i < cartItems.length; i++) {
    let dbProduct = await Product.findById(cartItems[i].productID);
    let subProduct = dbProduct.subProducts[cartItems[i].style];
    let tempProduct = {} as any;
    tempProduct.name = dbProduct.name;
    tempProduct.product = dbProduct._id;
    tempProduct.color = {
      color: cartItems[i].color,
      image: cartItems[i].image,
    };
    tempProduct.image = subProduct.images[0].url;
    tempProduct.quantity = Number(cartItems[i].quantity);
    tempProduct.size = cartItems[i].size;
    let price = Number(
      subProduct.sizes.find((p: any) => p.size == cartItems[i].size).price
    );
    tempProduct.price =
      subProduct.discount > 0
        ? Number((price - price / Number(subProduct.discount)).toFixed(2))
        : Number(price.toFixed(2));

    products.push(tempProduct);
    console.log("🚀 ~ saveCartItems ~ tempProduct: TEMP", `${i}`, tempProduct);
  }

  let cartTotal = 0;

  for (let i = 0; i < products.length; i++) {
    cartTotal = cartTotal + products[i].price * products[i].quantity;
  }

  console.log("🚀 ~ saveCartItems ~ cartTotal:", cartTotal);

  await new Cart({
    products,
    cartTotal: cartTotal.toFixed(2),
    user: user._id,
  }).save();

  console.log("CART AMOUNT", {
    products,
    cartTotal: cartTotal.toFixed(2),
    user: user._id,
  });

  return { success: "Verification email sent!" };
}

// MOI

// const newProduct = {
//     // subProduct,
//     _id: product._id,
//     slug: product.slug,
//     style: Number(style),
//     sku: subProduct.sku,
//     name: product.name,
//     description: product.description,
//     images: subProduct.images,
//     category: product.category,
//     shipping: product.shipping,
//     size: subProduct.sizes[size].size,
//     discount: subProduct.discount,
//     color: subProduct.color,
//     // colors: product.subProducts.map(
//     //   (subProduct: ISubProduct) => subProduct.color
//     // ),
//     priceAfterDiscount: Number(priceAfterDiscount),
//     priceBeforeDiscount: Number(priceBeforeDiscount),
//     quantity,
//   };

// LUI

// {
//     _id: product._id,
//     style: Number(style),
//     name: product.name,
//     description: product.description,
//     slug: product.slug,
//     sku: product.subProducts[style].sku,
//     brand: product.brand,
//     category: product.category,
//     subCategories: product.subCategories,
//     shipping: product.shipping,
//     images: product.subProducts[style].images,
//     color: product.subProducts[style].color,
//     size: product.subProducts[style].sizes[size].size,
//     price,
//     priceBefore,
//     quantity: product.subProducts[style].sizes[size].qty,
//   }
