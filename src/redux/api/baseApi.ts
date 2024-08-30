import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fit-gear-hub-server.vercel.app/api/",
    credentials: "include",
  }),

  endpoints: () => ({}),
});

// https://fit-gear-hub-server.vercel.app/api/
