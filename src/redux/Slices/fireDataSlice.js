import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const fireDataSlice = createSlice({
  name: "fireData",
  initialState: initialState,
  reducers: {
    unsortProducts: (state, action) => {
      return { ...state, products: action.payload };
    },
  },
});

export const { unsortProducts } = productSlice.actions;
export default productSlice.reducer;
