import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  cartID: string;
  productID: number;
  image: string;
  color: string;
  name: string;
  price: string;
  priceBeforeDiscount: number;
  quantity: number;
  shipping: number;
  style: string;
  size: string;
};

export type Coupon = {
  code: string;
  discountPercentage: number;
};

export type CartState = {
  cartItems: CartItem[];
  numItemsInCart: number;
  cartTotal: number;
  shipping: number;
  taxAmount: number;
  orderTotal: number;
  appliedCoupon?: Coupon;
};

const initialState: CartState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  taxAmount: 0,
  orderTotal: 0,
  appliedCoupon: undefined,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart(state, action: PayloadAction<CartItem>) {
      const newCartItem = action.payload;
      const existingCartItem = state.cartItems.find(
        (item) => item.cartID === newCartItem.cartID
      );
      if (existingCartItem) {
        existingCartItem.quantity += newCartItem.quantity;
      } else {
        state.cartItems.push(newCartItem);
      }
      state.numItemsInCart += newCartItem.quantity;
      state.cartTotal += Number(newCartItem.price) * newCartItem.quantity;
      // cartSlice.caseReducers.calculateTotals(state);
    },
    updateQuantity(
      state,
      action: PayloadAction<{ cartID: string; quantity: number }>
    ) {
      const { cartID, quantity } = action.payload;
      const existingCartItem = state.cartItems.find(
        (item) => item.cartID === cartID
      );

      if (existingCartItem) {
        existingCartItem.quantity = quantity;
        // Recalculate totals after updating quantity
        state.cartTotal = state.cartItems.reduce(
          (total, item) => total + parseFloat(item.price) * item.quantity,
          0
        );
        state.numItemsInCart = state.cartItems.reduce(
          (count, item) => count + item.quantity,
          0
        );
        state.orderTotal = state.cartTotal + state.shipping + state.taxAmount;
      } else {
        alert("Please select a valid item");
      }
    },
    removeItemFromCart(state, action: PayloadAction<string>) {
      // console.log("DELETE CART", action.payload);
      state.cartItems = state.cartItems.filter(
        (item) => String(item.cartID) !== String(action.payload)
      );
      // Update cartTotal, numItemsInCart, and orderTotal after item removal
      state.cartTotal = state.cartItems.reduce(
        (total, item) => total + parseFloat(item.price) * item.quantity,
        0
      );
      state.numItemsInCart = state.cartItems.reduce(
        (count, item) => count + item.quantity,
        0
      );
      state.orderTotal = state.cartTotal + state.shipping + state.taxAmount;
    },

    updateSize(
      state,
      action: PayloadAction<{ cartID: string; newCartID: string; size: string }>
    ) {
      const { cartID, newCartID, size } = action.payload;
      const existingCartItem = state.cartItems.find(
        (item) => item.cartID === cartID
      );
      if (existingCartItem) {
        const newCartItem = state.cartItems.find(
          (item) => item.cartID === newCartID
        );

        if (newCartItem) {
          newCartItem.size = size;
          state.cartItems = state.cartItems.filter(
            (item) => item.cartID !== cartID
          );
        } else {
          existingCartItem.size = size;
          existingCartItem.cartID = newCartID;
        }
      } else {
        alert("Item not found in cart");
      }
    },
    applyCoupon(state, action: PayloadAction<Coupon>) {
      const { code, discountPercentage } = action.payload;

      // Vérifier si le coupon est déjà appliqué
      if (state.appliedCoupon && state.appliedCoupon.code === code) {
        alert("Ce coupon a déjà été appliqué.");
        return;
      }

      // Appliquer le coupon
      state.appliedCoupon = action.payload;
      const discountAmount = state.cartTotal * (discountPercentage / 100);
      state.cartTotal -= discountAmount;
      state.orderTotal = state.cartTotal + state.shipping + state.taxAmount;
    },

    emptyCart(state) {
      state.cartItems = [];
      state.numItemsInCart = 0;
      state.cartTotal = 0;
      state.taxAmount = 0;
      state.orderTotal = 0;
    },
    // calculateTotals: (state) => {
    //   state.taxAmount = 0.1 * state.cartTotal;
    //   state.orderTotal = state.cartTotal + state.shipping + state.taxAmount;
    //   // localStorage.setItem("cart", JSON.stringify(state));
    // },
  },
});

export const {
  addProductToCart,
  updateQuantity,
  updateSize,
  removeItemFromCart,
  applyCoupon,
  emptyCart,
} = cartSlice.actions;

export default cartSlice.reducer;
