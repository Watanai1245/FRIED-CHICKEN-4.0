import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { extraOptions } from "../pages/product/[id]";
import PIZZA from "../util/Chick";

interface Product extends PIZZA {
  price: number;
  extras: extraOptions[];
  quantity: number;
}

interface CartState {
  products: Product[];
  quntiity: number;
  total: number;
}

const initialState: CartState = {
  products: [],
  quntiity: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
      state.quntiity += 1;
      state.total += action.payload.price * action.payload.quantity;
    },
    reset: (state) => {
      state.products = [];
      state.quntiity = 0;
      state.total = 0;
    },
  },
});

export const { addProduct, reset } = cartSlice.actions;
export default cartSlice.reducer;
