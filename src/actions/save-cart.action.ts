"use server";

import connectDB from "@/config/database";
import { currentUser } from "@/utils/auth";
import User from "@/models/User";
import mongoose from "mongoose";
import Cart from "@/models/Cart";
import Product, { IProduct } from "@/models/Product";
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
        const dbProduct = (await Product.findById(
          cartItem.productID
        )) as IProduct;
        if (!dbProduct) {
          throw new Error(`Product with ID ${cartItem.productID} not found`);
        }

        const subProduct = dbProduct.subProducts[Number(cartItem.style)];
        if (!subProduct) {
          throw new Error(
            `SubProduct with style ${cartItem.style} not found for product ${dbProduct.name}`
          );
        }

        // Trouver la taille du produit correspondant dans les sous-produits
        const productSize = subProduct.sizes.find(
          (p) => p.size === cartItem.size
        );

        // Vérifier que la taille du produit a été trouvée et que son prix est défini
        if (!productSize || typeof productSize.price !== "number") {
          throw new Error(
            `Price for size ${cartItem.size} not found in subProduct`
          );
        }

        // Calculer le prix en tenant compte de la remise
        const discountedPrice =
          subProduct.discount > 0
            ? Number(
                (
                  productSize.price -
                  productSize.price / subProduct.discount
                ).toFixed(2)
              )
            : Number(productSize.price.toFixed(2));

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

        return cartProduct;
      })
    );

    // Calculer le total du panier
    const cartTotal = products.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);

    // Supprimer le panier existant s'il y en a un
    const existingCart = await Cart.findOneAndDelete({ user: user._id });

    // Créer un nouveau panier
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

    return { success: "Cart items saved successfully!" };
  } catch (error) {
    console.error("Error saving cart items:", error);
    return { error: "An error occurred while saving cart items" };
  }
}
