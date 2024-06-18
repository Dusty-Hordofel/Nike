import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  cartID: string;
  productID: number;
  image: string;
  name: string;
  price: string;
  quantity: number;
  style: string;
  size: string;
};

export type CartState = {
  cartItems: CartItem[];
  numItemsInCart: number;
  cartTotal: number;
  shipping: number;
  taxAmount: number;
  orderTotal: number;
};

const initialState: CartState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  taxAmount: 0,
  orderTotal: 0,
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
    updateCart(state, action) {
      state.cartItems = action.payload;
    },
    emptyCart(state, action) {
      state.cartItems = [];
      state.numItemsInCart = 0;
      state.cartTotal = 0;
      state.taxAmount = 0;
      state.orderTotal = 0;
    },
    // calculateTotals: (state) => {
    //   state.tax = 0.1 * state.cartTotal;
    //   state.orderTotal = state.cartTotal + state.shipping + state.tax;
    //   localStorage.setItem("cart", JSON.stringify(state));
    // },
  },
});

export const { addProductToCart, updateCart, emptyCart } = cartSlice.actions;

export default cartSlice.reducer;
