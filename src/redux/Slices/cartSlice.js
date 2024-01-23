import { createSlice } from "@reduxjs/toolkit";
const cartInitialState = {
  cartItems: [], // Array to store cart items
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitialState,
  reducers: {
    // Add item to the cart
    addItemToCart: (state, action) => {
      state.cartItems.push(action.payload);
    },
    // Delete item from the cart based on the item id
    deleteItemFromCart: (state, action) => {
      state.cartItems.splice(action.payload, 1);
      state.cartItems = [...state.cartItems];
    },
  },
});

export const { addItemToCart, deleteItemFromCart } = cartSlice.actions;
export default cartSlice.reducer;
