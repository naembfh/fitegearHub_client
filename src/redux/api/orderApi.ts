import { baseApi } from "./baseApi";

import { Order } from "../../types/types";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Endpoint to create a new order
    createOrder: builder.mutation<Order, Partial<Order>>({
      query: (order) => ({
        url: "orders/create",
        method: "POST",
        body: order,
      }),
    }),

    // Endpoint to delete an order
    deleteOrder: builder.mutation<void, string>({
      query: (id) => ({
        url: `orders/${id}`,
        method: "DELETE",
      }),
    }),

    // Endpoint to get all orders
    getAllOrders: builder.query<Order[], void>({
      query: () => "orders",
    }),

    // Endpoint to get orders by email
    getOrdersByEmail: builder.query<Order[], string>({
      query: (email) => `orders?email=${encodeURIComponent(email)}`,
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateOrderMutation,
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
  useGetOrdersByEmailQuery,
} = orderApi;
