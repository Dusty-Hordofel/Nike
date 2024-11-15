"use client";

import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  useEffect,
} from "react";

import { cartReducer, CartState, CartAction, CartItem } from "./cart.reducer";

interface CartContextType {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const getCartFromLocalStorage = (): CartState => {
  if (typeof window === "undefined") {
    return {
      cartItems: [],
      numItemsInCart: 0,
      cartTotal: 0,
      shipping: 0,
      taxAmount: 0,
      orderTotal: 0,
      appliedCoupon: undefined,
      error: "",
    };
  }

  // Côté client, accéder à localStorage
  const storedCart = localStorage.getItem("cart");
  return storedCart
    ? JSON.parse(storedCart)
    : {
        cartItems: [],
        numItemsInCart: 0,
        cartTotal: 0,
        shipping: 0,
        taxAmount: 0,
        orderTotal: 0,
        appliedCoupon: undefined,
        error: "",
      };
};

export const saveCartToLocalStorage = (state: CartState) => {
  localStorage.setItem("cart", JSON.stringify(state));
};

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, getCartFromLocalStorage());

  // Sauvegarde dans le localStorage à chaque mise à jour de cartState
  useEffect(() => {
    saveCartToLocalStorage(state);
  }, [state]);

  // Synchroniser cartState entre les onglets
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "cart") {
        // Charger la dernière version du panier depuis le localStorage
        const updatedCart = getCartFromLocalStorage();
        if (updatedCart) {
          dispatch({ type: "SET_CART", payload: updatedCart });
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

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
