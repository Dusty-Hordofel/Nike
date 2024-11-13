"use server";

import { currentUser } from "@/utils/auth.utils";
import User from "@/models/user.model";
import Cart from "@/models/cart.model";
import ProductModel from "@/models/product.model";
// import { CartItem, Coupon } from "@/store/cartSlice";
import { redirect } from "next/navigation";
import { isValidObjectId } from "mongoose";
import { connectDB, disconnectDB } from "@/config/database";
import { applyCouponCode } from "../coupon/user-apply-coupon.action";
import { revalidatePath } from "next/cache";
import { Product, SubProduct } from "@/@types/admin/admin.products.interface";
import { CartItem } from "@/context/cart/cart.reducer";
import { error } from "console";

export async function saveCartItems(
  cartItems: CartItem[],
  couponCode: string | undefined
) {
  try {
    // Récupérer l'utilisateur actuel
    const user = await currentUser();
    if (!user || typeof user._id !== "string" || !isValidObjectId(user._id)) {
      return { error: "Unauthorized" };
    }

    connectDB();

    // Récupérer l'utilisateur depuis la base de données
    const dbUser = await User.findOne({ email: user.email });
    if (!dbUser) {
      return { error: "Unauthorized" };
    }

    // Construire le tableau de produits pour le panier
    const products = await Promise.all(
      cartItems.map(async (cartItem) => {
        const dbProduct = (await ProductModel.findById(
          cartItem.productID
        )) as Product;

        if (!dbProduct) {
          throw new Error(`Product with ID ${cartItem.productID} not found`);
        }

        const subProduct = dbProduct.subProducts.find(
          (subProduct: SubProduct) =>
            subProduct.color.name.toLocaleLowerCase() === cartItem.color
        );

        // const subProduct = dbProduct.subProducts[Number(cartItem.style)];
        if (!subProduct) {
          throw new Error(
            `SubProduct with color ${cartItem.color} not found for product ${dbProduct.name}`
          );
        }

        // Trouver la taille du produit correspondant dans les sous-produits
        const productSize = subProduct.sizes.find(
          (p) =>
            p.size.toLocaleLowerCase() === cartItem.size.toLocaleLowerCase()
        );

        // Vérifier que la taille du produit a été trouvée et que son prix est défini
        if (!productSize || typeof subProduct.price !== "number") {
          throw new Error(
            `Price for size ${cartItem.size} not found in subProduct`
          );
        }

        // Calculer le prix en tenant compte de la remise
        const discountedPrice =
          subProduct.discount > 0
            ? Number(
                (
                  subProduct.price -
                  subProduct.price / subProduct.discount
                ).toFixed(2)
              )
            : Number(subProduct.price.toFixed(2));

        console.log("🚀 ~ cartItems.map ~ discountedPrice:", discountedPrice);

        // Construire l'objet représentant le produit du panier
        const cartProduct = {
          name: dbProduct.name,
          product: dbProduct._id,
          color: {
            color: cartItem.color,
            image: cartItem.image,
          },
          image: subProduct.images[0].url,
          quantity: Number(cartItem.quantity),
          size: cartItem.size,
          price: discountedPrice,
        };

        console.log("🚀 ~ cartItems.map ~ cartProduct:", cartProduct);

        return cartProduct;
      })
    );

    const cartTotal = products.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
    console.log("🚀 ~ cartTotal ~ cartTotal:", cartTotal);

    await Cart.findOneAndDelete({ user: user._id });

    await new Cart({
      products,
      cartTotal: cartTotal.toFixed(2),
      user: user._id,
    }).save();

    if (couponCode === undefined) {
      console.log("CART AMOUNT", {
        products,
        cartTotal: cartTotal.toFixed(2),
        user: user._id,
      });
    } else {
      await applyCouponCode(couponCode);
    }

    // revalidatePath("/checkout");

    return {
      sucess: true,
      error: false,
      message: "Cart items saved successfully!",
    };
  } catch (error) {
    console.error("Error saving cart items:", error);
    return {
      sucess: false,
      error: true,
      message: "An error occurred while saving cart items",
    };
  }
}

export const getCart = async () => {
  try {
    const user = await currentUser();
    if (!user || typeof user._id !== "string" || !isValidObjectId(user._id)) {
      return { error: "Unauthorized" };
    }

    connectDB();

    const dbUser = await User.findOne({ email: user.email });
    if (!dbUser) {
      return { error: "Unauthorized" };
    }

    const cart = await Cart.findOne({ user: dbUser._id });
    if (!cart) redirect("/cart");

    return JSON.parse(JSON.stringify(cart));
  } catch (error) {
    return { error: "An error occurred while loading cart items" };
  }
};

export const deleteCart = async () => {
  try {
    const user = await currentUser();
    if (!user || typeof user._id !== "string" || !isValidObjectId(user._id)) {
      return { error: "Unauthorized" };
    }

    connectDB();

    const dbUser = await User.findOne({ email: user.email });
    if (!dbUser) {
      return { error: "Unauthorized" };
    }

    await Cart.deleteMany({ user: user._id });

    return {
      success: true,
      error: false,
      message: "Cart deleted successfully!",
    };
  } catch (error) {
    return {
      success: false,
      error: true,
      message: "An error occurred while deleting cart items",
    };
  }
};
