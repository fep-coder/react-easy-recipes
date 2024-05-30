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
    }),
});

export const { useLoginMutation } = usersApiSlice;
