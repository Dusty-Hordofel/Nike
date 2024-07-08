"use server";

// import connectDB from "@/config/database";
import { currentUser } from "@/utils/auth";
import User from "@/models/User";
import mongoose from "mongoose";
import Cart from "@/models/Cart";
import Product, { IProduct } from "@/models/Product";
import { CartItem, Coupon } from "@/store/cartSlice";
import { redirect } from "next/navigation";
import { isValidObjectId } from "@/lib/utils";
import { connectDB, disconnectDB } from "@/config/database";
import { applyCouponCode } from "./user-apply-coupon.action";
import { revalidatePath } from "next/cache";

// Fonction utilitaire pour vérifier l'ObjectId valide

// Fonction pour sauvegarder les articles du panier
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
          return { error: `Product with ID ${cartItem.productID} not found` };
        }

        const subProduct = dbProduct.subProducts[Number(cartItem.style)];
        if (!subProduct) {
          return {
            error: `SubProduct with style ${cartItem.style} not found for product ${dbProduct.name}`,
          };
        }

        // Trouver la taille du produit correspondant dans les sous-produits
        const productSize = subProduct.sizes.find(
          (p) => p.size === cartItem.size
        );

        // Vérifier que la taille du produit a été trouvée et que son prix est défini
        if (!productSize || typeof productSize.price !== "number") {
          return {
            error: `Price for size ${cartItem.size} not found in subProduct`,
          };
        }

        // Calculer le prix en tenant compte de la remise
        const discountedPrice =
          subProduct.discount > 0
            ? Number(
                (
                  productSize.price -
                  productSize.price * (subProduct.discount / 100)
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

    // Define a type guard to filter out error objects
    const isValidProduct = (
      product:
        | {
            name: string;
            product: unknown;
            color: { color: string; image: string };
            image: string;
            quantity: number;
            size: string;
            price: number;
          }
        | { error: string }
    ): product is {
      name: string;
      product: unknown;
      color: { color: string; image: string };
      image: string;
      quantity: number;
      size: string;
      price: number;
    } => !("error" in product);

    // Filtrer les produits valides
    const validProducts = products.filter(isValidProduct);

    // Calculer le total du panier
    const cartTotal = validProducts.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);

    // Supprimer le panier existant s'il y en a un
    await Cart.findOneAndDelete({ user: user._id });

    // Créer un nouveau panier
    await new Cart({
      products: validProducts,
      cartTotal: cartTotal.toFixed(2),
      user: user._id,
    }).save();

    console.log("Cart", await Cart.find());

    if (couponCode === undefined) {
      console.log("CART AMOUNT", {
        products: validProducts,
        cartTotal: cartTotal.toFixed(2),
        user: user._id,
      });
    } else {
      await applyCouponCode(couponCode);
    }

    revalidatePath("/checkout");

    return { success: "Cart items saved successfully!" };
  } catch (error) {
    console.error("Error saving cart items:", error);
    return { error: "An error occurred while saving cart items" };
  }
}

export const getCart = async () => {
  try {
    // Récupérer l'utilisateur actuel
    const user = await currentUser();
    if (!user || typeof user._id !== "string" || !isValidObjectId(user._id)) {
      return { error: "Unauthorized" };
    }

    // console.log("🚀 ~ getCart ~ userCART:", user);
    // Connexion à la base de données
    connectDB();

    // Récupérer l'utilisateur depuis la base de données
    const dbUser = await User.findOne({ email: user.email });
    if (!dbUser) {
      return { error: "Unauthorized" };
    }

    console.log("🚀 ~ getCart ~ dbUser:", dbUser);
    // we don't want to connect
    const cart = await Cart.findOne({ user: dbUser._id });
    if (!cart) redirect("/cart");

    console.log("🚀 ~ getCart ~ cart:", cart);
    // await disconnectDB();

    return JSON.parse(JSON.stringify(cart));
  } catch (error) {
    console.log("🚀 ~ getCart ~ error:", error);
    return { error: "An error occurred while loading cart items" };
  }
};

// import { CartItem, Product, IProduct, Cart } from "./types"; // Assurez-vous d'importer vos types correctement

// export async function saveCartItems2(
//   cartItems: CartItem[],
//   couponCode: string | undefined
// ) {
//   try {
//     // Récupérer l'utilisateur actuel
//     const user = await currentUser();
//     if (!user || typeof user._id !== "string" || !isValidObjectId(user._id)) {
//       return { error: "Unauthorized" };
//     }

//     // Connexion à la base de données
//     connectDB();

//     // Récupérer l'utilisateur depuis la base de données
//     const dbUser = await User.findOne({ email: user.email });
//     if (!dbUser) {
//       return { error: "Unauthorized" };
//     }

//     // Construire le tableau de produits pour le panier
//     const products: Product[] = [];
//     let cartTotal = 0;

//     for (const cartItem of cartItems) {
//       const dbProduct = await Product.findById(cartItem.productID) as IProduct | null;

//       if (!dbProduct) {
//         console.error(`Product with ID ${cartItem.productID} not found`);
//         return { error: `Product with ID ${cartItem.productID} not found` };
//       }

//       const subProduct = dbProduct.subProducts[Number(cartItem.style)];
//       if (!subProduct) {
//         console.error(`SubProduct with style ${cartItem.style} not found for product ${dbProduct.name}`);
//         return {
//           error: `SubProduct with style ${cartItem.style} not found for product ${dbProduct.name}`,
//         };
//       }

//       const productSize = subProduct.sizes.find((p) => p.size === cartItem.size);
//       if (!productSize || typeof productSize.price !== "number") {
//         console.error(`Price for size ${cartItem.size} not found in subProduct`);
//         return { error: `Price for size ${cartItem.size} not found in subProduct` };
//       }

//       const discountedPrice =
//         subProduct.discount > 0
//           ? Number((productSize.price - productSize.price * (subProduct.discount / 100)).toFixed(2))
//           : Number(productSize.price.toFixed(2));

//       const cartProduct: Product = {
//         name: dbProduct.name,
//         product: dbProduct._id,
//         color: {
//           color: cartItem.color,
//           image: cartItem.image,
//         },
//         image: subProduct.images[0].url,
//         quantity: Number(cartItem.quantity),
//         size: cartItem.size,
//         price: discountedPrice,
//       };

//       products.push(cartProduct);
//       cartTotal += cartProduct.price * cartProduct.quantity;
//     }

//     // Supprimer le panier existant s'il y en a un
//     await Cart.findOneAndDelete({ user: user._id });

//     // Créer un nouveau panier
//     await new Cart({
//       products,
//       cartTotal: cartTotal.toFixed(2),
//       user: user._id,
//     }).save();

//     console.log("Cart", await Cart.find());

//     if (couponCode === undefined) {
//       console.log("CART AMOUNT", {
//         products,
//         cartTotal: cartTotal.toFixed(2),
//         user: user._id,
//       });
//     } else {
//       await applyCouponCode(couponCode);
//     }

//     revalidatePath("/checkout");

//     return { success: "Cart items saved successfully!" };
//   } catch (error) {
//     console.error("Error saving cart items:", error);
//     return { error: "An error occurred while saving cart items" };
//   }
// }
