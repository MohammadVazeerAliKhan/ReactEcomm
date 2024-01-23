import { combineReducers } from "@reduxjs/toolkit";
import productReducer from "./Slices/productSlice";
import cartReducer from "./Slices/cartSlice";

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
});

export default rootReducer;
