import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload.id);

      if (item) {
        item.quantity++;
        item.amount = item.quantity * item.price;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
          amount: action.payload.attributes.price,
        });
      }
    },
    updateCart: (state, action) => {
      state.items = state.items.map((item) => {
        if (item.id === action.payload.id) {
          if (/^[-]?\d+$/.test(action.payload.value)) {
            item.amount = action.payload.value * item.attributes.price;
          }
          return { ...item, [action.payload.key]: action.payload.value };
        }

        return item;
      });
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { addToCart, updateCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
