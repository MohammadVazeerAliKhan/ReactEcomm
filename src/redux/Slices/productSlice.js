import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  originalProducts: [],
  sorted: false,
};

const productSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    setProduct: (state, action) => {
      state.products = action.payload;
      state.originalProducts = action.payload;
      state.sorted = false;
    },
    // Add product action which recieves a comeplete product from action payload and will add it to the current state
    addProduct: (state, action) => {
      state.products = [action.payload, ...state.products];
      state.originalProducts = state.products;
      state.sorted = false;
    },
    // Edit product action which recieves an object with index and product data to modify the product

    editProduct: (state, action) => {
      state.products = state.products.map((product, index) =>
        index === action.payload.index ? action.payload.product : product
      );
      state.originalProducts = state.products;
      state.sorted = false;

      //   const updatedArray = state.products.concat();
      //   updatedArray[action.payload.index] = action.payload.product;
      //   return { ...state, products: updatedArray };
    },

    // Delete product action which receives id of a product to be deleted
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
      state.originalProducts = state.products;
      state.sorted = false;
    },

    // Sorting products based on price
    sortProducts: (state) => {
      state.products = [...state.products].sort((a, b) => a.price - b.price);
      state.sorted = true;
    },
    unsortProducts: (state) => {
      state.products = [...state.originalProducts];
      state.sorted = false;
    },
  },
});

export const {
  setProduct,
  addProduct,
  editProduct,
  deleteProduct,
  sortProducts,
  unsortProducts,
} = productSlice.actions;
export default productSlice.reducer;
