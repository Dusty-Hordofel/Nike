import {
  calculateCartTotal,
  calculateNumberOfItemsInCart,
  calculateShippingAmount,
  calculateTaxAmount,
  calculateOrderTotalWithoutDiscount,
  calculateOrderTotalWithDiscount,
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
  couponCode: string;
  discountPercentage: number;
};

export type CartAction =
  | { type: "SET_CART"; payload: CartState }
  | { type: "ADD_ITEM"; payload: CartItem }
  | {
      type: "REMOVE_ITEM";
      payload: string;
    }
  | {
      type: "UPDATE_ITEM";
      payload: { cartID: string; quantity?: number; size?: string };
    }
  | { type: "CLEAR_CART" }
  | {
      type: "APPLY_COUPON";
      payload: Coupon;
    };

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
    case "SET_CART":
      return {
        ...action.payload,
      };
    case "ADD_ITEM": {
      const existingItem = state.cartItems.find(
        (item) => item.cartID === action.payload.cartID
      );
      let updatedCartItems;

      if (existingItem) {
        updatedCartItems = state.cartItems.map((item) =>
          item.cartID === action.payload.cartID
            ? {
                ...item,

                quantity: Math.min(item.quantity + action.payload.quantity, 10),
              }
            : item
        );
      } else {
        updatedCartItems = [...state.cartItems, action.payload];
      }

      const cartTotal = calculateCartTotal(updatedCartItems);
      const shipping = calculateShippingAmount(updatedCartItems);
      const taxAmount = calculateTaxAmount(cartTotal, 0.2);
      const orderTotal = cartTotal + shipping + taxAmount;
      const numItemsInCart = calculateNumberOfItemsInCart(updatedCartItems);

      const updatedState = {
        ...state,
        cartItems: updatedCartItems,
        cartTotal,
        shipping,
        taxAmount,
        orderTotal,
        numItemsInCart,
        error: "",
      };

      return updatedState;
    }

    case "UPDATE_ITEM": {
      const updatedCartItems = state.cartItems.map((item) =>
        item.cartID === action.payload.cartID
          ? {
              ...item,
              size: action.payload.size ? action.payload.size : item.size,
              quantity: action.payload.quantity
                ? Math.min(item.quantity + action.payload.quantity, 10)
                : item.quantity,
            }
          : item
      );

      const cartTotal = calculateCartTotal(updatedCartItems);
      const shipping = calculateShippingAmount(updatedCartItems);
      const taxAmount = calculateTaxAmount(cartTotal, 0.2);
      const orderTotal = cartTotal + shipping + taxAmount;
      const numItemsInCart = calculateNumberOfItemsInCart(updatedCartItems);

      const updatedState = {
        ...state,
        cartItems: updatedCartItems,
        cartTotal,
        shipping,
        taxAmount,
        orderTotal,
        numItemsInCart,
        error: "",
      };

      return updatedState;
    }

    case "REMOVE_ITEM": {
      const remainingCartItems = state.cartItems.filter(
        (item) => item.cartID !== action.payload
      );

      const cartTotal = calculateCartTotal(remainingCartItems);
      const shipping = calculateShippingAmount(remainingCartItems);
      const taxAmount = calculateTaxAmount(cartTotal, 0.2);
      const orderTotal = cartTotal + shipping + taxAmount;
      const numItemsInCart = calculateNumberOfItemsInCart(remainingCartItems);

      const updatedState = {
        ...state,
        cartItems: remainingCartItems,
        cartTotal,
        shipping,
        taxAmount,
        orderTotal,
        numItemsInCart,
        error: "",
      };

      console.log("🚀 ~ cartReducer ~ CARTITEM:", updatedState);
      console.log("🚀 ~ cartReducer ~ STATE:", state);

      return updatedState;
    }

    case "APPLY_COUPON": {
      const { couponCode, discountPercentage } = action.payload;
      let discount = 0;
      const appliedCoupon = state.appliedCoupon || {
        couponCode: "",
        discountPercentage: 0,
      };

      if (couponCode) {
        discount = state.cartTotal * (discountPercentage / 100);
        appliedCoupon.discountPercentage = discountPercentage;
        appliedCoupon.couponCode = couponCode;
      } else {
        alert("Code de coupon inconnu");
        return {
          ...state,
          error: "Code de coupon inconnu",
        };
      }

      const cartTotal = calculateCartTotal(state.cartItems);
      const shipping = calculateShippingAmount(state.cartItems);
      const cartTotalAfterDiscount = cartTotal - discount;
      const taxAmount = calculateTaxAmount(cartTotalAfterDiscount, 0.2);
      const orderTotal = cartTotalAfterDiscount + shipping + taxAmount;

      return {
        ...state,
        appliedCoupon,
        cartTotal,
        shipping,
        taxAmount,
        orderTotal,
        error: "",
      };
    }

    case "CLEAR_CART": {
      return {
        ...state,
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

    default:
      return state;
  }
};
