import { apiSlice } from "./apiSlice";

const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: "/api/users/login",
                method: "POST",
                body: credentials,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/api/users/logout",
                method: "POST",
            }),
        }),
    }),
});

export const { useLoginMutation, useLogoutMutation } = usersApiSlice;
