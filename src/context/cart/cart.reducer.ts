import {
  calculateCartTotal,
  calculateNumberOfItemsInCart,
  calculateShippingAmount,
  calculateTaxAmount,
} from "../../utils/cart.utils";

export type CartItem = {
  cartID: string;
  productID: string;
  subProductID: string;
  image: string;
  slug: string;
  name: string;
  priceAfterDiscount: number;
  priceBeforeDiscount: number;
  quantity: number;
  shipping: number;
  color: string;
  size: string;
};

export type Coupon = {
  code: string;
  discountPercentage: number;
};

export type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | {
      type: "REMOVE_ITEM";
      payload: string;
    }
  | {
      type: "UPDATE_ITEM";
      payload: { cartID: string; quantity?: number; size?: string };
    }
  | { type: "CLEAR_CART" };

export interface CartState {
  cartItems: CartItem[];
  numItemsInCart: number;
  cartTotal: number;
  shipping: number;
  taxAmount: number;
  orderTotal: number;
  appliedCoupon?: Coupon;
  error: string;
}

export const cartReducer = (state: CartState, action: CartAction) => {
  switch (action.type) {
    case "ADD_ITEM": {
      const maxQuantity = 10;
      const existingItem = state.cartItems.find(
        (item) => item.cartID === action.payload.cartID
      );
      if (existingItem) {
        if (existingItem.quantity + action.payload.quantity > maxQuantity) {
          alert("La quantité maximale autorisée est 10");
          return {
            ...state,
            error: "La quantité maximale autorisée est 10",
          };
        }

        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.cartID === action.payload.cartID
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
          error: "",
        };
      }

      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
        error: "",
      };
    }

    case "UPDATE_ITEM": {
      const updatedCartItems = state.cartItems.map((item) =>
        item.cartID === action.payload.cartID
          ? {
              ...item,
              size: action.payload.size ? action.payload.size : item.size,
              quantity: action.payload.quantity
                ? item.quantity + action.payload.quantity
                : item.quantity,
            }
          : item
      );

      const cartTotal = calculateCartTotal(updatedCartItems);
      const shipping = calculateShippingAmount(updatedCartItems);
      const taxAmount = calculateTaxAmount(updatedCartItems, 10);
      const orderTotal = cartTotal + shipping + taxAmount;
      const numItemsInCart = calculateNumberOfItemsInCart(updatedCartItems);

      return {
        ...state,
        cartItems: updatedCartItems,
        cartTotal,
        shipping,
        taxAmount,
        orderTotal,
        numItemsInCart,
        error: "",
      };
    }

    case "REMOVE_ITEM": {
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.cartID !== action.payload
        ),
        error: "",
      };
    }

    case "CLEAR_CART": {
      return {
        ...state,
        cartItems: [],
        error: "",
      };
    }

    default:
      return state;
  }
};
