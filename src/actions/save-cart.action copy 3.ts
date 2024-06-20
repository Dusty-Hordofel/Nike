"use server";

import { signIn } from "@/auth";
import { LoginFormData, LogInSchema } from "@/lib/validations/auth";
import { isRedirectError } from "next/dist/client/components/redirect";
import connectDB from "@/config/database";
import { currentUser } from "@/utils/auth";
import User from "@/models/User";
import mongoose, { ObjectId } from "mongoose";
import Cart from "@/models/Cart";
import Product, { IProduct, ISubProduct } from "@/models/Product";
import { CartItem } from "@/store/cartSlice";

// Fonction utilitaire pour vérifier l'ObjectId valide
const isValidObjectId = (id: string): boolean => {
  return mongoose.Types.ObjectId.isValid(id);
};

// Fonction pour sauvegarder les articles du panier
export async function saveCartItems(cartItems: CartItem[]) {
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

    // Construire le tableau de produits pour le panier
    const products = await Promise.all(
      cartItems.map(async (cartItem) => {
        const dbProduct = await Product.findById(cartItem.productID);
        if (!dbProduct) {
          throw new Error(`Product with ID ${cartItem.productID} not found`);
        }

        const subProduct = dbProduct.subProducts[Number(cartItem.style)];
        console.log("🚀 ~ cartItems.map ~ subProduct:SUBA", subProduct);
        if (!subProduct) {
          throw new Error(
            `SubProduct with style ${cartItem.style} not found for product ${dbProduct.name}`
          );
        }

        const tempProduct = {
          name: dbProduct.name,
          product: dbProduct._id,
          color: {
            color: cartItem.color,
            image: cartItem.image,
          },
          image: subProduct.images[0].url,
          quantity: Number(cartItem.quantity),
          size: cartItem.size,
          price:
            subProduct.discount > 0
              ? Number(
                  (
                    subProduct.sizes.find((p: any) => p.size === cartItem.size)
                      .price -
                    subProduct.sizes.find((p: any) => p.size === cartItem.size)
                      .price /
                      Number(subProduct.discount)
                  ).toFixed(2)
                )
              : Number(
                  subProduct.sizes
                    .find((p: any) => p.size === cartItem.size)
                    .price.toFixed(2)
                ),
        };

        return tempProduct;
      })
    );

    // Calculer le total du panier
    const cartTotal = products.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);

    // Supprimer le panier existant s'il y en a un
    const existingCart = await Cart.findOneAndDelete({ user: user._id });

    console.log("CART AMOUNT", {
      products,
      cartTotal: cartTotal.toFixed(2),
      user: user._id,
    });

    // Créer un nouveau panier
    await new Cart({
      products,
      cartTotal: cartTotal.toFixed(2),
      user: user._id,
    }).save();

    return { success: "Cart items saved successfully!" };
  } catch (error) {
    console.error("Error saving cart items:", error);
    return { error: "An error occurred while saving cart items" };
  }
}

interface supProduct {
  _id: ObjectId;
  color: {
    color: string;
    image: string;
  };
  sold: number;
  images: {
    url: string;
    public_url: string;
  }[];
  description_images: any[]; // Adapter le type en fonction des données réelles
  sizes: {
    size: string;
    qty: number;
    price: number;
    _id: ObjectId;
  }[];
  discount: number;
}
