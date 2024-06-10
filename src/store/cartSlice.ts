import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState = {
  cartItems: [2, 3, 4, 6, 7, 8, 9, 10],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
});

export const {} = cartSlice.actions;

export default cartSlice.reducer;
