import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import { baseApi } from "./api/baseApi";
import authReducer from "./features/authSlice";
import cartReducer from "./features/cartSlice";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    cart: cartReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware, authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
