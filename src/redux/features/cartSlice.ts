import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [] as any[],
  totalItems: 0,
  subtotal: 0,
  taxAmount: 0,
  taxPercentage: 0.1,
  totalAmount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (!existingProduct) {
        state.cartItems.push({
          ...action.payload,
          quantity: 1,
        });
      } else {
        existingProduct.quantity += 1;
      }
      state.totalItems = calculateTotalItems(state);
      state.subtotal = calculateSubtotal(state);
      state.taxAmount = calculateTaxAmount(state);
      state.totalAmount = calculateTotalAmount(state);
      console.log(state.subtotal);

      console.log(JSON.stringify(state));
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; change: "increment" | "decrement" }>
    ) => {
      state.cartItems = state.cartItems.map((item) => {
        if (item.id === action.payload.id) {
          if (action.payload.change === "increment") {
            item.quantity += 1;
          } else if (
            action.payload.change === "decrement" &&
            item.quantity > 1
          ) {
            item.quantity -= 1;
          }
        }
        return item;
      });
      state.totalItems = calculateTotalItems(state);
      state.subtotal = calculateSubtotal(state);
      state.taxAmount = calculateTaxAmount(state);
      state.totalAmount = calculateTotalAmount(state);
    },
    removeFromCart: (state, action: PayloadAction<{ id: string }>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      state.totalItems = calculateTotalItems(state);
      state.subtotal = calculateSubtotal(state);
      state.taxAmount = calculateTaxAmount(state);
      state.totalAmount = calculateTotalAmount(state);
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalItems = 0;
      state.subtotal = 0;
      state.taxAmount = 0;
      state.totalAmount = 0;
    },
  },
});

export const calculateTotalItems = (state) => {
  return state.cartItems.reduce((total: number, item: any) => {
    return total + item.quantity;
  }, 0);
};

export const calculateSubtotal = (state) => {
  return state.cartItems.reduce((total: number, item: any) => {
    return total + item.price * item.quantity;
  }, 0);
};

export const calculateTaxAmount = (state) => {
  return state.subtotal * state.taxPercentage;
};

export const calculateTotalAmount = (state) => {
  return state.subtotal + state.taxAmount;
};

export const { addToCart, updateQuantity, removeFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
