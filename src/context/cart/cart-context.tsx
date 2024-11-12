"use client";

import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  useEffect,
} from "react";

import { cartReducer, CartState, CartAction, CartItem } from "./cart-reducer";

interface CartContextType {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  // totalAmount: () => number;
  // totalQuantity: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// const getCartFromLocalStorage = (): CartItem[] => {
//   const storedCart = localStorage.getItem("cart");
//   return storedCart ? JSON.parse(storedCart) : [];
// };

const getCartFromLocalStorage = (): CartItem[] => {
  if (typeof window === "undefined") {
    // Si nous sommes côté serveur, retourner un tableau vide ou un état par défaut
    return [];
  }

  // Côté client, accéder à localStorage
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};

const saveCartToLocalStorage = (cart: CartItem[]) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    cartItems: getCartFromLocalStorage(),
    numItemsInCart: 0,
    cartTotal: 0,
    shipping: 0,
    taxAmount: 0,
    orderTotal: 0,
    appliedCoupon: undefined,
    error: "",
  });

  // console.log("🚀 ~ CartProvider ~ state:", state);

  useEffect(() => {
    saveCartToLocalStorage(state.cartItems);
  }, [state.cartItems]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export { CartProvider, useCart };
