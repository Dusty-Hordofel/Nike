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
  shipping: 0,
  taxAmount: 0,
  orderTotal: 0,
  appliedCoupon: undefined,
};

// Function to recalculate totals
const recalculateTotals = (state: CartState) => {
  state.cartTotal = state.cartItems.reduce(
    (total, item) => total + parseFloat(item.price) * item.quantity,
    0
  );
  state.numItemsInCart = state.cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  );
  state.shipping = state.cartItems.reduce(
    (total, item) => total + item.shipping * item.quantity,
    0
  );

  const discountAmount = state.appliedCoupon
    ? state.cartTotal * (state.appliedCoupon.discountPercentage / 100)
    : 0;

  state.orderTotal =
    state.cartTotal - discountAmount + state.shipping + state.taxAmount;
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
      recalculateTotals(state);
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
        recalculateTotals(state);
      } else {
        alert("Please select a valid item");
      }
    },
    removeItemFromCart(state, action: PayloadAction<string>) {
      state.cartItems = state.cartItems.filter(
        (item) => String(item.cartID) !== String(action.payload)
      );

      recalculateTotals(state);

      // Clear the applied coupon if the cart is empty
      if (state.cartItems.length === 0) {
        state.appliedCoupon = undefined;
      }
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
      recalculateTotals(state);
    },

    emptyCart(state) {
      state.cartItems = [];
      state.numItemsInCart = 0;
      state.cartTotal = 0;
      state.taxAmount = 0;
      state.orderTotal = 0;
      state.shipping = 0;
      state.appliedCoupon = undefined;
    },
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
