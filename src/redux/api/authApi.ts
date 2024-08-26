import { setUser } from "../features/authSlice";
import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Login endpoint
    login: builder.mutation({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
      // On successful login, set the user with the token
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { accessToken } = data;
          dispatch(setUser({ token: accessToken }));
        } catch (error) {
          console.error("Login error: ", error);
        }
      },
    }),
    // Refresh token endpoint
    refreshToken: builder.mutation({
      query: () => ({
        url: "auth/refresh",
        method: "POST",
      }),

      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { accessToken } = data;
          dispatch(setUser({ token: accessToken }));
        } catch (error) {
          console.error("Refresh token error: ", error);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRefreshTokenMutation } = authApi;
